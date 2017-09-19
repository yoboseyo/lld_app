import React from 'react';
import * as ContainerActions from '../../actions/container-actions';
import Header from '../common/header.js';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import imgCallcs from '../../../public/image/callcs.jpg';

class Service extends React.Component{
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions
    }, this.props.dispatch);

  }
  componentDidMount(){
    this.actions.updateNav("/service");
  }
  render (){
    return (
      <div>
        <div style={{marginBottom:"50px"}}><Header title="召唤客服"/></div>
        <div className="callcs">
          <img src={imgCallcs} alt=""/>
        </div>
      </div>

    )
  }
}

//export default connect(state => ({}))(Service);
