/**
 * Created by Administrator on 2016/9/13.
 */
import * as ActionTypes from '../actions/action-types';

const initialState = {
    UserinfoInfo: {},
    UserinfoMessage:{
        certNo :'',
        custName:'',
        passwd:''
    },
    JXL_mobile:{},
    JXL_jingdong:{},
    jxlSkip:{}
};

export default function userinfoReducer(state = initialState, action = {}) {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.CREATE_USERINFO:
            return  {UserinfoInfo:payload};
        case ActionTypes.JXL_APPLY:
            return  {UserinfoInfo:payload};
        case ActionTypes.JXL_MOBILE:
            {
                const newState = {...state};
                newState.JXL_mobile=payload;
               return newState
            }
        case ActionTypes.JXL_NOTE:
            {
                const newState = {...state};
                return newState
            }
        case ActionTypes.RETRYNOTE:
            {
                const newState = {...state};
                newState.JXL_mobile=payload;
                return newState
            }
        case ActionTypes.USERINFO_SKIP:
            {
                const newState = {...state};
                newState.jxlSkip=payload;
                return newState
            }
        case ActionTypes.JXL_JINGDONG:
            {
                const newState = {...state};
                newState.JXL_mobile=payload;
                newState.JXL_jingdong=payload;
                return newState
            }
        default:
            return state;
    }
}