import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Image,
  Text,
} from 'react-native';

export default class Indicator extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <View>
            <Image />
          </View>
          <View>
            <Text>审核中</Text>
            <Text>您的借款正在审核中，请耐心等待！</Text>
            <View>
              <Image />
              <Text>今天10:20</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    padding: 20,
    backgroundColor: '#fff',
  },
  wrap: {
    flexDirection: 'row',
  },
});
