webpackJsonp([52],{1373:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function o(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=a(52),u=n(i),s=a(168),d=n(s),f=a(45),c=n(f),p=a(21),m=n(p),y=a(29),h=n(y),g=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();a(56),a(262),a(51),a(27),a(31);var b=a(0),v=n(b),_=a(1845),E=n(_),w=a(1844),x=n(w),C=h.default.TabPane,k=(m.default.Option,function(e){function t(e){l(this,t);var a=r(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.state={},a.callback=a.callback.bind(a),a}return o(t,e),g(t,[{key:"callback",value:function(e){console.log(e)}},{key:"render",value:function(){return v.default.createElement("div",null,v.default.createElement(c.default,null),v.default.createElement(c.default,{gutter:8,style:{marginTop:"0px"}},v.default.createElement(u.default,{span:24},v.default.createElement("div",{style:{padding:"25px 15px"}},v.default.createElement("span",{style:{fontSize:"20px",fontWeight:"bold"}},"\u652f\u4ed8\u4e0e\u8bb0\u8d26")),v.default.createElement(d.default,{type:"card"},v.default.createElement(h.default,{onChange:this.callback,defaultActiveKey:"1",type:"card"},v.default.createElement(C,{tab:"\u5728\u7ebf\u652f\u4ed8",key:"1"},"\u6682\u65e0\u9875\u9762"),v.default.createElement(C,{tab:"\u5ba2\u6237\u9884\u4ed8\u6b3e\u767b\u8bb0",key:"2"},v.default.createElement(E.default,null)),v.default.createElement(C,{tab:"\u4f9b\u5e94\u5546\u4ed8\u6b3e\u767b\u8bb0",key:"3"},v.default.createElement(x.default,null)))))))}}]),t}(v.default.Component));t.default=k,e.exports=t.default},1824:function(e,t,a){var n=a(2018);"string"===typeof n&&(n=[[e.i,n,""]]);var l={hmr:!0};l.transform=void 0;a(11)(n,l);n.locals&&(e.exports=n.locals)},1844:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e){(0,V.default)().push({pathname:"/supplierbilllistdetail/?supplierid="+e})}function s(e){var t=this;this.setState({lookloading:!0});var a=this.state.fileList,n=new FormData;a.forEach(function(e){n.append("RelationForm[record_bill_img]",e)}),e.preventDefault(),this.props.form.validateFields(function(e,a){if(e)t.setState({lookloading:!1});else{var l=t.state.form;n.append("company_id1",l.company_id),n.append("record_date",l.record_date),n.append("money_num",l.money_num),n.append("scenario","add_supp_record"),B.RequireUtils.fileBaseRequire("relation/add-record",n,function(e){e.code?S.default.success(e.msg,1,u(e.data.supplier_id)):(S.default.error(e.msg),this.setState({lookloading:!1}))}.bind(t))}})}function d(e){var t=this;this.setState({loading:!0});var a=this.state.fileList,n=new FormData;a.forEach(function(e){n.append("RelationForm[record_bill_img]",e)}),e.preventDefault(),this.props.form.validateFields(function(e,a){if(console.log(e),e)t.setState({loading:!1});else{var l=t.state.form;n.append("company_id1",l.company_id),n.append("record_date",l.record_date),n.append("money_num",l.money_num),n.append("scenario","add_supp_record"),B.RequireUtils.fileBaseRequire("relation/add-record",n,function(e){e.code?(S.default.success(e.msg),this.setState({loading:!1}),this.props.form.resetFields(),this.setState({showFileList:[],fileList:[]})):(S.default.error(e.msg),this.setState({loading:!1}))}.bind(t))}})}function f(e,t){var a=this.state.form;a[e]=t,this.setState({form:a})}function c(){return!1}Object.defineProperty(t,"__esModule",{value:!0});var p=a(41),m=n(p),y=a(266),h=n(y),g=a(265),b=n(g),v=a(64),_=n(v),E=a(45),w=n(E),x=a(52),C=n(x),k=a(12),L=n(k),O=a(65),S=n(O),F=a(21),P=n(F),j=a(29),R=n(j),T=a(100),q=n(T),D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},M=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();a(62),a(470),a(469),a(63),a(51),a(56),a(38),a(72),a(27),a(31),a(129);var A=a(0),U=n(A),H=a(57),V=n(H),Y=a(24),N=n(Y),B=a(20),z=a(1824),G=(n(z),q.default.create),J=(R.default.TabPane,P.default.Option),I=q.default.Item,K=function(e){function t(e){r(this,t);var a=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleChange=function(e){var t=a,n=new FileReader;if("removed"==e.file.status){var r=a.state.showFileList,o=r.indexOf(e.file),i=r.slice();return i.splice(o,1),void t.setState({showFileList:[].concat(l(i))})}n.readAsDataURL(e.file),n.onload=function(e){var a=t.state.showFileList,n=t.state.imgindex,r={uid:n,name:"xxx.png",status:"done",url:this.result};t.setState({showFileList:[].concat(l(a),[r]),imgindex:n+1})}},a.state={companyoptions:[],showFileList:[],fileList:[],loading:!1,lookloading:!1,imgindex:0,form:{company_id:"",record_date:"",money_num:"",pay_way:""}},a.callback=a.callback.bind(a),a}return i(t,e),M(t,[{key:"callback",value:function(e){console.log(e)}},{key:"componentDidMount",value:function(){B.RequireUtils.baseRequire("/relation/supp-select",{},function(e){if(1==e.code){var t=e.data.list;this.setState({companyoptions:t})}else alert(e.msg)}.bind(this))}},{key:"render",value:function(){var e=this,t={labelCol:{span:24},wrapperCol:{span:24}},a={action:"//jsonplaceholder.typicode.com/posts/",listType:"picture-card",onRemove:function(t){e.setState(function(e){var a=e.fileList,n=a.indexOf(t),l=a.slice();return l.splice(n,1),{fileList:l}})},beforeUpload:function(t){return e.setState(function(e){return{fileList:[].concat(l(e.fileList),[t])}}),!1},fileList:this.state.fileList},n=U.default.createElement("div",null,U.default.createElement(L.default,{type:"plus"}),U.default.createElement("div",{className:"ant-upload-text"},"Upload")),r=this.state,o=r.companyoptions,i=r.showFileList,u=this.props.form.getFieldDecorator;return U.default.createElement("div",{className:"my-custom-padding"},U.default.createElement(w.default,{gutter:8,style:{marginTop:"10px"}},U.default.createElement(C.default,{span:12},U.default.createElement("span",{className:"my-customer-color"}," \u672a\u4e0a\u7ebf\u4f9b\u5e94\u5546\u6dfb\u52a0\u4ed8\u6b3e\u8bb0\u5f55"))),U.default.createElement(w.default,null,U.default.createElement(C.default,{span:5},U.default.createElement(I,D({},t,{label:"\u516c\u53f8\u540d\u79f0"}),u("company_id",{initialValue:"",rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e3a\u5fc5\u586b\u9879"}]})(U.default.createElement(P.default,{style:{width:"100%"},onChange:function(t){return f.bind(e)("company_id",t)}},o.map(function(e,t){return U.default.createElement(J,{value:e.id,key:t},e.company_name)})))))),U.default.createElement(w.default,null,U.default.createElement(C.default,{span:5},U.default.createElement(I,D({},t,{label:"\u4ed8\u6b3e\u6e20\u9053"}),u("pay_way",{initialValue:"",rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e3a\u5fc5\u586b\u9879"}]})(U.default.createElement(_.default,{onContextMenu:c,onPaste:c,onCopy:c,onCut:c,autoComplete:"off",onChange:function(t){return f.bind(e)("pay_way",t.target.value)}}))))),U.default.createElement(w.default,{gutter:8,style:{marginTop:"10px"}},U.default.createElement(C.default,{span:5},U.default.createElement(I,D({},t,{label:"\u6536\u6b3e\u65f6\u95f4"}),u("record_date",{rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e3a\u5fc5\u586b\u9879"}]})(U.default.createElement(b.default,{placeholder:"",format:"YYYY-MM-DD HH:mm:ss",showTime:{defaultValue:(0,N.default)("00:00:00","HH:mm:ss")},onChange:function(t,a){return f.bind(e)("record_date",a)},style:{width:"100%"}}))))),U.default.createElement(w.default,{gutter:8,style:{marginTop:"10px"}},U.default.createElement(C.default,{span:5},U.default.createElement(I,D({},t,{label:"\u6536\u6b3e\u91d1\u989d"}),u("money_num",{initialValue:"",rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e3a\u5fc5\u586b\u9879"}]})(U.default.createElement(_.default,{onContextMenu:c,onPaste:c,onCopy:c,onCut:c,autoComplete:"off",onChange:function(t){return f.bind(e)("money_num",t.target.value)}}))))),U.default.createElement(w.default,{gutter:8,style:{marginTop:"10px"}},U.default.createElement(C.default,{span:24},U.default.createElement("p",{style:{marginBottom:"3px"}},U.default.createElement("span",{style:{color:"red",fontSize:"14px",fontFamily:"SimSun"}},"*"),"\u4e0a\u4f20\u51ed\u8bc1"),U.default.createElement(h.default,D({},a,{fileList:i,onChange:this.handleChange}),i.length>=1?null:n),U.default.createElement("small",{style:{verticalAlign:"bottom",marginLeft:"10px"}},"\u4ec5\u652f\u6301JPG\u3001PNG\u683c\u5f0f\uff0c\u6587\u4ef6\u5c0f\u4e8e2M(\u65b9\u5f62\u56fe)"))),U.default.createElement(w.default,{gutter:8,style:{marginTop:"10px"}},U.default.createElement(C.default,{span:6},U.default.createElement(m.default,{type:"primary",loading:this.state.loading,onClick:function(t){return d.bind(e)(t)},style:{marginRight:"10px"}},"\u7ee7\u7eed\u63d0\u4ea4"),U.default.createElement(m.default,{type:"primary",loading:this.state.lookloading,onClick:function(t){return s.bind(e)(t)}},"\u63d0\u4ea4\u5e76\u67e5\u770b"))))}}]),t}(U.default.Component);K=G()(K),t.default=K,e.exports=t.default},1845:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function l(e){if(Array.isArray(e)){for(var t=0,a=Array(e.length);t<e.length;t++)a[t]=e[t];return a}return Array.from(e)}function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function u(e){(0,V.default)().push({pathname:"/customerbilllistdetail/?customerid="+e})}function s(e){var t=this;this.setState({lookloading:!0});var a=this.state.fileList,n=new FormData;a.forEach(function(e){n.append("RelationForm[record_bill_img]",e)}),e.preventDefault(),this.props.form.validateFields(function(e,a){if(e)t.setState({lookloading:!1});else{var l=t.state.form;n.append("company_id2",l.company_id),n.append("record_date",l.record_date),n.append("money_num",l.money_num),n.append("scenario","add_cust_record"),Y.RequireUtils.fileBaseRequire("relation/add-record",n,function(e){e.code?S.default.success(e.msg,1,u(e.data.customer_id)):(S.default.error(e.msg),this.setState({lookloading:!1}))}.bind(t))}})}function d(e){var t=this;this.setState({loading:!0});var a=this.state.fileList,n=new FormData;a.forEach(function(e){n.append("RelationForm[record_bill_img]",e)}),e.preventDefault(),this.props.form.validateFields(function(e,a){if(console.log(e),e)t.setState({loading:!1});else{var l=t.state.form;n.append("company_id2",l.company_id),n.append("record_date",l.record_date),n.append("money_num",l.money_num),n.append("scenario","add_cust_record"),Y.RequireUtils.fileBaseRequire("relation/add-record",n,function(e){e.code?(S.default.success(e.msg),this.setState({loading:!1}),this.props.form.resetFields(),this.setState({showFileList:[],fileList:[]})):(S.default.error(e.msg),this.setState({loading:!1}))}.bind(t))}})}function f(e,t){var a=this.state.form;a[e]=t,this.setState({form:a})}function c(){return!1}Object.defineProperty(t,"__esModule",{value:!0});var p=a(41),m=n(p),y=a(266),h=n(y),g=a(265),b=n(g),v=a(64),_=n(v),E=a(45),w=n(E),x=a(52),C=n(x),k=a(12),L=n(k),O=a(65),S=n(O),F=a(21),P=n(F),j=a(29),R=n(j),T=a(100),q=n(T),D=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var a=arguments[t];for(var n in a)Object.prototype.hasOwnProperty.call(a,n)&&(e[n]=a[n])}return e},M=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}();a(62),a(470),a(469),a(63),a(51),a(56),a(38),a(72),a(27),a(31),a(129);var A=a(0),U=n(A),H=a(57),V=n(H),Y=a(20),N=a(24),B=n(N),z=a(1824),G=(n(z),q.default.create),J=(R.default.TabPane,P.default.Option),I=q.default.Item,K=function(e){function t(e){r(this,t);var a=o(this,(t.__proto__||Object.getPrototypeOf(t)).call(this,e));return a.handleChange=function(e){var t=a,n=new FileReader;if("removed"==e.file.status){var r=a.state.showFileList,o=r.indexOf(e.file),i=r.slice();return i.splice(o,1),void t.setState({showFileList:[].concat(l(i))})}n.readAsDataURL(e.file),n.onload=function(e){var a=t.state.showFileList,n=t.state.imgindex,r={uid:n,name:"xxx.png",status:"done",url:this.result};t.setState({showFileList:[].concat(l(a),[r]),imgindex:n+1})}},a.state={companyoptions:[],showFileList:[],fileList:[],lookloading:!1,imgindex:0,form:{company_id:"",record_date:"",money_num:"",pay_way:""}},a.callback=a.callback.bind(a),a}return i(t,e),M(t,[{key:"callback",value:function(e){console.log(e)}},{key:"componentDidMount",value:function(){Y.RequireUtils.baseRequire("/relation/cust-select",{},function(e){if(1==e.code){var t=e.data.list;this.setState({companyoptions:t})}else alert(e.msg)}.bind(this))}},{key:"render",value:function(){var e=this,t={labelCol:{span:24},wrapperCol:{span:24}},a={action:"//jsonplaceholder.typicode.com/posts/",listType:"picture-card",onRemove:function(t){e.setState(function(e){var a=e.fileList,n=a.indexOf(t),l=a.slice();return l.splice(n,1),{fileList:l}})},beforeUpload:function(t){return e.setState(function(e){return{fileList:[].concat(l(e.fileList),[t])}}),!1},fileList:this.state.fileList},n=U.default.createElement("div",null,U.default.createElement(L.default,{type:"plus"}),U.default.createElement("div",{className:"ant-upload-text"},"Upload")),r=this.state,o=r.companyoptions,i=r.showFileList,u=this.props.form.getFieldDecorator;return U.default.createElement("div",{className:"my-custom-padding"},U.default.createElement(w.default,null,U.default.createElement(C.default,{span:5},U.default.createElement(I,D({},t,{label:"\u516c\u53f8\u540d\u79f0"}),u("company_id",{initialValue:"",rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e3a\u5fc5\u586b\u9879"}]})(U.default.createElement(P.default,{style:{width:"100%"},onChange:function(t){return f.bind(e)("company_id",t)}},o.map(function(e,t){return U.default.createElement(J,{value:e.id,key:t},e.company_name)})))))),U.default.createElement(w.default,null,U.default.createElement(C.default,{span:5},U.default.createElement(I,D({},t,{label:"\u4ed8\u6b3e\u6e20\u9053"}),u("pay_way",{initialValue:"",rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e3a\u5fc5\u586b\u9879"}]})(U.default.createElement(_.default,{onContextMenu:c,onPaste:c,onCopy:c,onCut:c,autoComplete:"off",onChange:function(t){return f.bind(e)("pay_way",t.target.value)}}))))),U.default.createElement(w.default,{gutter:8,style:{marginTop:"10px"}},U.default.createElement(C.default,{span:5},U.default.createElement(I,D({},t,{label:"\u6536\u6b3e\u65f6\u95f4"}),u("record_date",{rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e3a\u5fc5\u586b\u9879"}]})(U.default.createElement(b.default,{placeholder:"",format:"YYYY-MM-DD HH:mm:ss",showTime:{defaultValue:(0,B.default)("00:00:00","HH:mm:ss")},onChange:function(t,a){return f.bind(e)("record_date",a)},style:{width:"100%"}}))))),U.default.createElement(w.default,{gutter:8,style:{marginTop:"10px"}},U.default.createElement(C.default,{span:5},U.default.createElement(I,D({},t,{label:"\u6536\u6b3e\u91d1\u989d"}),u("money_num",{initialValue:"",rules:[{required:!0,message:"\u8be5\u9009\u9879\u4e3a\u5fc5\u586b\u9879"}]})(U.default.createElement(_.default,{onContextMenu:c,onPaste:c,onCopy:c,onCut:c,autoComplete:"off",onChange:function(t){return f.bind(e)("money_num",t.target.value)}}))))),U.default.createElement(w.default,{gutter:8,style:{marginTop:"10px"}},U.default.createElement(C.default,{span:24},U.default.createElement("p",{style:{marginBottom:"3px"}},U.default.createElement("span",{style:{color:"red",fontSize:"14px",fontFamily:"SimSun"}},"*"),"\u4e0a\u4f20\u51ed\u8bc1"),U.default.createElement(h.default,D({},a,{fileList:i,onChange:this.handleChange}),i.length>=1?null:n),U.default.createElement("small",{style:{verticalAlign:"bottom",marginLeft:"10px"}},"\u4ec5\u652f\u6301JPG\u3001PNG\u683c\u5f0f\uff0c\u6587\u4ef6\u5c0f\u4e8e2M(\u65b9\u5f62\u56fe)"))),U.default.createElement(w.default,{gutter:8,style:{marginTop:"10px"}},U.default.createElement(C.default,{span:6},U.default.createElement(m.default,{type:"primary",loading:this.state.loading,onClick:function(t){return d.bind(e)(t)},style:{marginRight:"10px"}},"\u7ee7\u7eed\u63d0\u4ea4"),U.default.createElement(m.default,{type:"primary",loading:this.state.lookloading,onClick:function(t){return s.bind(e)(t)}},"\u63d0\u4ea4\u5e76\u67e5\u770b"))))}}]),t}(U.default.Component);K=G()(K),t.default=K,e.exports=t.default},2018:function(e,t,a){t=e.exports=a(10)(void 0),t.push([e.i,".my-custom-padding .ant-form-item {\n  margin-bottom: 0 ;\n}\n.my-custom-padding .ant-col-24.ant-form-item-label {\n  padding: 0;\n}\n.avatar-uploader,\n.avatar-uploader-trigger,\n.avatar {\n  width: 180px;\n  height: 110px;\n}\n.avatar-uploader {\n  display: inline-block;\n  border: 1px dashed #d9d9d9;\n  border-radius: 6px;\n  cursor: pointer;\n}\n.avatar-uploader-trigger {\n  display: table-cell;\n  vertical-align: middle;\n  font-size: 28px;\n  color: #999;\n}\n.my-customer-color {\n  color: #fd9206;\n}\n",""])}});
//# sourceMappingURL=52.e76ad78f.chunk.js.map