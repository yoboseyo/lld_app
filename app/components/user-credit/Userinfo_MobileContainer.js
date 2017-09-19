/**
 * Created by Administrator on 2016/9/9.
 */
import React from 'react';
import {
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-redux-router';
import UserinfoMobile from './Userinfo_Mobile';
import MessageModal from '../common/MessageModalContainer';
// import LoadingModal from '../common/loading';
import Loading from '../common/LldActivityIndicator';
import * as ContainerActions from '../../actions/container-actions';
import * as UserinfoAction from '../../actions/userinfo-action';

class UserinfoMobileContainer extends React.Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserinfoAction,
    }, this.props.dispatch);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(account) {
    //   const { dispatch } = this.props;
    // const    errMsgActions = bindActionCreators(ErrMsgActions, dispatch);
    //  const actions = bindActionCreators(UserActions, dispatch);
    if (!account) {
      this.actions.showErrModal(<MessageModal message="请输入手机密码" />);
    } else {
      this.actions.showModal(<Loading />);
      this.actions.userifo_mobile(account);
    }
  }

  render() {
    console.info(this.props.userInfo);
    console.info(12312313123131);
    return (
      <View>
        <UserinfoMobile
          handleSubmit={this.handleSubmit}
          mobile={this.props.userInfo.cell_phone_num}
          venderName={this.props.userInfo.datasource.name}
        />
      </View>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    userInfo: store.userinfoState.UserinfoInfo.entity.data,
  };
};

export default connect(mapStateToProps)(UserinfoMobileContainer);

UserinfoMobileContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};
// export default UserinfoMobileContainer;