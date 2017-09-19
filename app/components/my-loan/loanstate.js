import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native';
import dateFormat from 'dateformat';

export default class Loanstate extends Component {
  render() {
    const { loan = {} } = this.props;
    const { loanTime, isCardBound, status } = loan;
    let auditSta = true;
    let adoptSta = true;
    let cardSta = true;
    let loanSta = true;
    if(status >= 5 && status<20) {
      auditSta = false;
    }else if(status === 21){

    }else if(status>=20 && status<30){
      auditSta = false;
      adoptSta = false;
      if(isCardBound===1){
        cardSta = false;
      }
    }else if(status===30 || status===31){
      auditSta = false;
      adoptSta = false;
      cardSta = false;
      loanSta = false;
    }

    console.info(loan);
    return (
      <View>
        <View style={{ backgroundColor: '#F2F1F5', paddingTop: 10, marginTop: 20 }}></View>
        <View style={styles.container}>
          {
            auditSta ?
              <View >
                <View style={styles.flexStyle}>
                  <Image style={styles.icon} source={require('image!audit_g')} />
                  <Text style={styles.bold_g}>审核中</Text>
                </View>
                <View style={styles.borderLeft_g}>
                  <Text style={styles.color_g}>您的借款正在审核中，请耐心等待！</Text>
                  <Text></Text>
                </View>
              </View>
              :
              <View>
                <View style={styles.flexStyle}>
                  <Image style={styles.icon} source={require('image!audit_b')} />
                  <Text style={styles.bold_b}>审核中</Text>
                </View>
                <View style={styles.borderLeft_b}>
                  <Text>您的借款正在审核中，请耐心等待！</Text>
                  <Text></Text>
                </View>
              </View>
          }

          {
            adoptSta ?
              <View >
                <View style={styles.flexStyle}>
                  <Image style={styles.icon} source={require('image!adopt_g')} />
                  <Text style={styles.bold_g}>审核通过</Text>
                </View>
                <View style={styles.borderLeft_g}>
                  <Text style={styles.color_g}>恭喜你！审核通过！感谢你的支持！</Text>
                  <Text></Text>
                </View>
              </View>
              :
              <View>
                <View style={styles.flexStyle}>
                  <Image style={styles.icon} source={require('image!adopt_b')} />
                  <Text style={styles.bold_b}>审核通过</Text>
                </View>
                <View style={styles.borderLeft_b}>
                  <Text>恭喜你！审核通过！感谢你的支持！</Text>
                  <Text></Text>
                </View>
              </View>
          }

          {
            cardSta ?
              <View >
                <View style={styles.flexStyle}>
                  <Image style={styles.icon} source={require('image!card_g')} />
                  <Text style={styles.bold_g}>确认银行卡</Text>
                </View>
                <View style={styles.borderLeft_g}>
                  <Text style={{ width: 228.5, color: '#C9C9C9' }}>已确认您的银行卡信息</Text>
                  <Text></Text>
                </View>
              </View>
              :
              <View>
                <View style={styles.flexStyle}>
                  <Image style={styles.icon} source={require('image!card_b')} />
                  <Text style={styles.bold_b}>确认银行卡</Text>
                </View>
                <View style={styles.borderLeft_b}>
                  <Text style={{ width: 228.5 }}>已确认您的银行卡信息</Text>
                  <Text></Text>
                </View>
              </View>
          }

          {
            loanSta ?
              <View >
                <View style={styles.flexStyle}>
                  <Image style={styles.icon} source={require('image!loan_g')} />
                  <Text style={styles.bold_g}>放款</Text>
                </View>
                <View style={styles.borderLeft}>
                  <Text style={{ width: 228.5, color: '#C9C9C9' }}>恭喜您，借款已放款，请查收！</Text>
                  <Text></Text>
                </View>
              </View>
              :
              <View>
                <View style={styles.flexStyle}>
                  <Image style={styles.icon} source={require('image!loan_b')} />
                  <Text style={styles.bold_b}>放款</Text>
                </View>
                <View style={styles.borderLeft}>
                  <Text style={{ width: 228.5 }}>恭喜您，借款已放款，请查收！</Text>
                  <View style={styles.flexStyle_2}>
                    <Image style={styles.icon_date} source={require('image!date')} />
                    <Text style={styles.font_size}>{loanTime ? dateFormat(new Date(loanTime), 'yyyy/mm/dd HH.MM') : ''}</Text>
                  </View>
                </View>
              </View>
          }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  borderLeft_g: {
    borderLeftWidth: 2,
    borderColor: '#C9C9C9',
    paddingLeft: 15,
    paddingTop: 2,
    paddingBottom: 10,
    marginLeft: 9,
  },
  color_g: {
    color: '#C9C9C9',
  },
  borderLeft_b: {
    borderLeftWidth: 2,
    borderColor: '#197DE8',
    paddingLeft: 15,
    paddingTop: 2,
    paddingBottom: 10,
    marginLeft: 9,
  },
  borderLeft: {
    borderLeftWidth: 2,
    borderColor: 'transparent',
    paddingLeft: 15,
    paddingTop: 2,
    paddingBottom: 10,
    marginLeft: 9,
  },
  icon: {
    width: 20,
    height: 20,
  },
  icon_date: {
    marginTop: 2,
    width: 10,
    height: 10 ,
  },
  font_size: {
    fontSize: 12,
    paddingLeft: 1,
  },
  flexStyle: {
    flexDirection: 'row',
  },
  flexStyle_2: {
    flexDirection: 'row',
    paddingTop: 2,
  },
  bold_g: {
    fontWeight: 'bold',
    paddingTop: 1,
    paddingLeft: 5,
    color: '#C9C9C9',
  },
  bold_b: {
    fontWeight: 'bold',
    paddingTop: 1,
    paddingLeft: 5,
    color: '#197DE8',
  },
  flex_8_b: {
    color: '#197DE8',
    flex: 8,
  },
});

Loanstate.propTypes = {
  loan: React.PropTypes.object,
};
