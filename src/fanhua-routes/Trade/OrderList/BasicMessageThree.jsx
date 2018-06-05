import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class BasicMessage extends React.Component {
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
    const {order,_pmyself,go} = this.props ;
    return (
      <div >

        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col>{order.goods_name}&nbsp;{order.goods_num}吨</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col>价格&nbsp;￥{order.goods_price}元/吨</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col  style={{color:'#fd9206'}}>订单金额&nbsp;￥{order.order_sum}</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col>
            <div>
              <span style={{color:'#bbb'}}>含7.5%订单金额的保证金</span>
              <span style={{float:'right',marginRight:'5px'}}>
              </span>
            </div>
          </Col>
        </Row>
      </div >
    )
  }
}
export default BasicMessage;
