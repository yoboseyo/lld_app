import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  Image,
} from 'react-native';
import VerificationCodeBtn from './VerificationCodeBtn';
import PasswordEntry from './PasswordEntry';
// import { Link } from 'react-router';
import Dimensions from 'Dimensions';
import { Actions } from 'react-native-redux-router';
import PolicyModal from './policyModal';
// import imgLogo2 from '../../../public/image/logo2.jpg';
// import { Button } from 'react-bootstrap';
import LldTextInput from '../common/LldTextInput';
import LldButton from '../common/LldButton';
import styles from '../../styles/styles';

class SignupForm extends Component {
  constructor(props) {
    super(props);
    this.onPress = this.onPress.bind(this);
    this.validateMobile = this.validateMobile.bind(this);
    this.getValidateCode = this.getValidateCode.bind(this);
    this.sendVoiceSms = this.sendVoiceSms.bind(this);
    this.onHandleFocus = this.onHandleFocus.bind(this);
    this.onHandleBlur = this.onHandleFocus.bind(this);
    this.state = {
      agree: true,
      inputFocus: [false, false, false, false],
    }
  }
  onChangeHandle () {
    this.setState({agree:!this.state.agree})
  }

  onPress() {
    this.props.handleSubmit(this.mobile, this.password, this.verificationCode,this.state.agree);
  }

  getValidateCode() {
    this.props.getValidateCode(this.mobile, 'text');
  }

  validateMobile() {
    console.log('sdfsdfsdfsdfsdfsdf======');
    return this.props.validateMobile(this.mobile);
  }

  sendVoiceSms() {
    if (this.props.validateMobile(this.mobile)) {
      this.props.getValidateCode(this.mobile, 'voice');
    }
  }
  onHandleFocus(index) {
    var arr = [false,false,false,false];
    arr[index] = true;
    this.setState({inputFocus:arr});
  }
  onHandleBlur() {
    var arr = [false,false,false,false];
    this.setState({inputFocus:arr});
  }

  render() {
    return (
      <View style={{ backgroundColor: '#fff', paddingTop: 20, justifyContent: 'center' }}>
        <View style={{ height: Dimensions.get('window').height, backgroundColor: '#fff' }}>
          <View style={{justifyContent: 'center',backgroundColor: '#fff'}}>
            <View>
              <View style={{marginBottom: 15,}}>
                <View style={this.state.inputFocus[0]?styles.flexStyle_on:styles.flexStyle_off}>
                  <View style={styles.flex_2}>
                    <Image style={{
                      width: 20,
                      height: 26,
                      alignSelf: 'center',
                    }} source={require('image!phone')} />
                  </View>
                  <View style={styles.flex_10}>
                    <LldTextInput
                      placeholder="请输入您的手机号"
                      onChangeText={(text) => {
                        this.mobile = text;
                      }
                      }
                      isStyles={{lineHeight: 43,fontSize: 14,height: 43,}}
                      handleFocus={this.onHandleFocus}
                      handleBlur={this.onHandleBlur}
                      index={0}
                      kType="numeric"
                    />
                  </View>
                </View>
              </View>

              <View style={this.state.inputFocus[1]?styles.flexStyle_on:styles.flexStyle_off}>
                <View style={styles.flex_2}>
                  <Image style={{width: 22,height: 17,        alignSelf: 'center',}} source={require('image!vCode')}/>
                </View>
                <View style={styles.flex_6}>
                  <LldTextInput
                    placeholder="请输入验证码"
                    onChangeText={(text) => {
                      this.verificationCode = text;
                    }
                    }
                    isStyles={{lineHeight: 43,fontSize: 14,height: 43,}}
                    handleFocus={this.onHandleFocus}
                    handleBlur={this.onHandleBlur}
                    index={1}
                    kType="numeric"
                  />
                </View>
                <View style={styles.flex_4}>
                  <VerificationCodeBtn
                    getValidateCode={this.getValidateCode}
                    validateMobile={this.validateMobile}
                    btnStyles={{
                      backgroundColor: '#1d7cf0',
                      borderColor: '#1d7cf0',
                      borderWidth: 1,
                      borderRadius: 4,
                      padding: 5,
                      alignSelf: 'center',
                      justifyContent: 'center',
                      width: 74,
                    }}
                    txtStyles={{
                      fontSize: 12,
                      color: '#fff',
                      textAlign: 'center',
                      lineHeight: 17,
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{alignSelf: 'center',height: 37,}}>
              <Text style={{fontSize: 13,lineHeight: 37,}}>收不到验证码？
                <Text
                  onPress={this.sendVoiceSms}
                  style={{ color: '#1d7cf0' }}
                >试试语音验证码</Text>
              </Text>
            </View>
            <View>
              <PasswordEntry
                onChangeText={(text) => {
                  this.password = text;
                }
                }
                style={this.state.inputFocus[2]?styles.flexStyle_on:styles.flexStyle_off}
                txtStyles={{
                  lineHeight: 43,
                  fontSize: 14,
                  height: 43,
                }}
                handleFocus={this.onHandleFocus}
                handleBlur={this.onHandleBlur}
                index={2}
              />
              <View style={{marginTop: 15,}}>
                <View style={this.state.inputFocus[3]?styles.flexStyle_on:styles.flexStyle_off}>
                  <View style={styles.flex_2}>
                    <Image style={{width: 23,height: 22,        alignSelf: 'center',}} source={require('image!inviteCode')}/>
                  </View>
                  <View style={styles.flex_10}>
                    <LldTextInput
                      placeholder="请输入邀请码（可选）"
                      onChangeText={(text) => {
                        this.inviteCode = text;
                      }
                      }
                      isStyles={{lineHeight: 43,fontSize: 14,height: 43,}}
                      handleFocus={this.onHandleFocus}
                      handleBlur={this.onHandleBlur}
                      index={3}
                    />
                  </View>
                </View>
              </View>

            </View>
            <View >
              <PolicyModal change={this.onChangeHandle.bind(this)}/>
            </View>
            <View>
              <View style={{ marginLeft: 10, marginRight: 10 }}>
                <LldButton
                  onPress={this.onPress}
                  name="注册"
                  containerStyle={{
                    height: 45,
                    width: 330,
                    backgroundColor: '#1d7cf0',
                    borderColor: '#1d7cf0',
                    borderWidth: 1,
                    borderRadius: 23,
                    alignSelf: 'center',
                    justifyContent: 'center',
                  }}
                  style={{
                    fontSize: 18,
                    color: 'white',
                    alignSelf: 'center',
                  }}
                />
              </View>
            </View>
            {/*<View >
              <View style={{
                alignSelf: 'center',
                paddingTop: 22,
              }}>
                <TouchableHighlight onPress={Actions.login}>
                  <Text style={{ color: '#1d7cf0', fontSize: 14,lineHeight: 19, }}>已经注册? 点我登陆</Text>
                </TouchableHighlight>
              </View>
            </View>*/}
          </View>
        </View>
      </View>

    );
  }
}

SignupForm.propTypes = {
  getValidateCode: React.PropTypes.func.isRequired,
  handleSubmit: React.PropTypes.func.isRequired,
  validateMobile: React.PropTypes.func.isRequired,
};


/* styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    backgroundColor: '#f2f2f2',
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#1d7cf0',
    borderColor: '#1d7cf0',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    margin: 10,
  },
  flex_2: {
    flex: 2,
    alignSelf: 'center',
  },
  flex_8: {
    flex: 8,
  },
  flex_10: {
    flex: 10,
  },
  flexStyle: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },
  inputs: {
    height: 45,
    borderWidth: 1,
    marginLeft: 5,
    paddingLeft: 5,
    borderColor: '#CCC',
    borderRadius: 4,
  },
  justifyContent_Center: {
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderColor: '#ddd',
  },
  alignSelf_Center1: {
    alignSelf: 'center',
    padding: 10,
    fontSize: 18,
    color: '#1d7cf0',
  },
  alignSelf_Center2: {
    alignSelf: 'center',
    padding: 10,
  },
  TextInputStyle: {
    height: 40,
    fontSize: 12,
  },
  backgroud_FFF: {
    backgroundColor: '#fff',
    paddingLeft: 20,
    paddingRight: 20,
  },
}); */
export default SignupForm;
