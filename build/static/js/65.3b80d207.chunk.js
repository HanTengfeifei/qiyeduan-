webpackJsonp([65],{1478:function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function i(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function r(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o=n(12),u=l(o),d=n(45),f=l(d),c=n(52),s=l(c),m=n(168),p=l(m),b=n(503),g=l(b),h=function(){function e(e,t){for(var n=0;n<t.length;n++){var l=t[n];l.enumerable=l.enumerable||!1,l.configurable=!0,"value"in l&&(l.writable=!0),Object.defineProperty(e,l.key,l)}}return function(t,n,l){return n&&e(t.prototype,n),l&&e(t,l),t}}();n(38),n(51),n(56),n(262),n(1836);var E=n(0),v=l(E),y=function(e){function t(){return a(this,t),i(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return r(t,e),h(t,[{key:"render",value:function(){return v.default.createElement("div",null,v.default.createElement(f.default,{gutter:8,style:{marginTop:"20px"}},v.default.createElement(s.default,{span:12},v.default.createElement(p.default,{hoverable:!0,title:"\u57fa\u672c"},v.default.createElement(g.default,null,v.default.createElement(g.default.Item,null,"Create a services site 2015-09-01"),v.default.createElement(g.default.Item,null,"Solve initial network problems 2015-09-01"),v.default.createElement(g.default.Item,null,"Technical testing 2015-09-01"),v.default.createElement(g.default.Item,null,"Network problems being solved 2015-09-01")))),v.default.createElement(s.default,{span:12},v.default.createElement(p.default,{hoverable:!0,title:"\u5706\u5708\u989c\u8272"},v.default.createElement(g.default,null,v.default.createElement(g.default.Item,{color:"green"},"Create a services site 2015-09-01"),v.default.createElement(g.default.Item,{color:"green"},"Create a services site 2015-09-01"),v.default.createElement(g.default.Item,{color:"red"},v.default.createElement("p",null,"Solve initial network problems 1"),v.default.createElement("p",null,"Solve initial network problems 2"),v.default.createElement("p",null,"Solve initial network problems 3 2015-09-01")),v.default.createElement(g.default.Item,null,v.default.createElement("p",null,"Technical testing 1"),v.default.createElement("p",null,"Technical testing 2"),v.default.createElement("p",null,"Technical testing 3 2015-09-01")))))),v.default.createElement(f.default,{gutter:8,style:{marginTop:"20px"}},v.default.createElement(s.default,{span:12},v.default.createElement(p.default,{hoverable:!0,title:"\u6700\u540e\u4e00\u4e2a"},v.default.createElement(g.default,{pending:v.default.createElement("a",null,"See more")},v.default.createElement(g.default.Item,null,"Create a services site 2015-09-01"),v.default.createElement(g.default.Item,null,"Solve initial network problems 2015-09-01"),v.default.createElement(g.default.Item,null,"Technical testing 2015-09-01")))),v.default.createElement(s.default,{span:12},v.default.createElement(p.default,{hoverable:!0,title:"\u81ea\u5b9a\u4e49\u65f6\u95f4\u8f74\u70b9"},v.default.createElement(g.default,null,v.default.createElement(g.default.Item,null,"Create a services site 2015-09-01"),v.default.createElement(g.default.Item,null,"Solve initial network problems 2015-09-01"),v.default.createElement(g.default.Item,{dot:v.default.createElement(u.default,{type:"clock-circle-o",style:{fontSize:"16px"}}),color:"red"},"Technical testing 2015-09-01"),v.default.createElement(g.default.Item,null,"Network problems being solved 2015-09-01"))))))}}]),t}(v.default.Component);t.default=y,e.exports=t.default},1836:function(e,t,n){"use strict";n(14),n(2339)},2012:function(e,t,n){t=e.exports=n(10)(void 0),t.push([e.i,'/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors */\n.ant-timeline {\n  font-family: "AvenirNext-Regular", "Helvetica Neue", "lucida grande", "PingFangHK-Light", "STHeiti", "Heiti SC", "Hiragino Sans GB", "Microsoft JhengHei", "Microsoft Yahei", SimHei, "WenQuanYi Micro Hei", "Droid Sans", "Roboto", Helvetica, Tahoma, Arial, "sans-serif";\n  font-size: 14px;\n  line-height: 1.5;\n  color: rgba(0, 0, 0, 0.65);\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n.ant-timeline-item {\n  position: relative;\n  padding: 0 0 20px;\n  list-style: none;\n  margin: 0;\n  font-size: 14px;\n}\n.ant-timeline-item-tail {\n  position: absolute;\n  left: 4px;\n  top: 0.75em;\n  height: 100%;\n  border-left: 2px solid #e8e8e8;\n}\n.ant-timeline-item-pending .ant-timeline-item-head {\n  font-size: 12px;\n}\n.ant-timeline-item-pending .ant-timeline-item-tail {\n  display: none;\n}\n.ant-timeline-item-head {\n  position: absolute;\n  width: 10px;\n  height: 10px;\n  background-color: #fff;\n  border-radius: 100px;\n  border: 2px solid transparent;\n}\n.ant-timeline-item-head-blue {\n  border-color: #1890ff;\n  color: #1890ff;\n}\n.ant-timeline-item-head-red {\n  border-color: #f5222d;\n  color: #f5222d;\n}\n.ant-timeline-item-head-green {\n  border-color: #52c41a;\n  color: #52c41a;\n}\n.ant-timeline-item-head-custom {\n  position: absolute;\n  text-align: center;\n  line-height: 1;\n  margin-top: 0;\n  border: 0;\n  height: auto;\n  border-radius: 0;\n  padding: 3px 1px;\n  -webkit-transform: translate(-50%, -50%);\n      -ms-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n  top: 5px;\n  left: 5px;\n  width: auto;\n}\n.ant-timeline-item-content {\n  padding: 0 0 0 18px;\n  position: relative;\n  top: -6px;\n}\n.ant-timeline-item-last .ant-timeline-item-tail {\n  border-left: 2px dotted #e8e8e8;\n  display: none;\n}\n.ant-timeline-item-last .ant-timeline-item-content {\n  min-height: 48px;\n}\n.ant-timeline.ant-timeline-pending .ant-timeline-item-last .ant-timeline-item-tail {\n  display: block;\n}\n',""])},2339:function(e,t,n){var l=n(2012);"string"===typeof l&&(l=[[e.i,l,""]]);var a={hmr:!0};a.transform=void 0;n(11)(l,a);l.locals&&(e.exports=l.locals)}});
//# sourceMappingURL=65.3b80d207.chunk.js.map