import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import './mystep.less' ;
import mystyle from './tabstyle.less' ;
import MyDetailButton from './MyDetailButton' ;
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class BasicMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  getbasicstatus(status,saler_or_buyer,order_source){
    var str = "" ;
    if(status==0||status){
      var my_status = Number(status) ;
      if(saler_or_buyer=="saler"){
        switch(my_status)
        {
          case -1:
            str = "请及时确认订单" ;
          break;
          case 0:
            str = "请及时确认订单" ;
          break;
          case 1:
            str = "订单已确认，等待对方付款" ;
            break;
          case 2:
            if(order_source==0){ //配送
              str = "订单已支付，请及时调度车辆" ;
            }
            if(order_source==1){ //自提
              str = "订单已支付，等待对方调度车辆" ;
            }
            break;
          case 3:
            str = "车辆调度已完成，订单运输中" ;
          break;
          case 4:
          str = "订单已运输完成，请确认结算信息" ;
          break;
          case 5:
            str = "订单已完结，请评价" ;
            break;
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
            str = "对方已修改订单，请确认" ;
            break;
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
            str = "已提交修改请求，等待对方确认" ;
            break;
          case 32:
          case 33:
            str = "对方请求取消订单，请确认" ;
            break;
          case 42:
          case 43:
            str = "已提交取消订单申请，等待对方确认" ;
            break ;
          case 54:
          str = "对方已确认结算，请确认结算信息" ;
          break;
          case 64:
            str = "已确认结算。等待对方确认结算信息" ;
            break;
          case 74:
            str = "对方已修改结算，请确认结算信息" ;
            break;
          case 84:
            str = "已修改结算，待对方确认" ; //已修改结算，等待对方确认结算信息
            break;
          case 92:
          case 93:
            if(order_source==0){ //配送
              str = "订单已修改，请重新调度车辆" ;
            }
            if(order_source==1){ //自提
              str = "订单已修改，等待对方重新调度车辆" ;
            }
            break;
          default:
            break ;
        }
      }else{ //买家
        switch(my_status)
        {
          case 0:
            str = "订单已添加，等待对方确认" ;
            break;
          case 1:
            str = "订单已确认，请及时完成支付" ;
            break;
          case 2:
            if(order_source==0){ //配送
              str = "订单已支付，等待对方调度车辆" ;
            }
            if(order_source==1){ //配送
              str = "订单已支付，请及时调度车辆" ;
            }
            break;
          case 3:
            str = "车辆调度已完成，订单运输中" ;
            break;
          case 4:
          str = "订单已运输完成，请确认结算信息" ;
          break;
          case 5:
            str = "订单已完结，请评价" ;
            break;
          case 5:
            str = "订单已完结，请评价" ;
            break;
          case 11:
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
            str = "已提交修改请求，等待对方确认" ;
            break;
          case 21:
          case 22:
          case 23:
          case 24:
          case 25:
          case 26:
          case 27:
          case 28:
          case 29:
            str = "对方已修改订单，请确认" ;
            break;
          case 32:
          case 33:
            str = "已提交取消订单申请，等待对方确认" ;
            break;
          case 42:
          case 43:
            str = "对方请求取消订单，请确认" ;
            break;
          case 54:
            str = "已确认结算。等待对方确认结算信息" ;
            break;
          case 64:
            str = "对方已确认结算，请确认结算信息" ;
            break;
          case 74:
            str = "已修改结算。等待对方确认结算信息" ;
            break;
          case 84:
            str = "对方已修改结算，请确认" ;
            break;
          case 92:
          case 93:
            if(order_source==0){ //配送
              str = "订单已修改，等待对方重新调度车辆" ;
            }
            if(order_source==1){
              str = "订单已修改，请重新调度车辆" ;
            }
            break;
          default:
            break ;
        }
      }
    }
    return str ;
  }

  getmycustomerstatus(order_status){
    if(order_status==0||order_status){
      return Number(order_status)%10 ;
    }else {
      return "" ;
    }
  }
  render() {
    const {order,_pmyself,go} = this.props ;
    const {order_status,saler_or_buyer,order_source} = order ;
    const my_status = this.getmycustomerstatus(order_status) ;
    const detailstatus = this.getbasicstatus(order_status,saler_or_buyer,order_source) ;
    return (
      <div >
        <div  style={{padding:'15px 20px',background: '#FAFAFA',boxShadow: '0 1px 1px 0 rgba(187,187,187,0.50)'}}>
          <Row>
            <Col span={18}>
              <div style={{color: '#898F97'}}>
                订单编号：{order.order_code}
              </div>
            </Col>
            <Col span={6}>
              <div style={{color: '#898F97',textAlign:'right'}}>
                下单时间：{order.order_date}
              </div>
            </Col>
          </Row>
        </div>

        <Row>
          <Col span={24}>
            <div>
              <div className="progress" style={{height:'100px'}}>
                <div className="progress_inner" style={{height:'100px'}}>
                  <div className={my_status>=0?"progress_inner__step active":"progress_inner__step no-active"}>
                    <label htmlFor="step-1">待确认</label>
                  </div>
                  <div className={my_status>=1?"progress_inner__step active":"progress_inner__step no-active"}>
                    <label htmlFor="step-2">待支付</label>
                  </div>
                  <div className={my_status>=2?"progress_inner__step active":"progress_inner__step no-active"}>
                    <label htmlFor="step-3">待调度</label>
                  </div>
                  <div className={my_status>=3?"progress_inner__step active":"progress_inner__step no-active"}>
                    <label htmlFor="step-4">待收货</label>
                  </div>
                  <div className={my_status>=4?"progress_inner__step active":"progress_inner__step no-active"}>
                    <label htmlFor="step-5">待结算</label>
                  </div>
                  <div className={my_status>=5?"progress_inner__step active":"progress_inner__step no-active"}>
                    <label htmlFor="step-6">已完结</label>
                  </div>
                  <input  id="step-1" readOnly  type="radio" checked={my_status==0?true:false} />
                  <input id="step-2" readOnly type="radio" checked={my_status==1?true:false}/>
                  <input id="step-3" readOnly type="radio" checked={my_status==2?true:false}/>
                  <input id="step-4" readOnly type="radio" checked={my_status==3?true:false}/>
                  <input id="step-5" readOnly type="radio" checked={my_status==4?true:false}/>
                  <input id="step-6" readOnly type="radio" checked={my_status==5?true:false}/>

                  <div className="progress_inner__bar"></div>
                  <div className="progress_inner__bar--set"></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row >
          <div style={{borderBottom: '1px solid rgb(239, 234, 234)',width:'98%',marginLeft:'1%',marginTop:'20px'}}>
          </div>
        </Row>
        <Row gutter={8} style={{ padding:'20px 0 10px 0',paddingLeft:'2%'}}>
          <Col span={8}>
            <div>
              <span style={{fontSize:'16px',marginRight:'10px'}}>订单状态：{order.status_name}</span>
            </div>
            <div style={{color:'#898F97',fontSize:'14px',padding:'5px 0'}}>
              {detailstatus}
            </div>
          </Col>
          <Col>
            <div>
              <span style={{float:'right',marginRight:'5px'}}>
                <MyDetailButton order={order} _pmyself={_pmyself} go={go}></MyDetailButton>
              </span>
            </div>
          </Col>
        </Row>

      </div >
    )
  }
}
export default BasicMessage;
