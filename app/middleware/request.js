import React from 'react';
import * as ActionTypes from '../actions/action-types';
import * as ContainerActions from '../actions/container-actions';
import MessageModal from '../components/common/MessageModalContainer';
import * as http from '../util/http';

let serverUrl = null;
// if (__DEVELOPMENT__){
//     serverUrl = '/user';
serverUrl = 'http://portal.lanlingdai.net/lld-service'
// serverUrl = 'http://dev.lanlingdai.net/lld-service';
// } else {
//  serverUrl = '';
// }
export default ({ dispatch }) => next => action => {
  const { type, payload = null, req = {} } = action;
  if (!type || type.constructor !== Array) return next(action);

  const [BEGIN, SUCCESS, FAILURE, showMessage = true] = type;
  const { method, url, param } = req;

  dispatch({
    type: BEGIN || ActionTypes.NOTHING,
    payload: payload,
  });
  const { onSuccess = null, onFailure = null } = action;
  http[method](
    serverUrl + url, param,
    (res) => {
      if (SUCCESS && SUCCESS.constructor === Array) {
        SUCCESS.forEach(TYPE => dispatch({
          type: TYPE || ActionTypes.NOTHING,
          payload: payload || res.body,
        })
        );
      } else {
        dispatch({
          type: SUCCESS || ActionTypes.NOTHING,
          payload: payload || res.body,
        });
      }
      if (res.body.message && showMessage) {
        dispatch(ContainerActions.showErrModal(<MessageModal message={res.body.message} />));

      }
      !onSuccess || onSuccess(res.body);
    },
    (err, res) => {
      if (err && err.status === 401) {
        dispatch(ContainerActions.showErrModal(<MessageModal message={res.body.message} />));
      }
      if (res.body.message && showMessage) {
        dispatch(ContainerActions.showErrModal(<MessageModal message={res.body.message} />));
      }
      if (err && err.status === 500) {
        dispatch(ContainerActions.showErrModal(<MessageModal message={'程序内部错误'} />));
      }
      dispatch({
        type: FAILURE || ActionTypes.NOTHING,
        payload: {err: err, res: res},
      });
      !onFailure || onFailure(err, res);
    }
  );
}
