import React, { Component } from 'react';
import {
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import UserTitle from './userTitle';
import Profiles from './profiles';
import OperateItems from './operateItems';
import Btn from '../common/LldButton';
// import * as UserProfileActions from '../../actions/userProfile-actions';
import * as UserActions from '../../actions/user-actions';
import * as ActionTypes from '../../actions/action-types';

class UserProfile extends Component {
  constructor(props) {
    super(props);
    //this.props.actions2.selectUserProfile();
  }

  logout() {
    this.props.actions.logout();
  }

  render() {
    const { userInfo } = this.props.user;
    return (
      <View style={styles.container}>
        <UserTitle account={userInfo.mobile} imgType={ActionTypes.USER_AVATAR} />
        <Profiles
          userInfo={userInfo}
        />
        <OperateItems />
        <View style={styles.btnWrap}>
          <Btn name="退出登录" onPress={() => this.logout()} containerStyle={styles.buttonStyle} style={styles.textStyle}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f2f2f2',
    height: Dimensions.get('window').height,
  },
  btnWrap: {
    paddingTop: 20,
    paddingLeft: 18,
    paddingRight: 18,

  },
  textStyle:{

    fontSize: 15,
    color: 'white',
    alignSelf: 'center',

  },
  buttonStyle:{
    height: 45,
    backgroundColor: '#1d7cf0',
    borderColor: '#1d7cf0',
    borderWidth: 1,
    borderRadius: 30,
    width: 330,
    // marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    // margin: 10,
  }
});

const mapStateToProps = (state) => (
  {
    user: state.userState,
    // userProfile: state.profileState,
  }
);

const mapDispatchToProps = (dispatch) => (
{
  actions: bindActionCreators(UserActions, dispatch),
  //actions2: bindActionCreators(UserProfileActions, dispatch),
}
);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
