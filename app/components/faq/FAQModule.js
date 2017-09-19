/**
 * Created by Administrator on 2016/9/8.
 */
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

const FAQs = [
  {
    bool: "true",
    title: "Q1：蓝领贷的额度和期限是多少？",
    content: "A1：蓝领贷是在您需要时为您快速提供现金借款服务的平台，目前借款的额度固定为1000元，期限固定为14天，现金将拨付至您所绑定的银行储蓄卡。您需要在每笔借款到期日还款，以维护和提升您的信用水平。"
  },
  {
    bool: "false",
    content: "A1：蓝领贷是在您需要时为您快速提供现金借款服务的平台，目前借款的额度固定为1000元，期限固定为14天，现金将拨付至您所绑定的银行储蓄卡。您需要在每笔借款到期日还款，以维护和提升您的信用水平。"
  },
  {bool: "true", title: "Q2：如何申请借款？"},
  {bool: "false", content: "A2：打开APP，点击“我要借款”进行注册和申请。"},
  {bool: "true", title: "Q3：怎样进行还款？是否可以提前还款？"},
  {
    bool: "false",
    content: "A3：我们会在还款日的前一天给您发送微信消息提醒您还款，需要您在还款日当天或之前在App上进行一键还款或把钱转到指定的支付宝中。支付宝还款：zhifubao@lanlingdai.net （上海截塔金融信息服务有限公司）。可以提前还款，但息费不予减免，还款金额不变，如需提前还款请与微信客服联系"
  },
  {bool: "true", title: "Q4：具备什么样的条件才能申请借款？"},
  {bool: "false", content: "A4：蓝领贷并未对您的所在区域、职业、收入等条件进行具体限制，只需要您年满18周岁，有稳定使用的手机号码和稳定的收入即可申请。"},
  {bool: "true", title: "Q5：申请需要提供什么资料？系统是如何审核的？"},
  {
    bool: "false",
    content: "A5：只需要按照系统提示填写认证所需的资料即可，不需要其它任何资料，请务必填写您的真实资料。系统根据您认证的数据结合第三方合作公司的数据进行分析，多维度计算出您的信用评分，多项评分综合计算出您的借款审核结果。"
  },
  {bool: "true", title: "Q6：什么是手机服务密码？"},
  {
    bool: "false",
    content: "A6：手机服务密码是您的手机号码在电信运营商获取服务时设置的认证密码，比如查询通话详单就需要提供手机服务密码。通过提供手机服务密码，我们将从您的手机运营商获取您的手机账单、详单等信息，以对您的信用状况进行评估，请您务必准确提供。如忘记手机服务密码，请联系您的手机运营商进行修改。"
  },
  {bool: "true", title: "Q7：怎样进行手机验证？"},
  {
    bool: "false",
    content: "A7：输入您的手机号服务密码和验证码，然后点击“下一步”，按照系统提示操作即可。系统仍处于测试阶段，我们的数据处理系统与手机服务运营商的数据可能对接不上，如验证不成功，请再次尝试，如反复尝试仍不能成功，说明我们暂时无法服务到您，请您过段时间以后再次尝试，十分抱歉。"
  },
  {bool: "true", title: "Q8：为什么我收不到短信验证码？"},
  {bool: "false", content: "A8：系统是正常下发短信的，建议您查看一下是否被手机安全软件拦截了，或者重新启动手机再尝试，如仍不能获取，就稍后再次尝试。"},
  {bool: "true", title: "Q9：怎样修改手机号码？"},
  {bool: "false", content: "A9：目前系统不支持修改手机号码，请联系微信客服修改。"},
  {bool: "true", title: "Q10：我的姓名或身份证填写错误，能否修改？"},
  {bool: "false", content: "A10：不可以，姓名和身份证是账户的关键标识，请联系微信客服修改。"},
  {bool: "true", title: "Q11：我的个人资料是否会被泄露？"},
  {bool: "false", content: "A11：我们不会未经授权透露您的个人资料给第三方（还款逾期及提供服务的必要情况除外）。"},
  {bool: "true", title: "Q12：为什么我的数据获取不到？"},
  {
    bool: "false",
    content: "A12：存在个别用户的借款申请资料已经提交，也已收到查询通话详单的短信，但我们仍未能获取您的数据，造成我们无法审核您的借款申请。系统仍处于测试阶段，我们会尽快改进，如发生此种情况，建议您取消借款申请，下次有需要时再尝试申请。"
  },
  {bool: "true", title: "Q13：为什么我的申请审核没有通过？能否再次申请？"},
  {
    bool: "false",
    content: "A13：很抱歉，由于您的综合评分不足，因此借款申请暂未能获得批准。系统通过大数据分析自动审核，由于风险控制原因，无法告知您详细的信用分数和未通过的具体原因。如果个人资料无重大变化，不建议短期内再次申请，如有借款需求，请在一个月后再次尝试申请。"
  },
  {bool: "true", title: "Q14：为什么要持证自拍？怎样进行持证自拍？"},
  {
    bool: "false",
    content: "A14：持证自拍是认证的必要流程，证明您知晓并确认本次借款，每次借款均需要您进行持证自拍。请拍摄您手持身份证的照片，，照片上的身份证文字和本人脸部都必须清晰可辨。"
  },
  {bool: "true", title: "Q15：还款日如何计算？如何查询我的还款日？"},
  {bool: "false", content: "A15：还款日是按照借款的实际发放日期，顺延14天。请点击菜单里的“我”->“我的借款”，即可查看详细的还款信息。"},
  {bool: "true", title: "Q16：什么是逾期？如果逾期应该如何还款？"},
  {bool: "false", content: "A16：如您在还款日当天未能正常还款即属于逾期。逾期行为会对您的信用记录产生不良的影响。逾期后需要还款，请与微信客服联系。"},
  {bool: "true", title: "Q17：如何计算逾期费用？"},
  {bool: "false", content: "A17：每日逾期费率是借款本金的2%，例如：1000元借款如逾期2天，则对应逾期费用是40元（1000元* 2% * 2天）。"},
  /*{bool: "true", title: "Q18：什么是续期？如何申请续期？"},
  {
    bool: "false",
    content: "A18：续期是您结清本期的息费，另外收取20元的续期手续费，您可以继续使用本金14天，续期的息费按照产品正常的收费方式收取。如需申请续期，请与微信客服联系。"
  },
  {bool: "true", title: "Q19：如何计算续期费用？"},
  {
    bool: "false",
    content: "A19：续期费用包括本期的息费和额外的20元续期手续费，例如：1月1日借款1000元14天，1月15日是还款日，应还款总额为1100元，如办理续期，需结清本期息费100元及20元续期手续费，共120元。续期成功后，应在14天后（1月29日）还款1100元。"
  },*/
  {bool: "true", title: "Q18：如未按时还款会有什么后果？"},
  {
    bool: "false",
    content: "A18：我们会采取合法催收措施，同时将收取罚息和逾期管理费，每日的罚息和逾期管理费总额为借款本金的2%，具体条款请参阅借款协议。如严重违约，我们将可能在产品中公布您的个人信息，同时您以后也将无法再向我们申请借款，最后，我们也将如实上传您的失信记录到您的网络征信档案，供其他金融机构和平台参考。"
  },
  {bool: "true", title: "Q19：忘记注册密码是否能够找回？"},
  {bool: "false", content: "A19：重置密码请点击“我“->“个人资料”，点击重置密码进行修改。"},
];

export default class FAQModule extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bool: FAQs };
    this.onClickTitle = this.onClickTitle.bind(this);
    this.renderCell = this.renderCell.bind(this);
    this.renderRow = this.renderRow.bind(this);
  }
  onClickTitle(centent, bool, i) {
    FAQs[i].bool = bool ? false : true;
    this.setState({ bool: FAQs });
  }
  renderCell(faq, i) {
    let expandText = null;
    if(faq.title) {
      return (
        <View key={i} style={FAQs[i+1].bool?styles.title1:styles.title2} >
          <Text
            style={FAQs[i+1].bool?styles.flex_10:styles.color}
            onPress={this.onClickTitle.bind(this, faq.content, FAQs[i+1].bool, i + 1)}
          >
            {faq.title}
          </Text>
          <View style={{ flex: 1,alignSelf: 'center' }}>
            <Icon name={FAQs[i+1].bool?'ios-arrow-down':'ios-arrow-up'} size={16} style={{alignSelf: 'flex-end' }} />
          </View>
        </View>
      );
    } else {
      expandText = this.state.bool[i].bool?null:(
        <View style={styles.content} key={'content2'+i}>
          <Text>{faq.content}</Text>
        </View>
      );
      return (<View key={i} >{expandText}</View>);
    }
  }
  renderRow() {
    return (
      <View>
        {this.state.bool.map((faq, i) => this.renderCell(faq, i))}
      </View>
    );
  }
  render() {
    return (
      <View style={{ padding: 20, backgroundColor: '#fff' }}>
        {this.renderRow()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title1: {
    padding: 10,
    backgroundColor: '#F9F9F9',
    borderBottomWidth: 1,
    borderColor: '#ddd',
    flexDirection: 'row',
  },
  title2: {
    padding: 10,
    backgroundColor: '#abd6ff',
    flexDirection: 'row',
  },
  color: {
    color: '#fff',
    flex: 10,
  },
  flex_10: {
    flex: 10,
  },
  content: {
    padding: 10,
  }
});