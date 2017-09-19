import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import WithIDModal from './withIDModal';
import IDModal from './IDModal';
import CardModal from './cardModal';

export default class TxtSec extends Component {
  constructor(props) {
    super(props);
    this.state = {modalVisible: false};
    this.setModalVisible = this.setModalVisible.bind(this);
  }

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  render() {
    if (this.props.index === 0){
      return (
        <View style={styles.wrap}>
          <Text style={styles.txt}>{this.props.txt} </Text>
          <TouchableOpacity onPress={this.setModalVisible}>
            <Text style={styles.txtBlue}>正确示例</Text>
          </TouchableOpacity>
          <IDModal visible={this.state.modalVisible} pressFunc={this.setModalVisible} />
        </View>
      );
    } else if (this.props.index === 1){
      return (
        <View style={styles.wrap}>
          <Text style={styles.txt}>{this.props.txt} </Text>
          <TouchableOpacity onPress={this.setModalVisible}>
            <Text style={styles.txtBlue}>正确示例</Text>
          </TouchableOpacity>
          <CardModal visible={this.state.modalVisible} pressFunc={this.setModalVisible} />
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  wrap: {
    width: 145,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    lineHeight: 20,
    color: '#030303',
    fontSize: 15,
    marginTop: 5,
  },
  txtBlue: {
    lineHeight: 24,
    fontSize: 12,
    color: '#1d7cf0',
  },
});
