import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  AsyncStorage,
} from 'react-native';
import Storage from 'react-native-storage';
import TxtSec from './txtSec';
import PicBox from './picBox';
import Dimensions from 'Dimensions';
import SwitchBtn from '../loan/switchBtn';
import * as ActionTypes from '../../actions/action-types';
import { connect } from 'react-redux';

import { bindActionCreators } from 'redux';
import * as UserAction from '../../actions/user-actions';

let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
})

var bArr = [];

class PicUpload extends Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...UserAction,
    }, this.props.dispatch);
    this.state = {
      index: true,
    }
  }

  /*onHandlePress(){
    this.setState({
      index: !this.state.index,-
    })
  }*/

/*  render() {
    return (
      <View style={styles.wrap}>
        <SwitchBtn press={this.onHandlePress.bind(this)} press2={this.onHandlePress.bind(this)} index={this.state.index} name={['自动审核', '人工审核']} />
        {
          this.state.index ?
            <View style={styles.innerWrap}>
              <TxtSec txt="扫描身份证" />
              <PicBox id={'0'} imgType={ActionTypes.UPLOAD_IMAGE1} />
              <TxtSec txt="人脸识别" />
              <PicBox id={'1'} imgType={ActionTypes.UPLOAD_IMAGE2} />
            </View>
            :
            <View style={styles.innerWrap}>
              <TxtSec txt="拍摄身份证" index={0} />
              {/!*<PicBox2 id={2} imgType={ActionTypes.UPLOAD_IMAGE1} />*!/}
              <TxtSec txt="拍摄手持身份证照片" index={1} />
             {/!* <PicBox2 id={3} imgType={ActionTypes.UPLOAD_IMAGE2} />*!/}
            </View>
        }
      </View>
    );
  }*/

  componentDidMount() {
    storage.load({
      key: 'idInfo',
      id: this.props.user.userInfo.id,
      autoSync: false,
      syncInBackground: true,
    }).then((ret) => {
      console.log(ret);
      this.actions.updateIDInfo(ret);


    }).catch(err => {
      console.log(err.message);
    });
  }

  componentDidUpdate() {
    if(this.props.user.idInfo.name){
      storage.save({
        key: 'idInfo',
        id: this.props.user.userInfo.id,
        rawData: this.props.user.idInfo,
        expires: null,
      });
    }
  }

  render() {
    if(this.props.user.idInfo.birthday){
      bArr = this.props.user.idInfo.birthday.split('.');
    }
    return (
      <View style={styles.container}>
        <View style={styles.wrap}>
          <PicBox id={'0'} imgType={ActionTypes.UPLOAD_IMAGE1} />
          <PicBox id={'1'} imgType={ActionTypes.UPLOAD_IMAGE2} />
        </View>
        <View style={styles.wrap}>
          <TxtSec txt="扫描身份证" index={0} />
          <TxtSec txt="人脸识别" index={1} />
        </View>
        <View style={styles.detailWrap}>
          <Text style={styles.txt}><Text style={styles.txtBlue}>姓名：</Text>{this.props.user.idInfo.name}</Text>
          <Text style={styles.txt}><Text style={styles.txtBlue}>性别：</Text>{this.props.user.idInfo.gender}   <Text style={styles.txtBlue}>民族：</Text>{this.props.user.idInfo.nation}</Text>
          <Text style={styles.txt}><Text style={styles.txtBlue}>出生：</Text>{bArr[0]}<Text style={styles.txtBlue}>年</Text>{bArr[1]}<Text style={styles.txtBlue}>月</Text>{bArr[2]}<Text style={styles.txtBlue}>日</Text></Text>
          <Text style={styles.txt}><Text style={styles.txtBlue}>住址：</Text>{this.props.user.idInfo.address}</Text>
          <Text style={styles.txt}><Text style={styles.txtBlue}>身份证号：</Text>{this.props.user.idInfo.citizen_id}</Text>
        </View>
      </View>
    )

  }
}
const mapStateToProps = (state) => (
{
  user: state.userState,
});

export default connect(mapStateToProps)(PicUpload);

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingLeft: 24,
    paddingRight: 24,
    backgroundColor: '#fff',
    height: Dimensions.get('window').height,
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  innerWrap: {
    paddingTop: 20,
  },
  detailWrap: {
    marginTop: 50,
    width: 300,
    height: 176,
    padding: 20,
    borderWidth: 2,
    borderRadius: 15,
    borderColor: '#1d7cf0',
    alignSelf: 'center',
  },
  txt: {
    fontSize: 13,
    lineHeight: 25,
    color: '#030303',
  },
  txtBlue: {
    color: '#1d7cf0',
  }
});
