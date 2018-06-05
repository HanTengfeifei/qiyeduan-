import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Upload } from 'antd';
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
import { Divider } from 'antd';
import BasicMessage from './BasicMessage';
import ShowCarDetailsTable from './ShowCarDetailsTable' ;
// import MyAvatar from './MyAvatar' ;
// import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;
class ShowCarDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cust:{},
      addr:[],
      order:[],
      fileList:[],
      statistics:{}
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentDidMount() {
    var _this = this ;
    var search = this.props.location.search ;
    var allparams = search.split("=") ;
    var id = allparams[1];
    RequireUtils.baseRequire("",{id:id},function (data) {
      if(data.code==1) {
        var list = data.data ;
        var mycust = list.cust ;
        /* var keyList = list.map(function (item,index) {
           item.key = index ;
           return item ;
         }) */;
        this.setState({
          cust:mycust,
          addr:list.addr,
          order:list.order,
          statistics:list.statistics,
          fileList:[{
            uid: -1,
            name: 'xxx.png',
            status: 'done',
            url: list.cust.license_url,
          }]
        })
      }else{
        this.setState({
          cust:{},
          addr:[],
          order:[],
          statistics:{}
        })
      }
    }.bind(this))
  }
  render() {
    const {cust,addr,order,fileList,statistics} = this.state ;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType:"picture-card"
    };
    return (
      <div >
        <Card hoverable title="重车查看详情" type="card" >
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>车辆信息</Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={18}>
              <BasicMessage cust={cust} ></BasicMessage>
            </Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={18}>
            </Col>
            <Col span={6}>
            </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>
              <div>
                <span>出车信息</span>
                <span style={{float:'right',marginRight:'10px'}}>
                  <span style={{marginRight:'10px'}}><span style={{fontSize:'14px',fontWeight:100}}>累计销售额&nbsp;</span><span className={'my-customer-color'}>￥{statistics.total_money}万</span></span>
                  <span><span style={{fontSize:'14px',fontWeight:100}}>累计销售量&nbsp;</span><span className={'my-customer-color'}>{statistics.total_money}吨</span></span>
                </span>
              </div>
            </Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col><ShowCarDetailsTable order={order}></ShowCarDetailsTable></Col>
          </Row>
        </Card>
      </div >
    )
  }
}
export default ShowCarDetails;
