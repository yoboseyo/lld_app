import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import dateFormat from 'dateformat';

export default class LoanTable extends Component {
  render() {
    const { loan = {} } = this.props;
    const { createTime, loanUID, loanTime, dueDate, convertedStatus } = loan;
    return (
      <View style={{width: 346,}}>
        <View style={styles.lineOdd}>
          <View style={styles.tTitle}><Text style={{lineHeight: 32}}>申请时间</Text></View>
          <View style={styles.tContent}><Text style={{lineHeight: 32,paddingLeft: 32,}}>{createTime ? dateFormat(new Date(createTime), 'yyyy/mm/dd') : ''}</Text></View>
        </View>
        <View style={styles.lineEven}>
          <View style={styles.tTitle}><Text style={{lineHeight: 32}}>借款编号</Text></View>
          <View style={styles.tContent}><Text style={{lineHeight: 32,paddingLeft: 32,}}>{loanUID}</Text></View>
        </View>
        <View style={styles.lineOdd}>
          <View style={styles.tTitle}><Text style={{lineHeight: 32}}>放款日期</Text></View>
          <View style={styles.tContent}><Text style={{lineHeight: 32,paddingLeft: 32,}}>{loanTime ? dateFormat(new Date(loanTime), 'yyyy/mm/dd') : ''}</Text></View>
        </View>
        <View style={styles.lineEven}>
          <View style={styles.tTitle}><Text style={{lineHeight: 32}}>应还日期</Text></View>
          <View style={styles.tContent}><Text style={{lineHeight: 32,paddingLeft: 32,}}>{dueDate ? dateFormat(new Date(dueDate), 'yyyy/mm/dd') : ''}</Text></View>
        </View>
        <View style={styles.lineOdd}>
          <View style={styles.tTitle}><Text style={{lineHeight: 32}}>借款类型</Text></View>
          <View style={styles.tContent}><Text style={{lineHeight: 32,paddingLeft: 32,}}>普通借款</Text></View>
        </View>
        <View style={styles.lineEven}>
          <View style={styles.tTitle}><Text style={{lineHeight: 32}}>借款状态</Text></View>
          <View style={styles.tContent}><Text style={{lineHeight: 32,paddingLeft: 32,}}>{convertedStatus}</Text></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  lineOdd: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  lineEven: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tTitle: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tContent: {
    flex: 2,
    lineHeight: 32,
    justifyContent: 'center',
  },
});

LoanTable.propTypes = {
  loan: React.PropTypes.object,
};
