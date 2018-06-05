import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch} from 'antd';
import OrderListYundanChildrenTd from './OrderListYundanChildrenTd' ;
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
import OrderListYundanTd from './OrderListYundanTd' ;
import mystyle from './tabstyle.less';
import {Divider} from  'antd' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class OrderListYundanTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      loading: false,
      tableExpand:false
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

  fetch(params = {}) {
   /* getTableData.bind(this)('order/order-list',{order_status:this.props.order_status})*/
  }
  componentDidMount() {
    this.fetch();
  }

  addExitList(){
    const {pthis,yundan} = this.props ;
    const {yundans} = pthis.state ;
    const target = yundans.filter(item => yundan.key === item.key)[0];
    var oldcars = target.cars ;
    var ncar = {
      key:new Date().getTime(),
      final_num:'',
      bill_name:"",
      recv_name:"",
      head_card:'',
      body_card:''
    };
    target.cars = [...oldcars,ncar] ;
    var yundannum = target.cars.length ;
    target.yundannum = yundannum ;
    pthis.setState({
      yundans:yundans
    })
  }

  render() {
    const {yundan,pthis,mykey}=this.props;
    const {tableExpand} = this.state ;
    const cars = yundan.cars ;
    const myyundan = [yundan] ;
    const columns = [{
      title: '商品',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <OrderListYundanTd item={record} pyundan={this} mykey={mykey} pthis={pthis} tableExpand={tableExpand}></OrderListYundanTd>
      )
    }];

    return (
      <div className={'specital-table'}>
        <Table
          showHeader={false}
          className={'no-padding'}
          columns={columns}
          pagination={{ position: 'none' }}
          dataSource={myyundan}
          loading={this.state.loading}
        />
        <div style={{display:tableExpand?'block':'none'}}>
          <div>
            {cars.map(function (item,index) {
              return <OrderListYundanChildrenTd item={item} mykey={mykey} key={index} pthis={pthis}></OrderListYundanChildrenTd>
            })}
          </div>
          <div style={{margin:'10px 0'}}>
            <Button type="dashed" onClick={this.addExitList.bind(this)} style={{ width: '100%' }}>
              <Icon type="plus" /> 添加出车单
            </Button>
          </div>
        </div>
      </div >
    )
  }
}
export default OrderListYundanTable;
