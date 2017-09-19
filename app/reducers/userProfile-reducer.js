import * as ActionTypes from '../actions/action-types';
const initialState = {
   profile:{},
};

export default function profileReducer(state = initialState, action = {}) {
  const { type,payload } = action;
  switch (type) {
    case ActionTypes.SELECT_USERPROFILE_USERID:
      {
        const newState = {...state};
        newState.profile = payload.entity.user;
        return newState
      }
    case ActionTypes.USER_AVATAR:
    {
      const newState = {...state};
      console.info(payload);
      newState.profile.userAvatar=payload.entity;
      return newState;
    }
    default:
      return state;
  }
}
