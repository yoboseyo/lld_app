/**
 * Created by Administrator on 2016/9/9.
 */
import React from 'react';
import Header from '../common/header.js';
import * as ContainerActions from '../../actions/container-actions';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import imgWorkflow1 from '../../../public/image/repay_workflow_01.png';
import imgWorkflow2 from '../../../public/image/repay_workflow_02.png';
import imgWorkflow3 from '../../../public/image/repay_workflow_03.png';
import imgWorkflow4 from '../../../public/image/repay_workflow_04.png';

 class Repay_Workflow extends React.Component{
    constructor(props) {
        super(props);
        this.actions = bindActionCreators({
            ...ContainerActions
        }, this.props.dispatch);

    }
    componentDidMount(){
        this.actions.updateNav("/repayWorkflow");
    }
    render (){
        return (
            <div >
                <div className="row" style={{margin:"0px"}}>
                    <div className="row" style={{marginBottom:"50px"}}><Header title="借款流程"/></div>
                    <div className="col-xs-12" style={{padding:"0px"}}><img src={imgWorkflow1} className="col-xs-12" style={{padding:"0px"}}/></div>
                    <div className="col-xs-12" style={{padding:"0px"}}><img src={imgWorkflow2} className="col-xs-12" style={{padding:"0px"}}/></div>
                    <div className="col-xs-12" style={{padding:"0px"}}><img src={imgWorkflow3} className="col-xs-12" style={{padding:"0px"}}/></div>
                    <div className="col-xs-12" style={{padding:"0px"}}><img src={imgWorkflow4} className="col-xs-12" style={{padding:"0px"}}/></div>
                </div>
            </div>
        )
    }
}
//export default connect(state => ({}))(Repay_Workflow);