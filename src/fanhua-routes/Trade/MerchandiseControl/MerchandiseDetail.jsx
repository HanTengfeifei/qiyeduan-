import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider } from 'antd';
import mystyle from './tabstyle.less' ;
import MerchandiseDetailBasic from  './MerchandiseDetailBasic' ;
import SaleMerchandiseMessage from  './SaleMerchandiseMessage' ;
import MerchandiseCalendar from  './MerchandiseCalendar' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MerchandiseDetail extends React.Component {
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
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="商品管理" type="card">
              <MerchandiseDetailBasic></MerchandiseDetailBasic>
              <Divider></Divider>
              <SaleMerchandiseMessage></SaleMerchandiseMessage>
              <Divider></Divider>
              <MerchandiseCalendar></MerchandiseCalendar>
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col span={6} >
                  <Button  type="primary" >提交</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default MerchandiseDetail;
