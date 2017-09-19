import { combineReducers } from 'redux';
import { routerReducer } from 'react-native-redux-router';

// Reducers
import userReducer from './user-reducer';
import errMsgReducer from './err-msg-reducer';
import loanReducer from './loan-reducer';
import userinfoReducer from './userinfo-reducer';
import userinfohlReducer from './userinfo-hl-reducer';
import repayReducer from './repayment-reducer';
import profileReducer from './userProfile-reducer';
import containerReducer from './container-reducers';
import cardbindReducer from './cardbind-reducer';
import creditReducer from './myCredit-reducer';

// Combine Reducers
const reducers = combineReducers({
  routerReducer,
  userState: userReducer,
  errMsgState: errMsgReducer,
  loanState: loanReducer,
  userinfoState: userinfoReducer,
  userinfohlState: userinfohlReducer,
  repayState: repayReducer,
  profileState: profileReducer,
  creditState: creditReducer,
  containerState: containerReducer,
  cardbindState: cardbindReducer,
});

export default reducers;
