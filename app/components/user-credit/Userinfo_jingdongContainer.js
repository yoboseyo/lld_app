/**
 * Created by Administrator on 2016/9/9.
 */
import React from 'react';
import {
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import UserinfoJingdong from './Userinfo_Jingdong';
import MessageModal from '../common/MessageModalContainer';
import Loading from '../common/LldActivityIndicator';
import * as ContainerActions from '../../actions/container-actions';
import * as UserinfoAction from '../../actions/userinfo-action';

class UserinfojingdongContainer extends React.Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserinfoAction,
    }, this.props.dispatch);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.skip = this.skip.bind(this);
  }

  handleSubmit(account, password) {
    //   const { dispatch } = this.props;
    // const    errMsgActions = bindActionCreators(ErrMsgActions, dispatch);
    //  const actions = bindActionCreators(UserActions, dispatch);
    let errMsg = '';
    if (!account) {
      errMsg = '请输入京东账号或邮箱';
    } else if (!password) {
      errMsg = '请输入京东登陆密码';
    }
    if (errMsg) {
      this.actions.showErrModal(<MessageModal message={errMsg} />);
    } else {
      this.actions.showModal(<Loading />)
      this.actions.userinfo_jingdong(account, password);
    }
  }

  skip() {
    console.info('跳过成功');
    this.actions.showModal(<Loading />);
    this.actions.userinfo_skip();
  }

  render() {
    return (
      <View>
        <UserinfoJingdong
          handleSubmit={this.handleSubmit}
          skip={this.skip}
        />
      </View>
    );
  }
}
UserinfojingdongContainer.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};
/*
 const mapStateToProps = function(store) {
 return {
 errMsgState: store.errMsgState
 };
 };
 */
// export default connect(mapStateToProps)(Userinfo_jingdongContainer);
export default UserinfojingdongContainer;