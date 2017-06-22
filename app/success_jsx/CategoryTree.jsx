import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Tree
} from 'antd';
import _ from 'underscore';
// import 'whatwg-fetch'
const TreeNode = Tree.TreeNode;
import NetUtil from './NetUtil.jsx'

const baseURL = 'http://192.168.1.253:8088/knowledgeRepository';

export default class CategoryTree extends Component {

    state = {
        treeData: []
    }

    componentDidMount() {
        // console.log(this.props.dataSource);
        // GET /catalog/getCatalogLibraryByGroupId
        // GET /catalog/getTree
        let _this = this;
        let treeData = [];
        if (this.props.doType == 'entity') {
            _.map(this.props.dataSource, (item, key) => {
                // console.log(item);
                // let disableCheckbox = _this.props.doType=='entityType'?true:false;
                treeData.push({name: item.catalogName, key: `${key}-${item.catalogLibraryId},${item.linkTablename}`, disableCheckbox:true});
            })
            _this.setState({treeData});
        }else {
            NetUtil.get(`${baseURL}/catalog/getTree`,{type: 'group'},respData=>{
                _.map(respData.list, (item, key) => {
                    let disableCheckbox = _this.props.doType=='entityType'?true:false;
                    treeData.push({name: item.catalogGroupName, key: item.id, disableCheckbox});
                })
                _this.setState({treeData});
            })
        }
    }

    // shouldComponentUpdate(nextProps,nextState){
    //
    // }

    renderChild = (list,key) => {
        let arr = [];
        _.map(list,(item,k)=>{
            let name = key.indexOf('-')<0?item.catalogName:item.categoryName;
            arr.push({name, key: `${key}-${item.id},${item.linkTablename}`,isLeaf:this.props.doType=='entityType'?true:false});
        })
        return arr;
    }

    setTreeData = (treeData, curKey, child) => {
        const loop = (data) => {
            // if (level < 1 || curKey.length - 3 > level * 2) return;
            data.forEach((item) => {
                if (curKey.indexOf(item.key) === 0) {
                    if (item.children) {
                        loop(item.children);
                    } else {
                        item.children = child;
                    }
                }
            });
        };
        loop(treeData);
        // setLeaf(treeData, curKey, level);
    }

    onLoadData = (treeNode) => {
        let _this = this;
        let groupId = treeNode.props.eventKey;
        let sendData = {}
        if (groupId.indexOf('-') < 0) {
            sendData = {
                type:'catalogLibrary',
                groupId
            }
        }else {
            let {pid,linkTablename} = this.getParams(groupId);
            pid = groupId.split('-').length == 2?'0':pid;
            sendData = {
                type:'catalog',
                linkTablename,
                categoryName:'',
                pid
            }
        }
        let treeData = this.state.treeData;
        return new Promise((resolve) => {
            NetUtil.get(`${baseURL}/catalog/getTree`,sendData,respData=>{
                _this.setTreeData(treeData, groupId, _this.renderChild(respData.list,groupId));
                _this.setState({treeData},()=>{
                    resolve();
                });
            })
        });
    }

    setOnLoadData = (groupId,respData) => {
        let treeData = this.state.treeData;
        this.setTreeData(treeData, groupId, this.renderChild(respData.list,groupId));
        this.setState({treeData});
    }

    //取参数
    getParams(str){
        let index = str.lastIndexOf('-');
        let index_2 = str.lastIndexOf(',');
        let pid = str.substring(index+1,index_2);
        let linkTablename = str.substring(index_2+1,str.length);
        return {pid,linkTablename}
    }

    onSelect = (curKey,flag) => {
        let _this = this;
        if (curKey.length > 0) {
            let arr = curKey[0].split("-");
            let sendData = {};
            if (arr.length == 1) {
                let groupId = arr[0];
                NetUtil.get(`${baseURL}/catalog/getTree`,{type:'catalogLibrary',groupId},respData=>{
                    if (_this.props.renderTable) {
                        _this.props.renderTable(respData.list,'1',{groupId},curKey);
                        if (flag=='parent') {
                            let treeData = _this.state.treeData
                            const loop = (_data) => {
                                _data.forEach((item) => {
                                    if (curKey[0].indexOf(item.key) === 0) {
                                        if (curKey[0] == item.key) {
                                            if (item.children) {
                                                item.children = _this.renderChild(respData.list,curKey[0])
                                            }
                                        } else {
                                            loop(item.children);
                                        }
                                    }
                                });
                            };//biejimanmanl
                            loop(treeData);
                            _this.setState({treeData});
                        }
                    }
                })
            }else if (arr.length >= 2) {
                let str = arr[arr.length-1]
                let {pid,linkTablename} = this.getParams(str);
                pid = arr.length == 2?'0':pid;
                let sendData = {
                    type:'catalog',
                    linkTablename,
                    categoryName:'',
                    pid
                }
                NetUtil.get(`${baseURL}/catalog/getTree`,sendData,respData=>{
                    if (_this.props.renderTable) {
                        _this.props.renderTable(respData.list,'2',sendData,curKey);
                        if (flag=='parent') {
                            let treeData = _this.state.treeData
                            const loop = (_data) => {
                                _data.forEach((item) => {
                                    if (curKey[0].indexOf(item.key) === 0) {
                                        if (curKey[0] == item.key) {
                                            if (item.children) {
                                                item.children = _this.renderChild(respData.list,curKey[0])
                                            }
                                        } else {
                                            loop(item.children);
                                        }
                                    }
                                });
                            };
                            loop(treeData);
                            _this.setState({treeData});
                        }
                    }
                })
            }
        }else {
            _this.props.renderTable([],'3');
        }
    }

    thisTreeOnCheck = (key,node) => {
        if (this.props.doType) {
            let forMap = node.checkedNodes;
            let data = [];
            _.map(forMap,(item,key)=>{
                let keyArr = item.key.split('-');
                if (keyArr.length > 1) {
                    let [catalogLibraryId,linkTablename] = keyArr.pop().split(',');
                    if (this.props.doType == 'entityType') {
                        data.push({catalogName:item.props.title, linkTablename, catalogLibraryId});
                    }else{
                        data.push({catalogName:item.props.title, catalogId:catalogLibraryId});
                    }
                }
            })
            if (this.props.cTreeOnCheck) {
                this.props.cTreeOnCheck(data);
            }
        }
    }

    render() {
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key} disableCheckbox={item.disableCheckbox}>{loop(item.children) }</TreeNode>;
            }
            return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disableCheckbox={item.disableCheckbox}/>;
        });
        const treeNodes = loop(this.state.treeData);
        return (
            <Tree onSelect={this.onSelect} loadData={this.onLoadData} checkable={this.props.doType} onCheck={this.thisTreeOnCheck}>
                {treeNodes}
            </Tree>
        )
    }
}
