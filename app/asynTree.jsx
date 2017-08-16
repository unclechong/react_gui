import React from 'react';
import ReactDOM from 'react-dom';
import { Collapse, Icon, Radio } from 'antd';
const Panel = Collapse.Panel;
import _ from 'underscore';
import './css/index.css';
// import arrow_right from './images/arrow-right.png';
// import arrow_down from './images/arrow-down.png';
const __data_ = {
    data:[
        {
            name:'一层1',
            child:[
                {name:'子1'},
                {name:'子2'},
                {name:'子3'},
                {name:'子4'},
                {name:'子5'},
                {name:'子6'},
                {name:'子7'}
            ]
        },
        {
            name:'一层2',
            child:[
                {name:'子1'},
            ]
        },
        {
            name:'一层3',
            child:[
                {name:'子1'},
                {name:'子2'},
            ]
        },
        {
            name:'一层4',
        },
        {
            name:'一层5',
        },
        {
            name:'一层6',
            child:[
                {name:'子1'},
                {name:'子2'},
            ]
        },
        {
            name:'一层7',
        },
    ]
}
let TYPE = '';

class Tree extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            treeNodes:[],                            //所有节点集合
            haveMoreBtn:false,                       //是否含有更多按钮，也就是节点是否大约三个
            showTreeNodeTotal:0,                     //已经展示的节点总数
            isAdd:true,                              //点击节点下面的按钮时，是加载更多还是收起全部的标志
            showInfo:'...更多'                       //节点下面按钮的显示信息，
        }
    }

    componentDidMount(){
        this.setState({
            treeNodes:this.initTreeNode(),
            haveMoreBtn:this.props.children.length>3,
            showTreeNodeTotal:3
        });
    }

    //初始化节点，渲染前三个
    initTreeNode(){
        let treeNodes = [];
        let children = this.props.children;
        for (var i = 0; i < 3; i++) {
            treeNodes.push(children[i])
        }
        return treeNodes
    }

    // 点击节点后按钮触发的方法
    handleShowMore(add){
        if (add) {  //若为加载更多状态
            let treeNodes = [];
            let children = this.props.children;
            let num = this.state.showTreeNodeTotal;
            let isFinial = false;
            let forIndex = 0;
            for (var i = num; i < num+3; i++) {
                forIndex ++;
                if (children[i] != undefined) {
                    treeNodes.push(children[i])
                }else {
                    isFinial = true;
                    break
                }
            }
            if (isFinial) { //判断是否已经将节点全部加载完
                this.setState({
                    isAdd: false,
                    showInfo:'收起',
                    treeNodes:[...this.state.treeNodes,treeNodes],
                    showTreeNodeTotal:this.state.showTreeNodeTotal+forIndex
                });
            }else {
                this.setState({
                    treeNodes:[...this.state.treeNodes,treeNodes],
                    showTreeNodeTotal:this.state.showTreeNodeTotal+3
                });
            }
        }else {
            this.setState({
                treeNodes:this.initTreeNode(),
                haveMoreBtn:this.props.children .length>3,
                showTreeNodeTotal:3,
                isAdd:true,
                showInfo:'...更多',
            });
        }
    }

    render() {
        return (
            <ul className={this.props.className}>
                {this.state.treeNodes}
                {this.state.haveMoreBtn?<li onClick={this.handleShowMore.bind(this,this.state.isAdd)} style={{paddingLeft:this.props.paddingLeft,cursor: 'default'}}>{this.state.showInfo}</li>:undefined}
            </ul>
        );
    }
}

class TreeNode extends React.Component{

    constructor(props){
        super(props);

        this.state = {
            isShow:false
        }
    }

    showChildrend(){
        if (this.props.children) {
            this.setState({
                isShow: !this.state.isShow
            });
        }
    }

    render() {
        let name = TYPE == 'radio'?'radio':'checkbox'
        return (
            <li className="treefirst_1">
                <span onClick={this.showChildrend.bind(this)} style={{width:10,display:'inline-block'}}>{this.props.children?<img  />:undefined}</span>
            <span><input style={{verticalAlign:'middle',marginLeft: 5}} type={TYPE} name={name} /></span>
                <span onClick={this.showChildrend.bind(this)} className="treetwo_1">{this.props.name}</span>
                {this.props.children?<span style={{display:this.state.isShow?'block':'none'}}>{this.props.children}</span>:undefined}
            </li>
        );
    }
}

class TreeChild extends React.Component{

    render(){
        const loop = data => data.map((item,index) => {
        if (item.child) {
            return <TreeNode name={item.name} key={index}><Tree className='treetwo' paddingLeft={53}>{loop(item.child)}</Tree></TreeNode>;
        }
        return <TreeNode name={item.name} key={index} />;
        });
        const treeNodes = loop(__data_.data);
        return (
            <Tree className='treefirst' paddingLeft={38}>
                {treeNodes}
            </Tree>
        );
    }
}

export default class AsynTree extends React.Component {

    constructor(props) {
        super(props);

        this.state = {}
        TYPE = this.props.type;
        TYPE = 'checkbox';
    }

    render() {
        return (
            <Collapse bordered={false} defaultActiveKey={['1','2','3','4']} style={{borderRadius: 0,background:'#f5f5f5'}}>
                <Panel header="主题" key="1">
                    <TreeChild treeData={__data_.data} index='1' />
                </Panel>
                <Panel header="上市公司" key="2">
                    234324
                </Panel>
                <Panel header="来源" key="3">
                    1111
                </Panel>
                <Panel header="其他实体" key="4">
                    1111
                </Panel>
            </Collapse>
        );
    }
}

function initComponentA() {
    ReactDOM.render(
        <AsynTree/>, document.getElementById("container"))
}

$(document).ready(function() {
    initComponentA();
})
