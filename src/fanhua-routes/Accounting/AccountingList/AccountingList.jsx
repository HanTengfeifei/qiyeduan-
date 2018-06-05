import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Input,DatePicker } from 'antd';
import SaleAccounting from './Tabs/SaleAccounting' ;
import PurchaseAccounting from './Tabs/PurchaseAccounting' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

const { MonthPicker, RangePicker } = DatePicker;

class AccountingList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchparams:{find_str:'','s_date':'',e_date:''},
      currentTab:1
    } ;
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

  changerangeicker=(dates, dateStrings)=>{
    const {searchparams} = this.state ;
    searchparams['s_date'] = dateStrings[0] ;
    searchparams['e_date'] = dateStrings[1] ;
    this.setState({
      searchparams: searchparams
    });
  } ;

  search=()=>{
    var {searchparams,currentTab} = this.state ;
    if(currentTab==1){
      this.SaleAccounting.fetch(searchparams) ;
    }else if(currentTab==2){
      this.PurchaseAccounting.fetch(searchparams) ;
    }
  } ;

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
              <span style={{fontSize:'20px',fontWeight:'bold'}}>账单详情</span>
            </div>
            <Row>
              <Col span={6}>
                  <div style={{padding:'10px 0'}}>
                      <RangePicker
                        style={{ width: '100%' }}
                          format={dateFormat}
                          enterButton
                          size="large"
                          onChange={this.changerangeicker}
                      />
                  </div>
              </Col>
              <Col span={2}>
                  <div style={{padding:'10px 0'}}>
                      <Button size='large' onClick={this.search}>筛选</Button>
                  </div>
              </Col>
              <Col span={8}></Col>
              <Col span={6}>
                <div style={{padding:'10px 0'}}>
                  <Input
                    placeholder="搜索企业名称"
                    size="large"
                    onChange={(e)=>this.changeSearchParams('find_str',e.target.value)}
                  />
                </div>
              </Col>
              <Col span={2}>
                <div style={{padding:'10px 0'}}>
                  <Button icon="search" size='large' onClick={this.search}>查询</Button>
                </div>
              </Col>
            </Row>
            <Card  title="" type="card">
              <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                <TabPane tab="销售账单" key="1">
                 <SaleAccounting  ref={(_this) => { this.SaleAccounting = _this; }}></SaleAccounting>
                </TabPane>
                <TabPane tab="采购账单" key="2">
                  <PurchaseAccounting  ref={(_this) => { this.PurchaseAccounting = _this; }}></PurchaseAccounting>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default AccountingList;
