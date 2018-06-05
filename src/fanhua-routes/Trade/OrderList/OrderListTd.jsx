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
    const {item,go}=this.props;
    return (
      <div >
        <div>
          <Row className={'table-first-line'}>
            <div >
              < Col span={6}>
                <div style={{whiteSpace:'nowrap'}}>
                  <span style={{marginRight:'5px'}}>订单编号</span>
                  <span style={{marginRight:'20px'}}>{item.order_code}</span>
                </div>
              </Col>
              < Col span={18} >
                <div style={{textAlign:'right'}}>
                  <span style={{marginRight:'5px'}}>{item.saler_or_buyer=="saler"?'客户':'供应商'}</span>
                  <span style={{marginRight:'10px'}}>{item.saler_or_buyer=="saler"?item.buyer_name:item.saler_name}</span>
                  <span style={{marginRight:'5px'}}>{item.saler_or_buyer=="saler"?item.buyer_contact_name:item.saler_contact_name}</span>
                  <span style={{marginRight:'10px'}}>{item.saler_or_buyer=="saler"?item.buyer_contact_mobile:item.saler_contact_mobile}</span>
                </div>
              </Col>
            </div>
          </Row>
          <Row className={'table-other-line'} type="flex" align="middle" style={{cursor:'pointer'}}>
            <Col span={3}>
              <div className={'my-custom-center'} title= {item.goods_name}>
                {item.goods_name}
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>{item.order_source==0?"配送":"自提"}</div>
              <div className={'my-custom-center'} title={item.place}>{item.place}</div>
            </Col>
            <Col span={3} >
              <div className={'my-custom-center'}>
                ￥{item.goods_price?item.goods_price:0}
              </div>
              </Col>
            <Col span={3}>
              <div className={'my-custom-center'} title={item.goods_num}>
                {item.goods_num}吨
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'} title={item.order_sum}>
                ￥{item.order_sum}
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'} title={item.status_name}>
                {item.status_name}
              </div>
            </Col>
            <Col span={4}>
              <MyButton record={item} go={go}></MyButton>
            </Col>
          </Row>
        </div>
      </div >
    )
  }
}
export default MyCustomTd;
