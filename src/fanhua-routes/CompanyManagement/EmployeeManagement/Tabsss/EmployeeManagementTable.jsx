import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch ,message,Popconfirm} from 'antd';
import {RequireUtils} from 'utils';
// import PlanForm from './Form';
// import AddForm from './AddForm';
import BuyerAddForm from './BuyerAddForm' ;
import  SaleAddForm from './SaleAddForm' ;
import { Modal } from 'antd';
import mystyle from './tabstyle.less' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;


function myHandleTableChange(pagination, filters, sorter) {
  const pager = this.state.pagination;
  pager.current = pagination.current;
  pager.limit = pagination.pageSize ;
  pager.check_status= 1 ;
  this.setState({
    pagination: pager,
  });
  this.fetch({
    pageSize: pagination.pageSize,
    limit:pagination.pageSize,
    page:pagination.current,
    check_status:1,
    currentPage: pagination.current,
    sortField: sorter.field,
    sortOrder: sorter.order,
    ...filters,
  });
}

function getTableData(url,params) {
  RequireUtils.baseRequire(url,params,function (data) {
    if(data.code==1) {
      var list = data.data.list ;
      var keyList = list.map(function (item,index) {
        item.key = index ;
        return item ;
      }) ;
      const pagination = this.state.pagination;
      pagination.limit = pagination.pageSize;
      pagination.total = data.data.count;
      this.setState({
        loading: false,
        data:keyList,
        pagination
      });
    }else{
      this.setState({data:[]})
    }
  }.bind(this))
}

function onChange(status,id) {
  var _this = this ;
  var check_status="";
  if (status=="yes"){
     check_status="2";
  }
  else{
     check_status="3";
  }
  RequireUtils.baseRequire( "user/check-user",{id:id,check_status:check_status},function (data) {
    const pager = _this.state.pagination;
    _this.fetch({
      page:pager.current,
      limit:pager.pageSize,
      check_status:1
    });
      message.success(data.msg);
  });
}


class EmployeeManagementTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select:{},
      update:false,
      buyeradd:false,
      saleadd:false,
      data: [],
      pagination: {pageSize:10,page:1,limit:10,check_status:1
      },
      loading: false,
      confirmLoading: false,
      companyoption:[],
      productoption:[],
      updateData:{},
      role:[],
    };


    this.callback = this.callback.bind(this);
    this.myShowModal = this.myShowModal.bind(this);
    this.fetchS = this.fetchS.bind(this);
  }
  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    getTableData.bind(this)('user/user-list',params);
  }
  fetchS(){
    const pager = this.state.pagination;
    this.fetch({
      page:pager.current,
      limit:pager.pageSize,
      check_status:1
    });
  }
  componentDidMount() {
    this.fetch(this.state.pagination);
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
  handleCancel = () => {
    this.refs['PlanForm'].resetFields() ;
    this.setState({
      update:false,
    });
  } ;
  handleBuyerCancel = () => {
    this.refs['BuyerAddForm'].resetFields() ;
    this.setState({
      buyeradd:false,
    });
  } ;
  handleSaleCancel = () =>{
    this.refs['SaleAddForm'].resetFields() ;
    this.setState({
      saleadd:false,
    });
  } ;
  handleSecondCancel = () => {
    this.refs['AddForm'].resetFields() ;
    this.setState({
      add:false,
    });
  } ;
  myShowModal(record) {
    // var _this = this ;
    RequireUtils.baseRequire("user/user-info",{id:record.id},function (data) {
      if(data.code==1) {
        var info = data.data.info;
        const role=data.data.role;
          this.setState({
          update:true,
          updateData:info,
            role:role,
        });
      }else{
        this.setState({update:true,updateData:{},role:[]})
      }
    }.bind(this))
  }

  myAddShowModal(id){
    var _this = this;
    _this.setState({
      add:true,
    });
  }
  /**
   * 点击确定提交
   * @param e
   */

  render() {
    const {role, data,update,confirmLoading,add,updateData,productoption,companyoption}=this.state;
    const columns = [{
      title: '姓名',
      dataIndex: 'user_name',
      key: 'user_name',
    },{
      title: '手机号',
      dataIndex: 'user_mobile',
      key: 'user_mobile',
    },{
      title: '创建时间',
      dataIndex: 'register_date',
      key: 'register_date',
    },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
        var mytext="未通过"
          return <span>
                  <a href="javaScript:void(0)" style={{marginRight:'10px'}}>&nbsp;&nbsp;
                    <Popconfirm placement="top" title={"确定通过?"} onConfirm={(checked)=>(onChange.bind(this)("yes", record.id))} okText="确定" cancelText="取消">
                   <span >通过</span>
                  </Popconfirm>
                  </a>
            <a href="javaScript:void(0)" style={{marginRight:'10px'}}>&nbsp;&nbsp;
                    <Popconfirm placement="top" title={"确定不通过?"} onConfirm={(checked)=>(onChange.bind(this)("no"  ,record.id))} okText="确定" cancelText="取消">
                   <span >不通过</span>
                  </Popconfirm>
                  </a>
                  <a href="javaScript:void(0)" onClick={()=>this.myShowModal(record)}><Icon type="edit" style={{marginRight:'5px'}} />权限分配</a>
                </span>
        },
      }];
    return (
      <div className={'my-table-title-center'}>
        {/*<Row gutter={8} style={{ marginTop: '10px' }}>*/}
          {/*<Col span={24} >*/}
            {/*<div style={{marginBottom:'10px',textAlign:'right'}}>*/}
              {/*<span onClick={()=>(this.myAddShowModal())}>*/}
                 {/*<Icon type="plus-circle-o" style={{marginRight:'8px'}} />*/}
                  {/*新增*/}
              {/*</span>*/}
            {/*</div>*/}
          {/*</Col>*/}
        {/*</Row>*/}
        <Table
          columns={columns}
          dataSource={data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange.bind(this)}
        />

      </div >
    )
  }
}
export default EmployeeManagementTable;

