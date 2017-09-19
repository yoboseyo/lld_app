/**
 * Created by Administrator on 2016/9/12.
 */
import * as ActionTypes from './action-types';
import {Actions} from 'react-native-redux-router';
import React from 'react';
//import { browserHistory } from 'react-router'
import * as ContainerActions from '../actions/container-actions';
import MessageModal from '../components/common/MessageModalContainer';

export function createUserProfile(applyInfo, userinfo) {
  return (dispatch, getState) => dispatch({
    type: [, ActionTypes.HL_APPLY],
    req: {
      method: "post",
      url: "/api/applyHulu.json",
      param: applyInfo,
    },
    onSuccess: payload => {
      let entity = payload.entity;
      const userState = getState().userState;
      userinfo.userId = userState.userInfo.id;
      getState().userinfohlState.custName = userinfo.custName;
      getState().userinfohlState.certNo = userinfo.idCardNo;
      dispatch(ContainerActions.closeModal());
      if (payload.success) {
        dispatch({
          type: [ , ActionTypes.CREATE_USERINFO_HL],
          req: {
            method: "post",
            url: "/userinfo/create2.json",
            param: {
              userProfile: userinfo
            }
          }
        });
        dispatch(Actions.userinfoMobileHL);
      } else {
        dispatch(ContainerActions.showErrModal(<MessageModal message={(JSON.parse(res.text).error).split(":")[2]}/>));
      }
    },
    onFailure: (err, res) => {
      dispatch(ContainerActions.closeModal());
      dispatch(ContainerActions.showErrModal(<MessageModal message={(JSON.parse(res.text).error).split(":")[2]}/>));
    }
  });
}

export function userifo_mobile(passwd) {
  return (dispatch, getState) => {
    let userinfo = getState().userinfohlState.HL_UserinfoInfo.data;
    getState().userinfohlState.passwd = passwd;
    var reqMsg = {};
    reqMsg["token"] = userinfo.token;
    reqMsg["website"] = userinfo.website;
    reqMsg["account"] = userinfo.cell_phone_number;
    reqMsg["password"] = passwd;
    dispatch({
      type: [, ActionTypes.HL_MOBILE],
      req: {
        method: 'post',
        url: '/api/applyMobileLogin.json',
        param: reqMsg,
      },
      onSuccess: payload => {
        let entity = payload.data;
        dispatch(ContainerActions.closeModal());
        if (payload.success) {
          if (entity.code == "12545") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"简单密码或初始密码无法登录"}/>));
          }else if (entity.code == "12544") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"密码不正确"}/>));
          } else if (entity.code == "12291") {
            dispatch({
              type: [],
              req: {
                method: 'post',
                url: '/userinfo/updateUserHL.json',
                param: {
                  id: getState().userState.userInfo.id
                }
              }
            });
            dispatch(ContainerActions.showErrModal(<MessageModal message={"采集完成"}/>));
            dispatch(Actions.home);
          } else if (entity.code == "12800") {
            dispatch(Actions.userinfoNoteHL);
          } else {
            dispatch(ContainerActions.showErrModal(<MessageModal message={entity.message}/>));
          }
        } else {
          dispatch(ContainerActions.showErrModal(<MessageModal message={(JSON.parse(res.text).error).split(":")[2]}/>));
        }
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      }
    });
  };
}

export function applyHulu(applyInfo) {
  return (dispatch, getState) => dispatch({
    type: [, ActionTypes.HL_APPLY],
    req: {
      method: "post",
      url: "/api/applyHulu.json",
      param: applyInfo,
    }
  });
}

export function attestationType() {
  return (dispatch, getState) => dispatch({
    type: [, ActionTypes.LLDATTESTATIONTYPE],
    req: {
      method: "post",
      url: "/api/attestationType.json",
    }
  });
}

export function userinfo_jingdong(account, password) {
  return (dispatch, getState) => {
    var reqMsg = {};
    reqMsg["token"] = getState().userinfohlState.HL_UserinfoInfo.data.token;
    reqMsg["account"] = account;
    reqMsg["password"] = password;
    reqMsg["userId"] = getState().userState.userInfo.id;
    getState().userinfohlState.cell_phone_number = account;
    dispatch({
      type: [, [ActionTypes.HL_JINGDONG, ActionTypes.MY_CREDIT_JXL, ActionTypes.UPDATE_JXL]],
      req: {
        method: 'post',
        url: '/api/applyJdLogin.json',
        param: reqMsg,
      },
      onSuccess: payload => {
        let entity = payload.data;
        if (payload.success) {
          dispatch(ContainerActions.closeModal());
          if (entity.code == "12291") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"采集完成"}/>));
            dispatch(Actions.home);
          } else if (entity.code == "12800") {
            dispatch(Actions.userinfoJDNoteHL);
          } else {
            dispatch(ContainerActions.showErrModal(<MessageModal message={entity.message}/>));
          }

        } else {
          dispatch(ContainerActions.showErrModal(<MessageModal message={(JSON.parse(res.text).error).split(":")[2]}/>));
        }
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      }
    });
  }
}

export function userinfo_node(password) {
  return (dispatch, getState) => {
    var reqMsg = {};
    let entity = getState().userinfohlState.HL_UserinfoInfo.data;
    reqMsg["token"] = entity.token;
    // reqMsg["website"] = entity.collect_website;
    // reqMsg["account"] = entity.cell_phone_number;
    // reqMsg["password"] = getState().userinfohlState.passwd;
    reqMsg["captcha"] = password;
    // reqMsg["type"] = "SUBMIT_CAPTCHA";

    dispatch({
      type: [, ActionTypes.HL_NOTE],
      req: {
        method: 'post',
        url: '/api/applyMobileLogin.json',
        param: reqMsg
      },
      onSuccess: payload => {
        let entity = payload.data;
        dispatch(ContainerActions.closeModal());
        if (payload.success) {
          if (entity.code == "12291") {
            dispatch({
              type: [],
              req: {
                method: 'post',
                url: '/userinfo/updateUserHL.json',
                param: {
                  id: getState().userState.userInfo.id
                }
              }
            });
            dispatch(ContainerActions.showErrModal(<MessageModal message={"采集完成"}/>));
            dispatch(Actions.home);
          } else if (entity.code == "12802") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"短信验证码不匹配"}/>));
          } else if (entity.code == "12544") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"密码不正确"}/>));
          } else {
            dispatch(ContainerActions.showErrModal(<MessageModal message={entity.content}/>));
          }
        } else {
          dispatch(ContainerActions.showErrModal(<MessageModal message={(JSON.parse(res.text).error).split(":")[2]}/>));
        }
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      }
    });
  }
}
export function userinfo_retryNote() {
  return (dispatch, getState) => {
    var reqMsg = {};
    let entity = getState().userinfohlState.HL_UserinfoInfo.data;
    reqMsg["token"] = entity.token;
    // reqMsg["website"] = entity.datasource.website;
    // reqMsg["account"] = entity.cell_phone_num;
    // reqMsg["password"] = getState().userinfohlState.passwd;
    // reqMsg["type"] = "RESEND_CAPTCHA";

    dispatch({
      type: [, ActionTypes.RETRYNOTE_HL],
      req: {
        method: 'post',
        url: '/api/reqMobileMsg.json',
        param: reqMsg
      },
      onSuccess: payload => {
        let entity = payload.data;
        dispatch(ContainerActions.closeModal());
        if (payload.success) {
          dispatch(ContainerActions.showErrModal(<MessageModal message={"发送成功"}/>));
        } else {
          dispatch(ContainerActions.showErrModal(<MessageModal message={entity.message}/>));
        }
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      }
    });
  }
}

export function userinfo_JD_node(password) {
  return (dispatch, getState) => {
    var reqMsg = {};
    let entity = getState().userinfohlState.HL_UserinfoInfo.data;
    reqMsg["token"] = entity.token;
    // reqMsg["website"] = entity.collect_website;
    reqMsg["account"] = getState().userinfohlState.cell_phone_number;
    // reqMsg["password"] = getState().userinfohlState.passwd;
    reqMsg["captcha"] = password;
    // reqMsg["type"] = "SUBMIT_CAPTCHA";
    reqMsg["userId"] = getState().userState.userInfo.id;
    dispatch({
      type: [, ActionTypes.HL_NOTE],
      req: {
        method: 'post',
        url: '/api/applyJSendMsg.json',
        param: reqMsg
      },
      onSuccess: payload => {
        let entity = payload.data;
        console.info("-------------");
        console.info(entity);
        console.info(payload);
        console.info("-------------");
        dispatch(ContainerActions.closeModal());
        if (payload.success) {
          if (entity.code == "12291") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"采集完成"}/>));
            dispatch(Actions.home);
          } else if (entity.code == "12802") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"短信验证码不匹配"}/>));
          } else if (entity.code == "12544") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"密码不正确"}/>));
          } else {
            dispatch(ContainerActions.showErrModal(<MessageModal message={entity.message}/>));
          }
        } else {
          dispatch(ContainerActions.showErrModal(<MessageModal message={(JSON.parse(res.text).error).split(":")[2]}/>));
        }
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      }
    });
  }
}
export function userinfo_JD_retryNote() {
  return (dispatch, getState) => {
    var reqMsg = {};
    let entity = getState().userinfohlState.HL_UserinfoInfo.data;
    reqMsg["token"] = entity.token;
    // reqMsg["website"] = entity.datasource.website;
    reqMsg["account"] = getState().userinfohlState.cell_phone_number;
    // reqMsg["password"] = getState().userinfohlState.passwd;
    // reqMsg["type"] = "RESEND_CAPTCHA";

    dispatch({
      type: [, ActionTypes.RETRYNOTE_HL],
      req: {
        method: 'post',
        url: '/api/applyJResendMsg.json',
        param: reqMsg
      },
      onSuccess: payload => {
        let entity = payload.data;
        dispatch(ContainerActions.closeModal());
        if (payload.success) {
          dispatch(ContainerActions.showErrModal(<MessageModal message={"发送成功"}/>));
        } else {
          dispatch(ContainerActions.showErrModal(<MessageModal message={entity.message}/>));
        }
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      }
    });
  }
}