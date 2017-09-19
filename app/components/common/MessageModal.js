/**
 * Created by atilaqi on 10/19/16.
 */
import React, { Component } from 'react';
import { Modal, Text, View, StyleSheet } from 'react-native';

class MessageModal extends Component {

  constructor(props) {
    super(props);
    this.state = { modalVisible: false };
  }

  componentDidMount() {
   // const _this = this;
    setTimeout(() => {
      this.props.handleChange();
    }, 2000);
  }

  render() {
    return (
      <Modal
        animationType={'slide'}
        transparent
        visible={this.props.shown}
      >
        <View style={styles.container}>
          <View style={styles.modal}>
            <Text style={styles.text}>{this.props.message}</Text>
          </View>
        </View>
      </Modal>
    );
  }
}

MessageModal.propTypes = {
  message: React.PropTypes.string,
  handleChange: React.PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 3,
    padding: 20,
  },
  text: {
    color: '#ffffff',
  },
});

export default MessageModal;
