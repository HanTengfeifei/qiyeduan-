import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal,Divider } from 'antd';
import AddCompany from './AddCompany' ;
import createHistory from 'history/createHashHistory';
import CompanyChange from './CompanyChange' ;

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

class CompanyRelation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      companyadd:false,
      staionupdate:false,
      loading: false,
      ischanging:false
    };
    this.callback = this.callback.bind(this);
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

  componentDidMount() {
    RequireUtils.baseRequire('person/my-company',{},function (data) {
      if(data.code==1) {
        var list = data.data;
        var flag = false ;
        if(list.status==1){
          flag = true ;
        }
        if(!list.user){
          list.user = {} ;
        }
       this.setState({
          data:list,
          ischanging:flag
        });

      }else{
        // alert(data.msg);
      }
    }.bind(this));
  }

  handleAddCancel = () => {
    this.refs['AddCompany'].resetFields() ;
    this.setState({
      companyadd:false,
    });
  } ;
  handleIsChangeCancel= () => {
    this.setState({
      ischanging:false,
    });
  } ;
  handleChangeCancel = () => {
    this.refs['CompanyChange'].resetFields() ;
    this.setState({
      companychange:false,
    });
  } ;

  addCompayList(){
      this.setState({
        companyadd:true
      })
  }
  compayChange(){
    this.setState({
      companychange :true
    })
  }
  render() {
    const {companyadd,companychange,data,ischanging}=this.state;

   /* const {company_name} =  ;*/
    const user = data.user?data.user:{} ;
    return (
      <div className={'my-table-title-center my-custom-padding'}>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24} >
            <span style={{display:data.status==1?'block':'none'}}>正在申请中。。。。</span>
            <div style={{display:data.status==1?'none':'block'}}>
              <div style={{marginBottom:'10px',textAlign:'right'}}>
                    <span style={{marginRight:'15px'}} onClick={this.compayChange.bind(this)}>
                      <Icon type="environment-o" style={{marginRight:'8px'}} />
                      申请变更
                    </span>
                    {/*<span onClick={this.addCompayList.bind(this)} style={{display:data.status==2?'none':'display'}}>*/}
                       {/*<Icon type="plus-circle-o" style={{marginRight:'8px'}} />*/}
                        {/*新增*/}
                    {/*</span>*/}
              </div>
            </div>
          </Col>
        </Row>
        <div style={{display:data.status==2?'block':'none'}}>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={4} >
              公司名称:
            </Col>
            <Col span={20}>
              {user.company_name}
            </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={4} >
              职务:
            </Col>
            <Col span={20}>
              {user.role_name}
            </Col>
          </Row>
          <Divider></Divider>
          <Row gutter={8} style={{ marginTop: '10px' }}>
            <Col span={4} >
              状态:
            </Col>
            <Col span={20}>
              {user.status_name}
            </Col>
          </Row>
          <Divider></Divider>
        </div>
        <Modal title="新增公司关系"
               visible={companyadd}
               onOk={this.handleOk}
               onCancel={this.handleAddCancel}
               footer={null}>
          <AddCompany ref={'AddCompany'} handleAddCancel={this.handleAddCancel} ></AddCompany>
        </Modal>
        <Modal title="申请变更"

               visible={companychange}
               onOk={this.handleOk}
               onCancel={this.handleChangeCancel}
               footer={null}>

          <CompanyChange ref={'CompanyChange'} handleChangeCancel={this.handleChangeCancel} ></CompanyChange>
        </Modal>
      </div >
    )
  }
}
export default CompanyRelation;
