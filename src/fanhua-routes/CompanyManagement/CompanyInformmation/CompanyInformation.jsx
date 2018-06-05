import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select ,Modal,message} from 'antd';
import {RequireUtils} from 'utils';
import CompanyMessageInput from './Tabs/CompanyMessageInput';
import AddressMessage from './Tabs/AddressMessage';
import OpenTicketInput from './Tabs/OpenTicketInput';
import AptitudeMessage from './ziZhiManagement/ContractManagement';
import CompanyMessageAvatar from './Tabs/CompanyMessageAvatar';
import ChangeCountMadel from './Tabs/ChangCountMadel';
import './CompanyInformation.less';
const TabPane = Tabs.TabPane;

class CompanyInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: 'Content of the modal',
      visible: false,
      confirmLoading: false,
      info:{},
      company_type_all:[],
      company_prop_all:[],
    };
    this.callback = this.callback.bind(this);
    this.findRoleAll=this.findRoleAll.bind(this);
    this.onRef=this.onRef.bind(this);
    // this.onRefS=this.onRefS.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  onRef(ref){
    this.child=ref;
  }
  // onRefS(refS){
  //   this.childS=refS;
  // }

  callback(key) {
    console.log(key);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
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
    }, 2000);
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };
  componentDidMount(){
    this.findRoleAll();
    RequireUtils.baseRequire('company/meta-select',{},function (data){
      if(data.code==1) {
        this.setState({
          company_type_all: data.data.leixing,
          company_prop_all: data.data.xingzhi,
        });
      }
      else{
        message(data.msg);
      }
    }.bind(this));
  }
  componentWillMount(){
    this.findRoleAll();
  }
  findRoleAll(){
    var context=this;
    RequireUtils.baseRequire('/company/company-info',{id:localStorage.getItem("company_id")},function (data) {
      if(data.code==1) {
        const info=data.data.info;
        this.setState({
          info:info,
        });
        localStorage.setItem("id",info.id);
        localStorage.setItem("company_owner",data.data.info.company_owner);
        localStorage.setItem("owner_phone",data.data.info.owner_phone);
        localStorage.setItem("company_contact",data.data.info.company_contact);
        localStorage.setItem("contact_phone",data.data.info.contact_phone);
        localStorage.setItem("company_abbr",data.data.info.company_abbr);
        localStorage.setItem("company_mail",data.data.info.company_mail);
        localStorage.setItem("prop_id",data.data.info.prop_id );
        localStorage.setItem("company_prop",data.data.info.company_prop);
        localStorage.setItem("type_id",data.data.info.type_id);
        localStorage.setItem("company_type",data.data.info.company_type);
        localStorage.setItem("company_desc",data.data.info.company_desc);
        this.child.setState({
          form: {
            company_name: {
              valid: true,
              value: info.company_name,
              error: ''
            },
            company_abbr: {
              valid: true,
              value: info.company_abbr,
              error: ''
            },
            type_id: {
              valid: true,
              value: info.type_id,
              error: ''
            },
            company_contact: {
              valid: true,
              value: info.company_contact,
              error: ''
            },
            contact_phone: {
              valid: true,
              value: info.contact_phone,
              error: ''
            },
            register_addr: {
              valid: true,
              value: info.register_addr,
              error: ''
            },
            company_desc: {
              valid: true,
              value: info.company_desc,
              error: ''
            },
            prop_id: {
              valid: true,
              value: info.prop_id,
              error: ''
            },
            license_num: {
              valid: true,
              value: info.license_num,
              error: ''
            },
            company_owner: {
              valid: true,
              value: info.company_owner,
              error: ''
            },
            owner_phone: {
              valid: true,
              value: info.owner_phone,
              error: ''
            },
            company_mail: {
              valid: true,
              value: info.company_mail,
              error: ''
            },
          }
        });
      }
      else{
        message.error(data.msg);
      }
    }.bind(this));
  }
  handleSubmit (e) {
    e.preventDefault();
    const info=this.state.info;
    var context=this;
    console.log(this.refs["child"].state.imageUrl);
    console.log(this.child.state);
    const{register_phone,bank_code}=info;
    const { form: {company_name,company_contact,contact_phone,type_id,prop_id,owner_phone,company_abbr,register_addr,company_desc,company_owner,license_num,company_mail}} = this.child.state;
    RequireUtils.baseRequire('company/modify-company',{id: info.id,
      company_name:company_name.value,
      register_phone:register_phone,
      // register_bank:register_bank.value,
      bank_code:bank_code,
      license_num:license_num.value,
      register_addr:register_addr.value,
      company_owner:company_owner.value,
      owner_phone:owner_phone.value,
      company_contact:company_contact.value,
      contact_phone:contact_phone.value,
      company_abbr:company_abbr.value,
      prop_id:prop_id.value,
      company_mail:company_mail.value,
      type_id:type_id.value,
      company_desc: company_desc.value,
      license_url:this.refs["child"].state.imageUrl,
    },function (data) {
      if (data.code==1)
      {
        message.success(data.msg);
        context.findRoleAll();
      }
      else{
        message.error(data.msg);
      }
    }.bind(this));
  }
  render() {
    const { visible, confirmLoading, ModalText ,info,company_prop_all,company_type_all} = this.state;
    return (
      <div>
        <Modal title={ModalText}
               visible={visible}
               onOk={this.handleOk}
               confirmLoading={confirmLoading}
               onCancel={this.handleCancel}
               width={520}
        >
          <ChangeCountMadel/>
        </Modal>
        <Row>
        </Row>

        <Row gutter={8}>
          <Col span={24}>
              <div style={{padding:'25px 15px'}}>
                  <span style={{fontSize:'20px',fontWeight:'bold'}}>公司信息</span>
              </div>
            <Card   type="card">
              <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                <TabPane tab="公司信息" key="1">
                  <CompanyMessageAvatar  imgUrl={info} ref="child" />
                  <CompanyMessageInput   company_type_all={ company_type_all}   company_prop_all={ company_prop_all} info={info}   sent={this.findRoleAll}  onRef={this.onRef} />
                  <Row gutter={8} style={{ marginTop: '10px' }}>
                    <Col span={4} offset={1}>
                      <Button  type="primary" onClick={this.handleSubmit}>保存</Button>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tab="开票信息" key="3">
                  <OpenTicketInput   info={this.state.info} sent={this.findRoleAll}></OpenTicketInput>
                </TabPane>
                <TabPane tab="资质信息" key="4">
                  <AptitudeMessage></AptitudeMessage>
                </TabPane>
              </Tabs>
            </Card>
          </Col>

        </Row>
      </div >
    )
  }
}
export default CompanyInformation;

