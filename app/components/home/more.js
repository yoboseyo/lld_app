import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Actions } from 'react-native-redux-router';

export default class More extends Component {
  render() {
    return (
      <View style={styles.wrap}>
        <View style={styles.flexWrap}>
          <TouchableOpacity style={styles.touch} onPress={Actions.loanfromwechat}>
            <Image style={styles.iconWechat} source={require('image!iconWechat')} />
            <Text>关注微信号有惊喜</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.flexWrap}>
          <TouchableOpacity style={styles.touch} onPress={Actions.moreservices}>
            <Image style={styles.iconMore} source={require('image!iconMore')} />
            <Text>更多服务</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    height: 45,
    margin: 10,
    marginTop: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
  },
  flexWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconWechat: {
    width: 25,
    height: 21,
    marginRight: 10,
  },
  iconMore: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
});
