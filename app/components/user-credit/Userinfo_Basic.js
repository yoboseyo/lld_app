/**
 * Created by Administrator on 2016/9/6.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
} from 'react-native';
import ApplyContacts from './ApplyContacts';
import UrgencyContacts from './UrgencyContacts';
// import Loan from '../common/loanApplyNav';
// import Header from '../common/header.js';

class UserinfoBasic extends Component {
  constructor(props) {
    super(props);
    // 初始状态
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.handleSubmit(this.custName,
      this.cardId, this.province, this.region, this.address, this.orgname,
      this.orgaddress, this.props.mobile, this.contact1, this.relaton1,
      this.contact1Phone, this.contact2, this.relaton2, this.contact2Phone);
  }
  render() {
    return (
      <View style={{ backgroundColor: '#f2f2f2', paddingTop: 20, justifyContent: 'center' }}>
        <View >
          <View style={{ padding: 20 }}>
            <Text style={{ paddingBottom: 10, color: '#9d9d9d' }}>欢迎使用信息认证服务,整个流程大约需要3分钟。</Text>
            <Text style={{ color: '#9d9d9d' }}>进行信息认证可以帮您获得更多的额度或更好的服务。请如实填写下面的表格：</Text>
          </View>
          <ApplyContacts
            onChangeCustName={(text) => {
              this.custName = text;
            }
            }
            onChangeCardId={(text) => {
              this.cardId = text;
            }
            }
            onChangeAddress={(text) => {
              this.address = text;
            }
            }
            onChangeOrgname={(text) => {
              this.orgname = text;
            }
            }
            onChangeOrgaddress={(text) => {
              this.orgaddress = text;
            }
            }
            onChangeMobile={(text) => {
              this.mobile = text;
            }
            }
            onChangeRegion={(text) => {
              this.region = text;
            }
            }
            onChangeProvince={(text) => {
              this.province = text;
            }
            }
            mobile={this.props.mobile}
          />
          <UrgencyContacts
            onChangeContact1={(text) => {
              this.contact1 = text;
            }
            }
            onChangeContact1Phone={(text) => {
              this.contact1Phone = text;
            }
            }
            onChangeContact2={(text) => {
              this.contact2 = text;
            }
            }
            onChangeContact2Phone={(text) => {
              this.contact2Phone = text;
            }
            }
            onChangeRelaton1={(text) => {
              this.relaton1 = text;
            }
            }
            onChangeRelaton2={(text) => {
              this.relaton2 = text;
            }
            }
            onPress={this.onPress}
          />
        </View>
      </View>
    );
  }
}

UserinfoBasic.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  mobile: React.PropTypes.string,
}

export default UserinfoBasic;

