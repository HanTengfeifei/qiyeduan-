import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ShowCustomerDetailsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
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


  render() {
    const {order} = this.props ;
    const keyList = order.map(function (item,index) {
      item.key = index ;
      return item ;
    }) ;
    const columns = [{
      title: '订单编号',
      dataIndex: 'order_code',
      key: 'order_code',
      width:300
    }, {
      title: '商品名称',
      dataIndex: 'goods_name',
      key: 'goods_name',
      width:165
    },{
      title: '商品数量',
      dataIndex: 'goods_num',
      key: 'goods_num',
      width:243,
      render: (text, record) => (
        <span>
           {text}吨
        </span>
      )
    },{
      title: '订单金额',
      dataIndex: 'order_sum',
      key: 'order_sum',
      width:243,
      render: (text, record) => (
        <span>
           {text}元
        </span>
      )
    },{
      title: '订单状态',
      dataIndex: 'status_name',
      key: 'status_name',
      width:243
    }];
    return (
      <div className={'my-table-title-center'}>
        <Table columns={columns} dataSource={keyList}  pagination={{ position: 'none' }} scroll={{ y: 360 }}/>
      </div >
    )
  }
}
export default ShowCustomerDetailsTable;
