webpackJsonp([107],{1428:function(e,t,l){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var r=l(41),u=n(r),s=l(169),c=n(s),f=l(45),d=n(f),m=l(52),p=n(m),h=l(168),b=n(h),E=function(){function e(e,t){for(var l=0;l<t.length;l++){var n=t[l];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,l,n){return l&&e(t.prototype,l),n&&e(t,n),t}}();l(62),l(264),l(51),l(56),l(262);var v=l(0),y=n(v),g=function(e){function t(){return a(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return i(t,e),E(t,[{key:"render",value:function(){return y.default.createElement("div",null,y.default.createElement(d.default,{gutter:8,style:{marginTop:"20px"}},y.default.createElement(p.default,{span:12},y.default.createElement(b.default,{hoverable:!0,title:"\u57fa\u672c"},y.default.createElement(k,null))),y.default.createElement(p.default,{span:12},y.default.createElement(b.default,{hoverable:!0,title:"\u5f02\u6b65\u5173\u95ed"},y.default.createElement(C,null)))),y.default.createElement(d.default,{gutter:8,style:{marginTop:"20px"}},y.default.createElement(p.default,{span:12},y.default.createElement(b.default,{hoverable:!0,title:"\u81ea\u5b9a\u4e49\u9875\u811a"},y.default.createElement(O,null))),y.default.createElement(p.default,{span:12},y.default.createElement(b.default,{hoverable:!0,title:"\u786e\u8ba4\u5bf9\u8bdd\u6846",extra:"\u4f7f\u7528 confirm() \u53ef\u4ee5\u5feb\u6377\u5730\u5f39\u51fa\u786e\u8ba4\u6846"},y.default.createElement(u.default,{onClick:function(){c.default.confirm({title:"Do you Want to delete these items?",content:"Some descriptions",onOk:function(){console.log("OK")},onCancel:function(){console.log("Cancel")}})}},"Confirm")))),y.default.createElement(d.default,{gutter:8,style:{marginTop:"20px"}},y.default.createElement(p.default,{span:12},y.default.createElement(b.default,{hoverable:!0,title:"\u4fe1\u606f\u63d0\u793a"},y.default.createElement(u.default,{onClick:function(){c.default.info({title:"This is a notification message",content:y.default.createElement("div",null,y.default.createElement("p",null,"some messages...some messages..."),y.default.createElement("p",null,"some messages...some messages...")),onOk:function(){}})}},"Info")," ",y.default.createElement(u.default,{onClick:function(){c.default.success({title:"This is a success message",content:"some messages...some messages..."})}},"Success")," ",y.default.createElement(u.default,{onClick:function(){c.default.error({title:"This is an error message",content:"some messages...some messages..."})}},"Error")," ",y.default.createElement(u.default,{onClick:function(){c.default.warning({title:"This is a warning message",content:"some messages...some messages..."})}},"Warning")," ")),y.default.createElement(p.default,{span:12},y.default.createElement(b.default,{hoverable:!0,title:"\u81ea\u5b9a\u4e49\u4f4d\u7f6e"},y.default.createElement(_,null)))))}}]),t}(y.default.Component),k=function(e){function t(){var e,l,n,i;a(this,t);for(var r=arguments.length,u=Array(r),s=0;s<r;s++)u[s]=arguments[s];return l=n=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),n.state={visible:!1},n.showModal=function(){n.setState({visible:!0})},n.handleOk=function(e){console.log(e),n.setState({visible:!1})},n.handleCancel=function(e){console.log(e),n.setState({visible:!1})},i=l,o(n,i)}return i(t,e),E(t,[{key:"render",value:function(){return y.default.createElement("div",null,y.default.createElement(u.default,{type:"primary",onClick:this.showModal},"Open"),y.default.createElement(c.default,{title:"Basic Modal",visible:this.state.visible,onOk:this.handleOk,onCancel:this.handleCancel},y.default.createElement("p",null,"Some contents..."),y.default.createElement("p",null,"Some contents..."),y.default.createElement("p",null,"Some contents...")))}}]),t}(y.default.Component),C=function(e){function t(){var e,l,n,i;a(this,t);for(var r=arguments.length,u=Array(r),s=0;s<r;s++)u[s]=arguments[s];return l=n=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),n.state={ModalText:"Content of the modal",visible:!1},n.showModal=function(){n.setState({visible:!0})},n.handleOk=function(){n.setState({ModalText:"The modal will be closed after two seconds",confirmLoading:!0}),setTimeout(function(){n.setState({visible:!1,confirmLoading:!1})},2e3)},n.handleCancel=function(){console.log("Clicked cancel button"),n.setState({visible:!1})},i=l,o(n,i)}return i(t,e),E(t,[{key:"render",value:function(){var e=this.state,t=e.visible,l=e.confirmLoading,n=e.ModalText;return y.default.createElement("div",null,y.default.createElement(u.default,{type:"primary",onClick:this.showModal},"Open"),y.default.createElement(c.default,{title:"Title",visible:t,onOk:this.handleOk,confirmLoading:l,onCancel:this.handleCancel},y.default.createElement("p",null,n)))}}]),t}(y.default.Component),O=function(e){function t(){var e,l,n,i;a(this,t);for(var r=arguments.length,u=Array(r),s=0;s<r;s++)u[s]=arguments[s];return l=n=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),n.state={loading:!1,visible:!1},n.showModal=function(){n.setState({visible:!0})},n.handleOk=function(){n.setState({loading:!0}),setTimeout(function(){n.setState({loading:!1,visible:!1})},3e3)},n.handleCancel=function(){n.setState({visible:!1})},i=l,o(n,i)}return i(t,e),E(t,[{key:"render",value:function(){var e=this.state,t=e.visible,l=e.loading;return y.default.createElement("div",null,y.default.createElement(u.default,{type:"primary",onClick:this.showModal},"Open"),y.default.createElement(c.default,{visible:t,title:"Title",onOk:this.handleOk,onCancel:this.handleCancel,footer:[y.default.createElement(u.default,{key:"back",size:"large",onClick:this.handleCancel},"Return"),y.default.createElement(u.default,{key:"submit",type:"primary",size:"large",loading:l,onClick:this.handleOk},"Submit")]},y.default.createElement("p",null,"Some contents..."),y.default.createElement("p",null,"Some contents..."),y.default.createElement("p",null,"Some contents..."),y.default.createElement("p",null,"Some contents..."),y.default.createElement("p",null,"Some contents...")))}}]),t}(y.default.Component),_=function(e){function t(){var e,l,n,i;a(this,t);for(var r=arguments.length,u=Array(r),s=0;s<r;s++)u[s]=arguments[s];return l=n=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),n.state={modal1Visible:!1,modal2Visible:!1},i=l,o(n,i)}return i(t,e),E(t,[{key:"setModal1Visible",value:function(e){this.setState({modal1Visible:e})}},{key:"setModal2Visible",value:function(e){this.setState({modal2Visible:e})}},{key:"render",value:function(){var e=this;return y.default.createElement("div",null,y.default.createElement(u.default,{type:"primary",onClick:function(){return e.setModal1Visible(!0)}},"Display a modal dialog at 20px to Top"),y.default.createElement(c.default,{title:"20px to Top",style:{top:20},visible:this.state.modal1Visible,onOk:function(){return e.setModal1Visible(!1)},onCancel:function(){return e.setModal1Visible(!1)}},y.default.createElement("p",null,"some contents..."),y.default.createElement("p",null,"some contents..."),y.default.createElement("p",null,"some contents...")),y.default.createElement("br",null),y.default.createElement("br",null),y.default.createElement(u.default,{type:"primary",onClick:function(){return e.setModal2Visible(!0)}},"Vertically centered modal dialog"),y.default.createElement(c.default,{title:"Vertically centered modal dialog",wrapClassName:"vertical-center-modal",visible:this.state.modal2Visible,onOk:function(){return e.setModal2Visible(!1)},onCancel:function(){return e.setModal2Visible(!1)}},y.default.createElement("p",null,"some contents..."),y.default.createElement("p",null,"some contents..."),y.default.createElement("p",null,"some contents...")))}}]),t}(y.default.Component);t.default=g,e.exports=t.default}});
//# sourceMappingURL=107.e195fc64.chunk.js.map