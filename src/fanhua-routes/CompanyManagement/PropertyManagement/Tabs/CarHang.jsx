import React from 'react';
import { Card, Row, Col, Tabs,Table,Input, Icon, Button, Radio, Select,Form, Divider,Modal,Upload } from 'antd';
import {RequireUtils} from 'utils';
import './CarHang.less' ;
import  Form2 from './EditCarHang';
import AddCarHang from './AddCarHang';
import {message} from "antd/lib/index";
class CarHang extends React.Component {
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
    this.onRefS=this.onRefS.bind(this);
    this.findCarHangAll=this.findCarHangAll.bind(this);
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
  };
  onRefS(ref){
    this.childS = ref;
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
      this.child.handleSubmit();
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
    this.child.reset();
  };
  handleOk2 = (e) => {
    this.childS.handleSubmit(e);
    // console.log(e);
    // this.setState({
    //   visible2: false,
    // });
  };
  handleCancel2 = (e) => {
    console.log(e);
    this.setState({
      visible2: false,
    });
    this.childS.reset();
  };

  fetch = (params ) => {
    console.log('params:', params);
    this.setState({ loading: true });
    RequireUtils.baseRequire('car/car-list',params,function (data) {
      if(data.code==1) {
        const pagination = { ...this.state.pagination };
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
    obj.car_type=1;
    console.log(obj);
    this.fetch(obj);
  }
  findCarHangAll(){
    const obj={};
    obj.company_id=localStorage.getItem("company_id");
    obj.page=1;
    obj.limit=10;
    obj.car_type=1;
    console.log(obj);
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
      page: pagination.current
    });
  };
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
  //         this.findCarHangAll();
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
      formData.append('CarForm[excel]', file);
    });
    formData.append('excel_type', "g");
    this.setState({
      uploading: true,
    });
    RequireUtils.fileBaseRequire("car/add-by-excel",formData,function (data) {
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
        _this.findCarHangAll();
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
      name:'CarForm[excel]',
      action: '/ymh/car/add-by-excel',
      // onChange: this.handleChange,
      multiple: true,
      className: 'upload-list-inline',
      data:{
        excel_type:'g',
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
      title: '车挂号',
      dataIndex: 'car_num',
      key: 'car_num'
    }, {
      title: '核载货总质量',
      dataIndex: 'car_load',
      key: 'car_load',
    },{
        title: '联系人',
        dataIndex: 'user_name',
        key: 'user_name',
      },{
      title: '联系电话',
      dataIndex: 'user_phone',
      key: 'user_phone',
    },
      {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="javascript:;" style={{marginRight:'10px'}}><Icon type="edit" /><span  onClick={(e) => {
            e.preventDefault();
            // e.stopPropagation();
            this.setState({
              visible2: true,
              record:record,
            });
          }}>编辑</span></a>
          <a href="javascript:;"><Icon type="delete" /><span onClick= {(e) => {
            e.preventDefault();
            e.stopPropagation();
            var context = this;
            Modal.confirm({
              title: '您确定要删除该车挂信息吗？',
              content: '删除后，该车挂信息将无法恢复',
              onOk() {
                RequireUtils.baseRequire('car/del-car',{
                  id: record.id,
                },function (data) {
                  if(data.code==1){
                    alert(data.msg);
                    this.findCarHangAll();
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
      <div className={'my-table-title-carBody-center my-custom-padding  htf'}>
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
          title="编辑车挂信息"
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
          // key={role.role_id+this.state.keyAdd}
        >
          <Form2   record={this.state.record} nbb={this} onRefS={this.onRefS}  go={this.findCarHangAll} />
        </Modal>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Row  style={{textAlign:'right',marginBottom:'15px'}}>
                <span onClick={this.showModal} style={{cursor:'pointer'}}>
                   <Icon type="plus-circle-o" style={{marginRight: '8px'}}/>
                    新增
                </span>
              <Modal title="新增车挂信息"
                     visible={visible}
                     onOk={this.handleOk}
                     confirmLoading={confirmLoading}
                     onCancel={this.handleCancel}
                // afterClose={this.close}
              >
                <AddCarHang nbb={this} onRef={this.onRef} go={this.findCarHangAll} />
              </Modal>
            </Row>
            <Row    style={{textAlign:'right',marginBottom:'15px'}} >
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
            <Table columns={columns} dataSource={data} loading={loading} pagination={pagination} onChange={this.handleTableChange}/>
      </div >
    )
  }
}
export default  CarHang;
