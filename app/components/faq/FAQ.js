/**
 * Created by Administrator on 2016/9/8.
 */
import React from 'react';
import { ScrollView } from 'react-native';
import { bindActionCreators } from 'redux';
import FAQModule from './FAQModule';
import * as ContainerActions from '../../actions/container-actions';

class FAQ extends React.Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions,
    }, this.props.dispatch);

  }

  componentDidMount() {
    // this.actions.updateNav("/faq");
  }

  render() {
    return (
      <ScrollView>
        <FAQModule />
      </ScrollView>
    );
  }
}
FAQ.propTypes = {
  dispatch: React.PropTypes.func.isRequired,
};
// export default connect(state => ({}))(FAQ);
export default FAQ;