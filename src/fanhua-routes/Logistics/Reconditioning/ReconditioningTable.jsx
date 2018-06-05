import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch, Modal,message,Input } from 'antd';
 import mystyle from './tabstyle.less';
import { Link } from 'dva/router';
import AddForm from './AddCar';
import AddFormS from './EditCar';
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
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
      pagination.total = data.data.count;
      this.setState({
        loading: false,
        data:keyList,
        pagination
      });
    }else{
      this.setState({data:[]});
    }
  }.bind(this))
}
function showbill(id) {
  createHistory().push({
    pathname: '/customerbilllistdetail/?customerid='+id,
  })
}
class ReconditioningTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmLoading: false,
      confirmLoading2: false,
      add:false,
      edit:false,
      pagination: {pageSize:10},
      data: [],
      loading: false,
      loading2: false,
      searchparams:{find_str:"",s_date:"",e_date:""}
    };
    this.deleteCar=this.deleteCar.bind(this);
    this.onRef=this.onRef.bind(this);
    this.onRefS=this.onRefS.bind(this);
  }
  handleSecondCancel = () => {
    // this.refs["AddForm"].clearForm();
    this.childS.clearForm();
    this.setState({
      add:false,
    });
  } ;
  handleSecondCancel2 = () => {
    // this.refs["AddFormS"].clearForm();
    this.child.clearForm();
    this.setState({
      edit:false,
    });
  } ;
  handleOk = (e) => {
    this.childS.handleSubmit(e);
    // this.refs["AddForm"].clearForm();
    this.childS.clearForm();
    this.setState({
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        add: false,
        confirmLoading: false,
      });
      /* console.log(this.refs["form"]) ;
       this.refs["form"].handleSubmit(e);*/
      this.fetch();
    }, 2000);
  } ;
  onRef(ref){
    this.child=ref;
  }
  onRefS(ref){
    this.childS = ref
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


  handleOk2 = (e) => {
this.child.handleSubmit(e);
   // this.refs["AddFormS"].handleSubmit(e);
    this.setState({
      ModalText2: 'The modal will be closed after two seconds',
      confirmLoading2: true,
    });
    setTimeout(() => {
      this.setState({
        edit: false,
        confirmLoading2: false,
      });

      this.child.clearForm();
      this.fetch();
    }, 2000);
  } ;

  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    getTableData.bind(this)('car-free/free-list',params);
  }
  componentDidMount() {
    this.fetch();
  }
  deleteCar(e,id){
    e.stopPropagation();
    e.preventDefault();
    var context = this;
    Modal.confirm({
      title: '您确定要删除该重车吗？',
      content: '删除后，该重车将被清除',
      onOk() {
        RequireUtils.baseRequire('car-free/del-free',{
          id: id,
        },function (data){
          if(data.code==1){
            message.success(data.msg);
            this.fetch();
          }

        }.bind(context));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  EditCar(e,record){
    e.stopPropagation();
    e.preventDefault();
    var _this = this ;
    _this.setState({
      edit:true,
    });
  }

  myselfonkeydown(e){
    if(e.keyCode == 13){
      this.search();
    }
  }

  myAddShowModal(id) {
    var _this = this ;
    _this.setState({
      add:true,
    });
    RequireUtils.baseRequire('plan/company-select',{},function (data) {
      if (data.code)
      {
        _this.setState({
          companyoption:data.data.list
        }) ;
      }
      else{
        alert("提交失败!");
      }
    }.bind(this));
    RequireUtils.baseRequire('plan/goods-select',{},function (data) {
      if (data.code)
      {
        _this.setState({
          productoption:data.data.list
        }) ;
      }else{
        alert("提交失败!");
      }
    }.bind(this));
  }
  render() {
    const {data,update,confirmLoading,add,updateData,productoption,companyoption,buyeradd,saleadd,edit,confirmLoading2}=this.state;
    const columns = [{
      title: '车头牌号',
      dataIndex: 'head_card',
      key: 'head_card'
    }, {
      title: '车挂牌号',
      dataIndex: 'body_card',
      key: 'body_card',
    },{
      title: '司机',
      dataIndex: 'driver_name',
      key: 'driver_name',
    },{
      title: '商品',
      dataIndex: 'prod_name',
      key: 'prod_name',
    },{
      title: '装车日期',
      dataIndex: 'start_date',
      key: 'start_date',
    },{
      title: '待调度量',
      dataIndex: 'send_num',
      key: 'send_num',
      render: (text, record) => (
        <span>
          {text}
        </span>
      )
    },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => (
          <div><Modal title="编辑重车"
                      visible={edit}
                      onOk={this.handleOk2}
                      confirmLoading={confirmLoading2}
                      onCancel={this.handleSecondCancel2}
            // footer={null}
          >
            <AddFormS ref="AddFormS"  onRef={this.onRef}  record={record} go={()=>this.fetch(this.state.pagination)}/>
          </Modal>
          <span>
            <a href="javaScript:void(0)" style={{marginRight:'10px'}} onClick={(e)=>this.deleteCar(e,record.id)}><Icon type="delete" style={{marginRight:'5px'}}/>删除</a>
            <a href="javaScript:void(0)" style={{marginRight:'10px'}} onClick={(e)=>this.EditCar(e,record)}><Icon type="delete" style={{marginRight:'5px'}}/>编辑</a>
          </span>
          </div>
        ),
      }];
    return (
      <div className={'my-table-title-center-zc'} onKeyDown={(e)=>this.myselfonkeydown.bind(this)(e)}>
        <Row>
          <Col span={16}></Col>
          <Col span={6}>
            <div style={{padding:'10px 0'}}>
              <Input
                placeholder="搜索车头、车挂、司机"
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
        <Card  type="card" className={'no-content-card'}>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={24} >
              <div style={{marginBottom:'10px',textAlign:'right'}}>
              <span onClick={()=>(this.myAddShowModal())} style={{marginRight:'10px',cursor:'pointer'}} >
                 <Icon type="plus-circle-o" style={{marginRight:'8px'}} />
                  新增
              </span>
              </div>
            </Col>
          </Row>
          <Modal title="新增重车"
                 visible={add}
                 onOk={this.handleOk}
                 confirmLoading={confirmLoading}
                 onCancel={this.handleSecondCancel}
            // footer={null}
          >
            <AddForm ref="AddForm" onRefS={this.onRefS} companyoption={companyoption} productoption={productoption} handleCancel={this.handleSecondCancel} go={()=>this.fetch(this.state.pagination)}></AddForm>
          </Modal>
          <Table
            columns={columns}
            dataSource={data}
            pagination={this.state.pagination}
            loading={this.state.loading}
            onChange={this.handleTableChange.bind(this)}
            // onRow={(record) => {
            //   return {
            //     onClick: (e) => this.myRowClick(e,record),       // 点击行
            //   };
            // }}
          />
        </Card>
      </div >
    )
  }
}
export default ReconditioningTable;
