/**
 * Created by Administrator on 2016/9/13.
 */
import * as ActionTypes from '../actions/action-types';

const initialState = {
    HL_UserinfoInfo: {},
    HL_UserinfoMessage:{
        certNo :'',
        custName:'',
        passwd:''
    },
    HL_mobile:{},
    HL_jingdong:{},    
    HL_Skip:{}
};

export default function userinfohlReducer(state = initialState, action = {}) {
    const { type, payload } = action;
    switch (type) {
        case ActionTypes.CREATE_USERINFO_HL:
            {
                console.info(11111);
                const newState = {...state};
                return newState
            }
        case ActionTypes.HL_APPLY:
            return  {HL_UserinfoInfo:payload};
        case ActionTypes.HL_MOBILE:
            {
                const newState = {...state};
                newState.HL_mobile=payload;
               return newState
            }
        case ActionTypes.HL_NOTE:
            {
                const newState = {...state};
                return newState
            }
        case ActionTypes.RETRYNOTE_HL:
            {
                const newState = {...state};
                newState.HL_mobile=payload;
                return newState
            }
        case ActionTypes.USERINFO_SKIP_HL:
            {
                const newState = {...state};
                newState.HL_Skip=payload;
                return newState
            }
        case ActionTypes.HL_JINGDONG:
            {
                const newState = {...state};
                newState.HL_mobile=payload;
                newState.HL_jingdong=payload;
                return newState
            }
        default:
            return state;
    }
}