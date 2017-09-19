/**
 * Created by Administrator on 2016/9/9.
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import {
  View,
} from 'react-native';
import Forget from './ForgetPassword';
import MessageModal from '../common/MessageModalContainer';
import * as ContainerActions from '../../actions/container-actions';
import * as UserActions from '../../actions/user-actions';
// import {connect} from 'react-redux';


class ForgetPasswordContainer extends React.Component {
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
    this.actions.getValidateCode(mobile, smsType);
  }

  handleSubmit(account, oldPassword, newPassword, verificationCode) {
    let errMsg = '';
    if (!account) {
      errMsg = '请输入手机号';
    } else if (!verificationCode) {
      errMsg = '请输入验证码';
    } else if (!oldPassword) {
      errMsg = '请输入密码';
    } else if (!(oldPassword.length >= 6 && oldPassword.length <= 8)) {
      errMsg = '密码只能6-8位';
    } else if (!(oldPassword === newPassword)) {
      errMsg = '2次密码不一致';
    }
    if (errMsg) {
      this.actions.showErrModal(<MessageModal message={errMsg} />)
      return;
    }
    this.actions.forgetPassword(account, newPassword, verificationCode);
  }

  validateMobile(mobile) {
    if (mobile) {
      return true;
    }
    let errMsg = '请输入手机号';
    this.actions.showErrModal(<MessageModal message={errMsg} />)
    return false;
  }

  render() {
    return (

      <View>
        <Forget
          handleSubmit={this.handleSubmit}
          getValidateCode={this.getValidateCode}
          validateMobile={this.validateMobile}
        />
      </View>
    );
  }
}

ForgetPasswordContainer.propTypes = {
  dispatch: React.PropTypes.func,
};
// export default connect(state=>({}))(ForgetPasswordContainer);
export default ForgetPasswordContainer;
