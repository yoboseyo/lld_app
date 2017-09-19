import * as ActionTypes from '../actions/action-types';

const initialState = {
  modal: null,
  errModal: null,
  routeToNext: null,
  loading: false,
};

export default function reducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SHOW_MODAL:
      return { ...state, modal: payload };
    case ActionTypes.CLOSE_MODAL:
      return { ...state, modal: null };
    case ActionTypes.SHOW_ERR_MODAL:
      return { ...state, errModal: payload };
    case ActionTypes.CLOSE_ERR_MODAL:
      return { ...state, errModal: null };
    case ActionTypes.ROUTE_TO_NEXT:
      return { ...state, routeToNext: payload };
    case ActionTypes.LOADING:
      return { ...state, loading: !state.loading };
    default:
      return state;
  }
}
