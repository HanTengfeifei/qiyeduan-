import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch ,Divider} from 'antd';
// import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class ShowCarBasic extends React.Component {
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
          <Col span={3}>车头牌照</Col>
          <Col span={9}>{cust.company_name}</Col>
          <Col span={3}>车挂牌照</Col>
          <Col span={9}>{cust.company_abbr}</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}>司机</Col>
          <Col span={9}>{cust.company_prop}</Col>
          <Col span={3}>联系方式</Col>
          <Col span={9}>{cust.register_addr}</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={3}>荷载量</Col>
          <Col span={9}> {cust.company_owner}</Col>
          <Col span={3}></Col>
          <Col span={9}></Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4}>装车时间</Col>
          <Col span={4}>货物状态</Col>
          <Col span={4}>已调度</Col>
          <Col span={4}>待调度</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
          <Col span={4}></Col>
        </Row>
        <Divider></Divider>
      </div >
    )
  }
}
export default ShowCarBasic;
