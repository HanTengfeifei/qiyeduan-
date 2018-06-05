import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import ContractManagementTable from  './ContractManagementTable' ;
import {RequireUtils} from 'utils';
import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ContractManagement extends React.Component {
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
            <Card hoverable title="资质信息" type="card" className={'no-content-card'}>
              <ContractManagementTable></ContractManagementTable>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}

export default ContractManagement;
