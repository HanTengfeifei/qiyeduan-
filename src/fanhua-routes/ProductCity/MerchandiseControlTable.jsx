import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider,message } from 'antd';
import MerchandiseControlTd from './MerchandiseControlTd' ;
import {RequireUtils} from 'utils';
import {config} from 'utils';
import './MerchandiseControlTd.less';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MerchandiseControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      pagination:{page:1,pageSize:5,},
      data: [
       ]
    };
this.FindProductionAll=this.FindProductionAll.bind(this);
this.handleTableChange=this.handleTableChange.bind(this);
this.transformObjToArry=this.transformObjToArry.bind(this);
  }
  fetch = (params ) => {
    this.setState({ loading: false });
  } ;
  handleTableChange = (pagination, filters, sorter) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      limit: pagination.pageSize,
      page: pagination.current,
    });
  };
  componentDidMount(){
    const obj={};
    obj.page=1;
    obj.limit=5;
    this.fetch(obj);
  }
  transformObjToArry(obj){
    var arr = [];
    for(var item in obj){
      arr.push(obj[item]);
    }
    return arr;
  }
  FindProductionAll(){
    const obj={};
    obj.page=1;
    obj.limit=5;
    this.fetch(obj);
  }
  render() {
    // console.log( this.props.goods instanceof Array);

    const columns = [{
      title: '商品',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <div className="yinying">
        <MerchandiseControlTd  text={text} item={record}></MerchandiseControlTd>
        <div  style={{height:6,backgroundColor:'#e5e6e9',width :'100%'}}/>
        </div>
      )
    }];
    return (
      <div style={{width:"100%"}} >
        <Table showHeader={false} className={'no-padding'} columns={columns} dataSource={this.props.goods instanceof Array ? this.props.goods : this.transformObjToArry(this.props.goods)}
               pagination={false}
               loading={this.state.loading}
               // onChange={this.handleTableChange}
        />
      </div >
    )
  }
}
export default MerchandiseControl;
