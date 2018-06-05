import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from '../tabstyle.less' ;
import MyDetailButtonTwo from './MyDetailButtonTwo' ;
import {RequireUtils} from 'utils';
import './mystep.less' ;
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

  render() {
    const {order,_pmyself,go} = this.props ;
    const my_status = order.order_status ;
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
              <div style={{padding:'15px 0',textAlign:'center'}}>
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
          <div style={{border: '1px solid rgb(239, 234, 234)',width:'98%',marginLeft:'1%',marginTop:'20px'}}>
          </div>
        </Row>
        <Row>
          <Col span={24}>
            <Row style={{padding:'20px 0 10px 0',paddingLeft:'2%'}}>
              <Col span={8}>
                <span style={{fontSize:'16px',marginRight:'10px'}}>订单状态：{order.status_name}</span>
              </Col>
              <Col>
                <div style={{textAlign:'right',marginRight:'2%'}}>
                  <MyDetailButtonTwo order={order} _pmyself={_pmyself} go={go}></MyDetailButtonTwo>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </div >
    )
  }
}
export default BasicMessage;
