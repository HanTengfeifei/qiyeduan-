import React from 'react';
import { Card, Row, Col, Tabs, Icon,Select,Badge,Modal,Input,Button,DatePicker  } from 'antd';
import {RequireUtils} from 'utils';
import OrderListTableThree from './OrderListTableThree' ;
import ChooseOrderType from './ChooseOrderType' ;
import createHistory from 'history/createHashHistory';
import { Link } from 'dva/router';
import PlanListCard from './PlanListCard' ;
import mystyle from './tabstyle.less' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
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
      addOrderModal:false,
      searchparams:{find_str:"",s_date:"",e_date:""}
    };
    this.callback = this.callback.bind(this);
  }
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
    this.OrderListTableThree.fetch(searchparams) ;
  } ;

  changeSearchParams = (filed,value) => {
    const {searchparams} = this.state ;
    searchparams[filed] = value ;
    this.setState({
      searchparams: searchparams
    });
  };

  myselfonkeydown(e){
    if(e.keyCode == 13){
      this.search();
    }
  }

  render() {
    const {order_status,addOrderModal} = this.state ;
    const dateFormat = 'YYYY-MM-DD';
    return (
      <div onKeyDown={(e)=>this.myselfonkeydown.bind(this)(e)}>
         <Row gutter={8}>
          <Col span={24}>
              <div style={{padding:'25px 15px 15px 15px'}}>
                  <span style={{fontSize:'20px',fontWeight:'bold'}}>订单登记</span>
              </div>
            {/*<Card hoverable title="线下订单" type="card" className={'no-content-card'}>*/}
            {/*</Card>*/}
            <Row>
                <Col span={6}>
                    <div style={{padding:'10px 0'}}>
                        <RangePicker
                            style={{width:'100%',height:'50px'}}
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
            <Card  type="card">
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col span={24} >
                  <div style={{marginBottom:'10px',textAlign:'right'}}>
                      <Button style={{verticalAlign:'bottom'}} onClick={(e)=>assetOp.bind(this)(e,'/offlinecgaddorder/')}>登记采购订单</Button>
                      &nbsp;&nbsp;&nbsp;
                      <Button  style={{verticalAlign:'bottom'}} onClick={(e)=>assetOp.bind(this)(e,'/offlineaddorder')}>登记销售订单</Button>
                    {/*<span onClick={this.addOrderModal.bind(this)}>*/}
                       {/*<Icon type="plus-circle-o" style={{marginRight:'8px'}} />*/}
                        {/*添加线下订单*/}
                    {/*</span>*/}
                  </div>
                </Col>
              </Row>
              <OrderListTableThree  order_status={order_status} ref={(OrderListTableThree)=>this.OrderListTableThree = OrderListTableThree}></OrderListTableThree>
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
