import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jQuery'
import './css/index.css'

import _ from 'underscore';
import { Select , Form , Input , Button , Cascader , Col , Row , notification } from 'antd';
const Option = Select.Option;
const FormItem = Form.Item;

// import require 都是一种模块化开发的一种形式，前者是ES6的写法，react 推荐使用ES6方法引入

/*
	创建组件
    React.createClass
    class Example extends React.Component
    使用后面的API，前一个不推荐，已经废弃
*/

/*
    定义类使用了ES6的写法，一个文件可以定义多个类，一个全局的类（default 默认暴露出去）
    export default class Example extends React.Component    引入 -- import Example from 'index.js';
    export class ExampleA extends React.Component                   import { ExampleA , ExampleB } from 'index.js';
    export class ExampleB extends React.Component
    具体查看ES6 文档   http://es6.ruanyifeng.com/#docs/module
*/

/*属性命名时使用驼峰式命名，
 	className   marginLeft
 	onClick     onChange
*/



// 定义组件名字时，一定要大写，小写无效，为了区别和原生html标签 例 <Select /> <select />
// return 时 必须返回一个子节点
// 节点默认都是都style的属性 ，值是object
// let styleObj = {fontSize:10,color:"#147eed"}   fontSize:'10px'   style={styleObj}
// 直接在style属性里面定义              style={{fontSize:10,color:"#147eed"} }

// React 不是一定要使用 JSX 语法，可以直接使用原生 JS。
// JSX语法看上去像是在Javascript代码里直接写起了XML标签，
// 实质上这只是一个语法糖，每一个XML标签都会被JSX转换工具转换成纯Javascript代码，
// 所以建议使用 JSX 是因为它能精确定义和反应组件及属性的树状结构，
// 使得组件的结构和组件之间的关系看上去更加清晰。
// 方便MXML和XAML的开发人员 – 因为他们已经使用过类似的语法；


// jsx es6  会通过babel插件转成 标准浏览器识别的js    嵌入的标签也会转成Js
// jsx   https://tianxiangbing.github.io/react-cn/docs/jsx-in-depth.html
// 在嵌入的标签运用脚本  使用 {  js code }
// {}中可以嵌入JS表达式，常见的是三目运算符与map操作
// jsx 约束 不在jsx 语法内使用if 语句   使用三目运算符规避     ? :
// 若想循环输出html时，尽量使用underscore 插件 _.map
// 两种方法循环输出时 记得加key    为了更快速的比对渲染页面！   参考http://www.tuicool.com/articles/UVvaMz

/*
    state 使用
   	state 是驱动视图改变的属性，state 有变化，react 会自动重新render组件
   	使用state时要给默认属性，
	-------------
   	和渲染无关的状态尽量不要放在 state 中来管理
   	不会驱动视图改变的变量不要放在state中   放在全局this中   尽量控制state数量

   	通常 state 中只来管理和渲染有关的状态 ，从而保证 setState 改变的状态都是和渲染有关的状态。
   	这样子就可以避免不必要的重复渲染。其他和渲染无关的状态，
   	可以直接以属性的形式保存在组件中，在需要的时候调用和改变，不会造成渲染。
	-------------
   	改变时使用 react API   setState({ test : "change"})
	避免不必要的修改，当 state 的值没有发生改变的时候，尽量不要使用 setState
   	XXXXXXX   重点   ↓
   	setState是异步发生的   如果setState 时数据量比较大，会有延时，
   	如果在setState后立马调用这个state  务必加setTimeout()  50-200毫秒
   	或者使用回调，setState 后 官方api 支持回调 去调用这个state
   	setState({ test : "change"},function(){})    但是我没用过
   	XXXXXXX   重点   ↑
   	react 开发是另一种思想，抛弃操作DOM节点改变视图的观念，用state去动态控制视图
   	具体参考 http://wiki.jikexueyuan.com/project/react/forms.html

   	props 使用
   	不能改变  只能进行传递

   	组件间通信
   	参考   http://www.tuicool.com/articles/AzQzEbq    http://www.cnblogs.com/MuYunyun/p/6602433.html

   	异步请求 this 指向 作用域的问题
   	$.ajax({
	  url: '、、、、、、',
	  dataType: 'json',
	  async: false,
	  success: function(res){
	    this.setState({res});     这里的this指向会变     在外部  let me = this   获取外部this指向
	  }
	});

	构造函数
	constructor(props){
		super(props);          继承父类props

		this.flag = true       存在全局this中的值    自己功能需要的变量

		this.state={			设置的默认state
			value:""
		};
	}

	组件生命周期
	componentWillMount()
	在挂载发生前被立即调用。
	componentDidMount()
	在挂载发生后被立即调用。 需要DOM node的初始化应该放在这里。
	componentWillReceiveProps(object nextProps)
	当挂载的组件接收到新的props时被调用。此方法应该被用于比较this.props 和 nextProps以用于使用this.setState()执行状态转换。
	shouldComponentUpdate(object nextProps, object nextState):
	boolean 当组件决定任何改变是否要更新到DOM时被调用。作为一个优化实现比较this.props 和 nextProps 、this.state 和 nextState ，如果React应该跳过更新，返回false。
	componentWillUpdate(object nextProps, object nextState)
	在更新发生前被立即调用。你不能在此调用this.setState()。
	componentDidUpdate(object prevProps, object prevState)
	在更新发生后被立即调用。
	componentWillUnmount()
	在组件被卸载和摧毁前被立即调用。清理应该放在这里。
	参考 http://react-china.org/t/react/1740       https://segmentfault.com/a/1190000004168886

   	antd 组件使用  很全，很详细！ 主体样式可以自定义
   	参考API    https://ant.design/docs/react/introduce-cn

   	webpack 打包  package.json
   	部署本地开发环境
	chorme React 开发工具
	atom 文本编辑器  react 插件，错误高亮提示，代码补全

*/

export class InputExample extends React.Component{

	constructor(props){
		super(props);

		this.state={
			value:""
		};
	}

	getValue(){
		return this.state.value
	}

	handleOnchange(e){
		this.setState({
			value:e.target.value
		})
	}

	render(){
		return (
			<Input onChange={this.handleOnchange.bind(this)} value={this.state.value} style={{width:this.props.width,marginLeft:50}}/>
		)
	}
}

export class Example extends React.Component{
	render(){
		return <h1>{`我是@@@Example组件-------->props:${this.props.showStr}`}</h1>
	}
}

export class NewExample extends React.Component{
	// constructor(props){
	// 	super(props);
	//
	// 	this.state={
	// 		changeTable:false
	// 	};
	// }

	state = {
		changeTable:false
	}

	returnTest(){
		return(
			<h2>test</h2>
		)
	}

	handleOnclick(){
		this.setState({
			changeTable:!this.state.changeTable
		})
	}

	getValueOnclick(){
		notification['error']({
			message: 'getValue',
			description: this.refs.input.getValue()!=""?this.refs.input.getValue():"no value",
			placement:"topLeft"
		});
	}

	test=(e)=>{
		console.log(e);
	}

	componentWillMount(){
		console.log(1111);
	}

	componentDidMount(){
		console.log(333);
	}

	render(){
		console.log(222);
		let obj = {name:"zhang",age:"99"}
		let testArr = [];
		for (let o in obj){
			testArr.push(<h3 key={o}>{`${o} : ${obj[o]} `}</h3>)
		}
		this.test('33')

		return(
			<div>
				<h1>i am in !</h1>
				<div> ----------------------------------------------------------------------------------------</div>
				{this.returnTest()}
				<div> ----------------------------------------------------------------------------------------</div>
				{
					// if(typeof obj == "object"){
					// 	return <h1>我是object</h1>
					// }else{
					// 	return <h1>我是else</h1>
					// }
					typeof obj == "object"?<h1>我是object</h1>:<h1>我是else</h1>
				}
				<div> ----------------------------------------------------------------------------------------</div>
				<div data-tag="zhang" data-ctag="zhang"></div>
				<div> ----------------------------------------------------------------------------------------</div>
				{
					_.map(['1','2'],(v,k)=>{
						return (
							<div key={v}>{"我是" + v}</div>
						)
					})
				}
				<div> ----------------------------------------------------------------------------------------</div>
				{testArr}
				<div> ----------------------------------------------------------------------------------------</div>
				<Example  showStr="我是props"/>
				<div> ----------------------------------------------------------------------------------------</div>
				<Button type="primary" onClick={this.handleOnclick.bind(this)}>click me</Button>
				<h1>{this.state.changeTable?"true":"false"}</h1>
				<div> ----------------------------------------------------------------------------------------</div>
				<InputExample ref="input" width={200}/>
				<Button type="primary" onClick={this.getValueOnclick.bind(this)}>get value</Button>
				<div> ----------------------------------------------------------------------------------------</div>
			</div>
		)
	}
}


function initComponentA(){
	ReactDOM.render(
		<NewExample />,
		document.getElementById("container")
	)
}

$(document).ready(function(){
	initComponentA();
})
