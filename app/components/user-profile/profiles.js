import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

export default class Profiles extends Component {
  render() {
    const { custName, idCardNo, bankName, bankCard } = this.props.userInfo;
    return(
      <View style={styles.container}>
        <View style={styles.items}>
          <View style={styles.txtTitle}><Text>真实姓名</Text></View>
          <Text style={styles.txtContent}>{custName}</Text>
        </View>
        <View style={styles.items}>
          <View style={styles.txtTitle}><Text>身份证号</Text></View>
          <Text style={styles.txtContent}>{idCardNo}</Text>
        </View>
        <View style={styles.items}>
          <View style={styles.txtTitle}><Text>银行名称</Text></View>
          <Text style={styles.txtContent}>{bankName}</Text>
        </View>
        <View style={styles.itemsLast}>
          <View style={styles.txtTitle}><Text>银行卡号</Text></View>
          <Text style={styles.txtContent}>{bankCard}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    paddingLeft: 17,
    paddingRight: 17,
    marginBottom: 12,
    marginTop: 12,

  },
  items: {
    flexDirection: 'row',
    height: 44,
    borderBottomWidth: 1,
    borderBottomColor: '#e5e5e5',
    alignItems: 'center',
  },
  itemsLast: {
    flexDirection: 'row',
    height: 44,
    alignItems: 'center',
  },
  txtTitle: {
    flex: 1,
    alignItems: 'center',
  },
  txtContent: {
    flex: 2,
    paddingLeft: 15,
  },
});
