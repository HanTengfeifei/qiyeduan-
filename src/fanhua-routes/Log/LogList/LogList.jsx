import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import LogListTable from './LogListTable' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class WayBillList extends React.Component {
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
    return (
      <div >
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="操作日志" type="card">
              <LogListTable></LogListTable>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default WayBillList;
