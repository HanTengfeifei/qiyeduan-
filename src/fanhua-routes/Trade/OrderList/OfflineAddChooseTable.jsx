import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import {RequireUtils} from 'utils';
import mystyle from './tabstyle.less' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class OfflineAddChooseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
    this.callback = this.callback.bind(this);
  }

  fetch(params = {}) {

  }
  componentDidMount() {
    this.fetch();
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

  tableSelect(record){
    const {pthis} = this.props ;
    const {jiesuanoptions} = pthis.state ;
    const joption = jiesuanoptions[0] ;
    joption.price = record.price ;
    var goodsnum = Number(joption.goods_num)?Number(joption.goods_num):0 ;
    var price = Number(joption.price)?Number(joption.price):0 ;
    var dfee = Number(joption.deliver_fee)? Number(joption.deliver_fee):0 ;
    var efee = Number(joption.extra_fee)?Number(joption.extra_fee):0;
    var money =price *goodsnum + dfee +　efee ;
    joption.money = money ;
    pthis.setState({
      jiesuanoptions:jiesuanoptions,
      goodeseletoptions:[record],
      goods_id:record.id
    })
  }

  handleOk = (e) => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      /* console.log(this.refs["form"]) ;
       this.refs["form"].handleSubmit(e);*/
    }, 2000);
  } ;

  /**
   * 点击确定提交
   * @param e
   */

  render() {
    const {data,pthis}=this.props;
    const columns = [{
      title: '商品名称',
      dataIndex: 'goods_name',
      key: 'goods_name',
    },{
      title: '库存(吨)',
      dataIndex: 'goods_stock',
      key: 'goods_stock',
    },{
      title: '价格(元/吨)',
      dataIndex: 'price',
      key: 'price',
    },{
      title: '运输方式',
      dataIndex: 'deliver_name',
      key: 'deliver_name'
    },{
      title: '付款方式',
      dataIndex: 'pay_type',
      key: 'pay_type',
    }];

    return (
      <div className={'my-table-title-center'}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ position: 'none' }}
          loading={this.state.loading}
          rowSelection={
            {
              type:'radio',
              onSelect:this.tableSelect.bind(this)
            }
          }
        />
      </div >
    )
  }
}
export default OfflineAddChooseTable;

