import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider,message } from 'antd';
import mystyle from './tabstyle.less' ;
import createHistory from 'history/createHashHistory';
import MerchandiseDetailBasic from  './MerchandiseDetailBasic' ;
import SaleMerchandiseMessage from  './SaleMerchandiseMessage' ;
import MerchandiseCalendar from  './MerchandiseCalendar' ;
import {RequireUtils} from 'utils';
import { Link } from 'dva/router';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class AddMerchandiseControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      child:{},
      all:{},

    };
    this.callback = this.callback.bind(this);
    this.onRef=this.onRef.bind(this);
    this.onRef2=this.onRef2.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
    this.onSwitchStatus=this.onSwitchStatus.bind(this);
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

  }
  onSwitchStatus(status){
    var sta=true;
    if(status==="0"){
      sta=true;
    }
    else{
      sta=false;
    }

    console.log("我走了");
    console.log("0766545455555555555");
    this.setState({
      status:sta,
    })
  }
  handleSubmit (e){
    e.preventDefault();
    const obj={};
    obj.prod_id=this.child.state.prod_id;
    obj.goods_stock=this.child.state.goods_stock;
    obj.deliver_type=this.child.state.deliver_type;
    obj.contact_id=this.child.state.contact_id;
    obj.stock_type=this.child.state.stock_type;
    obj.pay_type=this.child.state.pay_type;
    obj.status=this.child.state.status;
  obj.price_options=JSON.stringify(this.childS.state.all);

    this.SaleMerchandiseMessage.validateFields((err, values) => {
      console.log(err) ;
      if (err) {
        this.setState({
          loading:false
        }) ;
      }else{
        RequireUtils.baseRequire('goods/add-goods',obj,function (data){
          if(data.code==1) {
            message.success(data.msg);
            //Read total count from server
            // pagination.total = data.totalCount;
            createHistory().push({
              pathname: '/merchandisemontrol/'
            })
            // window.location.href = "#/merchandisemontrol";
          }
          else{
            alert(data.msg);
          }
        }.bind(this));
      }
    })
  }
  render() {
    const{status}=this.state;
    return (
      <div >
        <Row>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
              <div style={{padding:'25px 15px'}}>
                  <span style={{fontSize:'20px',fontWeight:'bold'}}>商品添加</span>
              </div>
            <Card  type="card">
              <MerchandiseDetailBasic  info={this.state.child}></MerchandiseDetailBasic>
              <Divider></Divider>
              <SaleMerchandiseMessage  sentParents={this.callback} onRef={this.onRef}  onSwitchStatus={this.onSwitchStatus} ref={(SaleMerchandiseMessage)=>this.SaleMerchandiseMessage=SaleMerchandiseMessage}/>
              <Divider></Divider>
              <div className={'add-goods-hide-right-button'}>
                <MerchandiseCalendar onRef2={this.onRef2}  status={status} ></MerchandiseCalendar>
              </div>
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
export default AddMerchandiseControl;
