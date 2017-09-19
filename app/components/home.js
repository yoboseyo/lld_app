import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  ScrollView,
  View,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-redux-router';
import { bindActionCreators } from 'redux';
import { NativeModules } from 'react-native';
import Banner from './home/banner';
import LoginState from './home/loginState';
import OperateCenter from './home/operateCenter';
import More from './home/more';
import MessageModal from './common/MessageModalContainer';
import * as ContainerActions from '../actions/container-actions';
import * as UserActions from '../actions/user-actions';
import * as UserProfileActions from '../actions/userProfile-actions';
import * as LoanActions from '../actions/loan-actions';
import codePush from 'react-native-code-push'
import AppState from 'AppState'
var SplashScreen = NativeModules.SplashScreen;

class Home extends Component {
  constructor(props) {
    super(props);
    this.onLoan = this.onLoan.bind(this);
    this.onUserProfile = this.onUserProfile.bind(this);
    this.onRepay = this.onRepay.bind(this);
    this.onMyLoan = this.onMyLoan.bind(this);
    this.onMyCredit = this.onMyCredit.bind(this);
    this.showPosition = this.showPosition.bind(this);
    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserActions,
      ...UserProfileActions,
      ...LoanActions,
    }, this.props.dispatch);

    //this.actions.loadUserInfo();


  }

  componentDidMount() {
    SplashScreen.hide();
    codePush.sync();
    AppState.addEventListener("change", (newState) => {
      newState === "active" && codePush.sync({
        installMode:codePush.InstallMode.ON_NEXT_RESUME,
        deploymentKey: "LQ_eSmqN3c8YbcWLoqaBk7Sros0qEkBG3bzQf"
      });
    });


  }
  onLoan() {
    // this.actions.loadUserInfo();
    //this.actions.selectUserProfile();
    // get geo location
    if (!this.props.user.geoLocationFetched && this.props.user.logined) {
      if (navigator.geolocation) {
        //navigator.geolocation.getCurrentPosition(this.showPosition);
      }
      else {
        console.log('Geolocation is not supported by this browser.');
      }
    }

    this.actions.selectUserProfile(function(){
      if (this.checkBasicCredit()) {
        //this.actions.loadUserInfo();
        this.actions.getMineProducts(function(){
          this.nav(Actions.loan, true);
        }.bind(this));
      }
    }.bind(this));


  }
  onUserProfile() {
    this.nav(Actions.userprofile, true);
  }
  onRepay() {
    this.nav(Actions.repay({ renew: 0 }), false);
  }
  onMyLoan() {
    if(!this.props.user.userInfo.id){
      this.nav(Actions.myloan, true);
    } else {
      this.actions.getCurLoanList(this.props.user.userInfo.id, function(){
        let hasLoan = 0;
        let productCode = '';
        if(this.props.loan.curLoanList){
          hasLoan = this.props.loan.curLoanList.length;
          productCode = this.props.loan.curLoanList[0].productCode;
        }
        if(hasLoan < 1 || productCode == '1000tem'){
          this.actions.showErrModal(<MessageModal message={'您还没有借款申请'} />);
        } else {
          this.nav(Actions.myloan, true);
        }
      }.bind(this));
    }

  }
  onMyCredit() {
    this.nav(Actions.myCredit, true);
  }
  showPosition(position) {
    console.info(position);
    console.log("Latitude: " + position.coords.latitude + "  Longitude: " + position.coords.longitude + "  Longitude: " + position.coords.accuracy);
    this.actions.saveGeoLocation(
      position.coords.latitude,
      position.coords.longitude,
      position.coords.accuracy);
  }
  nav(route, bool) {
    const { logined } = this.props.user;
    if (logined) {
      console.info(bool);
      if(bool){
        console.info(bool);
        this.props.dispatch(route);
      }else{
        route;
      }
    } else {
      this.actions.routeToNext(route);
      this.props.dispatch(Actions.login);
    }
  }
  checkBasicCredit() {

    const { userInfo = {} } = (this.props.user || {});
    const { checked, allowLoan } = this.props.user;
    const { jxlSts, picSts, zhimaOpenId, yhkSts } = userInfo;
    const { mandatory } = this.props.credit;
    const msg = '请先进入我的信用提交必备认证资料';

    if (!jxlSts) {
      this.actions.showErrModal(<MessageModal message={msg} />);
      return false;
    } else if (!picSts) {
      this.actions.showErrModal(<MessageModal message={msg} />);
      return false;
    } else if (!zhimaOpenId) {
      this.actions.showErrModal(<MessageModal message={msg} />);
      return false;
    } else if (!yhkSts) {
      this.actions.showErrModal(<MessageModal message={msg} />);
      return false;
    }
    if(!checked){
      this.actions.showErrModal(<MessageModal message={'您提交的资料正在审核中，请稍后'} />);
      return false;
    }
    if(!allowLoan){
      this.actions.showErrModal(<MessageModal message={'您的信用评级暂不符合贷款要求'} />);
      return false;
    }
    // if (mandatory[0] === 0 ) {
    //   this.actions.showErrModal(<MessageModal message={msg} />);
    //   return false;
    // } else if (mandatory[1] === 0 ) {
    //   this.actions.showErrModal(<MessageModal message={msg} />);
    //   return false;
    // } else if (mandatory[2] === 0 ) {
    //   this.actions.showErrModal(<MessageModal message={msg} />);
    //   return false;
    // } else if (mandatory[3] === 0 ) {
    //   this.actions.showErrModal(<MessageModal message={msg} />);
    //   return false;
    // }
    return true;
  }

  render() {
    const { userInfo } = (this.props.user || {});
    const { mobile } = userInfo;
    return (
      <ScrollView>
        <StatusBar barStyle="light-content" />
        <Banner />
        <LoginState logined={this.props.user.logined} name={!mobile ? '登录' : mobile} onLoan={this.onLoan} onUserProfile={this.onUserProfile} />
        <OperateCenter
          onRepay={this.onRepay}
          onMyLoan={this.onMyLoan}
          onMyCredit={this.onMyCredit}
        />
        <More />
        <View style={styles.contact}>
          <View style={styles.contactTxt}>
            <Text>
              客服电话：021-31338820
            </Text>
          </View>
          <View style={styles.contactTxt}>
            <Text>
              工作时间：9:30-18:30
            </Text>
          </View>
        </View>
        <View style={styles.txtWrap}>
          <Text style={styles.txt}>上海截塔金融信息服务有限公司 Copyright © 2017</Text>
        </View>
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => (
  {
    user: state.userState,
    userProfile: state.profileState,
    credit: state.creditState,
    loan: state.loanState,
  }
);
/*
 const mapDispatchToProps = (dispatch) => (
 {
 actions: bindActionCreators(LoanActions, dispatch)

 }
 );*/

Home.propTypes = {
  user: React.PropTypes.object,
  dispatch: React.PropTypes.func,
};

export default connect(mapStateToProps)(Home);

const styles = StyleSheet.create({
  contact: {
    height: 23,
    margin: 10,
    marginTop: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTxt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  txt: {
    fontSize: 12,
    color: '#727174',
  },
});
