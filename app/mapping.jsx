import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Icon, Select, Tooltip, message} from 'antd';
import _ from 'underscore';
import $ from 'jquery';
import ConsoleComponent from './component/ConsoleComponent.jsx'
import ZoomCharts from './component/ZoomCharts.jsx'
import NetUtil from './component/NetUtil.jsx'
import './css/index.css'
const Option = Select.Option;

class ShowInfoComponent extends Component {

    constructor(props){
        super(props);

        this.respData = [];
        this.dataSource = {};
        this.all_dataSource = {};
        this.choise_id = null;
        this.coreEntityTypeId = null;
        //展示右边信息的state
        this.one_entityLib = [];
        this.entityLib = [];
        this.NOT_entityLib = [];

        this.state = {
            isDouble:false,
            relationTypeList:[],
            entityTypeList:[],
            categoryList:[],
            zoomcharts:<a></a>,
            show_info:{},
            backParamContainer:[]
        }
    }
//25829
//36297
//24718 铁路客运
//28123   一层是数据较多
    componentDidMount(){
        let _this = this;
        NetUtil.get(`/relation/getRelation`,{entityIds: '28123'},respData=>{
            _this.choise_id = '28123';
            _this.coreEntityTypeId = respData.entityList[0].entityTypeId;
            let {all_nodes,links,relationTypeList,entityTypeList,categoryList} = this.formatJson(respData,'28123');
            _this.respData = respData;
            let obj = {
                title:respData.entityList[0].entityName,
                content:respData.entityList[0].entityArributeList
            }
            _this.setState({
                zoomcharts:<ZoomCharts netData={{nodes:all_nodes,links}} focusNodes={['28123']}  onClick={_this.chartsOnClick.bind(_this)} onDoubleClick={_this.chartsOnDoubleClick.bind(_this)}/>,
                relationTypeList,
                entityTypeList,
                categoryList,
                show_info:obj
            });
        })
    }

    formatJson(respData, _id){
        //一层
        let links = [];
        let relationTypeList = [];
        let entityTypeList = [];
        //两层
        let all_nodes = [];
        let all_links = [];
        let all_nodeIds = [];
        let all_relationTypeList = [];
        let all_entityTypeList = [];
        //循环实体，关系
        let relationList = respData.relationList;
        //去重
        let flag_list_1 = [];
        let flag_list_2 = [];
        for(let i=0;i<relationList.length;i++){
            //一层数据时，默认显示，需要做部分
            if (relationList[i].entityId1 == _id || relationList[i].entityId2 == _id) {
                if (this.one_entityLib.indexOf(relationList[i].entityId1)<0) {
                    this.one_entityLib.push(relationList[i].entityId1);
                }
                if (this.one_entityLib.indexOf(relationList[i].entityId2)<0) {
                    this.one_entityLib.push(relationList[i].entityId2);
                }
                links.push({
                    id:relationList[i].id,
                    from:relationList[i].entityId1,
                    to:relationList[i].entityId2,
                    type:relationList[i].relationTypeId,
                    style:{ "fromDecoration":"arrow"}
                })
                //循环实体类型
                if (flag_list_1.indexOf(relationList[i].entityTypeId1) < 0) {
                    if (relationList[i].entityTypeId1 != this.coreEntityTypeId) {
                        flag_list_1.push(relationList[i].entityTypeId1);
                        entityTypeList.push({entityTypeName:relationList[i].entityTypeName1,id:relationList[i].entityTypeId1});
                    }
                }
                if (flag_list_1.indexOf(relationList[i].entityTypeId2) < 0) {
                    if (relationList[i].entityTypeId2 != this.coreEntityTypeId) {
                        flag_list_1.push(relationList[i].entityTypeId2);
                        entityTypeList.push({entityTypeName:relationList[i].entityTypeName2,id:relationList[i].entityTypeId2});
                    }
                }
                //如果节点两边都是以个类型的数据，则需要添加进节点选择里面
                if (flag_list_1.indexOf(relationList[i].entityTypeId2) < 0) {
                    if (relationList[i].entityTypeId1 == relationList[i].entityTypeId2) {
                        flag_list_1.push(relationList[i].entityTypeId1);
                        entityTypeList.push({entityTypeName:relationList[i].entityTypeName1,id:relationList[i].entityTypeId1});
                    }
                }
                //循环关系类型
                if (flag_list_2.indexOf(relationList[i].relationTypeId) < 0) {
                    flag_list_2.push(relationList[i].relationTypeId);
                    relationTypeList.push({id:relationList[i].relationTypeId,relationTypeName:relationList[i].relationTypeName});
                }
            }
            if (this.entityLib.indexOf(relationList[i].entityId1)<0) {
                this.entityLib.push(relationList[i].entityId1);
            }
            if (this.entityLib.indexOf(relationList[i].entityId2)<0) {
                this.entityLib.push(relationList[i].entityId2);
            }
            //全部数据，在渲染第二层时需要,不需要过滤，啊吧所有数据渲染进来
            //可以在all_nodes 里面添加信息，在单击的时候取出数据展示在右边窗口
            if (all_nodeIds.indexOf(relationList[i].entityId1) < 0) {
                    all_nodes.push({
                        id:relationList[i].entityId1,
                        // name:'111',
                        style:{label:relationList[i].entityName1}
                    });
                all_nodeIds.push(relationList[i].entityId1);
            }
            if (all_nodeIds.indexOf(relationList[i].entityId2) < 0) {
                all_nodes.push({
                    id:relationList[i].entityId2,
                    // name:'111',
                    style:{label:relationList[i].entityName2}
                });
                all_nodeIds.push(relationList[i].entityId2);
            }
            all_links.push({
                id:relationList[i].id,
                from:relationList[i].entityId1,
                to:relationList[i].entityId2,
                type:relationList[i].relationTypeId,
                style:{ "fromDecoration":"arrow"}
            })
        }
        this.dataSource = {all_nodes,links,relationTypeList,entityTypeList,categoryList};
        this.all_dataSource = {all_nodes,all_links,all_relationTypeList:respData.relationTypeList,all_entityTypeList:respData.entityTypeList};

        //循环类目
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
        return {all_nodes,links,relationTypeList,entityTypeList,categoryList}
    }

    checkboxOnChange(type,val){
        let links = [];
        let data = this.respData.relationList;
        if (type == 'entity') {
        // 1. 筛选主体类型后，提取出所有属于该类型的主体，存在entityLib中
        // 2. 如果在筛选主体类型时，把核心主体去掉，则应手动添加一个核心主体的ID
        // 3. 再画出关系，如果关系两边对应的主体的都在entityLib中存在则画出该条关系
        // 4. 在画关系时，如果之前添加过主体的ID则要判断下部选择的关系中是否选中如果没有选中则不画出
            // let entityLib = [];        // 控制台选中筛选后的实体
            // let NOT_entityLib = []       // 未被选中的实体
            // entityLib.push(Number(this.choise_id));       //先把核心实体添加进去
            // //是否是2层状态
            // if (this.state.isDouble) {
            //
            // }else {
            //     console.log(this.one_entityLib);
            //     for (let k=0;k<data.length;k++ ){
            //         if (data[k].entityId1 == this.choise_id || data[k].entityId2 == this.choise_id) {
            //             if (this.one_entityLib.indexOf(data[i].entityId1) >=0 && this.one_entityLib.indexOf(data[i].entityId2)>=0 ) {
            //         }
            //     }
            // }
            //     for (let k=0;k<data.length;k++ ){
            //         if (val.indexOf(data[k].entityTypeId1)>=0) {
            //             if (entityLib.indexOf(data[k].entityId1)<0) {
            //                 entityLib.push(data[k].entityId1);
            //             }
            //         }else {
            //             if (NOT_entityLib.indexOf(data[k].entityId1)<0) {
            //                 NOT_entityLib.push(data[k].entityId1);
            //             }
            //         }
            //         if (val.indexOf(data[k].entityTypeId2)>=0) {
            //             if (entityLib.indexOf(data[k].entityId2)<0) {
            //                 entityLib.push(data[k].entityId2);
            //             }
            //         }else {
            //             if (NOT_entityLib.indexOf(data[k].entityId2)<0) {
            //                 NOT_entityLib.push(data[k].entityId2);
            //             }
            //         }
            //     }
            //     //如果剔除的实体中含有核心实体，则手动剔除核心主体，因为核心主体始终存在
            //     if (NOT_entityLib.indexOf(this.choise_id) >=0 ) {
            //         let choise_id_index = NOT_entityLib.indexOf(this.choise_id);
            //         NOT_entityLib.splice(choise_id_index,1);
            //     }
            // }else {
            //     for (let k=0;k<data.length;k++ ){
            //         if (data[k].entityId1 == this.choise_id || data[k].entityId2 == this.choise_id) {
            //             if (val.indexOf(data[k].entityTypeId1)>=0) {
            //                 if (entityLib.indexOf(data[k].entityId1)<0) {
            //                     entityLib.push(data[k].entityId1);
            //                 }
            //             }else {
            //                 if (NOT_entityLib.indexOf(data[k].entityId1)<0) {
            //                     NOT_entityLib.push(data[k].entityId1);
            //                 }
            //             }
            //             if (val.indexOf(data[k].entityTypeId2)>=0) {
            //                 if (entityLib.indexOf(data[k].entityId2)<0) {
            //                     entityLib.push(data[k].entityId2);
            //                 }
            //             }else {
            //                 if (NOT_entityLib.indexOf(data[k].entityId2)<0) {
            //                     NOT_entityLib.push(data[k].entityId2);
            //                 }
            //             }
            //         }
            //     }
            //     //如果剔除的实体中含有核心实体，则手动剔除核心主体，因为核心主体始终存在
            //     if (NOT_entityLib.indexOf(Number(this.choise_id)) >=0 ) {
            //         let choise_id_index = NOT_entityLib.indexOf(Number(this.choise_id));
            //         NOT_entityLib.splice(choise_id_index,1);
            //     }
            // }
            // console.log(entityLib);
            // console.log(NOT_entityLib);
            // entityLib.for
            // for(let i=0;i<entityLib.length;i++ ){
            //     if (entityLib.indexOf(data[i].entityId1) >=0 && entityLib.indexOf(data[i].entityId2)>=0 ) {
            //
            //     }
            // }
            // let isAddChoise_id = false;
            // if (entityLib.indexOf(Number(this.choise_id)) < 0) {
            //     isAddChoise_id = true;
            //     entityLib.push(Number(this.choise_id));
            // }
            // let getRelationVal = this.refs.console.state.relationVal;
            // let active_relationTypeVal = [];
            // //是否是2层状态
            // if (this.state.isDouble) {
                // for(let i=0;i<data.length;i++ ){
                //     if (entityLib.indexOf(data[i].entityId1) >=0 && entityLib.indexOf(data[i].entityId2)>=0 ) {
            //             if (isAddChoise_id) {
            //                 if (getRelationVal.length == 0) {
            //                     links.push({
            //                         id:data[i].id,
            //                         from:data[i].entityId1,
            //                         to:data[i].entityId2,
            //                         type:data[i].relationTypeId,
            //                         style:{ "fromDecoration":"arrow"}
            //                     })
            //                     if (active_relationTypeVal.indexOf(data[i].relationTypeId) < 0) {
            //                         active_relationTypeVal.push(data[i].relationTypeId)
            //                     }
            //                 }else {
            //                     if (getRelationVal.indexOf(data[i].relationTypeId) >=0) {
            //                         links.push({
            //                             id:data[i].id,
            //                             from:data[i].entityId1,
            //                             to:data[i].entityId2,
            //                             type:data[i].relationTypeId,
            //                             style:{ "fromDecoration":"arrow"}
            //                         })
            //                         if (active_relationTypeVal.indexOf(data[i].relationTypeId) < 0) {
            //                             active_relationTypeVal.push(data[i].relationTypeId)
            //                         }
            //                     }
            //                 }
            //                 // if (data[i].entityId1 != this.choise_id && data[i].entityId2 != this.choise_id) {
            //                 //     links.push({
            //                 //         id:data[i].id,
            //                 //         from:data[i].entityId1,
            //                 //         to:data[i].entityId2,
            //                 //         type:data[i].relationTypeId,
            //                 //         style:{ "fromDecoration":"arrow"}
            //                 //     })
            //                 //     if (active_relationTypeVal.indexOf(data[i].relationTypeId) < 0) {
            //                 //         active_relationTypeVal.push(data[i].relationTypeId)
            //                 //     }
            //                 // }
            //             }else {
            //                 links.push({
            //                     id:data[i].id,
            //                     from:data[i].entityId1,
            //                     to:data[i].entityId2,
            //                     type:data[i].relationTypeId,
            //                     style:{ "fromDecoration":"arrow"}
            //                 })
            //                 if (active_relationTypeVal.indexOf(data[i].relationTypeId) < 0) {
            //                     active_relationTypeVal.push(data[i].relationTypeId)
            //                 }
            //             }
            //         }
            //     }
            // }else {
            //     for(let i=0;i<data.length;i++ ){
            //         //先找到跟核心主体有关系的实体， 在进行下一步的筛选！！！
            //         if (data[i].entityId1 == this.choise_id || data[i].entityId2 == this.choise_id) {
            //             if (entityLib.indexOf(data[i].entityId1) >=0 && entityLib.indexOf(data[i].entityId2)>=0 ) {
            //                 if (isAddChoise_id) {
            //                     if (getRelationVal.length == 0) {
            //                         links.push({
            //                             id:data[i].id,
            //                             from:data[i].entityId1,
            //                             to:data[i].entityId2,
            //                             type:data[i].relationTypeId,
            //                             style:{ "fromDecoration":"arrow"}
            //                         })
            //                         if (active_relationTypeVal.indexOf(data[i].relationTypeId) < 0) {
            //                             active_relationTypeVal.push(data[i].relationTypeId)
            //                         }
            //                     }else {
            //                         if (getRelationVal.indexOf(data[i].relationTypeId) >=0) {
            //                             links.push({
            //                                 id:data[i].id,
            //                                 from:data[i].entityId1,
            //                                 to:data[i].entityId2,
            //                                 type:data[i].relationTypeId,
            //                                 style:{ "fromDecoration":"arrow"}
            //                             })
            //                             if (active_relationTypeVal.indexOf(data[i].relationTypeId) < 0) {
            //                                 active_relationTypeVal.push(data[i].relationTypeId)
            //                             }
            //                         }
            //                     }
            //                 }else {
            //                     links.push({
            //                         id:data[i].id,
            //                         from:data[i].entityId1,
            //                         to:data[i].entityId2,
            //                         type:data[i].relationTypeId,
            //                         style:{ "fromDecoration":"arrow"}
            //                     })
            //                     if (active_relationTypeVal.indexOf(data[i].relationTypeId) < 0) {
            //                         active_relationTypeVal.push(data[i].relationTypeId)
            //                     }
            //                 }
            //             }
                        // if (val.indexOf(data[i].entityTypeId1) >= 0 || val.indexOf(data[i].entityTypeId2) >= 0 ) {
                        //     if (val.indexOf(this.coreEntityTypeId) >= 0) {
                        //         let _index = val.indexOf(this.coreEntityTypeId);
                        //         let _val = [].concat(val);
                        //         _val.splice(_index,1);
                        //         if (_val.indexOf(data[i].entityTypeId1) >= 0 || _val.indexOf(data[i].entityTypeId2) >= 0 ) {
                        //             links.push({
                        //                 id:data[i].id,
                        //                 from:data[i].entityId1,
                        //                 to:data[i].entityId2,
                        //                 type:data[i].relationTypeId,
                        //                 style:{ "fromDecoration":"arrow"}
                        //             })
                        //             if (active_relationTypeVal.indexOf(data[i].relationTypeId) < 0) {
                        //                 active_relationTypeVal.push(data[i].relationTypeId)
                        //             }
                        //         }
                        //         if (data[i].entityTypeId1 == this.coreEntityTypeId &&　data[i].entityTypeId2 == this.coreEntityTypeId) {
                        //             links.push({
                        //                 id:data[i].id,
                        //                 from:data[i].entityId1,
                        //                 to:data[i].entityId2,
                        //                 type:data[i].relationTypeId,
                        //                 style:{ "fromDecoration":"arrow"}
                        //             })
                        //             if (active_relationTypeVal.indexOf(data[i].relationTypeId) < 0) {
                        //                 active_relationTypeVal.push(data[i].relationTypeId)
                        //             }
                        //         }
                        //     }else {
                        //         links.push({
                        //             id:data[i].id,
                        //             from:data[i].entityId1,
                        //             to:data[i].entityId2,
                        //             type:data[i].relationTypeId,
                        //             style:{ "fromDecoration":"arrow"}
                        //         })
                        //         if (active_relationTypeVal.indexOf(data[i].relationTypeId) < 0) {
                        //             active_relationTypeVal.push(data[i].relationTypeId)
                        //         }
                        //     }
                        // }
                //     }
                // }
            // }
            //，  节点--关系上下联动
            // console.log(active_relationTypeVal);
            // this.refs.console.setCheckboxVal('relation',active_relationTypeVal);
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
            this.refs.console.setCheckboxVal('entity',active_entityTypeVal);
        }
        let chose_dataSource = {nodes:this.dataSource.all_nodes,links};
        // this.setState({
        //     zoomcharts:<ZoomCharts netData={chose_dataSource} focusNodes={[this.choise_id]}  onClick={this.chartsOnClick.bind(this)} onDoubleClick={this.chartsOnDoubleClick.bind(this)}/>,
        // });
    }

    //选择层次，支持2层
    selectHandleChange(val){
        this.setState({
            isDouble:val=='1'?false:true
        });
        if (val == '2') {
            let {all_nodes,all_links,all_relationTypeList,all_entityTypeList} = this.all_dataSource;
            this.setState({
                isDouble:true,
                zoomcharts:<ZoomCharts netData={{nodes:all_nodes,links:all_links}} focusNodes={[this.choise_id]} expansionRadius={2} onClick={this.chartsOnClick.bind(this)} onDoubleClick={this.chartsOnDoubleClick.bind(this)}/>,
                relationTypeList:all_relationTypeList,
                entityTypeList:all_entityTypeList,
            });
        }else {
            let {all_nodes,links,relationTypeList,entityTypeList} = this.dataSource;
            this.setState({
                isDouble:false,
                zoomcharts:<ZoomCharts netData={{nodes:all_nodes,links}} focusNodes={[this.choise_id]}  onClick={this.chartsOnClick.bind(this)} onDoubleClick={this.chartsOnDoubleClick.bind(this)}/>,
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
                _this.coreEntityTypeId = respData.entityList[0].entityTypeId;
                let {all_nodes,links,relationTypeList,entityTypeList,categoryList} = _this.formatJson(respData,id);
                _this.respData = respData;
                if (_this.state.backParamContainer.length != 0) {
                    _this.state.backParamContainer.pop();
                }
                _this.choise_id = id;
                let obj = {
                    title:respData.entityList[0].entityName,
                    content:respData.entityList[0].entityArributeList
                }
                _this.setState({
                    zoomcharts:<ZoomCharts netData={{nodes:all_nodes,links}} focusNodes={[id]}  onClick={_this.chartsOnClick.bind(_this)} onDoubleClick={_this.chartsOnDoubleClick.bind(_this)}/>,
                    relationTypeList,
                    entityTypeList,
                    categoryList,
                    show_info:obj,
                    isDouble:false,
                },()=>{
                    _this.refs.console.setCheckboxVal('both',[undefined,undefined]);
                });
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
                let {all_nodes,links,relationTypeList,entityTypeList,categoryList} = _this.formatJson(respData,id);
                _this.respData = respData;
                _this.state.backParamContainer.push(_this.choise_id);
                _this.choise_id = id;
                let obj = {
                    title:respData.entityList[0].entityName,
                    content:respData.entityList[0].entityArributeList
                }
                _this.setState({
                    zoomcharts:<ZoomCharts netData={{nodes:all_nodes,links}} focusNodes={[id]}  onClick={_this.chartsOnClick.bind(_this)} onDoubleClick={_this.chartsOnDoubleClick.bind(_this)}/>,
                    relationTypeList,
                    entityTypeList,
                    categoryList,
                    show_info:obj,
                    isDouble:false
                },()=>{
                    _this.refs.console.setCheckboxVal('both',[undefined,undefined]);
                });
            })
        }
    }

    render(){
        return (
            <div>
                <ConsoleComponent ref='console' width={'30%'} style={{marginLeft:20,width:'20%'}} categoryList={this.state.categoryList} relationTypeList={this.state.relationTypeList} entityTypeList={this.state.entityTypeList} checkboxOnChange={this.checkboxOnChange.bind(this)}/>
                <div className="page-middle-content">
                    {this.state.zoomcharts}
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
        <ShowInfoComponent />, document.getElementById("container"))
}

$(document).ready(function() {
    initComponentB();
})
