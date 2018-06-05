import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ShowCustomerDetails extends React.Component {
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
    const {cust} = this.props ;
    return (
      <div >

        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}>公司名称</Col>
          <Col span={9}>{cust.company_name}</Col>
          <Col span={3}>公司简称</Col>
          <Col span={9}>{cust.company_abbr}</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}>公司性质</Col>
          <Col span={9}>{cust.prop_name}</Col>
          <Col span={3}>注册地址</Col>
          <Col span={9}> {cust.company_addr}</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}>法人</Col>
          <Col span={9}> {cust.company_owner}</Col>
          <Col span={3}>联系电话</Col>
          <Col span={9}>{cust.owner_phone}</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}>联系人</Col>
          <Col span={9}> {cust.company_contact}</Col>
          <Col span={3}>联系电话</Col>
          <Col span={9}>{cust.contact_phone}</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}>公司类型</Col>
          <Col span={9}> {cust.type_name}</Col>
        </Row>
      </div >
    )
  }
}
export default ShowCustomerDetails;
