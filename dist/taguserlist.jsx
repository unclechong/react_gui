const jQuery = window.jQuery = $ = window.$ = require('jquery');
require('bootstrap');
const artTemplate = require('../lib/template.js');
require('./../superset-select2.js');

function sendBaseAjax( url,data ,callback,method){
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
		}
	});
}

function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}

function checkparamisnull(arg){
    if($.trim(arg)==""){
    	return "-1"
    }else{
    	return arg
    }
}

var initUserlistEvent = function(){
	
};
  
initUserlistEvent.prototype = {

	activePage:null,
	radio1Value:null,
	radio2Value:null,
	//渲染数据
	remain_data:[],
	//并且条件总数
	and_div_total:0,
	//渲染数据
	need_data:null,
	//添加接口需要字段
	save_json_data:null,
	//是否是保存后直接编辑
	is_edit_POST:false,
	//上次点击的页数
	lastPageNum:null,
	obj_data:{},
	//编辑容错变量 -- 编辑时这一条标签的对应页
	is_edit_act_page:null,
	radio_check_list:{
		"永久有效":"1",
		"失效":"-1",
		"自定义":"0",
		"自定义暂时还没做":"0",
		"每日":"day",
		"每周":"week",
		"每月":"month"
	},
	//编辑操作获取当前ID
	next_edit_id:null,
	//是否进入搜索状态
	isSearch:false,
	//获取当前标签组ID
	tag_group_id:GetQueryString("tag_group_id"),

	getParam:function(arg){
		return arg + "=" + GetQueryString("tag_group_id");
	},

	//初始化tbody
	initPage:function(){
		var _this = this;
		// var param = _this.getParam("tag_group_id");
		var param = {
			tag_group_id:_this.tag_group_id,
			page:"1"
		}
		sendBaseAjax("/supereye/taguser_info",param,function(re){
			// console.log(re)
			_this.renderFn("both",re);
		})
		var json_data = $("#json_data").data("dashboard");
		_this.save_json_data = $("#save_json_data").data("dashboard");
		_this.need_data = json_data;
		console.log(json_data)
		console.log(_this.save_json_data)
		var show_first_data = [];
		for(var key in json_data){
			show_first_data.push({"show_name":json_data[key].comment,"send_name":json_data[key].column_name});
			_this.obj_data[key] = {name:json_data[key].comment,list:json_data[key].enum_value};
		}
		_this.and_div_total = _this.and_div_total + 1;
		show_first_data.push({"and_div_total":_this.and_div_total})
		_this.remain_data = show_first_data;
		var json_dataHtml = artTemplate("renderInutAndDiv",{'cdata':show_first_data});
		$("#addDivFlag").before(json_dataHtml);
	},

	initListenerEvent:function(){
		var _this = this;
		//监听弹出窗
		$("#show_infoAlert").click(function(){
			$('#modal1').modal('show', {backdrop: 'fade'});
		});
		//监听radio1 val
        $(":radio[name='radio1']").click(function () {
        	if($(this).attr("id") == "price_type"){
	            $(".m-data").hide().eq($(this).index()).show();
        	}else{
	            $(".m-data").hide().eq($(this).index()).hide();
	            _this.radio1Value = $(this).attr("data-id");
        	}
        });
        //监听radio2 val
        $(":radio[name='radio2']").click(function () {
            _this.radio2Value = $(this).attr("data-id");
        });
	},

	renderFn:function(arg,data){
		var _this = this;
		var tbodyhtml = artTemplate("refreshTbody",{'cdata':data.data});
		if($("#renderTbody").children().length > 0){
			$("#renderTbody > *").remove();
		}
		$('#renderTbody').append(tbodyhtml);
		// tbodyhtml.fadeIn(800)
		if(arg == "one"){
			setTimeout(function(){
				_this.edit_onClick();
				_this.remove_onClick();
			},1000)
		}else if(arg == "both"){
			//render pager
			var pageNum = data.page_num;
			_this.lastPageNum = data.page_num;
			var taghtml = artTemplate("initRefreshTag",{'cdata':pageNum});
			if($("#renderTag").children().length > 0){
				$("#renderTag > *").remove();
			}
			$('#renderTag').append(taghtml);
			$("#page_1").parent().addClass("active");
			setTimeout(function(){
				_this.activePage = 1;
				_this.edit_onClick();
				_this.remove_onClick();
				_this.li_Onclick(pageNum);
			},1000)
		}
	},


	bindOrUnbindFn:function(Blist){
		var _this = this;
		Blist.map(function(val,i){
			$("*[operate="+val[0]+"]").unbind(val[1]);
		})
		Blist.map(function(val,i){
			_this[val[0]]();
		})
	},

	againRenderTbody:function(arg){
		var _this = this;
		var keyword = $("#keyword").val();
		var url = _this.isSearch?"/supereye/tagsearch":"/supereye/taguser_info";
		var param = {
			tag_group_id:_this.tag_group_id,
			page:_this.activePage
		}
		if(_this.isSearch){
			param.keyword = keyword;
		}
		sendBaseAjax(url,param,function(re){
			_this.renderFn("one",re);
		})
	},

	tagSearch:function(){
		var _this = this;
		$("#click_search").click(function(){
			var keyword = $("#keyword").val();
			var param = {
				tag_group_id:_this.tag_group_id,
				keyword:keyword,
				page:"1"
			}
			sendBaseAjax("/supereye/tagsearch",param,function(re){
				_this.isSearch = true;
				_this.renderFn("both",re);
			})
		});
	},

	li_Onclick:function(o){
		var _this = this;
		$("*[operate='li_onClick']").click(function(){
			var clickNum = $(this).attr("data-id");
			$("#page_"+_this.activePage).parent().removeClass("active");
			if(clickNum == "+"){
				if(_this.activePage < o){
					_this.activePage = _this.activePage + 1;
				}
				$("#page_"+_this.activePage).parent().addClass("active");
			}else if (clickNum == "++"){
				//请求最后页数据，然后渲染最后页列表
				$("#page_"+o).parent().addClass("active");
				_this.activePage = o;
			}else if (clickNum == "-"){
				if(_this.activePage > 1){
					_this.activePage = _this.activePage - 1;
				}
				$("#page_"+_this.activePage).parent().addClass("active");
			}else if (clickNum == "--"){
				//请求第一页数据，然后渲染第一页列表
				$("#page_1").parent().addClass("active");
				_this.activePage = 1;
			}else{
				$(this).parent().addClass("active");
				_this.activePage = Number(clickNum);
			}
			_this.againRenderTbody();
		})
	},

	clean_radio:function(){
		var _this = this;
		var radio_list = $("input[type='radio']:checked");
		if(radio_list.length > 1) {
			radio_list[0].checked = false;
			radio_list[1].checked = false;
		}else if (radio_list.length == 1){
			radio_list[0].checked = false;
		}
	},

	is_many_select:function(){
	    $("select[is-many-select=is_many_select]").select2({
	        placeholder: '请选择',
	        allowClear: true
	    })
	},

	edit_onClick:function(){
		var _this = this;
		$("*[operate='edit_onClick']").click(function(){
			_this.is_edit_POST = true;
			_this.is_edit_act_page = _this.activePage;
			var str = $(this).attr("data-id");
			var index = str.substring(2,str.length);
			$("#tagName").val($("#tagname" + index).html());
			$("#showName").val($("#tags_name" + index).html());
			var status = $("#status" + index).html();
			var exec_hz = $("#exec_hz" + index).html();
			_this.next_edit_id=$("#tagid" + index).html();
			_this.radio1Value=_this.radio_check_list[status];
			_this.radio2Value=_this.radio_check_list[exec_hz];

			/*
			    如果radio1 value == 0   为用户自定时
			    去获取	create_time、later_time 的值

			    同时还要修改130行  修改获取值得方式
			*/

			//add radio custom value in here edit

			_this.clean_radio();
			$(":radio[data-id="+_this.radio_check_list[status]+"]")[0].checked = true;
			if(_this.radio1Value == "0"){
				$(".m-data").show();
			}
			$(":radio[data-id="+_this.radio_check_list[exec_hz]+"]")[0].checked = true;
			var defind_config = $("#defind_config" + index).html()
			var defind_config_data = {
				"defind_config":JSON.parse(defind_config),
				"obj_data":_this.obj_data
			}
			$("#addDivFlag").prevAll().remove();
			$("#addDivFlag").before("<label class='" + "col-sm-1 control-label" + "'>" + "定义" + "</label>");
			var json_dataHtml = artTemplate("editRenderDiv",{'cdata':defind_config_data});
			$("#addDivFlag").before(json_dataHtml);
			_this.and_div_total = defind_config_data.defind_config.length;
			_this.remain_data[_this.remain_data.length-1]["and_div_total"] = _this.and_div_total
			var param = [["delete_alert","click"],["select_click","change"],["select_click_next","change"],["addOrdivEvent","click"]];
			_this.bindOrUnbindFn(param)
			_this.is_many_select();
			// $("#autoAddNameAlert").fadeIn("500");
		})
	},

	remove_onClick:function(){
		var _this = this;
		$("*[operate='remove_onClick']").click(function(){
			var index = $(this).attr("name");
			var this_page = _this.activePage;
			sendBaseAjax("/supereye/del_tag",{tag_group_id:_this.tag_group_id,tag_id:index},function(re){
				//刷新页签
				var send_page = this_page > re.page_num?re.page_num:this_page;
				sendBaseAjax("/supereye/taguser_info",{tag_group_id:_this.tag_group_id,page:send_page},function(re_in){
					_this.renderFn("one",re_in);
					if(_this.lastPageNum > re.page_num){
						var pageNum = re_in.page_num;
						var taghtml = artTemplate("initRefreshTag",{'cdata':pageNum});
						$("#renderTag > *").remove();
						$('#renderTag').append(taghtml);
						_this.li_Onclick(pageNum);
						_this.lastPageNum = pageNum;
						$("#page_"+send_page).parent().addClass("active");
					}
					//清空数据
					if(_this.next_edit_id  == index){
						_this.cleanPage();
					}
				})
			},"POST")
		})
	},

	addOrdivEvent:function(){
		var _this = this;
		$("*[operate='addOrdivEvent']").click(function(){
			var str = $(this).parent().attr("data-id").substring(4,$(this).parent().attr("data-id").length);
			var clone_data = _this.remain_data;
			clone_data[clone_data.length-1]["and_div_total"] = str;
			var addOrHtml = artTemplate("renderOrDiv",{'cdata':clone_data});
			$(this).before(addOrHtml);
			var param = [["delete_alert","click"],["select_click","change"],["select_click_next","change"]];
			_this.bindOrUnbindFn(param)
		})
	},

	addAndTermEvent:function(){
		var _this = this;
		$("a[operate='addAndTermEvent']").click(function(){
			_this.and_div_total = _this.and_div_total + 1;
			_this.remain_data[_this.remain_data.length-1]["and_div_total"] = _this.and_div_total
			var addAndHtml = artTemplate("renderAndDiv",{'cdata':_this.remain_data});
			$(this).parent().before(addAndHtml);
			var param = [["addOrdivEvent","click"],["delete_alert","click"],["select_click","change"],["select_click_next","change"]];
			_this.bindOrUnbindFn(param)
		})
	},

	delete_alert:function(){
		var _this = this;
		$("*[operate='delete_alert']").click(function(){
			var flag = $(this).attr("data-id");
			var str_1 = "div[data-id=and_"+flag.substring(6,flag.length)+"]";
			var str_2 = "div[data-id=alert_"+flag.substring(6,flag.length)+"]";
			var index = $(str_1).children().length;
			if(index == "3" && flag != "close_1"){
				$(str_1).remove();
			}
			if($(this).parent().parent().prev().length == 0 && index > 3 && flag != "close_1"){
				$(this).parent().parent().next().children().eq(0).children().eq(0).html('');
			}
		})
	},

	select_click:function(){
		var _this = this;
		var opr_a = "<option value='"+"p_chosie"+"'>"+"请选择"+"</option>"+"<option value='"+"2"+"'>"+"等于"+"</option>";
		var opr_b = "<option value='"+"p_chosie"+"'>"+"请选择"+"</option>"+"<option value='"+"1"+"'>"+"区间"+"</option>"+"<option value='"+"3"+"'>"+"包含"+"</option>";
		var opr_c = "<option value='"+"p_chosie"+"'>"+"请选择"+"</option>"
		$("select[operate='select_click']").change(function(){
			var val = $(this).val();
			//不可以重复选择
			var flag = true;
			var select_list	= $("select[operate='select_click']").not($(this));
			for (var i=0;i<select_list.length;i++){
				if(val == select_list[i].value){
					flag = false;
					$(this).val("p_chosie");
					$('#showModal2').html("定义条件不允许重复！");
					$('#modal2').modal('show', {backdrop: 'fade'});
					break;
				}
			}
			$(this).next().empty();
			if($(this).val() == "p_chosie"){
				$(this).next().append(opr_c);
			}else{
				if(flag){
					if(_this.need_data[val].is_enum_value == "1"){
						$(this).next().append(opr_a);
					}else{
						$(this).next().append(opr_b);
					}
				}
			}
			var next_spanHtml = artTemplate("next_span",{'cdata':["D"]});
			$(this).next().next().remove();
			$(this).next().after(next_spanHtml);
		})
	},

	select_click_next:function(){
		var _this = this;
		$("select[operate='select_click_next']").change(function(){
			var val = $(this).val();
			var next_spanHtml;
			if(val == "1"){
				next_spanHtml = artTemplate("next_span",{'cdata':["A"]});
			}else if(val == "2"){
				var list = _this.need_data[$(this).prev().val()].enum_value;
				if(list.indexOf("B") == -1){
					list.push("B");
				}
				next_spanHtml = artTemplate("next_span",{'cdata':list});
			}else if(val == "3"){
				next_spanHtml = artTemplate("next_span",{'cdata':["C"]});
			}else{
				next_spanHtml = artTemplate("next_span",{'cdata':["D"]});
			}
			$(this).next().remove();
			$(this).after(next_spanHtml);
			_this.is_many_select();
		})
	},

	cleanPage:function(){
		var _this = this;
		_this.is_edit_POST = false;
		$('#tagName').val('');
		$('#showName').val('');
		// 清空radio按钮，再删除下部模板，再添加init模板，
		var radio_list = $("input[type='radio']:checked");
		_this.clean_radio();
		_this.radio1Value = null;
		_this.radio2Value = null;
		$("#addDivFlag").prevAll().remove();
		$("#addDivFlag").before("<label class='" + "col-sm-1 control-label" + "'>" + "定义" + "</label>");
		_this.and_div_total = 1;
		_this.remain_data[_this.remain_data.length-1]["and_div_total"] = _this.and_div_total;
		var json_dataHtml = artTemplate("renderInutAndDiv",{'cdata':_this.remain_data});
		$("#addDivFlag").before(json_dataHtml);
		$(".m-data").hide();
		//不需要再加监听
		_this.addOrdivEvent();
		// _this.addAndTermEvent();
		_this.delete_alert();
		_this.select_click();
		_this.select_click_next();
	},

	format_data:{
		rerurnOrStr:function(data,obj){
			var str_or = "";
			if(data.condition == "1"){
				str_or = str_or + obj[data.name].name + " : " + data.values[0] + " - " + data.values[1];
			}else if(data.condition == "2"){
				var str_or_in = "";
				for (var l=0;l<data.values.length;l++){
					var is_first = l == 0?"":"、";
					str_or_in = str_or_in + is_first + data.values[l];
				}
				str_or = str_or + obj[data.name].name + " : " + str_or_in;
			}else{
				str_or = str_or + obj[data.name].name + " : " + data.values;
			}
			return str_or = "( " + str_or + " )";
		},

		returnAndStr:function(strArr){
			var reStr = "";
			for (var o=0;o<strArr.length;o++){
				var isAndFirst = o == 0?"":" and ";
				var last_str = strArr[o].indexOf("or") == -1?strArr[o]:"{ " + strArr[o] + " }"
				reStr = reStr + isAndFirst + last_str;
			}
			return reStr;
		}
	},

	re_format_data:function(params,obj){
		var _this = this;
		var strArr = [];
		for(var p = 0;p<params.length;p++){
			var show_str = "";
			for (var k=0;k<params[p].length;k++) {
				var isOrFirst = k == 0?"":" or ";
			    show_str = show_str + isOrFirst + _this.format_data.rerurnOrStr(params[p][k],obj);
			}
			strArr.push(show_str);
		}
		return _this.format_data.returnAndStr(strArr)
	},

	submit_handle:function(isClean){
		var _this = this;
		var tagNameReg = /^[a-zA-Z_][a-zA-Z0-9_]*$/;   //匹配数字字母下划线 tagNameReg.test()
		var tagName = $('#tagName').val();
		var showName = $('#showName').val();
		if($.trim(showName)=="" || _this.radio1Value==null || _this.radio2Value == null){
			$('#showModal2').html("请输入完整后再提交");
			$('#modal2').modal('show', {backdrop: 'fade'});
		}else if(!tagNameReg.test(tagName)){
			$('#showModal2').html("标签名称只能由英文、数字、下划线组成并不能以数字开头，在系统中的唯一性");
			$('#modal2').modal('show', {backdrop: 'fade'});
		}else{
			var str = $("div[get-div-total=def_div]").length;
			var select_1_list = $("select[operate=select_click]");
			var select_2_list = $("select[operate=select_click_next]");
			var select_3_list = $("*[operate=last_select_k]");
			var select_1_value_list=[];
			var select_2_value_list=[];
			var select_3_value_list=[];
			var sendPOST = true;
			for(var i=0;i<select_1_list.length;i++){
				if(select_1_list[i].value == "p_chosie" || select_2_list[i].value == "p_chosie"){
					$('#showModal2').html("请输入完整后再提交");
					$('#modal2').modal('show', {backdrop: 'fade'});
					sendPOST = false;
					break;
				}else{
					select_1_value_list.push(select_1_list[i].value);
					select_2_value_list.push(select_2_list[i].value);
					if($(select_3_list[i]).attr("data-id") == "A"){
						select_3_value_list.push([
							checkparamisnull($(select_3_list[i].children[0]).val()), 
							checkparamisnull($(select_3_list[i].children[1]).val())
						])
						if(checkparamisnull($(select_3_list[i].children[0]).val()) == -1 && checkparamisnull($(select_3_list[i].children[1]).val()) == -1){
							$('#showModal2').html("请输入完整后再提交");
							$('#modal2').modal('show', {backdrop: 'fade'});
							sendPOST = false;
							break;
						}
					}else if($(select_3_list[i]).attr("data-id") == "B"){
						select_3_value_list.push($(select_3_list[i]).val());
						if($(select_3_list[i]).val() == null){
							$('#showModal2').html("请输入完整后再提交");
							$('#modal2').modal('show', {backdrop: 'fade'});
							sendPOST = false;
							break;
						}
					}else if($(select_3_list[i]).attr("data-id") == "C"){
						select_3_value_list.push($(select_3_list[i].children[0]).val());
						if($.trim($(select_3_list[i].children[0]).val()) == ""){
							$('#showModal2').html("请输入完整后再提交");
							$('#modal2').modal('show', {backdrop: 'fade'});
							sendPOST = false;
							break;
						}
					}
				}	
			};
			if(sendPOST){
				var params = {
					show_user_name:showName,
					tag_name:tagName,
					status:_this.radio1Value,
					exec_hz:_this.radio2Value,
					database:_this.save_json_data.database,
					main_data_type:_this.save_json_data.main_data_type,
					table:_this.save_json_data.table,
					tag_group_name:_this.save_json_data.tag_group_name,
					tag_main_data:_this.save_json_data.tag_main_data,
					tag_group_id:_this.tag_group_id,
					status_code:"add",
					defind_config :[],
					col_name:_this.save_json_data.col_name,
					hbase_tbl_name:_this.save_json_data.hbase_tbl_name,
					par_name:_this.save_json_data.par_name,
					map_tbl_name:_this.save_json_data.map_tbl_name,
					is_exec:"0",
				};
				if(_this.is_edit_POST){
					params.status_code = "edit";
					params.tag_id = _this.next_edit_id;
				}
				if(isClean){
					params.is_exec = "1";
				}
				var fortotal = 0;
				for(var j=1;j<str+1;j++){
					// var len = $("div[data-id=and_"+j+"]").children().length;
					var len = $("div[get-div-total=def_div]").eq(j-1).children().length;
					if(j==1){
						len = len - 1;
					}else{
						len = len - 2;
					}
					params.defind_config.push(new Array())
					for (var k =1;k<len+1;k++){
						var obj = {
							"name":select_1_value_list[fortotal],
							"condition":select_2_value_list[fortotal],
							"values":select_3_value_list[fortotal]
						}
						params.defind_config[j-1].push(obj)
						fortotal = fortotal + 1;
					}
				}
				params.defind_info = _this.re_format_data(params.defind_config,_this.obj_data);
				console.log(params)
				//http://192.168.1.112:9009
				sendBaseAjax('/supereye/save_taguser',JSON.stringify(params),function(re){
					//刷新表单
					if(!_this.is_edit_POST){
						$("#keyword").val("");
						_this.isSearch = false;
						_this.renderFn("one",re);
						//刷新页签
						if(_this.lastPageNum < re.page_num){
							var pageNum = re.page_num;
							var taghtml = artTemplate("initRefreshTag",{'cdata':pageNum});
							$("#renderTag > *").remove();
							$('#renderTag').append(taghtml);
							_this.li_Onclick(pageNum);
							$("#page_1").parent().removeClass("active");
						}
						//如果页数不变不再改变样式
						if(_this.activePage != _this.lastPageNu){
							//处理页签样式显示
							$("#page_"+_this.activePage).parent().removeClass("active");
							$("#page_"+re.page_num).parent().addClass("active");
						}  

						_this.activePage = re.page_num;
						//上一次添加的页面总数
						_this.lastPageNum = re.page_num;
						//再次点击保存为编辑状态
						_this.is_edit_POST = true;
						// _this.next_edit_id = re.data[re.data.length-1].id;
						// if(isClean){
							_this.cleanPage();
						// }
					}else{
						if(_this.isSearch){
							var keyword = $("#keyword").val();
							var param = {
								tag_group_id:_this.tag_group_id,
								keyword:keyword,
								page:_this.activePage
							}
							sendBaseAjax("/supereye/tagsearch",param,function(re){
								// console.log(re)
								_this.renderFn("one",re);
							})
						}else{
							var act_page = _this.is_edit_act_page?_this.is_edit_act_page:_this.activePage;
							var param = {
								tag_group_id:_this.tag_group_id,
								keyword:keyword,
								page:_this.act_page
							}
							sendBaseAjax("/supereye/taguser_info",param,function(re){
								_this.renderFn("one",re);
								$("#page_"+_this.activePage).parent().removeClass("active");
								$("#page_"+act_page).parent().addClass("active");
								_this.activePage = _this.is_edit_act_page?_this.is_edit_act_page:data.page_num;
							})
						}
						_this.cleanPage();
					}
				},'POST')
			}
		}
	},

	//提交按钮
	submitData:function(){
		var _this = this;
		$("*[operate='submitData']").click(function(){
			// sendBaseAjax("/supereye/executor ",{},function(re){},"POST");
			_this.submit_handle(true);
		})
	},

	//取消按钮清空input
	cancelSubmitData:function(){   
		var _this = this;
		$("*[operate='cancelSubmitData']").click(function(){
			_this.cleanPage();
		})
	},

	submitDataAndClean:function(){
		var _this = this;
		$("*[operate='submitDataAndClean']").click(function(){
			//保存并添加直接调取取消方法
			_this.submit_handle();
		})
	},

	init:function(){
		//初始化渲染数据
		this.initPage();
		//事件监听
		// this.tagNameOnblur();
		this.tagSearch();
		this.initListenerEvent();
		this.submitData();
		this.cancelSubmitData();
		this.addOrdivEvent();
		this.addAndTermEvent();
		this.delete_alert();
		this.select_click();
		this.select_click_next();
		this.submitDataAndClean();
	}
}

$(document).ready(function () {
	var initPro = new initUserlistEvent();
	initPro.init();
})
