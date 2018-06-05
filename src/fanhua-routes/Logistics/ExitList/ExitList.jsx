import React from 'react';
import { Card, Row, Col, Tabs, Icon,Badge,Link,Input,DatePicker,Button } from 'antd';
import {RequireUtils,config} from 'utils';
import MyExitListTable from './Tabs/MyExitListTable';
const { MonthPicker, RangePicker } = DatePicker;
const TabPane = Tabs.TabPane;

class CompanyInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cc_status:"",
      dstatusdnum:{},
      searchparams:{find_str:"",s_date:'',e_date:''}
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  showTableByType(type){
    this.setState({
      cc_status:type
    })
  }

  componentDidMount(){
    RequireUtils.baseRequire('order/car-num',{},function (data){
      if(data.code==1) {
        this.setState({
          dstatusdnum:data.data.list
        })
      }
      else{
        this.setState({
          dstatusdnum:{}
        })
      }
    }.bind(this));
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
    var {searchparams} = this.state ;
    this.refs['MyExitListTable'].fetch(searchparams) ;
  };

  myselfonkeydown(e){
    if(e.keyCode == 13){
      this.search();
    }
  }

  render() {
    const {cc_status,dstatusdnum} = this.state ;
    const dateFormat = 'YYYY-MM-DD';
    return (
      <div onKeyDown={(e)=>this.myselfonkeydown.bind(this)(e)}>
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Row>
              <div style={{padding:'15px'}}>
                <span style={{fontSize:'20px',fontWeight:'bold'}}>出车单管理</span>
              </div>
            </Row>
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
                    placeholder="请搜索企业名称、场站名称"
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
            <Row gutter={8} style={{ marginTop: '10px',marginBottom:'10px' }} type="flex" justify='space-between' className={'my-wl-yd-customer-car'}>
              <Col span={5}  style={{cursor:'pointer'}} >
                <Card hoverable bordered={false} onClick={()=>this.showTableByType('')}>
                  <div className="custom-image" >
                    <Badge count={0}>
                      {/*<Icon type="appstore" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                      {/*<img src={config.order}  alt=""/>*/}
                      {
                        this.state.cc_status===''?
                          <img src={config.qB2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                          :<img src={config.qB1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                      }
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>全部</p>
                  </div>
                </Card>
              </Col>
              <Col span={5} style={{cursor:'pointer'}} >
                <Card bordered={false} onClick={()=>this.showTableByType('1')}>
                  <div className="custom-image">
                    <Badge count={dstatusdnum.daijiedan?dstatusdnum.daijiedan:0}>
                      {/*<Icon type="clock-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                      {
                        this.state.cc_status==='1'?
                          <img src={config.djd2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                          :<img src={config.djd1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                      }
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>待接单</p>
                  </div>
                </Card>
              </Col>
              <Col span={5}  style={{cursor:'pointer'}}>
                <Card bordered={false} onClick={()=>this.showTableByType('2')}>
                  <div className="custom-image">
                    <Badge count={dstatusdnum.daichufa?dstatusdnum.daichufa:0}>
                      {/*<Icon type="alipay-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                      {
                        this.state.cc_status==='2'?
                          <img src={config.dcf2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                          :<img src={config.dcf1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                      }
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>待出发</p>
                  </div>
                </Card>
              </Col>
              <Col span={5} style={{cursor:'pointer'}} >
                <Card bordered={false} onClick={()=>this.showTableByType('3')}>
                  <div className="custom-image">
                    <Badge count={dstatusdnum.yunshuzhong?dstatusdnum.yunshuzhong:0}>
                      {/*<Icon type="schedule" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                      {
                        this.state.cc_status==='3'?
                          <img src={config.ysz2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                          :<img src={config.ysz1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                      }
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>运输中</p>
                  </div>
                </Card>
              </Col>
              <Col span={5} style={{cursor:'pointer'}} >
                <Card bordered={false}  onClick={()=>this.showTableByType('4')}>
                  <div className="custom-image">
                    <Badge count={0}>
                      {/*<Icon type="schedule" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                      {
                        this.state.cc_status==='4'?
                          <img src={config.wj2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                          :<img src={config.wj1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                      }
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>完结</p>
                  </div>
                </Card>
              </Col>
            </Row>

            <Card  type="card">
              <div>
                <MyExitListTable cc_status={cc_status} ref={"MyExitListTable"}></MyExitListTable>
              </div>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default CompanyInformation;

