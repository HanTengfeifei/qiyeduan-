webpackJsonp([34],{1413:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(41),u=a(i),s=n(168),d=a(s),c=n(12),f=a(c),p=n(102),m=a(p),h=n(45),y=a(h),_=n(52),b=a(_),v=n(65),g=a(v),E=n(21),w=a(E),x=n(29),S=a(x),k=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(62),n(262),n(38),n(130),n(51),n(56),n(72),n(27),n(31);var O=n(0),R=a(O),C=n(57),j=a(C),A=n(1984),P=a(A),q=n(1985),M=a(q),T=n(20),V=(n(32),S.default.TabPane,w.default.Option,function(e){function t(e){l(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={saler_id_productions:[],child:"",all:{},contact_name:"",price:null,countAll:0,company_all:{},goods_id:"",goods_name:""},n.callback=n.callback.bind(n),n.onRef=n.onRef.bind(n),n.onRef2=n.onRef2.bind(n),n.handleSubmit=n.handleSubmit.bind(n),n.callbackS=n.callbackS.bind(n),n.receiveValue=n.receiveValue.bind(n),n.countAll=n.countAll.bind(n),n.saveTow=n.saveTow.bind(n),n}return o(t,e),k(t,[{key:"receiveValue",value:function(e){}},{key:"countAll",value:function(e){this.setState({countAll:e})}},{key:"callback",value:function(e){T.RequireUtils.baseRequire("order/goods-list",{saler_id:e},function(e){1==e.code?this.setState({saler_id_productions:e.data.list}):this.setState({saler_id_productions:[]})}.bind(this))}},{key:"saveTow",value:function(e){var t=Math.round(100*parseFloat(e))/100,n=t.toString().split(".");return 1==n.length?t=t.toString()+".00":n.length>1?(n[1].length<2&&(t=t.toString()+"0"),t):void 0}},{key:"callbackS",value:function(e,t,n,a){this.setState({contact_name:e,price:t,goods_id:n,goods_name:a})}},{key:"onRef",value:function(e){this.child=e}},{key:"onRef2",value:function(e){this.childS=e}},{key:"componentDidMount",value:function(){T.RequireUtils.baseRequire("order/company-info",{},function(e){1==e.code?(this.setState({company_all:e.data.info,saler_id:e.data.info.id}),this.callback(e.data.info.id)):(this.setState({company_all:{},saler_id:""}),this.callback(""))}.bind(this))}},{key:"handleSubmit",value:function(e){var t=this;e.preventDefault(),this.child.props.form.validateFields(function(e,n){if(e);else{var a={},l=t.child.state.deliver_date;l&&(l=l.format("YYYY-MM-DD HH:mm:ss")),a.goods_id=t.state.goods_id,a.order_kind=2,a.order_source=0,a.buyer_id=t.child.state.buyer_id,a.saler_id=t.state.saler_id,a.contract_id=t.child.state.contract_id,a.deliver_date=l,a.buyer_person=t.child.state.buyer_person;var r=t.child.state.station_all;if(a.scenario="add_xs_order",0==r.length)return g.default.error("\u8bf7\u6dfb\u52a0\u573a\u7ad9"),!1;for(var o=0;o<r.length;o++){if(!r[o].addr_id)return g.default.error("\u573a\u7ad9\u4e0d\u80fd\u4e3a\u7a7a"),!1;if(0==r[o].recv_sum)return g.default.error("\u91c7\u8d2d\u91cf\u4e0d\u80fd\u4e3a0"),!1;if(!r[o].recv_sum)return g.default.error("\u91c7\u8d2d\u91cf\u4e0d\u80fd\u4e3a\u7a7a"),!1}a.recv_addrs=JSON.stringify(t.child.state.station_all),T.RequireUtils.baseRequire("unilateral-order/add-order",a,function(e){1==e.code?(g.default.success(e.msg),(0,j.default)().push({pathname:"/orderlisttwo/"})):g.default.error(e.msg)}.bind(t))}})}},{key:"render",value:function(){var e=this,t=R.default.createElement("div",null,R.default.createElement(y.default,{gutter:8,style:{marginTop:"10px",textAlign:"center"}},R.default.createElement(b.default,{span:4},"\u5546\u54c1\u540d\u79f0"),R.default.createElement(b.default,{span:5},"\u5546\u54c1\u603b\u91cf"),R.default.createElement(b.default,{span:5},"\u5546\u54c1\u603b\u4ef7"),R.default.createElement(b.default,{span:5},"\u9884\u8ba1\u8fd0\u8d39"),R.default.createElement(b.default,{span:5},"\u8ba2\u5355\u91d1\u989d")));return R.default.createElement("div",null,R.default.createElement(y.default,null),R.default.createElement(y.default,{gutter:8,style:{marginTop:"10px"}},R.default.createElement(b.default,{span:24},R.default.createElement("div",{style:{padding:"25px 15px"}},R.default.createElement("span",{style:{fontSize:"20px",fontWeight:"bold"}},"\u8ba2\u5355\u6dfb\u52a0")),R.default.createElement(d.default,{hoverable:!0,style:{margin:0},type:"card"},R.default.createElement(P.default,{ref:function(t){return e.AddOrderInput=t},company_all:this.state.company_all,numberAll:this.state.countAll,countAll:this.countAll,contact_name:this.state.contact_name,sent:this.receiveValue,sentParents:this.callback,onRef:this.onRef}),R.default.createElement(m.default,null),R.default.createElement(M.default,{sentParents:this.callbackS,saler_id_productions:this.state.saler_id_productions,ref:"table",onRef2:this.onRef2,info:this.state.child}),R.default.createElement(m.default,null),R.default.createElement(d.default,{title:t,bordered:!1,style:{width:"100%"}},R.default.createElement("div",null,R.default.createElement(y.default,{gutter:8,style:{marginTop:"10px"}},R.default.createElement(b.default,{span:4},R.default.createElement("div",{style:{textAlign:"center"}},this.state.goods_name)),R.default.createElement(b.default,{span:5},R.default.createElement("div",{style:{textAlign:"center"}},this.saveTow(this.state.countAll))),R.default.createElement(b.default,{span:5},R.default.createElement("div",{style:{textAlign:"center"}},this.saveTow(this.state.countAll*this.state.price))),R.default.createElement(b.default,{span:5},R.default.createElement("div",{style:{textAlign:"center"}},R.default.createElement(f.default,{type:"pay-circle-o"}),this.saveTow(0))),R.default.createElement(b.default,{span:5,style:{color:"red"}},R.default.createElement("div",{style:{textAlign:"center"}},R.default.createElement(f.default,{type:"pay-circle-o"}),this.saveTow(this.state.countAll*this.state.price*1.075),R.default.createElement("br",null),R.default.createElement("span",{style:{color:"gray",fontSize:"12px"}},"\u591a\u542b7.5%\u8ba2\u5355\u91d1\u989d")))))),R.default.createElement(m.default,null),R.default.createElement(y.default,{gutter:8,style:{marginTop:"10px"}},R.default.createElement(b.default,{span:6},R.default.createElement(u.default,{type:"primary",onClick:this.handleSubmit},"\u63d0\u4ea4")))))))}}]),t}(R.default.Component));t.default=V,e.exports=t.default},1480:function(e,t,n){var a=n(1496);"string"===typeof a&&(a=[[e.i,a,""]]);var l={hmr:!0};l.transform=void 0;n(11)(a,l);a.locals&&(e.exports=a.locals)},1496:function(e,t,n){t=e.exports=n(10)(void 0),t.push([e.i,'a {\n  color: #9a9898;\n}\n.custom-image {\n  text-align: center;\n}\n.my-customer-car .ant-col-3 {\n  width: 14%;\n}\n.my-customer-car .ant-card-body {\n  padding: 10px;\n}\n.no-content-card.ant-card-wider-padding .ant-card-body {\n  padding: 0;\n}\n/*.my-table-title-center .ant-table-thead > tr > th, .ant-table-tbody > tr > td {\n  text-align: center;\n}\n.my-table-title-center .specital-table  .ant-table-thead > tr > th {\n  text-align: left;\n}*/\n.my-table-title-center-orderlistdetail .ant-table-thead > tr > th,\n.my-table-title-center-orderlistdetail .ant-table-tbody > tr > td {\n  text-align: center;\n}\n.table-first-line {\n  background: #f5f3f3;\n  padding: 10px 15px;\n  overflow: hidden;\n}\n.table-other-line {\n  padding: 20px 15px;\n}\n.offline-table-other-line {\n  padding: 5px 15px;\n}\n.specital-table .no-padding .ant-table-tbody > tr > td {\n  padding: 0;\n}\n.table-other-line .my-custom-center {\n  text-align: center;\n  overflow: hidden;\n  -o-text-overflow: ellipsis;\n     text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.my-center {\n  text-align: center;\n}\n.my-custom-star .ant-rate {\n  font-size: 13px;\n}\n.my-custom-padding .ant-form-item {\n  margin-bottom: 0 ;\n}\n.my-custom-padding .ant-col-24.ant-form-item-label {\n  padding: 0;\n}\n.my-table-title-center .ant-table-thead > tr > th,\n.my-table-title-center .ant-table-tbody > tr > td {\n  text-align: center;\n}\n.yundan-specital-table .no-padding .ant-table-tbody > tr > td {\n  padding: 0;\n}\n.order-yundan-specital-table .my-center {\n  text-align: center;\n}\ni.expand-mark {\n  display: inline-block;\n  border: 1px solid #ddd;\n  font-style: normal;\n}\n.yundan-title {\n  white-space: nowrap;\n}\n.table-expand:before {\n  content: "-";\n}\n.table-not-expand:before {\n  content: "+";\n}\n.my-offline-add-order .ant-form-item-label {\n  text-align: left;\n}\n',""])},1984:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(265),u=a(i),s=n(64),d=a(s),c=n(102),f=a(c),p=n(45),m=a(p),h=n(52),y=a(h),_=n(267),b=a(_),v=n(21),g=a(v),E=n(100),w=a(E),x=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},S=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(469),n(63),n(130),n(51),n(56),n(471),n(27),n(129);var k=n(0),O=a(k),R=n(1480),C=(a(R),n(1986)),j=a(C),A=n(20),P=w.default.Item,q=g.default.Option,M=(g.default.OptGroup,b.default.Option,function(e){function t(e){l(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.state={addr_select_all:[],provider_all:[],contract_select:[],order_source:"",saler_id:"",goods_stock:"",contact_id:"",buyer_contact_id_all:[],stock_type:"",productDetail:{},valuesAll:{},status:0,station_all:[],buyer_id:""},n.callback=n.callback.bind(n),n.valueChange=n.valueChange.bind(n),n}return o(t,e),S(t,[{key:"callback",value:function(e){console.log(e),this.props.sent(e)}},{key:"valueChange",value:function(e,t){if("prod_id"===e&&A.RequireUtils.baseRequire("goods/prod-info",{prod_id:t},function(n){if(1==n.code){var a=this.state;a[e]=t,a.productDetail=n.data.info,this.setState(x({},a)),this.props.sentParents()}else{var a=this.state;this.setState(x({},a))}}.bind(this)),"buyer_id"===e){var n=this.props.form;n.setFieldsValue({contract_id:"",buyer_person:""});var n=this.state;n.contract_id="",n.buyer_person="",this.setState(x({},n)),A.RequireUtils.baseRequire("unilateral-order/contract-select",{company_id:t},function(n){if(1==n.code){var a=this.state;a[e]=t,this.setState(x({},a,{contract_select:n.data.list}))}else{var a=this.state;a[e]=t,this.setState(x({},a,{contract_select:[]}))}}.bind(this)),A.RequireUtils.baseRequire("unilateral-order/user-select",{company_id:t},function(e){1==e.code?this.setState({buyer_contact_id_all:e.data.list}):this.setState({buyer_contact_id_all:[]})}.bind(this))}if("status"===e){var n=this.state;n[e]=parseInt(t),this.setState(x({},n))}else{var n=this.state;n[e]=t,this.setState(x({},n))}}},{key:"componentWillMount",value:function(){A.RequireUtils.baseRequire("unilateral-order/company-select",{},function(e){1==e.code?this.setState({provider_all:e.data.list}):this.setState({provider_all:[]})}.bind(this))}},{key:"componentDidMount",value:function(){this.props.onRef(this)}},{key:"render",value:function(){var e=this,t=this.props.form.getFieldDecorator,n=this.props.sentParents,a=this.state,l=a.provider_all,r=a.buyer_contact_id_all,o=a.contract_select;return O.default.createElement("div",null,O.default.createElement(m.default,null,O.default.createElement(y.default,{span:8},O.default.createElement("span",{style:{fontSize:"16px"}},"\u914d\u9001\u4fe1\u606f")),O.default.createElement(y.default,{span:8},O.default.createElement("span",{style:{fontSize:"16px"}},"\u4e70\u65b9\u4fe1\u606f")),O.default.createElement(y.default,{span:8},O.default.createElement("span",{style:{fontSize:"16px"}},"\u5356\u65b9\u4fe1\u606f"))),O.default.createElement(f.default,null),O.default.createElement(m.default,{gutter:8},O.default.createElement(y.default,{span:6},O.default.createElement("div",{style:{margin:"12px 0"}},"\u914d\u9001\u65b9\u5f0f"),O.default.createElement(d.default,{type:"text",value:"\u914d\u9001",onChange:function(t){return e.valueChange("psfs",t.target.value)},disabled:!0})),O.default.createElement(y.default,{span:2}),O.default.createElement(y.default,{span:6},O.default.createElement(P,{label:"\u8d2d\u4e70\u65b9"},t("buyer_id",{rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e3a\u5fc5\u586b\u9879!"}]})(O.default.createElement(g.default,{dropdownMatchSelectWidth:!0,style:{width:"100%"},onChange:function(t){return e.valueChange.bind(e)("buyer_id",t)}},l.filter(function(t){return t.id!==e.props.company_all.id+""}).map(function(e){return O.default.createElement(q,{value:e.id},e.company_name)}))))),O.default.createElement(y.default,{span:2}),O.default.createElement(y.default,{span:6},O.default.createElement("div",{style:{margin:"12px 0"}},"\u4f9b\u8d27\u65b9"),O.default.createElement(d.default,{type:"text",value:this.props.company_all.company_name,onChange:function(t){return e.valueChange("saler_id",t.target.value)},disabled:!0}))),O.default.createElement(m.default,{gutter:8},O.default.createElement(y.default,{span:6},O.default.createElement(P,{label:"\u914d\u9001\u65f6\u95f4"},t("deliver_date",{rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e0d\u80fd\u4e3a\u7a7a!"}]})(O.default.createElement(u.default,{placeholder:"\u8bf7\u586b\u5199\u65e5\u671f\u548c\u65f6\u95f4",format:"YYYY-MM-DD HH:mm:ss",style:{width:"100%"},onChange:function(t){return e.valueChange("deliver_date",t)},showTime:!0})))),O.default.createElement(y.default,{span:2}),O.default.createElement(y.default,{span:6},O.default.createElement(P,{label:"\u4e70\u65b9\u4e1a\u52a1\u8054\u7cfb\u4eba"},t("buyer_person",{rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e0d\u80fd\u4e3a\u7a7a!"}]})(O.default.createElement(g.default,{placeholder:"\u8bf7\u9009\u62e9\u4e70\u65b9\u8054\u7cfb\u4eba",style:{width:"100%"},dropdownMatchSelectWidth:!0,onChange:function(t){return e.valueChange("buyer_person",t)}},r.map(function(e){return O.default.createElement(q,{value:e.id},e.user_name)}))))),O.default.createElement(y.default,{span:2}),O.default.createElement(y.default,{span:6},O.default.createElement(P,{label:"\u5173\u8054\u5408\u540c"},t("contract_id",{rules:[{required:!1,message:"\u8be5\u9009\u9879\u4e0d\u80fd\u4e3a\u7a7a!"}]})(O.default.createElement(g.default,{dropdownMatchSelectWidth:!0,style:{width:"100%"},onChange:function(t){return e.valueChange.bind(e)("contract_id",t)}},o.map(function(e){return O.default.createElement(q,{value:e.id},e.contract_name)})))))),O.default.createElement(m.default,{gutter:8,style:{display:"none"}},O.default.createElement(y.default,{span:6},O.default.createElement(P,null,O.default.createElement("span",{style:{display:"none"}},O.default.createElement(d.default,{addonAfter:"\u5428",type:"text",value:this.props.numberAll})))),O.default.createElement(y.default,{span:2}),O.default.createElement(y.default,{span:6}),O.default.createElement(y.default,{span:2}),O.default.createElement(y.default,{span:6},O.default.createElement("div",{style:{display:"none"}},"\u5356\u65b9\u8054\u7cfb\u4eba",O.default.createElement(d.default,{type:"text",value:this.props.contact_name,onChange:function(t){return e.valueChange("saler_person",t.target.value)}})))),O.default.createElement(m.default,null,O.default.createElement("div",null,"\u573a\u7ad9\u5730\u5740:")),O.default.createElement(m.default,null,O.default.createElement(j.default,{sentParents:n,ref:function(t){return e.DynamicIput=t},countAll:this.props.countAll,father:this,sentparents:this.callback,my_buyer_id:this.state.buyer_id,addr_select_all:this.state.addr_select_all})))}}]),t}(O.default.Component)),T=w.default.create()(M);t.default=T,e.exports=t.default},1985:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(263),u=a(i),s=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(468);var d=n(0),c=a(d),f=[{title:"",dataIndex:""},{title:"\u5546\u54c1\u540d\u79f0",dataIndex:"goods_name",align:"center"},{title:"\u5e93\u5b58",dataIndex:"goods_stock",align:"center"},{title:"\u6302\u724c\u4ef7",dataIndex:"price",align:"center"},{title:"\u8fd0\u8f93\u65b9\u5f0f",dataIndex:"deliver_name",align:"center"}],p=function(e){function t(e){l(this,t);var n=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.onSelectChange=function(e,t){n.setState({selectedRowKeys:e}),n.props.sentParents(t[0].user_name,t[0].price,t[0].id,t[0].goods_name)},n.state={saler_contact_name:"",record:{},selectedRowKeys:[]},n.sentRow=n.sentRow.bind(n),n}return o(t,e),s(t,[{key:"componentDidMount",value:function(){this.props.onRef2(this),console.log(this.props.saler_id)}},{key:"componentWillReceiveProps",value:function(){}},{key:"sentRow",value:function(e){this.setState({record:e})}},{key:"render",value:function(){var e=this,t=this.state.selectedRowKeys,n={selectedRowKeys:t,type:"radio",onChange:this.onSelectChange,hideDefaultSelections:!0,onSelection:this.onSelection};return c.default.createElement("div",null,c.default.createElement("div",null,this.props.saler_id),c.default.createElement(u.default,{rowSelection:n,columns:f,dataSource:this.props.saler_id_productions,onRow:function(t){return{onClick:function(t){e.sentRow(t)}}}}))}}]),t}(c.default.Component);t.default=p,e.exports=t.default},1986:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}function l(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var u=n(41),s=a(u),d=n(45),c=a(d),f=n(64),p=a(f),m=n(52),h=a(m),y=n(12),_=a(y),b=n(21),v=a(b),g=n(100),E=a(g),w=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&(e[a]=n[a])}return e},x=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}();n(62),n(51),n(63),n(56),n(38),n(27),n(129);var S=n(0),k=a(S);n(2370);var O=n(20),R=E.default.Item,C=v.default.Option,j=0,A=function(e){function t(e){r(this,t);var n=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return n.add=function(){var e=n.props.form,t=e.getFieldValue("keys"),a=t.concat(j);j++,e.setFieldsValue({keys:a})},n.remove=function(e){var t=n.props.form,a=t.getFieldValue("keys"),r=n.state.addr_select_all,o=n.state.old_my_select,i=n.props.form.getFieldValue("name["+e+"]"),u=o.filter(function(e){return e.id==i});u&&u[0]&&n.setState({addr_select_all:[].concat(l(r),[u[0]])}),1!==a.length&&(t.setFieldsValue({keys:a.filter(function(t){return t!==e})}),n.myonchange("",-1))},n.handleSubmit=function(e){e.preventDefault(),n.props.form.validateFields(function(e,t){for(var a=[],l=0,r=t.keys,o=0;o<r.length;o++){var i={},u=r[o];i.addr_id=t.name[u],i.recv_sum=t.number[u],a.push(i);var s=t.number[u]?t.number[u]:0;l+=parseInt(s)}n.props.countAll(l),n.props.father.setState({station_all:a})})},n.myonchange=function(e,t,a){for(var l=n.props.form.getFieldsValue(),r=[],o=0,i=l.keys,u=0;u<i.length;u++){var s=i[u],d={};a?(d.recv_sum=l.number[s],d.addr_id=t==s?e||"":l.name[s]):(d.addr_id=l.name[s],d.recv_sum=t==s?e||0:l.number[s]),r.push(d);var c=d.recv_sum?d.recv_sum:0;o+=parseInt(c)}n.props.countAll(o),n.props.father.setState({station_all:r})},n.state={acount_all:0,addr_select_all:[],old_my_select:[]},n}return i(t,e),x(t,[{key:"addressSelect",value:function(e,t){var n=this.state.addr_select_all,a=n.filter(function(t){return t.id!=e});this.setState({addr_select_all:a}),this.myonchange(e,t,!0)}},{key:"getDefaultValue",value:function(e){var t=this.props.form.getFieldValue("name["+e+"]"),n=this.state.old_my_select,a=n.filter(function(e){return e.id==t});if(a[0])return a[0].addr_name}},{key:"componentWillReceiveProps",value:function(e){var t=e.my_buyer_id,n=this.props.my_buyer_id;if(n||(n=""),t||(t=""),t===n)return!1;var a=this.props.form.getFieldsValue().name,l=this.props.form.getFieldsValue().number;if(a)for(var r=0;r<a.length;r++){var o="name["+r+"]",i={};i[o]="",this.props.form.setFieldsValue(i)}if(l)for(var u=0;u<l.length;u++){var o="number["+u+"]",i={};i[o]="",this.props.form.setFieldsValue(i)}this.myonchange("",-1),O.RequireUtils.baseRequire("unilateral-order/addr-select",{company_id:t},function(e){1==e.code?this.setState({addr_select_all:e.data.list,old_my_select:e.data.list}):this.setState({addr_select_all:[],old_my_select:[]})}.bind(this))}},{key:"componentWillMount",value:function(){var e=this.props.my_buyer_id;O.RequireUtils.baseRequire("unilateral-order/addr-select",{company_id:e},function(e){1==e.code?this.setState({addr_select_all:e.data.list,old_my_select:e.data.list}):this.setState({addr_select_all:[],old_my_select:[]})}.bind(this))}},{key:"render",value:function(){var e=this,t=this.props.form,n=t.getFieldDecorator,a=t.getFieldValue,l=this.state.addr_select_all,r={labelCol:{xs:{span:24},sm:{span:4}},wrapperCol:{xs:{span:24},sm:{span:20}}};n("keys",{trigger:["onChange","onBlur"],initialValue:[]});var o=a("keys"),i=o.map(function(t,a){return k.default.createElement("div",null,k.default.createElement(c.default,null,k.default.createElement(h.default,{span:10},k.default.createElement(R,w({},r,{labelCol:{span:4},required:!1,key:t}),n("name["+t+"]",{validateTrigger:["onChange","onBlur"],rules:[{required:!0,whitespace:!0,message:"\u8bf7\u9009\u62e9\u573a\u7ad9\u548c\u76f8\u5e94\u7684\u8d2d\u4e70\u91cf."}]})(k.default.createElement(v.default,{placeholder:"\u8d2d\u4e70\u5730\u5740",dropdownMatchSelectWidth:!0,style:{width:"60%",marginRight:8},onSelect:function(n){return e.addressSelect.bind(e)(n,t)}},e.props.form.getFieldValue("name["+t+"]")?k.default.createElement(C,{value:e.props.form.getFieldValue("name["+t+"]")},e.getDefaultValue(t)):"",l.map(function(e,t){return k.default.createElement(C,{value:e.id,key:t},e.addr_name)}))),o.length>1?k.default.createElement(_.default,{className:"dynamic-delete-button",type:"minus-circle-o",disabled:1===o.length,onClick:function(){return e.remove(t)}}):null)),k.default.createElement(h.default,{span:4,pull:3},k.default.createElement(R,null,n("number["+t+"]",{rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e3a\u5fc5\u586b\u9879!"}]})(k.default.createElement(p.default,{onChange:function(n){return e.myonchange(n.target.value,t)},addonAfter:"\u5428",type:"number"}))))))});return k.default.createElement(E.default,{onSubmit:this.handleSubmit},i,k.default.createElement(R,r,k.default.createElement(s.default,{type:"dashed",onClick:this.add,style:{width:"55%"}},k.default.createElement(_.default,{type:"plus"})," \u6dfb\u52a0\u573a\u7ad9\u548c\u91c7\u8d2d\u91cf")))}}]),t}(k.default.Component),P=E.default.create()(A);t.default=P,e.exports=t.default},2054:function(e,t,n){t=e.exports=n(10)(void 0),t.push([e.i,".dynamic-delete-button {\n  cursor: pointer;\n  position: relative;\n  top: 4px;\n  font-size: 24px;\n  color: #999;\n  -webkit-transition: all .3s;\n  -o-transition: all .3s;\n  transition: all .3s;\n}\n.dynamic-delete-button:hover {\n  color: #777;\n}\n.dynamic-delete-button[disabled] {\n  cursor: not-allowed;\n  opacity: 0.5;\n}\n",""])},2370:function(e,t,n){var a=n(2054);"string"===typeof a&&(a=[[e.i,a,""]]);var l={hmr:!0};l.transform=void 0;n(11)(a,l);a.locals&&(e.exports=a.locals)}});
//# sourceMappingURL=34.b52b3a53.chunk.js.map