import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';
import EmployeeManagementTable from './Tabss/EmployeeManagementTable' ;
/*import './CompanyInformation.less';*/
const TabPane = Tabs.TabPane;
class CompanyInformation extends React.Component {
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
      <div>
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card  title="员工信息" type="card">
              <EmployeeManagementTable ref={(_this) => { this.EmployeeManagementTable = _this; }}></EmployeeManagementTable>
            </Card>
          </Col>

        </Row>
      </div >
    )
  }
}
export default CompanyInformation;

