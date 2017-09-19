/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component } from 'react';
import {
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import Dimensions from 'Dimensions';
import LldTextInput from '../common/LldTextInput';
import styles from '../../styles/styles';

class UserinfoMobile extends Component {
  constructor(props) {
    super(props);
    // 初始状态
    this.onPress = this.onPress.bind(this);
  }

  onPress() {
    this.props.handleSubmit(this.password);
  }

  render() {
    return (
      <View style={{ height: Dimensions.get('window').height, backgroundColor: '#f2f2f2' }}>
        <View style={{ padding: 20, flexDirection: 'row' }}>
          <Text style={{ flex: 3, color: '#739bcc' }}>手机认证：</Text>
          <Text style={styles.flex_10}>收集您号码的基本信息、账单信息、通话记录、上网记录、短信详单等用于认证服务。
                        运营商会发短信告知您，我们从网上营业厅查询过您的详单，这是我们认证您信息的正常过程。
          </Text>
        </View>
        <View style={styles.alignSelf_Center3}><Text style={{ alignSelf: 'center' }}>请输入服务密码</Text></View>
        <View style={{ padding: 20 }}>
          <View style={{ flexDirection: 'row', backgroundColor: '#1d7cf0', padding: 5 }}>
            <View style={{ flex: 1 }}><Text style={{ color: '#fff' }}>{this.props.mobile}</Text></View>
            <View style={{ flex: 1 }}><Text style={{ alignSelf: 'flex-end', color: '#fff' }}>{this.props.venderName}</Text></View>
          </View>
          <View>
            <LldTextInput
              placeholder="请输入您的手机服务密码"
              isPassword
              isStyles={styles.TextInputStyle2}
              onChangeText={(text) => {
                this.password = text;
              }
              }
            />
          </View>
        </View>
        <View >
          <TouchableHighlight
            style={styles.button}
            onPress={this.onPress}
          >
            <Text style={styles.buttonText}>下一步</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
UserinfoMobile.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  mobile: React.PropTypes.string,
  venderName: React.PropTypes.string,
};
export default UserinfoMobile;
