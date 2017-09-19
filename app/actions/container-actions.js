import * as ActionTypes from './action-types';

export function showModal(modal) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SHOW_MODAL,
      payload: modal,
    });
  };
}

export function closeModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_MODAL,
    });
  };
}

export function showErrModal(modal) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.SHOW_ERR_MODAL,
      payload: modal,
    });
  };
}

export function closeErrModal() {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.CLOSE_ERR_MODAL,
    });
  };
}

export function routeToNext(page) {
  return (dispatch) => {
    dispatch({
      type: ActionTypes.ROUTE_TO_NEXT,
      payload: page,
    });
  };
}
