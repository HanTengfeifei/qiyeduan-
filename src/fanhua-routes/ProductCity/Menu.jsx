import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,BackTop } from 'antd';
import { Link } from 'dva/router';
import './Menu.less';
import {RequireUtils} from 'utils';
import $ from 'jquery';
import {config} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Menu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
style:{},
    };
    this.callback = this.callback.bind(this);
    this.onMouseEnter = this.onMouseEnter.bind(this);
    this.onMouseLeave = this.onMouseLeave.bind(this);
    this.switch= this.switch.bind(this);
  }

  callback(key) {
    console.log(key);
  }
  onMouseEnter(e){
    $('.slide .info').addClass('hover');
    $('.slide .info li').hide();
    $('.slide .info li.'+$(e.target).attr('class')).show();//.slide .info li.qq
  }
  onMouseLeave() {
    $('.slide .info').removeClass('hover');
  }
  switch(e){
    console.log(e.target);
    // $('.slide').toggle();
    if($(e.target).hasClass('index_cy')){
      $(e.target).removeClass('index_cy');
      $(e.target).addClass('index_cy2');
    }else{
      $(e.target).removeClass('index_cy2');
      $(e.target).addClass('index_cy');
    }
  }
  componentWillMount(){
    const _this=this;
      var obtn= document.getElementById("slide");
    var osTop=document.documentElement.scrollTop||document.body.scrollTop;

    if(osTop>=clientHeight){
      // obtn.style.display='block';
      _this.setState({
        style:{display:"block"},
      });
    }
    else{
      _this.setState({
        style:{display:"none"},
      });
    }
      //文档高度
      var clientHeight=document.documentElement.clientHeight;
      window.onscroll = function(){
        var osTop=document.documentElement.scrollTop+60||document.body.scrollTop+60;
        if(osTop>=clientHeight){
          // obtn.style.display='block';
          _this.setState({
            style:{display:"block"},
          });
        }
        else{
          _this.setState({
            style:{display:"none"},
          });
        }
        // obtn.style.display='none';
      }
  }

    // $(function(){
    //
    //   $('.slide .icon li').not('.up,.down').mouseenter(function(){
    //     $('.slide .info').addClass('hover');
    //     $('.slide .info li').hide();
    //     $('.slide .info li.'+$(this).attr('class')).show();//.slide .info li.qq
    //   });
    //   $('.slide').mouseleave(function(){
    //     $('.slide .info').removeClass('hover');
    //   });
    //
    //   $('#btn').click(function(){
    //     $('.slide').toggle();
    //     if($(this).hasClass('index_cy')){
    //       $(this).removeClass('index_cy');
    //       $(this).addClass('index_cy2');
    //     }else{
    //       $(this).removeClass('index_cy2');
    //       $(this).addClass('index_cy');
    //     }
    //
    //   });
    //
    // });

  render() {
    const tel="13167638835";
const {visible}=this.state;
    return (
      <div >
          {/*<div className="slide" onMouseLeave={this.onMouseLeave} style={this.state.style}>*/}
            {/*<ul className="icon">*/}
              {/*<li className="up" title="上一页"></li>*/}
              {/*<li className="qq" onMouseEnter={this.onMouseEnter}></li>*/}
              {/*<li className="qq-margin" ></li>*/}
              {/*<li className="tel" onMouseEnter={this.onMouseEnter}></li>*/}
              {/*<li className="qq-margin" ></li>*/}
              {/*<li className="wx" onMouseEnter={this.onMouseEnter}></li>*/}
              {/*<li className="qq-margin" ></li>*/}
              {/*<li className="bu" onMouseEnter={this.onMouseEnter}></li>*/}
              {/*/!*<li className="qq-margin" ></li>*!/*/}
              {/*<li className="down" title="下一页"></li>*/}
            {/*</ul>*/}
            {/*<ul className="info">*/}
              {/*<li className="qq">*/}
                {/*<p>在线沟通，请点我<a href="http://wpa.qq.com/msgrd?v=3&uin=563224183&site=qq&menu=yes" target="_blank">在线咨询</a>*/}
                {/*</p>*/}
              {/*</li>*/}
              {/*<li className="tel">*/}
                {/*<p> 咨询热线:<br/>13167638835<br/>客服qq：<br/> 1157123521</p>*/}
              {/*</li>*/}
              {/*<li className="wx">*/}
                {/*<div className="img"><img  src={config.weiXin}/></div>*/}
              {/*</li>*/}
              {/*<li className="bu">*/}
                {/*<div className="img"><img  src={config.weiXin}/></div>*/}
              {/*</li>*/}
            {/*</ul>*/}
          {/*</div>*/}
        <BackTop>
        <div id="btn" className="index_cy"
             onClick={this.switch}
        ></div>
      </BackTop>

      </div>
    )
  }
}
export default Menu;
