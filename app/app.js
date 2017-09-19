import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import AppRouter from './router';
import { loadUserInfo } from './actions/user-actions';
import * as CreditActions from './actions/myCredit-actions';

store.dispatch(loadUserInfo());
// store.dispatch(CreditActions.myCreditInit());

// Provider is a top-level component that wrapps our entire application, including
// the Router. We pass it a reference to the store so we can use react-redux's
// connect() method for Component Containers.

export default lldApp = () => {
  return (
    <Provider store={store}>
      { <AppRouter /> }
    </Provider>
  );
};
