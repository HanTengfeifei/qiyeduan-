import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less' ;
import createHistory from 'history/createHashHistory';
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

  showPlan(record){
    createHistory().push({
      pathname: '/showplanlist?recvId='+record.id //?customerid='+id
    })
  }

  render() {
    const {addr} = this.props ;
    const keyList = addr.map(function (item,index) {
      item.key = index ;
      return item ;
    }) ;
    const columns = [{
      title: '场站名称',
      dataIndex: 'addr_name',
      key: 'addr_name',
      width:165
    },{
      title: '联系人',
      dataIndex: 'addr_contact',
      key: 'addr_contact',
      width:242
    },{
      title: '站点储罐',
      dataIndex: 'addr_gun',
      key: 'addr_gun',
      width:150,
      render: (text, record) => (
        <span>
           {text}个
        </span>
      )
    },{
      title: '执行计划',
      dataIndex: 'order_status',
      key: 'order_status',
      width:243,
      render: (text, record) => (
        <span>
            <a href="javaScript:void(0)" style={{marginRight:'10px',color:'#1890ff'}} onClick={()=>this.showPlan(record)} >查看计划</a>
        </span>
      )
    }];

    return (
      <div className={'my-table-title-center'}>
        <Table columns={columns} dataSource={keyList}  pagination={{ position: 'none' }} scroll={{ y: 360 }}/>
      </div >
    )
  }
}
export default ShowCustomerDetailsTable;
