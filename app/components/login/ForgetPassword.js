/**
 * Created by Administrator on 2016/9/6.
 */
import React, { Component, PropTypes } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  TextInput,
  Image,
} from 'react-native';
import Dimensions from 'Dimensions';
import VerificationCodeBtn from './VerificationCodeBtn';
// import imgLogo2 from '../../../public/image/logo2.jpg';
// import { Button } from 'react-bootstrap';
import LldTextInput from '../common/LldTextInput';
import styles from '../../styles/styles';

class ForgePassword extends Component {

  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.validateMobile = this.validateMobile.bind(this);
    this.getValidateCode = this.getValidateCode.bind(this);
    this.sendVoiceSms = this.sendVoiceSms.bind(this);
  }

  onPress() {
    this.props.handleSubmit(this.mobile, this.oldPassword, this.newPassword, this.verificationCode);
  }

  getValidateCode() {
    this.props.getValidateCode(this.mobile, 'text');
  }

  validateMobile() {
    return this.props.validateMobile(this.mobile);
  }

  sendVoiceSms() {
    if (this.props.validateMobile(this.mobile)) {
      this.props.getValidateCode(this.mobile, 'voice');
    }
  }

  render() {
    return (
      <View style={{ backgroundColor: '#ffffff', justifyContent: 'center' }}>
        <View style={styles.container}>
          <View style={{ height: Dimensions.get('window').height, backgroundColor: '#f2f2f2' }}>
            <View style={{backgroundColor: '#fff', paddingLeft: 17, paddingRight: 17, marginTop: 21,}}>
              <View style={{ borderBottomWidth: 1,borderColor: '#cccccb',flexDirection: 'row',}}>
                <View style={{flex: 2,justifyContent: 'center'}}>
                  <Image style={{width: 20,height: 26,}} source={require('image!phone')}/>
                </View>
                <View style={{flex: 14,}}>
                  <LldTextInput
                    placeholder="请输入您的手机号"
                    onChangeText={(text) => {
                      this.mobile = text;}}
                    isStyles={{height: 45,fontSize: 13,}}
                    kType="numeric"
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row',}}>
                <View style={{flex: 2,justifyContent: 'center'}}>
                  <Image style={{width: 22,height: 17,}} source={require('image!vCode')}/>
                </View>
                <View style={{flex: 9,}}>
                  <LldTextInput
                    placeholder="请输入验证码"
                    onChangeText={(text) => {
                      this.verificationCode = text;}}
                    isStyles={{height: 45,fontSize: 13,}}
                    kType="numeric"
                  />
                </View>
                <View style={{flex:5,justifyContent: 'center',alignSelf: 'center'}}>
                  <VerificationCodeBtn
                    getValidateCode={this.getValidateCode}
                    validateMobile={this.validateMobile}
                  />
                </View>
              </View>
            </View>
            <View style={{alignSelf: 'center'}}>
              <Text style={{fontSize: 13,lineHeight: 32,}}>收不到验证码？
                <Text
                  onPress={this.sendVoiceSms}
                  style={{ color: '#48BBEC' }}
                >试试语音验证码</Text>
              </Text>
            </View>
            <View style={{backgroundColor: '#fff', paddingLeft: 17, paddingRight: 17,}}>
              <View style={{ borderBottomWidth: 1,borderColor: '#cccccb',flexDirection: 'row',}}>
                <View style={{flex: 2,justifyContent: 'center'}}>
                  <Image style={{width: 22,height: 26,}} source={require('image!lock')}/>
                </View>
                <View style={{flex: 14,}}>
                  <LldTextInput
                    placeholder="请输入6-8位新登陆密码"
                    isPassword
                    onChangeText={(text) => {
                      this.oldPassword = text;}}
                    isStyles={{height: 45,fontSize: 13,}}
                  />
                </View>
              </View>
              <View style={{flexDirection: 'row',}}>
                <View style={{flex: 2,justifyContent: 'center'}}>
                  <Image style={{width: 22,height: 26,}} source={require('image!cLock')}/>
                </View>
                <View style={{flex: 14,}}>
                  <LldTextInput
                    placeholder="请再次输入密码"
                    isPassword
                    onChangeText={(text) => {
                      this.newPassword = text;}}
                    isStyles={{height: 45,fontSize: 13,}}
                  />
                </View>
              </View>
            </View>
            <View style={{marginTop: 22,justifyContent:'center'}}>
              <TouchableHighlight
                style={{width: 330,height: 45,backgroundColor: '#1d7cf0',borderRadius: 23,overflow: 'hidden',alignSelf: 'center'}}
                onPress={this.onPress}
              >
                <Text style={{fontSize:15, color: '#fdfdfe',lineHeight: 45,alignSelf: 'center'}}>重置密码</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

ForgePassword.propTypes = {
  getValidateCode: React.PropTypes.func.isRequired,
  validateMobile: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
};

export default ForgePassword;