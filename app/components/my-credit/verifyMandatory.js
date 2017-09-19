import React, { Component } from 'react';
import { NativeModules } from 'react-native';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-redux-router';

var inquire = NativeModules.inquireZhiMaCredit;


export default class VerifyMandatory extends Component {

  onPress(action, type){
    this.props.onPress(action, type);
  }

  verifyZhiMaCredit(){
    //console.info(this.props.mandatory);
    if(this.props.mandatory[0]!=0){
      inquire.startRequest(this.props.userId);
    }else {
      this.props.message();
    }
    //inquire.startRequest(this.props.userId);
  }

  render() {
    return (
      <View>
        <View style={styles.tWrap}>
          <View style={styles.border}>
            <Text style={styles.title}>必备认证</Text>
          </View>
        </View>
        <View style={styles.wrapTop}>
          {
            this.props.arrV[0] === 1 ?
            <View style={styles.boxleft}>
              <Image style={{width: 45,height: 45,position: 'absolute',right: 0,top: 0,}} source={require('image!corner')} />
              <View style={{width: 60,height:60,justifyContent:'center'}}>
                <Image style={{width: 29,height: 39,alignSelf:'center'}} source={require('image!mobileA')} />
              </View>
              <Text style={{fontSize: 12,}}>手机验证</Text>
            </View>
            :
            <TouchableOpacity style={styles.boxleft} onPress={this.onPress.bind(this,this.props.type=='hulu'?Actions.userinfoBasicHL:Actions.userinfoBasic,false)}>
              <View style={{width: 60,height:60,justifyContent:'center'}}>
                <Image style={{width: 29,height: 39,alignSelf: 'center'}} source={require('image!mobile')} />
              </View>

              <Text style={{color: '#a4a8a4',fontSize: 12,}}>手机验证</Text>
              <View style={styles.link} >
                <Text style={styles.submitTxt}>去认证</Text>
                <Image style={styles.pen} source={require('image!pen')} />
              </View>
            </TouchableOpacity>

          }
          {
            this.props.arrV[1] === 1 ?
            <View style={styles.box}>
              <Image style={{width: 45,height: 45,position: 'absolute',right: 0,top: 0,}} source={require('image!corner')} />
              <View style={{width: 60,height:60,justifyContent:'center'}}>
                <Image style={{width: 39,height: 32,alignSelf: 'center'}} source={require('image!camA')} />
              </View>
              <Text style={{fontSize: 12,}}>身份验证</Text>
            </View>
            :
            <TouchableOpacity style={styles.box} onPress={this.onPress.bind(this, Actions.picUpload, false)}>
              <View style={{width: 60,height:60,justifyContent:'center'}}>
                <Image style={{width: 39,height: 32,alignSelf: 'center'}} source={require('image!cam')} />
              </View>
              <Text style={{color: '#a4a8a4',fontSize: 12,}}>身份验证</Text>
              <View style={styles.link} >
                <Text style={styles.submitTxt}>去认证</Text>
                <Image style={styles.pen} source={require('image!pen')} />
              </View>
            </TouchableOpacity>
          }
        </View>
        <View style={styles.wrapBottom}>
          {
            this.props.arrV[2] === 1 ?
              <View style={styles.boxleft}>
                <Image style={{width: 45,height: 45,position: 'absolute',right: 0,top: 0,}} source={require('image!corner')} />
                <View style={{width: 60,height:60,justifyContent:'center'}}>
                  <Image style={{width: 34,height: 39,alignSelf: 'center'}} source={require('image!zmA')} />
                </View>
                <Text style={{fontSize: 12,}}>芝麻信用验证</Text>
              </View>
              :
              <TouchableOpacity style={styles.boxleft} onPress={this.verifyZhiMaCredit.bind(this)}>
                <View style={{width: 60,height:60,justifyContent:'center'}}>
                  <Image style={{width: 34,height: 39,alignSelf: 'center'}} source={require('image!zm')} />
                </View>
                <Text style={{color: '#a4a8a4',fontSize: 12,}}>芝麻信用验证</Text>
                <View style={styles.link} >
                  <Text style={styles.submitTxt}>去认证</Text>
                  <Image style={styles.pen} source={require('image!pen')} />
                </View>
              </TouchableOpacity>
          }
          {
            this.props.arrV[3] === 1 ?
              <TouchableOpacity style={styles.box} onPress={this.onPress.bind(this, Actions.bindedCard, true)}>
                <Image style={{width: 45,height: 45,position: 'absolute',right: 0,top: 0,}} source={require('image!corner')} />
                <View style={{width: 60,height:60,justifyContent:'center'}}>
                  <Image style={{width: 43,height: 29,alignSelf: 'center'}} source={require('image!cardA')} />
                </View>
                <Text style={{fontSize: 12,}}>银行卡验证</Text>
              </TouchableOpacity>
              :
              <TouchableOpacity style={styles.box} onPress={this.onPress.bind(this, Actions.bindCard, true)}>
                <View style={{width: 60,height:60,justifyContent:'center'}}>
                  <Image style={{width: 43,height: 29,alignSelf: 'center'}} source={require('image!card')} />
                </View>
                <Text style={{color: '#a4a8a4',fontSize: 12,}}>银行卡验证</Text>
                <View style={styles.link}>
                  <Text style={styles.submitTxt}>去认证</Text>
                  <Image style={styles.pen} source={require('image!pen')} />
                </View>
              </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}
VerifyMandatory.propTypes = {
  onPress: React.PropTypes.func,
  message: React.PropTypes.func,
}
const styles = StyleSheet.create({
  tWrap: {
    height: 35,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 7,
  },
  border: {
    borderLeftWidth: 5,
    borderColor: '#1d7cf0',
    paddingLeft: 5,
  },
  title: {
    lineHeight: 18,
    fontSize: 13,
  },
  wrapTop: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    borderBottomWidth: 8,
    borderColor: '#f4f5f5',

  },
  boxleft: {
    position: 'relative',
    height: 123,
    flex: 1,
    borderRightWidth: 4,
    borderColor: '#f4f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  box: {
    height: 123,
    flex: 1,
    borderLeftWidth: 4,
    borderColor: '#f4f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  wrapBottom: {
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: 'row',
    backgroundColor: '#f4f5f5',
  },
  icon: {
    height: 58,
    width: 58,
    marginBottom: 5,
  },
  link: {
    flexDirection: 'row',
  },
  submitTxt: {
    fontSize: 10,
    color: '#1d7cf0',
    marginTop: 5,
  },
  pen: {
    height: 10,
    width: 10,
    marginTop: 6,
    marginLeft: 3,
  },
});
