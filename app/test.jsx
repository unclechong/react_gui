import React from 'react';
import ReactDOM from 'react-dom';
import {Tree} from 'antd';
const TreeNode = Tree.TreeNode;

class Demo extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            defaulkey:[],
            DOM:[]
        }
    }
    // test(){
    //     return(
    //
    //     )
    // }
    componentWillMount(){
            this.setState({
                defaulkey: ['0-0-0'],
            },()=>{
                console.log(222);
            });
            console.log(this.state.defaulkey);
    }
    onSelect = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    }
    onCheck = (checkedKeys, info) => {
        console.log('onCheck', checkedKeys, info);
    }
    render() {
        console.log(111);
        return (
            <Tree checkable defaultExpandedKeys={['0-0-0', '0-0-1']} defaultSelectedKeys={this.state.defaulkey} defaultCheckedKeys={['0-0-0', '0-0-1']} onSelect={this.onSelect} onCheck={this.onCheck}>
                <TreeNode title="parent 1" key="0-0">
                    <TreeNode title="parent 1-0" key="0-0-0" >
                        <TreeNode title="leaf" key="0-0-0-0" disableCheckbox/>
                        <TreeNode title="leaf" key="0-0-0-1"/>
                    </TreeNode>
                    <TreeNode title="parent 1-1" key="0-0-1">
                        <TreeNode title={< span style = {{ color: '#08c' }} > sss < /span>} key="0-0-1-0"/>
                    </TreeNode>
                </TreeNode>
            </Tree>
        );
    }
}

function initComponentA(){
	ReactDOM.render(
		<Demo />,
		document.getElementById("container")
	)
}

$(document).ready(function(){
	initComponentA();
})
