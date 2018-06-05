import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider } from 'antd';
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
import mystyle from './tabstyle.less' ;
import MyFieldStationListTable from './FieldStationListTable' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class FieldStationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      info:{},
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
    var id = search.split("=")[1] ;
    RequireUtils.baseRequire('/addr/addr-order',{id:id},function (data) {
      if(data.code==1) {
        var info = data.data.info ;
        var order = data.data.order ;
        var keyList = order.map(function (item,index) {
          item.key = index ;
          return item ;
        }) ;
        var statistics = data.data.statistics ;
        _this.setState({
          info:info,
          data:keyList,
          statistics:statistics
        });
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }

  render() {
    const {data,
      info,
      statistics}=this.state;
    const columns = [{
      title: '订单编号',
      dataIndex: 'deliver_code',
      key: 'deliver_code'
      ,
    }, {
      title: '商品名称',
      dataIndex: 'goods_name',
      key: 'goods_name',
    },{
      title: '供应商',
      dataIndex: 'company_name',
      key: 'company_name',
    },{
      title: '商品数量',
      dataIndex: 'goods_num',
      key: 'goods_num',
      render:(text,record)=>(
        <span>{text}吨</span>
      )
    }];

    const typeids = {0:"液厂",1:"接收站",2:"加气站",3:"气化站"} ;
    const typeid = typeids[info.type_id] ;
    return (
      <div className={'my-table-title-center'}>
        <Row gutter={8} style={{ marginTop: '15px' }}>
          <Col span={24}>
            <div style={{padding:'25px 15px'}}>
                <span style={{fontSize:'20px',fontWeight:'bold'}}>场站详情</span>
            </div>
            <Card  type="card" >
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col style={{fontSize:'16px',color:'black',marginBottom:'10px'}}>场站基本信息</Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col span={8}>
                  <div>
                    <span className={'my-custom-title'}>场站名称</span>
                    <span>{info.addr_name}</span>
                  </div>
                  </Col>
                  <Col span={8}>
                    <div >
                      <span className={'my-custom-title'}>归属公司</span>
                      <span>{info.company_name}</span>
                    </div>
                  </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col span={8}>
                  <div>
                    <span className={'my-custom-title'}>站点联系人</span>
                    <span>{info.user_name}</span>
                  </div>
                </Col>
                <Col span={8}>
                  <div >
                    <span className={'my-custom-title'}>联系电话</span>
                    <span>{info.user_mobile}</span>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col span={8}>
                  <div >
                    <span className={'my-custom-title'}>场站地点</span>
                    <span>{info.addr_province}{info.addr_city}{info.addr_county}{info.addr_detail}</span>
                  </div>
                </Col>
                <Col span={8}>
                  <div >
                    <span className={'my-custom-title'}>场站类型</span>
                    <span>{typeid}</span>
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: '10px' }}>
                <Col span={8}>
                  <div>
                    <span className={'my-custom-title'}>站点存储</span>
                    <span>{info.addr_capacity}吨</span>
                  </div>

                </Col>
                <Col span={8}>
                  <div>
                    <span className={'my-custom-title'}>加液枪数量</span>
                    <span>{info.addr_gun}</span>
                  </div>
                </Col>
              </Row>
              <Divider></Divider>
              <div style={{marginBottom:'20px'}}>
                <span style={{fontSize:'16px',fontWeight:'500',color:'rgba(0, 0, 0, 0.85)'}}>采购信息</span>
                <span style={{float:'right',marginRight:'10px'}}>
                    <span>上月采购</span>
                    <span className={'yellow-mark'}>{statistics.last_month}吨</span>
                    <span>累计销售量</span>
                    <span className={'yellow-mark'}>{statistics.all}吨</span>
                </span>
              </div>
              <Table  columns={columns} dataSource={data} />
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default FieldStationList;
