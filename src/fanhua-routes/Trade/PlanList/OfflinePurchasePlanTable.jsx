import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,message } from 'antd';
import {RequireUtils} from 'utils';
import MyBuyerAddForm from './MyBuyerAddForm' ;
import BueryUpdate from './BueryUpdate' ;
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
    plan_kind:1
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

function onChange(status,id) {
  var _this = this ;
  RequireUtils.baseRequire("plan/switch-plan",{id:id,plan_status:status},function (data) {
    if(data.code==1){
      const pager = _this.state.pagination;
      message.success(data.msg) ;
      _this.fetch({
        page:pager.current,
        limit:pager.pageSize
      });
    }else{
      message.error(data.msg)
    }
}) ;
}
class PlanListTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      select:{},
      update:false,
      buyeradd:false,
      saleadd:false,
      data: [],
      pagination: {pageSize:10},
      loading: false,
      confirmLoading: false,
      companyoption:[],
      productoption:[]
    };
    this.callback = this.callback.bind(this);
  }
  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    var obj = Object.assign(params,{plan_kind:1}) ;
    getTableData.bind(this)('plan/plan-list',obj)
  }

  componentDidMount() {
    this.fetch();
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
    this.refs['BueryUpdate'].resetFields();
    this.setState({
      update:false,
    });
  } ;
  handleBuyerCancel = () => {
    this.refs['MyBuyerAddForm'].resetFields() ;
    this.setState({
      buyeradd:false,
    });
  } ;

  myShowModal(id) {
    var _this = this ;
    RequireUtils.baseRequire("plan/cg-plan-info",{id:id},function (data) {
      if(data.code==1) {
        var list = data.data.info ;
        _this.setState({
          update:true,
          updateData:list
        });
        RequireUtils.baseRequire('plan/company-select',{company_status:0},function (data) { //company_status 1线上 0是线下
          if (data.code)
          {
            _this.setState({
              companyoption:data.data.list,
            }) ;
          }
          else{
            alert("提交失败!");
          }
        }.bind(this));
        RequireUtils.baseRequire('plan/product-select',{},function (data) {
          if (data.code)
          {
            _this.setState({
              productoption:data.data.list
            }) ;
          }
          else{
            alert("提交失败!");
          }
        }.bind(this));
      }else{
        this.setState({update:true,updateData:{}})
      }
    }.bind(this))
  }

  myBuyerAddShowModal(){
    var _this = this ;
    _this.setState({
      buyeradd:true,
    });
    RequireUtils.baseRequire('plan/company-select',{company_status:0},function (data) {
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
    RequireUtils.baseRequire('plan/product-select',{},function (data) {
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

  /**
   * 点击确定提交
   * @param e
   */

  render() {
    const {data,update,confirmLoading,add,updateData,productoption,companyoption,buyeradd,saleadd}=this.state;
    const columns = [{
      title: '归属合同',
      dataIndex: 'contract_name',
      key: 'contract_name',
    },{
      title: '供应商',
      dataIndex: 'saler_name',
      key: 'saler_name',
    },{
      title: '截止时间',
      dataIndex: 'end_date',
      key: 'end_date',
    },{
      title: '商品名称',
      dataIndex: 'goods_name',
      key: 'goods_name',
    },{
      title: '卸车场站',
      dataIndex: 'addr_name',
      key: 'addr_name',
    },
    //   {
    //   title: '关联订单',
    //   dataIndex: 'order',
    //   key: 'order',
    //   render:(text, record)=>(
    //     "查看"
    //   )
    // },
      {
      title: '当前状态',
      dataIndex: 'plan_status',
      key: 'plan_status',
      render: (text, record) => {
        if(text==0){ //表示正常
          return "正常" ;
        }else {
          return <span style={{color:"#de8c43"}}>终止</span>
        }
      }
    },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          var isCheck = true ;
          var mytext = '终止' ;
          if(record.plan_status==1){
            isCheck = false ;
            mytext = '启用' ;
          }
          return <span>
                  <a href="javaScript:void(0)" style={{marginRight:'10px'}}><Switch defaultChecked={isCheck} checked={isCheck} onChange={(checked)=>(onChange.bind(this)(record.plan_status,record.id))}/>&nbsp;&nbsp;{mytext}</a>
                  <a href="javaScript:void(0)" onClick={()=>this.myShowModal(record.id)}><Icon type="edit" />编辑</a>
                </span>
        },
      }];
    return (
      <div className={'my-table-title-center'}>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24} >
            <div style={{marginBottom:'10px',textAlign:'right'}}>
              <span style={{marginRight:'10px'}} onClick={()=>(this.myBuyerAddShowModal())}  style={{ cursor:"pointer"
              }}>
                 <Icon type="plus-circle-o" style={{marginRight:'8px'}} />
                  线下采购计划
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
        <Modal title="线下采购新增"
               visible={buyeradd}
               onOk={this.handleOk}
               confirmLoading={confirmLoading}
               onCancel={this.handleBuyerCancel}
               footer={null}
               width={'60%'}
        >
          <MyBuyerAddForm ref={'MyBuyerAddForm'} companyoption={companyoption} productoption={productoption} handleBuyerCancel={this.handleBuyerCancel} go={()=>this.fetch(this.state.pagination)}></MyBuyerAddForm>
        </Modal>

        <Modal title="线下采购编辑"
               visible={update}
               onOk={this.handleOk}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
               footer={null}
               width={'60%'}
        >
          <BueryUpdate ref={'BueryUpdate'} updateData={updateData} companyoption={companyoption} productoption={productoption}  handleCancel={this.handleCancel} go={()=>this.fetch(this.state.pagination)}></BueryUpdate>
        </Modal>
      </div >
    )
  }
}
export default PlanListTable;

