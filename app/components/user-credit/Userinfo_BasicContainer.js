/**
 * Created by Administrator on 2016/9/9.
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-redux-router';
import { ScrollView } from 'react-native';
import UserinfoBasic from './Userinfo_Basic';
import MessageModal from '../common/MessageModalContainer';
import Loading from '../common/LldActivityIndicator';
import * as ContainerActions from '../../actions/container-actions';
import * as UserinfoAction from '../../actions/userinfo-action';

class UserinfoBasicContainer extends React.Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserinfoAction,
    }, this.props.dispatch);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    // this.actions.updateNav('/userinfoBasic');
  }

  handleSubmit(custName, cardId, province, region, address, orgname, orgaddress,
               mobile, contact1, relaton1, contact1Phone, contact2, relaton2, contact2Phone) {
    console.info(this.props.userInfo);
    console.info(mobile);
    let errMsg = '';
    console.info(/[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)/
      .test(cardId));
    // console.info(document.getElementById('selProvince').text);
    console.info(province);
    console.info(region);
    if (!custName) {
      errMsg = '请填写姓名';
    } else if (!cardId) {
      errMsg = '请输入身份证';
    } else if (!/^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/
        .test(cardId)) {
      errMsg = '身份证格式错误';
    } else if (province === -1) {
      errMsg = '请选择所在地区';
    } else if (region === -1) {
      errMsg = '请选择所在省份';
    } else if (!address) {
      errMsg = '请输入家庭住所';
    } else if (!orgname) {
      errMsg = '请输入公司名称';
    } else if (!orgaddress) {
      errMsg = '请输入公司地址';
    } else if (!mobile) {
      errMsg = '请输入手机号';
    } else if (!contact1) {
      errMsg = '请输入联系人1姓名';
    } else if (relaton1 === '请选择') {
      errMsg = '请选择联系人1关系';
    } else if (!contact1Phone) {
      errMsg = '请输入联系人1电话';
    } else if (!contact2) {
      errMsg = '请输入联系人2姓名';
    } else if (relaton2 === '请选择') {
      errMsg = '请选择联系人2关系';
    } else if (!contact2Phone) {
      errMsg = '请输入联系人2电话';
    }
    if (errMsg) {
      this.actions.showErrModal(<MessageModal message={errMsg} />);
    }
    else {
      let applyInfo = {};
      let selected_website = [];
      let website1 = {'name': 'jingdong', 'category': 'e_business'};
      selected_website[0] = website1;
      applyInfo.selected_website = selected_website;
      let basic_info = {};
      basic_info['name'] = custName;
      basic_info['id_card_num'] = cardId;
      basic_info['cell_phone_num'] = mobile;
      basic_info['home_addr'] = address + orgname + orgaddress;//我的家庭地址

      applyInfo.basic_info = basic_info;

      let contacts = [];
      let contacts1 = {};
      contacts1[ 'contact_type'] = relaton1;
      contacts1['contact_name'] = contact1;
      contacts1['contact_tel'] = contact1Phone;
      contacts[0] = contacts1;

      let contacts2 = {};
      contacts2['contact_type'] = relaton2;
      contacts2['contact_name'] = contact2;
      contacts2['contact_tel'] = contact2Phone;
      contacts[1] = contacts2;
      applyInfo.contacts = contacts;
      let userinfo = {};
      userinfo.custName = custName;
      userinfo.cardId = cardId;
      userinfo.province = province;
      userinfo.region = region;
      userinfo.address = address;
      userinfo.orgName = orgname;
      userinfo.orgAddress = orgaddress;
      userinfo.mobile = mobile;
      userinfo.contact1 = contact1;
      userinfo.relaton1 = relaton1;
      userinfo.contact1Phone = contact1Phone;
      userinfo.contact2 = contact2;
      userinfo.relaton2 = relaton2;
      userinfo.contact2Phone = contact2Phone;
      this.actions.showModal(<Loading />)
      console.info(applyInfo);
      console.info(userinfo);
      this.actions.createUserProfile(applyInfo, userinfo);
    }
  }

  render() {
    return (
      <ScrollView>
        <UserinfoBasic
          handleSubmit={this.handleSubmit}
          alwaysBounceHorizontal
          mobile={this.props.userInfo.userInfo.mobile}
        />
      </ScrollView>
    );
  }
}
const mapStateToProps = function (store) {
  return {
    userInfo: store.userState,
  };
};

export default connect(mapStateToProps)(UserinfoBasicContainer);

UserinfoBasicContainer.propTypes = {
  dispatch: React.PropTypes.func,
};
// export default UserinfoBasicContainer;
