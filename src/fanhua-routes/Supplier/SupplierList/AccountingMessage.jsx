import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
const TabPane = Tabs.TabPane;
const Option = Select.Option;


function showbill(id) {
  createHistory().push({
    pathname: '/supplierbilllistdetail/?supplierid='+id,
  })
}

class ShowCustomerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  render() {
    const {cust,statistics} = this.props ;
    return (
      <div >

        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}>注册电话</Col>
          <Col span={9}>{cust.register_phone}</Col>
          <Col span={3}>累计交易金额</Col>
          <Col span={9}><span className={'my-customer-color'}>{statistics.total_money}万</span></Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}>税号</Col>
          <Col span={9}>{cust.license_num}</Col>
          <Col span={3}>销售合计</Col>
          <Col span={9}>{statistics.total_num}吨</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}>开户行</Col>
          <Col span={9}>{cust.register_bank}</Col>
          <Col span={3}>供应商余额</Col>
          <Col span={9}><span className={'my-customer-color'}>￥{statistics.balance}元</span></Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}>开户账号</Col>
          <Col span={9}> {cust.bank_code}</Col>
          <Col span={3}></Col>
          <Col span={9}></Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}></Col>
          <Col span={9}> </Col>
          <Col span={3}> <Button onClick={()=>showbill.bind(this)(cust.myid)}>查看账单</Button></Col>
          <Col span={9}></Col>
        </Row>
      </div >
    )
  }
}
export default ShowCustomerDetails;
