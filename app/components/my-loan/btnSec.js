import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  Text,
  TouchableHighlight,
} from 'react-native';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-redux-router';
import Button from 'react-native-button';
import Ico from 'react-native-vector-icons/MaterialIcons';
import _ from 'lodash';
import Btn from '../common/LldButton';

export default class BtnSec extends Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false };
    this.closeCancelModal = this.closeCancelModal.bind(this);
    this.openCancelModal = this.openCancelModal.bind(this);
    // this.cancelLoan = this.cancelLoan.bind(this);
  }
  submitLoan(userId, loanId) {
    this.props.submitLoan(userId, loanId);
  }

  closeCancelModal() {
    this.setState({ showModal: false });
    console.info(this.state.showModal);
  }

  openCancelModal() {
    this.setState({ showModal: true });
  }

  cancelLoan(userId, loanId) {
    this.props.cancelLoan(userId, loanId);
    this.closeCancelModal();
  }

  goToContract(loanId) {
    // const path = `/contract/${loanId}`;
    // this.props.goToContract(loanId);
    // browserHistory.push(path);
    Actions.contract({ loanId : loanId });
  }

  goToRepay(renew) {
    let path = '/repay';
    if (typeof renew === 'string' && renew === 'renew') {
      path = '/repay/renew';
    }
    Actions.repay({ renew : renew });
    // browserHistory.push(path);
  }

  render() {
    const { userId, loan = {}, isFirstInLoan } = this.props;
    const { id:loanId, status:loanStatus, renewAmount, jxlSts } = loan;
    const { cancelBtn, applyBtn, contractBtn, repayBtn, renewBtn } = getBtnsStatus(loanStatus, renewAmount, jxlSts);
    /*var arr = [contractBtn,cancelBtn,applyBtn,repayBtn,renewBtn];*/
    var arr = [cancelBtn,applyBtn,repayBtn];
    var arrSty = [,,];
    var num = 0;
    for(var i = 0; i < 3; i++){
      if(arr[i] == 1){
        num ++;
      }
    }
    if(num == 3){
      for(var i = 0; i < 3; i++){
        if(arr[i]==1&&num==3){
          arrSty[i] = styles.btnLeft;
          num --;
        } else if(arr[i]==1&&num==2){
          arrSty[i] = styles.btnC;
          num --;
        } else if(arr[i]==1&&num==1){
          arrSty[i] = styles.btnRight;
          num --;
        }
      }
    }
    if(num == 2){
      for(var i = 0; i < 3; i++){
        if(arr[i]==1&&num==2){
          arrSty[i] = styles.btnLeft;
          num --;
        } else if(arr[i]==1&&num==1){
          arrSty[i] = styles.btnRight;
          num --;
        }
      }
    }
    if(num == 1) {
      for (var i = 0; i < 3; i++) {
        if (arr[i] == 1 && num == 1) {
          arrSty[i] = styles.btn;
          num--;
        }
      }
    }

    return (
      <View>
        <View style={styles.wrap}>
        {/*  {
            contractBtn === 1 ?
              <Btn containerStyle={arrSty[0]} name={'查看合同'} onPress={this.goToContract.bind(this, loanId)} />
             : null
          }*/}
          {
            cancelBtn === 1 ?
              <Btn containerStyle={arrSty[0]} name={'取消申请'} onPress={this.openCancelModal} />
             : null
          }
          {
            applyBtn === 1 ?
              <Btn containerStyle={arrSty[1]} name={'提交申请'} onPress={this.submitLoan.bind(this, userId, loanId)} />
             : null
          }
          {
            repayBtn === 1 ?
              <Btn containerStyle={arrSty[2]} disabled={!isFirstInLoan} name={'还款'} onPress={this.goToRepay.bind(this, 0)} />
             : null
          }
          {/*{
            renewBtn === 1 ?
              <Btn containerStyle={arrSty[4]} disabled={!isFirstInLoan} name={'续期'} onPress={this.goToRepay.bind(this, 1)} />
            : null
          }*/}
        </View>
        <View>
          <Modal
            visible={this.state.showModal}
            transparent={true}
          >
            <View style={{ marginTop: 20, backgroundColor: 'rgba(0,0,0,0.7)', height: Dimensions.get('window').height }}>
              <View style={{ margin: 20, padding: 15, backgroundColor: '#fff', borderRadius: 5 }}>
                <Text>
                  确认要取消申请吗?
                </Text>
                <View style={{ marginTop: 20, flexDirection: 'row', }}>
                  <Btn containerStyle={styles.modalCancelBtn} style={styles.modalBtnTxt} name="取消" onPress={this.closeCancelModal} />
                  <Btn containerStyle={styles.modalBtn} name="确定" onPress={this.cancelLoan.bind(this, userId, loanId)} />
                </View>
                <TouchableHighlight style={{ position: 'absolute', right: 10, top: 10 }} onPress={this.closeCancelModal}>
                  <Ico name="clear" color="#ccc" size={25} />
                </TouchableHighlight>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  }
}

BtnSec.propTypes = {
  goToContract: React.PropTypes.func,
};

const styles = StyleSheet.create({
  wrap: {
    marginTop: 10,
    flexDirection: 'row',
    width: 330,
  },
  btnLeft: {
    flex: 1,
    height: 45,
    backgroundColor: '#1d7cf0',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 100,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  btnC: {
    flex: 1,
    height: 45,
    backgroundColor: '#1d7cf0',
    borderColor: '#fff',
    borderWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  btnRight: {
    flex: 1,
    height: 45,
    backgroundColor: '#1d7cf0',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 100,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  btn: {
    flex: 1,
    height: 45,
    backgroundColor: '#1d7cf0',
    borderRadius: 30,
    alignSelf: 'stretch',
    justifyContent: 'center',
  },
  modalBtn: {
    flex: 1,
    height: 36,
    backgroundColor: '#1d7cf0',
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
  },
  modalCancelBtn: {
    flex: 1,
    height: 36,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginLeft: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#1d7cf0',
  },
  modalBtnTxt: {
    fontSize: 16,
    color: '#1d7cf0',
    alignSelf: 'center',
  },
});

function getBtnsStatus(loanStatus, renewAmount, jxlSts) {
  let btnsStatus = {
    cancelBtn: 0,
    applyBtn: 0,
    contractBtn: 0,
    continueBtn: 0,
    repayBtn: 0,
    renewBtn: 0,
  };

  if (typeof loanStatus !== 'number') {
    return btnsStatus;
  }

  if (loanStatus === 0) {
    btnsStatus.cancelBtn = 1;
    if (jxlSts === 1) {
      btnsStatus.applyBtn = 1;
    }
  } else if (loanStatus === -1) {
  } else if (_.includes([5, 10, 15, 20], loanStatus)) {
    btnsStatus.contractBtn = 1;
  } else if (loanStatus === 13) {
    btnsStatus.continueBtn = 1;
    btnsStatus.contractBtn = 1;
  } else if (loanStatus === 21) {
  } else if (_.includes([30, 31, 32], loanStatus)) {
    btnsStatus.contractBtn = 0;
    btnsStatus.repayBtn = 1;
    if (renewAmount !== 0) {
      // hide renewBtn
      // btnsStatus.renewBtn = 1;
    }
  } else if (_.includes([40, 41], loanStatus)) {
    btnsStatus.contractBtn = 0;
  }
  return btnsStatus;
}
