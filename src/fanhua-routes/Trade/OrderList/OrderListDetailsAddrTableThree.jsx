import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Input  } from 'antd';
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';
import { Link } from 'dva/router';
const TabPane = Tabs.TabPane;
const Option = Select.Option;


const EditableCell = ({ editable, value, onChange }) => (
  <div>
    {editable
      ? <Input style={{ margin: '-5px 0' }} value={value} onChange={e => onChange(e.target.value)} />
      : value
    }
  </div>
);

class OrderListDetailsAddrTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {pageSize:10},
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

  handleChange(value, key, _pmyself,column) {

    const newData = [..._pmyself.state.address];
    const oldaddress = [..._pmyself.state.myoldnum] ;
    const oldtarget = oldaddress.filter(item => key === item.myindex)[0];
    const target = newData.filter(item => key === item.key)[0];
    if (target) {
     /* if(Number(value)>Number(oldtarget.recv_sum)){
          alert("修改配送量应小于"+oldtarget.recv_sum);
          return false ;
      }else{*/
        target[column] = value;
        _pmyself.setState({ address: newData });
      /*}*/
    }
  }
  deleteData(record,_pmyself,column){
    const dataSource = [..._pmyself.state.address];
    var deletes =  _pmyself.state.deleteaddress ;
    const target = dataSource.filter(item => record.key === item.key)[0];
    if (target) {
      target[column] = 0;
      deletes.push(target) ;
    }
    var mydata = dataSource.filter(item => item.key !== record.key)  ;
    _pmyself.setState({ address:mydata, deleteaddress:deletes});
  }
  render() {

    const {address,_pmyself}=this.props;
    const columns = [{
      title: '站点名称',
      dataIndex: 'addr_name',
      key: 'addr_name',
      width:411
    }, {
      title: '详细地址',
      dataIndex: 'addr_province',
      key: 'addr_province',
      width:412,
      render:(text,record)=>(
        <span>
          {record.addr_province}
          {record.addr_city}
          {record.addr_county}
          {record.addr_detail}
        </span>
      )
    },{
      title: '配送量',
      dataIndex: 'recv_sum',
      key: 'recv_sum',
      width:346,
      render:(text,record)=>(
        <EditableCell
          editable={record.editable}
          value={text}
          onChange={value => this.handleChange(value, record.key,_pmyself,'recv_sum')}
        />
      )
    },{
      title: '到站时间',
      dataIndex: 'deliver_date',
      key: 'deliver_date',
      width:413,
      render:(text,record)=>{
        var str =   <div>
                        <span>{text}</span>
                      </div>;
        if(record.editable){
           str =  <div>
                     <span>{text}</span>
                     <span style={{float:'right'}} onClick={()=>this.deleteData(record,_pmyself,'recv_sum')}><Icon type={'delete'}/>删除</span>
                   </div>
                }
        return str ;
      }
    }];

    return (
      <div className={'my-table-title-center-orderlistdetail'}>
          <Table
            columns={columns}
            dataSource={address}
            loading={this.state.loading}
            pagination={{ position: 'none' }} scroll={{ y: 360 }}
          />
      </div >
    )
  }
}
export default OrderListDetailsAddrTable;
