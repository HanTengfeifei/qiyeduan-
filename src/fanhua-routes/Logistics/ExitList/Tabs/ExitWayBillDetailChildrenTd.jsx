import React from 'react';
import { Row, Col, Tabs, Icon,Select,Modal,Button } from 'antd';
import ShowCCarMap from './ShowCCarMap' ;
import {RequireUtils} from 'utils';
import ExitMyStatusButton from './ExitMyStatusButton' ;
import mystyle from '../tablestyle.less' ;
import UpdateCar from './UpdateCar' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ExitWayBillDetailChildrenTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatecar:false,
      updateData:{},
      companyoption:{},
      headcaroptions:[],
      bodycaroptions:[],
      driveroptions:[],
      mapData:[],
      showmap:false
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
    const {
      showmap,
      updatecar,
      updateData,
      companyoption,
      headcaroptions,
      bodycaroptions,
      driveroptions} = this.state ;
    /*yundanid={yundanid} go={go.bind(_pthis)} freeselectData={freeselectData}*/
    return (
      <div>
        <div>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={5}>
              <div className={'my-custom-center'}>
                {item.car_code}
              </div>
              {/*<div className={'my-custom-center'}>*/}
                {/*<span>运载量</span>*/}
                {/*<span>{item.load_num}吨</span>*/}
              {/*</div>*/}
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                {item.load_num}吨
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                {item.head_card}
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                {item.body_card}
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>
                <span>李先生&nbsp;13456786554</span>
              </div>
              <div className={'my-custom-center'}>
                <span>张先生&nbsp;15656786550</span>
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                <span>{item.start_date}</span>
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                <span>{item.end_date}</span>
              </div>
            </Col>
            {/*<Col span={3}>*/}
              {/*<div className={'my-custom-center'} onClick={()=>this.updateCar.bind(this)(item.id)}>*/}
                {/*<Icon type='edit'/>编辑*/}
              {/*</div>*/}
              {/*<div className={'my-custom-center'} onClick={()=>this.showMap(item)} style={{cursor:'pointer'}}>*/}
                {/*<Icon type="environment-o"/>地图*/}
              {/*</div>*/}
            {/*</Col>*/}
            {/*<Col span={3}>*/}
              {/*<ExitMyStatusButton  item={item}  go={go.bind(_pthis)}></ExitMyStatusButton>*/}
            {/*</Col>*/}
          </Row>
          <Row>
            <Col>
              <div style={{textAlign:'right',marginRight:'20px'}}>
                <span className={'my-custom-center'} onClick={()=>this.updateCar.bind(this)(item.id)} style={{color:'#3477ED',marginRight:'10px'}}>
                    <Icon type='edit'/>编辑
                </span>
                <span className={'my-custom-center'} onClick={()=>this.showMap(item)} style={{color:'#3477ED',marginRight:'10px'}}>
                  <Icon type="environment-o"/>地图
                </span>
                <ExitMyStatusButton  item={item}  go={go.bind(_pthis)}></ExitMyStatusButton>
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
export default ExitWayBillDetailChildrenTd;
