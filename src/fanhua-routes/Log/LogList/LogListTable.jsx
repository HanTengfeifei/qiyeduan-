import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class LogListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key: '2',
        loginuser:'1800000000000001',
        loginip: '114.114.114.144',
        device: "移动",
        type: '新增',
        result:'成功',
        time:"2017-10-15 12:23:12",
      }]
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
    const {data}=this.state;
    const columns = [{
      title: '登陆账号',
      dataIndex: 'loginuser',
      key: 'loginuser'
    }, {
      title: '登陆IP',
      dataIndex: 'loginip',
      key: 'loginip',
    },{
      title: '访问设备',
      dataIndex: 'device',
      key: 'device',
    },{
      title: '操作类型',
      dataIndex: 'type',
      key: 'type',
    },{
      title: '状态',
      dataIndex: 'type',
      key: 'type',
    },{
      title: '操作时间',
      dataIndex: 'time',
      key: 'time',
    }
     ];

    return (
      <div>
        <Table columns={columns} dataSource={data} />
      </div >
    )
  }
}
export default LogListTable;
