import React from 'react';
import { Row, Col, Tabs, Icon,Select,Modal,Button } from 'antd';
import {RequireUtils} from 'utils';
import MyStatusButton from './MyStatusButton' ;
import ShowCCarMap from './ShowCCarMap' ;
import mystyle from './tablestyle.less' ;
import UpdateCar from './UpdateCar' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class WayBillDetailTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatecar:false,
      updateData:{},
      companyoption:{},
      headcaroptions:[],
      bodycaroptions:[],
      driveroptions:[],
      showmap:false,
      yundanid:"",
      mapData:[]
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

  updateCar(id){
    var _this = this ;
    RequireUtils.baseRequire('order-deliver/car-info',{id:id},function (data) {
      if(data.code==1) {
        var mydriver = data.data.car_deliver ;
        var companyoption = data.data.company ;
        RequireUtils.baseRequire("order-deliver/car-select",{chengyun_id:companyoption.id},function (data) {
          if(data.code==1) {
            var list = data.data.list ;
            _this.setState({
              headcaroptions:list.head,
              bodycaroptions:list.body,
              driveroptions:list.driver,
              updateData:mydriver,
              companyoption:companyoption,
              updatecar:true
            });
          }else{
            _this.setState({
              headcaroptions:[],
              bodycaroptions:[],
              driveroptions:[],
              updateData:[],
              companyoption:{},
              updatecar:true
            });
          }
        }.bind(this))
      }else{
        _this.setState({
          headcaroptions:[],
          bodycaroptions:[],
          driveroptions:[],
          updateData:[],
          companyoption:{},
          updatecar:true
        });
      }
    }.bind(this));
  }
  handleAddCancel = () => {
    this.refs['UpdateCar'].resetFields() ;
    this.setState({
      updatecar:false
    });
  } ;



  handleMapCancel=()=>{
    this.setState({
      showmap:false
    })
  };

  getUpdateCar(item){
    var order_source = Number(item.order_source) ;
    var str = "" ;
    if((item.saler_or_buyer=="saler"&&order_source==1)||(item.saler_or_buyer=="buyer"&&order_source==0)){

    }else{
      str = <span className={'my-custom-center'} onClick={()=>this.updateCar.bind(this)(item.id)} style={{color:'#3477ED',marginRight:'10px'}}>
              <Icon type='edit'/>编辑
            </span>
    }
    return str ;
  }

  showMap=(record)=>{
    RequireUtils.baseRequire('car/get-gps',{deliverCarId:record.id},function (data){
        if(data.code==1){
          this.setState({
            showmap:true,
            mapData:data.data.list
          })
        }else{
          this.setState({
            showmap:true,
            mapData:[]
          })
        }
    }.bind(this));
  } ;

  render() {
    const {item,go,_pthis}=this.props;
    const updateCars = this.getUpdateCar.bind(this)(item) ;
    const {
      showmap,
      updatecar,
      updateData,
      companyoption,
      headcaroptions,
      bodycaroptions,
      driveroptions} = this.state ;
    return (
      <div>
        <div>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={5}>
              <div className={'my-custom-center'} title={item.car_code}>
                {item.car_code}
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'} title={item.load_num}>
                {item.load_num}吨
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'} title={item.head_card}>
                {item.head_card}吨
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'} title={item.body_card}>
                {item.body_card}吨
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>
                <span >联系人辣</span>
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'} title={item.start_date}>
                <span >{item.start_date}</span>
              </div>

            </Col>
            <Col span={3}>
              <div className={'my-custom-center'} title={item.end_date}>
                <span >{item.end_date}</span>
              </div>
            </Col>

            {/*<Col span={3}>*/}
              {/*{updateCars}*/}
              {/*<div className={'my-custom-center'} onClick={()=>this.showMap(item)}>*/}
                {/*<Icon type="environment-o"/>地图*/}
              {/*</div>*/}
            {/*</Col>*/}
            {/*<Col span={3}>*/}
              {/*<MyStatusButton  item={item}  go={go.bind(_pthis)}></MyStatusButton>*/}
            {/*</Col>*/}
          </Row>
          <Row>
            <Col>
              <div style={{textAlign:'right',marginRight:'20px'}}>
                {updateCars}
                <span className={'my-custom-center'} onClick={()=>this.showMap(item)} style={{color:'#3477ED',marginRight:'10px'}}>
                  <Icon type="environment-o"/>地图
                </span>
                <MyStatusButton  item={item}  go={go.bind(_pthis)}></MyStatusButton>
              </div>
            </Col>
          </Row>
        </div>

        <Modal title="编辑车辆"
               visible={updatecar}
               width={'60%'}
               onOk={this.handleOk}
               onCancel={this.handleAddCancel}
               footer={null}>
          <UpdateCar
            ref="UpdateCar"
            companyoption={companyoption}
            updateData={updateData}
            headcaroptions={headcaroptions}
            bodycaroptions={bodycaroptions}
            driveroptions={driveroptions}
            go={go.bind(_pthis)}
            mymark={false}
            handleAddCancel={this.handleAddCancel} ></UpdateCar>
        </Modal>

        <Modal title="出车单地图"
               visible={showmap}
               width={'60%'}
               onOk={this.handleOk}
               onCancel={this.handleMapCancel}
               footer={null}>
          <ShowCCarMap ref="ShowCCarMap" mapData={this.state.mapData} yundanid={item.id}></ShowCCarMap>
        </Modal>
      </div >
    )
  }
}
export default WayBillDetailTd;
