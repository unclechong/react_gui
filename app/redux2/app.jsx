import React from 'react';
import ReactDOM from 'react-dom';
import Content from './component/content.jsx'
import $ from 'jquery';
import { createStore, applyMiddleware  } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import reducer from './reduce/index.js';

const store = createStore(reducer, applyMiddleware(thunk));

function initComponentA(){
	ReactDOM.render(
        <Provider store={store}>
            <Content />
        </Provider>,
		document.getElementById("container")
	)
}

$(document).ready(function(){
	initComponentA();
})


/**
* 1. immutable的使用
* 2. redux-immutable的使用
* 3. bindActionCreators的使用
* 4. pure-render-decorator pure-render-immutable-decorator   ES7新特性
* 5. redux-thunk
* 6. Redux-saga
* 7. Dva
**/

// 1. 方便数据比较，提升修改数据时的性能
//    http://blog.csdn.net/sinat_17775997/article/details/73603797

// 2. 提升性能，如果仅使用了immutable的使用，在reduce处理state时，
//    每次都需要先装成 immutable对象，处理之后再转化成JS对象，
//    使用后就要在此项目中全局JS对象替换成immutable对象，
//    在异步请求数据后也要一时间将数据转化成immutable对象
//    http://react-china.org/t/react-redux-immutablejs/9948

// 3. 帮助绑定action,不必没个方法都写一遍，直接将需要的action封装成obj调用

// 4. 封装好的 shouldComponentUpdate 插件
//    适用immutable对的数据格式，pure-render-decorator适用js obj
//    直接
//    import pureRender from 'pure-render-decorator';
//    @pureRender
//    帮你增强修饰  也可以重写
//    要配置BABEL
// 	  http://www.jianshu.com/p/a138a525c287    部分新特性
//    https://github.com/lcxfs1991/blog/issues/8

// 5. applyMiddleware的概念，redux-thunk解决异步操作,redux-logger日志打印
//    正常情况下，dispatch只接受对象作为参数，没个dispatch就能发送一个action，为同步操作
//    redux-thunk可以将dispatch的参数扩展为function也可以，
//    这样就可以在在function中处理异步操作
//    https://segmentfault.com/a/1190000007843340   中间件
//    http://www.ruanyifeng.com/blog/2016/09/redux_tutorial_part_two_async_operations.html

// 6. Redux-saga 处理异步更好的方式，ES6 Generator， ES7 await
//    严格贯彻了函数流式编程的思想,把一个复杂逻辑处理为一个数据流.
//    https://zhuanlan.zhihu.com/p/25024255
//    http://www.jianshu.com/p/d6dc6186ff03

// 7. 如果你既用了react-redux又使用了redux-saga ，阿里大牛就把这堆东西都能装到了一起---Dva框架
//    简洁，优雅，
//    https://github.com/dvajs/dva/issues/1
//    https://cnodejs.org/topic/5895a8541555834405dde673

// 既然有了Redux，为啥还要有react-redux呢，那是因为Redux不仅仅提供给React，Vue或者Angular也可以使用的。针对React，react-redux主要提供了两个东东，一个是<Provider/>组件 ,一个是 connect()方法。
// http://www.jianshu.com/p/cec7ca070cd3
