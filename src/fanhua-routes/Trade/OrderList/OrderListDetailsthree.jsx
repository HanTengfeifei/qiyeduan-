import React from 'react';
import { Card, Row, Col, Tabs, Select,Rate,Input,Button  } from 'antd';
import {RequireUtils} from 'utils';
import { Divider } from 'antd';
import BasicMessageThree from './BasicMessageThree' ;
import OrderListDetailsAddrTableThree from './OrderListDetailsAddrTableThree' ;
import OrderListDetailsYunTablethree from './OrderListDetailsYunTablethree' ;
import OrderListDetailsSumTableThree from './OrderListDetailsSumTableThree' ;
import MyAssetMessage from './MyAssetMessage' ;
import mystyle from './tabstyle.less'

const { TextArea } = Input;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

function getAddress(address){
  var addstr = "" ;
  if(address.length>0){
    addstr =  <div>
                <Row gutter={8} style={{ marginTop: '10px' }}>
                  <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>地址信息</Col>
                </Row>
                <Row gutter={8} style={{ marginTop: '10px' }}>
                  <Col><OrderListDetailsAddrTableThree address = {address} ref={"order_address"} _pmyself={this}></OrderListDetailsAddrTableThree></Col>
                </Row>
             </div>
  }
  return addstr ;
}

function getYunDan(yundan,order)  {
  var addstr = "" ;
  if(yundan.length>0){
    addstr =  <div>
      <Row gutter={8} style={{ marginTop: '10px' }}>
        <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>运单信息</Col>
      </Row>
      <Row gutter={8} style={{ marginTop: '10px' }}>
        <Col><OrderListDetailsYunTablethree yundan={yundan} order={order}></OrderListDetailsYunTablethree></Col>
      </Row>
    </div>
  }
  return addstr ;
}

function getFinish(finish) {
    var addstr = "" ;
    if(finish.length>0){
      addstr =  <div>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>结算信息</Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col><OrderListDetailsSumTableThree finish={finish}></OrderListDetailsSumTableThree></Col>
        </Row>
      </div>
    }
    return addstr ;
}

/**
 * 更改评价信息
 * @param value
 */
function messageChange(value) {
  var len = value.length ;
  if(len<=100){
    this.setState({
      assetMessage:value,
      hasused:len
    })
  }

}



/**
 * 评价按钮
 */
function assetOp(id) {
  var obj = {order_id:id} ;
  var rateStar = this.state.rateValue ;
  var assetMessage = this.state.assetMessage ;
  obj["comment_rank"] = rateStar ;
  obj["comment_text"] = assetMessage ;
  var currentDate = new Date() ;
  var month = currentDate.getMonth()<10?"0"+currentDate.getMonth():currentDate.getMonth() ;
  var mydate =  currentDate.getDate()<10?"0"+currentDate.getDate():currentDate.getDate() ;
  var ndate = currentDate.getFullYear() + "-" + month +"-"+mydate ;
  obj['comment_date'] = ndate ;
  RequireUtils.baseRequire('order-finish/add-comment',obj,function (data) {
    if (data.code)
    {
      alert(data.msg);
      this.setState({
        loading:false,
        rateValue:0,
        assetMessage:""
      }) ;
      window.location.reload() ;
    }else{
      alert(data.msg);
      this.setState({
        loading:false
      }) ;
    }
  }.bind(this));
}

function getRateStar(order) {
  var addstr = "" ;
  var rateValue = this.state.rateValue ;
  var mycomment = this.state.comment ;
  const {hasused} = this.state ;
  if(order.order_status==5){
    addstr = <div>
                <Row gutter={8} style={{ marginTop: '10px' }}>
                  <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>评价信息</Col>
                </Row>
                <Row gutter={8} style={{ marginTop: '10px' }}>
                  <Col span={8}>
                    <span>
                      <Rate onChange={this.rateHandleChange} value={rateValue} />
                    </span>
                    <TextArea style={{marginBottom:'10px'}} autosize={{ minRows: 6, maxRows: 15 }}  maxLength={'100'}  onChange={(e) => messageChange.bind(this)(e.target.value)}/>
                    <div style={{textAlign:'right'}}>
                      <span style={{float:'left'}}>字数限制&nbsp;{hasused}/100</span>
                      <span>
                        <Button type={'primary'} style={{verticalAlign:'bottom'}} onClick={()=>assetOp.bind(this)(order.id)}>评价</Button>
                      </span>
                    </div>
                  </Col>
                  <Col span={2}></Col>
                  <Col span={14} >
                    <div>
                      <div>
                        {
                          mycomment.map(function (item,index) {
                            return <MyAssetMessage rate={item} key={index}></MyAssetMessage>
                          })
                        }
                      </div>
                    </div>
                  </Col>
                </Row>
              </div> ;
  }
  return addstr ;
}

class OrderListDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      order:{},
      address:[],
      deleteaddress:[],
      myoldnum:[],
      yundan:[],
      finish:[],
      comment:[],
      rateValue:0,
      assetMessage:"",
      hasused:0
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

   fetch(){
    var _this = this ;
    var search = this.props.location.search ;
    var id = search.split("=")[1] ;
    RequireUtils.baseRequire("order/order-details",{id:id},function (data) {
      if(data.code==1) {
        var data = data.data ;
        var address = data.address ;
        var oldaddress = address ;
        const naddress = address.map(function (item,index) {
          item.key= index ;
          item.editable = false ;
          return item ;
        }) ;
        const mynaddress = oldaddress.map(function (item,index) {
          var obj = {} ;
          obj.myindex = index ;
          obj.recv_sum = item.recv_sum ;
          return obj ;
        }) ;
        var nyundan = data.yundan.map(function (item,index) {
          item.key= index ;
          return item ;
        }) ;
        var nfinish = data.finish.map(function (item,index) {
          item.key= index ;
          return item ;
        }) ;
        _this.setState({
          order:data.order,
          address:naddress,
          myoldnum:mynaddress,
          yundan:nyundan,
          finish:nfinish,
          comment:data.comment
        })
      }else{
        _this.setState({
          order:{},
          address:[],
          myoldnum:[],
          yundan:[],
          finish:[]
        })
      }
    }.bind(this))
  }

  componentDidMount() {
    this.fetch() ;
  }
  rateHandleChange= (value) => {
    this.setState({rateValue:value  });
  }
  render() {
    const {  order,
            address,
            finish,
            yundan
    } = this.state ;
    const myaddress = getAddress.bind(this)(address) ;
    const myyundan = getYunDan.bind(this)(yundan,order) ;
    const myfinish = getFinish.bind(this)(finish) ;
    const rateStar = getRateStar.bind(this)(order) ;
    return (
      <div >
        <div style={{padding:'25px 15px'}}>
            <span style={{fontSize:'20px',fontWeight:'bold'}}>订单详情</span>
        </div>
        {/*<div style={{background:'white',border:'1px solid #CFCFCF'}}>*/}
          {/*<Row gutter={8} style={{ marginTop: '10px' }}>*/}
            {/*<Col>*/}
              {/*<BasicMessageThree order={order} _pmyself={this} go={this.fetch}></BasicMessageThree>*/}
            {/*</Col>*/}
          {/*</Row>*/}
        {/*</div>*/}
        <Card hoverable type="card">
          <div>
            <Row gutter={8} style={{ marginTop: '10px' }}>
              <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>商品信息</Col>
            </Row>
            <Row gutter={8} style={{ marginTop: '10px',padding:'15px 0', background: '#fafafa',borderBottom: '1px solid #e8e8e8',marginBottom:'15px'}}>
              <Col span={4}>
                <div style={{textAlign:'center',color:'rgba(0, 0, 0, 0.85)'}}>商品名称</div>
              </Col>
              <Col span={4}>
                <div  style={{textAlign:'center',color:'rgba(0, 0, 0, 0.85)'}}>数量(吨)</div>
              </Col>
              <Col span={4}>
                <div  style={{textAlign:'center',color:'rgba(0, 0, 0, 0.85)'}}>单价（元/吨）</div>
              </Col>
              <Col span={6}>
                <div  style={{textAlign:'center',color:'rgba(0, 0, 0, 0.85)'}}>卖方信息</div>
              </Col>
              <Col span={6}>
                <div  style={{textAlign:'center',color:'rgba(0, 0, 0, 0.85)'}}>买方信息</div>
              </Col>
            </Row>
            <Row>
              <Col span={4}>
                <div style={{textAlign:'center'}}>&nbsp;</div>
                <div  style={{textAlign:'center'}}>{order.goods_name}</div>
              </Col>
              <Col span={4}>
                <div style={{textAlign:'center'}}>&nbsp;</div>
                <div  style={{textAlign:'center'}}>{order.goods_num}</div>
              </Col>
              <Col span={4}>
                <div style={{textAlign:'center'}}>&nbsp;</div>
                <div  style={{textAlign:'center'}}>{order.goods_price}</div>
              </Col>
              <Col span={6}>
                <div style={{textAlign:'center'}}>{order.saler_name}</div>
                <div style={{textAlign:'center',color:'#9B9B9B'}}>{order.saler_contact_name?order.saler_contact_name:'无联系人'}</div>
                <div style={{textAlign:'center',color:'#9B9B9B'}}>{order.saler_contact_mobile?order.saler_contact_mobile:'无联系方式'}</div>
              </Col>
              <Col span={6}>
                <div style={{textAlign:'center'}}>{order.buyer_name}</div>
                <div style={{textAlign:'center',color:'#9B9B9B'}}>{order.buyer_contact_name?order.buyer_contact_name:'无联系人'}</div>
                <div style={{textAlign:'center',color:'#9B9B9B'}}>{order.buyer_contact_mobile?order.buyer_contact_mobile:'无联系方式'}</div>
              </Col>
            </Row>
            <Divider/>
            <Row>
              <Col>
                <div style={{'color':'#6C6C6C',textAlign:'right'}}>商品总计：￥{order.order_sum?order.order_sum:0}（多含7.5%订单金额）</div>
              </Col>
            </Row>
            <Divider/>
          </div>
          {myaddress}
          {myyundan}
          {myfinish}
          {rateStar}
        </Card>
      </div >
    )
  }
}
export default OrderListDetails;
