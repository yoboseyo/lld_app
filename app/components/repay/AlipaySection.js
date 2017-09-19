import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

class AlipaySection extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ lineHeight: 25 }}>优先点击上方<Text style={{ fontWeight: 'bold' }}>“我要还款”</Text>直接一键处理，有利于提升本人信用评分</Text>
        <Text />
        <View style={styles.aliTitle}>
          <Image style={styles.imgAli} source={require('image!icon_ali')} />
          <Text style={styles.aliTitleText}>支付宝转账付款</Text>
        </View>
        <Text />
        <View style={styles.aliText}>
          <Text style={styles.aliTextRow}>1.直接转账至：zhifubao@lanlingdai.net</Text>
          <Text style={[styles.aliTextRow, { color: '#aeaeae' }]}>上海截塔金融信息服务有限公司</Text>
          <Text style={styles.aliTextRow}>2.备注您的姓名和手机</Text>
          <Text style={styles.aliTextRow}>3.联系公众号客服确认</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingRight: 35,
    paddingBottom: 20,
    paddingLeft: 35,
    backgroundColor: 'white',
  },
  contact: {
    height: 23,
    margin: 10,
    marginTop: 0,
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactTxt: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txtWrap: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 20,
  },
  txt: {
    fontSize: 12,
    color: '#727174',
  },
  aliTitle: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imgAli: {
    width: 20,
    height: 20,
  },
  aliTitleText: {
    marginLeft: 5,
  },
  aliText: {

  },
  aliTextRow: {
    padding: 5,
  },
});

export default AlipaySection;
