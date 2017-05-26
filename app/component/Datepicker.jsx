import React from 'react';
import ReactDOM from 'react-dom';
var moment = require('moment');
var DateRangePicker  = require('react-bootstrap-daterangepicker');

export default class Datepicker extends React.Component{

  	constructor(props){
        super(props);

        this.state={
   			nowDate:""
        };
    }

    datehandleEvent(event, picker){
    	if(this.props.dateOnchange){
    		this.props.dateOnchange(picker.startDate.format("L"))
    	}
    	this.setState({
    		nowDate:picker.startDate.format("L")
    	})
    }

	render(){
		return(
			<div>
	            <DateRangePicker className="input-group form_date" singleDatePicker={true} opens="left" showDropdowns={true} onEvent={this.datehandleEvent.bind(this)}>
                    <input className="form-control " size="16" type="text" value={this.state.nowDate} placeholder="选择时间" /> 
                    <span className="input-group-addon"> <a href="#"><i className="fa fa-calendar"></i></a></span>
        		</DateRangePicker>
			</div>
		)
	}
}
