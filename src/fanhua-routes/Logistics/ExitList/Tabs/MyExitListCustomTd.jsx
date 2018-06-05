import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from '../tablestyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MyExitListCustomTd extends React.Component {
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
    const {item}=this.props;

    return (
      <div>
          <div>
            <Row className={'table-first-line'} style={{textAlign:'left'}}>
              <div >
                  < Col span={21}>
                    <div>
                      <span style={{marginRight:'5px'}}>运输单号</span>
                      <span style={{marginRight:'20px'}}>{item.deliver_code}</span>
                      <span style={{marginRight:'5px'}}>所属订单</span>
                      <span style={{marginRight:'20px'}}>{item.order_code}</span>
                      <span style={{marginRight:'5px'}}>出车单号</span>
                      <span style={{marginRight:'10px'}}>{item.car_code}</span>
                    </div>
                  </Col>
                  < Col span={3}>
                    <div style={{textAlign:'right'}}>
                      <div style={{textAlign:'right'}}><span>{item.deliver_date}</span></div>
                    </div>
                  </Col>
                </div>
             </Row>
             <Row className={'table-other-line'} type="flex" align="middle"  style={{cursor:'pointer'}}>
               <Col span={2} style={{textAlign:'center'}}>{item.goods_name}</Col>
               <Col span={2} style={{textAlign:'center'}}>{item.load_num}&nbsp;吨</Col>
               <Col span={6}>
                 {/*<div style={{textAlign:'center'}}>派单联系人</div>*/}
                 <div style={{textAlign:'center'}}><span style={{marginRight:'10px'}}>{item.singles}</span><span>{item.singles_mobile}</span></div>
               </Col>
               <Col span={6}>
                 <div style={{textAlign:'center'}}>{item.fh_addr_name  }</div>
                 <div style={{textAlign:'center'}}>
                   <span style={{marginRight:'10px'}}>{item.fh_addr_contact}</span>
                   <span>{item.jh_addr_contact_mobile}</span>
                 </div>
               </Col>
               <Col span={6}>
                 <div style={{textAlign:'center'}}>{item.jh_addr_name}</div>
                 <div style={{textAlign:'center'}}>
                   <span style={{marginRight:'10px'}}>{item.jh_addr_contact}</span>
                   <span>{item.jh_addr_contact_mobile}</span>
                 </div>
               </Col>
               <Col span={2} style={{textAlign:'center'}}>{item.car_status_name}</Col>
             </Row>
          </div>
      </div >
    )
  }
}
export default MyExitListCustomTd;
