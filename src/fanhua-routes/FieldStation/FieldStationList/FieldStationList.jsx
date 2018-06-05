import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
// import  './tabstyle.less' ;
import FieldStationDetail from './FieldStationDetail' ;
import MyFieldStationListTable from './FieldStationListTable' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class FieldStationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      detail:false,
      showtable:true
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
                <span style={{fontSize:'20px',fontWeight:'bold'}}>我的场站</span>
              </div>
             <MyFieldStationListTable ></MyFieldStationListTable>
          </Col>
        </Row>
      </div >
    )
  }
}
export default FieldStationList;
