import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider } from 'antd';
import YunBillListTd from './YunBillListTd' ;
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';

import createHistory from 'history/createHashHistory';
import { Link } from 'dva/router';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class OrderListDetailsAddrTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  myRowClick(e,record,order){
    createHistory().push({
      pathname: '/waybilldetaillist/?waybillid='+record.id+'&goodsname='+order.goods_name
    })
  }

  render() {
    const {yundan,order}=this.props;
    const columns = [{
      title: '商品',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <YunBillListTd item={record} order={order}></YunBillListTd>
      )
    }];

    return (
      <div className={'my-table-title-center specital-table'}>
        <Row style={{marginBottom:'3px'}} className={'order-yundan-specital-table'}>
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
            showHeader={false}
            pagination={{ position: 'none' }}
            className={'no-padding'}
            columns={columns}
            dataSource={yundan}
            loading={this.state.loading}
            onRow={(record) => {
            return {
              onClick: (e) => this.myRowClick(e,record,order),       // 点击行
            };
      }}
          />
      </div >
    )
  }
}
export default OrderListDetailsAddrTable;
