import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider,message} from 'antd';
import createHistory from 'history/createHashHistory';
import AddOrderInput from  './AddOrderInputTwo';
import AddOrderTable from  './AddOrderTableTwo';
import {RequireUtils} from 'utils';
import { Link } from 'dva/router';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class AddOrderAll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      saler_id_productions:[],
      child:"",
      all:{},
      contact_name:"",
      price:null,
      countAll:0,
      company_all:{},
      goods_id:"",
      goods_name:"",
    };
    this.callback = this.callback.bind(this);
    this.onRef=this.onRef.bind(this);
    this.onRef2=this.onRef2.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.callbackS=this.callbackS.bind(this);
    this.receiveValue=this.receiveValue.bind(this);
    this.countAll=this.countAll.bind(this);
    this.saveTow=this.saveTow.bind(this);
  }
  receiveValue(value){

  }
  countAll(value){
    this.setState({
      countAll:value,
    })
  }
  callback(value) {
    RequireUtils.baseRequire('order/goods-list',{saler_id:value},function (data){
      if(data.code==1) {
        this.setState({
          saler_id_productions: data.data.list,
        });
      }
      else{
        this.setState({
          saler_id_productions: []
        });
      }
    }.bind(this));

  }
  saveTow(number){
    var value=Math.round(parseFloat(number)*100)/100;
    var xsd=value.toString().split(".");
    if(xsd.length==1){
      value=value.toString()+".00";
      return value;
    }
    if(xsd.length>1){
      if(xsd[1].length<2){
        value=value.toString()+"0";
      }
      return value;
    }

  }
  callbackS(value,value1,value2,value3){
    this.setState({
      contact_name:value,
      price:value1,
      goods_id:value2,
      goods_name:value3,
    })
  }
  onRef(ref){
    this.child=ref;
  }
  onRef2(refS){
    this.childS=refS;
  }
  componentDidMount(){
    RequireUtils.baseRequire('order/company-info',{},function (data){
      if(data.code==1) {
        this.setState({
          company_all:data.data.info,
          saler_id:data.data.info.id
        });
        this.callback(data.data.info.id) ;
      }
      else{
        this.setState({
          company_all:{},
          saler_id:"",
        });
        this.callback("") ;
      }
    }.bind(this));
  }
  handleSubmit (e){
    e.preventDefault();
    var form = this.child.props.form ;
    form.validateFields((err, values) => {
      if (err) {

      }else{
          const obj={};
          var deliver_date = this.child.state.deliver_date ;
          if(deliver_date){
            deliver_date = deliver_date.format('YYYY-MM-DD HH:mm:ss') ;
          }
          obj.goods_id=this.state.goods_id;
          obj.order_kind=2;
          obj.order_source=0;
          obj.buyer_id=this.child.state.buyer_id;
          obj.saler_id=this.state.saler_id;
          obj.contract_id=this.child.state.contract_id;
          obj.deliver_date=deliver_date;
          obj.buyer_person=this.child.state.buyer_person;
          var station_all = this.child.state.station_all ;
          obj.scenario = 'add_xs_order' ;
          if(station_all.length==0){
            message.error("请添加场站") ;
            return false ;
          }
          for(var i=0;i<station_all.length;i++){
            if(!station_all[i].addr_id){
              message.error("场站不能为空") ;
              return false ;
            }
            if(station_all[i].recv_sum==0){
              message.error("采购量不能为0") ;
              return false ;
            }
            if(!station_all[i].recv_sum){
              message.error("采购量不能为空") ;
              return false ;
            }
          }
          obj.recv_addrs=JSON.stringify(this.child.state.station_all);
          RequireUtils.baseRequire('unilateral-order/add-order',obj,function (data){
            if(data.code==1) {
              message.success(data.msg);
              createHistory().push({
                pathname: '/orderlisttwo/'
              })
            }
            else{
              message.error(data.msg);
            }
          }.bind(this));
        }
    })
  }



  render() {
    const element=<div><Row gutter={8} style={{ marginTop: '10px' ,textAlign:"center"}}>
      <Col span={4} >
        商品名称
      </Col>
      <Col span={5} >
        商品总量
      </Col>
      <Col span={5} >
        商品总价
      </Col>
      <Col span={5} >
        预计运费
      </Col>
      <Col span={5} >
        订单金额
      </Col>
    </Row></div>;
    return (
      <div >
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px'}}>
          <Col span={24}>
            <div style={{padding:'25px 15px'}}>
                <span style={{fontSize:'20px',fontWeight:'bold'}}>订单添加</span>
            </div>
            <Card hoverable   style={{margin:0}} type="card">
              <AddOrderInput  ref={(AddOrderInput)=>(this.AddOrderInput=AddOrderInput)}   company_all={this.state.company_all}  numberAll={this.state.countAll} countAll={this.countAll}  contact_name={this.state.contact_name} sent={this.receiveValue} sentParents={this.callback}  onRef={this.onRef}/>
              <Divider></Divider>
              <AddOrderTable  sentParents={this.callbackS}   saler_id_productions={this.state.saler_id_productions}   ref="table" onRef2={this.onRef2} info={this.state.child}/>
              <Divider></Divider>
              <Card title={element} bordered={false} style={{ width: "100%" }}>
                <div>
                  <Row gutter={8} style={{ marginTop: '10px' }}>
                    <Col span={4} >
                      <div style={{textAlign:'center'}}>
                        {this.state.goods_name}
                      </div>
                    </Col>
                    <Col span={5} >
                      <div style={{textAlign:'center'}}>
                        {this.saveTow(this.state.countAll)}
                      </div>
                    </Col>
                    <Col span={5} >
                      <div style={{textAlign:'center'}}>
                        {this.saveTow(this.state.countAll*this.state.price)}
                      </div>
                    </Col>
                    <Col span={5} >
                      <div style={{textAlign:'center'}}>
                        <Icon type="pay-circle-o" />{this.saveTow(0.00)}
                      </div>
                    </Col>
                    <Col span={5}  style={{color:"red"}}>
                      <div style={{textAlign:'center'}}>
                        <Icon  type="pay-circle-o" />{this.saveTow(this.state.countAll*this.state.price*(1+0.075))}<br/>
                        <span style={{color:"gray",fontSize:"12px"}}>多含7.5%订单金额</span>
                      </div>
                    </Col>
                </Row>
                </div>
              </Card>
              <Divider></Divider>
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col span={6} >
                  <Button  type="primary"  onClick={this.handleSubmit}>提交</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default AddOrderAll;
