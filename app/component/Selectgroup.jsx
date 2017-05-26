import React from 'react';
import ReactDOM from 'react-dom';
import {FormGroup , ControlLabel , FormControl , Col , Button , Modal , Radio , Form} from 'react-bootstrap';
import Datepicker from './Datepicker';
import Runcondition from './Runcondition';

var moment = require('moment');
var DateRangePicker  = require('react-bootstrap-daterangepicker');

export default class Selectgroup extends React.Component{

  	constructor(props){
        super(props);

        this.state={
   			nowDate:"",
   			modalShow:false,
        };
    }

    dateOnchangeh(val){
    	console.log(val)
    }

    showModalClick(){
    	this.setState({
    		modalShow:!this.state.modalShow
    	})
    }

	render(){
		return(
			<div>
				<Col sm={12}>
					{this.props.replaceType == 1?<FormGroup className="col-sm-12 count_sx" controlId="formControlsSelect">
				        <FormControl className="count_sx" componentClass="select" placeholder="select">
					        <option value="select">标签组</option>
					        <option value="select">属性字段</option>
				        </FormControl>
				        <FormControl className="count_sx" componentClass="select" placeholder="select">
					        <option value="select">融资组标签</option>
					        <option value="select">收入组标签</option>
				        </FormControl>
			            <Datepicker dateOnchange={this.dateOnchangeh.bind(this)}/>
	            		<Button bsStyle="primary" bsSize="sm" active>确定</Button>
				    </FormGroup>:<FormGroup className="col-sm-12 count_sx" controlId="formControlsSelect">
				        <FormControl className="count_sx" componentClass="select" placeholder="select">
					        <option value="select">客户负债表</option>
					        <option value="select">客户基本信息表</option>
				        </FormControl>
				        <FormControl className="count_sx" componentClass="select" placeholder="select">
					        <option value="select">融资金额</option>
					        <option value="select">年日均资产</option>
				        </FormControl>
			            <Datepicker dateOnchange={this.dateOnchangeh.bind(this)}/>
			            <Button bsSize="sm" style={{marginRight:'20px'}} onClick={this.showModalClick.bind(this)} >分段设置</Button>
	            		<Button bsStyle="primary" bsSize="sm" active>确定</Button>
				    </FormGroup>}
				</Col>
				<Modal bsSize="large" onHide={this.showModalClick.bind(this)} aria-labelledby="contained-modal-title-lg" show={this.state.modalShow}>
			        <Modal.Header closeButton>
			            <Modal.Title id="contained-modal-title-lg">分段设置</Modal.Title>
			        </Modal.Header>
			        <Modal.Body>
			        	<Form inline>
			        		<FormGroup >
					            <Radio name="radioGroup" />&nbsp;&nbsp;等间隔分段&nbsp;&nbsp;默认分为 &nbsp;&nbsp;
								<input type="text" /><br />
					            <Radio name="radioGroup" />&nbsp;&nbsp;自定义分段 &nbsp;&nbsp;<br />
					            <Runcondition />
							</FormGroup><br />
			        	</Form>
			        </Modal.Body>
			        <Modal.Footer>
				        <Button bsStyle="primary">确定</Button>
				        <Button onClick={this.showModalClick.bind(this)}>取消</Button>
			        </Modal.Footer>
				</Modal>
			</div>	
		)
	}
}
