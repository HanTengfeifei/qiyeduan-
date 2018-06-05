import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class PlanListCard extends  React.Component {
  constructor(props) {
    super(props);
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  render() {
    return (
       <div>
         <Card bordered={false}>
             <div className="custom-image">
               <Icon type="appstore" style={{fontSize:'40px',marginBottom:'10px'}}/>
               <p style={{textAlign:'center',margin:'0'}}>全部</p>
             </div>
         </Card>
      </div >
    )
  }
}


export default PlanListCard;
