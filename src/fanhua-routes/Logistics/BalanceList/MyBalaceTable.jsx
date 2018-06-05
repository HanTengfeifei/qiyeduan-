import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import MyCustomTd from './MyCustomTd' ;
import tablestyle from './tablestyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MyBalaceTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
        <Table className={'no-padding'} showHeader={false} columns={columns} dataSource={data} bordered={'false'}/>
      </div >
    )
  }
}
export default MyBalaceTable;
