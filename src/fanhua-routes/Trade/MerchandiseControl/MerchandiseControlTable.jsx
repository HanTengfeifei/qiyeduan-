import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider,message } from 'antd';
import MerchandiseControlTd from './MerchandiseControlTd' ;
import './tabstyle.less' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MerchandiseControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      pagination:{pageSize:10,},
      data: []
    };
this.FindProductionAll=this.FindProductionAll.bind(this);
this.handleTableChange=this.handleTableChange.bind(this);
  }
  fetch = (params={} ) => {
    console.log('params:', params);
    this.setState({ loading: true });
    RequireUtils.baseRequire('goods/goods-list',params,function (data){
      if(data.code==1) {
        const pagination = { ...this.state.pagination };
        pagination.total = data.data.count;
        pagination.pageSize = pagination.pageSize ;
        this.setState({
          loading: false,
          data: data.data.list,
          pagination,
        });
      }
      else{
       message.error("获取用户信息失败");
      }
    }.bind(this));
  };
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  };
  componentDidMount() {
    const obj={};
    obj.page=1;
    obj.limit=this.state.pagination.pageSize;
    console.log(obj);
    this.fetch(obj);
  }
  FindProductionAll(){
    const obj={};
    obj.page=this.state.pagination.current;
    obj.limit=this.state.pagination.pageSize;
    console.log(obj);
    this.fetch(obj);
  }
  render() {
    const {data}=this.state;
    const columns = [{
      title: '商品',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <MerchandiseControlTd   FindProductionAll={this.FindProductionAll}    text={text} item={record}></MerchandiseControlTd>
      )
    }];
    return (
      <div className={'shop-table'}>
          <Row style={{marginBottom:'3px',padding:'0 15px'}}>
            <div>
              < Col span={3}>
                  <div className={'my-customer-table-title'}>商品名称</div>
              </Col>
              {/*< Col span={3}>*/}
                  {/*<div className={'my-customer-table-title'}>气质信息</div>*/}
              {/*</Col>*/}
              < Col span={6}>
                <div className={'my-customer-table-title'}>交易信息</div>
              </Col>
              < Col span={3}>
                <div className={'my-customer-table-title'}>挂售量(吨)</div>
              </Col>
              < Col span={3}>
                <div className={'my-customer-table-title'}>当前价格(元/吨)</div>
              </Col>
              < Col span={4}>
                <div className={'my-customer-table-title'}>当前状态</div>
              </Col>
              < Col span={5}>
                <div className={'my-customer-table-title'}>操作</div>
              </Col>
            </div>
          </Row>
           <Divider></Divider>
          <Table showHeader={false} className={'no-padding'} columns={columns} dataSource={data} pagination={this.state.pagination} loading={this.state.loading} onChange={this.handleTableChange}/>
      </div >

    )
  }
}
export default MerchandiseControl;
