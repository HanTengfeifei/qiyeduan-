import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal } from 'antd';
import mystyle from '../tabstyle.less' ;
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
const TabPane = Tabs.TabPane;
const Option = Select.Option;


function assetOp(e,id) {
  createHistory().push({
    pathname: '/orderlistdetailtwo/?orderid='+id
  })
}

function firstComfirm(title,content,callback) {
  Modal.confirm({
    title:title,
    content: content,
    onOk() {
      callback() ;
    },
    onCancel() {
      console.log('Cancel');
    },
  });
}

function cancelOrderOp(e,id,go) {
  e.stopPropagation();
  e.preventDefault();
  var context = this;
  function callback(){
    RequireUtils.baseRequire('/order/submit-cancel',{id:id},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go();
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要取消该订单吗？','',callback)
}
function comfirmOrderOp(e,id,go) {
  e.stopPropagation();
  e.preventDefault();
  function callback(){
    RequireUtils.baseRequire('/order/confirm-order',{id:id},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go();
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要确认该订单吗？','',callback)
}

function comfirmAccount(order_id,go){
  const {pthis} = this.props ;
  var callback = function (){
    RequireUtils.baseRequire("/unilateral-finish/confirm-finish",{order_id:order_id},function (data) {
      if (data.code)
      {
        go();
        alert(data.msg);
        this.setState({
          loading:false,
        }) ;
      }else{
        alert(data.msg);
        this.setState({
          loading:false
        }) ;
      }
    }.bind(this));
  } ;

  firstComfirm('您确定要结算该订单吗？','',callback) ;

}

function getSaleButton(record,go) {
  var order_status=Number(record.order_status);
  var saler_or_buyer = record.saler_or_buyer ;
  var str = '' ;
  const cancelOrder =  <div className={'my-custom-center'}>
    <Button onClick={(e)=>cancelOrderOp.bind(this)(e,record.id,go)}>取消订单</Button>
  </div> ;
  const confirmOrder = <div className={'my-custom-center'} style={{marginBottom:'3px'}}>
    <Button type="primary" onClick={(e)=>comfirmOrderOp.bind(this)(e,record.id,go)}>确认订单</Button>
  </div> ;
  const alertPayment =  <div className={'my-custom-center'} style={{marginBottom:'3px'}}>
    <Button type="primary">提醒付款</Button>
  </div> ;
  const lookYunbill =  <div className={'my-custom-center'} style={{marginBottom:'3px'}}>
    <Button type="primary" onClick={(e)=>assetOp.bind(this)(e,record.id)}>查看运单</Button>
  </div> ;
  const updateOrder = <div className={'my-custom-center'}>
    <Button type="primary">修改订单</Button>
  </div> ;
  const confirmSum =  <div className={'my-custom-center'}>
    <Button type="primary" onClick={()=>comfirmAccount.bind(this)(record.id,go)} >确认结算</Button>
  </div> ;
  const assess =  <div className={'my-custom-center'}  onClick={(e)=>assetOp.bind(this)(e,record.id)}>
    <Button type="primary">评价</Button>
  </div> ;
  const payment = <div style={{marginBottom:'3px'}} className={'my-custom-center'}>
    <Button type="primary">&nbsp;&nbsp;付&nbsp;&nbsp;款&nbsp;&nbsp;&nbsp;</Button>
  </div>

    switch(order_status)
    {
      case 1:
        str = <div>
          {cancelOrder}
        </div>
        break;
      case 2:
      case 3:
        str = <div>
          {lookYunbill}
          {cancelOrder}
        </div>
        break;
      case 4:
        str = <div>
          {confirmSum}
        </div>
        break;
      case 5:
        str = <div>
          {assess}
        </div>
        break;

      default:
        break ;
    }

  return str ;
}

class MyButton extends React.Component {
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
    const {record,go} = this.props ;
    const mybuttons =  getSaleButton.bind(this)(record,go) ;
    return (
      mybuttons
    )
  }
}
export default MyButton;
