import React, { Component } from 'react';
import { connect } from 'react-redux';
 import { Actions } from 'react-native-redux-router';
//import { Actions } from 'react-native-router-flux';
import Btn from '../common/LldButton';
import {
  StyleSheet,
  View,
  Image,
  TouchableHighlight,
  TouchableOpacity,
  Text,
  AsyncStorage,
} from 'react-native';
import { bindActionCreators } from 'redux';
import * as ContainerActions from '../../actions/container-actions';
import * as UserAction from '../../actions/user-actions';
import Icon from 'react-native-vector-icons/FontAwesome';
import Storage from 'react-native-storage';

let storage = new Storage({
  size: 1000,
  storageBackend: AsyncStorage,
  defaultExpires: 1000 * 3600 * 24,
  enableCache: true,
})

class LoginState extends Component {
  constructor(props){
    super(props);

    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserAction,
    }, this.props.dispatch);

  }
  componentWillMount() {
    storage.load({
      key: 'avatarSource',
      id: 'avatar',
      autoSync: false,
      syncInBackground: true,
    }).then(ret => {
      this.actions.updateAvatar(ret);
    }).catch(err => {
      console.log(err.message);
    });
  }

  render() {
    const { updateAvatar } = this.props.user;
    return (
      <View style={styles.wrap}>
        <TouchableOpacity style={styles.login} onPress={() => this.props.onUserProfile()}>
          <View style={styles.flexLeft}>
            {
              this.props.user.logined ?
                <Image style={styles.avatar} source={ updateAvatar ? updateAvatar : require('image!avatar')} /> :
                <Image style={styles.avatar} source={require('image!avatar')} />
            }
            <Text style={styles.loginTxt}>{this.props.name}</Text>
          </View>
          <View style={styles.flexRight}>
            <Icon name="angle-right" color="#ccc" size={25} />
          </View>
        </TouchableOpacity>
        <View style={styles.btnWrap}>
          <TouchableHighlight style={styles.btn} onPress={() => this.props.onLoan()}>
            <Text style={styles.btnTxt}>
              我要借款
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

LoginState.propTypes = {
  // name: React.PropTypes.string,
  onLoan: React.PropTypes.func.isRequired,
  // containerStyle: React.PropTypes.number,
  // style: React.PropTypes.number,
};


const styles = StyleSheet.create({
  wrap: {
    margin: 10,
    borderRadius: 5,
    // height: 146,
  },
  login: {
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 5,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  avatar: {
    width: 35,
    height: 35,
    marginRight: 15,
    borderRadius: 17.5,
  },
  loginTxt: {
    fontSize: 14,
    color: '#1d7cf0',
  },
  arrow: {
    width: 10,
    height: 17,
  },
  btnWrap: {
    marginTop: 10,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
  },
  btn: {
    width: 138,
    height: 47,
    backgroundColor: '#1d7cf0',
    borderRadius: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnTxt: {
    fontSize: 19,
    color: '#fff',
  },
  flexLeft: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRight: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
});
const mapStateToProps = function(store) {
  return {
    user: store.userState,
  };
};
export default connect(mapStateToProps)(LoginState);