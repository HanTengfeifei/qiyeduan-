import React from 'react';
import { Row, Col, Tabs, Icon,Select,Modal,Button,Tooltip,Input } from 'antd';
import ShowCCarMap from './ShowCCarMap' ;
import {RequireUtils} from 'utils';
import mystyle from './tablestyle.less' ;
import UpdateXcbdList from './UpdateXcbdList' ;
import UpdateZdbdList from './UpdateZdbdList' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

function onInputChange(value, key, column){
  var {pthis,mykey} = this.props ;
  var allnums = 0 ;
  var allmoney = 0 ;
  var _this = pthis ;
  var myyundan = _this.state.yundan ;
  const finish = _this.state.finish ;
  const newData = [...myyundan[mykey].cars];
  const target = newData.filter(item => key === item.key)[0];
  if (target) {
    target[column] = value;
    if(column=='final_num'){
      for(var i=0;i<myyundan.length;i++){
        var singleyundans = myyundan[i].cars ;
        for(var j=0;j<singleyundans.length;j++){
          var item = singleyundans[j] ;
          allnums = allnums+Number(item.final_num)
        }
      }

      finish[0].goods_num = allnums ;
      const singfinish =  finish[0] ;
      singfinish.summary_fee = Number(allnums)*Number(singfinish.goods_price) + Number(singfinish.deliver_fee) + Number(singfinish.extra_fee) ;
      _this.setState({ yundan: myyundan,finish:finish });
    }else{
      _this.setState({ yundan: myyundan});
    }
  }
}


function getResult(item) {
  var str = "" ;
  var status = Number(item.car_status) ;
  var order_source = Number(item.order_source) ;
  if(order_source==0){
    if(status==7){
      str = <span style={{color:'green'}}>
              已完结
            </span>
    }else {
      str = <span>
                <Tooltip  title={item.car_memo}>
                    <span  style={{color:'red'}}>异常关闭</span>
                </Tooltip>
            </span>
    }
    return str ;
  }else{
    if(status==4){
      str = <span style={{color:'green'}}>
              运输中
            </span>
    } else if(status==5){
      str = <span style={{color:'green'}}>
              运卸载
            </span>
    } else if(status==7){
      str = <span>
                <Tooltip  title={item.car_memo}>
                    <span  style={{color:'green'}}>已完结</span>
                </Tooltip>
            </span>
    } else {
      str = <span>
                <Tooltip  title={item.car_memo}>
                    <span  style={{color:'red'}}>异常关闭</span>
                </Tooltip>
            </span>
    }
    return str ;
  }
}

class BalanceDetailChildrenTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatezcbd:false,
      updatexcbd:false,
      showmap:false,
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

  handleAddCancel = () => {
    this.refs['UpdateCar'].resetFields() ;
    this.setState({
      updatecar:false
    });
  } ;


  handleZcbdCancel(){
    this.refs['UpdateZdbdList'].resetFields() ;
    this.setState({
      zcbd:false
    });
  }

  handleXcCancel(){
    this.refs['XcbdList'].resetFields() ;
    this.setState({
      xcbd:false
    });
  }

  Addzdbd(){
    this.setState({
      updatezcbd:true
    })
  }
  Removexcbd(){
    this.setState({
      updatexcbd:true
    })
  }
  handleUpdateZdbdCancel(){
    this.refs['UpdateZdbdList'].resetFields() ;
    this.setState({
      updatezcbd:false
    });
  }
  handleUpdateXcbdCancel(){
    this.refs['UpdateXcbdList'].resetFields() ;
    this.setState({
      updatexcbd:false
    });
  }

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
    const {item,go,pthis}=this.props;
    const {updatezcbd,updatexcbd,showmap,mapData} = this.state ;
    const showstatus = getResult.bind(this)(item) ;

    var imgFiles = [{
      uid: new Date(),
      name: item.send_bill,
      status: 'done',
      url:item.send_bill // RequireUtils.ip+"resource/image/bill/"+
    }] ;
    var rimgFile=[{
      uid: "recv"+new Date(),
      name: item.send_bill,
      status: 'done',
      url: item.recv_bill //RequireUtils.ip+"resource/image/bill/"+
    }]
    return (
      <div>
        <div>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={5}>
              <div className={'my-custom-center'} style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}} >
                <span>出车单编号</span>
                <span title={item.car_code}>{item.car_code}</span>
              </div>
              <div className={'my-custom-center'}>
                <span style={{marginRight: '5px'}}>送达时间</span>
                <span>{item.end_date}</span>
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'} style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                <span style={{marginRight:'5px'}}>车头</span>
                <span>{item.head_card}</span>
              </div>
              <div className={'my-custom-center'} style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                <span style={{marginRight:'5px'}}>车挂</span>
                <span>{item.body_card}</span>
              </div>
            </Col>
            <Col span={2}>
              <div className={'my-custom-center'}>
                {item.head_contact}
              </div>
              <div className={'my-custom-center'}>
                {item.body_contact}
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'} style={{marginBottom:'5px'}}>
                <span style={{marginRight:'5px'}}>装车量</span>
                <span>
                    {item.editable&&item.car_status!=8
                      ? <Input style={{ margin: '-0px 0',width:'60px' }} value={item.send_num} onChange={e => onInputChange.bind(this)(e.target.value,item.key,'send_num')} />
                      : item.send_num
                    }吨
                </span>
              </div>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>卸车量</span>
                <span>
                   {item.editable&&item.car_status!=8
                     ? <Input style={{ margin: '-0px 0',width:'60px' }} value={item.recv_num} onChange={e => onInputChange.bind(this)(e.target.value,item.key,'recv_num')} />
                     : item.recv_num
                   }吨
                </span>
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>结算量</span>
                <span>
                   {item.editable&&item.car_status!=8
                     ? <Input style={{ margin: '-0px 0',width:'60px' }} value={item.final_num} onChange={e => onInputChange.bind(this)(e.target.value,item.key,'final_num')} />
                     : item.final_num
                   }吨
                </span>
              </div>
            </Col>
            <Col span={3}>
              {item.modify_flag?  <div className={'my-custom-center'} onClick={()=>this.Addzdbd.bind(this)()}>
                <Icon type='edit'/>修改装车磅单
              </div>:""}
              {item.modify_flag?  <div className={'my-custom-center'} onClick={()=>this.Removexcbd.bind(this)()}>
                <Icon type='edit'/>修改卸车磅单
              </div>:""}
              <div className={'my-custom-center'} onClick={()=>this.showMap(item)}>
                <Icon type="environment-o" />地图
              </div >
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                {showstatus}
              </div>
            </Col>
          </Row>
        </div>
        <Modal title="出车单地图"
               visible={showmap}
               width={'60%'}
               onOk={this.handleOk}
               onCancel={this.handleMapCancel}
               footer={null}>
          <ShowCCarMap ref="ShowCCarMap" mapData={mapData}></ShowCCarMap>
        </Modal>
        <Modal title="修改装车磅单"
               visible={updatezcbd}
               onOk={this.handleOk}
               onCancel={this.handleUpdateZdbdCancel.bind(this)}
               footer={null}>
          <UpdateZdbdList ref={"UpdateZdbdList"} item={item} imgFiles={imgFiles} handleUpdateZdbdCancel={this.handleUpdateZdbdCancel.bind(this)} go={go} pthis={pthis}></UpdateZdbdList>
        </Modal>
        <Modal title="修改卸车磅单"
               visible={updatexcbd}
               onOk={this.handleOk}
               onCancel={this.handleUpdateXcbdCancel.bind(this)}
               footer={null}>
          <UpdateXcbdList item={item}  ref={"UpdateXcbdList"} rimgFile={rimgFile} handleUpdateXcbdCancel={this.handleUpdateXcbdCancel.bind(this)} go={go}  pthis={pthis}></UpdateXcbdList>
        </Modal>
      </div >
    )
  }
}
export default BalanceDetailChildrenTd;
