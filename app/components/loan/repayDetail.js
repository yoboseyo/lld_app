import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Btn from '../common/LldButton';

export default class RepayDetail extends Component {
  render() {
    //const index = this.props.productSpec.loanAmount == 1000 ? 1 : 2;
    return (
      <View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>
            每期还款包括
          </Text>
        </View>
          <View>
            <View style={styles.wrapD}>
              <View style={styles.flexE}>
                <Text style={styles.txtE}>快速信审费</Text>
                <Text style={styles.txtE}><Text style={styles.txtBlue}>
                  {this.props.productSpec.auditFee}</Text>元</Text>
              </View>
              <View style={styles.flexE}>
                <Text style={styles.txtE}>利息</Text>
                <Text style={styles.txtE}><Text style={styles.txtBlue}>
                  {this.props.productSpec.interest}</Text>元</Text>
              </View>
              <View style={styles.flexE}>
                <Text style={styles.txtE}>账户管理费</Text>
                <Text style={styles.txtE}><Text style={styles.txtBlue}>
                  {this.props.productSpec.mgmtFee}</Text>元</Text>
              </View>
            </View>
            <View style={styles.titleWrap}>
              <Text style={styles.title} />
            </View>
            <View style={styles.wrapD}>
              <View style={styles.flexF}>
                <Text style={styles.txtD}>到账金额</Text>
                <Text style={styles.txtD}><Text style={styles.txtBlue}>
                  {this.props.productSpec.loanAmount}</Text>元</Text>
              </View>
              <View style={styles.flexFLast}>
                <Text style={styles.txtD}>到期还款</Text>
                <Text style={styles.txtD}><Text style={styles.txtBlue}>
                  {this.props.productSpec.repayAmount}</Text>元</Text>
              </View>
            </View>
          </View>

        <View style={styles.wrapB}>
          <Btn onPress={this.props.onNext} name={'下一步'} containerStyle={styles.containerStyle} style={styles.tStyle} />
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
    fontSize: 13,
    color: '#7e7f7e',
    paddingLeft: 8,
  },
  wrapD: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 18,
    paddingBottom: 18,
  },
  flexD: {
    flex: 1,
    padding: 21,
  },
  flexE: {
    flex: 1,
    paddingTop: 3,
    paddingBottom: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexF: {
    flex: 1,
    paddingTop: 3,
    paddingBottom: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flexFLast: {
    flex: 1,
    paddingTop: 3,
    paddingBottom: 3,

    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: 1,
    borderLeftColor: '#f0f0f0',
    borderStyle: 'solid',
  },
  txtD: {
    color: '#7e7f7e',
    lineHeight: 24,
    fontSize: 13,
  },
  txtE: {
    color: '#7e7f7e',
    lineHeight: 24,
    fontSize: 13,
  },
  txtBlue: {
    color: '#1d7cf0',
  },
  wrapB: {
    backgroundColor: '#fff',
    marginTop: 26,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 29,
    paddingBottom: 200,
  },
  btn: {
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#84abe3',
    borderRadius: 22,
  },
  txtB: {
    color: '#fff',
  },
  containerStyle: {
    height: 45,
    width: 330,
    backgroundColor: '#1d7cf0',
    borderColor: '#1d7cf0',
    borderWidth: 1,
    borderRadius: 23,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tStyle: {
    fontSize: 15,
    color: 'white',
    alignSelf: 'center',
  },
});

RepayDetail.propTypes = {
  productSpec: React.PropTypes.object,
  onNext: React.PropTypes.func.isRequired,
};
