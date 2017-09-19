import React from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';

class Container extends React.Component {
  render() {
    return (
      <View>
        {this.props.children}
        {this.props.container.modal}
        {this.props.container.errModal}
      </View>
    );
  }
}

Container.propTypes = {
  container: React.PropTypes.object,
  children: React.PropTypes.func,
};

const mapStateToProps = function (store) {
  return {
    container: store.containerState,
  };
};

export default connect(mapStateToProps)(Container);
