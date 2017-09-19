import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  Text,
} from 'react-native';
import { Actions } from 'react-native-redux-router';

export default class OperateCenter extends Component {
  render() {
    return (
      <View style={styles.wrap}>
        <TouchableOpacity style={styles.flexWrap} onPress={this.props.onRepay}>
          <Image style={styles.img} source={require('image!iconRepay')} />
          <Text style={styles.txt}>我要还款</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexWrap} onPress={this.props.onMyLoan}>
          <Image style={styles.img} source={require('image!iconLoan')} />
          <Text style={styles.txt}>我的借款</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.flexWrap} onPress={this.props.onMyCredit}>
          <Image style={styles.img} source={require('image!iconCredit')} />
          <Text style={styles.txt}>我的信用</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    margin: 10,
    marginTop: 0,
    height: 127,
  },
  flexWrap: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 70,
    height: 70,
  },
  txt: {
    fontSize: 14,
    justifyContent: 'center',
    marginTop: 10,
  },
});
