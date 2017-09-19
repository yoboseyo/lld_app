/**
 * Created by Administrator on 2016/9/19.
 */
import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class PaymentAgreement extends React.Component {
  render() {
    var nowTime = new Date().toLocaleDateString();
    let {bankName, bankCard, bankMobile, idCardNo, custName} = this.props.userInfo;
    return (
      <View style={{marginTop: 20}}>
        <Modal
          visible={this.props.visible}
        >
          <ScrollView style={{marginTop: 20, backgroundColor: 'rgba(0,0,0,0.7)'}}>
            <View style={{ margin: 20, backgroundColor: '#fff',padding: 15, borderRadius: 5 }}>
              <Text style={ stylesCss.font20 }>委托扣款协议</Text>
              <Text style={ stylesCss.font16 }><Text>甲方（借款人）：<Text>{this.props.custName?this.props.custName:this.props.custName!=''?custName:this.props.custName}</Text></Text></Text>
              <Text style={ stylesCss.marginBottom10 }>
                真实姓名：<Text >{this.props.custName?this.props.custName:this.props.custName!=''?custName:this.props.custName}</Text></Text>

              <Text style={ stylesCss.marginBottom10 }>
                身份证号：<Text>{idCardNo}</Text></Text>

              <Text style={ stylesCss.marginBottom10 }>
                银行卡号：<Text >{this.props.bankCard?this.props.bankCard:this.props.bankCard!=''?bankCard:this.props.bankCard}</Text></Text>

              <Text style={ stylesCss.marginBottom10 }>
                手机号：<Text >{this.props.bankMobile?this.props.bankMobile:this.props.bankMobile!=''?bankMobile:this.props.bankMobile}</Text></Text>
              <Text  style={ stylesCss.font16 }>乙方（技术服务方 </Text>

              <Text style={ stylesCss.marginBottom10 }>
                上海截塔金融信息服务有限公司</Text>

              <Text style={ stylesCss.marginBottom10 }>
                甲方 <Text > {this.props.custName?this.props.custName:this.props.custName!=''?custName:this.props.custName}</Text> 与 乙方 上海截塔金融信息服务有限公司 于 <Text >{nowTime}</Text>
                日签署《委托扣款协议》（以下简称“协议”），现甲方郑重声明已仔细阅读并知晓、理解下述各项规定并同意遵守：</Text>

              <Text style={ stylesCss.marginBottom10 }>
                1.甲方同意乙方从其借款到期日凌晨0点起，即可通过与乙方合作的支付公司，包括但不限于快钱支付清算支付信息有限公司、连连银通电子支付有限公司、易宝支付有限公司等支付平台，从甲方的银行账户中以约定的资费标准划付应付的费用。上述银行账户余额不足的，乙方有权委托支付公司继续划付直至甲方还清所欠款项为止</Text>

              <Text style={ stylesCss.marginBottom10 }>
                2.甲方应当按照预付款的金额在上述银行卡内存入足够的款项，乙方工作人员根据甲方预付款金额办理相关扣款转账手续；由于挂失、账户冻结、金额不足等原因造成扣款失败而导致甲方损失的，由甲方自行承担。</Text>

              <Text style={ stylesCss.marginBottom10 }>3.甲方变更付款授权账户时，须及时通知乙方，并按更换后的账户信息重新签署授权书。因甲方未及时办理变更手续而导致的结果，由甲方承担。</Text>

              <Text style={ stylesCss.marginBottom10 }>
                4.本项授权自签订日起开始生效，有效期至本协议项下借款本息、费用清偿之日止，授权有效期不得超过3年，超过需重新进行授权，方能继续生效。</Text>
              <TouchableHighlight style={{position: 'absolute', right: 10, top: 10,}}
                                  onPress={() => {
                                    this.props.pressFunc(false)
                                  }}>
                <Icon name="close" color="#ccc" size={25}/>
              </TouchableHighlight>
            </View>
          </ScrollView>
        </Modal>
      </View>
    );
  }
}
PaymentAgreement.PropTypes = {
  pressFunc: React.PropTypes.func,
  userInfo: React.PropTypes.object,
};
const stylesCss = StyleSheet.create({
  font20: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 30,
  },
  font16: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  marginBottom10: {
    marginBottom: 10,
  },
});
export default PaymentAgreement;

