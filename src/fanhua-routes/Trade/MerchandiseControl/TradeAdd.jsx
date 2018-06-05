import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,DatePicker,Input,Divider } from 'antd';
import TradeAddSelect from './TradeAddSelect' ;
import MyTradeAddTable from './TradeAddTable' ;
import MyTradeAddPreTable from './TradeAddPreTable' ;
import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class TradeAdd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <div >
        <Row gutter={8}>
          <Col span={8}>
              <span style={{fontSize:'18px'}}>配送信息</span>
          </Col>
          <Col span={2}>
          </Col>
          <Col span={8}>
            <span style={{fontSize:'18px'}}>卖方信息</span>
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={8}>
            <TradeAddSelect params={{title:'配送方式'}}></TradeAddSelect>
          </Col>
          <Col span={2}>
          </Col>
          <Col span={8}>
            <TradeAddSelect params={{title:'销售方'}}></TradeAddSelect>
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={8}>
            到站时间 <div><DatePicker style={{width:'100%'}}/></div>
          </Col>
          <Col span={2}>
          </Col>
          <Col span={8}>
            <TradeAddSelect params={{title:'关联合同'}}></TradeAddSelect>
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={8}>
            购买数量 <Input placeholder="Enter your username" />
          </Col>
          <Col span={2}>
          </Col>
          <Col span={8}>
            业务联系人 <Input placeholder="Enter your username" />
          </Col>
        </Row>
        <Row  style={{ marginTop: '10px' }}>
          <Col>购买地址</Col>
        </Row>
        <Row gutter={8} type="flex" align="middle">
          <Col span={8}>
             <Input placeholder="Enter your username" />
          </Col>
          <Col span={1}>
            <Input placeholder="Enter your username1111" />
          </Col>
          <Col>
            <span>吨</span><Icon type="plus-circle-o" />
          </Col>
        </Row>
        <Divider></Divider>
        <MyTradeAddTable></MyTradeAddTable>
        <MyTradeAddPreTable></MyTradeAddPreTable>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={6} >
            <Button  type="primary" >提交</Button>
          </Col>
        </Row>
      </div >
    )
  }
}

export default TradeAdd;
