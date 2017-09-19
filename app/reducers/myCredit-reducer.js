import * as ActionTypes from '../actions/action-types';

const initialState = {
  mandatory: [0,0,0,0],
  optional: [0],
  type: ''
};


export default function creditReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.MY_CREDIT_ZHIMA:
    {
      const newState = {...state};
      newState.mandatory[2] = 1;
      return newState;
    }
    case ActionTypes.MY_CREDIT_BANKCARD:
    {
      const newState = {...state};
      newState.mandatory[3] = 1;
      return newState;
    }
    case ActionTypes.MY_CREDIT_JXL:
    {
      const newState = {...state};
      newState.mandatory[0] = 1;
      return newState;
    }
    case ActionTypes.MY_CREDIT_PIC_UPLOAD:
    {
      const newState = {...state};
      //newState.mandatory[1] = 1;
      return newState;
    }
    case ActionTypes.MY_CREDIT_INIT:
    {
      const newState = {...state};
      const entity = payload.entity.user;
      newState.mandatory = [entity.jxlSts,entity.picSts,entity.zhimaOpenId?1:0,entity.yhkSts];
      newState.optional = [entity.jdSts];
      return newState;
    }
    case ActionTypes.LLDATTESTATIONTYPE:
    {
      const newState = {...state};
      newState.type = payload.entity;
      return newState;
    }
    default:
      return state;
  }
}