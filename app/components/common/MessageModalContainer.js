import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MessageModal from './MessageModal';
import * as ContainerActions from '../../actions/container-actions';


class MessageModalContainer extends Component {

  constructor(props) {
    super(props);
    const { dispatch } = this.props;
    this.actions = bindActionCreators(ContainerActions, dispatch);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange() {
    // this.setState({show:'none', errMsg:''});

    this.actions.closeErrModal();
  }

  render() {
    return (
      <MessageModal
        handleChange={this.handleChange}
        message={this.props.message}
        shown={this.props.shown}
      />
    );
  }
}

MessageModalContainer.propTypes = {
  message: React.PropTypes.string,
  dispatch: React.PropTypes.func,
};

const mapStateToProps = function (store) {
  return {
    modal: store.containerState.errModal,
    shown: store.containerState.modalShown,
  };
};

export default connect(mapStateToProps)(MessageModalContainer);

