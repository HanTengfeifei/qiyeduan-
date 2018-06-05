import React from 'react';
import { Card, Row, Col, Tabs, Icon,Select,Badge,Input,DatePicker,Button } from 'antd';
import {RequireUtils,config} from 'utils';
import MyTable from './MyTable' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { MonthPicker, RangePicker } = DatePicker;

class WayBillList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        yd_status:"",
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
      yd_status:type
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
    var {searchparams} = this.state ;
    this.refs['MyTable'].fetch(searchparams) ;
  } ;

  componentDidMount(){
    RequireUtils.baseRequire('order/order-deliver-num',{},function (data){
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

  myselfonkeydown(e){
    if(e.keyCode == 13){
      this.search();
    }
  }

  render() {
    const {yd_status,dstatusdnum} = this.state ;
    const dateFormat = 'YYYY-MM-DD';
    return (
      <div onKeyDown={(e)=>this.myselfonkeydown.bind(this)(e)}>
        <Row style={{ marginTop: '10px' }}>
          <div style={{padding:'15px'}}>
            <span style={{fontSize:'20px',fontWeight:'bold'}}>运单管理</span>
          </div>
        </Row>
        <Row>
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
                  <Button size='large' onClick={this.search}>筛选</Button>
              </div>
          </Col>
          <Col span={8}></Col>
          <Col span={6}>
            <div style={{padding:'10px 0'}}>
              <Input
                placeholder="搜索企业名称、场站名称"
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
          <Col span={6}  style={{cursor:'pointer'}}>
            <Card bordered={false} onClick={()=>this.showTableByType('')}>
              <div className="custom-image" >
                <Badge count={0}>
                  {/*<Icon type="appstore" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                  {
                    this.state.yd_status===''?
                      <img src={config.qB2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                      :<img src={config.qB1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                  }
                </Badge>
                <p style={{textAlign:'center',margin:'0'}}>全部</p>
              </div>
            </Card>
          </Col>
          <Col span={6} style={{cursor:'pointer'}} >
            <Card bordered={false} onClick={()=>this.showTableByType('0')}>
              <div className="custom-image">
                <Badge count={dstatusdnum.daidiaodu?dstatusdnum.daidiaodu:0}>
                  {/*<Icon type="clock-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                  {
                    this.state.yd_status==='0'?
                      <img src={config.ddd2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                      :<img src={config.ddd1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                  }
                </Badge>
                <p style={{textAlign:'center',margin:'0'}}>待调度</p>
              </div>
            </Card>
          </Col>
          <Col span={6}  style={{cursor:'pointer'}}>
            <Card bordered={false} onClick={()=>this.showTableByType('1')}>
              <div className="custom-image">
                <Badge count={dstatusdnum.yidiaodu?dstatusdnum.yidiaodu:0}>
                  {/*<Icon type="alipay-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                  {
                    this.state.yd_status==='1'?
                      <img src={config.ysz2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                      :<img src={config.ysz1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                  }
                </Badge>
                <p style={{textAlign:'center',margin:'0'}}>运输中</p>
              </div>
            </Card>
          </Col>
          <Col span={6} style={{cursor:'pointer'}} >
            <Card bordered={false} onClick={()=>this.showTableByType('2')}>
              <div className="custom-image">
                <Badge count={0}>
                  {/*<Icon type="schedule" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                  {
                    this.state.yd_status==='2'?
                      <img src={config.wj2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                      :<img src={config.wj1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                  }
                </Badge>
                <p style={{textAlign:'center',margin:'0'}}>完结</p>
              </div>
            </Card>
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Card  title="" type="card">
              <MyTable yd_status={yd_status} ref={'MyTable'}></MyTable>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default WayBillList;
