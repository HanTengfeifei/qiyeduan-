import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,message } from 'antd';
import './Centers.less';
import {RequireUtils} from 'utils';

import {config} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Centers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:{}
    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentDidMount(){

  }
  findRoleAll(){
  }
  render() {
    return (
    <div  className="container1">
      <div className="container_inner">
        <div  className="dun1">
        <img src={config.dun1}/>
        <div className="top">今日成交量</div>
        <div className="bottom">
          <span className="htf_icon"><Icon type="arrow-up" /></span>
          <span className="htf_number">{parseInt(
            this.props.sumWeight
          )}</span>
          <span className="htf_wei">&nbsp;吨</span></div>
      </div>
        <div  className="lian1">
          <img src={config.lian1}/>
          <div className="top">今日出车辆</div>
          <div className="bottom">
            <span className="htf_icon"><Icon type="arrow-up" /></span>
            <span className="htf_number">{parseInt(this.props.sumOrder)}</span>
            <span className="htf_wei">&nbsp;辆</span></div>
        </div>
        <div  className="yuan1">
          <img src={config.yuan1}/>
          <div className="top">累计成交量</div>
          <div className="bottom">
            <span className="htf_icon"><Icon type="arrow-up" /></span>
            <span className="htf_number">{parseInt(this.props.allWeight.weight)}</span>
            <span className="htf_wei">&nbsp;{this.props.allWeight.type}</span></div>
        </div>
        <div style={{opacity: 0.6,border: '1px solid #C6CDD7',marginTop:'60px'}}></div>
        <div style={{textAlign:'center',paddingTop:'96px',paddingBottom:'46px'}}>
          <img src={config.lgngoods} style={{height:'96%',opacity:'0.8'}}/>
        </div>
      </div>
    </div>
  )
  }
}
export default Centers;
