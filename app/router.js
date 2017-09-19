import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Router,
  Route,
  Animations,
  Schema,
} from 'react-native-redux-router';


import { NavBar, NavBarModal } from './components/common/NavBar';

import MessageContainer from './components/layouts/container';
import Home from './components/home';
import SignupForm from './components/login/SignupFormContainer';
import LoginForm from './components/login';
import ForgetPassword from './components/login/ForgetPasswordContainer';
import Loan from './components/loan/loanNew';
import UserinfoBasic from './components/user-credit/Userinfo_BasicContainer';
import UserinfoMobile from './components/user-credit/Userinfo_MobileContainer';
import UserinfoJingdong from './components/user-credit/Userinfo_jingdongContainer';
import UserinfoNote from './components/user-credit/userinfoNodeContainer';
import UserinfoBasicHL from './components/user-credit-hl/Userinfo_BasicContainer';
import UserinfoMobileHL from './components/user-credit-hl/Userinfo_MobileContainer';
import UserinfoJingdongHL from './components/user-credit-hl/Userinfo_jingdongContainer';
import UserinfoNoteHL from './components/user-credit-hl/userinfoNodeContainer';
import UserinfoJDNoteHL from './components/user-credit-hl/userinfoJDNodeContainer';
import BindCard from './components/card-bind/BindingBankContainer';
import MyLoan from './components/my-loan/myLoanContainer';
import MyCredit from './components/my-credit/myCredit';
import Repayment from './components/repay/RepaymentContainer';
import PicUpload from './components/pic-upload/picUpload';
import MoreServices from './components/more-services/moreServices';
import FAQ from './components/faq/FAQ';
import RepayWorkFlow from './components/more-services/repayWorkFlow';
import CustomerService from './components/more-services/customerService';
import PrivacyPolicy from './components/more-services/privacyPolicy';
import LoanFromWechat from './components/more-services/loanFromWechat';
import UserProfile from './components/user-profile/userProfile';
import Contract from './components/contract/contract';
import BindedCard from './components/card-bind/bindedCard';

class AppRouter extends Component {
  render() {
    return (
      <View style={{ flex: 1 }}>
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            backgroundColor: '#F5FCFF',
          }}
        />
        <MessageContainer />
        <Router>
          <Schema name="modal" sceneConfig={Animations.FlatFloatFromBottom} navBar={NavBarModal} />
          <Schema name="default" sceneConfig={Animations.FlatFloatFromRight} navBar={NavBar} />
          <Schema name="withoutAnimation" navBar={NavBar} />
          <Schema name="tab" navBar={NavBar} />
          <Route name="home" component={Home} initial hideNavBar title="蓝领贷" />
          <Route name="signup" hideNavBar={false} component={SignupForm} title="注册" />
          <Route name="forgetPassword" component={ForgetPassword} title="找回密码" />
          <Route name="login" component={LoginForm} title="登录" schema="modal" />
          <Route name="loan" hideNavBar={false} component={Loan} title="我要借款" />
          <Route name="userinfoBasicHL" component={UserinfoBasicHL} title="手机验证" schema="modal" />
          <Route name="userinfoMobileHL" component={UserinfoMobileHL} title="手机验证" />
          <Route name="userinfoJingdongHL" component={UserinfoJingdongHL} title="手机验证" />
          <Route name="userinfoNoteHL" component={UserinfoNoteHL} title="手机验证" />
          <Route name="userinfoJDNoteHL" component={UserinfoJDNoteHL} title="手机验证" />
          <Route name="userinfoBasic" component={UserinfoBasic} title="手机验证" schema="modal" />
          <Route name="userinfoMobile" component={UserinfoMobile} title="手机验证" />
          <Route name="userinfoJingdong" component={UserinfoJingdong} title="手机验证" />
          <Route name="userinfoNote" component={UserinfoNote} title="手机验证" />
          <Route name="bindCard" component={BindCard} title="绑定银行卡" schema="modal"/>
          <Route name="bindedCard" hideNavBar={false} component={BindedCard} title="已绑定银行卡" />
          <Route name="myloan" hideNavBar={false} component={MyLoan} title="我的借款" />
          <Route name="userProfile" hideNavBar={false} component={UserProfile} title="我的账户" />
          <Route name="repay" hideNavBar={false} component={Repayment} title="还款续期" />
          <Route name="myCredit" hideNavBar={false} component={MyCredit} title="我的信用" />
          <Route name="picUpload" hideNavBar={false} component={PicUpload} title="上传照片" />
          <Route name="moreservices" hideNavBar={false} component={MoreServices} title="更多服务" />
          <Route name="repayworkflow" hideNavBar={false} component={RepayWorkFlow} title="还款攻略" />
          <Route name="customerservice" hideNavBar={false} component={CustomerService} title="召唤客服" />
          <Route name="privacypolicy" hideNavBar={false} component={PrivacyPolicy} title="法律条款" />
          <Route name="faq" component={FAQ} title="常见问题" />
          <Route name="loanfromwechat" component={LoanFromWechat} title="借款流程" />
          <Route name="userprofile" component={UserProfile} title="我的账户" />
          <Route name="contract" component={Contract} title="借款合同" />
        </Router>
      </View>
    );
  }
}

export default AppRouter;
