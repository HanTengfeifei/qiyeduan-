import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import SupplierListTable from './SupplierListTable' ;
import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class SupplierList extends React.Component {
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
            <div style={{padding:'15px'}}>
              <span style={{fontSize:'20px',fontWeight:'bold'}}>我的供应商</span>
            </div>
              <SupplierListTable></SupplierListTable>
          </Col>
        </Row>
      </div >
    )
  }
}
export default SupplierList;
