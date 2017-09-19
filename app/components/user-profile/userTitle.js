import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Platform,
  AsyncStorage,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Storage from 'react-native-storage';
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
  title: '请选择头像',
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

class UserTitle extends Component {
  constructor(props){
    super(props);

    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserAction,
    }, this.props.dispatch);

    this.state = {
      avatarSource: null,
    };
  }

  componentWillMount() {
    storage.load({
      key: 'avatarSource',
      id: 'avatar',
      autoSync: false,
      syncInBackground: true,
    }).then(ret => {
      aSource = ret;

      this.setState({
        avatarSource: aSource,
      });
    }).catch(err => {
      console.log(err.message);
    });

  }

  selImg() {
    ImagePicker.showImagePicker(options, (response) => {
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
          avatarSource: source,
        });
        storage.save({
          key: 'avatarSource',
          id: 'avatar',
          rawData: source,
          expires: null,
        }).then(ret => {

          this.actions.updateAvatar(source);
        }).catch(err => {
          console.log(err.message);
        });
        const uploadFile = sourceUp.uri;
        this.actions.uploadAvatarBase64(uploadFile, this.props.userInfo.userInfo.mobile, this.props.imgType);
      }
    });
  }

  render() {
    return (
      <View style={styles.wrap}>
        <TouchableOpacity style={styles.img} onPress={this.selImg.bind(this)}>
          <Image style={styles.img} source={this.state.avatarSource ? this.state.avatarSource : require('image!avatar')} />
        </TouchableOpacity>
        <Text style={styles.txt}>
          欢迎您，{this.props.account}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    height: 63,
    paddingLeft: 17,
    paddingRight: 17,
    paddingTop: 12,
    paddingBottom: 12,
  },
  img: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  txt: {
    lineHeight: 46,
    fontSize:13,
    marginLeft: 10,
  },
});

const mapStateToProps = function(store) {
  return {
    userInfo: store.userState,
  };
};
export default connect(mapStateToProps)(UserTitle);