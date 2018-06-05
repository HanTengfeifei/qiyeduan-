import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch ,message,Upload} from 'antd';
import {RequireUtils} from 'utils';
import PlanForm from './Form';
import AddForm from './AddForm';
import BuyerAddForm from './BuyerAddForm' ;
import  SaleAddForm from './SaleAddForm' ;
import { Modal } from 'antd';
import  './tabstyle.less' ;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
function myHandleTableChange(pagination, filters, sorter) {
  const pager = this.state.pagination;
  pager.current = pagination.current;
  pager.limit = pagination.pageSize ;
  pager.check_status= 2 ;
  this.setState({
    pagination: pager,
  });
  this.fetch({
    pageSize: pagination.pageSize,
    limit:pagination.pageSize,
    page:pagination.current,
    check_status:2,
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
  console.log(status);
  var _this = this ;
  RequireUtils.baseRequire( "user/forbid-user",{id:id},function (data) {
    const pager = _this.state.pagination;
    _this.fetch({
      page:pager.current,
      limit:pager.pageSize,
      check_status:2
    });
      message.success(data.msg);
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
      fileList: [],
      visibleAlert: false,
      total_line:0,
      fail:0,
      succ:0,
      chongfunum:0,
      cuowunum:0,
      chongfu:[],
      cuowu:[],
      uploading: false,
    };
    this.callback = this.callback.bind(this);
    this.myShowModal = this.myShowModal.bind(this);
    this.fetchS = this.fetchS.bind(this);
  }
  showModalAlert = () => {
    this.setState({
      visibleAlert: true,
    });
  }
  handleOkAlert = (e) => {
    console.log(e);
    this.setState({
      visibleAlert: false,
    });
  }
  handleCancelAlert = (e) => {
    console.log(e);
    this.setState({
      visibleAlert: false,
    });
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
      check_status:2
    });
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
  // handleChange = (info) => {
  //   var _this = this;
  //   let fileList = info.fileList;
  //   if(info.file.status=="done"){
  //     if(info.file.response){
  //       const{response:{code,data,msg}}=info.file;
  //       if(code==1){
  //         message.success("上传成功");
  //         _this.setState({
  //           visibleAlert:true,
  //           total_line:data.total_line,
  //           fail:data.fail,
  //           succ:data.succ,
  //           chongfunum:data.chongfunum,
  //           cuowunum:data.cuowunum,
  //           chongfu:data.chongfu,
  //           cuowu:data.cuowu,
  //         });
  //         _this.fetch(this.state.pagination);
  //
  //       }
  //       else{
  //         message.error(msg)
  //       }
  //
  //     }
  //   }
  //   else if(info.file.status==="error") {
  //     message.error('上传失败');
  //   }
  //
  //   // 3. filter successfully uploaded files according to response from server
  //   fileList = fileList.filter((file) => {
  //     if (file.response) {
  //       return file.response.code =='1';
  //     }
  //     return true;
  //   });
  //
  //   _this.setState({ fileList });
  // }
  handleUpload = () => {
    var _this=this;
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('UserForm[excel]', file);
    });

    this.setState({
      uploading: true,
    });
    RequireUtils.fileBaseRequire("user/add-by-excel",formData,(data)=> {
      if(data.code==1) {
        this.setState({
          fileList: [],
          uploading: false,
          visibleAlert:true,
          total_line:data.data.total_line,
          fail:data.data.fail,
          succ:data.data.succ,
          chongfunum:data.data.chongfunum,
          cuowunum:data.data.cuowunum,
          chongfu:data.data.chongfu,
          cuowu:data.data.cuowu,
        });
        message.success('上传成功!');
        this.fetch(this.state.pagination);
      }
      else{
        this.setState({
          uploading: false,
        });
        message.error('上传失败!');
      }
    });
  }
  render() {
    var _this=this;
    const props = {
      name:'UserForm[excel]',
      action: '/ymh/user/add-by-excel',
      // onChange: this.handleChange,
      multiple: true,
      className: 'upload-list-inline',
      data:{
      },
      listType:'picture',
      // showUploadList:false,
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
    };
    const {role, data,update,confirmLoading,add,updateData,productoption,companyoption,fileList,
      total_line,
      fail,
      succ,
      chongfunum,
      cuowunum,
      chongfu,
      cuowu,
      uploading,}=this.state;
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
    },{
      title: '角色',
      dataIndex: 'role_name',
      key: 'role_name',
    },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          var isCheck = false ;
          var mytext = '禁用';
          if(record.user_status==0){
            isCheck = false;
            mytext = '禁用';
          }else{
            isCheck = true ;
            mytext = '启用';
          }

          return <span>
                  <a href="javaScript:void(0)" style={{marginRight:'10px'}}><Switch defaultChecked={isCheck} checked={isCheck} onChange={(checked)=>(onChange.bind(this)(record.user_status,record.id))}/>&nbsp;&nbsp;{mytext}</a>
                  <a href="javaScript:void(0)" onClick={()=>this.myShowModal(record)}><Icon type="edit" style={{marginRight:'5px'}} />编辑</a>
                </span>
        },
      }];
    return (
      <div className={'my-table-title-center'}>
        <Modal
          keyboard={true}
          title="导入完成"
          visible={this.state.visibleAlert}
          onOk={this.handleOkAlert}
          onCancel={this.handleCancelAlert}
        >
          <p><span>共导入</span> <span>{total_line}</span> <span>条</span> </p>
          <p><span>成功导入</span> <span>{succ}</span> <span>条</span> </p>
          <p><span>导入失败</span> <span>{fail}</span> <span>条</span> </p>
          <p><span>其中{chongfunum}条重复</span> <span>行号为:</span> <span>{chongfu? chongfu.map((item)=>{
            if (chongfu.indexOf(item)===chongfu.length-1){
              return item;
            }
            else{
              return item+"-";
            }

          }):""}</span> </p>
          <p><span>其中{cuowunum}条数据错误,</span> <span>行号为:</span> <span>{cuowu? cuowu.map((item)=>{
            if (cuowu.indexOf(item)===cuowu.length-1){
              return item;
            }
            else{
              return item+"-";
            }
          }):""}</span> </p>
          <p>请修改后重新导入 </p>

        </Modal>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Row style={{textAlign:'right',marginBottom:'15px'}}>
                <span onClick={()=>(this.myAddShowModal())} style={{cursor:'pointer'}}>
                   <Icon type="plus-circle-o" style={{marginRight: '8px'}}/>
                    新增
                </span>
          </Row>
          <Row    style={{textAlign:'right',marginBottom:'15px'}} >


            <Upload {...props}
                    fileList={this.state.fileList}

                    // defaultFileList={this.state.fileList}
              >
                  <span style={{marginRight: '30px'}} style={{cursor:'pointer'}}>
                  <Icon type="plus-circle-o" style={{marginRight: '8px'}}/>
                      批量导入
                </span>
            </Upload>
          </Row>
            <Row>
              <Button
                className="upload-demo-start"
                type="primary"
                onClick={this.handleUpload}
                disabled={this.state.fileList.length === 0}
                loading={uploading}
              >
                {uploading ? '上传中......' : '确认上传' }
              </Button>
            </Row>
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
          <AddForm ref={'AddForm'} companyoption={companyoption} productoption={productoption} handleCancel={this.handleSecondCancel} go={()=>this.fetch(this.state.pagination)}/>
        </Modal>
        <Modal title="员工编辑"
               visible={update}
               onOk={this.handleOk}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
               footer={null}
        >
          <PlanForm ref={'PlanForm'} updateData={updateData} role= {role} companyoption={companyoption} productoption={productoption}  handleCancel={this.handleCancel} go={this.fetchS}/>
        </Modal>
      </div >
    )
  }
}
export default EmployeeManagementTable;

