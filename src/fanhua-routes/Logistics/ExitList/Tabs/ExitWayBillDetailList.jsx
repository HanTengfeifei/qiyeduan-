import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import ExitBillDetailTable from './ExitBillDetailTable' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ExitWayBillDetailList extends React.Component {
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
    var goodsname = decodeURI(params[1].split("=")[1]) ;
    RequireUtils.baseRequire("/order-deliver/car-detail",{id:id},function (data) {
      if(data.code==1) {
        var list = data.data.car_deliver ;
        var cars = data.data.cars ;
        var nlist = list.map(function (item,index) {
          item.key = index ;
          item.goods_name = goodsname ;
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
        this.setState({
          data:[],
          cars:[]
        })
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
                <span style={{fontSize:'20px',fontWeight:'bold'}}>出车单详情</span>
            </div>
            <ExitBillDetailTable datas={data} cars={cars} go={this.fetch} _pthis = {this}></ExitBillDetailTable>
          </Col>
        </Row>
      </div >
    )
  }
}
export default ExitWayBillDetailList;
