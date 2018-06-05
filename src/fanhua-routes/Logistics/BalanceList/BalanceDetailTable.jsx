import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal } from 'antd';
import BalanceDetailTd from './BalanceDetailTd' ;
import BalanceDetailChildrenTd from './BalanceDetailChildrenTd' ;

import tablestyle from './tablestyle.less';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class BalanceDetailTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{

      }],
      tableExpand:false
    };
    this.callback = this.callback.bind(this);
  }

  tablerowclick(e,record){
      var target = e.target ;
      var oldExpand = this.state.tableExpand ;
      if(target.tagName=='I'){
        this.setState({
          tableExpand:!oldExpand
        })
      }
  }

  componentDidMount(){

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
    const {tableExpand} = this.state ;
    const {yundan,pthis,mykey,go}=this.props;
    const myyundan = [yundan] ;
    const cars = yundan.cars ;
    const columns = [{
      title: '',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <BalanceDetailTd item = {record}  mykey={mykey} tableExpand={tableExpand} pthis={pthis} go={go}></BalanceDetailTd>
      )
    }];

    return (
      <div>
        <Table
          className={'no-padding'}
          showHeader={false}
          columns={columns}
          dataSource={myyundan}
          pagination={{ position: 'none' }}
          bordered={false}
          onRow={(record) => {
            return {
              onClick: (e) => this.tablerowclick(e,record),       // 点击行
            };
          }}
      />
        <div style={{display:tableExpand?'block':'none'}}>
          {cars.map(function (item,index) {
            return <BalanceDetailChildrenTd mykey={mykey} item={item} key={index} pthis={pthis} go={go}></BalanceDetailChildrenTd>
          })}
        </div>
      </div>
    )
  }
}
export default BalanceDetailTable;
