import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';
import { Divider } from 'antd';
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class CompanyMessage extends React.Component {
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
          <Col span={19} >
            <Row gutter={8} style={{ marginTop: '10px' }}>
              <Col span={5} >
                公司名称:
              </Col>
              <Col span={16}>
                {name}
              </Col>
            </Row>
            <Divider></Divider>
            <Row gutter={8} style={{ marginTop: '10px' }}>
              <Col span={5} >
                公司简称:
              </Col>
              <Col span={16}>
                {id}
              </Col>
            </Row>
            <Divider></Divider>
            <Row gutter={8} style={{ marginTop: '10px' }}>
              <Col span={5} >
                营业执照号码:
              </Col>
              <Col span={16}>
                {wechat}
              </Col>
            </Row>
            <Divider></Divider>
            <Row gutter={8} style={{ marginTop: '10px' }}>
              <Col span={5} >
                法人姓名:
              </Col>
              <Col span={16}>
                {telephone}
              </Col>
            </Row>
          </Col>
          <Col span={5} style={{textAlign:'center'}}>
            <p style={{ padding: '90px 0px',background:'#ddd'}}><Icon type="picture" style={{ fontSize: 25 }} /></p>
            <small>营业执照</small>
          </Col>
        </Row>
       {/* */}

        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
           联系姓名:
          </Col>
          <Col span={20}>
            {telephone}
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            管理员账号:
          </Col>
          <Col span={20}>
            {telephone}
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
            邮箱:
          </Col>
          <Col span={20}>
            {telephone}
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            公司性质:
          </Col>
          <Col span={20}>
            {telephone}
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            公司类型:
          </Col>
          <Col span={20}>
            {telephone}
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            公司简介:
          </Col>
          <Col span={20}>
            {telephone}
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col    span={4} >
            <Button  className={"button1"} type="primary">上传</Button>
          </Col>
          <Col   span={4}>
            <Button  className={"button2"} type="primary" ghost>编辑</Button>
          </Col>
        </Row>
        <Divider></Divider>
      </div >
    )
  }
}
export default CompanyMessage;
