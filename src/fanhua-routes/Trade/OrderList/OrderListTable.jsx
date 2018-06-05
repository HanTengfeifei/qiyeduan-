import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch} from 'antd';
import OrderListTd from './OrderListTd' ;
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
import MyDetailButton from './MyDetailButton' ;
import mystyle from './tabstyle.less';
import {Divider} from  'antd' ;
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


class OrderListTable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      pagination: {pageSize:10},
      data: [],
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
    var myobj  = {order_status:this.props.order_status,kind:1} ;
    var obj = Object.assign(myobj,params) ;
    getTableData.bind(this)('order/order-list',obj)
  }

  componentDidMount() {
    this.fetch();
  }

  myRowClick(e,record){
    if(e.target.tagName=="BUTTON"){
      return false ;
    }
    createHistory().push({
      pathname: '/orderlistdetail/?orderid='+record.id
    })
  }

  componentWillReceiveProps(nextProps){
    var oldstatus = this.state.order_status;
    if(oldstatus == 0){
      oldstatus = 0 ;
    }else{
      oldstatus = this.state.order_status? this.state.order_status:'';
    }
    var newstatus = nextProps.order_status ;
    if(newstatus==0){
      newstatus = 0 ;
    }else{
      newstatus = nextProps.order_status? nextProps.order_status:'';
    }

    if(oldstatus===newstatus){
      return false;
    } else {
      getTableData.bind(this)('order/order-list',{order_status:nextProps.order_status,kind:1});
    }
  }

  render() {
    const {data}=this.state;
    const columns = [{
      title: '商品',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <OrderListTd   item={record} go={()=>this.fetch(this.state.pagination)}></OrderListTd>
      )
    }];

    return (
      <div className={'specital-table'}>
        <Row style={{marginBottom:'3px'}}>
          <div>
            < Col span={3}>
              <div className={'my-center'}>
                商品
              </div>
            </Col>
            < Col span={4}>
              <div className={'my-center'}>
                配送方式
              </div>
            </Col>
            < Col span={3}>
              <div className={'my-center'}>
                价格
              </div>
            </Col>
            < Col span={3}>
              <div className={'my-center'}>
                商品数量
              </div>
            </Col>
            < Col span={3}>
              <div className={'my-center'}>
                订单金额
              </div>
            </Col>
            < Col span={4}>
              <div className={'my-center'}>
                订单状态
              </div>
            </Col>
            < Col span={4}>
              <div className={'my-center'}>
                操作
              </div>
            </Col>
          </div>
        </Row>
        <Divider></Divider>
        <Table
          showHeader={false}
          className={'no-padding'}
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
      </div >
    )
  }
}
export default OrderListTable;
