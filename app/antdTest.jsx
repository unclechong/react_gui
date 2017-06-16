import React from 'react';
import ReactDOM from 'react-dom';
import {Tree} from 'antd';
import $ from 'jQuery'
import _ from 'underscore';
const TreeNode = Tree.TreeNode;

function sendAjax(url, data, callback) {
    var promise = new Promise(function (resolve, reject) {
        $.ajax({
            url: url,
            type: data == null ? 'GET' : 'POST',
            dataType: "json",
            data: data == null ? '' : data,
            async: true,
            contentType: "application/json",
            success: function (data) {
                callback(data);
                resolve();
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == "401") {
                    // window.parent.location = '/enterprise/enterprise_login.html';
                    // self.location = '/enterprise/enterprise_login.html';
                    //jump  报错页面 或 报错信息
                } else {
                    alert(XMLHttpRequest.responseText);
                }
                reject();
            }
        });
    });
    return promise;
}

function generateTreeNodes(treeNode) {
    const arr = [];
    const key = treeNode.props.eventKey;
    for (let i = 0; i < 3; i++) {
        arr.push({name: `leaf ${key}-${i}`, key: `${key}-${i}`});
    }
    return arr;
}

function setLeaf(treeData, curKey, level) {
    const loopLeaf = (data, lev) => {
        const l = lev - 1;
        data.forEach((item) => {
            if ((item.key.length > curKey.length)
                ? item.key.indexOf(curKey) !== 0
                : curKey.indexOf(item.key) !== 0) {
                return;
            }
            if (item.children) {
                loopLeaf(item.children, l);
            } else if (l < 1) {
                item.isLeaf = true;
            }
        });
    };
    loopLeaf(treeData, level + 1);
}

function getNewTreeData(treeData, curKey, child, level) {
    const loop = (data) => {
        if (level < 1 || curKey.length - 3 > level * 2)
            return;
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
    setLeaf(treeData, curKey, level);
}

class Demo extends React.Component {
    state = {
        treeData: []
    }
    componentDidMount() {
        setTimeout(() => {
            this.setState({
                treeData: [
                    {
                        name: 'pNode 01',
                        key: '0-0'
                    }, {
                        name: 'pNode 02',
                        key: '0-1'
                    }, {
                        name: 'pNode 03',
                        key: '0-2'
                    }
                ]
            });
        }, 100);
    }
    onSelect = (info) => {
        console.log('selected', info);
    }
    onLoadData = (treeNode) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const treeData = [...this.state.treeData];
                getNewTreeData(treeData, treeNode.props.eventKey, generateTreeNodes(treeNode), 2);
                this.setState({treeData});
                resolve();
            }, 1000);
        });
    }

    test = () =>{
        function test1(time)  {
            return new Promise((resolve) =>{
                console.log(1111);
                setTimeout(function(){
                    console.log(222);
                    resolve();
                },time)
            })
        }
        let test2 =  new Promise((resolve) =>{
            setTimeout(function(){
                resolve();
            },2000)
        })
        test1(1000).then(()=>{
            return test1(2000);
        }).then(()=>{
            console.log('in 2');
        })
    }

    render() {
        const loop = data => data.map((item) => {
            if (item.children) {
                return <TreeNode title={item.name} key={item.key}>{loop(item.children)}</TreeNode>;
            }
            return <TreeNode title={item.name} key={item.key} isLeaf={item.isLeaf} disabled={item.key === '0-0-0'}/>;
        });
        const treeNodes = loop(this.state.treeData);
        return (
            <div>
                <Tree onSelect={this.onSelect} loadData={this.onLoadData}>
                    {treeNodes}
                </Tree>
                <a onClick={this.test}>ssssssssssssss</a>
            </div>

        );
    }
}

function initComponentA() {
    ReactDOM.render(
        <Demo/>, document.getElementById("container"));
}

$(document).ready(function() {
    initComponentA();
})
