import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';

import './Homepage.less';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class TagsDemo extends React.Component {
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
          <Header/>

        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card hoverable title="基本" type="card">
              <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                <TabPane tab="个人信息" key="1">
                  <Mation></Mation>

                </TabPane>
                <TabPane tab="公司关系" key="2">
                  <Company></Company>
                </TabPane>
                <TabPane tab="安全信息" key="3">
                  <Security></Security>
                </TabPane>
              </Tabs>
            </Card>
          </Col>

        </Row>
      </div >
    )
  }
}
export default TagsDemo;
