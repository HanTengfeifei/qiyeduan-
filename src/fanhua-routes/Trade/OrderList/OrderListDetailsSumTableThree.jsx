import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';

import createHistory from 'history/createHashHistory';
import { Link } from 'dva/router';
const TabPane = Tabs.TabPane;
const Option = Select.Option;


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


class OrderListDetailsAddrTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {pageSize:10},
      data: [{
        company_name:"张三",
        company_contact:"里斯",
        company_type:"tt",
        contact_phone:"15876546798",
        register_addr:"浙江省杭州市iii"
      }],
      loading: false
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
    getTableData.bind(this)('relation/supp-list',params)
  }
  componentDidMount() {
    this.fetch();
  }


  myRowClick(e,record){
    createHistory().push({
      pathname: '/balacedetaillist/?orderid='+record.order_id
    })
  }

  render() {
    const {finish}=this.props;
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
      title: '额外费用',
      dataIndex: 'extra_fee',
      key: 'extra_fee',
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
    }];

    return (
      <div className={'my-table-title-center-orderlistdetail'}>
          <Table
            columns={columns}
            dataSource={finish}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            onRow={(record) => {
              return {
                onClick: (e) => this.myRowClick(e,record),       // 点击行
              };
            }}
          />
      </div >
    )
  }
}
export default OrderListDetailsAddrTable;
