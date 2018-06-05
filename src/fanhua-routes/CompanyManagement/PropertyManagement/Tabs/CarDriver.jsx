import React from 'react';
import { Card, Row, Col, Tabs,Table,Input, Icon, Button, Radio, Select,Form ,Modal,Upload} from 'antd';
import {RequireUtils} from 'utils';
import './CarDriver.less'
import AddDriver from './AddCarDriver';
import FormDriver from './EditCarDriver';
import {message} from "antd/lib/index";
class CarDriver extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record:{},
      data: [],
      pagination:{},
      loading:false,
      visible:false,
      visible2:false,
      ModalText:"车挂添加",
      confirmLoading:false,
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
      this.findCarDriverAll=this.findCarDriverAll.bind(this);
      this.onRefS=this.onRefS.bind(this);
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
  onRef = (ref) => {
    this.child = ref;
  }
  onRefS(ref){
    this.childS = ref;
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      this.child.handleSubmit();
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
    this.child.reset();
  }
  handleOk2 = (e) => {
    this.childS.handleSubmit(e);
    console.log(e);
    this.setState({
      visible2: false,
    });
  }
  handleCancel2 = (e) => {
    console.log(e);
    this.setState({
      visible2: false,
    });
    this.childS.reset();
  }
  fetch = (params ) => {
    this.setState({ loading: true });
    RequireUtils.baseRequire('driver/driver-list',params,function (data) {
      if(data.code==1) {
        const pagination = { ...this.state.pagination };
        //Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = data.count;
        this.setState({
          loading: false,
          data: data.data.list.map(function (item,index) {
            item.key = index ;
            return item ;
          }),
          pagination,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  };
  componentDidMount() {
    const obj={};
    obj.company_id=localStorage.getItem("company_id");
    obj.page=1;
    obj.limit=10;
    this.fetch(obj);
  }
  findCarDriverAll(){
    const obj={};
    obj.company_id=localStorage.getItem("company_id");
    obj.page=1;
    obj.limit=10;
    this.fetch(obj);
  }
  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      company_id:localStorage.getItem("company_id"),
      limit: pagination.pageSize,
      page: pagination.current,
      // sortField: sorter.field,
      // sortOrder: sorter.order,
      // ...filters,
    });
  }
  // handleChange = (info) => {
  //   let fileList = info.fileList;
  //   if(info.file.status=="done"){
  //     if(info.file.response){
  //       const{response:{code,data,msg}}=info.file;
  //       if(code==1){
  //         message.success("上传成功");
  //         this.setState({
  //           visibleAlert:true,
  //           total_line:data.total_line,
  //           fail:data.fail,
  //           succ:data.succ,
  //           chongfunum:data.chongfunum,
  //           cuowunum:data.cuowunum,
  //           chongfu:data.chongfu,
  //           cuowu:data.cuowu,
  //         });
  //         this.findCarDriverAll();
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
  //   this.setState({ fileList });
  // }
  handleUpload = () => {
    const { fileList } = this.state;
    const formData = new FormData();
    fileList.forEach((file) => {
      formData.append('DriverForm[excel]', file);
    });
    // formData.append('excel_type', "g");
    this.setState({
      uploading: true,
    });
    RequireUtils.fileBaseRequire("driver/add-by-excel",formData,function (data) {
      const _this=this;
      if(data.code==1) {
        _this.setState({
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
        _this.findCarDriverAll();
      }
      else{
        _this.setState({
          uploading: false,
        });
        message.error('上传失败!');
      }
    }.bind(this));
  }
  render() {
    const props = {
      name:'DriverForm[excel]',
      action: '/ymh/driver/add-by-excel',
      onChange: this.handleChange,
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
    const {data,visible, ModalText, confirmLoading , pagination,loading,
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
      dataIndex: 'driver_name',
      key: 'driver_name'
    }, {
      title: '身份证号',
      dataIndex: 'driver_card',
      key: 'driver_card',
    },{
        title: '电话号码',
        dataIndex: 'driver_mobile',
        key: 'driver_mobile',
      },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" style={{marginRight:'10px'}}><Icon type="edit" /><span  onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
              visible2: true,
              record:record,
            });
          }}>编辑</span></a>
          <a href=""><Icon type="delete" /><span onClick= {(e) => {
            e.preventDefault();
            e.stopPropagation();
            var context = this;
            Modal.confirm({
              title: '您确定要删除该车头信息吗？',
              content: '删除后，该车头信息将无法恢复',
              onOk() {
                RequireUtils.baseRequire('driver/del-driver',{
                  id: record.id,
                },function (data) {
                  if(data.code==1){
                    alert(data.msg);
                    this.findCarDriverAll();
                  }
                  else{
                    alert(data.msg);
                  }
                }.bind(context));
              },
              onCancel() {
                console.log('Cancel');
              },
            });
          }}>删除</span></a>
        </span>
      ),
    }];
    return (
      <div className={'my-table-title-carDriver-center my-custom-padding  htf'}>
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
        <Modal
          title="编辑司机信息"
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
          // key={role.role_id+this.state.keyAdd}
        >
          <FormDriver  record={this.state.record}  onRefS={this.onRefS}   go={this.findCarDriverAll} />
        </Modal>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Row span={12} style={{textAlign:'right',marginBottom:'15px'}}>
                <span onClick={this.showModal} style={{cursor:'pointer'}}>
                   <Icon type="plus-circle-o" style={{marginRight: '8px'}}/>
                    新增
                </span>
              <Modal title="新增司机信息"
                     visible={visible}
                     onOk={this.handleOk}
                     confirmLoading={confirmLoading}
                     onCancel={this.handleCancel}
                // afterClose={this.close}
              >
                <AddDriver  onRef={this.onRef} go={this.findCarDriverAll} />
              </Modal>
            </Row>
            <Row   style={{textAlign:'right',marginBottom:'15px'}} >
              <Upload {...props} fileList={this.state.fileList}
                      defaultFileList={this.state.fileList}>
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
            <Table columns={columns} dataSource={data} loading={loading} pagination={pagination} onChange={this.handleTableChange} />
      </div >
    )
  }
}
export default  CarDriver;
