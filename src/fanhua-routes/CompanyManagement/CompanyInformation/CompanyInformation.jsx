import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';

import CompanyMessageInput from './Tabs/CompanyMessageInput';
import AddressMessage from './Tabs/AddressMessage';
import OpenTicketInput from './Tabs/OpenTicketInput';
import AptitudeMessage from './Tabs/AptitudeMessage';

import './CompanyInformation.less';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

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
          {/*  <Header/>*/}

        </Row>

        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="基本" type="card">
              <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                <TabPane tab="公司信息" key="1">
                  <CompanyMessageInput></CompanyMessageInput>
                </TabPane>
                <TabPane tab="地址信息" key="2">
                  <AddressMessage></AddressMessage>
                </TabPane>
                <TabPane tab="开票信息" key="3">
                  <OpenTicketInput></OpenTicketInput>
                </TabPane>
                <TabPane tab="资质信息" key="4">
                 <AptitudeMessage></AptitudeMessage>
                </TabPane>
              </Tabs>
            </Card>
          </Col>

        </Row>
      </div >
    )
  }
}
export default CompanyInformation;

