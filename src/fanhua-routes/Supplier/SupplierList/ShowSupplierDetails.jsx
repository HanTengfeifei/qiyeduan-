import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Upload } from 'antd';
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
import { Divider } from 'antd';
import BasicMessage from './BasicMessage' ;
import AccountingMessage from './AccountingMessage' ;
import ShowSupplierDetailsTable from './ShowSupplierDetailsTable' ;
import ShowSupplierAddrDetailsTable from './ShowSupplierAddrDetailsTable' ;
import MyAvatar from './MyAvatar' ;
import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ShowCustomerDetails extends React.Component {
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
    var allparams = search.split("&") ;
    var id = allparams[0].split("=")[1] ;
    var myid = allparams[1].split("=")[1] ;
    RequireUtils.baseRequire("relation/supp-details",{supp_id:id},function (data) {
      if(data.code==1) {
        var list = data.data ;
        var mycust = list.cust ;
        mycust.myid = myid ;
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
        <div style={{padding:'25px 15px'}}>
            <span style={{fontSize:'20px',fontWeight:'bold'}}>供应商详情</span>
        </div>
        <Card  type="card">
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>企业基本信息</Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={18}>
              <BasicMessage cust={cust} ></BasicMessage>
            </Col>
            <Col span={6} className={'my-custom-upload'}>
              <Upload
                {...props}
                fileList={fileList}
                showUploadList={{showPreviewIcon:true,showRemoveIcon:false}}
              >
                {fileList.length >= 1 ? null : ""}
              </Upload>
              <br/>
              <div className={'my-text-center'}>营业执照</div>
            </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>财务信息</Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={18}>
              <AccountingMessage cust={cust} statistics={statistics}></AccountingMessage>
            </Col>
            <Col span={6}>
            </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>
              <div>
                <span>订单信息</span>
                <span style={{float:'right',marginRight:'10px'}}>
                  <span style={{marginRight:'10px'}}><span style={{fontSize:'14px',fontWeight:100}}>累计采购额&nbsp;</span><span className={'my-customer-color'}>￥{statistics.total_money}万</span></span>
                  <span><span style={{fontSize:'14px',fontWeight:100}}>累计采购量&nbsp;</span><span className={'my-customer-color'}>{statistics.total_num}吨</span></span>
                </span>
              </div>
            </Col>
          </Row>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col><ShowSupplierDetailsTable order={order}></ShowSupplierDetailsTable></Col>
          </Row>
          {/*<Row gutter={8} style={{ marginTop: '10px' }}>*/}
            {/*<Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>场站信息</Col>*/}
          {/*</Row>*/}
          {/*<Row gutter={8} style={{ marginTop: '10px' }}>*/}
            {/*<Col><ShowSupplierAddrDetailsTable addr={addr    }></ShowSupplierAddrDetailsTable></Col>*/}
          {/*</Row>*/}
        </Card>
      </div >
    )
  }
}
export default ShowCustomerDetails;
