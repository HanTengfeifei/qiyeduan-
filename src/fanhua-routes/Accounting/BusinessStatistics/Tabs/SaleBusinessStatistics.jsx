 import React from 'react';
 import { Card, Row, Col, Tabs,Table } from 'antd';
 import { Divider } from 'antd';
 import mystyle from './tabstyle.less' ;
 import createHistory from 'history/createHashHistory';
 import {RequireUtils} from 'utils';
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
class SaleBusinessStatistics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      pagination: {pageSize:10},
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
    getTableData.bind(this)('/relation/cust-statis',params)
  }
  componentDidMount() {
    this.fetch();
  }

  myRowClick(e,record){
    createHistory().push({
      pathname: '/customerbilllistdetail/?customerid='+record.company_id2,
    })
  }
  render() {
    const {data}=this.state;
    const columns = [{
      title: '客户企业名称',
      dataIndex: 'cust_name',
      key: 'cust_name'
    },{
      title: '联系人',
      dataIndex: 'cust_contact',
      key: 'cust_contact',
    },{
      title: '联系方式',
      dataIndex: 'contact_phone',
      key: 'contact_phone',
    },{
      title: '客户余额',
      dataIndex: 'money_balance',
      key: 'money_balance',
      render: (text, record) => (
        <span>
            {text?text:0}元
          </span>
      )
    }
      ,{
        title: '累计销售',
        dataIndex: 'weight_total',
        key: 'weight_total',
        render: (text, record) => (
          <span>
            {text?text:0}吨
          </span>
        )
      }
      ,{
        title: '累计交易额',
        dataIndex: 'money_total',
        key: 'money_total',
        render: (text, record) => (
          <span>
            {text?text:0}元
          </span>
        )
      }
    ];
    return (
      <div className={'my-table-title-center'}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange.bind(this)}
        />
      </div >
    )
  }
}


export default  SaleBusinessStatistics;
