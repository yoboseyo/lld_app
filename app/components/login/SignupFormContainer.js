/**
 * Created by Administrator on 2016/9/9.
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SignupForm from './SignupForm';
import MessageModal from '../common/MessageModalContainer';
import * as ContainerActions from '../../actions/container-actions';
import * as UserActions from '../../actions/user-actions';

class SignupFormContainer extends Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserActions,

    }, this.props.dispatch);

    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidateCode = this.getValidateCode.bind(this);
    this.validateMobile = this.validateMobile.bind(this);
  }

  getValidateCode(mobile, smsType) {
    console.log('getvalidaecode');
    console.log('getvalidaecode ' + mobile +  smsType);
    this.actions.getValidateCode(mobile, smsType);
  }

  handleSubmit(account, password, verificationCode,agree) {
    let errMsg = '';
    if (!account) {
      errMsg = '请输入手机号';
    } else if (!verificationCode) {
      errMsg = '请输入验证码';
    } else if (!password) {
      errMsg = '请输入密码';
    } else if (!(password.length >= 6 && password.length <= 8)) {
      errMsg = '密码只能6-8位';
    }else if (!agree) {
      errMsg = '请阅读并同意《服务与隐私协议》';
    }
    if (errMsg) {
      this.actions.showErrModal(<MessageModal message={errMsg} />);
      return;
    }

    this.actions.register(account, password, verificationCode, 'ios1', '1');
  }

  validateMobile(mobile) {
    if (mobile) {
      return true;
    }
    const errMsg = '请输入手机号';
    this.actions.showErrModal(<MessageModal message={errMsg} />);
    return false;
  }

  render() {
    return (

      <View>
        <SignupForm
          handleSubmit={this.handleSubmit}
          getValidateCode={this.getValidateCode}
          validateMobile={this.validateMobile}
        />
      </View>
    );
  }
}


SignupFormContainer.propTypes = {
  dispatch: React.PropTypes.func,
};
/*
 const mapStateToProps = function(store) {
 return {
 errMsgState: store.errMsgState
 };
 };*/

// export default connect(mapStateToProps)(SignupFormContainer);
// export default connect(state => ({}))(SignupFormContainer);

export default connect()(SignupFormContainer);
