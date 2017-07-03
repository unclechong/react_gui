import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import {Button, Icon, Select, Tooltip, message} from 'antd';
import _ from 'underscore';
import ConsoleComponent from './component/ConsoleComponent.jsx'
import ZoomCharts from './component/ZoomCharts.jsx'
import NetUtil from '../common/NetUtil.jsx'
import './css/index.css'
const Option = Select.Option;

// const JSON = {"entityList":[{"excludeId":null,"createTime":1495767190000,"updateTime":1495767190000,"isdel":0,"start":null,"pageSize":null,"id":18091,"entityTypeId":10,"entityName":"轨道交通信号系统","entityNameEn":null,"uniqueMd5":"8587c3f052b5f1d7569c1106524770d3","entityCode":null,"entityAttrJson":null,"domainId":null,"paramEntityId":null,"entityCategoryList":[{"excludeId":null,"createTime":1495767190000,"updateTime":1495767190000,"isdel":0,"start":null,"pageSize":null,"entityId":18091,"entityName":"轨道交通信号系统","entityNameEn":null,"catalogId":0,"folkonomyId":0,"uniqueMd5":"8d9d4a6ada2203326292becd8a961dc9","categoryName":null,"entityTypeId":null,"folkonomyName":null,"ids":null}],"entityArributeList":[]}],"relationList":[{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150837,"relationTypeId":1,"entityId1":30675,"entityId2":66529,"relationName":"高管","uniqueMd5":"5afb944f60a7c7a46ac49831331b2e74","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"潘丽春","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150838,"relationTypeId":1,"entityId1":30675,"entityId2":39793,"relationName":"高管","uniqueMd5":"fc0992cfdd9158bf70aa8703b7aa4628","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"陈均","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150839,"relationTypeId":1,"entityId1":30675,"entityId2":42160,"relationName":"高管","uniqueMd5":"2e7201bf8a449d01be96060537dcd936","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"楼洪海","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150840,"relationTypeId":1,"entityId1":30675,"entityId2":52260,"relationName":"高管","uniqueMd5":"7667b9c52115bf09c6d7d750dbda746e","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"赵建","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150841,"relationTypeId":1,"entityId1":30675,"entityId2":68445,"relationName":"高管","uniqueMd5":"bb517439138eb387c7b74c74548342eb","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"林毅","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150842,"relationTypeId":1,"entityId1":30675,"entityId2":43768,"relationName":"高管","uniqueMd5":"02ffa66f627184b4b186548d7041f696","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"史烈","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150843,"relationTypeId":1,"entityId1":30675,"entityId2":62519,"relationName":"高管","uniqueMd5":"47068048c62104ca5f80540a6becfec6","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"卢西伟","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150848,"relationTypeId":1,"entityId1":30675,"entityId2":58584,"relationName":"高管","uniqueMd5":"403d849af7e6f011bde9c02b4bb05f13","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"胡征宇","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150849,"relationTypeId":1,"entityId1":30675,"entityId2":53919,"relationName":"高管","uniqueMd5":"294f47d86e151c33ed3f17634377af52","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"董丹青","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150850,"relationTypeId":1,"entityId1":30675,"entityId2":70798,"relationName":"高管","uniqueMd5":"a6575cc80cc633a73bef761cd0e71345","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"章遂平","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150852,"relationTypeId":1,"entityId1":30675,"entityId2":62255,"relationName":"高管","uniqueMd5":"098fd1a1d36250ff119b30c627e05df9","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"李军","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150853,"relationTypeId":1,"entityId1":30675,"entityId2":72391,"relationName":"高管","uniqueMd5":"87b33346f17e90ce56660e9ec316698b","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"江向阳","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150854,"relationTypeId":1,"entityId1":30675,"entityId2":43658,"relationName":"高管","uniqueMd5":"9a0f18b07d47d343dd7b59cbbab81805","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"王国平","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150855,"relationTypeId":1,"entityId1":30675,"entityId2":67535,"relationName":"高管","uniqueMd5":"05cb8814a23bc0e36874536dd8de1705","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"凌祝军","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150856,"relationTypeId":1,"entityId1":30675,"entityId2":47030,"relationName":"高管","uniqueMd5":"32ea29aa4549bc92f7e3d59431c2ef3f","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"边劲飞","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150857,"relationTypeId":1,"entityId1":30675,"entityId2":36341,"relationName":"高管","uniqueMd5":"e0012236bc74d10b9bc94d63a22fe68e","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"周宏","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150858,"relationTypeId":1,"entityId1":30675,"entityId2":34990,"relationName":"高管","uniqueMd5":"c3f80cfbeb8797b2138b572b1fec4ef0","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"刘梅娟","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150859,"relationTypeId":1,"entityId1":30675,"entityId2":52873,"relationName":"高管","uniqueMd5":"1475549ad1802003a91fe07ec1803ac3","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"何昊","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1496280847000,"updateTime":1496280847000,"isdel":0,"start":null,"pageSize":null,"id":150860,"relationTypeId":1,"entityId1":30675,"entityId2":48452,"relationName":"高管","uniqueMd5":"e4e1b14226ff0481b6d0e5182930964c","relationAttrJson":null,"relationTypeName":"高管","entityName1":"众合科技","entityName2":"叶志祥","domainId":null,"entityTypeId1":4,"entityTypeId2":6,"entityTypeName1":"股票","entityTypeName2":"人物","paramEntityIds":null},{"excludeId":null,"createTime":1495769286000,"updateTime":1495769286000,"isdel":0,"start":null,"pageSize":null,"id":9329,"relationTypeId":4,"entityId1":33338,"entityId2":13613,"relationName":"上位产品","uniqueMd5":"485e5a71fd18c5515476198a12f23ffc","relationAttrJson":null,"relationTypeName":"上位产品","entityName1":"轨交信号系统","entityName2":"信号系统","domainId":null,"entityTypeId1":10,"entityTypeId2":10,"entityTypeName1":"产品","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769290000,"updateTime":1495769290000,"isdel":0,"start":null,"pageSize":null,"id":34645,"relationTypeId":4,"entityId1":18091,"entityId2":13613,"relationName":"上位产品","uniqueMd5":"0df79320747f9e18b747f34abf66ff14","relationAttrJson":null,"relationTypeName":"上位产品","entityName1":"轨道交通信号系统","entityName2":"信号系统","domainId":null,"entityTypeId1":10,"entityTypeId2":10,"entityTypeName1":"产品","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769285000,"updateTime":1495769285000,"isdel":0,"start":null,"pageSize":null,"id":253,"relationTypeId":8,"entityId1":32310,"entityId2":18351,"relationName":"主营产品","uniqueMd5":"0d7dfedb5ca18a567e839e3f1d587164","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"电气设备","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769285000,"updateTime":1495769285000,"isdel":0,"start":null,"pageSize":null,"id":3958,"relationTypeId":8,"entityId1":32310,"entityId2":2280,"relationName":"主营产品","uniqueMd5":"49e9d682128cf2fefaeaa225b8037300","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"基础设施建设","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769285000,"updateTime":1495769285000,"isdel":0,"start":null,"pageSize":null,"id":4667,"relationTypeId":8,"entityId1":32310,"entityId2":30040,"relationName":"主营产品","uniqueMd5":"eb9500f8654a81c5c1380dcae617b672","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"用电自动化及终端设备","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769285000,"updateTime":1495769285000,"isdel":0,"start":null,"pageSize":null,"id":4707,"relationTypeId":8,"entityId1":32310,"entityId2":7589,"relationName":"主营产品","uniqueMd5":"61c3909127bb9ef957936c01b9bc6116","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"农电自动化","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769285000,"updateTime":1495769285000,"isdel":0,"start":null,"pageSize":null,"id":4795,"relationTypeId":8,"entityId1":32310,"entityId2":32981,"relationName":"主营产品","uniqueMd5":"ce4099d1c5b19123efa99ca324d4d7af","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"电力自动化","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769285000,"updateTime":1495769285000,"isdel":0,"start":null,"pageSize":null,"id":4797,"relationTypeId":8,"entityId1":32310,"entityId2":11939,"relationName":"主营产品","uniqueMd5":"f6cae21f7c207f1408777d9235f72964","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"电力系统","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769286000,"updateTime":1495769286000,"isdel":0,"start":null,"pageSize":null,"id":6464,"relationTypeId":8,"entityId1":32310,"entityId2":28123,"relationName":"主营产品","uniqueMd5":"d177472cd6d07577906e7544dfcdfa63","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"智能电表","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769286000,"updateTime":1495769286000,"isdel":0,"start":null,"pageSize":null,"id":9298,"relationTypeId":8,"entityId1":30675,"entityId2":10286,"relationName":"主营产品","uniqueMd5":"1a717428e05911e4b2bb143b21b18004","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"铁路信号","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769286000,"updateTime":1495769286000,"isdel":0,"start":null,"pageSize":null,"id":9309,"relationTypeId":8,"entityId1":30675,"entityId2":18091,"relationName":"主营产品","uniqueMd5":"046ec005f33229e2d3bf8a4baa7349fb","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"轨道交通信号系统","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769287000,"updateTime":1495769287000,"isdel":0,"start":null,"pageSize":null,"id":12133,"relationTypeId":8,"entityId1":30675,"entityId2":20903,"relationName":"主营产品","uniqueMd5":"bf5ff4813439cadcf63a9d784643bd7d","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"水处理业务","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769287000,"updateTime":1495769287000,"isdel":0,"start":null,"pageSize":null,"id":12682,"relationTypeId":8,"entityId1":32310,"entityId2":33192,"relationName":"主营产品","uniqueMd5":"a4a5816c9f029f7e6b82c5c57fbb37af","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"电力市场","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769287000,"updateTime":1495769287000,"isdel":0,"start":null,"pageSize":null,"id":13284,"relationTypeId":8,"entityId1":30675,"entityId2":6895,"relationName":"主营产品","uniqueMd5":"af8bb153095f5fdc7c0cc11dc998c16c","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"轨道交通","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769287000,"updateTime":1495769287000,"isdel":0,"start":null,"pageSize":null,"id":13520,"relationTypeId":8,"entityId1":30675,"entityId2":6527,"relationName":"主营产品","uniqueMd5":"e01a5eeb098bab6ea2cad57638905090","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"烟气脱硫设施的运营维护","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769287000,"updateTime":1495769287000,"isdel":0,"start":null,"pageSize":null,"id":16492,"relationTypeId":8,"entityId1":32310,"entityId2":6895,"relationName":"主营产品","uniqueMd5":"d9566a4384c58342de810b4992bb5999","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"轨道交通","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769287000,"updateTime":1495769287000,"isdel":0,"start":null,"pageSize":null,"id":17537,"relationTypeId":8,"entityId1":32310,"entityId2":5294,"relationName":"主营产品","uniqueMd5":"4026400ca8bcce6b06e7ad391615b3d8","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"配网自动化","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769287000,"updateTime":1495769287000,"isdel":0,"start":null,"pageSize":null,"id":17937,"relationTypeId":8,"entityId1":32310,"entityId2":9207,"relationName":"主营产品","uniqueMd5":"dec73b4263e5839f8f02236a8d3073d8","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"电网自动化","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769287000,"updateTime":1495769287000,"isdel":0,"start":null,"pageSize":null,"id":17985,"relationTypeId":8,"entityId1":32310,"entityId2":24309,"relationName":"主营产品","uniqueMd5":"061db1a49e0e992b724bd45db3722fe2","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"轨交自动化","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769287000,"updateTime":1495769287000,"isdel":0,"start":null,"pageSize":null,"id":17987,"relationTypeId":8,"entityId1":32310,"entityId2":24001,"relationName":"主营产品","uniqueMd5":"07b992e971a37031ce730cc8cc293893","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"电网调度自动化","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769287000,"updateTime":1495769287000,"isdel":0,"start":null,"pageSize":null,"id":18641,"relationTypeId":8,"entityId1":30675,"entityId2":31612,"relationName":"主营产品","uniqueMd5":"e8a7caf6e40186dd2807c19874a00c8d","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"轨交业务","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769288000,"updateTime":1495769288000,"isdel":0,"start":null,"pageSize":null,"id":22167,"relationTypeId":8,"entityId1":30675,"entityId2":1072,"relationName":"主营产品","uniqueMd5":"c79df54d73bf524ca0f3b4cd31e24836","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"众合轨道交通","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769288000,"updateTime":1495769288000,"isdel":0,"start":null,"pageSize":null,"id":24428,"relationTypeId":8,"entityId1":32310,"entityId2":18091,"relationName":"主营产品","uniqueMd5":"876dd6e8c0f1cf11fc0bce9c997fb849","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"轨道交通信号系统","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769288000,"updateTime":1495769288000,"isdel":0,"start":null,"pageSize":null,"id":25310,"relationTypeId":8,"entityId1":30675,"entityId2":13217,"relationName":"主营产品","uniqueMd5":"f83d181b3022fdcc30523bd4266c3831","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"轨道交通机电工程","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769289000,"updateTime":1495769289000,"isdel":0,"start":null,"pageSize":null,"id":27781,"relationTypeId":8,"entityId1":32310,"entityId2":23540,"relationName":"主营产品","uniqueMd5":"2dc715b56afbcc27393b03ebb51e93d3","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"电网自动化业务","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769289000,"updateTime":1495769289000,"isdel":0,"start":null,"pageSize":null,"id":28980,"relationTypeId":8,"entityId1":30675,"entityId2":12915,"relationName":"主营产品","uniqueMd5":"4a74b627b56ef842054975b85f5c858a","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"脱硫业务","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769289000,"updateTime":1495769289000,"isdel":0,"start":null,"pageSize":null,"id":30478,"relationTypeId":8,"entityId1":30675,"entityId2":7019,"relationName":"主营产品","uniqueMd5":"1649bfd612142d8087f21221e6c0473a","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"轨道交通业务","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769289000,"updateTime":1495769289000,"isdel":0,"start":null,"pageSize":null,"id":33158,"relationTypeId":8,"entityId1":30675,"entityId2":13051,"relationName":"主营产品","uniqueMd5":"df8490e6c20856670ee0c6c2e857e8fd","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"烟气脱硫脱硝机电工程","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769289000,"updateTime":1495769289000,"isdel":0,"start":null,"pageSize":null,"id":33159,"relationTypeId":8,"entityId1":30675,"entityId2":28055,"relationName":"主营产品","uniqueMd5":"249e7c14eff6eb1913320b56349b77c2","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"烟气脱硫特许经营权","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769289000,"updateTime":1495769289000,"isdel":0,"start":null,"pageSize":null,"id":33162,"relationTypeId":8,"entityId1":30675,"entityId2":968,"relationName":"主营产品","uniqueMd5":"d47c86bf18a5a905891f22e7055b7abb","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"单晶硅及其制品","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769289000,"updateTime":1495769289000,"isdel":0,"start":null,"pageSize":null,"id":33184,"relationTypeId":8,"entityId1":30675,"entityId2":25421,"relationName":"主营产品","uniqueMd5":"565b84ae67eecd4b7f95478aed1b66c1","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"轨交信号","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769289000,"updateTime":1495769289000,"isdel":0,"start":null,"pageSize":null,"id":33185,"relationTypeId":8,"entityId1":30675,"entityId2":12329,"relationName":"主营产品","uniqueMd5":"30be3306e0d33293ed5531815b5829d0","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"自动售检票系统","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769290000,"updateTime":1495769290000,"isdel":0,"start":null,"pageSize":null,"id":34701,"relationTypeId":8,"entityId1":32310,"entityId2":12486,"relationName":"主营产品","uniqueMd5":"b5e190649865b96ec3919fd29b245b9b","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"新能源","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769290000,"updateTime":1495769290000,"isdel":0,"start":null,"pageSize":null,"id":40441,"relationTypeId":8,"entityId1":32310,"entityId2":22968,"relationName":"主营产品","uniqueMd5":"e0a8e511a2dd580a77135fe47ee59027","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"轨道交通自动化","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769291000,"updateTime":1495769291000,"isdel":0,"start":null,"pageSize":null,"id":43623,"relationTypeId":8,"entityId1":32310,"entityId2":7019,"relationName":"主营产品","uniqueMd5":"dd68fcf8c49b56a209ee5ad5ce7ad48d","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"轨道交通业务","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769291000,"updateTime":1495769291000,"isdel":0,"start":null,"pageSize":null,"id":47611,"relationTypeId":8,"entityId1":32310,"entityId2":28310,"relationName":"主营产品","uniqueMd5":"85f07b8a92611c84a2241b3de1d0d6e3","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"工业交换机","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769291000,"updateTime":1495769291000,"isdel":0,"start":null,"pageSize":null,"id":47927,"relationTypeId":8,"entityId1":32310,"entityId2":31612,"relationName":"主营产品","uniqueMd5":"915aaabebba217152facd3f48585705a","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"轨交业务","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769291000,"updateTime":1495769291000,"isdel":0,"start":null,"pageSize":null,"id":49373,"relationTypeId":8,"entityId1":32310,"entityId2":23385,"relationName":"主营产品","uniqueMd5":"414f38a9e1bd1e604c8222d4cb29a85a","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"电气控制自动化","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769291000,"updateTime":1495769291000,"isdel":0,"start":null,"pageSize":null,"id":49569,"relationTypeId":8,"entityId1":30675,"entityId2":3780,"relationName":"主营产品","uniqueMd5":"987246bab7d5ce2029a4204a9d96e0ff","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"污水处理设施的运营维护","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769291000,"updateTime":1495769291000,"isdel":0,"start":null,"pageSize":null,"id":49571,"relationTypeId":8,"entityId1":30675,"entityId2":12140,"relationName":"主营产品","uniqueMd5":"63385fa5c01a8aab8d8e8cc035722ba1","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"污水处理设施工程","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769291000,"updateTime":1495769291000,"isdel":0,"start":null,"pageSize":null,"id":49573,"relationTypeId":8,"entityId1":30675,"entityId2":16625,"relationName":"主营产品","uniqueMd5":"97decf55dc615f54d30f1a7a9eb63a03","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"LED节能灯具路灯改造工程的设计及施工","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769292000,"updateTime":1495769292000,"isdel":0,"start":null,"pageSize":null,"id":51336,"relationTypeId":8,"entityId1":32310,"entityId2":13532,"relationName":"主营产品","uniqueMd5":"9daced002bb48b3c82f46b16aceb899f","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"节能环保","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769292000,"updateTime":1495769292000,"isdel":0,"start":null,"pageSize":null,"id":51452,"relationTypeId":8,"entityId1":32310,"entityId2":504,"relationName":"主营产品","uniqueMd5":"5df09ab5b75915e0e4b97d136b2e55b3","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"变电站自动化系统","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769292000,"updateTime":1495769292000,"isdel":0,"start":null,"pageSize":null,"id":54716,"relationTypeId":8,"entityId1":30675,"entityId2":2864,"relationName":"主营产品","uniqueMd5":"97983423185a856ffc8fdd7eaf9447bd","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"水处理","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769292000,"updateTime":1495769292000,"isdel":0,"start":null,"pageSize":null,"id":57037,"relationTypeId":8,"entityId1":30675,"entityId2":33338,"relationName":"主营产品","uniqueMd5":"4a34dd5cd40454cec7b5a16731342d52","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"众合科技","entityName2":"轨交信号系统","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769294000,"updateTime":1495769294000,"isdel":0,"start":null,"pageSize":null,"id":67808,"relationTypeId":8,"entityId1":32310,"entityId2":12760,"relationName":"主营产品","uniqueMd5":"fe3609bcb5f4dbd412e492297d5da695","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"用电信息采集系统","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769294000,"updateTime":1495769294000,"isdel":0,"start":null,"pageSize":null,"id":67860,"relationTypeId":8,"entityId1":32310,"entityId2":14592,"relationName":"主营产品","uniqueMd5":"74c85418754730b766651dd344cd9f3b","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"国电南瑞","entityName2":"二次设备","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495769294000,"updateTime":1495769294000,"isdel":0,"start":null,"pageSize":null,"id":70886,"relationTypeId":8,"entityId1":2370,"entityId2":13613,"relationName":"主营产品","uniqueMd5":"2d7dc86e7186bdf06d1e084352b8fe76","relationAttrJson":null,"relationTypeName":"主营产品","entityName1":"赛为智能","entityName2":"信号系统","domainId":null,"entityTypeId1":4,"entityTypeId2":10,"entityTypeName1":"股票","entityTypeName2":"产品","paramEntityIds":null},{"excludeId":null,"createTime":1495786647000,"updateTime":1495786647000,"isdel":0,"start":null,"pageSize":null,"id":96561,"relationTypeId":11,"entityId1":30675,"entityId2":88455,"relationName":"子公司","uniqueMd5":"0ad01f162318bd08e3fa9f9d7f6b19d5","relationAttrJson":null,"relationTypeName":"子公司","entityName1":"众合科技","entityName2":"苏州科环环保科技有限公司","domainId":null,"entityTypeId1":4,"entityTypeId2":5,"entityTypeName1":"股票","entityTypeName2":"公司","paramEntityIds":null},{"excludeId":null,"createTime":1495786647000,"updateTime":1495786647000,"isdel":0,"start":null,"pageSize":null,"id":96562,"relationTypeId":11,"entityId1":30675,"entityId2":88456,"relationName":"子公司","uniqueMd5":"c56b9f29be46f18bc2e3e2847d0dc1bd","relationAttrJson":null,"relationTypeName":"子公司","entityName1":"众合科技","entityName2":"浙江海拓环境技术有限公司","domainId":null,"entityTypeId1":4,"entityTypeId2":5,"entityTypeName1":"股票","entityTypeName2":"公司","paramEntityIds":null},{"excludeId":null,"createTime":1495786647000,"updateTime":1495786647000,"isdel":0,"start":null,"pageSize":null,"id":96563,"relationTypeId":11,"entityId1":30675,"entityId2":88457,"relationName":"子公司","uniqueMd5":"459ac545c975390a8e55a664762359a6","relationAttrJson":null,"relationTypeName":"子公司","entityName1":"众合科技","entityName2":"浙江浙大网新众合轨道交通工程有限公司","domainId":null,"entityTypeId1":4,"entityTypeId2":5,"entityTypeName1":"股票","entityTypeName2":"公司","paramEntityIds":null},{"excludeId":null,"createTime":1495786647000,"updateTime":1495786647000,"isdel":0,"start":null,"pageSize":null,"id":96564,"relationTypeId":11,"entityId1":30675,"entityId2":88458,"relationName":"子公司","uniqueMd5":"d72721e0c7ee574ab8131217710cb852","relationAttrJson":null,"relationTypeName":"子公司","entityName1":"众合科技","entityName2":"浙江众合投资有限公司","domainId":null,"entityTypeId1":4,"entityTypeId2":5,"entityTypeName1":"股票","entityTypeName2":"公司","paramEntityIds":null},{"excludeId":null,"createTime":1495786647000,"updateTime":1495786647000,"isdel":0,"start":null,"pageSize":null,"id":96565,"relationTypeId":11,"entityId1":30675,"entityId2":88459,"relationName":"子公司","uniqueMd5":"20f9ee12eb3756cf2a4a775871cf768d","relationAttrJson":null,"relationTypeName":"子公司","entityName1":"众合科技","entityName2":"浙江网新中控信息技术有限公司","domainId":null,"entityTypeId1":4,"entityTypeId2":5,"entityTypeName1":"股票","entityTypeName2":"公司","paramEntityIds":null},{"excludeId":null,"createTime":1495786647000,"updateTime":1495786647000,"isdel":0,"start":null,"pageSize":null,"id":96566,"relationTypeId":11,"entityId1":30675,"entityId2":88460,"relationName":"子公司","uniqueMd5":"00cbaa3711cd0fba2a926ee574d27afd","relationAttrJson":null,"relationTypeName":"子公司","entityName1":"众合科技","entityName2":"杭州海纳半导体有限公司","domainId":null,"entityTypeId1":4,"entityTypeId2":5,"entityTypeName1":"股票","entityTypeName2":"公司","paramEntityIds":null},{"excludeId":null,"createTime":1495786647000,"updateTime":1495786647000,"isdel":0,"start":null,"pageSize":null,"id":96567,"relationTypeId":11,"entityId1":30675,"entityId2":88461,"relationName":"子公司","uniqueMd5":"960a8ea1bd19624e5e114c96e3f494b5","relationAttrJson":null,"relationTypeName":"子公司","entityName1":"众合科技","entityName2":"智利信息技术有限公司","domainId":null,"entityTypeId1":4,"entityTypeId2":5,"entityTypeName1":"股票","entityTypeName2":"公司","paramEntityIds":null},{"excludeId":null,"createTime":1495786647000,"updateTime":1495786647000,"isdel":0,"start":null,"pageSize":null,"id":96568,"relationTypeId":11,"entityId1":30675,"entityId2":88462,"relationName":"子公司","uniqueMd5":"2437c5758e94ca57830e7a9244dfee93","relationAttrJson":null,"relationTypeName":"子公司","entityName1":"众合科技","entityName2":"浙江网新智能技术有限公司","domainId":null,"entityTypeId1":4,"entityTypeId2":5,"entityTypeName1":"股票","entityTypeName2":"公司","paramEntityIds":null},{"excludeId":null,"createTime":1495786647000,"updateTime":1495786647000,"isdel":0,"start":null,"pageSize":null,"id":96569,"relationTypeId":11,"entityId1":30675,"entityId2":88463,"relationName":"子公司","uniqueMd5":"11987162feaed5accf7398c48c7981ff","relationAttrJson":null,"relationTypeName":"子公司","entityName1":"众合科技","entityName2":"浙江众合新能源开发有限公司","domainId":null,"entityTypeId1":4,"entityTypeId2":5,"entityTypeName1":"股票","entityTypeName2":"公司","paramEntityIds":null},{"excludeId":null,"createTime":1495786647000,"updateTime":1495786647000,"isdel":0,"start":null,"pageSize":null,"id":96570,"relationTypeId":11,"entityId1":30675,"entityId2":88464,"relationName":"子公司","uniqueMd5":"ba2d341105113705a2e143222a8e3022","relationAttrJson":null,"relationTypeName":"子公司","entityName1":"众合科技","entityName2":"浙大网新(香港)众合轨道交通工程有限公司","domainId":null,"entityTypeId1":4,"entityTypeId2":5,"entityTypeName1":"股票","entityTypeName2":"公司","paramEntityIds":null},{"excludeId":null,"createTime":1495786647000,"updateTime":1495786647000,"isdel":0,"start":null,"pageSize":null,"id":96571,"relationTypeId":11,"entityId1":30675,"entityId2":88465,"relationName":"子公司","uniqueMd5":"4c3e3a8a01a0dd714c11ee62c3f38195","relationAttrJson":null,"relationTypeName":"子公司","entityName1":"众合科技","entityName2":"浙江众合碧橙环保科技股份有限公司","domainId":null,"entityTypeId1":4,"entityTypeId2":5,"entityTypeName1":"股票","entityTypeName2":"公司","paramEntityIds":null}],"entityTypeList":[{"entityTypeName":"股票","id":4},{"entityTypeName":"公司","id":5},{"entityTypeName":"人物","id":6},{"entityTypeName":"产品","id":10}],"relationTypeList":[{"id":1,"relationTypeName":"高管"},{"id":4,"relationTypeName":"上位产品"},{"id":8,"relationTypeName":"主营产品"},{"id":11,"relationTypeName":"子公司"}],"entityCatalogList":[]}

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
        this.removeLinkLib = [];            //已经筛选删除的关系库
        this.linksData = [];                //筛选之后剩余的关系库
        this.filterOption = [];           //上次点击过的实体筛选个数
        this.filterRelationOption = [];           //上次点击过的关系筛选个数


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
//18091   第二层又问题
//2370   第一层有问题
//29783  第一层 筛选的时候点击实体会多出来一部分
    componentDidMount(){
        let _this = this;
        NetUtil.get(`/relation/getRelation`,{entityIds: '18091'},respData=>{
            // let respData = JSON
            _this.choise_id = '18091';
            _this.coreEntityTypeId = respData.entityList[0].entityTypeId;
            // this.formatJson(respData,'28123');
            let {nodes,links,relationTypeList,entityTypeList,categoryList} = this.formatJson(respData,'18091');
            _this.linksData = [].concat(links);
            let list1 = [];
            entityTypeList.forEach((item)=>{
                list1.push(item.id);
            });
            _this.filterOption = list1;
            let list2 = [];
            relationTypeList.forEach((item)=>{
                list2.push(item.id);
            });
            _this.filterRelationOption = list2;
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
                for(let k = 0 ;k<this.linksData.length;k++){
                    if(this.linksData[k] == "" || typeof(this.linksData[k]) == "undefined"){
                        this.linksData.splice(k,1);
                        k= k-1;
                    }
                }
                //删除对应的实体      渲染zoom放在前面，处理数据放在后见面，提高性能！！！
                this.refs.zoom_.netchart.removeData({nodes:_toRemoveNodeList,links:toRemoveLinkList});
                //向已删除的关系库中添加新移除的关系
                this.removeLinkLib = this.removeLinkLib.concat(toRemoveLinkList);
            }else { //添加实体类型筛选条件
                let _val = this.filterOption
                let _c = [];
                let tmp = val.concat(_val);
                var _o = {};
                for (let i = 0; i < tmp.length; i ++) (tmp[i] in _o) ? _o[tmp[i]] ++ : _o[tmp[i]] = 1;
                for (let x in _o) if (_o[x] == 1) _c.push(Number(x));
                //以上，取出用户点击的是哪一个类型
                let removeLinkLib = this.removeLinkLib;       //取到已删除关系的库   待循环！
                let toAddNodeList = [];              //存放添加实体的id    防止添加重复的node    只是作为校验用
                let _toAddNodeList = [];             //存放要添加的node    add 渲染zoom 需要
                let toAddLinkList = [];              //存放要添加的link    add 渲染zoom 需要
                for(let i=0;i<removeLinkLib.length;i++){
                    let item = removeLinkLib[i];
                    if (_c.indexOf(item.fromid) >= 0) {
                        if (toAddNodeList.indexOf(item.from) < 0 && item.from != this.choise_id) {
                            toAddNodeList.push(item.from);
                            _toAddNodeList.push({
                                id:item.from,
                                typeid:item.fromid,
                                style:{label:item.fromname}
                            });
                        }
                    }
                    if (_c.indexOf(item.toid) >= 0) {
                        if (toAddNodeList.indexOf(item.to) < 0 && item.to != this.choise_id) {
                            toAddNodeList.push(item.to);
                            _toAddNodeList.push({
                                id:item.to,
                                typeid:item.toid,
                                style:{label:item.toname}
                            });
                        }
                    }
                    if ((_c.indexOf(item.fromid) >= 0 && item.from != this.choise_id) || (_c.indexOf(item.toid) >= 0 && item.to != this.choise_id)) {
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
            }
            this.filterOption = val;
            //联动关系的复选框
            for(let j = 0 ;j<this.linksData.length;j++){
                if (active_relationTypeVal.indexOf(this.linksData[j].type) < 0) {
                    active_relationTypeVal.push(this.linksData[j].type);
                }
            }
            this.filterRelationOption = active_relationTypeVal;
            this.refs.console.setCheckboxVal('relation',active_relationTypeVal);
        }else if (type == 'relation') {
            let active_entityTypeVal = [];              //存放联动的实体类型值     联动左面控制台实体类型值需要
            //删除关系筛选
            if (val.length < this.filterRelationOption.length) {
                let toRemoveLinkList = [];
                let toRemoveNodeList = [];
                let _toRemoveNodeList = [];
                //找到应该删除的关系
                for(let i=0;i<this.linksData.length;i++){
                    let item = this.linksData[i];
                    if (val.indexOf(item.type) < 0) {
                        this.linksData[i] = undefined;
                        toRemoveLinkList.push(item);
                        if (item.from != this.choise_id) {
                            if (toRemoveNodeList.indexOf(item.from) < 0) {
                                toRemoveNodeList.push(item.from)
                                _toRemoveNodeList.push({
                                    id:item.from,
                                    typeid:item.fromid,
                                    style:{label:item.fromname}
                                });
                            }
                        }
                        if (item.to != this.choise_id) {
                            if (toRemoveNodeList.indexOf(item.to) < 0) {
                                toRemoveNodeList.push(item.to)
                                _toRemoveNodeList.push({
                                    id:item.to,
                                    typeid:item.toid,
                                    style:{label:item.toname}
                                });
                            }
                        }
                    }
                }
                //去除空的关系
                for(let k = 0 ;k<this.linksData.length;k++){
                    if(this.linksData[k] == "" || typeof(this.linksData[k]) == "undefined"){
                        this.linksData.splice(k,1);
                        k= k-1;
                    }
                }
                //删除对应的关系和实体     渲染zoom放在前面，处理数据放在后见面，
                this.refs.zoom_.netchart.removeData({nodes:_toRemoveNodeList,links:toRemoveLinkList});
                this.removeLinkLib = this.removeLinkLib.concat(toRemoveLinkList);
                console.log(_toRemoveNodeList);
                console.log(this.removeLinkLib);
            }else {   //增加关系筛选
                let _val = this.filterRelationOption;
                let _c = [];
                let tmp = val.concat(_val);
                var _o = {};
                for (let i = 0; i < tmp.length; i ++) (tmp[i] in _o) ? _o[tmp[i]] ++ : _o[tmp[i]] = 1;
                for (let x in _o) if (_o[x] == 1) _c.push(Number(x));
                //以上，取出用户点击的是哪一个类型
                let removeLinkLib = this.removeLinkLib;       //取到已删除关系的库   待循环！
                let toAddLinkList = [];
                let toAddNodeList = [];
                let _toAddNodeList = [];
                //找到应该删除的关系
                for(let i=0;i<removeLinkLib.length;i++){
                    let item = removeLinkLib[i];
                    if (val.indexOf(item.type) >= 0) {
                        removeLinkLib[i] = undefined;
                        toAddLinkList.push(item);
                        if (item.from != this.choise_id) {
                            if (toAddNodeList.indexOf(item.from) < 0) {
                                toAddNodeList.push(item.from)
                                _toAddNodeList.push({
                                    id:item.from,
                                    typeid:item.fromid,
                                    style:{label:item.fromname}
                                });
                            }
                        }
                        if (item.to != this.choise_id) {
                            if (toAddNodeList.indexOf(item.to) < 0) {
                                toAddNodeList.push(item.to)
                                _toAddNodeList.push({
                                    id:item.to,
                                    typeid:item.toid,
                                    style:{label:item.toname}
                                });
                            }
                        }
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
            }
            this.filterRelationOption = val;
            console.log(this.linksData);
            //联动关系的复选框
            for(let j = 0 ;j<this.linksData.length;j++){
                if (active_entityTypeVal.indexOf(this.linksData[j].fromid) < 0 && this.linksData[j].from != this.choise_id) {
                    active_entityTypeVal.push(this.linksData[j].fromid);
                }
                if (active_entityTypeVal.indexOf(this.linksData[j].toid) < 0 && this.linksData[j].to != this.choise_id) {
                    active_entityTypeVal.push(this.linksData[j].toid);
                }
            }
            this.filterOption = active_entityTypeVal;
            this.refs.console.setCheckboxVal('entity',active_entityTypeVal);
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
            let list1 = [];
            entityTypeList.forEach((item)=>{
                list1.push(item.id);
            });
            this.filterOption = list1;
            let list2 = [];
            relationTypeList.forEach((item)=>{
                list2.push(item.id);
            });
            this.filterRelationOption = list2;
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
            let list1 = [];
            entityTypeList.forEach((item)=>{
                list1.push(item.id);
            });
            this.filterOption = list1;
            let list2 = [];
            relationTypeList.forEach((item)=>{
                list2.push(item.id);
            });
            this.filterRelationOption = list2;
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
                let list1 = [];
                entityTypeList.forEach((item)=>{
                    list1.push(item.id);
                });
                _this.filterOption = list1;
                let list2 = [];
                relationTypeList.forEach((item)=>{
                    list2.push(item.id);
                });
                _this.filterRelationOption = list2;
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
                let backParamContainer = _this.state.backParamContainer;
                backParamContainer.push(_this.choise_id);
                _this.choise_id = id;
                let {nodes,links,relationTypeList,entityTypeList,categoryList} = this.formatJson(respData,id);
                _this.linksData = [].concat(links);
                let list1 = [];
                entityTypeList.forEach((item)=>{
                    list1.push(item.id);
                });
                _this.filterOption = list1;
                let list2 = [];
                relationTypeList.forEach((item)=>{
                    list2.push(item.id);
                });
                _this.filterRelationOption = list2;

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
