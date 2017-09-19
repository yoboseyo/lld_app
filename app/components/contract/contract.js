import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import dateFormat from 'dateformat';
import * as LoanActions from '../../actions/loan-actions';
import InstalmentInfo from './instalmentInfo';

class Contract extends Component {
  componentWillMount() {
    const { loanId } = this.props;
    this.props.actions.getContractInfo(loanId);
  }

  render() {
      const { curLoan = {}, productSpecs = {} } = this.props.loanState;
      const { custName, appIdcardNo, bankCard, mobile, amount, sum, period, dueDate, loanTime } = curLoan;
      console.info(this.props.loanId);
      const { interestPerDay, mgmtPerDay, instalments, auditFee, mgmtFee, interest } = productSpecs;
      const showStamp = false;
      const instalmentInfo = {
          amount,
          period,
          sum,
          auditFee,
          mgmtFee,
          interest,
          instalments,
          loanTime,
          dueDate
      };
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.mainTitle}>借款合同</Text>
        <Text style={styles.subTitle}>甲方（出借人）：</Text>
        <Text style={styles.txt}>{'\t'}真实姓名：<Text style={styles.subTxt}>**文</Text></Text>
        <Text style={styles.txt}>{'\t'}身份证号：<Text style={styles.subTxt}>33************0019</Text></Text>
        <Text style={styles.subTitle}>乙方（借款人）：</Text>
        <Text style={styles.txt}>{'\t'}真实姓名：<Text style={styles.subTxt}>{custName}</Text></Text>
        <Text style={styles.txt}>{'\t'}身份证号：<Text style={styles.subTxt}>{appIdcardNo}</Text></Text>
        <Text style={styles.txt}>{'\t'}银行卡号：<Text style={styles.subTxt}>{bankCard}</Text></Text>
        <Text style={styles.txt}>{'\t'}手机号：<Text style={styles.subTxt}>{mobile}</Text></Text>
        <Text style={styles.subTitle}>丙方（见证人/技术服务方）</Text>
        <Text style={styles.txt}>{'\t'}上海截塔金融信息服务有限公司</Text>
        <Text style={styles.txt}>{'\t'}鉴于：</Text>
        <Text style={styles.txt}>{'\t'}
          1、丙方是一家在上海市合法成立并有效存续的有限责任公司，提供信用咨询，为交易提供信息服务，并协助甲乙双方进行本合同项下的借款回收及日常管理工作；同时也是国内领先的微金融服务平台，拥有成熟的小微金融信息技术、网络平台、信用评分、信用管理等专业服务体系，为国内个人提供专业化、一站式的零售金融服务；</Text>
        <Text style={styles.txt}>{'\t'}2、乙方已通过“蓝领贷”微信服务号在丙方注册，并承诺其提供给丙方的信息完全真实；</Text>
        <Text style={styles.txt}>{'\t'}3、甲方承诺对本协议涉及的借款具有完全的支配能力，是其自有闲散资金，为其合法所得；并承诺其提供给丙方的信息是完全真实的；</Text>
        <Text style={styles.txt}>{'\t'}4、乙方有借款需求，甲方亦同意借款，双方有意成立借贷关系。</Text>

        <Text style={styles.txt}>{'\t'}各方经协商一致，签订如下协议，共同遵照履行：</Text>
        <Text style={styles.subTitle}>第一条 借款基本信息</Text>

        {/*<InstalmentInfo instalmentInfo={instalmentInfo} />*/}

        <Text style={styles.subTitle}>第二条 借款发放方式</Text>
        <Text style={styles.txt}>{'\t'}甲乙双方确认，本协议项下的借款可以以下列方式的中的一种或多种并行的方式完成发放；</Text>
        <Text style={styles.txt}>{'\t'}1.甲方通过个人网银或第三方支付渠道将款项转入乙方在丙方绑定的银行卡账户；</Text>
        <Text style={styles.txt}>{'\t'}2.甲方通过个人网银或第三方支付将款项转入乙方在第三方支付机构开设的虚拟账户；</Text>
        <Text style={styles.txt}>{'\t'}3.甲方通过个人网银或第三方支付为乙方在网络上购买商品或服务产生的订单进行支付；</Text>
        <Text style={styles.txt}>{'\t'}4.双方约定的其他方式；</Text>

        <Text style={styles.txt}>{'\t'}双方确认，无论采取以上何种方式，款项一经从甲方的银行账户或第三方支付账户转出或支付，即视为资金已经发放，借款协议成立，乙方不得以任何理由拒绝履行本协议项下的还款义务。</Text>

        <Text style={styles.subTitle}>第三条 各方权利和义务</Text>
        <Text style={styles.txt}>{'\t'}甲方的权利和义务</Text>
        <Text style={styles.txt}>{'\t'}1.甲方应按协议在本协议签订日期或乙丙双方另行约定的其他日期将足额的借款本金支付给乙方。</Text>
        <Text style={styles.txt}>{'\t'}
          2.甲方保证其所用于出借的资金来源合法，甲方是该资金的合法所有人，如果第三人对资金归属、合法性问题发生争议，由甲方负责解决。如甲方未能解决，则放弃享有其所出借款项所带来的利息收益。</Text>
        <Text style={styles.txt}>{'\t'}3.甲方享有其所出借款项所带来的利息收益。</Text>
        <Text style={styles.txt}>{'\t'}4.如乙方违约，甲方有权要求丙方提供其已获得的乙方信息。</Text>
        <Text style={styles.txt}>{'\t'}
          5.无须通知乙方和丙方，甲方可以根据自己的意愿进行本协议下其对乙方债权的转让。在甲方的债权转让后，乙方仍应按照本协议的约定向债权受让人支付每期应还贷款本息，不得以未接到债权转让通知为由拒绝履行还款义务。</Text>
        <Text style={styles.txt}>{'\t'}6.甲方应主动缴纳由利息所得带来的可能的税费。</Text>

        <Text style={styles.txt}>{'\t'}乙方权利和义务</Text>
        <Text style={styles.txt}>{'\t'}1.乙方必须按期足额向甲方支付应还本金和利息。</Text>
        <Text style={styles.txt}>{'\t'}2.乙方必须足额向丙方支付相关服务费用，包括快速审核费和账户管理费。</Text>
        <Text style={styles.txt}>{'\t'}3.乙方承诺所借款项不用于任何违法用途。</Text>
        <Text style={styles.txt}>{'\t'}4.乙方应确保其提供的信息和资料的真实性，不得提供虚假信息或隐瞒重要事实。</Text>
        <Text style={styles.txt}>{'\t'}5.乙方不得将本协议项下的任何权利义务转让给任何其他方。</Text>
        <Text style={styles.txt}>{'\t'}6.乙方授权甲方在借款的还款日通过丙方提供的第三方支付机构从乙方绑定的银行账户内划转应还款金额，作为偿还借款的方式之一；并授权丙方协助提供第三方划扣所需的文件及授权。</Text>
        <Text style={styles.txt}>{'\t'}7.乙方同意本协议第八条委托代扣款授权的相关内容。</Text>

        <Text style={styles.txt}>{'\t'}丙方的权利和义务</Text>
        <Text style={styles.txt}>{'\t'}1.丙方作为技术服务方，为乙方提供相应的技术服务和管理服务。</Text>
        <Text style={styles.txt}>{'\t'}2.丙方享有乙方支付的相关服务费用，包括快速审核费和账户管理费。</Text>
        <Text style={styles.txt}>{'\t'}3.甲乙双方在此确认，丙方不是本协议规定的借贷关系的当事人；甲乙双方中的任何一方根据借贷关系向对方主张权利时，不得将丙方列为共同被告，也不得要求丙方承担连带责任。</Text>

        <Text style={styles.subTitle}>第四条 违约责任</Text>
        <Text style={styles.txt}>{'\t'}1.合同各方均应严格履行合同义务，非经各方协商一致或依照本协议约定，任何一方不得解除本协议。</Text>
        <Text style={styles.txt}>{'\t'}
          2.任何一方违约，违约方应承担因违约使得其他各方产生的费用和损失，包括但不限于调查、诉讼费、律师费等，应由违约方承担。如违约方为乙方的，甲方有权立即解除本协议，并要求乙方立即偿还未偿还的本金、利息、快速审核费、账户管理费、违约金。</Text>
        <Text style={styles.txt}>{'\t'}3.乙方的每期还款均应按照如下顺序清偿：</Text>
        <Text style={styles.txt}>{'\t'} （1）根据本协议产生的其他全部费用；</Text>
        <Text style={styles.txt}>{'\t'} （2）逾期罚息；</Text>
        <Text style={styles.txt}>{'\t'} （3）逾期管理费；</Text>
        <Text style={styles.txt}>{'\t'} （4）账户管理费；</Text>
        <Text style={styles.txt}>{'\t'} （5）快速审核费；</Text>
        <Text style={styles.txt}>{'\t'} （6）正常的利息；</Text>
        <Text style={styles.txt}>{'\t'} （7）正常的本金；</Text>
        <Text style={styles.txt}>{'\t'}4.乙方应严格履行还款义务，如乙方逾期还款且丙方未替乙方垫付应还本息时，则应按照下述条款向甲方支付逾期违约金，自逾期开始之后，在利息照常计算的基础上加收；</Text>
        <Text style={styles.txt}>{'\t'}逾期罚息总额 = <Text style={styles.subTxt}>{interestPerDay}</Text>元×逾期天数；</Text>
        <Text style={styles.txt}>{'\t'}5.乙方应严格履行还款义务，如乙方逾期还款，则应按照下述条款向丙方支付逾期管理费。</Text>
        <Text style={styles.txt}>{'\t'}逾期管理费总额 = <Text style={styles.subTxt}>{mgmtPerDay}</Text>元×逾期天数；</Text>
        <Text style={styles.txt}>{'\t'}
          6.如果乙方逾期支付超过30天，或甲方/丙方发现乙方出现逃避、拒绝沟通或拒绝承认欠款事实、故意转让资金、信用情况恶化等危害本协议借款的情形。丙方有权将乙方的“逾期记录”、“恶意行为”或“不良情况”记入公民征信系统，或将乙方违约失信的相关信息及乙方其他信息向媒体、用人单位、公安机关、检查机关、法律机关披露，丙方不承担任何法律责任.</Text>
        <Text style={styles.txt}>{'\t'}7.在乙方还清全部本金、利息、快速审核费、账户管理费、逾期罚息、逾期管理费之前，逾期罚息及逾期管理费的计算不停止。</Text>

        <Text style={styles.subTitle}>第五条 提前还款</Text>
        <Text style={styles.txt}>{'\t'}本协议暂不支持提前还款。</Text>

        <Text style={styles.subTitle}>第六条 法律及争议解决</Text>
        <Text style={styles.txt}>{'\t'}本协议的签订、履行、终止、解释均适用中华人民共和国法律，并由丙方所在地的人民法院管辖。</Text>

        <Text style={styles.subTitle}>第七条 委托代扣款授权</Text>
        <Text style={styles.txt}>{'\t'}1. 乙方保证以上“授权账户信息”中的身份及所提供的信息真实、有效、准确及合法，因乙方身份或所提供信息错误而引起的法律后果及损失，由乙方自行承担。</Text>
        <Text style={styles.txt}>{'\t'}2.
          乙方同意丙方通过与丙方合作的支付公司，包括但不限于广州易联商业服务有限公司、连连银通电子支付有限公司及中国银联股份有限公司的代扣支付平台，从乙方的银行账户中将款项划拨到甲方账户。</Text>
        <Text style={styles.txt}>{'\t'}3.
          乙方应当按照预付款的金额在上述银行卡内存入足够的款项，丙方工作人员根据乙方预付款金额办理相关扣款转账手续；由于挂失、账户冻结、金额不足等原因造成扣款失败而导致乙方损失的，由乙方自行承担。</Text>
        <Text style={styles.txt}>{'\t'}4. 乙方变更付款授权账户时，须及时通知甲方，并按更换后的账户信息重新签署授权书。因乙方未及时办理变更手续而导致的结果，由乙方承担。</Text>
        <Text style={styles.txt}>{'\t'}5. 本项授权自签订日起开始生效，有效期至本协议项下借款本息、费用清偿之日止，但授权有效期不得超过3年，需重新进行授权，方能继续生效。</Text>

        <Text style={styles.subTitle}>第八条 附则</Text>
        <Text style={styles.txt}>{'\t'}1.本协议采用电子文本形式制成，并永久保存在丙方为此设立的专用服务器上备查，各方均认可该形式的协议效力。</Text>
        <Text style={styles.txt}>{'\t'}2.本协议自文本最终生成之日生效。</Text>
        <Text style={styles.txt}>{'\t'}3.如果本协议中的任何一条或多条违反适用的法律法规，则该条将被视为无效，但该无效条款并不影响本协议其他条款的效力。</Text>

        <Text style={styles.txt}>{'\t'}&nbsp;</Text>
        <Text style={styles.txt}>{'\t'}&nbsp;</Text>
        <Text style={styles.txt}>{'\t'}签约时间：<Text style={styles.subTxt}>{loanTime ? dateFormat(loanTime, 'yyyy年mm月dd日') : ''}</Text></Text>
        <Text style={styles.txt}>{'\t'}甲方（出借人）：<Text style={styles.subTxt}>**文</Text></Text>
        <Text style={styles.txt}>{'\t'}乙方（借款人）：<Text style={styles.subTxt}>{custName}</Text></Text>
        {
          showStamp ?
            <Image style={styles.img} source={require('image!lld_stamp')} />
            :
            null
        }
      </ScrollView>
    );
  }
}
const mapStateToProps = (state) => ({
  userState: state.userState,
  loanState: state.loanState,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(LoanActions, dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(Contract);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 15,
  },
  mainTitle: {
    fontSize: 24,
    marginTop: 10,
    marginBottom: 20,
    lineHeight: 28,
    fontWeight: 'bold',
  },
  subTitle: {
    fontSize: 18,
    lineHeight: 20,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  txt: {
    lineHeight: 20,
    marginBottom: 10,
  },
  img: {
    width: 220,
    height: 145,
    resizeMode: 'cover',
    marginLeft: 28,
  },
});
