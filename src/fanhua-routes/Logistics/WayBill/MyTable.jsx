import React from 'react';
import { Card, Row, Col, Tabs,Select,Table,Divider } from 'antd';
import MyCustomTd from './MyCustomTd' ;
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
import tablestyle from './tablestyle.less';
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
    kind:1,
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

class MyTable extends React.Component {
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

  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    getTableData.bind(this)('order-deliver/deliver-list',params)
  }

  componentWillReceiveProps(nextProps){

    var oldstatus = this.state.yd_status;
    if(oldstatus == 0){
      oldstatus = 0 ;
    }else{
      oldstatus = this.state.yd_status? this.state.yd_status:'';
    }
    var newstatus = nextProps.yd_status ;
    if(newstatus==0){
      newstatus = 0 ;
    }else{
      newstatus = nextProps.yd_status? nextProps.yd_status:'';
    }

    if(oldstatus===newstatus){
        return false ;
    }else{
      getTableData.bind(this)('order-deliver/deliver-list',{status:nextProps.yd_status,page:this.state.pagination.current?this.state.pagination.current:1,limit:this.state.pagination.pageSize});
    }
  }

  componentDidMount() {
    this.fetch({limit:this.state.pagination.pageSize,page:1});
  }
  myRowClick(e,record){
    createHistory().push({
      pathname: '/waybilldetaillist/?waybillid='+record.id
    })
  }
  render() {
    const {data}=this.state;
    const columns = [{
      title: '',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <MyCustomTd item = {record}></MyCustomTd>
      )
    }];

    return (
      <div>

        <Row style={{marginBottom:'3px'}} className={'yundan-specital-table'}>
          <div>
            < Col span={3}>
              <div className={'my-center'}>
                商品名称
              </div>
            </Col>
            < Col span={3}>
              <div className={'my-center'}>
                运载量
              </div>
            </Col>
            < Col span={4}>
              <div className={'my-center'}>
                运输情况
              </div>
            </Col>
            < Col span={7}>
              <div className={'my-center'}>
                卸车场站
              </div>
            </Col>
            < Col span={4}>
              <div className={'my-center'}>
                出车单数量
              </div>
            </Col>
            < Col span={3}>
              <div className={'my-center'}>
                运单状态
              </div>
            </Col>
          </div>
        </Row>
        <Divider></Divider>
        <Table
          className={'no-padding'}
          showHeader={false}
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
          bordered={false}/>
      </div >
    )
  }
}
export default MyTable;
