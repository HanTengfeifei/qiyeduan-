import React from 'react';
import { Card, Row, Col, Tabs,Select,Input,message } from 'antd';
import BalanceDetailTable from './BalanceDetailTable' ;
import BalanceDetailsSumTable from './BalanceDetailsSumTable' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const { TextArea } = Input;
class BalaceDetailList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yundan:[],
      finish:[{}],
      memo:"",
      currentkey:0
    } ;
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  fetch(){
    var _this = this ;
    var search = this.props.location.search ;
    var id = search.split("=")[1] ;
    RequireUtils.baseRequire("order-finish/finish-details",{order_id:id},function (data) {
      if(data.code==1) {
        var finish = data.data.finish ;
        var yundan = data.data.yundan ;
        var nfinish = finish.map(function (item,index) {
          item.key = index ;
          item.editable = false ;
          return item ;
        }) ;
        var nyundan = yundan.map(function (item,index) {
          item.key = index ;
          var ncar = item.cars.map(function (myitem,myindex) {
            myitem.editable = false ;
            myitem.key= myindex ;
            return myitem
          }) ;
          item.cars = ncar ;
          return item ;
        }) ;
        _this.setState({
          finish:nfinish,
          yundan:nyundan,
          memo:nfinish[0].memo
        }) ;
      }else{
        _this.setState({
          yundan:[],
          finish:[{}],
          memo:""
        })
      }
    }.bind(this))
  }
  textareachange(e){
    var value = e.target.value ;
    this.setState({
      memo:value
    })
  }
  componentDidMount(){
    this.fetch() ;
  }

  render() {
    const {finish,yundan,memo} = this.state ;
    const pthis = this ;
    const textarear = finish[0].editable? <div style={{marginTop:'5px'}}>
                                  <TextArea  placeholder={'请输入额外费用说明'}  value={memo} onChange={(e)=>this.textareachange(e)}/>
                                </div>:"" ;
    return (
      <div >
        <Row>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <div style={{padding:'25px 15px'}}>
                <span style={{fontSize:'20px',fontWeight:'bold'}}>结算单详情</span>
            </div>
            <Card hoverable type="card">
              {
                yundan.map(function (item,index) {
                  item.key = index ;
                  return <BalanceDetailTable yundan={item} mykey={index} key={index} pthis={pthis} go={pthis.fetch}></BalanceDetailTable>
                })
              }

              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>结算信息</Col>
              </Row>
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col>
                  <BalanceDetailsSumTable finish={finish} pthis={pthis} go={pthis.fetch}></BalanceDetailsSumTable>
                </Col>
                <Col>
                  {textarear}
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default BalaceDetailList;
