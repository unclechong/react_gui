import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {
    Button,
    Col,
    Row,
    Icon,
    Input,
    Table,
    Popconfirm,
    message
} from 'antd';
import _ from 'underscore';
// import 'whatwg-fetch'
import NetUtil from './component/NetUtil.jsx'
import CategoryTree from './component/CategoryTree.jsx'

export default class Category extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tableDate: [],
            buttonAble1:true,
            buttonAble2:true,
            isEdit:false,
            editIndex:null,
            thisEditInputValue:"",
            thisTreeOnSelectedData:[],
            thisTreeOnSelectedKey:[],
            thisRemoveData:[],
            selectedRowKeys:[],
            pagination:{current:1}
        }

        this.columns = [
            {
                title: '类目名称',
                dataIndex: 'name',
                render: (text, record, index) => {
                    if (this.state.editIndex == index) {
                        if (!this.state.isEdit) {
                            return (
                                <div>
                                    {text || ' '}
                                </div>
                            )
                        }else{
                            return (
                                <div>
                                    <Input value={text} style={{width:'70%'}} onChange={this.editInputOnChange.bind(this,index,'name')}/>
                                </div>
                            )
                        }
                    }else {
                        return (
                            <div>
                                {text || ' '}
                            </div>
                        )
                    }
                }
            }, {
                width:'160px',
                title: '操作',
                dataIndex: 'operation',
                render: (text, record, index) => {
                    if (this.state.editIndex == index) {
                        return (
                            <div >
                                <Button type="primary" onClick={() => this.onSaveEdit(record)}>保存</Button>
                                <Button style={{marginLeft: 20 }} onClick={() => this.onCancelEdit(record)}>取消</Button>
                            </div>
                        )
                    }else {
                        return (
                            <div >
                                <Button type="primary" onClick={() => this.onEdit(index)} disabled={this.state.isEdit}>编辑</Button>
                                <Popconfirm title="确认删除？" onConfirm={() => this.onDelete(index)}>
                                    <Button disabled={this.state.isEdit} style={{
                                        marginLeft: 20
                                    }}>删除</Button>
                                </Popconfirm>
                            </div>
                        )
                    }
                }
            }
        ];
    }

    editInputOnChange = (index,key,e) => {
        let tableDate = [...this.state.tableDate];
        tableDate[index][key] = e.target.value;
        this.setState({ tableDate });
    }

    onSaveEdit = (record) => {
        let _this = this;
        // key = '--' 添加类目，
        //else 为编辑类目
        let selectedData = this.state.thisTreeOnSelectedData;
        let sendData = {};
        let {id,name} = record;
        let URL = "";
        //添加状态
        if (record.key == "--") {
            let thisTreeOnSelectedKey = _this.state.thisTreeOnSelectedKey[0];
            if (!selectedData.linkTablename) {
                //添加二级类目
                sendData = {...selectedData,catalogName:name};
                URL = 'http://192.168.1.253:8088/knowledgeRepository/catalog/addCatalogLibrary';
            }else {
                //添加>=三级类目
                let {linkTablename,pid} = selectedData;
                let flag_str = thisTreeOnSelectedKey.split('-');
                let _pid = flag_str.length==2?'0':pid;
                sendData = {linkTablename,pid:_pid,categoryName:name};
                URL = 'http://192.168.1.253:8088/knowledgeRepository/catalog/addCatalog';
            }
            NetUtil.sendBaseAjax(URL,sendData,respData=>{
                let tableDate = [...this.state.tableDate];
                //如果该分组下面未添加过，添加的第一个item    key为0
                let _key = tableDate.length==1?0:tableDate[tableDate.length-2].key+1;
                tableDate.forEach((item_t)=>{
                    item_t.key++
                })
                //点击添加的时候实际上是添加的空item,和一些标识，成功添加后， 重新渲染此item,把数据塞进去
                tableDate[0].name = name;
                tableDate[0].key = 0;
                tableDate[0].id = respData.id;
                //添加item成功之后，也要动态的去渲染左面的树，添加到对应的节点下
                let treeData = _this.refs.CategoryTree.state.treeData;
                let new_key = `${thisTreeOnSelectedKey}-${respData.id},${respData.linkTablename}`;
                const loop = (_data) => {
                    // if (level < 1 || curKey.length - 3 > level * 2) return;
                    _data.forEach((item) => {
                        if (thisTreeOnSelectedKey.indexOf(item.key) === 0) {
                            if (thisTreeOnSelectedKey == item.key) {
                                if (item.children) {
                                    item.children.push({name, key:new_key});
                                }
                            } else {
                                loop(item.children);
                            }
                        }
                    });
                };
                loop(treeData);
                // treeData
                //最后清空编辑状态， norror 不会删除添加的空item
                _this.onCancelEdit({key:'no_error'});
                message.success('新增成功');
            },'POST',(error_msg)=>{
                // console.log(error_msg.responseText);
                message.error(error_msg.responseText);
            })
        }else{
            if (!selectedData.linkTablename) {
                sendData = {...selectedData,id,catalogName:name};
                URL = 'http://192.168.1.253:8088/knowledgeRepository/catalog/updateCatalogLibrary';
            }else {
                let {linkTablename,pid} = selectedData;
                sendData = {linkTablename,id,pid,categoryName:name};
                URL = 'http://192.168.1.253:8088/knowledgeRepository/catalog/updateCatalog';
            }
            NetUtil.sendBaseAjax(URL,sendData,respData=>{
                let treeData = _this.refs.CategoryTree.state.treeData;
                let thisTreeOnSelectedKey = _this.state.thisTreeOnSelectedKey[0];
                const loop = (_data) => {
                    // if (level < 1 || curKey.length - 3 > level * 2) return;
                    _data.forEach((item) => {
                        if (thisTreeOnSelectedKey.indexOf(item.key) === 0) {
                            if (thisTreeOnSelectedKey == item.key) {
                                if (item.children) {
                                    item.children[record.key].name = name;
                                }
                            } else {
                                loop(item.children);
                            }
                        }
                    });
                };
                loop(treeData);
                _this.onCancelEdit({key:'no_error'});
                message.success('编辑成功');
            },'POST',(error_msg)=>{
                // console.log(error_msg.responseText);
                message.error(error_msg.responseText);
            })
        }
    }

    onCancelEdit = (record) => {
        if (record.key == '--') {
            let tableDate = this.state.tableDate;
            tableDate.shift();
            this.setState({tableDate})
        }
        this.setState({
            isEdit:false,
            editIndex:null,
            buttonAble1:false,
            selectedRowKeys:[]
        });
    }

    onEdit = (editIndex) => {
        this.setState({
            isEdit:true,
            editIndex,
            buttonAble1:true,
            selectedRowKeys:[editIndex]
        });
        if (!this.state.buttonAble2) {
            this.setState({
                buttonAble2: true
            });
        }
    }

    renderTable = (list, flag, data, curKey) => {
        //如果是编辑状态时，切换左边树时，清空编辑状态
        if (this.state.isEdit) {
            this.onCancelEdit({key:'no_error'});
        }
        //如果右边table为选中状态，切换左边树时，清空table选中，and，隐藏删除按钮
        if (this.state.selectedRowKeys.length!=0) {
            this.setState({
                selectedRowKeys:[],
                buttonAble2:true
            });
        }
        //切换table页签时，将页面重置为第一页
        if (this.state.pagination.current != 1) {
            let pagination = {...this.state.pagination,current:1}
            this.setState({pagination});
        }
        //反选时，清空table
        if (flag == '3') {
            this.setState({tableDate:[],buttonAble1:true,thisTreeOnSelectedData:[],thisTreeOnSelectedKey:[]});
        }else {
            let tableDate = [];
            let str = flag == '1'
                ? 'catalogName'
                : 'categoryName';
            _.map(list, (item, key) => {
                tableDate.push({name: item[str], key,id:item.id});
            })
            this.setState({tableDate,buttonAble1:false,thisTreeOnSelectedData:data,thisTreeOnSelectedKey:curKey});
        }
    }

    onDelete = (index) => {
        this.removeOnClick(index)
    }

    importOnClick = () => {
        message.warning('导入类目暂未实现！');
    }

    removeOnClick = (ctrl_id) => {
        let _this = this;
        let ids = [];
        let thisRemoveData = this.state.thisRemoveData;
        let data = this.state.tableDate;
        let thisTreeOnSelectedKey = _this.state.thisTreeOnSelectedKey[0];
        thisRemoveData.forEach((index)=>{
            ids.push(data[index].id);
        })
        if (ctrl_id=='sigin') {
            ids = ids.join(',');
        }else{
            ids = data[ctrl_id].id;
        }
        let keyLength = thisTreeOnSelectedKey.split('-').length;
        if (keyLength > 1) {
            let index = thisTreeOnSelectedKey.lastIndexOf(',');
            let linkTablename = thisTreeOnSelectedKey.substring(index+1,thisTreeOnSelectedKey.length);
            NetUtil.sendBaseAjax(`http://192.168.1.253:8088/knowledgeRepository//catalog/deleteCatalogBatch?ids=${ids}&linkTablename=${linkTablename}`,{},respData=>{
                //删除成功之后， 重新渲染左边的tree   动态删除左面树中的节点
                //渲染树之后 还要渲染右面的table 删除对应的item
                _this.refs.CategoryTree.onSelect(_this.state.thisTreeOnSelectedKey,'parent');
                message.success('删除成功');
            },'DELETE',(error_msg)=>{
                message.error(error_msg.responseText);
            })
        }else {
            NetUtil.sendBaseAjax(`http://192.168.1.253:8088/knowledgeRepository/catalog/deleteCatalogLibraryBatch?ids=${ids}`,{},respData=>{
                //删除成功之后， 重新渲染左边的tree   动态删除左面树中的节点
                //渲染树之后 还要渲染右面的table 删除对应的item
                _this.refs.CategoryTree.onSelect(_this.state.thisTreeOnSelectedKey,'parent');
                message.success('删除成功');
            },'DELETE',(error_msg)=>{
                message.error(error_msg.responseText);
            })
        }
    }

    addOnClick = () => {
        let _this = this;
        let tableDate = this.state.tableDate;
        if (tableDate.length==0 || tableDate[tableDate.length-1].key != "--") {
            let current = this.state.pagination.current;
            tableDate = [{name:"",key:'--'},...tableDate];
            this.setState({
                tableDate,
                editIndex:0,
                selectedRowKeys:['--'],
                isEdit:true,
                buttonAble2:true
            });
        }
    }

    tableOnChange(obj){
        this.setState({
            pagination:obj,
            selectedRowKeys:[],
            buttonAble2: true,
        });
        if (this.state.isEdit) {
            let tableDate = this.state.tableDate;
            tableDate.shift();
            this.setState({tableDate,isEdit:false,editIndex:null,})
        }
    }

    render() {
        const rowSelection = {
            onChange: (selectedRowKeys, selectedRows) => {
                this.setState({
                    thisRemoveData:selectedRowKeys,
                    selectedRowKeys,
                    buttonAble2:selectedRows.length!=0?false:true,
                })
            },
            onSelectAll:(selected, selectedRows, changeRows) => {
                this.setState({
                    buttonAble2:selectedRows.length!=0?false:true,
                });
            },
            selectedRowKeys:this.state.selectedRowKeys,
            getCheckboxProps: record => ({
                disabled: this.state.isEdit?true:false, // Column configuration not to be checked
            })
        };
        return (
            <Row gutter={40} style={{
                padding: '0 20px'
            }}>
                <Col span={4}>
                    <div className="st_menu_title"><Icon type="bars"/>
                        类目库</div>
                    <CategoryTree ref='CategoryTree' renderTable={this.renderTable} />
                </Col>
                <Col span={20}>
                    <Button onClick={this.importOnClick} type="primary" icon="download" size='default' style={{
                        height: 32
                    }} disabled={this.state.isEdit}>导入类目</Button>
                    <Button onClick={this.addOnClick} type="primary" icon="plus" size='default' style={{
                        marginLeft: 10,
                        height: 32,
                        display:this.state.buttonAble1?'none':'inline-block'
                    }} disabled={this.state.isEdit}>新增类目</Button>
                    <Button onClick={this.removeOnClick.bind(this,'sigin')} icon="close" size='default' style={{
                        marginLeft: 10,
                        height: 32,
                        display:this.state.buttonAble2?'none':'inline-block'
                    }}>删除选中类目</Button>
                    <Input placeholder="输入关键字" addonAfter={< Icon type = "search" />} style={{
                        width: '18%',
                        float: 'right',
                    }}/>
                    <div style={{
                        marginTop: 20
                    }}>
                        <Table className="category-table" rowSelection={rowSelection} onChange={this.tableOnChange.bind(this)} columns={this.columns} dataSource={this.state.tableDate} bordered pagination={this.state.pagination} />
                    </div>
                </Col>
            </Row>
        )
    }
}

function initComponent() {
    ReactDOM.render(
        <Category/>, document.getElementById("category-container"))
}

$(document).ready(function() {
    initComponent();
})
