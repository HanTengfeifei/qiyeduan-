import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Modal,Divider  } from 'antd';
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class OrderListYundanTd extends React.Component {
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


  offlineExpand(){
    var {pyundan} = this.props ;
    var oldex = pyundan.state.tableExpand ;
    pyundan.setState({
      tableExpand:!oldex
    })
  }

  deleteYun(mykey,pthis){
    const {yundans} = pthis.state ;
    const remainyundans = yundans.filter(function (item,index) {
       if(index!=mykey) {
         return item ;
       }
    }) ;
    pthis.setState({
      yundans:remainyundans
    })
  }

  callback(key) {
    console.log(key);
  }
  render() {
    const {item,tableExpand,go,mykey,pthis}=this.props;
    const exname = tableExpand?'expand-mark table-expand':'expand-mark table-not-expand' ;
    return (
      <div>
        <div >
          <Row className={'table-first-line'}>
            <div >
              < Col span={24}>
                <div style={{textAlign:'left'}}>
                  <span style={{marginRight:'5px'}}>运单</span>
                </div>
              </Col>
            </div>
          </Row>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={1}>
              <div className={'my-custom-center'} onClick={this.offlineExpand.bind(this)}>
                <i className={exname}></i>
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>
                <span>{item.goods_name}</span>
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>总量</span>
                <span>{item.total}吨</span>
              </div>
            </Col>
            <Col span={8} >
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>卸货地址</span>
                <span>{item.recv_place}</span>
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                <span>{item.yundannum}张</span>
              </div>
            </Col>
            <Col span={2}>
              <div className={'my-custom-center'}>
                <Icon type="environment-o" />地图
              </div >
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                <span  onClick={()=>this.deleteYun.bind(this)(mykey,pthis)}>
                   <Icon type="delete" />删除
                </span>
              </div >
            </Col>
          </Row>
        </div>
      </div >
    )
  }
}
export default OrderListYundanTd;
