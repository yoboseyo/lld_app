import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-redux-router';

export default class MoreServices extends Component {
  render() {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.rowWrap} onPress={Actions.faq}>
          <View style={styles.flexL}>
            <Text style={styles.txt}>常见问题</Text>
          </View>
          <View style={styles.flexR}>
            <Icon name="angle-right" color="#ccc" size={25} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowWrap} onPress={Actions.privacypolicy}>
          <View style={styles.flexL}>
            <Text style={styles.txt}>法律条款</Text>
          </View>
          <View style={styles.flexR}>
            <Icon name="angle-right" color="#ccc" size={25} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowWrap} onPress={Actions.repayworkflow}>
          <View style={styles.flexL}>
            <Text style={styles.txt}>还款攻略</Text>
          </View>
          <View style={styles.flexR}>
            <Icon name="angle-right" color="#ccc" size={25} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.rowWrap} onPress={Actions.customerservice}>
          <View style={styles.flexL}>
            <Text style={styles.txt}>召唤客服</Text>
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
  container: {
    height: Dimensions.get('window').height,
    backgroundColor: '#f2f2f2',
  },
  rowWrap: {
    backgroundColor: '#fff',
    marginTop: 12,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  flexL: {
    flex: 1,
  },
  txt: {
    lineHeight: 52,
  },
  flexR: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});
