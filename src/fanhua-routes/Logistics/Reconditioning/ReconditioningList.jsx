import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import MyReconditioningListTable from './ReconditioningTable' ;
// import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class ReconditioningList extends React.Component {
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
              <div style={{padding:'15px'}}>
                <span style={{fontSize:'20px',fontWeight:'bold'}}>重车管理</span>
              </div>
              <MyReconditioningListTable></MyReconditioningListTable>
          </Col>
        </Row>
      </div >
    )
  }
}


export default ReconditioningList;
