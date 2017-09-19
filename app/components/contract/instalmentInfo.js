import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import dateFormat from 'dateformat';

export default class InstalmentInfo extends Component {

  render() {
    const { amount, period, sum, auditFee, mgmtFee, interest, instalments, loanTime, dueDate } = this.props.instalmentInfo;
    const periodString = instalments > 1 ? `${(instalments || '')}月` : `${(period || '')}天`;

    return (
      <View>
        <Text style={styles.txt}>借款金额：{ amount }元</Text>
        <Text style={styles.txt}>借款期限：{ periodString }</Text>
        <Text style={styles.txt}>还款金额：{ sum }元</Text>
        <Text style={styles.txt}>包括借款本金{ amount }元，快速审核费{ auditFee }元，账户管理费{ mgmtFee }元，利息{ interest }元</Text>
        <Text style={styles.txt}>借款日期：<span>{loanTime ? dateFormat(loanTime, 'yyyy年mm月dd日') : ''}</span></Text>

        {typeof instalments === 'number'
          ? Array.apply(null, {length: instalments}).map((item, i) => renderRepayInfo(i + 1, instalments, sum, loanTime, dueDate))
          : null}
      </View>
    )
  }
}

function renderRepayInfo(index, instalments, sum, loanTime, dueDate) {
  if (typeof instalments === 'number' && instalments > 1) {
    const subSum = Math.floor(sum / instalments);
    let subDueDate = new Date(loanTime);
    subDueDate.setMonth(subDueDate.getMonth() + index);
    return (
      <View key={index}>
        <Text style={styles.txt}>第{index}期应还日期：{ subDueDate ? dateFormat(subDueDate, 'yyyy年mm月dd日') : '' }</Text>
        <Text style={styles.txt}>第{index}期应还金额：{ subSum }元</Text>
    </View>
    )
  } else {
    return (
      <Text key={index}>应还日期：{ dueDate ? dateFormat(dueDate, 'yyyy年mm月dd日') : ''}</Text>
    )
  }
}

const styles = StyleSheet.create({
  txt: {
    lineHeight: 20,
    marginBottom: 10,
  },
});
