import React from 'react';
import { Card, Row, Col, Tabs, Select,Table,Divider} from 'antd';
import MyExitListCustomTd from './MyExitListCustomTd' ;
import tablestyle from '../tablestyle.less' ;
import createHistory from 'history/createHashHistory';
import {RequireUtils} from 'utils';
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

class MyExitListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {pageSize:10},
      data: [
       ]
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

  myRowClick(e,record){
    createHistory().push({
      pathname: '/exitwaybilldetaillist/?yundanid='+record.id +"&goodsname=" + record.goods_name
    })
  }

  componentWillReceiveProps(nextProps){
    var oldstatus = this.state.cc_status;
    if(oldstatus == 0){
      oldstatus = 0 ;
    }else{
      oldstatus = this.state.cc_status? this.state.cc_status:'';
    }
    var ccstatus = nextProps.cc_status ;
    if(ccstatus==0){
      ccstatus = 0 ;
    }else{
      ccstatus = nextProps.cc_status? nextProps.cc_status:'';
    }

    if(oldstatus===ccstatus){
        return false ;
    }else{
      getTableData.bind(this)('/order-deliver/car-list',{status:nextProps.cc_status,page:this.state.pagination.current?this.state.pagination.current:1,limit:this.state.pagination.pageSize});
    }
  }

  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    getTableData.bind(this)('/order-deliver/car-list',params)
  }
  componentDidMount() {
    this.fetch({page:1,limit:this.state.pagination.pageSize});
  }

  render() {
    const {data}=this.state;
    const columns = [{
      title: '',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <MyExitListCustomTd item = {record}></MyExitListCustomTd>
      )
    }];

    return (
      <div>

        <Row style={{marginBottom:'3px'}} className={'ccd-specital-table'}>
          <div>
            < Col span={2}>
              <div className={'my-center'}>
                商品名称
              </div>
            </Col>
            < Col span={2}>
              <div className={'my-center'}>
                运载量
              </div>
            </Col>
            < Col span={6}>
              <div className={'my-center'}>
                调度
              </div>
            </Col>
            < Col span={6}>
              <div className={'my-center'}>
                装车场站
              </div>
            </Col>
            < Col span={6}>
              <div className={'my-center'}>
                卸车场站
              </div>
            </Col>
            < Col span={2}>
              <div className={'my-center'}>
                出车单状态
              </div>
            </Col>
          </div>
        </Row>
        <Divider></Divider>
        <Table
          className={'no-padding'}
          showHeader={false}
          columns={columns}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange.bind(this)}
          dataSource={data}
          onRow={(record) => {
            return {
              onClick: (e) => this.myRowClick(e,record),       // 点击行
            };
          }}
          bordered={false}/>
      </div >
    )
  }
}
export default MyExitListTable;
