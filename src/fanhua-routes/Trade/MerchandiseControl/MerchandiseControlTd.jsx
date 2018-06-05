import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,message } from 'antd';
import mystyle from '../OrderList/tabstyle.less' ;
import { Link } from 'dva/router';
import {RequireUtils} from 'utils';
import './MerchandiseControlTd.less';
import createHistory from 'history/createHashHistory';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MerchandiseControlTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status:true,
    };
    this.callback = this.callback.bind(this);
    this.onChange= this.onChange.bind(this);
    this.skit= this.skit.bind(this);
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
  skit(){
    createHistory().push({
      pathname: '/EditMerchandiseControl/?id='+this.props.item.id,
    })
  }
onChange(){
  RequireUtils.baseRequire('goods/goods-change-status',{id:this.props.item.id,status:this.props.item.status},function (data){
    if(data.code==1) {
this.props. FindProductionAll();
message.success(data.msg);
    }
    else{
      message.error(data.msg);
    }
  }.bind(this));
}
  render() {
    const {item,text}=this.props;
    return (
      <div style={{fontSize:14}}>
        <div>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={3}>
              <div className={'my-customer-table-title'}>{item.goods_name}</div>
            </Col>
            {/*<Col span={3}   style={{fontSize:8}}>*/}
              {/*<p>气源类型:{item.type_name}</p>*/}
              {/*<p>气化率:{item.gas_value}</p>*/}
              {/*<p>温度:{item.temp_name}</p>*/}
              {/*<p>低位热值:{item.hot_value}</p>*/}
              {/*<p>气质报告更新时间:{item.report_date}</p>*/}
            {/*</Col>*/}
            {/*<Col span={0.8}>*/}
            {/*</Col>*/}
            <Col span={6} >
              <p className={'my-customer-table-title'}>地点:{item.addr_province+item.addr_city+item.addr_county}</p>
              <p className={'my-customer-table-title'}>{item.addr_detail}</p>
              <p className={'my-customer-table-title'}>提货方式:{item.deliver_type==0? "配送":"自提"}</p>
            </Col>
            {/*<Col span={1}>*/}
            {/*</Col>*/}
            <Col span={3}>
              <div className={'my-customer-table-title'}>{item.goods_stock}</div>
            </Col>
            <Col span={3}>
              <div className={'my-customer-table-title'}>{item.price}</div>
            </Col>
            <Col span={4}>
              <div className={'my-customer-table-title'}>
                {item.status==0? "上架":"下架"}</div>
            </Col>
            <Col span={5}>
              <div style={{marginBottom:'3px'}} className={'my-customer-table-title'}>
                {item.status==0 ? <span  style={{ cursor:"pointer"
                  }} onClick={this.onChange}><Icon type="down-circle-o" style={{marginRight:'5px'}}/>下架</span>
                :<span onClick={this.onChange} style={{ cursor:"pointer"
                  }}><Icon type="down-circle-o" style={{marginRight:'5px'}}/>上架</span>}
              </div>
              <div className={'my-customer-table-title'} style={{ cursor:"pointer"
              }} onClick={this.skit}>
                <span><Icon type="edit" style={{marginRight:'5px'}}/>编辑</span>
              </div>
            </Col>
          </Row>
        </div>
      </div >
    )
  }
}
export default MerchandiseControlTd;
