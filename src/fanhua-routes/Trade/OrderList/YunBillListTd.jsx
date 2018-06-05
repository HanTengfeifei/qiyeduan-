import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less' ;
import MyButton from './MyButton' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MyCustomTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.callback = this.callback.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  callback(key) {
    console.log(key);
  }

  render() {
    const {item,order,go}=this.props;
    return (
      <div>
        <div>
          <Row className={'table-first-line'}>
            <div >
              < Col span={18}>
                <div style={{textAlign:'left'}} className={'yundan-title'}>
                  <span style={{marginRight:'5px'}}>订单编号</span>
                  <span style={{marginRight:'20px'}}>{order.order_code}</span>
                  <span style={{marginRight:'5px'}}>所属订单</span>
                  <span style={{marginRight:'20px'}}>{item.deliver_code}</span>
                </div>
              </Col>
              < Col span={6}>
                <div style={{textAlign:'right'}}>
                  <span style={{marginRight:'5px'}}>到站时间</span>
                  <span style={{marginRight:'10px'}}>{item.dispatch_date}</span>
                </div>
              </Col>
            </div>
          </Row>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={3}>
              <div className={'my-custom-center'}>
                {order.goods_name}
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                {item.recv_num}吨
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>待分配&nbsp;{item.recv_num-item.load_num}吨</div>
              <div className={'my-custom-center'}>已运输&nbsp;{item.load_num}吨</div>
              <div className={'my-custom-center'} style={{color:'red'}}>{item.recv_num-item.load_num<0?"订单已修改需重新调度":""}</div>
            </Col>
            <Col span={7} >
              <div className={'my-custom-center'}>{item.addr_name}</div>
              </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>
                {item.car_num}张
              </div>
            </Col>
            <Col span={3}>
            <div className={'my-custom-center'}>
              {item.status_name}
            </div>
          </Col>
          </Row>
        </div>
      </div >
    )
  }
}
export default MyCustomTd;
