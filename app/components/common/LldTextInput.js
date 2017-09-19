/**
 * Created by atilaqi on 10/19/16.
 */
import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';

class LldTextInput extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' };
  }

  render() {
    var _this = this;
    return (
      <View>
        <TextInput
          placeholder={this.props.placeholder}
          onChangeText={
            (text) => {
              this.setState({ text });
              this.props.onChangeText(text);
            }
          }
          secureTextEntry={this.props.isPassword}
          style={this.props.isStyles?this.props.isStyles:styles.textInputStyle}
          editable={this.props.editable}
          value={this.props.value}
          onFocus={() => {
            if(this.props.handleFocus){
              this.props.handleFocus(this.props.index);
            }
          }}
          onBlur={() => {
            if(this.props.handleBlur){
              this.props.handleBlur();
            }
          }}
          keyboardType={this.props.kType}
        />
      </View>
    );
  }
}

LldTextInput.propTypes = {
  placeholder: React.PropTypes.string,
  isPassword: React.PropTypes.bool,
  isStyles: React.PropTypes.object,
  onChangeText: React.PropTypes.func,
  editable: React.PropTypes.bool,
  value: React.PropTypes.string,
  keyboardType: React.PropTypes.string,
};

const styles = StyleSheet.create({
  textInputStyle: {
    height: 40,
    fontSize: 12,
  },
});

export default LldTextInput;
