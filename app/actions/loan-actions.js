import { Actions } from 'react-native-redux-router';
import * as ActionTypes from './action-types';
import * as ContainerActions from './container-actions';
import {
  NativeModules,
  NativeAppEventEmitter,
} from 'react-native';

var getData = NativeModules.getUserInfo;



export function createLoan() {

  return (dispatch, getState) => {
    const userState = getState().userState;
    const loanState = getState().loanState;
    const userId = userState.userInfo.id;
    const productCode = loanState.productCode;
    if (!userId || !productCode) {
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log(userState);
      console.log(`creating loan with productCode: ${productCode} for userId: ${userId}`);
    }
    getData.CallbackDeviceAndRegistID((error, events) => {
      if (error) {
        console.error(error);
      } else {
        let dToken = events[0].PushRegistInfo;
        dispatch({
          type: [ ActionTypes.CREATE_LOAN_START,
            ActionTypes.CREATE_LOAN_FULFILLED,
            ActionTypes.CREATE_LOAN_REJECTED],
          req: {
            method: 'create',
            url: '/loan/loan.json',
            param: { userId: userId, productCode: productCode, commingPlatform: 'ios1', deviceToken: dToken},
            /*param: { userId: userId, productCode: productCode},*/
          },
          onSuccess: () => {
            dispatch(ContainerActions.closeModal());
            dispatch(Actions.myloan);
          },
          onFailure: (err, res) => {
            dispatch(ContainerActions.closeModal());
          },
        });
      }
    })
  };
}

export function getCurLoan(userId) {
  return (dispatch, getState) => dispatch({
    type: [ActionTypes.GET_LOAN_START, ActionTypes.GET_LOAN_FULFILLED, ActionTypes.GET_LOAN_REJECTED, false],
    req: {
      method: 'get',
      url: '/loan/loan.json',
      param: {
        userId: userId.toString(),
      }
    }
  });
}

export function selectProduct(productCode,productSpecs) {
  return dispatch => {
    dispatch({
      type: ActionTypes.SELECT_PRODUCT,
      productCode:productCode,
      productSpecs: productSpecs,
    });
  };
}

export function getCurLoanList(userId, func) {
  return (dispatch, getState) => dispatch({
    type: [ActionTypes.GET_LOANLIST_START, ActionTypes.GET_LOANLIST_FULFILLED, ActionTypes.GET_LOANLIST_REJECTED, false],
    req: {
      method: 'get',
      url: '/loan/loans.json',
      param: {
        userId: userId.toString(),
      }
    },
    onSuccess: () => {
      if(func) func();
    }
  });
}

export function cancelLoan(userId, loanId) {
  return (dispatch) => {
    if (!userId || !loanId) {
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log(`canceling loan: ${loanId} for userId: ${userId}`);
    }
    dispatch({
      type: [ActionTypes.CANCEL_LOAN_START, ActionTypes.CANCEL_LOAN_FULFILLED, ActionTypes.CANCEL_LOAN_REJECTED],
      req: {
        method: 'update',
        url: '/loan/cancel.json',
        param: {userId: userId, loanId: loanId}
      }
    });
  }
}

export function submitLoan(userId, loanId) {
  return (dispatch) => {
    if (!userId || !loanId) {
      return;
    }
    if (process.env.NODE_ENV !== 'production') {
      console.log(`submitting loan: ${loanId} for userId: ${userId}`);
    }
    dispatch({
      type: [ActionTypes.SUBMIT_LOAN_START, ActionTypes.SUBMIT_LOAN_FULFILLED, ActionTypes.SUBMIT_LOAN_REJECTED],
      req: {
        method: 'update',
        url: '/loan/submit.json',
        param: {userId: userId, loanId: loanId}
      }
    });
  }
}

export function getContractInfo(loanId) {
  return (dispatch, getState) => dispatch({
    type: [ActionTypes.GET_CONTRACTINFO_START, ActionTypes.GET_CONTRACTINFO_FULFILLED, ActionTypes.GET_CONTRACTINFO_REJECTED, false],
    req: {
      method: 'get',
      url: '/loan/contractInfo.json',
      param: {
        id: loanId,
      }
    }
  });
}

export function getMineProducts(func){
  return (dispatch, getState) => {
    let userId = getState().userState.userInfo.id;
    dispatch({
      type: [],
      req: {
        method: 'post',
        url: '/loan/getMineProducts.json',
        param: {
          userId: userId.toString(),
        }
      },
      onSuccess: (payload)=>{
        dispatch(ContainerActions.closeModal());
        console.log(payload);
        dispatch({
          type: ActionTypes.GET_MINE_PRODUCTS,
          payload: payload,
        });
        if(func){
          func();
        }
      },
      onFailure: (err, res) => {
        dispatch(ContainerActions.closeModal());
        console.log(res);
        console.log(err);
      }
    });
  }
}
