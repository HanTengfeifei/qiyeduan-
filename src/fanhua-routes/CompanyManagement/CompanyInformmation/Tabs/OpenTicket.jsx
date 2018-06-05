import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';
import { Divider } from 'antd';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class OpenTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name:"韩腾飞",
      id:"18",
      wechat:"weichat",
      telephone:"1157123521"
    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  render() {
    var {name,id, wechat,telephone}=this.state;
    return (
      <div>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            公司名称:
          </Col>
          <Col span={20}>
            {name}
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            注册电话:
          </Col>
          <Col span={20}>
            {id}
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            营业执照号码:
          </Col>
          <Col span={20}>
            {wechat}
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            注册地址:
          </Col>
          <Col span={20}>
            {telephone}
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            开户银行:
          </Col>
          <Col span={20}>
            {telephone}
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            开户账号:
          </Col>
          <Col span={20}>
            {telephone}
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col   span={8}>
            <Button  className={"button2"} type="primary" ghost>编辑</Button>
          </Col>
        </Row>
        <Divider></Divider>
      </div >
    )
  }
}
export default OpenTicket;
