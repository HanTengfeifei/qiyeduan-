import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import ShowCarDetailsTableTd from './ShowCarDetailsTableTd' ;
// import tablestyle from '../tablestyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ShowCarDetailsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key: '2',
        code:'9272653782755380',
        porder: '927265328342342342',
        exitorder:"92726342358349573",
        time:'2017-09-09',
        name: "黄冈气",
        allnum:'140吨',
        expople:'黄先生',
        extelephone:'15678989876',
        inplace:'湖北黄冈',
        inpople:"陈先生",
        intel:"15689077658",
        place:"湖北黄冈",
        linkpeople:"黄波",
        telephone:'15678907655',
        status:'待出车'
      },
        {
          key: '2',
          code:'9272653782755380',
          porder: '927265328342342342',
          exitorder:"92726342358349573",
          time:'2017-09-09',
          name: "黄冈气",
          allnum:'140吨',
          expople:'黄先生',
          extelephone:'15678989876',
          inplace:'湖北黄冈',
          inpople:"陈先生",
          intel:"15689077658",
          place:"湖北黄冈",
          linkpeople:"黄波",
          telephone:'15678907655',
          status:'运输中'
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
      title: '',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <ShowCarDetailsTableTd item = {record}></ShowCarDetailsTableTd>
      )
    }];
    return (
      <div>
        <Table className={'no-padding'} showHeader={false} columns={columns} dataSource={data} bordered={'false'}/>
      </div >
    )
  }
}
export default  ShowCarDetailsTable;
