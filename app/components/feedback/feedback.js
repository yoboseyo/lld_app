import React from 'react';
import Header from '../common/header';
import {FormGroup, FormControl, ControlLabel,Button,} from 'react-bootstrap';
import LoadingModal from '../common/loading';
import * as ContainerActions from '../../actions/container-actions';
import * as UserAction from '../../actions/user-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import VerifyModal from '../common/verifyModalContainer';

class Feedback  extends React.Component {
  constructor(props) {
    super(props);
    this.actions = bindActionCreators({
      ...ContainerActions,
      ...UserAction
    }, this.props.dispatch);

  }
  handleSubmit(e){
    e.preventDefault();
    let content = e.target.content.value;
    let title = e.target.title.value;
    let errMsg="";
    if(!title){
      errMsg="请输入标题";
    }else if(!content){
     errMsg="请输入内容";
    }
    if(errMsg){
      this.actions.showErrModal( <VerifyModal  errMsg={errMsg}/>)
    }else{
      let suggestion = {};
      suggestion.userId=this.props.userInfo.id;
      suggestion.title=title;
      suggestion.content=content;
      console.info(suggestion);
      this.actions.showModal( <LoadingModal/>)
      this.actions.createSuggestion(suggestion);
    }
  }
  componentDidMount(){
    this.actions.updateNav("/feedback");
  }
  render () {
    return (
      <div>
        <Header title="意见反馈"/>
        <form className="feedback-form" onSubmit={this.handleSubmit.bind(this)}>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>标题</ControlLabel>
            <FormControl type="text" placeholder="" name="title"/>
          </FormGroup>
          <FormGroup controlId="formControlsTextarea">
            <ControlLabel>内容</ControlLabel>
            <FormControl componentClass="textarea" placeholder=""  name="content"/>
          </FormGroup>
          <Button className="col-xs-12" type="submit" bsStyle="primary">
            提交
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = function(store) {
  return {
    userInfo: store.userState.userInfo
  };
};
//export default connect(mapStateToProps)(Feedback);
