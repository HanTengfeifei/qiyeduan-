import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Modal } from 'antd';
import mystyle from '../tablestyle.less' ;
import ShowMap from './ShowMap' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ExitWayBillDetailTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yundanid:"",
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

  showMap=()=>{
    this.setState({
      showmap:true
    })
  } ;

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

  handleMapCancel=()=>{
    this.setState({
      showmap:false
    })
  };

  render() {
    const {item}=this.props;
    const {showmap} = this.state ;
    const mapdata = [{ longitude:item.f_lon ,
      latitude: item.f_lat,
      marktitle:"装车场站",
      station:item.addr_name
    },{ longitude:item.j_lon ,
      latitude: item.j_lat,
      marktitle:"卸车场站",
      station:item.f_addr_name
    }] ;
    return (
      <div>
        <div >
          {/*<Row className={'table-first-line'}>*/}
            {/*<div >*/}
              {/*< Col span={18}>*/}
                {/*<div style={{textAlign:'left',whiteSpace:'nowrap'}}>*/}
                  {/*<span style={{marginRight:'5px'}}>运单编号</span>*/}
                  {/*<span style={{marginRight:'20px'}}>{item.deliver_code}</span>*/}
                  {/*<span style={{marginRight:'5px'}}>所属订单</span>*/}
                  {/*<span style={{marginRight:'20px'}}>{item.order_code}</span>*/}
                {/*</div>*/}
              {/*</Col>*/}
              {/*< Col span={6}>*/}
                {/*<div style={{textAlign:'right'}}>*/}
                  {/*<span style={{marginRight:'5px'}}>配送时间</span>*/}
                  {/*<span style={{marginRight:'10px'}}>{item.dispatch_date}</span>*/}
                {/*</div>*/}
              {/*</Col>*/}
            {/*</div>*/}
          {/*</Row>*/}
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={5}>
              <div className={'my-custom-center'}>
                {item.goods_name}
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                {item.recv_num}吨
              </div>
            </Col>
            {/*<Col span={4}>*/}
              {/*<div className={'my-custom-center'}>待分配&nbsp;{item.recv_num-item.load_num}吨</div>*/}
              {/*<div className={'my-custom-center'}>已运输&nbsp;{item.load_num}吨</div>*/}
              {/*<div className={'my-custom-center'} style={{color:'red'}}>{item.recv_num-item.load_num<0?"订单已修改需重新调度":""}</div>*/}
            {/*</Col>*/}
            <Col span={4} >
              <div className={'my-custom-center'}>张三&nbsp;15987689098</div>
            </Col>
            <Col span={6}>
              <div className={'my-custom-center'}>
                <div className={'my-custom-center'}>
                  湖北黄冈
                </div>
                <div className={'my-custom-center'}>
                  白先生&nbsp;16876567898
                </div>
              </div>
            </Col>
            <Col span={6}>
              <div className={'my-custom-center'}>
                浙江杭州
              </div>
              <div className={'my-custom-center'}>
                李先生&nbsp;16876567898
              </div>
            </Col>
            {/*<Col span={3}>*/}
              {/*<div className={'my-custom-center'} style={{cursor:'pointer'}}  onClick={this.showMap}>*/}
                {/*<Icon type="environment-o" />地图*/}
              {/*</div>*/}
            {/*</Col>*/}
          </Row>
          <Row>
            <Col>
              <div style={{textAlign:'right',padding:'10px 0'}}>
                <span onClick={this.showMap} style={{color:'#3477ED',marginRight:'20px',padding:'10px 0',cursor:'pointer'}}>
                    <Icon type="environment-o" />地图
                  </span>
              </div>
            </Col>
          </Row>
        </div>
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
export default ExitWayBillDetailTd;
