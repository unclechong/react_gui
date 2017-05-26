import React from 'react';
import ReactDOM from 'react-dom';

export default class Runcondition extends React.Component{

  	constructor(props){
        super(props);

        this.state={
   			nowDate:"",
   			arr_val_list:[["",""],["",""],["",""]],
   			arr_count:2,
   			disabled:true
        };
    }

    addItem(){
    	var add_name = ["",""];
    	var list = this.state.arr_val_list;
    	var last_one = list.pop();
    	list.push(add_name);
    	list.push(last_one);
    	var index = list.length;
    	list[index-2][0] = list[index-3][1];
		list[index-1][0] = list[index-2][1];
    	this.setState({
    		arr_val_list:list,
    		arr_count:this.state.arr_count+1
    	})
    }

    removeItem(i){
    	var list = this.state.arr_val_list;
    	list.splice(i,1);
		list[i][0] = list[i-1][1];
    	this.setState({
    		arr_val_list:list,
    		arr_count:this.state.arr_count-1
    	})
    }

    inputOnchange(e,i,k){
    	var list = this.state.arr_val_list;
    	list[e][i] = k.target.value;
		list[e+1][i-1] = k.target.value
    	this.setState({
    		arr_val_list:list
    	})
    }

	render(){
		return(
			<div>
     			{    
     				this.state.arr_val_list.map((val,key) => (
     					key == 0?<div key={key} style={{marginBottom:"10px"}}>区间1 [&nbsp; -∞ ， &nbsp;<input type="text" value={val[1]} onChange={this.inputOnchange.bind(this,key,"1")} /> &nbsp;]<br />
						</div>:key == this.state.arr_val_list.length-1?<div key={key} style={{marginBottom:"10px"}}>区间{key+1} [ &nbsp; <input type="text" value={val[0]} disabled={this.state.disabled} onChange={this.inputOnchange.bind(this,key,"0")} /> ， &nbsp;+∞&nbsp; ]<br />
						</div>:<div key={key} style={{marginBottom:"10px"}}>区间{key+1} [ &nbsp; <input value={val[0]} disabled="disabled" type="text" onChange={this.inputOnchange.bind(this,key,"0")} /> ， &nbsp;<input type="text" value={val[1]} onChange={this.inputOnchange.bind(this,key,"1")} />&nbsp; ]<button type="button" className="close" onClick={this.removeItem.bind(this,key)}>
 							<span>×</span></button><br />
						</div>
		    		))
    			}
                <a href="javascript:void(0)" onClick={this.addItem.bind(this)} style={{display:"block",marginTop:"10px"}}><i className="fa fa-plus"></i> 增加区间</a>
			</div>
		)
	}
}
