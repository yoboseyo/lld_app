/**
 * Created by Administrator on 2016/9/14.
 */
import React from 'react';
import { bindActionCreators } from 'redux';
import { View } from 'react-native';
import UserinfoNote from './userinfoNote';
import Loading from '../common/LldActivityIndicator';
import MessageModal from '../common/MessageModalContainer';
import * as ContainerActions from '../../actions/container-actions';
import * as UserinfoAction from '../../actions/userinfo-hl-action';

class userinfoNodeContainer extends React.Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserinfoAction,
    }, this.props.dispatch);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.retryNote = this.retryNote.bind(this);
  }

  handleSubmit(account) {
    if (!account) {
      this.actions.showErrModal(<MessageModal message="请输入验证码" />);
    } else {
      this.actions.showModal(<Loading />)
      this.actions.userinfo_node(account);
    }
  }

  retryNote() {
    console.info(111111111);
    this.actions.showModal(<Loading />)
    // this.actions.userinfo_retryNote();
  }

  render() {
    return (
      <View>
        <UserinfoNote
          handleSubmit={this.handleSubmit}
          retryNote={this.retryNote}
        />
      </View>
    );
  }
}

// const mapStateToProps = function (store) {
//   return {
//     errMsgState: store.errMsgState
//   };
// };
userinfoNodeContainer.propTypes = {
  dispatch: React.PropTypes.func,
};
// export default connect(mapStateToProps)(userinfoNodeContainer);
export default userinfoNodeContainer;