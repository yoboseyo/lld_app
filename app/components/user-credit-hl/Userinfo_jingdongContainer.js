/**
 * Created by Administrator on 2016/9/9.
 */
import React from 'react';
import {
  View,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import UserinfoJingdong from './Userinfo_Jingdong';
import MessageModal from '../common/MessageModalContainer';
import Loading from '../common/LldActivityIndicator';
import * as ContainerActions from '../../actions/container-actions';
import * as UserinfoAction from '../../actions/userinfo-hl-action';

class UserinfojingdongContainer extends React.Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserinfoAction,
    }, this.props.dispatch);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    console.info("userInfo");
    console.info(this.props.userInfo)
    let applyInfo = {};
    applyInfo.name = this.props.userInfo.custName;
    applyInfo.identity_card_number = this.props.userInfo.idCardNo;
    applyInfo.cell_phone_number = this.props.userInfo.mobile;
    applyInfo.type = 2;
    console.info(applyInfo);
    this.actions.applyHulu(applyInfo);
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

  render() {
    return (
      <View>
        <UserinfoJingdong
          handleSubmit={this.handleSubmit}
        />
      </View>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    userInfo: store.userState.userInfo,
  };
};

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
export default connect(mapStateToProps)(UserinfojingdongContainer);