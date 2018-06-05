import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Input } from 'antd';
import CarHeader from './MyEmployeeManagement';
import CarHang from './MyEmployeeManagements';
// import CarDriver from './Tabs/CarDriver';
const TabPane = Tabs.TabPane;
const Option = Select.Option;


class PropertyManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchparams:{find_str:""},
      currentTab:1
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    this.setState({
      currentTab:key
    })
  }

  changeSearchParams = (filed,value) => {
    const {searchparams} = this.state ;
    searchparams[filed] = value ;
    this.setState({
      searchparams: searchparams
    });
  };

  search=()=>{
    var {searchparams} = this.state ;
    var options = {} ;
    var {currentTab} = this.state ;
    if(currentTab==1){
      options = {...searchparams,check_status:2} ;
      this.CarHeader.EmployeeManagementTable.fetch(options) ;
    }else if(currentTab==2){
      options = {...searchparams,check_status:1} ;
      this.CarHang.EmployeeManagementTable.fetch(options) ;
    }
  };

  myselfonkeydown(e){
    if(e.keyCode == 13){
      this.search();
    }
  }

  render() {
    return (
      <div onKeyDown={(e) =>(this.myselfonkeydown.bind(this)(e))}>
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
              <div style={{padding:'15px'}}>
                <span style={{fontSize:'20px',fontWeight:'bold'}}>员工管理</span>
              </div>

            <Row>
              <Col span={16}></Col>
              <Col span={6}>
                <div style={{padding:'10px 0'}}>
                  <Input
                    placeholder="搜索姓名、手机号"
                    size="large"
                    onChange={(e)=>this.changeSearchParams.bind(this)('find_str',e.target.value)}
                  />
                </div>
              </Col>
              <Col span={2}>
                <div style={{padding:'10px 0'}}>
                  <Button icon="search" size='large' onClick={this.search.bind(this)}>查询</Button>
                </div>
              </Col>
            </Row>

            <Card  title="" type="card">
              <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                <TabPane tab="员工信息" key="1">
                  <CarHeader ref={(_this) => { this.CarHeader = _this; }}></CarHeader>
                </TabPane>
                <TabPane tab="待审核的员工" key="2">
                  <CarHang ref={(_this) => { this.CarHang = _this; }}></CarHang>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}

export default PropertyManagement;
