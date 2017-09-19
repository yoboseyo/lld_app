import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
} from 'react-native';
import Dimensions from 'Dimensions';
import LoanTable from './loanTable';
import LoanInfo from './loanInfo';
import BtnSec from './btnSec';
import LoanState from './loanstate';

export default class MyLoan extends Component {
  constructor(props) {
    super(props);
    this.submitLoan = this.submitLoan.bind(this);
    this.cancelLoan = this.cancelLoan.bind(this);
  }
  submitLoan(userId, loanId) {
    this.props.submitLoan(userId, loanId);
  }
  cancelLoan(userId, loanId) {
    this.props.cancelLoan(userId, loanId);
  }
  render() {
    const { userId, loan, isFirstInLoan, actions } = this.props;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.wrap}>
          <LoanTable loan={loan} />
          <LoanInfo loan={loan} />
          <BtnSec userId={userId} isFirstInLoan={isFirstInLoan} loan={loan} submitLoan={this.submitLoan} cancelLoan={this.cancelLoan} {...actions} />
        </View>
        <LoanState loan={loan}/>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fdfdfd',
  },
  wrap: {
    paddingTop: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
