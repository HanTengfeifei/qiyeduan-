import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Divider,Modal,message } from 'antd';
import { Link } from 'dva/router';
import Report from './Report';
import './Head.less';
import './Goods_Info.less';
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class Goods_Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      addrName:"",
      goodsName:"",
      goodsId:"",
      address:"",
      addr_detail:"",
      deliver_type:"",
      price:"",
      temp_name:"",
      gas_value:"",
      hot_value:"",
      type_name:"",
      weight:"",
      area_name:"",
      percent:"",
      companyName:"",
      prod_id:"",
      user_name:"",
      user_mobile:"",
      ok:false,

    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentDidMount(){
  }

  componentWillMount(){
    console.log("will");
    console.log(this.props.id);
    const id=this.props.id;
    RequireUtils.baseRequire('mall/order-page',{id:id},function (data){
      if(data.code==1) {
        this.setState({
          goodsName:data.data.info.goods.goodsName,
          goodsId:data.data.info.goods.goodsId,
          address:data.data.info.goods.address,
          addr_detail:data.data.info.goods.addr_detail,
          deliver_type:data.data.info.goods.deliver_type,
          price:data.data.info.goods.price,
          temp_name:data.data.info.goods.temp_name,
          gas_value:data.data.info.goods.gas_value,
          hot_value:data.data.info.goods.hot_value,
          type_name:data.data.info.goods.type_name,
          weight:data.data.info.goods.weight,
          addrName:data.data.info.goods.addrName,
          area_name:data.data.info.goods.area_name,
          percent:data.data.info.goods.percent,
          companyName:data.data.info.goods.companyName,
          prod_id:data.data.info.goods. prod_id,
          user_name:data.data.info.goods.user_name,
          user_mobile:data.data.info.goods.user_mobile,
          ok:true,
        });
      }
      else{
        message.error(data.msg);
      }
    }.bind(this));
  }
  componentWillReceiveProps(){

  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  };
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  render() {
    const {priceUpDown,user_name,user_mobile, ok, prod_id, goodsName, goodsId,  addr_detail, deliver_type, price, temp_name, hot_value, type_name,weight,addrName,area_name,percent,companyName}=this.state;

    const link = user_name +" "+user_mobile ;
    return (
      <div>
        { ok ?
          <div  className={"my-sytyle-Goods-info"}>
          <Row gutter={8} style={{marginTop: '10px' }}>
            <Col span={4}>
              <span style={{fontSize:16,fontWeight:500,color:"black"}}>{goodsName ? goodsName : ""}</span>
            </Col>
            <Col span={8}>

            </Col>
            <Col span={12} style={{textAlign:"right",}}>
              <p style={{wordWrap: "break-word",fontSize:16,fontWeight:500,color:"black", textAlign:"right", marginRight:10}}>商品编号:{goodsId ? goodsId : ""}</p>
            </Col>
          </Row>
          < Divider />
          <Row gutter={8} style={{marginTop: '10px'}}>
          <Col span={10}>
          <p>挂售量:&nbsp;{weight ? weight : "0"} < span>吨</span></p>

          <p  style={{marginTop:10}} className="wordBreak"><Icon type="environment-o" />{addrName ? addrName : ""} &nbsp;&nbsp;<Icon type="car" />&nbsp;<span>{deliver_type==="1"? "配送":"自提"}</span> &nbsp;<span style={{ fontSize: 16, color: 'red' }}>款到发货</span></p>
          <p style={{marginTop:10}}>{addr_detail ? addr_detail : ""}</p>
          </Col>
          <Col span={8}>

          </Col>
          <Col span={6}  style={{textAlign:"right",}}>
            <p  style={{marginRight:10}}> {priceUpDown? <span style={{color:"red"}}><Icon type="arrow-up" /></span>: <span style={{color:"red"}}><Icon type="arrow-down" /></span> }&nbsp;<span style={{color:"red"}}>
              {percent}
                </span>&nbsp;&nbsp;<Icon style={{ fontSize: 16, color: 'red' }} type="pay-circle-o" />&nbsp;&nbsp;<span style={{fontSize:25,color:"red", marginLeft:"1%"}}>
              {price}
              </span> <span style={{fontWeight:'bold',color:"red"}}>元/吨</span>
            </p>
            <p style={{marginTop:'20px'}}></p>
            <p style={{marginTop:'10px',overflow: "hidden",textOverflow:'ellipsis',whiteSpace:"nowrap"}} title={link}>卖方联系人：{user_name}&nbsp;{user_mobile}</p>
          </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={8}  style={{marginTop: '10px',paddingBottom:0}}>
          <Col span={10} >
          <p style={{fontSize:16,fontWeight:500,color:"black" }}>{goodsName ? goodsName : ""}<Divider type="vertical" />{type_name ? type_name : "气类型"}<Divider type="vertical" />{area_name ? area_name : "原产地"}</p>
          <p style={{marginTop:10}}>{temp_name ? temp_name : "原产地"} <Divider type="vertical" /> <span> 气化率: {percent ? percent : "原产地"} &nbsp;<span style={{color:"#bfbfbf"}} >Nm3/T</span>  </span> <Divider type="vertical" /><span> 热值: {hot_value ? hot_value : "未知"} <span style={{color:"#bfbfbf"}}>MJ/KG</span></span></p>
          </Col>
          <Col span={8}>

          </Col>
          <Col span={6} style={{textAlign:"right"}} >

          <Modal
          title="气质报告"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          >
          <Report   prod_id={prod_id}/>
          </Modal>
          <p   style={{marginRight:10,overflow: "hidden",textOverflow:'ellipsis',whiteSpace:"nowrap"}} title={companyName}>供应商: <span>{companyName ? companyName : ""}</span></p>
          <div style={{marginTop:10,marginRight:10}} className="report" onClick={this.showModal}>
          <span>气质报告:</span><Icon  className="report_icon"   type="profile" />
          </div>
          </Col>
          </Row>
          </div>
              :<div></div>
            }
      </div>
    )
  }
}
export default Goods_Info;
