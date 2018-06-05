import React from 'react';
import { Card, Row, Col, Tabs,Table,Input, Icon, Button, Radio, Select,Form ,Modal,message} from 'antd';
import {RequireUtils} from 'utils';
import AddDo from './AddDo';
import EditDo from './EditDo';
class RoleAll extends React.Component {
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
    };
    this.findRoleAll=this.findRoleAll.bind(this);
    this.onRefS=this.onRefS.bind(this);
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
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
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
    console.log('params:', params);
    this.setState({ loading: true });
    RequireUtils.baseRequire('role/role-list',params,function (data) {
      if(data.code==1) {
        const pagination = { ...this.state.pagination };
        console.log(data);
        //Read total count from server
        // pagination.total = data.totalCount;
        pagination.total = data.count;
        this.setState({
          loading: false,
          data: data.data.list,
          pagination,
        });
        console.log("我是人才");
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  }
  componentDidMount() {
    const obj={};
    obj.page=1;
    obj.limit=10;
    this.fetch(obj);
  }
  findRoleAll(){
    const obj={};
    // obj.company_id=localStorage.getItem("company_id");
    obj.page=1;
    obj.limit=10;
    this.fetch(obj);
    console.log("w我是帅哥");
  }
  handleTableChange = (pagination) => {
    const pager = { ...this.state.pagination };
    pager.current = pagination.current;
    this.setState({
      pagination: pager,
    });
    this.fetch({
      // company_id:localStorage.getItem("company_id"),
      limit: pagination.pageSize,
      page: pagination.current,
      // sortField: sorter.field,
      // sortOrder: sorter.order,
      // ...filters,
    });
  }
  render() {
    const {data,visible, ModalText, confirmLoading , pagination,loading}=this.state;
    const columns = [{
      title: '角色编号',
      dataIndex: 'role_code',
      key: 'role_code'
    }, {
      title: '角色名称',
      dataIndex: 'role_name',
      key: 'role_name',
    },{
      title: '校色描述',
      dataIndex: 'role_desc',
      key: 'role_desc',
    },{
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="" style={{marginRight:'10px'}}><Icon type="edit" /><span  onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            this.setState({
              visible2: true,
              record:record,
            });
          }}>编辑</span></a>
          <a href="" onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            RequireUtils.baseRequire('role/forbid',{id:record.id},function (data) {
              if(data.code==1) {
                message.success("状态修改成功");
                this.findRoleAll();
              }
              else{
                message.error("状态修改失败");
              }
            }.bind(this));
          }}>
            <span>
            { parseInt(record.role_status) ?
              <span>禁用</span>
              :
              <span>启用</span>
            }
            </span>
          </a>
          <a href="" style={{marginLeft: 10}}><Icon type="delete" /><span onClick= {(e) => {
            e.preventDefault();
            e.stopPropagation();
            var context = this;
            Modal.confirm({
              title: '您确定要删除该角色信息吗？',
              content: '删除后，该角色信息将无法恢复',
              onOk() {
                RequireUtils.baseRequire('driver/del-driver',{
                  id: record.id,
                },function (data) {
                  if(data.code==1){
                    alert(data.msg);
                    this.findRoleAll();
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
      <div>
        <Modal
          title="编辑角色信息"
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
          // key={role.role_id+this.state.keyAdd}
        >
          <EditDo record={this.state.record}  onRefS={this.onRefS}   go={this.findRoleAll} />
        </Modal>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24} >
            <div style={{marginBottom:'10px',textAlign:'right'}}>
                <span style={{marginRight:'15px'}}>
                  {/*<Icon type="plus-circle-o" style={{marginRight:'8px'}} />*/}
                </span>
              <span  onClick={this.showModal}>
                   <Icon type="plus-circle-o" style={{marginRight:'8px'}} />
                    新增
                </span>
            </div>
            <Modal title={ModalText}
                   visible={visible}
                   onOk={this.handleOk}
                   confirmLoading={confirmLoading}
                   onCancel={this.handleCancel}
              // afterClose={this.close}
            >
              <AddDo onRef={this.onRef} go={this.findRoleAll} />
            </Modal>
          </Col>
        </Row>
        <Table columns={columns} dataSource={data} loading={loading} pagination={pagination} onChange={this.handleTableChange} />
      </div >
    )
  }
}
export default RoleAll;
