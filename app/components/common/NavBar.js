/**
 * Created by XinQi on 2016/10/12.
 */
import React, { Component } from 'react';
import NavigationBar from 'react-native-navbar';
import { StyleSheet, View } from 'react-native';

class NavBarBase extends React.Component {
  onPrev() {
    const Actions = this.props.routes;
    if (this.props.onPrev){
      this.props.onPrev();
      return;
    }
    if (this.props.navigator && this.props.navigator.getCurrentRoutes().length > 1){
      Actions.pop();
    }
  }
  render() {
    var Actions = this.props.routes;
    console.log("Props : " + this.props);
    return <NavigationBar statusBar={{style:'light-content'}}
                          tintColor={'#1d7cf0'}
                          style={styles.navBar}
                          titleColor='white'
                          buttonsColor='white'
                          title= {{title:this.props.title, tintColor: 'white' }}
                          prevTitle={this.props.initial ? " " : null}
                          leftButton = {this.props.leftButton ? this.props.leftButton : {title:''}}
                          rightButton = {this.props.rightButton ? this.props.rightButton : {title:''}}



    />
  }
}
class NavBar extends React.Component {
  render() {
    var Actions = this.props.routes;
    return <NavBarBase customNext={<View/>} {...this.props} leftButton={{title:'返回',tintColor: 'white', handler:this.props.onPrev || Actions.pop}}/>
  }
}


class NavBarModal extends React.Component {
  render() {
    var Actions = this.props.routes;
    return <NavBarBase customPrev={<View/>} nextTitle="关闭" {...this.props} rightButton={{title:'关闭', tintColor: 'white', handler:this.props.onNext || Actions.pop}}/>
  }
}

var styles = StyleSheet.create({
  navBar: {
    backgroundColor: '#1d7cf0',
  },
});


module.exports = {NavBar, NavBarModal};