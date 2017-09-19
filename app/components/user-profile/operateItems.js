import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-redux-router';

export default class OperateItems extends Component {
  render() {
    return (
      <View>
        {/*<TouchableOpacity style={styles.items} onPress={Actions.picUpload}>
          <View style={styles.flexL}>
            <Text>重传图片</Text>
          </View>
          <View style={styles.flexR}>
            <Icon name="angle-right" color="#ccc" size={25} />
          </View>
        </TouchableOpacity>*/}
        <TouchableOpacity style={styles.items} onPress={Actions.forgetPassword}>
          <View style={styles.flexL}>
            <Text>修改密码</Text>
          </View>
          <View style={styles.flexR}>
            <Icon name="angle-right" color="#ccc" size={25} />
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  items: {
    flexDirection: 'row',
    height: 44,
    paddingLeft: 17,
    paddingRight: 17,
    backgroundColor: '#fff',
    marginBottom: 12,
  },
  flexL: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexR: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
});
