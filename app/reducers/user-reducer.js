import * as ActionTypes from '../actions/action-types';

const initialState = {
  userInfo: {},
  logined: false,
  regSource: '',
  geoLocationFetched: false,
  registered: false,
  idInfo: {
    address:'',
    birthday:'',
    citizen_id:'',
    gender:'',
    idcard_type:'',
    name:'',
    nation:'',
  },
  checked: false,
  allowLoan: false,
};

export default function userReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.LOAD_USER_INFO:
    {
      const newState = { ...state };
      newState.userInfo = payload.userInfo;
      newState.logined = payload.logined;
      return newState;
    }
    case ActionTypes.LOGIN_SUCCESS:
    {
      const newState = { ...state };
      newState.userInfo = payload.entity;
      newState.logined = true;
      newState.idInfo = {
        address:'',
        birthday:'',
        citizen_id:'',
        gender:'',
        idcard_type:'',
        name:'',
        nation:'',
      };
      return newState;
    }
    case ActionTypes.LOGIN_FAILURE:
      return { ...state, logined: false };
    case ActionTypes.LOGOUT: {
      return {
        userInfo: {},
        logined: false,
      };
    }
    case ActionTypes.REGISTER_SUCCESS: {
      const newState = { ...state };
      newState.registered = true;
      return newState;
    }
    case ActionTypes.UPLOAD_IMAGE1:
    {
      const newState = { ...state };
      newState.idInfo = payload.entity;
      /*if (newState.userInfo.uploadImage1 &&
        newState.userInfo.uploadImage2) {
        newState.userInfo.picSts = 1;
      }*/
      return newState;
    }
    case ActionTypes.UPLOAD_IMAGE2:
    {
      const newState = { ...state};
      newState.userInfo.uploadImage2 = payload.entity;
      /*if (newState.userInfo.uploadImage1 &&
        newState.userInfo.uploadImage2) {
        newState.userInfo.picSts = 1;
      }*/
      return newState;
    }
    case ActionTypes.REG_SOURCE:
    {
      const newState = { ...state };
      newState.regSource = payload;
      return newState;
    }
    case ActionTypes.GET_USERINFO:
    {
      const newState = { ...state };
      newState.userInfo = payload.entity.user;
      newState.checked = payload.entity.checked;
      newState.allowLoan = payload.entity.allowLoan;
      return newState;
    }
    case ActionTypes.UPDATE_ZHIMA:
    {
      const newState = { ...state };
      newState.userInfo.zhimaOpenId = '1';
      return newState;
    }
    case ActionTypes.GEO_LOCATION:
    {
      const newState = { ...state };
      newState.geoLocationFetched = true;
      return newState;
    }
    case 'UPDATEAVATAR':
    {
      const newState = { ...state };
      newState.updateAvatar = payload;
      return newState;
    }
    case ActionTypes.UPDATE_YHK:
    {
      const newState = { ...state };
      newState.userInfo.yhkSts = 1;
      return newState;
    }
    case ActionTypes.UPDATE_JXL:
    {
      const newState = { ...state };
      newState.userInfo.jxlSts = 1;
      return newState;
    }
    default:
      return state;
  }
}
