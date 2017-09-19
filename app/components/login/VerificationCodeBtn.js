import React from 'react';
/**
 * Created by Administrator on 2016/9/6.
 */
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
} from 'react-native';

let timer = null;
class VerificationCodeBtn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 61,
      onOff: true,
    };
    this.handleClick = this.handleClick.bind(this);
    this.validateMobile = this.validateMobile.bind(this);
    this.getValidateCode = this.getValidateCode.bind(this);
  }

  componentWillUnmount() {
    clearInterval(timer);
  }

  getValidateCode() {
    return this.props.getValidateCode();
  }

  validateMobile() {
    return this.props.validateMobile();
  }

  handleClick() {
    // const _this = this;
    if (this.state.onOff) {
      if (!this.validateMobile()) return;
      this.setState({ onOff: false });
      clearInterval(timer);
      timer = setInterval(() => {
        if (this.state.count > 0) {
          this.setState({ count: this.state.count - 1 });
        } else {
          clearInterval(timer);
          this.setState({ count: 61, onOff: true });
        }
      }, 1000);
      this.getValidateCode();
    }
  }
  render() {
    return (
      <View>
        <TouchableHighlight style={this.props.btnStyles?this.props.btnStyles:styles.button} onPress={this.handleClick}>
          <Text style={this.props.txtStyles?this.props.txtStyles:styles.txt}>{this.state.count === 61 ? '获取验证码' : this.state.count}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    borderColor: '#1d7cf0',
    borderWidth: 1,
    borderRadius: 4,
    padding: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    width: 74,
  },
  txt: {
    fontSize: 12,
    color: '#1d7cf0',
    textAlign: 'center',
    lineHeight: 17,
  }
});

VerificationCodeBtn.propTypes = {
  getValidateCode: React.PropTypes.func.isRequired,
  validateMobile: React.PropTypes.func.isRequired,
};

export default VerificationCodeBtn;
