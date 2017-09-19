import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default class ProductIntro extends Component {
  render() {
    //const index = this.props.productSpec.loanAmount == 1000 ? 1 : 2;
    return (
      <View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>
            产品介绍
          </Text>
        </View>
        <View style={styles.wrap}>
          <View style={styles.flex}>
            <Text style={styles.txt}>借款金额</Text>
            <Text style={styles.txt}>{this.props.productSpec.repayAmount}元</Text>
          </View>
          <View style={styles.flex}>
            <Text style={styles.txt}>借款期限</Text>
            <Text style={styles.txt}>{this.props.productSpec.period}天</Text>
          </View>
          {/*{
            index == 1 ?
              <View style={styles.flexLast}>
                <Text style={styles.txt}>到期还款</Text>
                <Text style={styles.txt}>{this.props.productSpec.repayAmount}元</Text>
              </View>
              :
              null
          }*/}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  titleWrap: {
    height: 26,
    // alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#7e7f7e',
    paddingLeft: 8,
    fontSize: 13,
  },
  wrap: {
    backgroundColor: '#fff',
    paddingTop: 18,
    paddingBottom: 18,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
    borderStyle: 'solid',
    paddingTop: 3,
    paddingBottom: 3,
  },
  flexLast: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  txt: {
    fontSize: 13,
    lineHeight: 24,
    color: '#7e7f7e',
  },
});

ProductIntro.propTypes = {
  productSpec: React.PropTypes.object,
};
