import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import RepayBtn from './RepaymentBtn';

class RepayTabItem extends Component {

  render() {
    const {
      check,
      overdue,
      accountManage,
      interest,
      fine,
      amount,
      overAll,
    } = this.props.repaySpec;
    return (
      <View style={styles.container}>
        <View style={styles.repaySection}>
          <View style={styles.repayItem1}>
            {this.props.productCode === '2000d' && !this.props.isRenew ?
              <Text style={styles.aliTextRow}>费用
                <Text style={styles.amountText}> 0 </Text>元
              </Text> :
              <Text style={styles.aliTextRow}>快速信审费
                <Text style={styles.amountText}> {check} </Text>元
            </Text>
            }
            {overdue > 0 ?
              <Text style={styles.aliTextRow}>逾期天数
                <Text style={styles.amountText}> {overdue} </Text>天
              </Text> : null}
            {this.props.productCode === '2000d' && !this.props.isRenew ? null :
              <Text style={styles.aliTextRow}>账户管理费
                <Text style={styles.amountText}> {accountManage} </Text>元
              </Text>
            }
          </View>
          <View style={styles.repayItem2}>
            {this.props.productCode === '2000d' && !this.props.isRenew ?
              <Text style={styles.aliTextRow}>本金
                <Text style={styles.amountText}> 2000 </Text>元
              </Text> :
              <Text style={styles.aliTextRow}>利息
                <Text style={styles.amountText}> {interest} </Text>元
              </Text>
            }
            {overdue > 0 ?
              <Text style={styles.aliTextRow}>滞纳金
                <Text style={styles.amountText}> {fine} </Text>元
              </Text> : null}
            {this.props.productCode === '2000d' && !this.props.isRenew ? null :
              <Text style={styles.aliTextRow}>{this.props.isRenew ? '续期费' : '本金'}
                <Text style={styles.amountText}> {amount} </Text>元
              </Text>
            }
          </View>
        </View>
        <View style={styles.repayRow}>
          <View style={styles.repayTotal}>
            <Image style={styles.imgAli} source={require('image!icon_rmb')} />
            <Text style={styles.aliTitleText}>应还总额
              <Text style={styles.amountText}> {overAll} </Text>元
            </Text>
          </View>
          <View style={styles.repayBtn}>
            {this.props.isRepayable ?
              <RepayBtn
                overall={overAll}
                btnName={this.props.isRenew ? '我要续期' : '我要还款'}
                repay={this.props.repay}
                isCardBound={this.props.isCardBound}
                getValidateCode={this.props.getValidateCode}
                bankTail={this.props.bankTail}
                showClosePayModal={this.props.showClosePayModal}
                payModalShown={this.props.payModalShown}
              /> : null}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    paddingBottom: 30,
    backgroundColor: 'white',
    marginBottom: 10,
  },
  repaySection: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 70,
    paddingLeft: 35,
  },
  repayItem1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    //padding: 10,
  },

  repayItem2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
   // padding: 10,
  },

  contact: {
    height: 23,
    margin: 10,
    marginTop: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTxt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  txt: {
    fontSize: 12,
    color: '#727174',
  },
  imgAli: {
    width: 20,
    height: 25,
  },
  repayRow: {
    flexDirection: 'row',
    height: 96,
    backgroundColor: '#d4e6fc',
    paddingTop: 20,
    paddingRight: 10,
    paddingBottom: 20,
    paddingLeft: 35,
  },
  repayTotal: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },
  aliTitleText: {
    paddingLeft: 5,
  },
  repayBtn: {
    flex: 1,
    justifyContent: 'center',
    // alignItems: 'stretch',
   // backgroundColor: 'grey'
  },
  aliTextRow: {
    padding: 2,
    color: '#aeaeae',
    paddingTop: 10,

  },
  amountText: {
    color: '#1d7cf0',
    paddingLeft: 5,
    paddingRight: 5,
  },
});

RepayTabItem.propTypes = {
  repaySpec: React.PropTypes.object,
  isRenew: React.PropTypes.bool,
  isRepayable: React.PropTypes.bool,
  isCardBound: React.PropTypes.number,
  bankTail: React.PropTypes.string,
  getValidateCode: React.PropTypes.func,
  showClosePayModal: React.PropTypes.func,
  repay: React.PropTypes.func,
  productCode: React.PropTypes.string,
  payModalShown: React.PropTypes.bool,
};

export default RepayTabItem;
