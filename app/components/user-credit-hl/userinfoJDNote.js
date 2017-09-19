/**
 * Created by Administrator on 2016/9/14.
 */
import React, {Component} from 'react';
import {
  Text,
  TouchableHighlight,
  View,
  TouchableOpacity,
} from 'react-native';
import Dimensions from 'Dimensions';
import LldTextInput from '../common/LldTextInput';
import styles from '../../styles/styles';

class UserinfoJDNote extends Component {
  constructor(props) {
    super(props);
    // 初始状态
    this.onPress = this.onPress.bind(this);
    this.retryNote = this.retryNote.bind(this);
  }
  onPress() {
    this.props.handleSubmit(this.password);
  }
  retryNote() {
    this.props.retryNote();
  }
  render() {
    return (
      <View style={{ height: Dimensions.get('window').height, backgroundColor: '#f2f2f2', padding: 5 }}>
        <View style={{ flexDirection: 'row', paddingTop: 40, paddingLeft: 10 }}>
          <Text style={{ flex: 1, color: '#739BCC' }}>请输入短信验证码：</Text>
          <Text style={{ flex: 1 }}>(验证码1分钟内发送到手机)</Text>
        </View>
        <View>
          <View>
            <LldTextInput
              placeholder="请输入你收到的短信验证码"
              isStyles={styles.TextInputStyle2}
              onChangeText={(text) => {
                this.password = text;
              }
              }
            />
          </View>
          <TouchableOpacity style={{ margin: 5, paddingBottom: 20 }} onPress={this.retryNote} >
            <Text style={{ color: '#337ab7' }}>没有收到短信验证码，再次发送</Text>
          </TouchableOpacity>
          <View>
            <TouchableHighlight
              style={styles.button}
              onPress={this.onPress}
            >
              <Text style={styles.buttonText}>  下一步</Text>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
  }
}
UserinfoJDNote.propTypes = {
  handleSubmit: React.PropTypes.func.isRequired,
  retryNote: React.PropTypes.func.isRequired,
};
export default UserinfoJDNote;