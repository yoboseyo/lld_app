import { Actions } from 'react-native-redux-router';
import * as ActionTypes from './action-types';
import * as ContainerActions from './container-actions';

export function initRepayment() {
  return (dispatch, getState) => {
 
    const userState = getState().userState;
    const userId = userState.userInfo.id;
    if (!userId) {
      return;
    }
  dispatch({
      type: [, ActionTypes.INIT_REPAYMENT],
      req: {
        method: 'post',
        url: '/repay/init.json',
        param: {
          userId: userId
        }
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

export function repay(isRenew) {
  return (dispatch, getState) => {

    const userState = getState().userState;
    const userId = userState.userInfo.id;
    if (!userId) {
      return;
    }
    dispatch({
      type: [, isRenew === false ? ActionTypes.REPAY_SUCCESS : ActionTypes.NOTHING],
      req: {
        method: 'post',
        url: '/repay/repay.json',
        param: {
          userId: userId,
          isRenew: isRenew,
        },
      },
      onSuccess:payload => {
        dispatch(ContainerActions.closeModal());
        dispatch(Actions.home);
      },
      onFailure:(err, res) => {
        dispatch(ContainerActions.closeModal());
      },

    });
  };
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
          userId: userId,
        },
      },
      onSuccess:payload => {
        //dispatch(ContainerActions.closeModal());
      },
      onFailure: (err, res) => {
        //dispatch(ContainerActions.closeModal());
      },

    });
  };
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
      //  browserHistory.push('/');
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
      }

    });
  }
}

export function switchButton() {
  return (dispatch) => dispatch({
    type: ActionTypes.SWITCH_BUTTON,
  });
}

export function showClosePayModal() {
  return (dispatch) => dispatch({
    type: ActionTypes.SHOW_CLOSE_PAY_MODAL,
  });
}
