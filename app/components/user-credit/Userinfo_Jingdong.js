/**
 * Created by Administrator on 2016/9/7.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
} from 'react-native';
import Dimensions from 'Dimensions';
import LldTextInput from '../common/LldTextInput';
import styles from '../../styles/styles';

class UserinfoJingdong extends Component {
  constructor(props) {
    super(props);
    // 初始状态
    this.onPress = this.onPress.bind(this);
    this.onPRessSkip = this.onPRessSkip.bind(this);
  }
  onPress() {
    this.props.handleSubmit(this.account, this.password);
  }
  onPRessSkip() {
    this.props.skip();
  }
  render() {
    return (
      <View style={{ height: Dimensions.get('window').height, backgroundColor: '#f2f2f2' }}>
        <View style={{ padding: 20, flexDirection: 'row' }}>
          <Text style={{ flex: 3, color: '#739bcc' }}>电商认证：</Text>
          <Text style={styles.flex_10}>收集您电商网站的基本信息、送货地址、订单信息等用于认证服务。</Text>
        </View>
        <View style={styles.alignSelf_Center3}><Text style={{ alignSelf: 'center' }}>用户名 & 密码</Text></View>
        <View style={{ padding: 20 }}>
          <View>
            <Text style={{ alignSelf: 'center' }}>请输入您在京东的用户名和密码</Text>
          </View>
          <View>
            <LldTextInput
              placeholder="请输入您的京东用户名或者邮箱"
              isStyles={styles.TextInputStyle2}
              onChangeText={(text) => {
                this.account = text;
              }
              }
            />
          </View>
          <View>
            <LldTextInput
              placeholder="请输入您的京东登录密码"
              isPassword
              isStyles={styles.TextInputStyle2}
              onChangeText={(text) => {
                this.password = text;
              }
              }
            />
          </View>
        </View>
        <View>
          <TouchableHighlight
            style={styles.button}
            onPress={this.onPress}
          >
            <Text style={styles.buttonText}>下一步</Text>
          </TouchableHighlight>
        </View>
        <View>
          <Text
            style={{ alignSelf: 'flex-end', paddingRight: 20, color: '#337ab7' }}
            onPress={this.onPRessSkip}
          >
            跳过京东信息认证
          </Text>
        </View>
      </View>
    );
  }
}
UserinfoJingdong.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  skip: React.PropTypes.func.isRequired,
}
export default UserinfoJingdong;