import * as ActionTypes from '../actions/action-types';

const initialState = {
  isFetchingLoan: false,
  error: '',
  curLoan: {},
  curLoanListExpired: false,
  curLoanList: [],
  productCode: '',
  productSpecs: [],
  selectedSpec: {},
};

/*const initialState = {
  isFetchingLoan: false,
  error: '',
  curLoan: {},
  curLoanListExpired: false,
  curLoanList: [],
  productCode: '1000s',
  productSpecs: [{
    id: 1,
    productCode: '1000s',
    loanAmount: 1000,
    instalments: 1,
    period: 14,
    repayAmount: 1100,
    auditFee: 70,
    mgmtFee: 25,
    interest: 5,
  }, {
    id: 2,
    productCode: '2000d',
    loanAmount: 2000,
    instalments: 1,
    period: 21,
    repayAmount: 2200,
    auditFee: 140,
    mgmtFee: 50,
    interest: 10,
  }],
};*/

export default function loanReducer(state = initialState, action = {}) {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SELECT_PRODUCT:
      const filteredProductSpec = action.productSpecs.filter(
          (productSpec) => productSpec.productCode.indexOf(action.productCode) !== -1
      );
      let newValue = {};
      Object.assign(newValue, state, {productCode: action.productCode, selectedSpec: filteredProductSpec });
      return newValue;
    case ActionTypes.CREATE_LOAN_START:
      return { ...state, isFetchingLoan: true, error: '' };
    case ActionTypes.CREATE_LOAN_FULFILLED:
      return { ...state, isFetchingLoan: false };
    case ActionTypes.CREATE_LOAN_REJECTED:
      return { ...state, isFetchingLoan: false, error: payload.message };
    case ActionTypes.GET_LOAN_START:
      return { ...state, isFetchingLoan: true, error: '' };
    case ActionTypes.GET_LOAN_FULFILLED:
      return { ...state, isFetchingLoan: false, curLoan: payload.entity };
    case ActionTypes.GET_LOAN_REJECTED:
      return { ...state, isFetchingLoan: false, error: payload.message };
    case ActionTypes.GET_LOANLIST_START:
      return { ...state, isFetchingLoan: true, error: '' };
    case ActionTypes.GET_LOANLIST_FULFILLED:
      return { ...state, isFetchingLoan: false, curLoanList: payload.entity, curLoanListExpired: false };
    case ActionTypes.GET_LOANLIST_REJECTED:
      return { ...state, isFetchingLoan: false, error: payload.message };
    case ActionTypes.CANCEL_LOAN_START:
      return { ...state, isFetchingLoan: true, error: '' };
    case ActionTypes.CANCEL_LOAN_FULFILLED:
      return { ...state, isFetchingLoan: false, curLoanListExpired: true };
    case ActionTypes.CANCEL_LOAN_REJECTED:
      return { ...state, isFetchingLoan: false, error: payload.message };
    case ActionTypes.SUBMIT_LOAN_START:
      return { ...state, isFetchingLoan: true, error: '' };
    case ActionTypes.SUBMIT_LOAN_FULFILLED:
      return { ...state, isFetchingLoan: false, curLoanListExpired: true };
    case ActionTypes.SUBMIT_LOAN_REJECTED:
      return { ...state, isFetchingLoan: false, error: payload.message };
    case ActionTypes.GET_CONTRACTINFO_START:
      return { ...state, isFetchingLoan: true, error: '' };
    case ActionTypes.GET_CONTRACTINFO_FULFILLED:
      return { ...state, isFetchingLoan: false, curLoan: payload.entity.loan, productSpecs: payload.entity.loanProduct };
    case ActionTypes.GET_CONTRACTINFO_REJECTED:
      return { ...state, isFetchingLoan: false, error: payload.message };
    case ActionTypes.GET_MINE_PRODUCTS:
      return { ...state, productSpecs: payload.entity}
    default:
      return state;
  }
}