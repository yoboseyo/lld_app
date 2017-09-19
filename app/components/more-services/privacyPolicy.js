import React, { Component } from 'react';
import {
  ScrollView,
  Text,
  StyleSheet,
  View,
  Image,
} from 'react-native';

export default class PrivacyPolicy extends Component {
  render() {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.center}><Text style={styles.mTitle}>蓝领贷借款服务与隐私协议</Text></View>
        <Text style={styles.para}>“蓝领贷”微信公众号（以下简称“本产品”）由 上海截塔金融信息服务有限公司负责运营。为明确本产品用户（以下简称“甲方”）与 上海截塔金融信息服务有限公司
          （以下简称“乙方”）之间的权利义务关系，维护双方的合法权益，本着平等互利的原则，双方就本产品服务之相关事宜达成以下协议，以资共同遵守。本产品协议适用于甲方注册使用乙方产品、服务的全部活动，为避免误解，甲方通过关注乙方的微信公众号并注册使用乙方服务即视为本产品用户，受本产品协议约束。</Text>
        <Text style={styles.para}>
          在注册成为本产品用户前，请甲方务必认真、仔细阅读并充分理解本产品协议全部内容。甲方在注册本产品取得用户身份时勾选同意本产品协议并成功注册为本产品用户，视为甲方已经充分理解和同意本产品协议全部内容，并签署了本产品协议，本产品协议立即在甲方与乙方之间产生法律效力，甲方注册使用本产品服务的全部活动将受到本产品协议的约束并承担相应的责任和义务。如甲方不同意本产品协议内容，请不要注册使用本产品服务。</Text>
        <Text style={styles.para}>
          在甲方同意接受本协议并注册成为本产品用户时，甲方已经年满18周岁。如甲方不具备前述条件，甲方应终止注册或停止使用本产品。甲方若通过本人注册的账户为其他不满18周岁的任何第三方借款，产生的任何法律责任均与乙方无关，乙方对此不承担任何法律责任。</Text>
        <Text style={styles.styTxt}>本产品协议包括以下所有条款，同时也包括本产品已经发布的或者将来可能发布的各类规则。所有规则均为本产品协议不可分割的一部分，与本产品协议具有同等法律效力。</Text>
        <Text style={styles.para}>
          甲方在此确认知悉并同意乙方有权根据需要不时修改、增加或删减本产品协议。乙方将采用在本产品公示的方式通知甲方该等修改、增加或删减，甲方有义务注意该等公示。一经本产品公示，视为已经通知到甲方。甲方同意并确认，乙方可能以页面消息、微信、短息消息等方式向甲方发送将来可能发布的各类规则，该等规则构成本产品协议的一部分。若甲方在本产品协议及各类规则变更后继续使用本产品服务的，视为甲方已仔细认真阅读、充分理解并同意接受修改后的本产品协议及各类规则，且甲方承诺遵守修改后的本产品协议及各类规则内容，并承担相应的责任和义务。若甲方不同意修改后的本产品协议及各类规则内容，应立即停止使用本产品服务，乙方保留中止、终止或限制甲方继续使用本产品服务的权利，但该等终止、中止或限制行为并不豁免甲方在本产品已经进行的交易下所应承担的责任和义务。乙方不承担任何因此导致的法律责任。</Text>
        <Text style={styles.title}>一、账户管理</Text>
        <Text style={styles.para}>
          甲方注册本产品时请按照乙方要求准确提供个人信息，并在取得该账户后及时更新甲方正确、最新及完整的身份信息及相关资料，包括手机号码、身份证号码、亲属联系人及社会联系人姓名、职业、银行账户等信息，以便乙方与甲方进行及时、有效联系。</Text>
        <Text style={styles.para}>
          甲方应当使用自身合法的身份信息进行注册，若甲方冒用、盗用、拾得他人身份证件办理乙方提供的产品/服务的，甲方对此承担所有法律责任；乙方仅对甲方的身份信息承担形式审查责任，且仅在其业务职责范围内承担法律责任。</Text>
        <Text style={styles.para}>
          此账户仅供甲方本人使用，甲方对使用该账户或密码进行的一切操作及言论负完全的责任。甲方对账户密码、身份信息等进行妥善保管，对于因密码、身份信息、校验码等泄露所致的损失由甲方自行承担。如甲方遗失手机或身份证件或银行卡以及其他可能危及本产品账户资金安全或发现有他人冒用或盗用甲方的账户登录名及密码或任何其他未经合法授权的情形，应立即以有效方式通知乙方，向乙方申请暂停相关服务。除非另有法律规定或经司法裁判，且征得乙方同意，否则甲方不得以任何方式转让、赠与或继承（相关的财产权益除外）其登录名及密码等个人信息。</Text>
        <Text style={styles.para}>
          甲方不得通过本人注册的账户为任何第三方借款，甲方充分知悉并承诺，不得以本人的账户出租、出借给他人，且甲方充分知悉：若以本人账户出租、出借给他人使用，甲方仍应承担《借款协议》项下的还款义务。</Text>
        <Text style={styles.para}>若甲方有上述违反本协议约定情形的，产生的任何法律责任均由甲方承担，乙方对此不承担任何法律责任。</Text>
        <Text style={styles.para}>
          在需要终止使用本产品时，甲方可以申请注销本产品账户，甲方应当依照乙方规定的程序进行甲方的本人账户注销。本产品账户注销将导致乙方终止为甲方提供本产品，本协议约定的双方的权利义务终止，但依本协议其他条款另行约定不得终止的或依其性质不能终止的除外。</Text>
        <Text style={styles.para}>
          下列情形发生时，乙方有权拒绝甲方注销账户的申请：1、甲方申请注销的账户存在任何由于该账户被注销而导致的未了结的合同关系；2、存在其他基于该账户的存在而产生或维持的权利义务；3、乙方认为注销该账户会由此产生未了结的权利义务而产生纠纷。</Text>
        <Text style={styles.title}>二、服务内容</Text>
        <Text style={styles.para}>
          1、信用评估：信用评估即授予信用额度，信用评估服务是指乙方为甲方提供的通过读取和分析甲方的个人公开信息、甲方对乙方授权使用的个人隐私信息及其他授权信息来授予甲方信用额度的服务。为乙方顺利分析与甲方信用信息相关的甲方个人隐私信息，甲方在此不可撤销地授权乙方读取、分析及使用甲方的以下信息：1、甲方的身份信息；2、甲方的手机账单、清单、实名制等信息；3、甲方的银行卡信息；4、其他有助于乙方授予甲方信用额度的信息。</Text>
        <Text style={styles.para}>2、信息发布：甲方注册成为本产品借款用户后，可以委托乙方将其借款需求信息通过乙方推荐给第三方出借方。</Text>
        <Text style={styles.para}>
          3、代扣：借款到期后，甲方委托乙方及乙方授权/聘请的具备相关业务资质的第三方从甲方银行账户上代为扣去应还款款项，用于向第三方出借方支付还款。</Text>
        <Text style={styles.title}>三、信息授权</Text>
        <Text style={styles.para}>为帮助甲方获得信用额度，乙方在经甲方授权后，会从中国移动、中国电信、中国联通等第三方网站获取甲方的相关个人信息，用于信用额度审批和贷后管理。</Text>
        <Text style={styles.para}>1、甲方授权乙方根据甲方所提供的各项信息及乙方独立获得的信息，来评定甲方在本产品中所拥有的个人信用额度，或决定是否审核通过甲方的服务申请。</Text>
        <Text style={styles.styTxt}>2、在本产品使用中，为了乙方能够充分评估甲方的个人信用额度，甲方同意在申请借款的过程中输入个人手机运营商的服务密码、验证码等信息，且授权乙方使用上述服务密码、验证码等信息获取甲方的手机消费账单、清单、实名制等。甲方知悉并同意乙方可能将使用甲方授权的手机号码、服务密码、验证码等信息获取甲方的相关信息，甲方同意乙方使用甲方的上述信息。</Text>
        <Text style={styles.para}>
          3、在本产品使用中，如甲方输入学历信息、学信网账户名及密码等，即表示同意向乙方授权使用甲方的学信网账户，乙方将可能通过甲方所授权的学信网账户查看并读取甲方的学籍信息；如甲方在授权时尚未注册学信网账户，乙方将基于甲方的授权代甲方申请注册学信网账户。</Text>
        <Text style={styles.para}>
          4、在本产品使用中，如甲方输入淘宝/京东账户名及密码等，即表示同意向乙方授权使用甲方的淘宝/京东账户，乙方将可能通过甲方所授权的淘宝/京东账户查看并读取甲方的淘宝/京东交易信息。</Text>
        <Text style={styles.para}>5、在本产品使用中，如甲方同意向乙方提交、绑定或授权甲方的银行卡信息／账户，乙方将可能：</Text>
        <Text style={styles.para}> 1）查询并核对甲方的账户信息。</Text>
        <Text style={styles.para}> 2）查询并读取甲方银行卡账户中的交易信息。</Text>
        <Text style={styles.para}> 3）通过甲方所授权或绑定的银行卡账户进行代收与代付服务。</Text>
        <Text style={styles.para}>
          6、乙方有权依据《征信业管理条例》及相关法律法规，向第三方支付/征信/金融机构合法了解、获取、核实甲方的信用信息，所获取的个人信用信息仅在本产品中使用，且不向其他机构、个人提供或披露。</Text>
        <Text style={styles.para}>
          7、甲方如通过本产品进行借款，应当依据《借款协议》中约定之还款日期进行还款，乙方有权通过电话、短信、微信、手机应用通知、发律师函、上门等途径对甲方进行服务与还款提醒。甲方理解并同意，如甲方未有按期履行还款义务，甲方的个人逾期信息将可能向第三方进行分享或公布。</Text>
        <Text style={styles.title}>四、使用规则</Text>
        <Text style={styles.para}>为有效保障甲方使用本产品时的合法权益，甲方理解并同意接受以下规则：</Text>
        <Text style={styles.para}>1、乙方通过甲方的产品服务账户接受来自甲方的指令，无论甲方通过何种方式向乙方发出指令，都不可撤回或撤销，且视为甲方本人的指令。</Text>
        <Text style={styles.para}>
          2、甲方应按照乙方的要求完善甲方的身份信息以最终达到实名，否则甲方可能会受到信用评估、提现、支付和（或）还款的限制，且乙方有权对甲方的账户进行冻结，直至甲方达到实名。请甲方保证甲方信息的真实性，若被检测出虚假信息，平台将会采取拒绝决议，若涉嫌恶意信息作假或盗用他人信息，将可能记入网络征信系统，影响甲方的征信记录，同时乙方将保留追究甲方相应法律责任的权利。</Text>
        <Text style={styles.para}>3、乙方并非银行或其他金融机构，本产品也非金融业务，本协议项下的资金移转均通过银行或第三方支付公司来实现，甲方理解并同意其资金于流转途中的合理时间。</Text>
        <Text style={styles.para}>4、交易风险 因甲方的过错导致的任何损失均由甲方自行承担，该过错包括但不限于：不按照交易提示操作，未及时进行交易操作，遗忘或泄漏密码、校验码等，密码被他人破解等。</Text>
        <Text style={styles.para}>5、服务费用 在甲方使用本产品时，乙方有权依照双方签订的电子交易合同向甲方收取服务费用。乙方拥有制订及调整服务费之权利，具体服务费用以甲方使用本产品时产品页面上所列之收费方式公告或甲方与乙方达成的其他电子或书面协议为准。</Text>
        <Text style={styles.title}>五、使用限制</Text>
        <Text style={styles.para}>
          1、甲方在使用本产品时应遵守中华人民共和国相关法律法规、甲方所在国家或地区之法令及相关国际惯例，不将本产品用于任何非法目的，也不以任何非法方式使用本产品，否则乙方有权拒绝提供本产品，或提前终止协议并追回借款，且甲方应承担所有相关法律责任。</Text>
        <Text style={styles.para}>
          2、甲方不得利用本产品从事侵害他人合法权益之行为，否则乙方有权拒绝提供本产品，且甲方应承担所有相关法律责任，因此导致乙方或乙方雇员或其他方受损的，甲方应承担赔偿责任。上述行为包括但不限于:</Text>
        <Text style={styles.para}>1）侵害他人名誉权、隐私权、商业秘密、商标权、著作权、专利权等合法权益。</Text>
        <Text style={styles.para}>2）违反依法定或约定之保密义务。</Text>
        <Text style={styles.para}>3）冒用他人名义使用本产品。</Text>
        <Text style={styles.para}>4）从事不法交易行为。</Text>
        <Text style={styles.para}>5）未按时履行还款义务。</Text>
        <Text style={styles.para}>6）提供骗贷资讯或以任何方式引诱他人参与骗贷。</Text>
        <Text style={styles.para}>7）非法使用他人银行账户或无效银行账户交易。</Text>
        <Text style={styles.para}>8）从事任何可能含有电脑病毒或是可能侵害本产品系统、资料之行为。</Text>
        <Text style={styles.para}>9）其他乙方有正当理由认为不适当之行为。</Text>
        <Text style={styles.styTxt}>3、甲方理解并同意，乙方不对因下述任一情况导致的任何损害赔偿承担责任:</Text>
        <Text style={styles.para}>
          1）乙方有权基于单方判断，包含但不限于乙方认为甲方已经违反本协议的明文规定及精神，对甲方的名下的全部或部分产品账户暂停、中断或终止向甲方提供本产品或其任何部分，并移除或公布甲方的资料。</Text>
        <Text style={styles.para}>2）乙方在发现异常交易或合理怀疑交易有疑义或有违反法律规定或本协议约定之虞时，
          有权不经通知先行暂停或终止甲方产品账户的使用（包括但不限于对账户名下的信用额度和在途交易采取取消交易等限制措施），并拒绝甲方使用本产品之部分或全部功能。</Text>
        <Text style={styles.para}>3）甲方理解并同意，存在如下情形时，乙方有权对甲方名下产品账户或交易进行冻结或追回，且有权限制甲方所使用的产品或服务的部分或全部功能：</Text>
        <Text style={styles.para}>a．根据本协议的约定。</Text>
        <Text style={styles.para}>b．根据法律法规及法律文书的规定。</Text>
        <Text style={styles.para}>c．根据有权机关的要求。</Text>
        <Text style={styles.para}>d．甲方使用本产品服务的行为涉嫌违反国家法律法规及行政规定的。</Text>
        <Text style={styles.para}>e．乙方基于单方面合理判断认为账户信息、操作等存在异常时。</Text>
        <Text style={styles.para}>f．乙方依据自行合理判断认为可能产生风险的。</Text>
        <Text style={styles.para}>g．甲方在参加市场活动时有批量注册账户、提供虚假信息或材料及其他舞弊等违反活动规则、违反诚实信用原则的。</Text>
        <Text style={styles.para}>h．错误汇入资金等导致甲方可能存在不当得利的。</Text>
        <Text style={styles.para}>i．甲方未按时履行还款义务的。</Text>
        <Text style={styles.para}>j．甲方遭到他人投诉，且对方已经提供了一定证据的。</Text>
        <Text style={styles.para}>
          4、如甲方申请解除上述冻结或限制，甲方应按乙方要求如实提供相关资料及甲方的身份证明以及乙方要求的其他信息或文件，以便乙方进行核实，且乙方有权依照自行判断来决定是否同意甲方的申请。</Text>
        <Text style={styles.title}>六、隐私权保护</Text>
        <Text style={styles.styTxt}>
          乙方重视对用户隐私的保护。因收集甲方的信息是出于遵守国家法律法规的规定以及向甲方提供服务及提升服务质量的目的，乙方对甲方的信息承担保密义务，不会为满足第三方的营销目的而向其出售或出租甲方的任何信息，乙方会在下列情况下才将甲方的信息与第三方共享，甲方同意并授权乙方在下列情况下的共享行为：</Text>
        <Text style={styles.para}>1、获得甲方的同意或授权。</Text>
        <Text style={styles.para}>2、某些情况下，只有共享甲方的信息，才能提供甲方需要的服务和（或）产品，或处理甲方与他人的交易纠纷或争议。</Text>
        <Text style={styles.para}>3、某些服务和（或）产品由乙方的合作伙伴提供或由乙方与合作伙伴共同提供，乙方会与其共享提供服务和（或）产品需要的信息。</Text>
        <Text style={styles.para}>4、乙方与第三方进行联合推广活动，乙方可能与其共享活动过程中产生的、为完成活动所必要的个人信息，如参加活动的中奖名单、中奖人联系方式等，以便第三方能及时向甲方发放奖品。</Text>
        <Text style={styles.para}>5、根据法律法规的规定及有权机关的要求。</Text>
        <Text style={styles.para}>6、为维护乙方和甲方其他用户的合法权益。</Text>
        <Text style={styles.para}>
          7、根据法律规定及合理商业习惯，在乙方计划与其他公司合并或被其收购或进行其他资本市场活动（包括但不限于IPO，债券发行）时，以及其他情形下乙方需要接受来自其他主体的尽职调查时，乙方会把甲方的信息提供给必要的主体，但乙方会通过和这些主体签署保密协议等方式要求其对甲方的个人信息采取合理的保密措施。</Text>
        <Text style={styles.title}>七、征信授权</Text>
        <Text style={styles.styTxt}>
          1、甲方知晓并同意乙方依据《征信业管理条例》及相关法律法规，委托第三方征信机构，合法调查甲方信息，包括但不限于个人基本信息（姓名、身份证号码等）、个人信用信息、不良信息、借贷交易信息、银行卡交易信息、电商交易信息、公用事业信息、央行征信报告。所获取的信息，仅在此笔借贷业务的贷前审批和贷后管理工作中使用。乙方将对所获取的信息妥善进行保管，除为甲方提供信审服务/借款资金的合作方外，未经甲方授权，不得向其他机构或个人公开、编辑或透露信息内容。</Text>
        <Text style={styles.para}>
          特别的，（1）个人信用信息，是指对评价信息主体信用价值有关的各项信息，但是法律、法规或监管政策明确禁止采集的数据除外；（2）不良信息，是指对信息主体信用状况构成负面影响的下列信息：信息主体在借贷、赊购、担保、租赁、保险、使用信用卡等活动中未按照合同履行义务的信息，对信息主体的违约信息，行政处罚信息，人民法院判决或者裁定信息主体履行义务、强制执行的信息，及国务院征信业监督管理部门规定的其他不良信息。</Text>
        <Text style={styles.styTxt}>
          2、甲方知晓并不可撤销地授权并同意乙方依据《征信业管理条例》及相关法律法规，采集、保存并向第三方征信机构提交甲方在此笔借贷业务中产生的相关信息，包括但不限于个人基本信息、个人信用信息、不良信息、借款申请信息、借款合同信息以及还款行为信息，并记录在征信机构的个人信用信息数据库中。</Text>
        <Text style={styles.para}>向征信机构提供不良信息前，乙方将以电子邮件、短信、纸质信件等任一方式通知甲方，乙方应及时更新联系信息，确保及时收到通知，但是，依照法律、行政法规规定公开的不良信息除外。</Text>
        <Text style={styles.styTxt}>
          3、甲方同意若甲方出现不良还款行为，乙方按合同所留联系方式对甲方进行提醒并告知，甲方若仍未履行还款义务，乙方可将甲方的不良还款信息提交至第三方征信机构，记录在征信机构的个人信用信息库中。</Text>
        <Text style={styles.para}>4、甲方知晓并同意，甲方已被明确告知不良还款信息一旦记录在第三方征信机构的个人信用信息数据库中，在日后的经济活动中对甲方可能产生的不良影响。</Text>
        <Text style={styles.para}>5、甲方知晓第三方征信机构包括但不限于：北京安融惠众征信有限公司、上海资信有限公司、鹏元资信评估有限公司、北京宜信致诚信用管理有限公司和深圳前海征信中心股份有限公司。</Text>
        <Text style={styles.para}>
          6、甲方保证其所提供的个人信息均为甲方本人的真实信息，不可为他人的信息或虚假信息，若涉嫌恶意信息作假或盗用他人信息，将可能记入网络征信系统，影响甲方的征信记录，同时乙方将保留追究甲方相应法律责任的权利。</Text>
        <Text style={styles.para}>
          7、如甲方所提供的个人信息中的全部或部分信息为他人信息或虚假信息，乙方将有权暂停或终止与甲方的全部或部分服务协议，由此行为所产生的全部法律责任将由甲方承担，乙方将不对此承担法律责任。</Text>
        <Text style={styles.para}>8、使用授权</Text>
        <Text style={styles.para}>除本条各款提及的授权外，乙方特别授权如下：</Text>
        <Text style={styles.para}>
          （1）乙方同意并不可撤销的授权甲方及相关第三方征信机构在保证乙方信息安全的前提下，保存、整理、加工本条中所述的、通过采集所获取的乙方个人信息，并向经乙方授权同意的中国境内的其他信息使用者。但是，法律规定可以不经同意查询的除外。</Text>
        <Text style={styles.para}>
          （2）乙方同意并不可撤销地授权甲方向第三方征信机构查询乙方被第三方征信机构合法采集、整理或加工产生的其他信息提供方提供的信用信息。并授权甲方将这些信息运用于为乙方提供的下述业务中，包括：</Text>
        <Text style={styles.para}>a．对乙方或配偶提出的借款业务的事前、事中、事后情况进行审查。</Text>
        <Text style={styles.para}>b．对乙方作为商户法定代表人、出资人或主要经营负责人进行审查。</Text>
        <Text style={styles.para}>c．对乙方提出的异议申请进行核查。</Text>
        <Text style={styles.para}>d．向乙方推荐产品及服务。</Text>
        <Text style={styles.para}>e．其他经过乙方同意的合法用途。</Text>
        <Text style={styles.title}>八、平台中断或故障</Text>
        <Text style={styles.para}>乙方平台因维修、故障、黑客攻击、电信部门技术调整或故障、网站升级、银行方面、意外、不可抗力等状况无法正常运作，使甲方无法使用各项服务时，乙方不承担损害赔偿责任。</Text>
        <Text style={styles.title}>九、 责任范围及责任限制</Text>
        <Text style={styles.para}>1、乙方仅对本协议中列明的责任承担范围负责。</Text>
        <Text style={styles.para}>2、乙方用户信息是由用户本人自行提供的，乙方无法保证该信息之准确、及时和完整。</Text>
        <Text style={styles.para}>3、乙方不对信用评估额度及本产品提供任何形式的保证。</Text>
        <Text style={styles.title}>十、商标、知识产权、专利的保护</Text>
        <Text style={styles.para}>
          1、乙方及关联公司所有平台及乙方上所有内容，包括但不限于著作、图片、档案、资讯、资料、网站架构、网站画面的安排、网页设计，均由乙方或乙方关联公司依法拥有其知识产权，包括但不限于商标权、专利权、著作权、商业秘密等。</Text>
        <Text style={styles.para}>2、非经乙方或乙方关联企业书面同意，任何人不得擅自使用、修改、复制、公开传播、改变、散布、发行或公开发表本网站程序或内容。</Text>
        <Text style={styles.para}>3、尊重知识产权是甲方应尽的义务，如有违反，甲方应承担损害赔偿责任。</Text>
        <Text style={styles.title}>十一、法律适用与管辖</Text>
        <Text style={styles.para}>本协议之效力、解释、变更、执行与争议解决均适用中华人民共和国法律，
          没有相关法律规定的，参照通用国际商业惯例和（或）行业惯例。因本协议产生之争议，均应依照中华人民共和国法律予以处理，并由乙方所在地的人民法院管辖。</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 23,
    paddingRight: 23,
    backgroundColor: '#fff',
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  mTitle: {
    fontWeight: 'bold',
    lineHeight: 40,
    fontSize: 18,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    lineHeight: 40,
    marginBottom: 10,
  },
  styTxt: {
    fontWeight: 'bold',
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 10,
  },
  para: {
    lineHeight: 20,
    marginBottom: 10,
  },
});
