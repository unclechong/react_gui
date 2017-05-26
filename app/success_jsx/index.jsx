import React from 'react';
import ReactDOM from 'react-dom';
import Tabel from './component/Tabel';
import { Select , Form , Input , Button , Cascader , Col , Row} from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

const headerData = [
	{name:"序号",key:"num"},
	{name:"异动组中文名称",key:"c_name"},
	{name:"异动组英文名称",key:"e_name"},
	{name:"标签数量",key:"count"},
	{name:"描述",key:"depict"},
	{name:"数据表",key:"tabel"},
	{name:"数据主体",key:"body"},
	{name:"最后修改时间",key:"final_modify"},
	{name:"修改用户",key:"user"},
	{name:"操作",key:"operating"}
];

const bodyDate = [
    {
        "num": "0",
        "c_name": "awdawd",
        "e_name": "awdawd",
        "count": "12",
        "depict": "ctdata",
        "tabel": "5555",
        "body": "sadasd",
        "final_modify": "tag",
        "user": "customer_no"
    },
    {
        "num": "1",
        "c_name": "awdawd",
        "e_name": "awdawd",
        "count": "12",
        "depict": "ctdata",
        "tabel": "5555",
        "body": "sadasd",
        "final_modify": "tag",
        "user": "customer_no"
    },
    {
        "num": "2",
        "c_name": "中文名字测试",
        "e_name": "awdawd",
        "count": "12",
        "depict": "我是描述",
        "tabel": "5555",
        "body": "sadasd",
        "final_modify": "2017",
        "user": "customer_no"
    },
    {
        "num": "3",
        "c_name": "awdawd",
        "e_name": "awdawd",
        "count": "12",
        "depict": "ctdata",
        "tabel": "5555",
        "body": "sadasd",
        "final_modify": "tag",
        "user": "customer_no"
    },
]

const bodyDateObj = ["num","c_name","e_name","count","depict","tabel","body","final_modify","user"];

export class Bodypageform extends React.Component{

	constructor(props){
		super(props);

		this.state={
			options:[{
					  value: 'zhejiang',
					  label: 'Zhejiang',
					  isLeaf: false,

					}, {
					  value: 'jiangsu',
					  label: 'Jiangsu',
					  isLeaf: false,
					}]
		};
	}

	componentDidMount(){
		// this.props.form.setFieldsValue({"data_tabel":["zhejiang","aa"]})
		//编辑的时候数据表多级选择要先setstate，然后在调用上面的方法
		// var arr = [{name: 'chris', age: 26}, {name: 'jack',    age: 27}, {name: 'peter',age: 28}];
		//
		// for (let {age, name} of arr) {
		//     console.log(name + ' ' + age);
		// }
		let foo = 'test'
		let baz = {foo}
		console.log(baz);
		// console.log(name);


	}

	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
		  if (err) {
		}else{
			console.log('Received values of form: ', values);

		}
	    })

	}

	cancelOnclick(){
		this.props.form.resetFields()
	}

	cascaderOnChange(value){
		console.log(value);
		// console.log(this.state.options);
	}

	loadData(selectedOptions){
		// console.log(this.state.options);
		// let optionGroup = selectedOptions[0];
		// optionGroup.children = [{
		// 	label:"test",
		// 	value:"test"
		// }]
		// console.log(optionGroup);
		selectedOptions[0].children = [{
			label:"aa",
			value:"aa"
		}]
		// console.log(this.state.options);

		// this.setState({
		// 	options: [...this.state.options]
		// });
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
		    labelCol: {
				xs: { span: 24 },
				sm: { span: 3 },
		    },
		    wrapperCol: {
				xs: { span: 24 },
				sm: { span: 15 },
		    },
		};
		const tailFormItemLayout = {
		    wrapperCol: {
				xs: {
				    span: 24,
				    offset: 0,
				},
				sm: {
				    span: 14,
				    offset: 3,
				},
		    },
		};

		return (
			<div>
				<div className="form-group-separator"></div>
				<Form hideRequiredMark style={{width:"90%"}} onSubmit={this.handleSubmit.bind(this)}>
				  	<FormItem {...formItemLayout} label="异动组中文名称" hasFeedback>
						{getFieldDecorator('c_name',{rules:[
							{pattern: /^[\u4E00-\u9FFF]+$/ ,message: '中文名称'},
							{required: true, message: '请输入异动组中文名称'}]})(
		  						<Input placeholder="用于建表时作为字段的comments存储和使用"/>
						)}
				    </FormItem>
					<FormItem {...formItemLayout} label="异动组英文名称" hasFeedback>
						{getFieldDecorator('e_name',{rules:[
							{pattern: /^[a-zA-Z_][a-zA-Z0-9_]*$/ , message: '由英文、数字、下划线组成，需符合标签定义规范，建表时作字段名称使用，具有唯一性'},
							{required: true, message: '请输入异动组英文名称'}]})(
								<Input placeholder="由英文、数字、下划线组成，需符合标签定义规范，建表时作字段名称使用，具有唯一性"/>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="描述" hasFeedback>
						{getFieldDecorator('depict',{rules:[{required: true, message: '请输入描述'}]})(
							<Input />
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="数据表" wrapperCol={{sm: { span: 4 }}}>
						{getFieldDecorator('data_tabel',{rules:[{required: true, message: '请选择'}]})(
							<Cascader style={{ width: '100%' }} options={this.state.options} onChange={this.cascaderOnChange.bind(this)} loadData={this.loadData.bind(this)} changeOnSelect/>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="数据主体" wrapperCol={{sm: { span: 4 }}}>
						{getFieldDecorator('data_body',{rules:[{required: true, message: '请选择'}]})(
							<Select
								showSearch
								style={{ width: '100%' }}
								placeholder="选择一"
								optionFilterProp="children"
								filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="tom">Tom</Option>
							</Select>
						)}
					</FormItem>
					<FormItem {...tailFormItemLayout}>
					    <Button type="primary" htmlType="submit" size="large">确定</Button>
						<Button style={{marginLeft:"20px"}} size="large" onClick={this.cancelOnclick.bind(this)}>取消</Button>
					</FormItem>
			    </Form>
			</div>
		)
	}
}

const WrappedBodypageform = Form.create()(Bodypageform);

export class Bodypage extends React.Component{

	constructor(props){
		super(props);

		//是否编辑状态
		this.isEdit = false;
		//编辑时的当前页数
		this.editingCurrentPage = 1;

		this.state={
			bodyDate: bodyDate,
			editIndex:""
		};
	}

	editFn(index){
		var list = this.state.bodyDate[index];
		$("*[data-id=need_selected]").map(function(){
			var val = list[$(this).attr("data-name")]
			$(this).val(val)
		})
		this.setState({
			editIndex:index
		});
		this.isEdit = true;
		//点击编辑时，获取当前所在的页数
		this.editingCurrentPage = this.refs.tabel_one.getCurrentPage();

		/*
			先insert form 值
			然后在获取值
			替换对应index 上bodyDate
			在setState
			最后清空form 值
		*/
	}

	submitOnclick(){
		/*
			编辑的时候接口只返回编辑的那一调数据
			添加的时候需要按照之前约定好的格式，返回最后一页的所有数据和总共的页数
		*/
		var list = this.state.bodyDate;
		var currentPage = this.refs.tabel_one.getCurrentPage();
		if (this.isEdit) {
			var index = this.state.editIndex;
			$("*[data-id=need_selected]").map(function(){
				list[index][$(this).attr("data-name")] = $(this).val();
			})
			this.setState({
				bodyDate:list
			});

			//如果编辑时，并且还没有完成提交，切换其他页面，需要再次切换到编辑那条所在页面
			if (this.editingCurrentPage != currentPage) {

			}
		}else {

		}
		this.clearForm();
	}

	clearForm(){
		$("*[data-id=need_selected]").map(function(){
			$(this).val('');
		})
		this.isEdit = false;
	}

	render(){
		return (
			<div>
				<Tabel ref="tabel_one" headerData={headerData} bodyDate={this.state.bodyDate} bodyDateObj={bodyDateObj} operating={["edit"]} editFn={this.editFn} pageCount={5}/>
				<WrappedBodypageform />
			</div>
		)
	}
}

export class SecondBodypageform extends React.Component{

	constructor(props){
		super(props);

		this.options=[{
				  value: 'zhejiang',
				  label: 'Zhejiang',
				  children: [{
				    value: 'hangzhou',
				    label: 'Hangzhou',

				  }],
				}, {
				  value: 'jiangsu',
				  label: 'Jiangsu',
				  children: [{
				    value: 'nanjing',
				    label: 'Nanjing',

				  }],
				}];

		this.state={
		};
	}


	componentDidMount(){
		// this.props.form.setFieldsValue({"c_name":"sss"})
		// console.log(this.props.from);
	}

	handleSubmit(e){
		e.preventDefault();
		this.props.form.validateFieldsAndScroll((err, values) => {
		  if (err) {
		}else{
			console.log('Received values of form: ', values);

		}
	    })

	}

	cancelOnclick(){
		this.props.form.resetFields()
	}

	saveAndCancelOnclick(){

	}

	cascaderOnChange(value){
		console.log(value);
	}

	render(){
		const { getFieldDecorator } = this.props.form;
		const formItemLayout = {
		    labelCol: {
				xs: { span: 24 },
				sm: { span: 3 },
		    },
		    wrapperCol: {
				xs: { span: 24 },
				sm: { span: 15 },
		    },
		};
		const formItemLayoutGroup = {
		    labelCol: {
				xs: { span: 24 },
				sm: { span: 9 },
		    },
		    wrapperCol: {
				xs: { span: 24 },
				sm: { span: 12 },
		    },
		};
		// const formItemLayout_span = {
		//     labelCol: {
		// 		xs: { span: 24 },
		// 		sm: { span: 0 },
		//     },
		//     wrapperCol: {
		// 		xs: { span: 24 },
		// 		sm: { span: 18 },
		//     },
		// };
		const tailFormItemLayout = {
		    wrapperCol: {
				xs: {
				    span: 24,
				    offset: 0,
				},
				sm: {
				    span: 14,
				    offset: 3,
				},
		    },
		};
		return (
			<div>
				<div className="form-group-separator"></div>
				<Form hideRequiredMark style={{width:"90%"}} onSubmit={this.handleSubmit.bind(this)}>
				  	<FormItem {...formItemLayout} label="异动事件名称" hasFeedback>
						{getFieldDecorator('even_name',{rules:[
							{required: true, message: '请输入异动事件名称'}]})(
		  						<Input placeholder=""/>
						)}
				    </FormItem>
					<FormItem {...formItemLayout} label="异动事件显示名称" hasFeedback>
						{getFieldDecorator('even_show_name',{rules:[
							{required: true, message: '请输入异动事件显示名称'}]})(
								<Input placeholder=""/>
						)}
					</FormItem>
					<FormItem {...formItemLayout} label="指标计算区间" wrapperCol={{sm: { span: 4 }}}>
						{getFieldDecorator('count_interval',{rules:[{required: true, message: '请选择'}]})(
							<Select
								showSearch
								style={{ width: '100%' }}
								placeholder="选择一"
								optionFilterProp="children"
								filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
							>
								<Option value="jack">Jack</Option>
								<Option value="lucy">Lucy</Option>
								<Option value="tom">Tom</Option>
							</Select>
						)}
					</FormItem>
					<Row>
						<Col span={8}>
							<FormItem {...formItemLayoutGroup} label="异动定义">
								{getFieldDecorator('change_definition',{rules:[{required: true, message: '请选择'}]})(
									<Select
										showSearch
										style={{ width: '100%' }}
										placeholder="选择一"
										optionFilterProp="children"
										filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
									>
										<Option value="jack">Jack</Option>
										<Option value="lucy">Lucy</Option>
										<Option value="tom">Tom</Option>
									</Select>
								)}
							</FormItem>
						</Col>
						<Col span={4}>
							<FormItem {...formItemLayout} wrapperCol={{sm:{span:18}}}>
								{getFieldDecorator('change_definition_son',{rules:[{required: true, message: '请选择'}]})(
									<Select
										showSearch
										style={{ width: '100%' }}
										placeholder="选择一"
										optionFilterProp="children"
										filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
									>
										<Option value="jack">Jack</Option>
										<Option value="lucy">Lucy</Option>
										<Option value="tom">Tom</Option>
									</Select>
								)}
							</FormItem>
						</Col>
						<Col span={2}>
							<FormItem {...formItemLayout} labelCol={{sm:{span:0}}} wrapperCol={{sm:{span:24}}}>
								{getFieldDecorator('change_definition_in_one',{rules:[{required: true, message: '请选择'}]})(
									<Input style={{ width: '100%' }} addonAfter={<span>~</span>}/>
								)}
							</FormItem>
						</Col>
						<Col span={10}>
							<FormItem {...formItemLayout} >
								{getFieldDecorator('change_definition_in_two',{rules:[{required: true, message: '请选择'}]})(
									<Input style={{ width: '25%' }} />
								)}
							</FormItem>
						</Col>
					</Row>
					<FormItem {...tailFormItemLayout}>
					    <Button type="primary" htmlType="submit" size="large">确定</Button>
						<Button style={{marginLeft:"20px"}} size="large" onClick={this.cancelOnclick.bind(this)}>取消</Button>
						<Button style={{marginLeft:"20px"}} size="large" onClick={this.saveAndCancelOnclick.bind(this)}>保存并继续添加</Button>
					</FormItem>
			    </Form>
			</div>
		)
	}
}

const WrappedSecondBodypageform = Form.create()(SecondBodypageform);

//渲染下部tabel和form
export class SecondBodypage extends React.Component{

	constructor(props){
		super(props);

		this.state={
			bodyDate: bodyDate,
		};
	}

	render(){
		return (
			<div>
				<Tabel headerData={headerData} bodyDate={this.state.bodyDate} bodyDateObj={bodyDateObj} operating={["play","edit"]} editFn={this.editFn} pageCount={5}/>
				<WrappedSecondBodypageform />
			</div>
		)
	}
}

function initComponentA(){
	ReactDOM.render(
		<Bodypage />,
		document.getElementById("render-container")
	)
}

function initComponentB(){
	ReactDOM.render(
		<SecondBodypage />,
		document.getElementById("render-container-sec")
	)
}

$(document).ready(function(){
	initComponentA();
	initComponentB();
})
