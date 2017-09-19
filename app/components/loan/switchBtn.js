import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { connect } from 'react-redux';
import Btn from '../common/LldButton';

class SwitchBtn extends Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { productSpecs } = this.props.loanState;
    let code1 = '', code2 = '', code3 = '';
    if(productSpecs.length == 2){
      code1 = productSpecs[0].productCode;
      code2 = productSpecs[1].productCode;
    } else if(productSpecs.length == 3) {
      code1 = productSpecs[0].productCode;
      code2 = productSpecs[1].productCode;
      code3 = productSpecs[2].productCode;
    }
    return (
      <View>
        <View style={styles.titleWrap}>
          <Text style={styles.title}>
            产品选择
          </Text>
        </View>
        {
          productSpecs.length == 2 ?
            <View style={styles.btnWrap}>
              <Btn containerStyle={this.props.active == code1 ? styles.btnLeftActive : styles.btnLeft} style={this.props.active == code1 ? styles.txtActive : styles.txt} onPress={() => this.props.press(code1,productSpecs)} name={productSpecs[0].repayAmount} />
              <Btn containerStyle={this.props.active == code2 ? styles.btnRightActive : styles.btnRight} style={this.props.active == code2 ? styles.txtActive : styles.txt} onPress={() => this.props.press(code2,productSpecs)} name={productSpecs[1].repayAmount} />
            </View>
            :
            <View style={styles.btnWrap}>
              <Btn containerStyle={this.props.active == code1 ? styles.btnLeftActive : styles.btnLeft} style={this.props.active == code1 ? styles.txtActive : styles.txt} onPress={() => this.props.press(code1,productSpecs)} name={productSpecs[0].repayAmount} />
              <Btn containerStyle={this.props.active == code2 ? styles.btnActive : styles.btn} style={this.props.active == code2 ? styles.txtActive : styles.txt} onPress={() => this.props.press(code2,productSpecs)} name={productSpecs[1].repayAmount} />
              <Btn containerStyle={this.props.active == code3 ? styles.btnRightActive : styles.btnRight} style={this.props.active == code3 ? styles.txtActive : styles.txt} onPress={() => this.props.press(code3,productSpecs)} name={productSpecs[2].repayAmount} />
            </View>
        }
      </View>

    );
  }
}

const mapStateToProps = (state) => ({
  loanState: state.loanState,
});

export default connect(mapStateToProps)(SwitchBtn);

const styles = StyleSheet.create({
  btnWrap: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  btn: {
    height: 36,
    width: 100,
    backgroundColor: '#fff',
    borderColor: '#1d7cf0',
    borderWidth: 1,
    marginBottom: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 2,
  },
  btnActive: {
    height: 36,
    width: 100,
    backgroundColor: '#1d7cf0',
    borderColor: '#1d7cf0',
    borderWidth: 1,
    marginBottom: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: 2,
  },
  btnLeft: {
    height: 36,
    width: 100,
    backgroundColor: '#fff',
    borderColor: '#1d7cf0',
    borderWidth: 1,
    marginBottom: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  btnLeftActive: {
    height: 36,
    width: 100,
    backgroundColor: '#1d7cf0',
    borderColor: '#1d7cf0',
    borderWidth: 1,
    marginBottom: 20,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderTopLeftRadius: 18,
    borderBottomLeftRadius: 18,
    borderTopRightRadius: 2,
    borderBottomRightRadius: 2,
  },
  btnRight: {
    height: 36,
    width: 100,
    backgroundColor: '#fff',
    borderColor: '#1d7cf0',
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  btnRightActive: {
    height: 36,
    width: 100,
    backgroundColor: '#1d7cf0',
    borderColor: '#1d7cf0',
    borderWidth: 1,
    marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderTopRightRadius: 18,
    borderBottomRightRadius: 18,
    borderTopLeftRadius: 2,
    borderBottomLeftRadius: 2,
  },
  txtActive: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
  txt: {
    fontSize: 16,
    color: '#1d7cf0',
    alignSelf: 'center',
  },
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
});