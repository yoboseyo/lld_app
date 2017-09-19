import { AsyncStorage,
  NativeModules,
  NativeAppEventEmitter
} from 'react-native';
import { Actions } from 'react-native-redux-router';

import * as ActionTypes from './action-types';
import Base64 from '../util/Base64';
import { request401Resend, clearRequest401List, getRequest401ListLength } from '../util/http';
import * as ContainerActions from './container-actions';
import * as UserProfileActions from './userProfile-actions';
import Storage from 'react-native-storage';



var getData = NativeModules.getUserInfo;


let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
})

export function loadUserInfo() {
  return (dispatch) => {
    AsyncStorage.multiGet(['userInfo', 'logined'], (err, stores) => {
      const userValue = [];
      stores.map((result, i, store) => {
        // get at each store's key/value so you can work with it
        // let key = store[i][0];
        userValue[i] = store[i][1];
      });

      dispatch({
        type: ActionTypes.LOAD_USER_INFO,
        payload: {
          userInfo: JSON.parse(userValue[0] || '{}'),
          logined: JSON.parse(userValue[1] || 'false'),
        },
      });
    });
  };
}

export function regSource(regSource) {
  return (dispatch, getState) => dispatch({
    type: ActionTypes.REG_SOURCE,
    payload: {
      regSource: regSource
    }

  });
}

export function login(account, password) {
  return (dispatch, getState) => {
    dispatch({
      type: ActionTypes.LOADING,
    });

    dispatch({
      type: [, , ActionTypes.LOGIN_FAILURE],
      req: {
        method: 'post',
        url: '/login.json',
        param: {
          authc: (new Base64).encode(account + ':' + password),
        }
      },
      onSuccess: payload => {
        dispatch(ContainerActions.closeModal());
        let uInfo = payload.entity;
        storage.load({
          key: 'firstLogin',
          id: uInfo.id,
          autoSync: false,
          syncInBackground: true,
        }).then(ret => {
          
        }).catch(err => {
          console.log(err.message);
          storage.save({
            key: 'firstLogin',
            id: uInfo.id,
            rawData: 1,
            expires: null,
          });
          getData.CallbackUserInfo((error, events) => {
            if (error) {
              console.error(error);
            } else {
              let deviceData = events[0];
              deviceData.userId = uInfo.id;
              deviceDataRaw = JSON.stringify(deviceData);
              dispatch({
                type: [

                ],
                req: {
                  method: 'post',
                  url: '/device/deviceInfo.json',
                  param: deviceData
                },
                onSuccess: () => {
                  console.log('upload success');
                },
                onFailure: (err, res) => {
                  console.log(err);
                },
              });
            }
          })
        });




        AsyncStorage.setItem('userInfo', JSON.stringify(payload.entity))
          .then(() => console.log('Saved token: ' + JSON.stringify(payload.entity)))
          .catch((error) => console.log('AsyncStorage error: ' + error.message))
          .done();

        AsyncStorage.setItem('logined', JSON.stringify(true))
          .then(() => console.log('Saved token: ' + JSON.stringify(true)))
          .catch((error) => console.log('AsyncStorage error: ' + error.message))
          .done();

        dispatch({
          type: ActionTypes.LOGIN_SUCCESS,
          payload: payload,
        });

        const userState = getState().userState;
        if (
          getRequest401ListLength() === 0 || !userState.userInfo.roleList ||
          userState.userInfo.roleList[0].url !== payload.entity.roleList[0].url
        ) {
          clearRequest401List();
        } else {
          request401Resend();
        }
        dispatch(Actions.pop);
        //dispatch(Actions.dismiss);

        // const containerState = getState().containerState;
        // dispatch(containerState.routeToNext);
       // dispatch(Actions.home);
      },
      onFailure: (err, res) => {
        removeStorage();
        dispatch(ContainerActions.closeModal());
      },
    });
  };
}

export function logout() {
  return (dispatch) => {
    removeStorage();
    dispatch({
      type: ActionTypes.LOGOUT,
    });
    dispatch(Actions.home);
  };
}

export function register(account, password, vCode, regSource, checkPolicy, verifyCode) {

  return (dispatch, getState) => {
    const userState = getState().userState;
    dispatch({
      type: [, ActionTypes.REGISTER_SUCCESS],
      req: {
        method: 'create',
        url: '/register.json',
        param: {
          info: (new Base64).encode(account + ':' + password),
          vCode: vCode,
          regSource: regSource,
          regPlatform: 'app',
          checkPolicy: checkPolicy,
        },
      },
      onSuccess: () => {
        // dispatch(Actions.home);
        dispatch(Actions.dismiss);
        dispatch(login(account, password));
      },
    });
  };
}

export function forgetPassword(account, password, vCode) {
  return dispatch => dispatch({
    type: [, ActionTypes.REGISTER_SUCCESS],
    req: {
      method: 'update',
      url: '/forgetPassword.json',
      param: {info: (new Base64).encode(account + ':' + password), vCode: vCode}
    },
    onSuccess: () => {
      dispatch(Actions.home);
      // browserHistory.push('/');
    }
  });
}

export function getValidateCode(mobile, smsType, string) {
  return (dispatch) => {
    if (!mobile) {
      return;
    }
    dispatch({
      type: [, ActionTypes.NOTHING],
      req: {
        method: 'post',
        url: '/getValidateCode.json',
        param: {mobile: mobile, smsType: smsType, string: 'ssssss'},
      },
      onSuccess: () => {

      },
    });
  };
}

export function uploadImage(file, phone, actionType) {
  return (dispatch, getState) => {

    dispatch({
      type: [, actionType],
      req: {
        method: 'upload',
        // url: '/uploadImage2.json?mobile=' + phone + '&type=' + actionType,
        url: '/uploadImage2.json?mobile=' + phone + '&type=' + actionType,
        param: file,
      },
      onSuccess: payload => {
        dispatch(ContainerActions.closeModal());
        dispatch({
          type: [],
          req: {
            method: 'post',
            url: '/user/updateUploadImage.json',
            param: {
              id: getState().userState.userInfo.id,
              uploadImage: payload.entity,
              type: actionType,
              mobile: getState().userState.userInfo.mobile,
            }
          }
        });

      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      //  alert(err);
      }
    });
  }
}

export function uploadImageBase64(file, phone, actionType, func) {
  return (dispatch, getState) => {
    dispatch({
      type: [, [actionType, ActionTypes.MY_CREDIT_PIC_UPLOAD]],
      req: {
        method: 'post',
        url: '/uploadImage3.json',
        param: {
          file: file,
          mobile: phone,
          type: actionType,
        },
      },
      onSuccess: payload => {
        dispatch(ContainerActions.closeModal());
        /*dispatch({
          type: [],
          req: {
            method: 'post',
            url: '/user/updateUploadImage.json',
            param: {
              id: getState().userState.userInfo.id,
              uploadImage: payload.entity,
              type: actionType,
              mobile: getState().userState.userInfo.mobile,
            }
          }
        });*/
        /*dispatch({
          type: ActionTypes.UPDATE_IDINFO,
          payload: payload.entity,
        });*/
        func();
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
        //  alert(err);
      }
    });
  }
}

export function uploadAvatarBase64(file, phone, actionType) {
  return (dispatch, getState) => {
    dispatch({
      type: [, actionType],
      req: {
        method: 'post',
        url: '/uploadImage3.json',
        param: {
          file: file,
          mobile: phone,
          type: actionType,
        },
      },
      onSuccess: payload => {
        dispatch(ContainerActions.closeModal());
        dispatch({
          type: [],
          req: {
            method: 'post',
            url: '/user/updateUploadImage.json',
            param: {
              id: getState().userState.userInfo.id,
              uploadImage: payload.entity,
              type: actionType,
              mobile: getState().userState.userInfo.mobile,
            },
          },
        });
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
        //  alert(err);
      }
    });
  }
}

export function createSuggestion(suggestion) {
  return (dispatch, getState) => {
    dispatch({
      type: [],
      req: {
        method: 'post',
        url: '/user/createSuggestion.json',
        param: {suggestion: suggestion},
      },
      onSuccess: () => {
        dispatch(ContainerActions.closeModal());
        // browserHistory.push('/');
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      }
    });
  }
}

export function saveGeoLocation(lat, long, pre) {
  return (dispatch, getState) => {
    let userId = getState().userState.userInfo.id;
    if (!userId) {
      return;
    }
    dispatch({
      type: [, ActionTypes.GEO_LOCATION],
      req: {
        method: 'post',
        url: '/user/saveGeoLocation.json',
        param: {
          userId: userId,
          lat: lat,
          long: long,
          pre: pre,
        },
      },
    });
  }
}

function removeStorage() {
  AsyncStorage.removeItem('userInfo')
    .then(() => {
      console.log('userInfo removed');
    })
    .catch((error) => { console.log('AsyncStorage error: ' + error.message); })
    .done();

  AsyncStorage.removeItem('logined')
    .then(() => {
      console.log('logined removed');
    })
    .catch((error) => { console.log('AsyncStorage error: ' + error.message); })
    .done();

  AsyncStorage.removeItem('token')
    .then(() => {
      console.log('token removed');
    })
    .catch((error) => { console.log('AsyncStorage error: ' + error.message); })
    .done();
}

export function updateAvatar(source) {
  return (dispatch, getState) => {
    dispatch({
      type: 'UPDATEAVATAR',
      payload: source,
    })
  }
}

export function updateIDInfo(ret) {
  return (dispatch) => {
    dispatch({
      type: 'UPLOAD_IMAGE1',
      payload: {entity: ret},
    });
  }
}
