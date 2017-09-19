import React from 'react';
import { Actions } from 'react-native-redux-router';
import {
  Text,
  TouchableHighlight,
  View,
  StyleSheet,
  Image,
} from 'react-native';
import Dimensions from 'Dimensions';
// import { Button } from 'react-bootstrap';
import PasswordEntry from './PasswordEntry';
// import { Link } from 'react-router';
// import imgLogo2 from '../../../public/image/logo2.jpg';


import LldTextInput from '../common/LldTextInput';
import styles from '../../styles/styles';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);
    // 初始状态
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.handleSubmit(this.mobile, this.password);
  }

  render() {
    return (
      <View style={styleCss.container}>
        <View style={styleCss.imgWrap}>
          <Image style={styleCss.img} source={require('image!logoB')} />
        </View>
        <View>
          <View style={styles.backgroud_FFF}>
            <View style={styleCss.flexStyle}>
              <View style={styles.flex_2}>
                <Image style={styleCss.icon_1} source={require('image!phone')} />
              </View>
              <View style={styles.flex_10}>
                <LldTextInput
                  isStyles={{lineHeight: 45, fontSize: 15, height: 45,}}
                  placeholder="请输入您的手机号"
                  onChangeText={(text) => {
                    this.mobile = text;
                  }}
                  kType="numeric"
                />
              </View>
            </View>
            <View style={{marginTop: 25, marginBottom: 36,}}>
              <PasswordEntry
                style={styleCss.flexStyle}
                onChangeText={(text) => {
                  this.password = text;
                }}
              />
            </View>
          </View>
          <View>
            <TouchableHighlight style={styleCss.button} onPress={this.onPress}>
              <Text style={styleCss.buttonText}>登陆</Text>
            </TouchableHighlight>
          </View>
          <View style={styleCss.flexStyle_1}>
            <TouchableHighlight onPress={Actions.signup} style={styleCss.flex_1}>
              <Text style={{ color: '#1d7cf0', alignSelf: 'center'}}>尚未注册</Text>
            </TouchableHighlight>
            <TouchableHighlight onPress={Actions.forgetPassword} style={styleCss.flex_1_end}>
              <Text style={{ color: '#1d7cf0', alignSelf: 'center'}}>忘记密码?</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}

LoginForm.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
}

const styleCss = StyleSheet.create({
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#fff',
  },
  flexStyle: {
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 10,
  },
  flex_1: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#a4a8a4',
  },
  flex_1_end: {
    flex: 1,
  },
  img: {
    width: 82,
    height: 82,
    alignSelf: 'center',
  },
  imgWrap: {
    paddingTop: 31,
    paddingBottom: 50,
    justifyContent: 'center',
  },
  flexStyle: {
    flexDirection: 'row',
    height: 45,
    borderRadius: 5,
    backgroundColor: '#f5f5f5',
    width: 330,
    alignSelf: 'center',
  },
  flexStyle_1: {
    marginTop: 17,
    flexDirection: 'row',
    width: 330,
    alignSelf: 'center',
  },
  icon_1: {
    width: 20,
    height: 26,
    alignSelf: 'center',
  },
  button: {
    width: 330,
    height: 45,
    backgroundColor: '#1d7cf0',
    borderRadius: 23,
    overflow: 'hidden',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 19,
    color: '#fdfdfe',
    alignSelf: 'center',
    justifyContent: 'center',
  },
});

export default LoginForm ;