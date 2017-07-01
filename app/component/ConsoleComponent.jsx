import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Input, Button, Card, Alert, Checkbox, Row, Col, Select} from 'antd';
import _ from 'underscore';
import './css/index.css'
import classnames from 'classnames'
const Option = Select.Option;

class ToggleButton extends Component{

    categoryOnClick(btn_name){
        let flag = $(this.refs[btn_name]).hasClass('btn_active');
        if (flag) {
            $(this.refs[btn_name]).removeClass('btn_active');
        }else {
            $(this.refs[btn_name]).addClass('btn_active');
        }
    }

    getValue(){
        //获取所有btn_active 按钮，然后获取data-click的值，
    }

    cleanValue(){
        //清空所有按钮的值,
    }

    render(){
        return(
            <div style={{padding:10}}>
                {
                    _.map(this.props.list,(item,index)=>{
                        return <div ref={`btn_${index}`} className='ToggleButton-button' data-click={item.categoryName} key={index} onClick={this.categoryOnClick.bind(this,`btn_${index}`)}>{item.categoryName}</div>
                    })
                }
            </div>
        )
    }
}

export default class ConsoleComponent extends Component {

    state = {
        tabIndex:'0',
        entityVal:undefined,
        relationVal:undefined
    }

    componentDidMount(){
        this.setState({
            tabIndex:'1'
        });
    }

    checkboxOnChange(type,val){
        if (type == 'entity') {
            this.setState({
                entityVal: val
            });

        }else {
            this.setState({
                relationVal: val
            });
        }
        if (this.props.checkboxOnChange) {
            this.props.checkboxOnChange(type,val);
        }
    }

    setCheckboxVal(type,val){
        if (type == 'entity') {
            this.setState({
                entityVal: val,
            });
        }else if (type == 'relation') {
            this.setState({
                relationVal: val,
            });
        }else {
            this.setState({
                entityVal: val[0],
                relationVal: val[1],
            });
        }

        // this.refs.filter.setCheckboxVal(type,val);
    }

    tabOnClick(tabIndex){
        this.setState({tabIndex});
    }

    // componentWillReceiveProps(nextProps){
    //     if (nextProps.entityTypeList != this.props.entityTypeList) {
    //         this.setState({
    //             tabPaneContainer: <FilterTabPane ref='filter' entityTypeList={nextProps.entityTypeList} relationTypeList={nextProps.relationTypeList} checkboxOnChange={this.checkboxOnChange.bind(this)}/>
    //         });
    //     }
    // }

    AlertOnClose = () => {

    }

    tabPaneContainer(type){
        if (type == '1') {
            let entityTypeList = [];
            let DefaultentityTypeValue = [];
            let relationTypeList = [];
            let DefaultrelationTypeValue = [];
            let mappingName = {};
            _.map(this.props.entityTypeList,(item,key)=>{
                entityTypeList.push(<Col span={8} key={item.id} ><Checkbox value={item.id}>{item.entityTypeName}</Checkbox></Col>)
                DefaultentityTypeValue.push(item.id);
                mappingName[item.id] = item.entityTypeName;
            })
            _.map(this.props.relationTypeList,(item,key)=>{
                relationTypeList.push(<Col span={8} key={item.id} ><Checkbox value={item.id}>{item.relationTypeName}</Checkbox></Col>)
                DefaultrelationTypeValue.push(item.id);
            })
            return(
                <div>
                    <div>
                        <div className="container-title">类目选择</div>
                        <div className="filter-top-container">
                            {
                                _.map(this.props.categoryList,(item,key)=>{
                                    return(
                                        <div key={key} className="top-container-body">
                                            <div className="top-container-body-left">
                                                {mappingName[key]}
                                            </div>
                                            <div className="top-container-body-right">
                                                <div className="top-container-body-right-select">
                                                    <select className="top-container-body-right-select-style">
                                                        {
                                                            _.map(Object.keys(item),(name,index)=>{
                                                                return <option key={name} value={name}>{name}</option>
                                                            })
                                                        }
                                                    </select>
                                                </div>
                                                <div>
                                                    <ToggleButton list={item[Object.keys(item)[0]]} />
                                                </div>
                                            </div>
                                            <div ref={`mengban_${key}`} ></div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <div className="container-title">节点选择</div>
                        <div className="filter-middle-container">
                            <Checkbox.Group value={this.state.entityVal!=undefined?this.state.entityVal:DefaultentityTypeValue} onChange={this.checkboxOnChange.bind(this,'entity')}>
                                <Row>
                                    {entityTypeList}
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </div>
                    <div>
                        <div className="container-title">关系选择</div>
                        <div className="filter-buttom-container">
                            <Checkbox.Group value={this.state.relationVal!=undefined?this.state.relationVal:DefaultrelationTypeValue} onChange={this.checkboxOnChange.bind(this,'relation')}>
                                <Row>
                                    {relationTypeList}
                                </Row>
                            </Checkbox.Group>
                        </div>
                    </div>
                </div>
            )
        }else if (type == '2') {
            return(
                <div>
                    <div>
                        <div className="container-title">设定分析主体</div>
                        <div className="body-top-container">
                            <Input style={{width:'60%'}} />
                            <Button type="primary" style={{float:'right'}}>添加</Button>
                            <div style={{margin:'10px 0px'}}>
                                <Alert message="中信银行" type="info" closable onClose={this.AlertOnClose}/>
                                <Alert message="量知数据" type="info" closable onClose={this.AlertOnClose}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }else if (type == '3') {
            return(
                <div style={{height:100,textAlign:'center',lineHeight:'100px'}}>
                    暂未开放...
                </div>
            )
        }else{
            return(
                <div style={{height:100,textAlign:'center',lineHeight:'100px'}}></div>
            )
        }
    }

    render() {
        return (
            <div className="consoleContainer">
                <div className="tab-div">
                    <ul>
                        <li className={classnames({
                            'console-li-left': true,
                            'tab-active': this.state.tabIndex=='1'
                        })} onClick={this.tabOnClick.bind(this,'1')}>图谱筛选</li>
                        <li className={classnames({
                            'console-li-middle': true,
                            'tab-active': this.state.tabIndex=='2'
                        })} onClick={this.tabOnClick.bind(this,'2')}>主体选择</li>
                        <li className={classnames({
                            'console-li-right': true,
                            'tab-active': this.state.tabIndex=='3'
                        })} onClick={this.tabOnClick.bind(this,'3')}>路径搜索</li>
                    </ul>
                </div>
                <div>
                    {this.tabPaneContainer(this.state.tabIndex)}
                </div>
            </div>
        )
    }
}
