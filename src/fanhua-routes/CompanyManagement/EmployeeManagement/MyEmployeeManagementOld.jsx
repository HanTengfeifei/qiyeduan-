import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';

import EmployeeManagementTable from './TabsOld/EmployeeManagementTable' ;

/*import './CompanyInformation.less';*/

const TabPane = Tabs.TabPane;

class CompanyInformation extends React.Component {
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
      <div>
        <Row>
        </Row>

        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="员工信息" type="card">
              <EmployeeManagementTable></EmployeeManagementTable>
            </Card>
          </Col>

        </Row>
      </div >
    )
  }
}
export default CompanyInformation;

