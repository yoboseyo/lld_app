import React, { Component } from 'react';
import {
  Modal,
  Text,
  TouchableHighlight,
  View,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import Dimensions from 'Dimensions';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default class IDModal extends Component {

  render() {
    return (
      <View style={{marginTop: 20}}>
        <Modal
          animationType={"fade"}
          transparent={true}
          visible={this.props.visible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <ScrollView style={{marginTop: 20, backgroundColor: 'rgba(0,0,0,0.7)',}}>
            <View style={{margin: 20, backgroundColor: '#fff',padding: 15, borderRadius: 5,}}>
              <Text style={styles.title}>照片要求</Text>
              <Text style={styles.txt}>
                1、请当场拍摄身份证原件正面照片，临时身份证无效
              </Text>
              <Text style={styles.txt}>
                2、确保身份证上的全部信息（包括文字和头像）清晰可辨认
              </Text>
              <Text style={styles.title}>参考样式</Text>
              <View style={styles.imgWrap}>
                <Image style={styles.img} source={require('image!idcard')} />
              </View>
              <TouchableHighlight style={{position: 'absolute', right: 10, top: 10,}} onPress={() => {this.props.pressFunc(false)}}>
                <Icon name="clear" color="#ccc" size={25} />
              </TouchableHighlight>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  close: {
    width: 20,
    height: 20,
  },
  imgWrap: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 3,
  },
  img: {
    flex: 1,
    resizeMode: 'contain',
    width: Dimensions.get('window').width - 82,
    height: (Dimensions.get('window').width - 82) * 0.6383,
    backgroundColor: '#000',
  },
  title: {
    fontSize: 24,
    lineHeight: 50,
  },
  txt: {
    lineHeight: 30,
  },
});

