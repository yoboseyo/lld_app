import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
} from 'react-native';
import styles from '../../styles/styles';
import LldTextInput from '../common/LldTextInput';

class PasswordEntry extends React.Component {

  constructor(props) {
    super(props);
    this.state = { show_hidden: '显示密码', bool: 'true' };
    this.onChange = this.onChange.bind(this);
  }
  onChange() {
    this.setState({
      bool: this.state.bool ? false : true,
      show_hidden: this.state.bool ? '隐藏密码' : '显示密码',
    });
  }

  render() {
    return (
      <View style={this.props.style?this.props.style:styles.flexStyle}>
        <View style={styles.flex_2}>
          <Image style={{width: 21, height: 25, alignSelf: 'center'}} source={require('image!lock')} />
        </View>
        <View style={styles.flex_7}>
          <LldTextInput
            isStyles={this.props.txtStyles?this.props.txtStyles:style.txt}
            placeholder="请输入6-8位密码"
            isPassword={this.state.bool?true:false}
            onChangeText={(text) => {
              this.props.onChangeText(text);
            }
            }
            handleFocus={this.props.handleFocus}
            handleBlur={this.props.handleBlur}
            index={this.props.index}
          />
        </View>
        <View id="show_hide" style={styles.flex_3}>
          <Text
            onPress={this.onChange}
            style={{ fontSize: 13, justifyContent: 'center', alignSelf: 'center'}}
          >{this.state.show_hidden}</Text></View>
      </View>
    );
  }
}

PasswordEntry.propTypes = {
  onChangeText: React.PropTypes.func,
  style: React.PropTypes.object,
}

let style = StyleSheet.create({
  txt: {
    lineHeight: 45,
    fontSize: 15,
    height: 45,
  },
});
export default PasswordEntry;