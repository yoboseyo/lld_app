/**
 * Created by XinQi on 2016/9/5.
 */
import React from 'react';
import { View } from 'react-native';
import { bindActionCreators } from 'redux';
import LoginForm from './login/LoginForm';
import MessageModal from './common/MessageModalContainer';
import Loading from './common/LldActivityIndicator';
import * as UserActions from '../actions/user-actions';
import * as ContainerActions from '../actions/container-actions';


class LoginFormContainer extends React.Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserActions,

    }, this.props.dispatch);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(account, password) {
    if (!account) {
      this.actions.showErrModal(<MessageModal message="请输入手机号" />);
      return;
    }
    if (!password) {
      this.actions.showErrModal(<MessageModal message="请输入密码" />);
      return;
    }

    this.actions.showModal(<Loading />);
    this.actions.login(account, password);
  }

  render() {
    return (

      <View>
        <LoginForm handleSubmit={this.handleSubmit} />
      </View>
    );
  }

}

LoginFormContainer.propTypes = {
  dispatch: React.PropTypes.func,
};

export default LoginFormContainer;
