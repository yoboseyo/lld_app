import * as ActionTypes from '../actions/action-types';

const initialState = {
  repaySpec: [
    {
      id: 1,
      check: 0,
      overdue: 0,
      accountManage: 0,
      interest: 0,
      fine: 0,
      amount: 0,
      overAll: 0,
    },
    {
      id: 2,
      check: 0,
      overdue: 0,
      accountManage: 0,
      interest: 0,
      fine: 0,
      amount: 0,
      overAll: 0,
    },
  ],
  productCode: '1000s',
  isRepayable: false,
  isCardBound: 0,
  bankCard: '',
  switchButton: {
    index: true,
    repaySpecIndex: 0,
  },
  payModalShown: false,
};

export default function repayReducer(state = initialState, action = {}) {
  const { type, payload } = action;
 // const { entity } = payload;
  switch (type) {
    case ActionTypes.INIT_REPAYMENT:
    {
      const newState = { ...state };

      newState.repaySpec[0].check = payload.entity.loanProduct.auditFee;
      newState.repaySpec[1].check = payload.entity.loanProduct.auditFee;

      newState.repaySpec[0].overdue = payload.entity.overdue;
      newState.repaySpec[1].overdue = payload.entity.overdue;

      newState.repaySpec[0].accountManage = payload.entity.loanProduct.mgmtFee;
      newState.repaySpec[1].accountManage = payload.entity.loanProduct.mgmtFee;

      newState.repaySpec[0].interest = payload.entity.loanProduct.interest;
      newState.repaySpec[1].interest = payload.entity.loanProduct.interest;

      newState.repaySpec[0].fine = payload.entity.overdue * payload.entity.loanProduct.overdueAmount;
      newState.repaySpec[1].fine = payload.entity.overdue * payload.entity.loanProduct.overdueAmount;

      newState.repaySpec[0].amount = payload.entity.loanProduct.loanAmount;
      newState.repaySpec[1].amount = payload.entity.loanProduct.renewAmount;

      if (payload.entity.isRepayable) {
        newState.repaySpec[0].overAll = payload.entity.repayAmount;
        newState.repaySpec[1].overAll = payload.entity.renewAmount;
      } else {
        newState.repaySpec[0].overAll = payload.entity.loanProduct.repayAmount;
        newState.repaySpec[1].overAll = payload.entity.loanProduct.renewAmount;
      }

      newState.isCardBound = payload.entity.isCardBound;
      newState.isRepayable = payload.entity.isRepayable;
      newState.bankCard = payload.entity.bankCard;
      newState.productCode = payload.entity.loanProduct.productCode;
      return newState;
    }
    case ActionTypes.CARDBIND_REPAY:
    {
      const newState = { ...state };
      newState.requestNo = payload.entity;
      return newState;
    }
    case ActionTypes.REPAY_SUCCESS:
    {
      const newState = { ...state };
      newState.isRepayable = false;
      return newState;
    }
    case ActionTypes.SWITCH_BUTTON:
    {
      const newState = { ...state };
      if (newState.switchButton.index) {
        newState.switchButton.index = false;
        newState.switchButton.repaySpecIndex = 1;
      } else {
        newState.switchButton.index = true;
        newState.switchButton.repaySpecIndex = 0;
      }
      return newState;
    }
    case ActionTypes.SHOW_CLOSE_PAY_MODAL:
    {
      const newState = { ...state };
      if (newState.payModalShown) {
        newState.payModalShown = false;
      } else {
        newState.payModalShown = true;
      }
      return newState;
    }
    default:
      return state;
  }
}
