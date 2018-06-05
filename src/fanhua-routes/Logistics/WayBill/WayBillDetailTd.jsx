import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Modal,message } from 'antd';
import AddCar from './AddCar' ;
import  ShowMap from './ShowMap' ;
import mystyle from './tablestyle.less' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class WayBillDetailTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addcar:false,
      yundanid:"",
      showmap:false,
      mapData:[],
      default_car_type:2,
      tableselectrecord:{
        start_date:"",
        car_head:"",
        car_body:"",
        load_num:"",
        driver1:""
      }
    };
    this.callback = this.callback.bind(this);
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


  handleAddCancel = () => {
    this.refs['AddCar'].resetFields() ;
    this.setState({
      addcar:false,
      freeselectData:[],
      default_car_type:2,
      tableselectrecord:{
        start_date:"",
        car_head:"",
        car_body:"",
        load_num:"",
        driver1:""
      }
    });
  } ;

  handleMapCancel=()=>{
    this.setState({
      showmap:false
    })
  };

  showMap=()=>{
      this.setState({
        showmap:true
      })
  } ;

  addCars(yundanid){
    RequireUtils.baseRequire('order-deliver/free-select',{},function (data) {
      if(data.code==1) {
        var list = data.data.list ;
        var nlist = list.map(function (item,index) {
          item.key = index ;
          return item ;
        }) ;
        this.setState({
          freeselectData:nlist
        });
      }else{
        alert(data.msg);
      }
    }.bind(this));
    this.setState({
      addcar:true,
      yundanid:yundanid
    })
  }
  getMyAddCar(item){
    var str = "" ;
    var order_source = Number(item.order_source) ;
    if((item.saler_or_buyer=="saler"&&order_source==1)||(item.saler_or_buyer=="buyer"&&order_source==0)){

    }else{
      if(item.recv_num-item.load_num==0){

      }else{
        str =  <span onClick={()=>this.addCars.bind(this)(item.id)} style={{marginRight:'20px'}}>
                  <Button type={'primary'}>添加车辆</Button>
                </span>
      }
    }
    return str ;
  }
  render() {
    const {item,go,_pthis}=this.props;
    const {addcar,yundanid,freeselectData,default_car_type,tableselectrecord,showmap} = this.state ;
    const mapdata = [{ longitude:item.f_lon ,
                      latitude: item.f_lat,
                      marktitle:"装车场站",
                      station:item.addr_name
                    },{ longitude:item.j_lon ,
                      latitude: item.j_lat,
                      marktitle:"卸车场站",
                      station:item.f_addr_name
                    }] ;
    const addCar = this.getMyAddCar.bind(this)(item) ;
    return (
      <div>
        <div >

          <Row className={'table-other-line'} type="flex" align="middle" style={{cursor:'pointer'}}>
            <Col span={3}>
              <div className={'my-custom-center'} title={item.goods_name}>
                {item.goods_name}
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'} title={item.recv_num}>
                {item.recv_num}吨
              </div>
            </Col>
            <Col span={3}>
              <div style={{color:'#FF6913'}} className={'my-custom-center'} title={item.recv_num-item.load_num}>待分配&nbsp;{item.recv_num-item.load_num}吨</div>
              <div className={'my-custom-center'} title={item.load_num}>已运输&nbsp;{item.load_num}吨</div>
              <div className={'my-custom-center'} style={{color:'red'}}>{item.recv_num-item.load_num<0?"订单已修改需重新调度":""}</div>
            </Col>
            <Col span={4} >
              <div className={'my-custom-center'} >张美朋&nbsp;15868413080</div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'} >
                <div className={'my-custom-center'}>湖北黄冈</div>
                <div className={'my-custom-center'}>白先生&nbsp;15989098765</div>
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>
                <div className={'my-custom-center'}>浙江杭州</div>
                <div className={'my-custom-center'}>李先生&nbsp;15689098765</div>
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>380公里</div>
            </Col>
          </Row>
          <Row>
            <Col>
                <div style={{textAlign:'right',padding:'10px 0'}}>
                  {addCar}
                  <span onClick={this.showMap} style={{color:'#3477ED',marginRight:'20px',padding:'10px 0',cursor:'pointer'}}>
                    <Icon type="environment-o" />地图
                  </span>
                </div>
            </Col>
          </Row>
        </div>

        <Modal title="新增车辆"
               visible={addcar}
               width={'60%'}
               onOk={this.handleOk}
               onCancel={this.handleAddCancel}
               footer={null}>
          <AddCar ref="AddCar"  pthis={this} default_car_type={default_car_type} tableselectrecord={tableselectrecord} handleAddCancel={this.handleAddCancel} yundanid={yundanid} go={go.bind(_pthis)} freeselectData={freeselectData}></AddCar>
        </Modal>
        <Modal title="运单地图"
               visible={showmap}
               width={'60%'}
               onOk={this.handleOk}
               onCancel={this.handleMapCancel}
               footer={null}>
          <ShowMap ref="ShowMap" mapdata={mapdata}></ShowMap>
        </Modal>
      </div >
    )
  }
}
export default WayBillDetailTd;
