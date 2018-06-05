import { Table } from 'antd';
import React from 'react';
const columns = [
  {
    align:"center",
  title: '商品名称',
  dataIndex: 'goods_name',
}, {
  title: '库存',
  dataIndex: 'goods_stock',
}, {
  title: '挂牌价',
  dataIndex: 'price',
} ,{
  title: '运输方式',
  dataIndex: 'deliver_name',
},{
  title: '付款方式',
  dataIndex: 'pay_name',
}];
class AddOrderTable extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      saler_contact_name:"",
      record:{},
    selectedRowKeys: [], // Check here to configure the default column
  };
    this.sentRow=this.sentRow.bind(this);
  }
  componentDidMount(){
    this.props.onRef2(this);
    console.log(this.props.saler_id);
  }

  sentRow(record){
    this.setState(
      {
        record:record,
      }
    )
  }
  onSelectChange = (selectedRowKeys,selectedRows) => {
    // const target=selectedRowKeys[selectedRowKeys.length-1];
    // selectedRowKeys.splice(0,selectedRowKeys.length);
    // selectedRowKeys.push(target);
    console.log('selectedRowKeys changed: ', selectedRows);
    this.setState({
      selectedRowKeys,
    });
    this.props.sentParents(selectedRows[0].user_name,selectedRows[0].price,selectedRows[0].id,selectedRows[0].goods_name);
  }
  render() {
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      type:"radio",
      onChange: this.onSelectChange,
      hideDefaultSelections: true,
      onSelection: this.onSelection,
    };
    return (
      <div>
        <div>{this.props.saler_id}</div>
      <Table rowSelection={rowSelection}
             columns={columns}
             dataSource={this.props.saler_id_productions}
             onRow={(record) => {
               return {
               onClick: (record) => {this.sentRow(record)},       // 点击行
             };
             }}
      />
      </div>
    );
  }
}
export default  AddOrderTable;
