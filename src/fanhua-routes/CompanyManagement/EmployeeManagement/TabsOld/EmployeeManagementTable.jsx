import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import {RequireUtils} from 'utils';
import PlanForm from './Form' ;
import AddForm from './AddForm' ;
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
  this.setState({
    pagination: pager,
  });
  this.fetch({
    pageSize: pagination.pageSize,
    limit:pagination.pageSize,
    page:pagination.current,
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
     /* pagination.total = data.data.count;*/
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
  console.log(status);
  var _this = this ;
  RequireUtils.baseRequire( "user/forbid-user",{id:id},function (data) {
    const pager = _this.state.pagination;
    _this.fetch({
      page:pager.current,
      limit:pager.pageSize
    });
      alert(data.msg)
  }) ;
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
      pagination: {pageSize:10,page:1,limit:10,check_status:2},
      loading: false,
      confirmLoading: false,
      companyoption:[],
      productoption:[],
      updateData:{},
      role:[],

    };
    this.callback = this.callback.bind(this);
  }
  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }

  fetch(params = {}) {
    getTableData.bind(this)('user/user-list',params);
  }
  componentDidMount() {
    this.fetch({page:1,limit:this.state.pageSize,check_status:2});
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
  myShowModal(id) {
    var _this = this ;
    RequireUtils.baseRequire("user/user-info",{id:id},function (data) {
      if(data.code==1) {
        var info = data.data.info;
        const role=data.data.role;
          _this.setState({
          update:true,
          updateData:info,
            role:role,
        });
      }else{
        this.setState({update:true,updateData:{},role:[]})
      }
    }.bind(this))
  }

  myAddShowModal(id) {
    var _this = this ;
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
          var isCheck = false ;
          var mytext = '禁用' ;
          if(record.user_status==1){
            isCheck = true ;
            mytext = '启用' ;
          }else{
             isCheck = false ;
             mytext = '禁用' ;
          }
          console.log(record.user_name) ;
          console.log(record.user_status) ;
          console.log(isCheck) ;
          return <span>
                  <a href="javaScript:void(0)" style={{marginRight:'10px'}}><Switch defaultChecked={isCheck} checked={isCheck} onChange={(checked)=>(onChange.bind(this)(record.user_status,record.id))}/>&nbsp;&nbsp;{mytext}</a>
                  <a href="javaScript:void(0)" onClick={()=>this.myShowModal(record.id)}><Icon type="edit" style={{marginRight:'5px'}} />编辑</a>
                </span>
        },
      }];
    return (
      <div className={'my-table-title-center'}>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24} >
            <div style={{marginBottom:'10px',textAlign:'right'}}>
              <span onClick={()=>(this.myAddShowModal())}>
                 <Icon type="plus-circle-o" style={{marginRight:'8px'}} />
                  新增
              </span>
            </div>
          </Col>
        </Row>
        <Table
          columns={columns}
          dataSource={data}
          pagination={this.state.pagination}
          loading={this.state.loading}
          onChange={this.handleTableChange.bind(this)}
        />
        <Modal title="新增员工"
               visible={add}
               onOk={this.handleOk}
               confirmLoading={confirmLoading}
               onCancel={this.handleSecondCancel}
               footer={null}
        >
          <AddForm ref={'AddForm'} companyoption={companyoption} productoption={productoption} handleCancel={this.handleSecondCancel} go={()=>this.fetch(this.state.pagination)}></AddForm>
        </Modal>
        <Modal title="员工编辑"
               visible={update}
               onOk={this.handleOk}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
               footer={null}
        >
          <PlanForm ref={'PlanForm'} updateData={updateData} role= {role} companyoption={companyoption} productoption={productoption}  handleCancel={this.handleCancel} go={()=>this.fetch(this.state.pagination)}></PlanForm>
        </Modal>
      </div >
    )
  }
}
export default EmployeeManagementTable;

