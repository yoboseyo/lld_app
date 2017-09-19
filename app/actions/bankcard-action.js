import {Actions} from 'react-native-redux-router';
import * as ActionTypes from './action-types';
import * as ContainerActions from './container-actions';

export function initCardBind() {
  return (dispatch, getState) => {
    const userState = getState().userState;
    const mobile = userState.userInfo.mobile;
    if (!mobile) {
      return;
    }
  dispatch({
      type: [, ActionTypes.INIT_CARDBIND],
      req: {
        method: 'get',
        url: '/user/getUserInfo.json',
        param: {
          mobile: mobile,
        },
      },
      onSuccess:payload => {
        dispatch(ContainerActions.closeModal());
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      },
    });
  };
}

export function bindCard(custName, bankCard, bankName, bankMobile, Province, Region) {
    return (dispatch, getState) => {

        const userState = getState().userState;
        const userId = userState.userInfo.id;
        if (!userId) {
            return;
        }
        dispatch({
            type: [, ActionTypes.CARDBIND],
            req: {
                method: 'post',
                url: '/repay/cardBind.json',
                param: {
                    userId: userId,
                    custName: custName,
                    bankCard: bankCard,
                    bankName: bankName,
                    bankMobile: bankMobile,
                    province: Province,
                    region: Region
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

export function bindCardConfirm(validateCode) {
    return (dispatch, getState) => {

        const userState = getState().userState;
        const userId = userState.userInfo.id;
        const cardbindState = getState().cardbindState;
        if (!userId) {
          return;
        }
        dispatch({
            type: [, [ActionTypes.CARDBIND_CONFIRM,ActionTypes.MY_CREDIT_BANKCARD, ActionTypes.UPDATE_YHK]],
            req: {
                method: 'post',
                url: '/repay/cardBindConfirm.json',
                param: {
                    userId: userId,
                    validateCode: validateCode,
                    requestNo: cardbindState.requestNo,
                },
            },
            onSuccess:payload => {
              dispatch(ContainerActions.closeModal());
              //dispatch(Actions.dismiss);
              //dispatch(Actions.myCredit);
              dispatch(Actions.pop);
            },
            onFailure: (err, res) => {
              dispatch(ContainerActions.closeModal());
            }
        });
    }
}