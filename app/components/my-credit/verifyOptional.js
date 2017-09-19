import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-redux-router';

export default class VerifyOptional extends Component {

  onPress(action, type){
    if(this,this.props.type=='hulu'){
      this.props.onPress(action, type);
    }
  }

  render() {
    return (
      <View>
        <View style={styles.tWrap}>
          <View style={styles.border}>
            <Text style={styles.title}>可选认证</Text>
          </View>
        </View>
        <View style={styles.wrapTop}>
          {
            this.props.arrV[0] === 1 ?
              <View style={styles.box}>
                <View style={styles.link}>
                  <Image style={styles.icon} source={require('image!jdA')} />
                  <Text style={styles.txtA}>
                    京东认证
                    <Image style={{width: 12,height: 10,}} source={require('image!jdtxtA')}/>
                  </Text>
                </View>
              </View>
              :
              <TouchableOpacity style={styles.box} onPress={this.onPress.bind(this, Actions.userinfoJingdongHL,true)}>
                <View style={styles.link}>
                  <Image style={{width: 45,height: 35,marginBottom: 5,}} source={require('image!jd')} />
                  <Text style={styles.txt}>京东认证</Text>
                </View>
              </TouchableOpacity>
          }
          <View style={styles.box}>
          </View>
          <View style={styles.box}>
          </View>
        </View>
        <View style={styles.wrapBottom}>
          <View style={styles.box}>
          </View>
          <View style={styles.box}>
          </View>
          <View style={styles.box}>
          </View>
        </View>
      </View>
    );
  }
}

VerifyOptional.propTypes = {
  onPress: React.PropTypes.func,
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
    paddingLeft: 6,
    paddingRight: 6,
    flexDirection: 'row',
    borderBottomWidth: 8,
    borderColor: '#f4f5f5',
  },
  wrapBottom: {
    paddingLeft: 6,
    paddingRight: 6,
    flexDirection: 'row',
    borderBottomWidth: 1000,
    borderColor: '#f4f5f5',
  },
  box: {
    flex: 1,
    height: 116,
    borderLeftWidth: 4,
    borderRightWidth: 4,
    borderColor: '#f4f5f5',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  boxRight: {
    flex: 1,
    height: 116,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  icon: {
    width: 30,
    height: 23,
    marginBottom: 8,
  },
  link: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    color: '#c9c9c9',
    fontSize: 14,
    lineHeight: 20,
  },
  txtA: {
    color: '#c81622',
    fontSize: 14,
    lineHeight: 20,
  },
});
