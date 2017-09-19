import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';

export default class LoanInfo extends Component {
  render() {
    const { loan = {} } = this.props;
    const { amount, period, payAmount } = loan;
    const periodString = (typeof period === 'number' && period >= 30) ? `${Math.floor(period / 30)}月` : `${(period || '')}天`;
    return (
      <View style={styles.wrap}>
        <View style={styles.flex}>
          <Text style={styles.txt}>借款金额</Text>
          <Text style={styles.txt}>{amount}元</Text>
        </View>
        <View style={styles.flex}>
          <Text style={styles.txt}>借款期限</Text>
          <Text style={styles.txt}>{periodString}</Text>
        </View>
        <View style={styles.flexLast}>
          <Text style={styles.txt}>到期还款</Text>
          <Text style={styles.txt}>{payAmount}元</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingBottom: 10,
    width: 346,
    borderTopWidth: 3,
    borderColor: '#f0f0f0',
  },
  flex: {
    flex: 1,
    borderRightWidth: 3,
    borderColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexLast: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    lineHeight: 30,
  },
});

LoanInfo.propTypes = {
  loan: React.PropTypes.object,
};
