import React from 'react';
import ReactDOM from 'react-dom';
import {Nav , NavItem} from 'react-bootstrap';

import Selectgroup from './component/Selectgroup';

const NavComponent = React.createClass({

	getInitialState:function(){
		return {
			activeKey:1,
		}
	},

	onSelectHandle:function(key){
		this.setState({
			activeKey:key
		})
	},

	renderForm:function(){
		return(
			<div>
				<Selectgroup replaceType={this.state.activeKey}/>
			</div>
		)
	}, 

	render:function(){
		return(
			<div>	
		        <Nav bsStyle="tabs" activeKey={this.state.activeKey} onSelect={this.onSelectHandle}>
		            <NavItem eventKey={1} >标签统计</NavItem>
		            <NavItem eventKey={2} title="Item">属性统计</NavItem>
		        </Nav>
		        {this.renderForm()}
			</div>
		)
	}
})

function initComponent(){
	ReactDOM.render(
		<NavComponent />,
		document.getElementById("render-container")
	)
}

$(document).ready(function(){
	initComponent()
})
