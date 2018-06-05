import React from 'react';
import { hashHistory } from 'dva/router';
// import PropTypes from 'prop-types';
import { Button, Row, Input ,message} from 'antd';
import loginIn from '../../../assets/img/login_in.png' ;
import { Tabs, Icon,Form,Col } from 'antd';
import { config } from 'utils';
import {RequireUtils} from 'utils';
import './Register.less';
const TabPane = Tabs.TabPane;
const FormItem = Form.Item;



class LoginTwo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      yzm:false,
      enter:false,
      timeInterval:60,
      nervelchangeInterval:60
    };
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.form.validateFields();
  }



  getYZM(){
    var form = this.props.form ;
    var tel = form.getFieldValue('register_tel') ;
    if(!tel){
        message.error("请填写手机号码！") ;
        return false;
    }
    var _this = this ;
    var {yzm,timeInterval,nervelchangeInterval} = this.state ;
    if(!yzm){
      _this.setState({
        yzm:true,
      }) ;
      var timer =  setInterval(function () {
        if(timeInterval==0){
          clearInterval(timer) ;
          _this.setState({
            yzm:false,
            timeInterval:nervelchangeInterval
          })
        }else{
          _this.setState({
            yzm:true,
            timeInterval:timeInterval--
          })
        }
      },1000)
    }

    var form = this.props.form ;
    var tel = form.getFieldValue('register_tel') ;
    RequireUtils.baseRequire('site/send-sms',{user_mobile:tel},function (data) {

    })
  }

  handleSubmit = (e) => {
    var form = this.props.form ;
    var tel = form.getFieldValue('register_tel') ;
    var pass =  form.getFieldValue('register_pass') ;
    if(!tel){
      message.error("请填写手机号") ;
      return false ;
    }
    if(tel.length!=11){
      message.error("手机号码为11位") ;
      return false ;
    }
    if(!pass){
      message.error("验证码不能为空") ;
      return false ;
    }
    if(pass.length!=4){
      message.error("验证码为4位") ;
    }
    e.preventDefault();
    this.setState({
      enter:true
    }) ;

    RequireUtils.baseRequire('site/sms-login',{user_mobile:tel,sms_code:pass},function (data) {
      if(data.code==1) {
        window.location.href = "#/Home";
        return ;
      }
      else{
        message.error(data.msg);
        this.setState({
          enter:false
        }) ;

      }
    }.bind(this));
    // this.props.form.validateFields((err, values) => {
    //   console.log(values);
    //   if (!err) {
    //
    //   };
    // });
  } ;


  switchToPass(){
    window.location.href = "#/Login1" ;
  }

  render() {
    const { getFieldDecorator} = this.props.form;
    const {yzm,timeInterval,enter} = this.state ;
    return (
          <div>
              <div className="register card">
                <div className="logo">
                  <img
                    alt={'logo'}
                    src={loginIn}/>
                  {/*<span>{config.name}</span>*/}
                </div>
              <Form >
                <Row >
                  <div style={{}}>
                    <FormItem
                    >
                      {getFieldDecorator('register_tel', {
                        rules: [{ required: false, message: '密码不能为空!' }],
                      })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入注册手机号" />
                      )}
                    </FormItem>
                  </div>
                </Row>
                <Row style={{marginBottom:'10px'}}>
                  <div style={{}}>
                    <Col span={16}>
                      <div style={{padding:'0 5px 0 0'}}>
                        <FormItem
                        >
                          {getFieldDecorator('register_pass', {
                            rules: [{ required: false, message: '密码不能为空!' }],
                          })(
                            <Input prefix={<Icon   type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="请输入验证码" />
                          )}
                        </FormItem>
                      </div>
                    </Col>
                    <Col span={8}>
                      <Button type="primary"  htmlType="submit" disabled={yzm} onClick={this.getYZM.bind(this)}>{yzm?timeInterval+"s":"获取验证码"}</Button>
                    </Col>
                  </div>
                </Row>
                <Row>
                  <Col>
                    <div style={{textAlign:'right',color:'red',cursor:'pointer'}} onClick={this.switchToPass.bind(this)}>密码登录</div>
                  </Col>
                </Row>
                <Row style={{textAlign: 'center'}}>
                  <Button type="primary" size="large"   style={{marginTop:'20px'}}  htmlType="submit" disabled={enter} onClick={this.handleSubmit}>注册/登录</Button>
                </Row>
              </Form>
            </div>
          </div>
    )
  }
}
LoginTwo= Form.create()(LoginTwo);
export default LoginTwo;

