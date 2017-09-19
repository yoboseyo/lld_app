/**
 * Created by atilaqi on 10/19/16.
 */
import React, { Component } from 'react';
import Button from 'react-native-button';
import { StyleSheet } from 'react-native';

class LldButton extends Component {
/*  constructor(props) {
    super(props);
  }*/

  render() {
    return (
      <Button
        containerStyle={this.props.containerStyle ? this.props.containerStyle : styles.button}
        style={this.props.style ? this.props.style : styles.buttonText}
        onPress={() => this.props.onPress()}
      >
        { this.props.name }
      </Button>
    );
  }
}

LldButton.propTypes = {
  name: React.PropTypes.string,
  onPress: React.PropTypes.func.isRequired,
  containerStyle: React.PropTypes.object,
  style: React.PropTypes.object,
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 16,
    color: 'white',
    alignSelf: 'center',
  },
  button: {
    height: 36,
    backgroundColor: '#1d7cf0',
    borderColor: '#1d7cf0',
    borderWidth: 1,
    borderRadius: 8,
    // marginBottom: 10,
    alignSelf: 'stretch',
    justifyContent: 'center',
    // margin: 10,
  },
});

export default LldButton;
