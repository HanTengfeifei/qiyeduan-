import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal } from 'antd';
import mystyle from '../tabstyle.less' ;
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
import {message} from "antd/lib/index";
const TabPane = Tabs.TabPane;
const Option = Select.Option;


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

function cancelOrderOp(e,id,_pmyself,go) {
  e.stopPropagation();
  e.preventDefault();
  function callback(){
    RequireUtils.baseRequire('unilateral-order/confirm-cancel',{id:id},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go.bind(_pmyself)() ;
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要取消该订单吗？','',callback)
}

function comfirmUpdateOrderOp(e,id,_pmyself,go) {
  e.stopPropagation();
  e.preventDefault();
  function callback(){
    RequireUtils.baseRequire('/unilateral-order/confirm-modify',{id:id},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go.bind(_pmyself)() ;
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要修改该订单吗？','',callback)
}

function comfirmOrderOp(e,id,_pmyself,go) {
  e.stopPropagation();
  e.preventDefault();
  function callback(){
    RequireUtils.baseRequire('/order/confirm-order',{id:id},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go.bind(_pmyself)()
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要确认该订单吗？','',callback)
}


/**
 * 放弃修改
 */
function giveUpUpdateOrderOp(e,id,_pmyself,go) {
  e.stopPropagation();
  e.preventDefault();
  function callback(){
    RequireUtils.baseRequire('/order/refuse-modify',{id:id},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go.bind(_pmyself)() ;
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要放弃修改该订单吗？','',callback)
}
function paymentOp(e,id,_pmyself,go) {
  e.stopPropagation();
  e.preventDefault();
  function callback(){
    RequireUtils.baseRequire('/order/pay',{id:id},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go.bind(_pmyself)() ;
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要支付该订单吗？','',callback)
}


function giveUpCancelOp(e,id,_pmyself,go) {
  e.stopPropagation();
  e.preventDefault();
  function callback(){
    RequireUtils.baseRequire('/order/refuse-cancel',{id:id},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go.bind(_pmyself)() ;
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要取消该订单吗？','',callback)
}

function comfirmUpdateOp(e,id,_pmyself) {
    this.setState({
      myFlag:true
    });
    var data = _pmyself.state.address ;
    var ndata = data.map(function (item) {
      item.editable = true ;
      return item ;
    });
  _pmyself.setState({
    address:ndata
  })
}

function updateOrderConfirmOp(e,id,_pmyself,go) {
  var _this = this ;
  e.stopPropagation();
  e.preventDefault();
  var mydata = _pmyself.state.address ;
  var deles =  _pmyself.state.deleteaddress ;
  var new_target = mydata.map(function (item) {
    return {target_id:item.id,recv_sum:item.recv_sum}
  }) ;

  var my_delete = deles.map(function (item) {
    return {target_id:item.id,recv_sum:item.recv_sum}
  }) ;

  var need_sumbmit = new_target.concat(my_delete) ;
  function callback(){
    RequireUtils.baseRequire('unilateral-order/confirm-modify',{id:id,new_target:JSON.stringify(need_sumbmit)},function (data) {
      if(data.code==1) {
        alert(data.msg);
        go.bind(_pmyself)() ;
        _this.setState({
          myFlag:false
        }) ;
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  firstComfirm('您确定要修改该订单吗？','',callback)
}



function updateBalanceOp(e,id) {
  createHistory().push({
    pathname: '/balacedetaillisttwo/?orderid='+id
  })
}

function cancelMyUpdate(e,id,_pmyself,go){
  go.bind(_pmyself)() ;
  this.setState({
    myFlag:false
  });
}


function comfirmAccount(e,id,_pmyself,go){
  var _this = this ;
 var callback = function(){
   RequireUtils.baseRequire("unilateral-finish/confirm-finish",{order_id:id},function (data) {
     if (data.code)
     {
       alert(data.msg);
       _this.setState({
         // loading:false,
         myflag:false
       }) ;
       go.bind(_pmyself)() ;
     }else{
       alert(data.msg);
       _this.setState({
         // loading:false
         // myflag:false
       }) ;
     }
   }.bind(this));
 } ;
  firstComfirm('您确定要结算订单吗？','',callback)
}

function getSaleButton(record,_pmyself,go) {
  var order_status=Number(record.order_status);
  var saler_or_buyer = record.saler_or_buyer ;
  var str = '' ;
  const cancelOrder =  <span className={'my-custom-center'} style={{marginRight:'5px'}}>
                          <Button onClick={(e)=>cancelOrderOp.bind(this)(e,record.id,_pmyself,go)}>取消订单</Button>
                        </span> ;
  const confirmOrder = <span className={'my-custom-center'} style={{marginBottom:'3px'}}>
                          <Button type="primary" onClick={(e)=>comfirmOrderOp.bind(this)(e,record.id,_pmyself,go)}>确认订单</Button>
                        </span> ;
  const alertPayment =  <span className={'my-custom-center'} style={{marginBottom:'3px',marginRight:'5px'}}>
                            <Button type="primary">提醒付款</Button>
                          </span> ;
  const lookYunbill =  <span className={'my-custom-center'} style={{marginBottom:'3px'}}>
                          <Button type="primary">查看运单</Button>
                        </span> ;
  const updateOrder = <span className={'my-custom-center'} style={{marginRight:'5px'}}>
                          <Button type="primary" onClick={(e)=>comfirmUpdateOp.bind(this)(e,record.id,_pmyself)}>修改订单</Button>
                        </span> ;
  const confirmSum =  <span className={'my-custom-center'}  style={{marginRight:'5px'}}>
                        <Button type="primary" onClick={(e)=>comfirmAccount.bind(this)(e,record.id,_pmyself,go)}>确认结算</Button>
                      </span> ;
  const updateSum =  <span className={'my-custom-center'}  style={{marginRight:'5px'}}>
                        <Button type="primary" onClick={(e)=>updateBalanceOp.bind(this)(e,record.id)}>修改结算</Button>
                      </span> ;
  const confimUpdate =  <span className={'my-custom-center'} style={{marginRight:'5px'}}>
                        <Button type="primary" onClick={(e)=>comfirmUpdateOrderOp.bind(this)(e,record.id,_pmyself,go)}>确认修改</Button>
                      </span> ;
    const assess =  <span className={'my-custom-center'}  style={{marginRight:'5px'}}>
                      <Button type="primary">评价</Button>
                    </span> ;
  const returnUpdate =  <span className={'my-custom-center'} style={{marginRight:'5px'}}>
                      <Button type="primary" onClick={(e)=>giveUpUpdateOrderOp.bind(this)(e,record.id,_pmyself,go)}>驳回修改</Button>
                    </span> ;
  const returnCancel =  <span className={'my-custom-center'} style={{marginRight:'5px'}}>
                      <Button type="primary" onClick={(e)=>giveUpCancelOp.bind(this)(e,record.id,_pmyself,go)}>驳回取消</Button>
                    </span> ;
  const abandonUpdate =  <span className={'my-custom-center'} style={{marginRight:'5px'}}>
                      <Button type="primary" onClick={(e)=>giveUpUpdateOrderOp.bind(this)(e,record.id,_pmyself,go)}>放弃修改</Button>
                    </span> ;
  const abandonCancel =  <span className={'my-custom-center'} style={{marginRight:'5px'}}>
                      <Button type="primary" onClick={(e)=>giveUpCancelOp.bind(this)(e,record.id,_pmyself,go)}>放弃取消</Button>
                    </span> ;
  const confirmCancel =  <span className={'my-custom-center'} style={{marginRight:'5px'}}>
                      <Button type="primary">确认取消</Button>
                    </span> ;
  const payment = <span style={{marginBottom:'3px',marginRight:'5px'}} className={'my-custom-center'}>
                      <Button type="primary"  onClick={(e)=>paymentOp.bind(this)(e,record.id,_pmyself,go)}>&nbsp;&nbsp;付&nbsp;&nbsp;款&nbsp;&nbsp;&nbsp;</Button>
                    </span>;
  const updateOrderConfirm = <span style={{marginBottom:'3px'}} className={'my-custom-center'} style={{marginRight:'5px'}}>
                      <Button type="primary"  onClick={(e)=>updateOrderConfirmOp.bind(this)(e,record.id,_pmyself,go)}>&nbsp;&nbsp;确&nbsp;&nbsp;定&nbsp;&nbsp;&nbsp;</Button>
                    </span>;

  const updateOrderBack = <span style={{marginBottom:'3px',marginRight:'5px'}} className={'my-custom-center'} >
                      <Button type="primary" onClick={(e)=>cancelMyUpdate.bind(this)(e,record.id,_pmyself,go)}>&nbsp;&nbsp;取&nbsp;&nbsp;消&nbsp;&nbsp;&nbsp;</Button>
                    </span>;

    switch(order_status)
    {
      case 1:
        if(this.state.myFlag){
              str = <span>
                  {updateOrderConfirm}
                  {updateOrderBack}
              </span>
            }else{
              str = <span>
                {updateOrder}
                {payment}
                {cancelOrder}
            </span>
            }

        break;
      case 2:
      case 3:
        if(this.state.myFlag){
          str = <span>
              {updateOrderConfirm}
              {updateOrderBack}
          </span>
        }else {
          str = <span>
                {updateOrder}
                {cancelOrder}
              </span>
        }
        break;
      case 4:
        str = <span>
          {updateSum}
          {confirmSum}
        </span>
        break;
      case 5:
        str = <span>
        </span>
        break;
      case 10:
      case 11:
      case 12:
        str = <span>
          {confimUpdate}
          {returnUpdate}
          {cancelOrder}
        </span>
        break;
      case 13:
      case 20:
        str = <span>
          {confimUpdate}
          {returnUpdate}
          {cancelOrder}
        </span>
        break;
      case 21:
      case 22:
      case 23:
        str = <span>
          {abandonUpdate}
          {confimUpdate}
          {returnUpdate}
          {cancelOrder}
        </span>
        break;
      case 32:
      case 33:
        str = <span>
          {confirmCancel}
          {returnCancel}
        </span>
        break;

      case 42:
      case 43:
        str = <span>
          {abandonCancel}
          {returnCancel}
          {confirmCancel}
        </span>
        break;
      case 54:
      case 74:
        str = <span>
          {confirmSum}
          {updateSum}
        </span>
        break;
      case 64:
      case 84:
        str = <span>
          {updateSum}
          {confirmSum}
        </span>
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
      myFlag:false
    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  render() {
    const {order,_pmyself,go} = this.props ;
    const mybuttons =  getSaleButton.bind(this)(order,_pmyself,go)   ;
    return (
      mybuttons
    )
  }
}
export default MyButton;
