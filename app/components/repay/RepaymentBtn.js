import React from 'react';
import { Modal, Text, TouchableHighlight, View, StyleSheet } from 'react-native';

import Icon from 'react-native-vector-icons/Ionicons';
import VerificationCodeBtn from '../login/VerificationCodeBtn';
import LldButton from '../common/LldButton';
import LldTextInput from '../common/LldTextInput';
import createRepay from '../../actions/repayment-action';
import createRenewal from '../../actions/repayment-action';

class RepayBtn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.getValidateCode = this.getValidateCode.bind(this);
    this.repay = this.repay.bind(this);
  }

  getValidateCode() {
    this.props.getValidateCode();
  }

  validateMobile() {
    return true;
  }

  repay() {
    let result = false;
    if (this.vcode) {
      result = this.props.repay(this.vcode);
    } else {
      result = this.props.repay();
    }
    if (result) {
      this.close();
    }
  }

  close() {
    // this.setState({ showModal: false });
    this.props.showClosePayModal();
  }

  open() {
    // this.setState({ showModal: true });
    this.props.showClosePayModal();
  }

  render() {
    return (
      <View style={{ alignItems: 'center' }}>
        <LldButton
          onPress={this.open}
          containerStyle={styles.button}
          style={styles.buttonText}
          name={this.props.btnName}
        />
        <Modal visible={this.props.payModalShown} animationType={'slide'} transparent>
          <View style={styles.container}>
            <View style={{ backgroundColor: 'white', borderRadius: 8, marginRight: 10, marginLeft: 10 }}>
              <TouchableHighlight onPress={this.close} >
                <Icon name="ios-close-circle-outline" size={30} color="#e5e5e5" style={{ alignSelf: 'flex-end', margin: 5, borderRadius: 8 }} />
              </TouchableHighlight>
              <View style={{ paddingLeft: 30, paddingRight: 30, paddingBottom: 30 }}>
                <View style={{ borderBottomWidth: 1, borderColor: '#e5e5e5', paddingBottom: 10 }}>
                  <Text style={{ textAlign: 'center', fontWeight: 'bold' }}>应还总额</Text>
                  <Text style={{ textAlign: 'center', color: 'coral', marginTop: 5, fontWeight: 'bold' }}>{this.props.overall} 元</Text>
                </View>
                {this.props.isCardBound === 0 ?
                  <View style={styles.vCodeRow}>
                    <View style={{ flex: 7 }}>
                      <LldTextInput
                        placeholder="请输入验证码"
                        onChangeText={(text) => {
                          this.vcode = text;
                        }
                        }
                      />
                    </View>
                    <View style={{ flex: 5, alignItems: 'flex-end' }}>
                      <VerificationCodeBtn
                        getValidateCode={this.getValidateCode}
                        validateMobile={this.validateMobile}
                      />
                    </View>
                  </View> : null}
                <LldButton name="确定" onPress={this.repay} />
                <Text style={{ marginTop: 10, fontSize: 10 }}>
                  我们将从您绑定的尾号为{this.props.bankTail}的银行卡里扣款
                </Text>
              </View>
            </View>
          </View>

        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // çTop: 20,
    // height: Dimensions.get('window').height,
    // backgroundColor: '#f2f2f2',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 3,
    // padding: 20,
  },
  vCodeRow: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#1d7cf0',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: 'white',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 18,
    // marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    // margin: 10,
  },

});

RepayBtn.propTypes = {
  getValidateCode: React.PropTypes.func,
  showClosePayModal: React.PropTypes.func,
  repay: React.PropTypes.func,
  overall: React.PropTypes.number,
  bankTail: React.PropTypes.string,
  isCardBound: React.PropTypes.number,
  btnName: React.PropTypes.string,
  payModalShown: React.PropTypes.bool,
};

export default RepayBtn;
