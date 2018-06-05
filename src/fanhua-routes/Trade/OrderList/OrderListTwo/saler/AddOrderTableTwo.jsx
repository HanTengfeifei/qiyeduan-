import { Table } from 'antd';
import React from 'react';
const columns = [
  {
    title: '',
    dataIndex: '',

  },
  {
    title: '商品名称',
    dataIndex: 'goods_name',
    align: 'center',
  }, {
    title: '库存',
    dataIndex: 'goods_stock',
    align: 'center',
  }, {
    title: '挂牌价',
    dataIndex: 'price',
    align: 'center',
  } ,{
    title: '运输方式',
    dataIndex: 'deliver_name',
    align: 'center',
  },];
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
  componentWillReceiveProps(){

  }
  sentRow(record){
    this.setState(
      {
        record:record,
      }
    )
  }
  onSelectChange = (selectedRowKeys,selectedRows) => {
    this.setState({
      selectedRowKeys,
    });
    this.props.sentParents(selectedRows[0].user_name,selectedRows[0].price,selectedRows[0].id,selectedRows[0].goods_name);
  };
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
