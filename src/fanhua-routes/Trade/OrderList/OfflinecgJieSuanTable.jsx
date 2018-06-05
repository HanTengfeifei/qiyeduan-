import React from 'react';
import { Tabs, Select,Table,Input } from 'antd';
import {RequireUtils} from 'utils';
import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class offlineJieSuanTable extends React.Component {
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

  fetch(params = {}) {

  }
  componentDidMount() {
    this.fetch();
  }
  myjsinputChange(e,clumn,record){
    var value = e.target.value ;
    const {pthis} = this.props ;
    const {jiesuanoptions} = pthis.state ;
    const options = jiesuanoptions[0] ;
    options[clumn] = value ;
   var price = Number(options.price)?Number(options.price):0 ;
   var goodsnum = Number(options.goods_num)?Number(options.goods_num):0 ;
   var dfee = Number(options.deliver_fee)?Number(options.deliver_fee):0 ;
   var efee = Number(options.extra_fee)?Number(options.extra_fee):0 ;
   var money = Number(goodsnum) *Number(price)+Number(dfee)+Number(efee) ;
    options.money = money ;
   pthis.setState({
     jiesuanoptions:jiesuanoptions
   })
  }

  /*
  {
      title: '商品名称',
      dataIndex: 'goods_name',
      key: 'goods_name'
    },
  * */
  render() {
    const {pthis}=this.props;
    const jsoptions = pthis.state.jiesuanoptions ;
    const columns = [ {
      title: '采购量(吨)',
      dataIndex: 'goods_num',
      key: 'goods_num',
    },{
      title: '价格(元/吨)',
      dataIndex: 'price',
      key: 'price',
      render: (text, record) => (
        <span>{text}</span>
      )
    },{
      title: '运费(元)',
      dataIndex: 'deliver_fee',
      key: 'deliver_fee',
      render: (text, record) => (
        <span><Input onChange={(e)=>this.myjsinputChange.bind(this)(e,"deliver_fee")}/></span>
      )
    },{
      title: '额外费用',
      dataIndex: 'extra_fee',
      key: 'extra_fee',
      render: (text, record) => (
        <span><Input onChange={(e)=>this.myjsinputChange.bind(this)(e,"extra_fee")}/></span>
      )
    } ,{
        title: '结算金额(元)',
        dataIndex: 'money',
        key: 'money',
      }];

    return (
      <div className={'my-table-title-center'}>
        <Table
          columns={columns}
          dataSource={jsoptions}
          pagination={{ position: 'none' }}
          loading={this.state.loading}
        />
      </div>
    )
  }
}
export default offlineJieSuanTable;
