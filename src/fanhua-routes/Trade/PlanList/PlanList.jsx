import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import MyPlanListTable from  './PlanListTable' ;
import {RequireUtils} from 'utils';
import mystyle from './tabstyle.less' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class PlanList extends React.Component {
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
            <Card hoverable title="计划管理" type="card">
              <MyPlanListTable></MyPlanListTable>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default PlanList;
