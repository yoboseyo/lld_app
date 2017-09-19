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
                1、请保证头部外轮廓在虚线内
              </Text>
              <Text style={styles.txt}>
                2、请勿离镜头太近或太远，确保图片清晰
              </Text>
              <Text style={styles.title}>参考样式</Text>
              <View style={styles.imgWrap}>
                <Image style={styles.img} source={require('image!faceRec')} />
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
    height: (Dimensions.get('window').width - 82) * 1.6538,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    lineHeight: 50,
  },
  txt: {
    lineHeight: 30,
  },
});


