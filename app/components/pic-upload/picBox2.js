import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
} from 'react-native';
import Dimensions from 'Dimensions';
var Platform = require('react-native').Platform;
var ImagePicker = require('react-native-image-picker');
import Storage from 'react-native-storage';
import { AsyncStorage } from 'react-native';
import { bindActionCreators } from 'redux';
import * as ContainerActions from '../../actions/container-actions';
import * as UserAction from '../../actions/user-actions';
import LoadingModal from '../common/LldActivityIndicator';

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

class PicBox2 extends Component {
  constructor(props){
    super(props);

    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserAction,
    }, this.props.dispatch);

    this.state = {
      picSource: null,
    };
  }

  componentDidMount() {
    storage.load({
      key: 'picSource',
      id: this.props.id,
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

  selImg() {
    ImagePicker.launchCamera(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);

      }
      else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      }
      else {

        let source = {uri: 'data:image/jpeg;base64,' + response.data, isStatic: true};
        let sourceUp = {uri: response.data};
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
          id: this.props.id,
          rawData: source,
          expires: null,
        });
        const uploadFile = sourceUp.uri;
        this.actions.uploadImageBase64(uploadFile, this.props.userInfo.userInfo.mobile, this.props.imgType);
      }
    });
  }

  render() {

    return (
      <View style={styles.wrap}>
        <TouchableOpacity style={styles.boxWrap} onPress={this.selImg.bind(this)}>
          <Text style={styles.plus}>+</Text>
          <Text style={styles.txt}>添加照片</Text>
          <Image source={this.state.picSource} style={styles.pic} />
        </TouchableOpacity>
      </View>
    );
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
    width: Dimensions.get('window').width * 0.6,
    height: Dimensions.get('window').width * 0.3375,
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
export default connect(mapStateToProps)(PicBox2);

