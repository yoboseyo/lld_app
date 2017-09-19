import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NativeModules } from 'react-native';
import { Actions } from 'react-native-redux-router';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  NativeEventEmitter,
} from 'react-native';
import Dimensions from 'Dimensions';
var faceRecognition = NativeModules.FaceRecognition;
var getImageData = NativeModules.sendImageData;
const myNativeEvt = new NativeEventEmitter(getImageData);  //创建自定义事件接口

var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import * as ContainerActions from '../../actions/container-actions';
import * as UserAction from '../../actions/user-actions';
import * as CreditActions from '../../actions/myCredit-actions';
import LoadingModal from '../common/LldActivityIndicator';
import MessageModal from '../common/MessageModalContainer';

let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
})

let options = {
  title: '请选择图片',
  takePhotoButtonTitle: '拍照',
  chooseFromLibraryButtonTitle: '从手机相册选择',
  cancelButtonTitle: '取消',
  storageOptions: {
    skipBackup: true,
    path: 'images',
    waitUntilSaved: true,
  },
};

let aSource = null;

class PicBox extends Component {
  constructor(props){
    super(props);

    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserAction,
      ...CreditActions,
    }, this.props.dispatch);

    this.state = {
      picSource: null,
    };
  }

  componentDidMount() {
      storage.load({
        key: 'picSource',
        id: this.props.id + this.props.userInfo.userInfo.id,
        autoSync: false,
        syncInBackground: true,
      }).then(ret => {
        aSource = ret;
        this.setState({
          picSource: aSource,
        });
      }).catch(err => {
        console.log(err.message);
      });
  }

  //在组件中使用
  componentWillMount() {
    this.listener = myNativeEvt.addListener('sendImageData', this.iseCallback.bind(this));  //对应了原生端的名字
  }
  componentWillUnmount() {
    this.listener && this.listener.remove();  //记得remove
    this.listener = null;
  }
  iseCallback(data) {//接受原生传过来的数据 data={code:,result:}
    this.actions.showModal(<LoadingModal />);
    var dataNew = JSON.parse(data);
    if(dataNew.picType == this.props.id*1) {
      let source = {uri: 'data:image/jpeg;base64,' + dataNew.picDataBaseFolw, isStatic: true};
      let sourceUp = {uri: dataNew.picDataBaseFolw};
      const uploadFile = sourceUp.uri;
      this.actions.uploadImageBase64(uploadFile, this.props.userInfo.userInfo.mobile, this.props.imgType, function(){

        /*if (Platform.OS === 'ios') {
         source = {uri: response.uri.replace('file://', ''), isStatic: true};
         } else {
         source = {uri: response.uri, isStatic: true};
         }*/
        this.setState({
          picSource: source,
        });
        storage.save({
          key: 'picSource',
          id: this.props.id + this.props.userInfo.userInfo.id,
          rawData: source,
          expires: null,
        });
        this.actions.closeModal();
        if(dataNew.picType === '1'){
          this.actions.showErrModal(<MessageModal message={'身份验证成功！'} />);
          this.actions.myCreditInit();
          setTimeout(function(){
            this.actions.closeErrModal();
            Actions.pop();
          }.bind(this),2000);
        }
      }.bind(this));
    }
  }

  selImg() {
    faceRecognition.startRecognitionFace(this.props.id);
  }

  render() {
    return (
      <TouchableOpacity style={styles.boxWrap} onPress={this.selImg.bind(this)}>
        <Image source={this.props.id === '0' ? require('image!idIcon') : require('image!faceIcon')} style={this.props.id === '0' ? styles.idIcon : styles.faceIcon} />
        <Image source={this.state.picSource} style={styles.pic} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  boxWrap: {
    width: 145,
    height: 145,
    borderWidth: 1,
    borderColor: '#959595',
    borderStyle: 'dashed',
    justifyContent: 'center',
    alignItems: 'center',
  },
  idIcon: {
    width: 79,
    height: 54,
  },
  faceIcon: {
    width: 70,
    height: 71,
  },
  boxWrap2: {
    width: Dimensions.get('window').width * 0.3375,
    height: Dimensions.get('window').width * 0.6,
    borderWidth: 1,
    borderColor: '#d4d4d4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plus: {
    fontSize: 50,
    color: '#d4d4d4',
    marginBottom: 10,
  },
  txt: {
    color: '#d4d4d4',
  },
  pic: {
    position: 'absolute',
    left: 0,
    top: 0,
    right: 0,
    bottom: 0,
  },
});

const mapStateToProps = function(store) {
  return {
    userInfo: store.userState,
  };
};
export default connect(mapStateToProps)(PicBox);
