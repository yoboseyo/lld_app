import * as ActionTypes from './action-types';
import * as ContainerActions from './container-actions';
//import { browserHistory } from 'react-router'

export function zhimaAuth() {
    return (dispatch, getState) => {

        const userState = getState().userState;
        const userId = userState.userInfo.id;
        if (!userId) {
            return;
        }
        dispatch({
            type: [, ActionTypes.ZHIMA],
            req: {
                method: 'post',
                url: '/user/authorizeZhimaApp.json',
                param: {
                    userId: userId,
                },
            },
            onSuccess:payload => {

                //window.location.href = payload.entity;
                dispatch(ContainerActions.closeModal());
            },
            onFailure: (err, res) => {
                dispatch(ContainerActions.closeModal());
            }
        });
    }
}

export function updateZhima(params) {
    return (dispatch, getState) => {

        const userState = getState().userState;
        const userId = userState.userInfo.id;
        if (!userId) {
            return;
        }
        dispatch({
            type: [, [ActionTypes.MY_CREDIT_ZHIMA, ActionTypes.UPDATE_ZHIMA]],
            req: {
                method: 'post',
                url: '/user/updateZhima.json',
                param: {
                    userId: userId,
                    params: params
                }
            },
            onSuccess:payload => {
                //dispatch(ContainerActions.closeModal());
              //  browserHistory.push("/myCredit");
            },
            onFailure: (err, res) => {
                //dispatch(ContainerActions.closeModal());
                //browserHistory.push("/myCredit");
            }

        });
    }
}

export function cardBindRepay() {
    return (dispatch, getState) => {

        const userState = getState().userState;
        const userId = userState.userInfo.id;
        if (!userId) {
            return;
        }
        dispatch({
            type: [, ActionTypes.CARDBIND_REPAY],
            req: {
                method: 'post',
                url: '/repay/cardBindRepay.json',
                param: {
                    userId: userId
                }
            },
            onSuccess:payload => {
                //dispatch(ContainerActions.closeModal());
            },
            onFailure: (err, res) => {
                //dispatch(ContainerActions.closeModal());
            }

        });
    }
}

export function repayWithCardBound(validateCode, isRenew) {
    return (dispatch, getState) => {

        const userState = getState().userState;
        const userId = userState.userInfo.id;
        const repayState = getState().repayState;
        if (!userId) {
            return;
        }
        dispatch({
            type: [],
            req: {
                method: 'post',
                url: '/repay/repayWithCardBound.json',
                param: {
                    userId: userId,
                    validateCode: validateCode,
                    requestNo: repayState.requestNo,
                    isRenew: isRenew
                }
            },
            onSuccess:payload => {
                dispatch(ContainerActions.closeModal());
            },
            onFailure: (err, res) => {
                dispatch(ContainerActions.closeModal());
            }

        });
    }
}

export function myCreditInit() {
    return (dispatch, getState) => {
        let userId = getState().userState.userInfo.id;
        dispatch({
            type:[ ,ActionTypes.MY_CREDIT_INIT],
            req: {
                method: "post",
                url: "/user/getUserInfoById.json",
                param: {
                    id: userId
                }
            },
            onSuccess: (payload) => {
                // localStorage.setItem('userInfo', JSON.stringify(payload.entity));
                dispatch(ContainerActions.closeModal());//ActionTypes.UPDATE_ZHIMA
            },
            onFailure: (err, res) => {
                dispatch(ContainerActions.closeModal());
            }
        });
    }
}

export function updateZhimaState() {
  return (dispatch) => dispatch({
    type: ActionTypes.UPDATE_ZHIMA,
  });
}

