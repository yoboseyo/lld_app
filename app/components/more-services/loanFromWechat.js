import React, { Component } from 'react';
import {
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';

export default class LoanFromWechat extends Component {
  render() {
    return (
      <ScrollView>
        <Image style={styles.img} source={require('image!loanflow')} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  img: {
    resizeMode: 'contain',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').width * 3.4008,
  },
});
