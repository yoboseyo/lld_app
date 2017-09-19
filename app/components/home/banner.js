import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  //Text,
  View,
  Image,
  //TouchableHighlight
} from 'react-native';
import Swiper from 'react-native-swiper';
var Dimensions = require('Dimensions');

var styles = StyleSheet.create({
  wrap: {
    //marginLeft: 10,
    //flex: 3,
  },
  slide: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    resizeMode: 'contain',
    height: (534 / 702) * Dimensions.get('window').width,
  },
})

var Banner = React.createClass({
  render: function() {
    return (

      <Swiper style={styles.wrap} removeClippedSubviews={false} autoplay={true} showsButtons={false} height={(534 / 702) * Dimensions.get('window').width} width={Dimensions.get('window').width} dot={<View style={{width: 10, height: 10,borderRadius: 5, borderWidth: 1, borderColor: '#fff', marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />} activeDot={<View style={{width: 10, height: 10,borderRadius: 5, borderWidth: 1, borderColor: '#fff', backgroundColor: '#fff', marginLeft: 3, marginRight: 3, marginTop: 3, marginBottom: 3,}} />}>
        <View style={styles.slide}>
          <Image style={styles.banner} source={require('image!banner3')}></Image>
        </View>
        <View style={styles.slide}>
          <Image style={styles.banner} source={require('image!banner2')}></Image>
        </View>
        <View style={styles.slide}>
          <Image style={styles.banner} source={require('image!banner1')}></Image>
        </View>
      </Swiper>

    )
  }
})

AppRegistry.registerComponent('myproject', () => Banner);

export default Banner;