import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Input,DatePicker } from 'antd';
import PlanListTable from './PlanListTable';
import OfflineSalePlanTable from './OfflineSalePlanTable' ;
import OfflinePurchasePlanTable from  './OfflinePurchasePlanTable' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

class CollectDebt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchparams:{find_str:"",'s_date':'',e_date:'',f_status:""},
      currentTab:1
    } ;
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    this.setState({
      currentTab:key
    })
  }


  changerangeicker=(dates, dateStrings)=>{
    const {searchparams} = this.state ;
    searchparams['s_date'] = dateStrings[0] ;
    searchparams['e_date'] = dateStrings[1] ;
    this.setState({
      searchparams: searchparams
    });
  } ;

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
      options = {...searchparams,plan_kind:0} ;
      this.PlanListTable.fetch(options) ;
    }else if(currentTab==2){
      options = {...searchparams,plan_kind:2} ;
      this.OfflineSalePlanTable.fetch(options) ;
    }else if(currentTab==3){
      options = {...searchparams,plan_kind:1} ;
      this.OfflinePurchasePlanTable.fetch(options) ;
    }
  };

  myselfonkeydown(e){
    if(e.keyCode == 13){
      this.search();
    }
  }

  render() {
    const dateFormat = 'YYYY-MM-DD';
    return (
      <div onKeyDown={(e)=>this.myselfonkeydown.bind(this)(e)}>
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <div style={{padding:'15px'}}>
              <span style={{fontSize:'20px',fontWeight:'bold'}}>计划管理</span>
            </div>
            <Row>
              <Col span={4}>
                  <div style={{padding:'10px 0'}}>
                      <Select
                          style={{ width: '100%' }}
                          placeholder="搜索状态"
                          size="large"
                          onChange={(value)=> this.changeSearchParams("f_status",value)}
                      >
                          <Option value="0" key="0">正常</Option>
                          <Option value="1" key="1">终止</Option>
                          <Option value="2" key="2">全部</Option>
                      </Select>
                  </div>
              </Col>
                <Col span={6}>
                    <div style={{padding:'10px 0'}}>
                        <RangePicker
                            format={dateFormat}
                            style={{ width: '100%' }}
                            enterButton
                            size="large"
                            onChange={this.changerangeicker}
                        />
                    </div>
                </Col>
                <Col span={2}>
                    <div style={{padding:'10px 0'}}>
                        <Button  size='large' onClick={this.search.bind(this)}>筛选</Button>
                    </div>
                </Col>
              <Col span={4}></Col>
              <Col span={6}>
                  <div style={{padding:'10px 0'}}>
                      <Input
                          placeholder="搜索企业名称、商品、接收场站"
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
                <TabPane tab="在线销售" key="1">
                  <PlanListTable  ref={(_this) => { this.PlanListTable = _this; }}></PlanListTable>
                </TabPane>
                <TabPane tab="线下销售计划" key="2">
                  <OfflineSalePlanTable  ref={(_this) => { this.OfflineSalePlanTable = _this; }}></OfflineSalePlanTable>
                </TabPane>
                <TabPane tab="线下采购计划" key="3">
                  <OfflinePurchasePlanTable  ref={(_this) => { this.OfflinePurchasePlanTable = _this; }}></OfflinePurchasePlanTable>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default CollectDebt;
