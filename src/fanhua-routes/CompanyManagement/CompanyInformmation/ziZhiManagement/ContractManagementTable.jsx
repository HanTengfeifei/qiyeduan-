import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal } from 'antd';
import {RequireUtils} from 'utils';
import AddContractManagement from  './AddContractManagement' ;
import UpdateContractManagement from  './UpdateContractManagement' ;
import mystyle from './tabstyle.less'
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
      // pagination.total = data.data.count;
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

class ContractManagementTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      staionadd:false,
      staionupdate:false,
      imageFiles:[],
      pagination: {pageSize:10,limit:10},
      updateData:[],
      loading: true,
      id:"",
      url:"",
    };
    this.callback = this.callback.bind(this);
    this.addFieldStationList = this.addFieldStationList.bind(this);
    this.fetch=this.fetch.bind(this);
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
  onRef = (ref) => {
    this.child = ref
  }

  handleTableChange(pagination, filters, sorter) {
    myHandleTableChange.bind(this)(pagination, filters, sorter)
  }
  fetch(params = {}) {
    getTableData.bind(this)('company/cert-list',params)
  }
  componentDidMount() {
    this.fetch();
  }
  handleAddCancel = () => {
    // this.refs['AddContractManagement'].resetFields() ;
    this.setState({
      staionadd:false,
    });
  } ;
  handleUpateCancel = () => {
    this.refs['UpdateContractManagement'].resetFields() ;
    this.setState({
      staionupdate:false,
    });
  } ;
  addFieldStationList(id){
    this.setState({
      staionadd:true,
    });
console.log(this.child);
console.log(8888888888);
    console.log(id);
  }

  updateStaion(id,url){
    var _this = this ;
    var imgs=[];
    imgs.push(url);
    var newimg = imgs.map(function (item,index) {
            var myobj = {
              uid: index,
              name: item,
              status: 'done',
              url: item
            }  ;
            return myobj ;
          }) ;
    _this.setState({
      staionupdate:true,
      imageFiles:newimg,
      id:id,
          });
    // RequireUtils.baseRequire("contract/contract-info",{id:id},function (data) {
    //   if(data.code==1) {
    //     var list = data.data.contract;
    //     var imgs = data.data.images;
    //     var newimg = imgs.map(function (item,index) {
    //       var myobj = {
    //         uid: index,
    //         name: item.contract_url,
    //         status: 'done',
    //         url: RequireUtils.ip+item.url
    //       }  ;
    //       return myobj ;
    //     }) ;

        // console.log(newimg) ;
    //     _this.setState({
    //       staionupdate:true,
    //       updateData: list,
    //       imageFiles:newimg
    //     });
    //   }else{
    //     alert(data.msg) ;
    //   }
    // }.bind(this))
  }
  deleteStaion(e,id){
    e.stopPropagation();
    e.preventDefault();
    var context = this;
    Modal.confirm({
      title: '您确定要删除该合同吗？',
      content: '',
      onOk() {
        RequireUtils.baseRequire('contract/del-contract',{
          id: id,
        },function (data) {
          alert(data.msg);
          this.fetch(this.state.pagination) ;
        }.bind(context));
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  render() {
    const {data,staionadd,staionupdate,updateData,imageFiles ,id,pagination,loading,url}=this.state;
    const columns = [{
      title: '资质名称',
      dataIndex: 'cert_name',
      key: 'cert_name'
    }, {
      title: '资质描述',
      dataIndex: 'cert_desc',
      key: 'cert_desc',
    },{
      title: '状态',
      dataIndex: 'flag_name',
      key: 'flag_name',
    },
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          console.log(parseInt(record.cert_flag));
          if (parseInt(record.cert_flag)>0){
            return <span>
              <a href="javaScript:void(0)" onClick={
                () =>
                  this.updateStaion.bind(this)(record.id,record.cert_url)}
               style={{marginRight: '10px'}}><Icon type="edit" style={{marginRight: '5px'}}/>重新上传</a>
        </span>
          }
          else{
         return<span>
            <a href="javaScript:void(0)"
               onClick={()=>{
                this.setState({
                  staionadd:true,
                  id:record.id,
                });
              }
            }
               style={{marginRight: '10px'}}><Icon type="edit" style={{marginRight: '5px'}}/>上传</a>
        </span>
          }
        },
      }];

    return (
      <div className={'my-table-title-center'}>
        <Table
          columns={columns}
          dataSource={data}
          pagination={pagination}
          loading={loading}
          onChange={this.handleTableChange.bind(this)}
        />

        <Modal title="上传资质"
               visible={staionadd}
               onOk={this.handleOk}
               onCancel={this.handleAddCancel}
               footer={null}>
          <AddContractManagement
            ref='AddContractManagement'
            handleAddCancel={this.handleAddCancel}
            go={()=>this.fetch(this.state.pagination)}
            id={id}
            onRef={this.onRef}
          />
        </Modal>
        <Modal title="重新上传资质"
               visible={staionupdate}
               onOk={this.handleOk}
               onCancel={this.handleUpateCancel}
               footer={null}>

          <UpdateContractManagement ref={'UpdateContractManagement'}
                                    handleUpateCancel={this.handleUpateCancel}
                                    imageFiles={imageFiles} reactp = {this}
                                    id={id}
                                    go={()=>this.fetch(this.state.pagination)}/>
        </Modal>

      </div >
    )
  }
}
export default ContractManagementTable;
