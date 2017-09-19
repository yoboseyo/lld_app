import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-redux-router';
import MyLoan from './myLoan';
import * as LoanActions from '../../actions/loan-actions';
import * as ContainerActions from '../../actions/container-actions';

class MyLoanContainer extends React.Component {
  constructor(props) {
    super(props);
    this.submitLoan = this.submitLoan.bind(this);
    this.cancelLoan = this.cancelLoan.bind(this);
  }
  componentWillMount() {
    const { userInfo } = this.props.userState;
    const { id: userId } = userInfo;
    this.props.actions.getCurLoanList(userId);
  }
  componentWillUpdate(nextProps) {
    // check whether loan2 list expired, reload accordingly
    const { curLoanListExpired: curLoanListExpiredNext } = nextProps.loanState;
    const { curLoanListExpired } = this.props.loanState;
    if (!curLoanListExpired && curLoanListExpiredNext) {
      const { userInfo } = this.props.userState;
      const { id: userId } = userInfo;
      this.props.actions.getCurLoanList(userId);
    }
  }
  submitLoan(userId, loanId) {
    this.props.actions.submitLoan(userId, loanId);
  }
  cancelLoan(userId, loanId) {
    // this.props.actions.cancelLoan(userId, loanId);
  }
  /*
  goToContract(loanId) {
    const { productSpecs } = this.props.loanState;
    const { userInfo } = this.props.userState;
    const type = {
      loanId: loanId,
    };
    console.info(loanId);
    (Actions.contract(type));
    // this.props.dispatch(Actions.contract(type));
    }*/
  /* handleRefresh(resolve, reject) {
    const {userInfo} = this.props.userState;
    const {id:userId} = userInfo;
    this.props.actions.getCurLoanList(userId);
    if (1) {
      resolve();
    } else {
      reject();
    }
  }*/

  render() {
    const { userInfo } = this.props.userState;
    const { id: userId } = userInfo;
    const { curLoanList } = this.props.loanState;
    let isFirstInLoanFound = false;
    return (
      <ScrollView>
        { typeof curLoanList === 'object' ?
          curLoanList.map((loan) => {
            let isFirstInLoan = false;
            if (loan.status === 30 || loan.status === 31) {
              isFirstInLoan = isFirstInLoanFound ? 0 : 1;
              isFirstInLoanFound = true;
            }
            return (<MyLoan
              key={loan.id}
              userId={userId}
              loan={loan}
              isFirstInLoan={isFirstInLoan}
              actions={this.props.actions}
              submitLoan={this.submitLoan}
              cancelLoan={this.cancelLoan}
            />);
          })
          : <Text>您还没有借款！</Text>}
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  userState: state.userState,
  loanState: state.loanState,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(LoanActions, dispatch),
  containerActions: bindActionCreators(ContainerActions, dispatch),
});

MyLoanContainer.propTypes = {
  userState: React.PropTypes.object,
  loanState: React.PropTypes.object,
  actions: React.PropTypes.objectOf(React.PropTypes.func),
  dispatch: React.PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyLoanContainer);
