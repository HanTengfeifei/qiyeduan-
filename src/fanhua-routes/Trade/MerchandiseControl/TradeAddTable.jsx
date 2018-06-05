import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class TradeAddTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key: '2',
        customername:'晋煤天庆',
        storage: '500吨',
        price: "￥45000,00",
        way: '配送',
        payway:'款到发货',
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
      title: '商品名称',
      dataIndex: 'customername',
      key: 'customername'
      ,
    }, {
      title: '库存',
      dataIndex: 'storage',
      key: 'storage',
    },{
      title: '挂牌价',
      dataIndex: 'price',
      key: 'price',
    },{
      title: '运输方式',
      dataIndex: 'way',
      key: 'way',
    },{
      title: '付款方式',
      dataIndex: 'payway',
      key: 'payway',
    }];

    return (
      <div>
        <Table rowSelection={{}} columns={columns} dataSource={data} />
      </div >
    )
  }
}
export default TradeAddTable;
