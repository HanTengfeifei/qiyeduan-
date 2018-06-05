import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch ,Input} from 'antd';
import SaleBusinessStatistics from './Tabs/SaleBusinessStatistics' ;
import PurchaseBusinessStatistics from './Tabs/PurchaseBusinessStatistics' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class BusinessStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchparams:{find_str:''},
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
    var {searchparams,currentTab} = this.state ;
    if(currentTab==1){
      this.SaleBusinessStatistics.fetch(searchparams) ;
    }else if(currentTab==2){
      this.PurchaseBusinessStatistics.fetch(searchparams) ;
    }
  } ;

  myselfonkeydown(e){
    if(e.keyCode == 13){
      this.search();
    }
  }

  render() {
    return (
      <div onKeyDown={(e)=>this.myselfonkeydown.bind(this)(e)}>
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <div style={{padding:'15px'}}>
              <span style={{fontSize:'20px',fontWeight:'bold'}}>业务统计</span>
            </div>
            <Row>
              <Col span={16}></Col>
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
                <TabPane tab="销售业务统计" key="1">
                 <SaleBusinessStatistics  ref={(_this) => { this.SaleBusinessStatistics = _this; }}></SaleBusinessStatistics>
                </TabPane>
                <TabPane tab="采购业务统计" key="2">
                  <PurchaseBusinessStatistics ref={(_this) => { this.PurchaseBusinessStatistics = _this; }}></PurchaseBusinessStatistics>
                </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default BusinessStatistics;
