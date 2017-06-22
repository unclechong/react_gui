import React, {Component} from 'react';
import {
    message
} from 'antd';
// //走promise 封装ajax方法 ！！！
// export function sendAjax(url, data, type) {
//     const promise = new Promise(function(resolve, reject) {
//         $.ajax({
//             url: url,
//             type: type == null
//                 ? 'GET'
//                 : type,
//             dataType: "json",
//             data: data == null
//                 ? {}
//                 : data,
//             async: true,
//             contentType: "application/json",
//             success: function(data) {
//                 // callback(data);
//                 resolve(data);
//             },
//             error: function(XMLHttpRequest, textStatus, errorThrown) {
//                 if (XMLHttpRequest.status == "401") {
//                     //jump  报错页面 或 报错信息
//                 } else {
//                     //错误处理  容错
//                     // alert(XMLHttpRequest.responseText);
//                 }
//                 reject();
//             }
//         });
//     });
//     return promise;
// }

// export const getJSON = function(url) {
//     var promise = new Promise(function(resolve, reject) {
//         var client = new XMLHttpRequest();
//         client.open("GET", url);
//         client.onreadystatechange = handler;
//         client.responseType = "json";
//         client.setRequestHeader("Accept", "application/json");
//         client.send();
//
//         function handler() {
//             if (this.readyState !== 4) {
//                 return;
//             }
//             if (this.status === 200) {
//                 resolve(this.response);
//             } else {
//                 reject(new Error(this.statusText));
//             }
//         };
//     });
//
//     return promise;
// };
//
//
// export class Fetch {
//
//     constructor(url, params, successFunc, errorFunc) {
//         // super();
//         this.url = url;
//         this.params = params;
//         this.successFunc = successFunc;
//         this.errorFunc = errorFunc;
//         // this.test()
//     }
//
//     test() {
//         console.log(111);
//     }

//发送GET请求
// export function getFetch(url,params,successFunc,errorFunc) {
//     var str = '';
//     if (typeof params === 'object' && params) {
//         str += '?';
//         Object.keys(params).forEach(function(val) {
//             str += val + '=' + encodeURIComponent(params[val]) + '&';
//         })
//     }
//     fetch(url + str, {method: 'GET'}).then(function(res) {
//         if (res.ok) {
//             res.json().then(function(data) {
//                 successFunc(data);
//             })
//         } else if (res.status === 401) {
//             console.log('请求失败');
//             errorFunc();
//         }
//     }, function(e) {
//         console.log('请求失败');
//         errorFunc();
//     })
// }
//
// //发送POST请求
// export function postFetch(url,params,successFunc,errorFunc) {
//     var that = this;
//     var formData = new FormData();
//     for (let k in params) {
//         formData.append(k, params[k]);
//     }
//     formData.append('oper_id', '11');
//     formData.append('oper_name', 'kong');
//     fetch(url, {
//         method: 'POST',
//         mode: 'cors',
//         body: formData
//     }).then(function(res) {
//         if (res.ok) {
//             res.json().then(function(data) {
//                 successFunc(data);
//             })
//         } else {
//             console.log('请求失败');
//             errorFunc();
//         }
//     }, function(e) {
//         console.log('请求失败');
//         errorFunc();
//     })
// }
// }

class NetUtil extends React.Component {
    /*
     *  get请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static get(url, params, callback) {
        if (params) {
            let paramsArray = [];
            //拼接参数
            Object.keys(params).forEach(key => paramsArray.push(key + '=' + params[key]))
            if (url.search(/\?/) === -1) {
                url += '?' + paramsArray.join('&')
            } else {
                url += '&' + paramsArray.join('&')
            }
        }
        //fetch请求
        fetch(url, {method: 'GET'}).then((response) => response.json()).then(json=>{
            callback(json);
        },error=>{
            message.error('网络连接异常，请稍后再试！',5);
        })
    }
    /*
     *  type:post,put,delete请求
     *  url:请求地址
     *  data:参数
     *  callback:回调函数
     * */
    static elseRequest(url, data, callback, type) {
        //fetch请求
        fetch(url, {
            method: type,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json' //记得加上这行，不然bodyParser.json() 会识别不了
            },
            body: JSON.stringify(data)
        }).then((response) => response.json()).then((responseJSON) => {
            callback(responseJSON)
        },error=>{
            message.error('网络连接异常，请稍后再试！',5);
        })
    }

    static sendBaseAjax( url,data ,callback, method, error){
    	if( method == undefined || method == ''){
    		method = 'GET';
    	}
    	var ajaxObj = $.ajax({
    		url : url,
    		timeout: 10000,
    		data:data,
    		dataType: "json",
    		method:method,
    		success : function(data){
    			callback(data);
    		},
    		error:function(rep){
    			if (error == undefined || error == "") {
    				message.error('网络连接异常，请稍后再试！',5);
    			}else{
    				error(rep);
    			}
    		}
    	});
    }

}

module.exports = NetUtil;
