/**
 * Created by Administrator on 2016/9/9.
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { View, ScrollView } from 'react-native';
import BankBindingForm from './BindingBank';
import MessageModal from '../common/MessageModalContainer';
import * as ContainerActions from '../../actions/container-actions';
import * as CardBindActions from '../../actions/bankcard-action';
import LoadingModal from '../common/LldActivityIndicator';

class BindingBankContainer extends React.Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions,
      ...CardBindActions,

    }, this.props.dispatch);
    this.getValidateCode = this.getValidateCode.bind(this);
    this.validateMobile = this.validateMobile.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.actions.showModal(<LoadingModal />);
    this.actions.initCardBind();
  }

  // shouldComponentUpdate(nextProps, nextState) {
// Don’t trigger a re-render unless the digit value has changed
  // return nextProps.value !== this.props.value;
  //  console.log('this.props.card.userInfo ' + nextProps.card.userInfo.bankMobile);
  // console.log('this.props.card.userInfodssdsds');
  // return nextProps.card.userInfo.bankMobile?true:false;
  //   return nextProps.card.userInfo.bankMobile!== this.props.card.userInfo.bankMobile;
  //  return true;
  //}

  getValidateCode(custName, bankCard, bankName, bankMobile, Province, Region) {
    this.actions.bindCard(custName, bankCard, bankName, bankMobile, Province, Region);
  }

  validateMobile(custName, bankCard, bankName, bankMobile) {
    let errMsg = '';
    if (!custName) {
      errMsg = '请输入持卡人姓名';
    } else if (!bankCard) {
      errMsg = '请输入卡号';
    } else if (!bankMobile) {
      errMsg = '请输入手机号';
    } else if (!bankName) {
      errMsg = '请选择银行';
    }
    if (errMsg) {
      this.actions.showErrModal(<MessageModal message={errMsg} />);
      return false;
    } else {
      return true;
    }
  }

  handleSubmit(custname, bankcard, mobile, captcha) {
    //   const { dispatch } = this.props;
    // const    errMsgActions = bindActionCreators(ErrMsgActions, dispatch);
    //  const actions = bindActionCreators(UserActions, dispatch);
    let errMsg = '';

    if (!custname) {
      errMsg = '请输入持卡人姓名';
    } else if (!bankcard) {
      errMsg = '请输入卡号';
    } else if (!mobile) {
      errMsg = '请输入手机号';
    } else if (!captcha) {
      errMsg = '请输入验证码';
    }
    if (errMsg) {
      this.actions.showErrModal(<MessageModal message={errMsg} />)
      return;
    }
    this.actions.showModal(<LoadingModal />);
    this.actions.bindCardConfirm(captcha);
  }

  render() {
    console.info(this.props.card.userInfo);
    return (
      <ScrollView>
        <View>
          <BankBindingForm
            handleSubmit={this.handleSubmit}
            getValidateCode={this.getValidateCode}
            validateMobile={this.validateMobile}
            userInfo={this.props.card.userInfo}
          />
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = function (store) {
  return {
    card: store.cardbindState,
  };
};

BindingBankContainer.propTypes = {
  dispatch: React.PropTypes.func,
};

export default connect(mapStateToProps)(BindingBankContainer);
