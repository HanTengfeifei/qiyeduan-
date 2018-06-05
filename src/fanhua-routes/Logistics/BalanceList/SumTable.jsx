import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Input } from 'antd';
import mystyle from './tablestyle.less' ;
import {RequireUtils} from 'utils';

import createHistory from 'history/createHashHistory';
import { Link } from 'dva/router';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const Search = Input.Search;

function myHandleTableChange(pagination, filters, sorter) {
  const pager = this.state.pagination;
  pager.current = pagination.current;
  pager.limit = pagination.pageSize ;
  this.setState({
    pagination: pager,
  });
  this.fetch({
    pageSize: pagination.pageSize,
    limit:pagination.pageSize,
    page:pagination.current,
    currentPage: pagination.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
}

function getTableData(url,params) {
  RequireUtils.baseRequire(url,params,function (data) {
    if(data.code==1) {
      var list = data.data.list ;
      var keyList = list.map(function (item,index) {
        item.key = index ;
        return item ;
      }) ;
      const pagination = this.state.pagination;
      pagination.limit = pagination.pageSize ;
      pagination.total = data.data.count;
      this.setState({
        loading: false,
        data:keyList,
        pagination
      });
    }else{
      this.setState({data:[]})
    }
  }.bind(this))
}



class SumTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {pageSize:10},
      data: [],
      loading: false,
      searchparams:{find_str:"",s_date:"",e_date:""}
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

  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    getTableData.bind(this)('/order-finish/finish-list',params)
  }
  componentDidMount() {
    this.fetch();
  }


  changeSearchParams = (filed,value) => {
    const {searchparams} = this.state ;
    searchparams[filed] = value ;
    this.setState({
      searchparams: searchparams
    });
  };

  search=()=>{
    var {searchparams} = this.state ;
    this.fetch(searchparams) ;
  };

  myRowClick(e,record){
    createHistory().push({
      pathname: '/balacedetaillist/?orderid='+record.order_id
    })
  }

  myselfonkeydown(e){
    if(e.keyCode == 13){
      this.search();
    }
  }

  render() {
    const {data}=this.state;
    console.log(data) ;
    const columns = [{
      title: '结算量',
      dataIndex: 'goods_num',
      key: 'goods_num',
      render: (text, record) => (
        <span>
          {text} 吨
        </span>
      )
    }, {
      title: '价格',
      dataIndex: 'goods_price',
      key: 'goods_price',
      render: (text, record) => (
        <span>
          {text} 元/吨
        </span>
      )
    },{
      title: '运费',
      dataIndex: 'deliver_fee',
      key: 'deliver_fee',
      render: (text, record) => (
        <span>
          {text} 元
        </span>
      )
    },{
      title: '结算金额',
      dataIndex: 'summary_fee',
      key: 'summary_fee',
      render: (text, record) => (
        <span>
          {text} 元
        </span>
      )
    },{
      title: '额外费用',
      dataIndex: 'extra_fee',
      key: 'extra_fee',
      render: (text, record) => (
        <span>
          {text} 元
        </span>
      )
    },{
      title: '状态',
      dataIndex: 'status_name',
      key: 'status_name'
    }];

    return (
      <div className={'my-table-title-center-orderlistdetail'} onKeyDown={(e)=>this.myselfonkeydown.bind(this)(e)}>
           <Row>
            <Col span={16}></Col>
            <Col span={6}>
              <div style={{padding:'10px 0'}}>
                <Input
                  placeholder="搜索企业名称、场站名称"
                  size="large"
                  onChange={(e)=>this.changeSearchParams.bind(this)('find_str',e.target.value)}
                />
              </div>
            </Col>
            <Col span={2}>
              <div style={{padding:'10px 0'}}>
                <Button icon="search" size='large' onClick={this.search.bind(this)}>查询</Button>
              </div>
            </Col>
          </Row>
        <Card hoverable title="" type="card">
          <Table
            columns={columns}
            dataSource={data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            onRow={(record) => {
              return {
                onClick: (e) => this.myRowClick(e,record),       // 点击行
              };
            }}
          />
        </Card>
      </div >
    )
  }
}
export default SumTable ;
