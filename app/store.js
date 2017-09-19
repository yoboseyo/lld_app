import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import middleware from './middleware';
import thunk from 'redux-thunk';
import request from './middleware/request';
import logger from 'redux-logger';

// const store = createStore(reducers,
//     applyMiddleware(middleware));
let store;
if (process.env.NODE_ENV === 'production') {
  store = createStore(reducers, applyMiddleware(thunk, request));
} else {
  store = createStore(reducers, applyMiddleware(thunk, logger(), request));
}
export default store;
