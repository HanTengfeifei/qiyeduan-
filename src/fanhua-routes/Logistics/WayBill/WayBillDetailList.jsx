import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import WayBillDetailTable from './WayBillDetailTable' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class WayBillList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      cars:[],
      id:""
    } ;
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  fetch(){
    var _this = this ;
    var search = this.props.location.search ;
    var params = search.split("&") ;
    var id = params[0].split("=")[1] ;
    var goodsname = '' ;
    if(params[1]){ //从订单跳转过来的需要传goodsname 物流的则不用
      goodsname = decodeURI(params[1].split("=")[1]) ;
    }
    RequireUtils.baseRequire("order-deliver/deliver-details",{id:id},function (data) {
      if(data.code==1) {
        var list = data.data.deliver ;
        var cars = data.data.cars ;
        var nlist = list.map(function (item,index) {
          item.key = index ;
          if(goodsname){
            item.goods_name = goodsname ;
          }
          return item ;
        }) ;
        var ncars = cars.map(function (item,index) {
          item.key = index ;
          return item ;
        }) ;
        _this.setState({
          data:nlist,
          cars:ncars
        }) ;
      }else{
        alert(data.msg) ;
      }
    }.bind(this))
  }
  componentDidMount(){
    this.fetch() ;
  }

  render() {
    const {data,cars} = this.state ;
    return (
      <div >
        <Row>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <div style={{padding:'25px 15px'}}>
                <span style={{fontSize:'20px',fontWeight:'bold'}}>运单详情</span>
            </div>
            <WayBillDetailTable datas={data} cars={cars} go={this.fetch} _pthis = {this}></WayBillDetailTable>
          </Col>
        </Row>
      </div >
    )
  }
}
export default WayBillList;
