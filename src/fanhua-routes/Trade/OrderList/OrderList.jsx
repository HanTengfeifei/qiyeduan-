import React from 'react';
import { Card, Row, Col, Tabs, Icon,Select,Badge,Modal,Input,DatePicker,Button   } from 'antd';
import {RequireUtils,config} from 'utils';
import OrderListTable from './OrderListTable' ;
import ChooseOrderType from './ChooseOrderType' ;
import createHistory from 'history/createHashHistory';
import { Link } from 'dva/router';
import PlanListCard from './PlanListCard' ;
import mystyle from './tabstyle.less' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const Search = Input.Search;
const { MonthPicker, RangePicker } = DatePicker;
function assetOp(e,url) {
    createHistory().push({
        pathname: url
    })
}
class OrderList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order_status:"",
      kind:"",
      dstatusdnum:{},
      addOrderModal:false,
      searchparams:{find_str:"",s_date:"",e_date:""}
    };
    this.callback = this.callback.bind(this);
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
    this.refs['OrderListTable'].fetch(searchparams) ;
  } ;

  callback(key) {
    console.log(key);
  }

  addOrderModal(){
    this.setState({
      addOrderModal:true
    })
  }

  cancelOrderMark(){
    this.setState({
      addOrderModal:false
    })
  }

  showTableByType(type){
    this.setState({
      order_status:type
    })
  }

  componentDidMount(){
    RequireUtils.baseRequire('order/order-num',{kind:1},function (data){
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
    const {order_status,addOrderModal,dstatusdnum} = this.state ;
    const dateFormat = 'YYYY-MM-DD';
    return (
      <div onKeyDown={(e)=>this.myselfonkeydown.bind(this)(e)}>
         <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24}>
            <Row>
              <div style={{padding:'15px'}}>
                <span style={{fontSize:'20px',fontWeight:'bold'}}>线上订单</span>
              </div>
            </Row>
            <Row>
                <Col span={6}>
                    <div style={{padding:'10px 0'}}>
                        <RangePicker
                            style={{width:'100%',height:'50px'}}
                            format={dateFormat}
                            enterButton
                            size={'large'}
                            onChange={this.changerangeicker}
                        />
                    </div>
                </Col>
                <Col span={2}>
                    <div style={{padding:'10px 0'}}>
                        <Button size='large' onClick={this.search}>筛选</Button>
                    </div>
                </Col>
                <Col span={7}></Col>
              <Col span={7}>
                <div style={{padding:'10px 0'}}>
                  <Input
                    placeholder="搜索企业名称、商品、下单方式"
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
            <Row gutter={8} style={{ marginTop: '10px',marginBottom:'10px' }} type="flex" justify='space-between' className={'my-customer-car'}>
              <Col span={3} style={{cursor:'pointer'}} >
                <Card hoverable bordered={false} onClick={()=>this.showTableByType('')} >
                  <div className="custom-image" >
                       <Badge count={0}>
                         {
                           this.state.order_status===''?
                             <img src={config.qB2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                           :<img src={config.qB1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                         }
                       </Badge>
                       <p style={{textAlign:'center',margin:'0'}}>全部</p>
                  </div>
                </Card>
              </Col>
              <Col span={3} style={{cursor:'pointer'}} >
                <Card hoverable bordered={false} onClick={()=>this.showTableByType('0')}>
                  <div className="custom-image">
                    <Badge count={dstatusdnum.daiquren?dstatusdnum.daiquren:0}>
                      {
                        this.state.order_status==='0'?
                          <img src={config.dqr2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                          :<img src={config.dqr1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                      }
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>待确认</p>
                  </div>
                </Card>
              </Col>
              <Col span={3} style={{cursor:'pointer'}}>
                <Card  hoverable bordered={false} onClick={()=>this.showTableByType('1')}>
                  <div className="custom-image">
                    <Badge count={dstatusdnum.daifukkuan?dstatusdnum.daifukkuan:0}>
                      {/*<Icon type="alipay-circle"  style={{fontSize:'40px',marginBottom:'10px',color:'#1890ff'}}/>*/}
                      {
                        this.state.order_status==='1'?
                          <img src={config.dfk2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                          :<img src={config.dfk1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                      }
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>待付款</p>
                  </div>
                </Card>
              </Col>
              <Col span={3} style={{cursor:'pointer'}} >
                <Card hoverable  bordered={false} onClick={()=>this.showTableByType('2')}>
                  <div className="custom-image">
                    <Badge count={dstatusdnum.daidiaodu?dstatusdnum.daidiaodu:0}>
                      {/*<Icon type="schedule" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                      {
                        this.state.order_status==='2'?
                          <img src={config.ddd2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                          :<img src={config.ddd1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                      }
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>待调度</p>
                  </div>
                </Card>
              </Col>
              <Col span={3}  style={{cursor:'pointer'}}>
                <Card  hoverable bordered={false} onClick={()=>this.showTableByType('3')}>
                  <div className="custom-image">
                    <Badge count={dstatusdnum.daishouhuo?dstatusdnum.daishouhuo:0}>
                      {/*<Icon type="menu-fold" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                      {
                        this.state.order_status==='3'?
                          <img src={config.dsh2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                          :<img src={config.dsh1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                      }
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>待收货</p>
                  </div>
                </Card>
              </Col>
              <Col span={3} style={{cursor:'pointer'}}>
                <Card hoverable  bordered={false} onClick={()=>this.showTableByType('4')}>
                  <div className="custom-image">
                    <Badge count={dstatusdnum.daijiesuan?dstatusdnum.daijiesuan:0}>
                      {/*<Icon type="pay-circle" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                      {
                      this.state.order_status==='4'?
                        <img src={config.djs2} style={{height:'40px',marginBottom:'10px'}} alt=""/>
                        :<img src={config.djs1} style={{height:'40px',marginBottom:'10px'}}  alt=""/>

                    }
                    </Badge>
                    <p style={{textAlign:'center',margin:'0'}}>待结算</p>
                  </div>
                </Card>
              </Col>
              <Col span={3} style={{cursor:'pointer'}}>
                <Card hoverable bordered={false} onClick={()=>this.showTableByType('5')}>
                  <div className="custom-image">
                    <Badge count={0}>
                      {/*<Icon type="check-circle-o" style={{fontSize:'40px',marginBottom:'10px'}}/>*/}
                      {
                        this.state.order_status==='5'?
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
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col span={24} >
                  <div style={{marginBottom:'10px',textAlign:'right'}}>
                      <Button  style={{verticalAlign:'bottom'}} onClick={(e)=>assetOp.bind(this)(e,'/AddOrderAll')}>下单</Button>
                  </div>
                </Col>
              </Row>
              <OrderListTable order_status={order_status} ref={"OrderListTable"}></OrderListTable>
            </Card>
          </Col>
        </Row>
        <Modal title="添加订单"
               visible={addOrderModal}
               onOk={this.handleOk}
               onCancel={this.cancelOrderMark.bind(this)}
               footer={null}>
          <ChooseOrderType ref={'ChooseOrderType'} cancelOrderMark={this.cancelOrderMark.bind(this)} ></ChooseOrderType>
        </Modal>
      </div>
    )
  }
}

export default OrderList;
