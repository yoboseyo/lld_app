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
    type: [, ActionTypes.JXL_APPLY],
    req: {
      method: "post",
      url: "/api/apply.json",
      param: {
        applyInfo: applyInfo
      },
    },
    onSuccess: payload => {
      let entity = payload.entity;
      const userState = getState().userState;
      userinfo.userId = userState.userInfo.id;
      getState().userinfoState.custName = userinfo.custName;
      getState().userinfoState.certNo = userinfo.cardId;
      dispatch(ContainerActions.closeModal());
      if (entity.success) {
        dispatch({
          type: [, ActionTypes.CREAT_USERINFO],
          req: {
            method: "post",
            url: "/userinfo/create.json",
            param: {
              userProfile: userinfo
            }
          }
        });
        //      browserHistory.push('/userinfoMobile');
        dispatch(Actions.userinfoMobile);
      } else {
        dispatch(ContainerActions.showErrModal(<MessageModal message={entity.message}/>));
      }
    },
    onFailure: (err, res) => {
      dispatch(ContainerActions.closeModal());
    }
  });
}

export function userifo_mobile(passwd) {
  return (dispatch, getState) => {
    console.info(getState());
    let userinfo = getState().userinfoState.UserinfoInfo.entity.data;
    getState().userinfoState.passwd = passwd;
    console.info(userinfo);
    var reqMsg = {};
    reqMsg["token"] = userinfo.token;
    reqMsg["website"] = userinfo.datasource.website;
    reqMsg["account"] = userinfo.cell_phone_num;
    reqMsg["password"] = passwd;
    //reqMsg["custName"] = getState().userinfoState.custName;
    //reqMsg["certNo"] = getState().userinfoState.certNo;
    console.info(reqMsg);
    dispatch({
      type: [, ActionTypes.JXL_MOBILE],
      req: {
        method: 'post',
        url: '/api/messages/collect/req.json',
        param: {
          reqMsg: reqMsg
        }
      },
      onSuccess: payload => {
        console.info(payload);
        let entity = payload.entity.data;
        dispatch(ContainerActions.closeModal());
        if (payload.entity.success) {
          if (entity.process_code == "10007") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"简单密码或初始密码无法登录"}/>));
          } else if (entity.process_code == "10008") {
            dispatch(Actions.userinfoJingdong);
          } else if (entity.process_code == "10002") {
            dispatch(Actions.userinfoNote);
          } else if (entity.process_code == "10009") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"验证信息错误"}/>));
          } else if (entity.process_code == "30000") {
            dispatch(ContainerActions.showErrModal(<MessageModal
              message={"网络异常、运营商异常或当天无法下发短信验证码所导致的无法登陆"}/>));
          } else if (entity.process_code == "0") {
            dispatch(ContainerActions.showErrModal(<MessageModal
              message={"运营商网站异常或者服务更新升级导致不可用"}/>));
          } else {
            dispatch(ContainerActions.showErrModal(<MessageModal message={entity.content}/>));
          }
        } else {
          dispatch(ContainerActions.showErrModal(<MessageModal message={payload.message}/>));
        }
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      }
    });
  };
}

export function userinfo_jingdong(account, password) {
  return (dispatch, getState) => {
    var reqMsg = {};
    reqMsg["token"] = getState().userinfoState.UserinfoInfo.entity.data.token;
    reqMsg["website"] = "jingdong";
    reqMsg["account"] = account;
    reqMsg["password"] = password;

    dispatch({
      type: [, [ActionTypes.JXL_JINGDONG, ActionTypes.MY_CREDIT_JXL, ActionTypes.UPDATE_JXL]],
      req: {
        method: 'post',
        url: '/api/messages/collect/req.json',
        param: {
          reqMsg: reqMsg
        }
      },
      onSuccess: payload => {
        console.info(payload);
        let entity = payload.entity.data;
        if (payload.entity.success) {
          dispatch(ContainerActions.closeModal());
          if (entity.content == "开始采集行为数据") {
            dispatch({
              type: [],
              req: {
                method: 'post',
                url: '/userinfo/updateUserJXL.json',
                param: {
                  id: getState().userState.userInfo.id
                }
              }
            });
            dispatch(ContainerActions.showErrModal(<MessageModal message={"采集完成"}/>));
            //  browserHistory.push('/myCredit');
            //dispatch(Actions.myCredit);
            dispatch(Actions.dismiss);
          } else {
            dispatch(ContainerActions.showErrModal(<MessageModal message={entity.content}/>));
          }
        } else {
          dispatch(ContainerActions.showErrModal(<MessageModal message={payload.message}/>));
        }
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      }
    });
  }
}

export function userinfo_skip() {
  return (dispatch, getState) => {
    var reqMsg = {};
    reqMsg["token"] = getState().userinfoState.UserinfoInfo.entity.data.token;
    reqMsg["website"] = "jingdong";
    dispatch({
      type: [, [ActionTypes.USERINFO_SKIP, ActionTypes.MY_CREDIT_JXL, ActionTypes.UPDATE_JXL]],
      req: {
        method: 'post',
        url: '/api/messages/collect/skip.json',
        param: {
          reqMsg: reqMsg
        }
      },
      onSuccess: payload => {
        console.info(payload);
        let entity = payload.entity.data;
        dispatch(ContainerActions.closeModal());
        if (payload.entity.success) {
          if (entity.type == "ERROR") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"操作流程错误"}/>));
          } else if (entity.type == "CONTROL") {
            dispatch({
              type: [],
              req: {
                method: 'post',
                url: '/userinfo/updateUserJXL.json',
                param: {
                  id: getState().userState.userInfo.id
                }
              }
            });
            dispatch(ContainerActions.showErrModal(<MessageModal message={entity.content}/>));
            setTimeout(function () {
              //   browserHistory.push('/myCredit');
              dispatch(Actions.pop);
              dispatch(Actions.pop);
              dispatch(Actions.pop);
            }, 2000);
          } else {
            dispatch(ContainerActions.showErrModal(<MessageModal message={entity.content}/>));
          }
        } else {
          dispatch(ContainerActions.showErrModal(<MessageModal message={payload.message}/>));
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
    console.info(getState());
    let entity = getState().userinfoState.UserinfoInfo.entity.data;
    reqMsg["token"] = entity.token;
    reqMsg["website"] = entity.datasource.website;
    reqMsg["account"] = entity.cell_phone_num;
    reqMsg["password"] = getState().userinfoState.passwd;
    reqMsg["captcha"] = password;
    reqMsg["type"] = "SUBMIT_CAPTCHA";

    dispatch({
      type: [, ActionTypes.JXL_NOTE],
      req: {
        method: 'post',
        url: '/api/messages/collect/req.json',
        param: {
          reqMsg: reqMsg
        }
      },
      onSuccess: payload => {
        console.info(payload);
        let entity = payload.entity.data;
        dispatch(ContainerActions.closeModal());
        if (payload.entity.success) {
          if (entity.process_code == "10008") {
            //     browserHistory.push('/userinfoJingdong');
            dispatch(Actions.userinfoJingdong);
          } else if (entity.process_code == "10004") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"短信验证码错误"}/>));
          } else if (entity.process_code == "10006") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"短信验证码错误"}/>));
          } else if (entity.process_code == "10009") {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"验证信息错误"}/>));
          } else if (entity.process_code == "30000") {
            dispatch(ContainerActions.showErrModal(<MessageModal
              message={"网络异常、运营商异常或当天无法下发短信验证码所导致的无法登陆"}/>));
          } else if (entity.process_code == "0") {
            dispatch(ContainerActions.showErrModal(<MessageModal
              message={"运营商网站异常或者服务更新升级导致不可用"}/>));
          } else {
            dispatch(ContainerActions.showErrModal(<MessageModal message={entity.content}/>));
          }
        } else {
          dispatch(ContainerActions.showErrModal(<MessageModal message={payload.message}/>));
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
    console.info(getState());
    let entity = getState().userinfoState.UserinfoInfo.entity.data;
    reqMsg["token"] = entity.token;
    reqMsg["website"] = entity.datasource.website;
    reqMsg["account"] = entity.cell_phone_num;
    reqMsg["password"] = getState().userinfoState.passwd;
    reqMsg["type"] = "RESEND_CAPTCHA";

    dispatch({
      type: [, ActionTypes.RETRYNOTE],
      req: {
        method: 'post',
        url: '/api/messages/collect/req.json',
        param: {
          reqMsg: reqMsg
        }
      },
      onSuccess: payload => {
        console.info(payload);
        let entity = payload.entity.data;
        dispatch(ContainerActions.closeModal());
        if (payload.entity.success) {
          if (entity.process_code == "30000") {
            dispatch(ContainerActions.showErrModal(<MessageModal
              message={"网络异常、运营商异常或当天无法下发短信验证码所导致的无法登陆"}/>));
          } else if (entity.process_code == "0") {
            dispatch(ContainerActions.showErrModal(<MessageModal
              message={"运营商网站异常或者服务更新升级导致不可用"}/>));
          } else {
            dispatch(ContainerActions.showErrModal(<MessageModal message={"发送成功"}/>));
          }
        } else {
          dispatch(ContainerActions.showErrModal(<MessageModal message={payload.message}/>));
        }
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      }
    });
  }
}