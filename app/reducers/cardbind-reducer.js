import * as ActionTypes from '../actions/action-types';

const initialState = {
  userInfo:{
    bankMobile: '',
    custName: '',
    bankName: '',
    bankCard: '',
    idCardNo: '',
    province: '',
    region: '',
  },
  requestNo: '',


};

export default function repayReducer(state = initialState, action = {}) {
  const { type, payload } = action;
 // const { entity } = payload;
  switch (type) {
    case ActionTypes.INIT_CARDBIND:
    {
      const newState = {...state};
      if(payload.entity.bankMobile) {
        newState.userInfo.bankMobile = payload.entity.bankMobile;
      }else {
        newState.userInfo.bankMobile = payload.entity.mobile;
      }
      newState.userInfo.custName = payload.entity.custName;
      newState.userInfo.bankName = payload.entity.bankName;
      newState.userInfo.bankCard = payload.entity.bankCard;
      newState.userInfo.idCardNo = payload.entity.idCardNo;
      newState.userInfo.province = payload.entity.bankProvince;
      newState.userInfo.region = payload.entity.bankCity;

      return newState;
    }  
    case ActionTypes.CARDBIND:
    {
      const newState = {...state};
      newState.requestNo = payload.entity;
      return newState;
    }
    case ActionTypes.INPUT_CHANGE:
    {
      const newState = {...state};
      if(payload.name === 'mobile')
        newState.userInfo.bankMobile = payload.value;
      else if(payload.name === 'bankcard')
        newState.userInfo.bankCard = payload.value;
      else if(payload.name === 'bankname')
        newState.userInfo.bankName = payload.value;
      return newState;
    }
    case ActionTypes.CARDBIND_CONFIRM:
      return state;
    default:
      return state;
  }
}