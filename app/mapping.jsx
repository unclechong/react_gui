import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Icon, Select, Tooltip, message} from 'antd';
import _ from 'underscore';
import ConsoleComponent from './component/ConsoleComponent.jsx'
import ZoomCharts from './component/ZoomCharts.jsx'
import NetUtil from '../common/NetUtil.jsx'
import './css/index.css'
const Option = Select.Option;

class ShowInfoComponent extends Component {

    constructor(props){
        super(props);

        //核心主体的id
        this.choise_id = null;
        //核心主体的类型id
        this.coreEntityTypeId = null;
        this.one_data = [];                 //一层的数据
        this.else_data = [];                //除了一层之外的数据
        this.all_data = [];                 //所有的数据
        this.checkOneNodes = [];            //一层数据时所有的节点实体ID
        this.checkElseNodes = [];           //除了一层数据其他所有的节点实体ID
        this.checkAllNodes = [];            //所有的节点实体ID
        this.filterOption = [];           //上次点击过的实体筛选个数
        this.removeLinkLib = [];            //已经筛选删除的关系库
        this.linksData = [];                //筛选之后剩余的关系库

        this.state = {
            isDouble:false,
            relationTypeList:[],
            entityTypeList:[],
            categoryList:[],
            show_info:{},
            backParamContainer:[],
            netData:{nodes:[],links:[]},
            replaceFlag:0,
            focusNodes:null
        }
    }
//25829
//36297
//24718 铁路客运
//28123   一层是数据较多
//18091
    componentDidMount(){
        let _this = this;
        NetUtil.get(`/relation/getRelation`,{entityIds: '18091'},respData=>{
            _this.choise_id = '18091';
            _this.coreEntityTypeId = respData.entityList[0].entityTypeId;
            // this.formatJson(respData,'28123');
            let {nodes,links,relationTypeList,entityTypeList,categoryList} = this.formatJson(respData,'18091');
            _this.linksData = [].concat(links);
            _this.filterOption = entityTypeList;

            let obj = {
                title:respData.entityList[0].entityName,
                content:respData.entityList[0].entityArributeList
            }
            let num = this.state.replaceFlag;
            num++;
            _this.setState({
                replaceFlag:num,
                focusNodes:'18091',
                netData:{nodes,links},
                relationTypeList,
                entityTypeList,
                categoryList,
                show_info:obj
            });
            _this.formatElseJson(respData,'18091');
        })
    }

    formatJson(respData, _id){
        //一层时节点和线集合
        let one_nodes = [];
        let one_links = [];
        //实体类型和关系类型集合
        let relationTypeList = [];
        let entityTypeList = [];
        //循环一层数据时，判断实体类型和关系类型是否重复的变量
        let entitySet = [];
        let relationSet = [];
        //循环一层数据时，判断节点是否重复的变量
        let checkOneNodes = [];
        let relationList = respData.relationList;

        for(let i=0;i<relationList.length;i++){
            //一层数据时，默认显示，需要做部分
            let item = relationList[i];
            if (item.entityId1 == _id || item.entityId2 == _id) {
                one_links.push({
                    id:item.id,
                    from:item.entityId1,
                    fromid:item.entityTypeId1,
                    fromname:item.entityName1,
                    to:item.entityId2,
                    toid:item.entityTypeId2,
                    toname:item.entityName2,
                    type:item.relationTypeId,
                    style:{ "fromDecoration":"arrow"}
                })
                if (checkOneNodes.indexOf(item.entityId1) < 0) {
                        one_nodes.push({
                            id:item.entityId1,
                            typeid:item.entityTypeId1,
                            style:{label:item.entityName1}
                        });
                    checkOneNodes.push(item.entityId1);
                }
                if (checkOneNodes.indexOf(item.entityId2) < 0) {
                    one_nodes.push({
                        id:item.entityId2,
                        typeid:item.entityTypeId2,
                        style:{label:item.entityName2}
                    });
                    checkOneNodes.push(item.entityId2);
                }
                //循环实体类型
                if (entitySet.indexOf(item.entityTypeId1) < 0) {
                    if (item.entityTypeId1 != this.coreEntityTypeId) {
                        entitySet.push(item.entityTypeId1);
                        entityTypeList.push({entityTypeName:item.entityTypeName1,id:item.entityTypeId1});
                    }
                }
                if (entitySet.indexOf(item.entityTypeId2) < 0) {
                    if (item.entityTypeId2 != this.coreEntityTypeId) {
                        entitySet.push(item.entityTypeId2);
                        entityTypeList.push({entityTypeName:item.entityTypeName2,id:item.entityTypeId2});
                    }
                }
                //如果节点两边都是主体的实体类型的数据，则需要添加进节点选择里面
                if (entitySet.indexOf(item.entityTypeId2) < 0) {
                    if (item.entityTypeId1 == item.entityTypeId2) {
                        entitySet.push(item.entityTypeId1);
                        entityTypeList.push({entityTypeName:item.entityTypeName1,id:item.entityTypeId1});
                    }
                }
                //循环关系类型
                if (relationSet.indexOf(item.relationTypeId) < 0) {
                    relationSet.push(item.relationTypeId);
                    relationTypeList.push({id:item.relationTypeId,relationTypeName:item.relationTypeName});
                }
            }
        }
        let entityCatalogList = respData.entityCatalogList;
        let categoryList = {};
        for(let i=0;i<entityCatalogList.length;i++){
            let item = entityCatalogList[i];
            if (categoryList[item.entityTypeId] == undefined) {
                categoryList[item.entityTypeId] = {};
                categoryList[item.entityTypeId][item.folkonomyName] = [{categoryName:item.catalogId}];
            }else {
                if (categoryList[item.entityTypeId][item.folkonomyName] == undefined) {
                    categoryList[item.entityTypeId][item.folkonomyName] = [{categoryName:item.catalogId}];
                }else {
                    categoryList[item.entityTypeId][item.folkonomyName].push({categoryName:item.catalogId});
                }
            }
        }
        this.checkOneNodes = checkOneNodes;
        this.one_data = {nodes:one_nodes,links:one_links,relationTypeList,entityTypeList,categoryList};
        return {nodes:one_nodes,links:one_links,relationTypeList,entityTypeList,categoryList}
    }

    formatElseJson(respData,_id){
        //两层数据时需要的变量
        let else_nodes = [];
        let else_links = [];
        //循环两层数据时，判断节点是否重复的变量
        let checkElseNodes = [];
        let relationList = respData.relationList;
        // let checkOneNodes = this.checkOneNodes;
        let all_links = [];
        let checkAllNodes = [];
        let all_nodes = [];
        for(let i=0;i<relationList.length;i++){
            //一层数据时，默认显示，需要做部分
            let item = relationList[i];
            // if (item.entityId1 != _id && item.entityId2 != _id) {
            //     else_links.push({
            //         id:item.id,
            //         from:item.entityId1,
            //         fromid:item.entityTypeId1,
            //         fromname:item.entityName1,
            //         to:item.entityId2,
            //         toid:item.entityTypeId2,
            //         toname:item.entityName2,
            //         type:item.relationTypeId,
            //     });
            //     if (checkOneNodes.indexOf(item.entityId1) < 0 && checkElseNodes.indexOf(item.entityId1) < 0) {
            //             else_nodes.push({
            //                 id:item.entityId1,
            //                 typeid:item.entityTypeId1,
            //                 // name:'111',
            //                 style:{label:item.entityName1}
            //             });
            //         checkElseNodes.push(item.entityId1);
            //     }
            //     if (checkOneNodes.indexOf(item.entityId2) < 0 && checkElseNodes.indexOf(item.entityId2) < 0) {
            //         else_nodes.push({
            //             id:item.entityId2,
            //             typeid:item.entityTypeId2,
            //             style:{label:item.entityName2}
            //         });
            //         checkElseNodes.push(item.entityId2);
            //     }
            // }
            all_links.push({
                id:item.id,
                from:item.entityId1,
                fromid:item.entityTypeId1,
                fromname:item.entityName1,
                to:item.entityId2,
                toid:item.entityTypeId2,
                toname:item.entityName2,
                type:item.relationTypeId,
            })
            if (checkAllNodes.indexOf(item.entityId1) < 0) {
                    all_nodes.push({
                        id:item.entityId1,
                        typeid:item.entityTypeId1,
                        style:{label:item.entityName1}
                    });
                checkAllNodes.push(item.entityId1);
            }
            if (checkAllNodes.indexOf(item.entityId2) < 0) {
                all_nodes.push({
                    id:item.entityId2,
                    typeid:item.entityTypeId2,
                    style:{label:item.entityName2}
                });
                checkAllNodes.push(item.entityId2);
            }
        }
        // this.checkElseNodes = checkElseNodes;
        // this.else_data = {nodes:else_nodes,links:else_links,relationTypeList:respData.relationTypeList,entityTypeList:respData.entityTypeList};
        this.checkAllNodes = checkAllNodes;
        this.all_data = {nodes:all_nodes,links:all_links,relationTypeList:respData.relationTypeList,entityTypeList:respData.entityTypeList};
    }

    checkboxOnChange(type,val){
        //筛选条件为实体类型时
        if (type == 'entity') {
            // let {nodes,links} = this.state.isDouble?this.all_data:this.one_data;
            let active_relationTypeVal = [];        //存放联动的关系类型值     联动左面控制台关系类型值需要
            //删除实体类型筛选条件
            if (val.length < this.filterOption.length) {
                let toRemoveNodeList = [];              //存放删除实体的id    防止添加重复的node    只是作为校验用
                let _toRemoveNodeList = [];             //存放要删除的node    remove 渲染zoom 需要
                let toRemoveLinkList = [];              //存放要删除的link    remove 渲染zoom 需要
                //找到应该删除的实体
                for(let i=0;i<this.linksData.length;i++){
                    let item = this.linksData[i];
                    if (val.indexOf(item.fromid) < 0) {
                        if (toRemoveNodeList.indexOf(item.from) < 0 && item.from != this.choise_id) {
                            toRemoveNodeList.push(item.from);
                            _toRemoveNodeList.push({
                                id:item.from,
                                typeid:item.fromid,
                                style:{label:item.fromname}
                            });
                        }
                    }
                    if (val.indexOf(item.toid) < 0) {
                        if (toRemoveNodeList.indexOf(item.to) < 0 && item.to != this.choise_id) {
                            toRemoveNodeList.push(item.to);
                            _toRemoveNodeList.push({
                                id:item.to,
                                typeid:item.toid,
                                style:{label:item.toname}
                            });
                        }
                    }
                    if ((val.indexOf(item.fromid) < 0 && item.from != this.choise_id) || (val.indexOf(item.toid) < 0 && item.to != this.choise_id)) {
                        toRemoveLinkList.push(this.linksData[i]);
                        this.linksData[i] = undefined;
                    }
                }
                //去除空的关系
                for(var k = 0 ;k<this.linksData.length;k++){
                    if(this.linksData[k] == "" || typeof(this.linksData[k]) == "undefined"){
                        this.linksData.splice(k,1);
                        k= k-1;
                    }
                }
                //删除对应的实体      渲染zoom放在前面，处理数据放在后见面，提高性能！！！
                this.refs.zoom_.netchart.removeData({nodes:_toRemoveNodeList,links:toRemoveLinkList});
                //向已删除的关系库中添加新移除的关系
                this.removeLinkLib = this.removeLinkLib.concat(toRemoveLinkList);
                console.log(this.linksData);
                console.log(this.removeLinkLib);
            }else { //添加实体类型筛选条件
                let _val = this.filterOption
                let _c = null;
                let tmp = val.concat(_val);
                var _o = {};
                for (let i = 0; i < tmp.length; i ++) (tmp[i] in _o) ? _o[tmp[i]] ++ : _o[tmp[i]] = 1;
                for (let x in _o) if (_o[x] == 1) _c=Number(x);
                //以上，取出用户点击的是哪一个类型
                let removeLinkLib = this.removeLinkLib;       //取到已删除关系的库   待循环！
                let toAddNodeList = [];              //存放添加实体的id    防止添加重复的node    只是作为校验用
                let _toAddNodeList = [];             //存放要添加的node    add 渲染zoom 需要
                let toAddLinkList = [];              //存放要添加的link    add 渲染zoom 需要
                for(let i=0;i<removeLinkLib.length;i++){
                    let item = removeLinkLib[i];
                    if (val.indexOf(item.fromid) >= 0) {
                        if (toAddNodeList.indexOf(item.from) < 0 && item.from != this.choise_id) {
                            toAddNodeList.push(item.from);
                            _toAddNodeList.push({
                                id:item.from,
                                typeid:item.fromid,
                                style:{label:item.fromname}
                            });
                        }
                    }
                    if (val.indexOf(item.toid) >= 0) {
                        if (toAddNodeList.indexOf(item.to) < 0 && item.to != this.choise_id) {
                            toAddNodeList.push(item.to);
                            _toAddNodeList.push({
                                id:item.to,
                                typeid:item.toid,
                                style:{label:item.toname}
                            });
                        }
                    }
                    if ((val.indexOf(item.fromid) >= 0 && item.from != this.choise_id) || (val.indexOf(item.toid) >= 0 && item.to != this.choise_id)) {
                        toAddLinkList.push(removeLinkLib[i]);
                        removeLinkLib[i] = undefined;
                    }
                }
                //去除已经删除关系中空的值
                for(var k = 0 ;k<removeLinkLib.length;k++){
                    if(removeLinkLib[k] == "" || typeof(removeLinkLib[k]) == "undefined"){
                        removeLinkLib.splice(k,1);
                        k= k-1;
                    }
                }
                this.refs.zoom_.netchart.addData({nodes:_toAddNodeList,links:toAddLinkList});
                //向已删除的关系库中删除刚增加的关系
                this.removeLinkLib = removeLinkLib;
                //向未删除的关系库中添加刚增加的关系
                this.linksData = this.linksData.concat(toAddLinkList);
                console.log(removeLinkLib);
                console.log(this.linksData);
            }
            this.filterOption = val;
            //联动关系的复选框
            for(var j = 0 ;j<this.linksData.length;j++){
                if (active_relationTypeVal.indexOf(this.linksData[j].type) < 0) {
                    active_relationTypeVal.push(this.linksData[j].type);
                }
            }
            this.refs.console.setCheckboxVal('relation',active_relationTypeVal);
        }else if (type == 'relation') {
            let active_entityTypeVal = [];
            for(let i=0;i<data.length;i++ ){
                if (this.state.isDouble) {
                    if (val.indexOf(data[i].relationTypeId) >=0 ) {
                        links.push({
                            id:data[i].id,
                            from:data[i].entityId1,
                            to:data[i].entityId2,
                            type:data[i].relationTypeId,
                            style:{ "fromDecoration":"arrow"}
                        })
                        if (active_entityTypeVal.indexOf(data[i].entityTypeId1) < 0) {
                            active_entityTypeVal.push(data[i].entityTypeId1)
                        }
                        if (active_entityTypeVal.indexOf(data[i].entityTypeId2) < 0) {
                            active_entityTypeVal.push(data[i].entityTypeId2)
                        }
                    }
                }else {
                    if (data[i].entityId1 == this.choise_id || data[i].entityId2 == this.choise_id) {
                        if (val.indexOf(data[i].relationTypeId) >=0 ) {
                            links.push({
                                id:data[i].id,
                                from:data[i].entityId1,
                                to:data[i].entityId2,
                                type:data[i].relationTypeId,
                                style:{ "fromDecoration":"arrow"}
                            })
                            if (active_entityTypeVal.indexOf(data[i].entityTypeId1) < 0) {
                                active_entityTypeVal.push(data[i].entityTypeId1)
                            }
                            if (active_entityTypeVal.indexOf(data[i].entityTypeId2) < 0) {
                                active_entityTypeVal.push(data[i].entityTypeId2)
                            }
                        }
                    }
                }
            }
        }

    }

    //选择层次，支持2层
    selectHandleChange(val){
        if (val == '2') {
            let {nodes,links,entityTypeList,relationTypeList} = this.all_data;
            //删除一层的数据，在添加所有的数据进去
            // this.refs.zoom_.netchart.removeData({nodes,links});
            // this.refs.zoom_.netchart.addData({nodes:this.all_data.nodes,links:this.all_data.links});
            //重置实体类型筛选的长度
            this.filterOption = entityTypeList;
            //待筛选的关系库
            this.linksData = [].concat(links);
            let num = this.state.replaceFlag;
            num++;
            this.setState({
                replaceFlag:num,
                netData:{nodes,links},
                isDouble:true,
                relationTypeList:relationTypeList,
                entityTypeList:entityTypeList,
            });
        }else {
            let {nodes,links,relationTypeList,entityTypeList} = this.one_data;
            //删除所有节点和关系，再添加一层的数据进去
            // this.refs.zoom_.netchart.removeData({nodes,links});
            // this.refs.zoom_.netchart.addData({nodes:this.one_data.nodes,links:this.one_data.links});
            //重置实体类型筛选的长度
            this.filterOption = entityTypeList;
            //待筛选的关系库
            this.linksData = [].concat(links);
            let num = this.state.replaceFlag;
            num++;
            this.setState({
                replaceFlag:num,
                netData:{nodes,links},
                isDouble:false,
                relationTypeList:relationTypeList,
                entityTypeList:entityTypeList,
            });
        }
        //切换数据时，全选checkbox
        this.refs.console.setCheckboxVal('both',[undefined,undefined]);
    }

    //视图后退  可以退回10步
    //有数据直接渲染，没有先请求，在render,
    //删除存储的最后一条id, pop()
    chartsGoBack(){
        let _this = this;
        let id = this.state.backParamContainer[this.state.backParamContainer.length-1];
        if (this.state.backParamContainer.length == 0) {
            message.info('初始层不能再返回了...')
        }else {
            NetUtil.get(`/relation/getRelation`,{entityIds: id},respData=>{
                _this.choise_id = id;
                _this.coreEntityTypeId = respData.entityList[0].entityTypeId;
                // this.formatJson(respData,'28123');
                let {nodes,links,relationTypeList,entityTypeList,categoryList} = this.formatJson(respData,id);
                _this.linksData = [].concat(links);
                _this.filterOption = entityTypeList;
                let backParamContainer = _this.state.backParamContainer;
                if (backParamContainer.length != 0) {
                    backParamContainer.pop();
                }
                let obj = {
                    title:respData.entityList[0].entityName,
                    content:respData.entityList[0].entityArributeList
                }
                let num = this.state.replaceFlag;
                num++;
                _this.setState({
                    replaceFlag:num,
                    focusNodes:id,
                    netData:{nodes,links},
                    relationTypeList,
                    entityTypeList,
                    categoryList,
                    show_info:obj,
                    isDouble:false,
                    backParamContainer
                },()=>{
                    _this.refs.console.setCheckboxVal('both',[undefined,undefined]);
                });
                _this.formatElseJson(respData,id);
            })
        }
    }

    //节点点击事件，展示右边的显示信息
    chartsOnClick(nodes){
        let obj = {
            title:nodes.style.label,
            content:{}
        }
        this.setState({
            show_info: obj
        });
    }

    chartsOnDoubleClick(nodes){
        let _this = this;
        let id = nodes.id;
        if (this.choise_id != id) {
            NetUtil.get(`/relation/getRelation`,{entityIds: id},respData=>{
                _this.coreEntityTypeId = respData.entityList[0].entityTypeId;
                // this.formatJson(respData,'28123');
                let {nodes,links,relationTypeList,entityTypeList,categoryList} = this.formatJson(respData,id);
                _this.linksData = [].concat(links);
                _this.filterOption = entityTypeList;
                let backParamContainer = _this.state.backParamContainer;
                backParamContainer.push(_this.choise_id);
                _this.choise_id = id;
                let obj = {
                    title:respData.entityList[0].entityName,
                    content:respData.entityList[0].entityArributeList
                }
                let num = this.state.replaceFlag;
                num++;
                _this.setState({
                    replaceFlag:num,
                    focusNodes:id,
                    netData:{nodes,links},
                    relationTypeList,
                    entityTypeList,
                    categoryList,
                    show_info:obj,
                    isDouble:false,
                    backParamContainer
                },()=>{
                    _this.refs.console.setCheckboxVal('both',[undefined,undefined]);
                });
                _this.formatElseJson(respData,id);
            })
        }
    }

    render(){
        return (
            <div>
                <ConsoleComponent ref='console' width={'30%'} style={{marginLeft:20,width:'20%'}} categoryList={this.state.categoryList} relationTypeList={this.state.relationTypeList} entityTypeList={this.state.entityTypeList} checkboxOnChange={this.checkboxOnChange.bind(this)}/>
                <div className="page-middle-content">
                    <ZoomCharts ref='zoom_' replaceFlag={this.state.replaceFlag} netData={this.state.netData} focusNodes={[this.state.focusNodes]}  onClick={this.chartsOnClick.bind(this)} onDoubleClick={this.chartsOnDoubleClick.bind(this)}/>
                    <div className='page-middle-content-son'>
                        <Tooltip title="后退" placement="topRight">
                            <Button icon="arrow-left" style={{marginBottom:10,fontWeight: 'bold'}} disabled={this.state.backParamContainer.length==0?true:false} onClick={this.chartsGoBack.bind(this)}>返回上层</Button>
                        </Tooltip>
                        <div>
                            层数：
                            <Select value={this.state.isDouble?'2':'1'} style={{width:62}} onChange={this.selectHandleChange.bind(this)}>
                                <Option value="1">1层</Option>
                                <Option value="2">2层</Option>
                            </Select>
                        </div>
                    </div>
                </div>
                <div className='page-right-content'>
                    <div className='page-right-content-title'>{this.state.show_info.title}</div>
                    <div>
                        <div className="container-title">属性</div>
                        <div style={{padding:10}}>
                            {
                                _.map(this.state.show_info.content,(item,index)=>{
                                    return <div key={index} style={{marginBottom:5}}>{`${item.attributeName?item.attributeName:""} : ${item.attributeValue?item.attributeValue:""}`}</div>
                                })
                            }
                        </div>
                    </div>
                    {/* {                    <div>
                        <div className="container-title">相关事件</div>
                        <div>相关事件容器</div>
                    </div>
                    <div>
                        <div className="container-title">所属类目</div>
                        <div>所属类目容器</div>
                    </div>} */}
                </div>
            </div>
        )
    }
}

function initComponentB() {
    ReactDOM.render(
        <ShowInfoComponent />, document.getElementById("showinfo-container"))
}

$(document).ready(function() {
    initComponentB();
})
