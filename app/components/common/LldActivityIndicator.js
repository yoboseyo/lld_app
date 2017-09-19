/**
 * Created by atilaqi on 10/26/16.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { connect } from 'react-redux';

class LldActivityIndicator extends Component {

  render() {
    return (
      <Modal transparent>
        <View style={styles.space} />
          <View style={styles.container}>
            <ActivityIndicator
              animating
              style={[styles.centering]}
              size="large"
              color="white"
            />
          </View>
        <View style={styles.space} />
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  space: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    // backgroundColor: '#F5FCFF',
    borderRadius: 5,
    overflow: 'hidden',
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 8,
    paddingBottom: 8,
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 5,
  },
  modal: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 3,
    padding: 20,
  },
});

const mapStateToProps = (state) => (
  {
    container: state.containerState,
  }
);
export default connect(mapStateToProps)(LldActivityIndicator);
