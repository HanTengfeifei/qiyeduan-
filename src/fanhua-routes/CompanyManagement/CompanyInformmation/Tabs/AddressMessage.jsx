import React from 'react';
import { Card, Row, Col, Tabs,Table,Input, Icon, Button, Radio, Select,Form, Modal,Divider ,Cascader} from 'antd';
import {RequireUtils} from 'utils';
import './AddressMessage.less';
import Form2 from './AddressEdit';
import FormAddressAdd from "./AddressMessageFormAdd";
// import reqwest from 'reqwest';
class AddressMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record:{},
      currentRecord:null,
      pagination:{},
      loading:false,
      visible:false,
      visible2:false,
      ModalText:"地址添加",
      confirmLoading:false,
      data: [],
    }
    this.findAddressAll=this.findAddressAll.bind(this);
    this.onRefS=this.onRefS.bind(this);
}
  onRef = (ref) => {
    this.child = ref
  }
  onRefS(ref){
    this.childS = ref
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    const context=this;
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
  fetch = (params ) => {
    console.log('params:', params);
    this.setState({ loading: true });
    RequireUtils.baseRequire('/company/addr-list',params,function (data) {
      if(data.code==1) {
        const pagination = { ...this.state.pagination };
       //Read total count from server
          // pagination.total = data.totalCount;
          pagination.total = data.count;
          this.setState({
            loading: false,
            data: data.data.list.map((item)=>{
              const obj={};
              obj.id=item.id;
              obj.addr_name=item.addr_name;
              obj.addr_phone=item.addr_phone;
              obj.addr_contact=item.addr_contact;
              obj.addr_detail=item.addr_detail;
              obj.addr_all=item.addr_province+item.addr_city+item.addr_county;
              obj.pp=[item.addr_province,item.addr_city,item.addr_county];
              return(obj)

            }),
            pagination,
          });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  }
  componentDidMount() {
    const obj={};
    obj.company_id=localStorage.getItem("company_id");
    obj.page=1;
    obj.limit=10;
    console.log(obj);
    this.fetch(obj);
  }
  findAddressAll(){
    const obj={};
    obj.company_id=localStorage.getItem("company_id");
    obj.page=1;
    obj.limit=10;
    console.log(obj);
    this.fetch(obj);
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
  }
  render() {
    const {data,visible, ModalText, confirmLoading , pagination,loading}=this.state;
    const columns = [{
      title: '编号',
      dataIndex: 'id',
      key: 'id',
    }, {
      title: '收货人员',
      dataIndex: 'addr_contact',
      key: 'addr_contact',
    },{
        title: '联系方式',
        dataIndex: 'addr_phone',
        key: 'addr_phone',
      },{
      title: '地址名称',
      dataIndex: 'addr_name',
      key: 'addr_name',
    },{
      title: '地址',
      dataIndex: 'addr_all',
      key: 'addr_all',
    },
      {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
          <a href="#" style={{marginRight:'10px'}}><Icon type="edit" /><span  onClick={(e) => {
            const that =this;
            e.stopPropagation();
            e.preventDefault();
            this.setState({
              visible2: true,
              record:record,
            });
          }}>编辑</span></a>
          <a href="#"><Icon type="delete" />  <span onClick= {(e) => {
            e.stopPropagation();
            e.preventDefault();
            var context = this;
            Modal.confirm({
              title: '您确定要删除该用户账号吗？',
              content: '删除后，该用户及其子账户将被清除',
              onOk() {
                RequireUtils.baseRequire('company/del-addr',{
                  id: record.id,
                },function (data) {
                  alert(data.msg);
                  this.findAddressAll();
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
          title="编辑地址"
          visible={this.state.visible2}
          onOk={this.handleOk2}
          onCancel={this.handleCancel2}
          // key={role.role_id+this.state.keyAdd}
        >
          <Form2 ref="form2"  record={this.state.record} onRefS={this.onRefS}  go={this.findAddressAll} />
        </Modal>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={4} offset={20} >
              <Button  onClick={this.showModal} type="primary"  style={{marginBottom:'10px',textAlign:'right'}}>
                <Icon type="plus-circle-o" style={{marginRight:'10px'}} />
                新增
              </Button>
              <Modal title={ModalText}
                     visible={visible}
                     onOk={this.handleOk}
                     confirmLoading={confirmLoading}
                     onCancel={this.handleCancel}
                // afterClose={this.close}
              >
                <FormAddressAdd ref="form" onRef={this.onRef} go={this.findAddressAll}  />
              </Modal>
            </Col>
          </Row>
            <Table columns={columns} dataSource={data} loading={loading} pagination={pagination} onChange={this.handleTableChange}/>
      </div >
    )
  }
}

export default  AddressMessage;
