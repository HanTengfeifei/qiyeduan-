import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Input } from 'antd';
import CarHeader from './Tabs/CarHeader';
import CarHang from './Tabs/CarHang';
import CarDriver from './Tabs/CarDriver';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class PropertyManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchparams:{find_str:""},
      curentTab:1,
      pholder:"搜索车牌、联系人"
    } ;
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    this.setState({
      curentTab:key
    });
    if(key==1||key==2){
      this.setState({
        pholder:"搜索车牌、联系人"
      })
    }else{
      this.setState({
        pholder:"搜索姓名、身份证"
      })
    }
  }


  changeSearchParams = (filed,value) => {
    const {searchparams} = this.state ;
    searchparams[filed] = value ;
    this.setState({
      searchparams: searchparams
    });
  };

  search=()=>{
    var {searchparams,curentTab} = this.state ;
    var myref = "" ;
    var myoptions = {} ;
    if(curentTab==1){
      myref = "CarHeader" ;
      myoptions = {...searchparams,car_type:0} ;
    }else if(curentTab==2){
      myref = "CarHang" ;
      myoptions = {...searchparams,car_type:1} ;
    }else if(curentTab==3){
      myref = "CarDriver" ;
      myoptions = {...searchparams} ;
    }
    this.refs[myref].fetch(myoptions) ;
  };
  myselfonkeydown(e){
    if(e.keyCode == 13){
      this.search();
    }
  }
  render() {
    const {pholder} = this.state ;
    return (
      <div onKeyDown={(e)=>this.myselfonkeydown.bind(this)(e)}>
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <div style={{padding:'15px'}}>
              <span style={{fontSize:'20px',fontWeight:'bold'}}>车辆管理</span>
            </div>
            <Row>
              <Col span={16}></Col>
              <Col span={6}>
                <div style={{padding:'10px 0'}}>
                  <Input
                    placeholder={pholder}
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
                <TabPane tab="车头" key="1">
                  <CarHeader ref={"CarHeader"}></CarHeader>
                </TabPane>
                <TabPane tab="车挂" key="2">
                  <CarHang ref={"CarHang"}></CarHang>
                </TabPane>
                <TabPane tab="司机" key="3">
                  <CarDriver ref={"CarDriver"}></CarDriver>
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
