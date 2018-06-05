import React from "react";
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Modal } from 'antd';
import { Divider } from 'antd';
import Form from './Forms';
import Forms from './Formss';
class Security extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: '重置密码',
      ModalText2: '更改手机号',
      visible: false,
      visible2:false,
      confirmLoading: false,
      confirmLoading2:false,
    }
    this.callback = this.callback.bind(this);
    this.close=this.close.bind(this);
    this.close2=this.close.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  showModal = () => {
    this.setState({
      visible: true,
    });

  }
  showModal2 = () => {
    this.setState({
      visible2: true,
    });

  }

  close(){
    // this.refs["form"].flesh();
    this.props.go();
    this.setState({
      ModalText: '重置密码'
    })
  }
  close2(){
    // this.refs["form"].flesh();
    this.props.go();
  }
  handleOk = () => {
    const context=this;
    this.setState({

      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      // context.props.fresh();
      // this.refs["form"].handleSubmit(e);
    }, 500);
  }
  handleOk2 = () => {
    const context=this;
    this.setState({

      confirmLoading2: true,
    });
    setTimeout(() => {
      this.setState({
        visible2: false,
        confirmLoading2: false,
      });
      // context.props.fresh();
      // this.refs["form"].handleSubmit(e);
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });

    this.refs['form'].resetFields() ;
  } ;
  handleCancel2 = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible2: false,
    });
  }
  render() {
    const{user_pass,user_phone}=this.props.info;
    var { visible,visible2,confirmLoading,confirmLoading2, ModalText,ModalText2 }=this.state;
    return (
      <div>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            登录手机:
          </Col>
          <Col offset={-2} span={4} >
            {user_phone}
          </Col>
          <Col span={16}>
            <Button  className={"button1"}  onClick={this.showModal2} type="primary">申请变更</Button>
            <Modal title="更改手机号"
                   visible={visible2}
                   onOk={this.handleOk2}
                   confirmLoading={confirmLoading2}
                   onCancel={this.handleCancel2}
                   footer={null}
                   // afterClose={this.close2}
            >
              <Forms ref="forms"  go={this.props.go} info={this.props.info} sent={this.handleOk2}  />
            </Modal>
          </Col>
        </Row>
        <Divider></Divider>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={4} >
            登录密码:
          </Col>
          <Col span={4} >
            {/*{user_pass}*/}
          </Col>
          <Col span={16}>
            <Button  className={"button1"}   onClick={this.showModal} type="primary">重置密码</Button>
            <Modal title='重置密码'
                   visible={visible}
                   onOk={this.handleOk}
                   confirmLoading={confirmLoading}
                   onCancel={this.handleCancel}
                   footer={null}
                   // afterClose={this.close}
            >
              <Form  ref="form"  go={this.props.go} info={this.props.info} sent={this.handleOk}  />
            </Modal>
          </Col>
        </Row>
        <Divider></Divider>
      </div >
    )
  }
}
export default Security;
