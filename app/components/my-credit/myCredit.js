import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  NativeModules,
  NativeEventEmitter,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-redux-router';
import MessageModal from '../common/MessageModalContainer';
import Loading from '../common/LldActivityIndicator';
import VerifyMandatory from './verifyMandatory';
import VerifyOptional from './verifyOptional';
import * as CreditActions from '../../actions/myCredit-actions';
import * as ContainerActions from '../../actions/container-actions';
import * as UserinfoAction from '../../actions/userinfo-hl-action';

var RefreshMySelf = NativeModules.refreshMycredit;
const myNativeEvt = new NativeEventEmitter(RefreshMySelf);  //创建自定义事件接口

class MyCredit extends Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...CreditActions,
      ...ContainerActions,
      ...UserinfoAction,
    }, this.props.dispatch);
    this.onPress = this.onPress.bind(this);
    this.message = this.message.bind(this);
  }

  //在组件中使用
  componentWillMount() {
    this.listener = myNativeEvt.addListener('startRefresh', this.iseCallback.bind(this));  //对应了原生端的名字
  }
  componentWillUnmount() {
    this.listener && this.listener.remove();  //记得remove
    this.listener = null;
  }
  iseCallback(data) {//接受原生传过来的数据 data={code:,result:}
    this.actions.showModal(<Loading />)
    this.actions.myCreditInit();
    this.actions.updateZhimaState();
  }

  onPress(action, bool) {
    const { mandatory } = this.props.credit;
    console.info(mandatory);
    console.info(action);
    console.info(bool);
    /*if(bool){
      if(mandatory[0]!=0){
        this.props.dispatch(action);
      }else {
        this.message();
      }
    }else{
      this.props.dispatch(action);
    }*/
    this.props.dispatch(action);
    // Actions.userinfoBasic;
  }

  message() {
    this.actions.showErrModal(<MessageModal message={'请先填写手机验证'} />);

  }

  componentDidMount() {
    this.actions.myCreditInit();
    this.actions.attestationType();
  }
  render() {
    return (
      <View style={styles.container}>
        <VerifyMandatory
          arrV={this.props.credit.mandatory}
          userId={this.props.user.userInfo.id}
          onPress={this.onPress}
          message={this.message}
          mandatory={this.props.credit.mandatory}
          type={this.props.credit.type}
        />
        <VerifyOptional
          arrV={this.props.credit.optional}
          type={this.props.credit.type}
          onPress={this.onPress}
        />
      </View>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    credit: store.creditState,
    user: store.userState,

  };
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f4f5f5',
  },
});

export default connect(mapStateToProps)(MyCredit);

MyCredit.propTypes = {
  dispatch: React.PropTypes.func,
};