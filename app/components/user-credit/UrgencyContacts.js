/**
 * Created by Administrator on 2016/9/6.
 */
import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet,
  PickerIOS,
  Modal,
  TouchableHighlight,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../styles/styles';
import LldTextInput from '../common/LldTextInput';
import LldButton from '../common/LldButton';

const PickerItemIOS = PickerIOS.Item;

const relaton = ['配偶', '父母', '兄弟姐妹', '子女', '同事', '同学', '朋友'];
class UrgencyContacts extends Component {
  constructor(props) {
    super(props);
    // 初始状态
    this.onPress = this.onPress.bind(this);
    this.relaton1Visible = this.relaton1Visible.bind(this);
    this.relaton2Visible = this.relaton2Visible.bind(this);
    this.state = { relaton1: 0, relaton2: 0, relaton1Modal: false, relaton2Modal: false };
  }
  onPress() {
    this.props.onChangeRelaton1(this.state.relaton1);
    this.props.onChangeRelaton2(this.state.relaton2);
    this.props.onPress();
  }
  relaton1Visible(bool) {
    this.setState({ relaton1Modal: bool });
  }
  relaton2Visible(bool) {
    this.setState({ relaton2Modal: bool });
  }

  render() {
    return (
      <View>
        <View style={styles.alignSelf_Center3}><Text style={{ alignSelf: 'center' }}>紧急联系人信息</Text></View>
        <View style={{ padding: 20 }}>
          <View>
            <View><Text>紧急联系人一 姓名</Text></View>
            <View>
              <LldTextInput
                placeholder="请填写真实姓名"
                isStyles={styles.TextInputStyle2}
                onChangeText={(text) => {
                  this.props.onChangeContact1(text);
                }
                }
              />
            </View>
          </View>
          <View >
            <View><Text>关系</Text></View>
            <View style={{ flexDirection: 'row', paddingRight: 5, marginTop: 10, marginBottom: 10, backgroundColor: '#fff', borderColor: '#cccccc', borderWidth: 1 }}>
              <Text onPress={this.relaton1Visible} style={{ flex: 1 ,paddingTop: 5, paddingBottom: 5, fontSize: 12, }}>
                {relaton[this.state.relaton1]}
              </Text>
              <Icon name='ios-arrow-down' size={25} color="#ccc" style={{alignSelf: 'flex-end' }} />
            </View>
          </View>
          <View>
            <View><Text>联系电话</Text></View>
            <View>
              <LldTextInput
                placeholder="请输入联系人手机号"
                isStyles={styles.TextInputStyle2}
                onChangeText={(text) => {
                  this.props.onChangeContact1Phone(text);
                }
                }
                kType="numeric"
              />
            </View>
          </View>
        </View>
        <View style={{ padding: 20 }}>
          <View>
            <View><Text>紧急联系人二 姓名</Text></View>
            <View >
              <LldTextInput
                placeholder="请填写真实姓名"
                isStyles={styles.TextInputStyle2}
                onChangeText={(text) => {
                  this.props.onChangeContact2(text);
                }
                }
              />
            </View>
          </View>
          <View >
            <View><Text>关系</Text></View>
            <View>
              <View style={{ flexDirection: 'row', paddingRight: 5, marginTop: 10, marginBottom: 10, backgroundColor: '#fff', borderColor: '#cccccc', borderWidth: 1 }}>
                <Text onPress={this.relaton2Visible} style={{ flex: 1 ,paddingTop: 5, paddingBottom: 5, fontSize: 12, }}>
                  {relaton[this.state.relaton2]}
                </Text>
                <Icon name='ios-arrow-down' size={25} color="#ccc" style={{alignSelf: 'flex-end' }} />
              </View>
            </View>
          </View>
          <View >
            <View><Text>联系电话</Text></View>
            <View>
              <LldTextInput
                placeholder="请输入联系人手机号"
                isStyles={styles.TextInputStyle2}
                onChangeText={(text) => {
                  this.props.onChangeContact2Phone(text);
                }
                }
                kType="numeric"
              />
            </View>
          </View>
        </View>
        <View>
          <View style={{ marginLeft: 10, marginRight: 10 }}>
            <LldButton onPress={this.onPress} name="下一步" />
          </View>
          <View><Text style={{ alignSelf: 'center', padding: 20 }}></Text></View>
        </View>

        <Modal
          visible={this.state.relaton1Modal}
          transparent
          animationType={false}
        >
          <View style={{  borderRadius: 5 ,flex: 1,
            justifyContent: 'flex-end' }}>
            <TouchableHighlight style={{ padding: 10, paddingRight: 10, backgroundColor: 'rgba(170,170,170,1)' }} onPress={() => {this.relaton1Visible(false)}}>
              <Text style={{ color: '#fff',  alignSelf: 'flex-end' }}>
                完成
              </Text>

            </TouchableHighlight>
            <View  style={{ backgroundColor: '#fff', borderRadius: 5,flexDirection:'row' }}>
              <View style={{ flex: 1 }}>
                <PickerIOS
                  itemStyle={{fontSize: 16, height:100}}
                  selectedValue={this.state.relaton1}
                  onValueChange={(relaton1) => this.setState({relaton1})}>
                  {relaton.map(
                    (modelName, modelIndex) => (
                      <PickerItemIOS
                        key={modelIndex}
                        value={modelIndex}
                        label={modelName}
                      />
                    ))
                  }
                </PickerIOS>
              </View>
            </View>
          </View>
        </Modal>

        <Modal
          visible={this.state.relaton2Modal}
          transparent
          animationType={false}
        >
          <View style={{  borderRadius: 5 ,flex: 1,
            justifyContent: 'flex-end' }}>
            <TouchableHighlight style={{ padding: 10, paddingRight: 10, backgroundColor: 'rgba(170,170,170,1)' }} onPress={() => {this.relaton2Visible(false)}}>
              <Text style={{ color: '#fff',  alignSelf: 'flex-end' }}>
                完成
              </Text>

            </TouchableHighlight>
            <View  style={{ backgroundColor: '#fff', borderRadius: 5,flexDirection:'row' }}>
              <View style={{ flex: 1 }}>
                <PickerIOS
                  itemStyle={{fontSize: 16, height:100}}
                  selectedValue={this.state.relaton2}
                  onValueChange={(relaton2) => this.setState({relaton2})}>
                  {relaton.map(
                    (modelName, modelIndex) => (
                      <PickerItemIOS
                        key={modelIndex}
                        value={modelIndex}
                        label={modelName}
                      />
                    ))
                  }
                </PickerIOS>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

UrgencyContacts.propTypes = {
  onChangeContact1: React.PropTypes.func.isRequired,
  onChangeContact1Phone: React.PropTypes.func.isRequired,
  onChangeContact2: React.PropTypes.func.isRequired,
  onChangeContact2Phone: React.PropTypes.func.isRequired,
  onPress: React.PropTypes.func.isRequired,
  onChangeRelaton1: React.PropTypes.func.isRequired,
  onChangeRelaton2: React.PropTypes.func.isRequired,
};

export default UrgencyContacts;