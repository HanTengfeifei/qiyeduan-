import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider,message } from 'antd';
import mystyle from './tabstyle.less' ;
import createHistory from 'history/createHashHistory';
import MerchandiseDetailBasic from  './EditMerchandiseDetailBasic';
import SaleMerchandiseMessage from  './EditSaleMerchandiseMessage';
import MerchandiseCalendar from  './EditMerchandiseCalendar';
import {RequireUtils} from 'utils';
import { Link } from 'dva/router';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class AddMerchandiseControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id:"",
      child:{},
      all:{},
      goods:{},
      price_date:[],
      ok:false,
      myid:''
    };
    this.callback = this.callback.bind(this);
    this.onRef=this.onRef.bind(this);
    this.onRef2=this.onRef2.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.go=this.go.bind(this);
  }
  callback(key) {
    this.setState({
      child:this.child.state.productDetail,
    })
  }
  onRef(ref){
    this.child=ref;
  }
  onRef2(ref){
    this.childS=ref;
  }
  componentDidMount(){
    const search=this.props.location.search;
    var id = search.split("=")[1];
    this.setState({
      myid:id
    }) ;
    RequireUtils.baseRequire('goods/goods-info',{id:id},function (data){
      if(data.code==1) {
        this.setState({
          goods: data.data.goods,
          price_date: data.data.price_date,
          ok:true,
        });
      }
      else{
        message.error("获取商品信息失败！");
      }
    }.bind(this));

  }

  componentWillMount(){
    const search=this.props.location.search;
    var id = search.split("=")[1];

    RequireUtils.baseRequire('goods/goods-info',{id:id},function (data){
      if(data.code==1) {
        this.setState({
          goods: data.data.goods,
          price_date: data.data.price_date,
          ok:true,
        });
      }
      else{
        message.error("获取商品信息失败！");
      }
    }.bind(this));
  }
  go(){
    const search=this.props.location.search;
    var id = search.split("=")[1];

    RequireUtils.baseRequire('goods/goods-info',{id:id},function (data){
      if(data.code==1) {
        this.setState({
          goods: data.data.goods,
          price_date: data.data.price_date,
          ok:true,
        });
      }
      else{
        message.error("获取商品信息失败！");
      }
    }.bind(this));
  }


  handleSubmit (e){
    e.preventDefault();

    this.SaleMerchandiseMessage.validateFields((err, values) => {
      if (err) {

      }else{
        const search=this.props.location.search;
        var id = search.split("=")[1];
        const obj={};
        obj.id=id;
        obj.prod_id=this.child.state.prod_id;
        obj.goods_stock=this.child.state.goods_stock;
        obj.deliver_type=this.child.state.deliver_type;
        obj.contact_id=this.child.state.contact_id;
        obj.stock_type=this.child.state.stock_type;
        obj.status=this.child.state.status;
        obj.price_options=JSON.stringify(this.childS.state.all);
        RequireUtils.baseRequire('goods/modify-goods',obj,function (data){
          if(data.code==1) {
            message.success(data.msg);
            createHistory().push({
              pathname: '/merchandisemontrol/'
            })
          }
          else{
            message.error(data.msg);
          }
        }.bind(this));
      }
    }) ;
  }


  render() {

    const{ok,myid} =this.state;
      return (
        <div>
          <Row>
          </Row>
          {
          ok?
          <Row gutter={8}>
            <Col span={24}>
              <div style={{padding:'25px 15px'}}>
                  <span style={{fontSize:'20px',fontWeight:'bold'}}>商品编辑</span>
              </div>
              <Card hoverable type="card">
                <MerchandiseDetailBasic info={this.state.child}></MerchandiseDetailBasic>
                <Divider></Divider>
                <SaleMerchandiseMessage  ref={(SaleMerchandiseMessage)=>this.SaleMerchandiseMessage = SaleMerchandiseMessage}  goods={this.state.goods} sentParents={this.callback}
                                        onRef={this.onRef}></SaleMerchandiseMessage>
                <Divider></Divider>

                <MerchandiseCalendar price_date={this.state.price_date} myid={myid}   onRef2={this.onRef2} go={this.go}></MerchandiseCalendar>

                <Row gutter={8} style={{marginTop: '10px'}}>
                  <Col span={6}>
                    <Button type="primary" onClick={this.handleSubmit}>提交</Button>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
          : <div></div>
          }
        </div>
      )


  }
}
export default AddMerchandiseControl;
