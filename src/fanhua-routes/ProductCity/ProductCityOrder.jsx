import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Select,Divider,message,BackTop,Layout,Menu,} from 'antd';
import createHistory from 'history/createHashHistory';
import AddOrderInput from  './AddOrderInput';
import GoodsInfo from './Goods_Info';
import Calender from './Calendar';
import {RequireUtils} from 'utils';
import { Link } from 'dva/router';
import {config} from 'utils';
import './ProductCityOrder.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const { Header, Footer, Content } = Layout;
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
      goods_info:{},
      price_date:[],
      ok:false,
      contract_all:[
        {id:0 ,contract_name:""},
       ],
      company:"",
      buyer_contact_id_all:[],
      addr:[],
      buyer_id:"",
      CalendarVisibile:false,
      text:false,
    };
    this.callback = this.callback.bind(this);
    this.onRef=this.onRef.bind(this);
    this.onRef2=this.onRef2.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.callbackS=this.callbackS.bind(this);
    this.receiveValue=this.receiveValue.bind(this);
    this.countAll=this.countAll.bind(this);
    this.saveTow=this.saveTow.bind(this);
    this.SwitchCanlender=this.SwitchCanlender.bind(this);
  }
  receiveValue(value){
    console.log(value);
    console.log(8866);
  }
  countAll(value){
    this.setState({
      countAll:value,
    })
  }
  callback(value) {
    console.log(value);
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
  componentWillMount(){
    RequireUtils.baseRequire('mall/order-page',{id:this.props.location.search.split("=")[1]},function (data){
      if(data.code==1) {
        this.setState({
          goods_name:data.data.info.goods.goodsName,
          saler_id:data.data.info.goods.saler_id,
          goods_id:data.data.info.goods.goodsId,
          contract_all:data.data.info.contract,
          price:data.data.info.goods.price,
          price_date:data.data.info.price_date,
          ok:true,
          company:data.data.info.company,
          buyer_contact_id_all:data.data.info.user,
          addr:data.data.info.addr,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));

  }
  componentDidMount(){

  }
  handleSubmit (e){
    e.preventDefault();
    const obj={};
    obj.goods_id=this.state.goods_id;
    obj.order_source=this.child.state.order_source;
    obj.saler_id=this.state.saler_id;
    obj.contract_id=this.child.state.contract_id;
    obj.deliver_date=this.child.state.deliver_date;
    obj.buyer_person=this.child.state.buyer_person;
    obj.recv_addrs=JSON.stringify(this.child.state.station_all);
    console.log(obj);
    RequireUtils.baseRequire('mall/add-order',obj,function (data){
      if(data.code==1) {
        message.success(data.msg);
        createHistory().push({
          pathname: '/orderlist/'
        })
      }
      else{
        alert(data.msg);
      }
    }.bind(this));
  }
  SwitchCanlender(){
    this.setState({
      text:!this.state.text,
      CalendarVisibile:!this.state.CalendarVisibile
    })
  }
  render() {
    const {price_date,ok,text}=this.state;
    const element=<div><Row gutter={8} style={{ marginTop: '10px' }}>
      <Col span={6} style={{textAlign:"center"}} >
        商品名称
      </Col>
      <Col span={6} style={{textAlign:"center"}}>
        商品总量
      </Col>
      <Col span={6} style={{textAlign:"center"}} >
        商品总价
      </Col>

      <Col span={6}  style={{textAlign:"center"}}>
        订单金额
      </Col>
    </Row></div>;
    return (
      <div  className="ProductCityOrder" style={{fontSize:"1rem"}}>
        <Layout>
          <Header style={{ position: 'fixed', width: '100%' }}>
            <div className="logo2" >
              <img src={config.log} alt="加载错误"/>
            </div>
            <Menu
              theme="light"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="2"><Link to="/Home">返回</Link></Menu.Item>
              {/*<Menu.Item key="2" >商品下单</Menu.Item>*/}
              <Menu.Item key="1"><Link to="/echarthomepage"><Button  type="primary" ghost>管理中心</Button></Link></Menu.Item>
            </Menu>
          </Header>
        {ok ?
        <Row gutter={8} className="info" style={{marginTop: '85px'}}>
          <BackTop/>
          <Col span={4}/>
          <Col span={16}>
            <Card hoverable title="" type="card">
              <GoodsInfo id={this.props.location.search.split("=")[1]}/>
              <Divider></Divider>
              <Button  onClick={this.SwitchCanlender}  type="primary" ghost>{ !text ? "查看日历与价格":"关闭日历和价格"}</Button>
              <Divider></Divider>
              <div>
              { this.state.CalendarVisibile ?
                <div><Calender price_date={this.state.price_date} onRef2={this.onRef2}/><Divider></Divider></div>
                  : ""
              }
              </div>
              {/*<AddOrderTable  sentParents={this.callbackS}   saler_id_productions={this.state.saler_id_productions}   ref="table" onRef2={this.onRef2} info={this.state.child}/>*/}


              <AddOrderInput  addr={this.state.addr} buyer_contact_id_all={this.state.buyer_contact_id_all}  company={this.state.company}   contract_all={this.state.contract_all} company_all={this.state.company_all} numberAll={this.state.countAll}
                              countAll={this.countAll} contact_name={this.state.contact_name} sent={this.receiveValue}
                              sentParents={this.callback} onRef={this.onRef}/>

              <Divider></Divider>
              <Card title={element} bordered={false} style={{width: "100%"}}>
                <div>
                  <Row gutter={8} style={{marginTop: '10px'}}>
                    <Col span={6} style={{textAlign: "center"}}>
                      {this.state.goods_name}
                    </Col>
                    <Col span={6} style={{textAlign: "center"}}>
                      {this.saveTow(this.state.countAll)}
                    </Col>
                    <Col span={6}  style={{textAlign: "center", color: "red"}}>
                      {this.saveTow(this.state.countAll * this.state.price)}
                    </Col>
                    {/*<Col span={5}>*/}
                      {/*<Icon type="pay-circle-o"/>{this.saveTow(0.00)}*/}
                    {/*</Col>*/}
                    <Col span={6} style={{textAlign: "center", color: "red"}}>
                      <Icon type="pay-circle-o"/><span style={{fontSize:20}}>{this.saveTow(this.state.countAll * this.state.price * (1 + 0.075))}</span>
                    </Col>
                  </Row></div>
              </Card>
              <Row gutter={8} style={{marginTop: '10px'}}>
                <Col span={6}>
                  <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      :<div></div>}
        </Layout>
      </div >
    )
  }
}
export default AddOrderAll;
