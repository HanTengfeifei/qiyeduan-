import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal,message,Input,Upload } from 'antd';
import './tabstyle.less' ;
import reqwest from 'reqwest';
import createHistory from 'history/createHashHistory';
import AddFieldStationList from './AddFieldStationList';
import UpdateFieldStationList from './UpdateFieldStationList';
import {RequireUtils} from 'utils';
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
      pagination.limit = pagination.pageSize ;
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



class FieldStationListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      staionadd:false,
      staionupdate:false,
      pagination: {pageSize:10},
      updateData:[],
      firstEnter:true,
      loading: false,
      firstEnter:true,
      searchparams:{find_str:"",f_type:""},
      uploading: false,
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

  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }

  fetch(params = {}) {
    getTableData.bind(this)('addr/addr-list',params)
  }

  componentDidMount() {
    this.fetch();
  }

  handleAddCancel = () => {
    this.refs['AddFieldStationList'].resetFields() ;
    this.setState({
      staionadd:false,
    });
  } ;
  handleUpateCancel = () => {
    this.refs['UpdateFieldStationList'].resetFields() ;
    this.setState({
      staionupdate:false,
    });
  } ;

  addFieldStationList(){
      this.setState({
        staionadd:true
      })
  }

  deleteStaion(e,id){
    e.stopPropagation();
    e.preventDefault();
    var context = this;
    Modal.confirm({
      title: '您确定要删除该场站吗？',
      content: '',
      onOk() {
        RequireUtils.baseRequire('addr/del-addr',{
          id: id,
        },function (data) {
          message.success(data.msg);
          this.fetch(this.state.pagination) ;
        }.bind(context));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  updateStaion(id){
    var _this = this ;
    RequireUtils.baseRequire("addr/addr-info",{id:id},function (data) {
      if(data.code==1) {
        var list = data.data.info;
        _this.setState({
          staionupdate:true,
          updateData: list,
          firstEnter:true
        });
      }else{
        alert(data.msg) ;
      }
    }.bind(this))
  }
  myRowClick(e,record){
    if(e.target.tagName=="A"){
      return false ;
    }
    createHistory().push({
      pathname: '/staiondetail/?staiondetailid='+record.id,
    })
  }


  changeSearchParams = (filed,value) => {
    const {searchparams} = this.state ;
    searchparams[filed] = value ;
    this.setState({
      searchparams: searchparams
    });
  };

  search=()=>{
    var {searchparams} = this.state ;
    this.fetch(searchparams) ;
  };
  //批量导入
  // handleUpload = (file) => {
  //   const formData = new FormData();
  //   formData.append('AddrForm[excel]', file);
  //   this.setState({
  //     uploading: true,
  //   });
  //   reqwest({
  //     url: '/ymh/addr/add-by-excel',
  //     method: 'post',
  //     processData: false,
  //     data: formData,
  //     success: (data) => {
  //       // this.setState({
  //       //   fileList: [],
  //       //   uploading: false,
  //       // });
  //       message.success('添加成功！！！');
  //     },
  //     error: () => {
  //       this.setState({
  //         uploading: false,
  //       });
  //       message.error('upload failed.');
  //     },
  //   });
  // } ;

  myselfonkeydown(e){
    if(e.keyCode == 13){
      this.search();
    }
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
  //         this.fetch(this.state.pagination) ;
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
    formData.append('excel_type', "t");
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
        _this.fetch(this.state.pagination);
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
    const {staionadd,staionupdate,data,updateData,firstEnter,
      total_line,
      fail,
      succ,
      chongfunum,
      cuowunum,
      chongfu,
      cuowu,
      uploading}=this.state;
    var _this = this ;
//批量导入参数
    const props = {
      name:'AddrForm[excel]',
      action: '/ymh/addr/add-by-excel',
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
    //批量导入
    // const props = {
    //   action: '//jsonplaceholder.typicode.com/posts/',
    //   onRemove: (file) => {
    //     this.setState(({ fileList }) => {
    //       const index = fileList.indexOf(file);
    //       const newFileList = fileList.slice();
    //       newFileList.splice(index, 1);
    //       return {
    //         fileList: newFileList,
    //       };
    //     });
    //   },
    //   beforeUpload: (file) => {
    //     this.setState(({ fileList }) => ({
    //       fileList: [...fileList, file],
    //     }));
    //     return false;
    //   },
    //   onChange:(info)=>{
    //     _this.handleUpload(info.file) ;
    //   },
    //   fileList: this.state.fileList,
    // };

    const columns = [{
      title: '场站名称',
      dataIndex: 'addr_name',
      key: 'addr_name',
    },{
      title: '联系人',
      dataIndex: 'user_name',
      key: 'user_name',
    },{
      title: '联系方式',
      dataIndex: 'user_mobile',
      key: 'user_mobile',
    },{
      title: '地址',
      dataIndex: 'addr_province',
      key: 'addr_province',
      render: (text, record) => (
        <span>
          {text }&nbsp;{record.addr_city}&nbsp;{record.addr_county}&nbsp;{record.addr_detail}
        </span>
      )
    },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <span>
            <a href="javaScript:void(0)" style={{marginRight:'10px'}}  onClick={()=>this.updateStaion.bind(this)(record.id)}><Icon type="edit" style={{marginRight:'5px'}}/>编辑</a>
            <a href="javaScript:void(0)" onClick={(e)=>this.deleteStaion.bind(this)(e,record.id)}><Icon type="delete" style={{marginRight:'5px'}}/>删除</a>
        </span>
        ),
      }];

    return (
      <div className={'my-table-title-center my-custom-padding  htf_ant-table-tbody'} onKeyDown={(e)=>this.myselfonkeydown.bind(this)(e)}>
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
        <Row>
          <Col span={4}>
              <div style={{padding:'10px 0'}}>
                  <Select
                      style={{ width: '100%' }}
                      size="large"
                      placeholder={"搜索场站类型"}
                      onChange={(value)=> this.changeSearchParams("f_type",value)}
                  >
                      <Option value="0" key="0">液厂</Option>
                      <Option value="1" key="1">接收站</Option>
                      <Option value="2" key="2">加气站</Option>
                      <Option value="3" key="3">气化站</Option>
                  </Select>
              </div>
          </Col>
          <Col span={2}>
              <div style={{padding:'10px 0'}}>
                  <Button size='large' onClick={this.search.bind(this)}>筛选</Button>
              </div>
          </Col>
          <Col span={10}></Col>
          <Col span={6}>
            <div style={{padding:'10px 0'}}>
              <Input
                placeholder="搜索名称、地址"
                size="large"
                onChange={(e)=>this.changeSearchParams.bind(this)('find_str',e.target.value)}
              />
            </div>
          </Col>
          <Col span={2}>
            <div style={{padding:'10px 0'}}>
              <Button icon="search" size='large' onClick={this.search.bind(this)}>查询</Button>
            </div>
          </Col>
        </Row>
        <Card    title="" type="card" className={'no-content-card'}>
          <Row gutter={8} style={{ marginTop: '10px',padding:'0 30px'}}>
                    {/*<span style={{marginRight:'15px'}}>*/}
                      {/*<Icon type="environment-o" style={{marginRight:'8px'}} />*/}
                      {/*地图查找*/}
                    {/*</span>*/}
            <Row  style={{textAlign:'right',marginBottom:'15px'}}>
                <span onClick={this.addFieldStationList.bind(this)} style={{cursor:'pointer'}}>
                   <Icon type="plus-circle-o" style={{marginRight: '8px'}}/>
                    新增
                </span>
            </Row>
            <Row  style={{textAlign:'right',marginBottom:'15px'}} >
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
          <Table
            columns={columns}
            dataSource={data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onRow={(record) => {
              return {
                onClick: (e) => this.myRowClick(e,record),       // 点击行
              };
            }}
            onChange={this.handleTableChange.bind(this)} />
          <Modal title="场站新增"
                 visible={staionadd}
                 onOk={this.handleOk}
                 onCancel={this.handleAddCancel}
                 footer={null}>
            <AddFieldStationList ref={'AddFieldStationList'} handleAddCancel={this.handleAddCancel} go={()=>this.fetch(this.state.pagination)}></AddFieldStationList>
          </Modal>
          <Modal title="场站编辑"
                 visible={staionupdate}
                 onOk={this.handleOk}
                 onCancel={this.handleUpateCancel}
                 footer={null}>

            <UpdateFieldStationList firstEnter={firstEnter} reactp = {this} ref={'UpdateFieldStationList'} handleUpateCancel={this.handleUpateCancel} updateData={updateData}  go={()=>this.fetch(this.state.pagination)}></UpdateFieldStationList>
          </Modal>
        </Card>
      </div >
    )
  }
}
export default FieldStationListTable;
