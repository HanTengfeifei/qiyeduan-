import React from "react";
import { Button, Form, Input, Row, Col } from 'antd';
import classNames from 'classnames';
import "./Formss.less";
import {RequireUtils} from 'utils';
import ReactDOM from 'react-dom';
const createForm = Form.create;
const FormItem = Form.Item;

function noop() {
  return false;
}
class Demo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      passBarShow: false, // 是否显示密码强度提示条
      rePassBarShow: false,
      passStrength: 'L', // 密码强度
      rePassStrength: 'L',
      begin:0,
      timeLeft:60,
      // password:"",
      // repassword:"",
      // code:""

    };
    this.afterEnd = this.props.afterEnd || this._afterEnd;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.checkPass2=this.checkPass2.bind(this);
    this._beginCountDown=this._beginCountDown.bind(this);
    this._afterEnd=this._afterEnd.bind(this);
    this.countdownfn=this.countdownfn.bind(this);
this.getUserMobile=this.getUserMobile.bind(this);
  }
  getUserMobile() {
    const obj = {user_mobile: ''};
    this.props.form.validateFields((err, values) => {
      obj.user_mobile=values.new_mobile;
    });
    return obj;
  }


  countdownfn(timeLeft, callback, begin) {
    if (timeLeft > 0) {
      this.state.begin = 1;
      let that = this;
      let interval = setInterval(function () {
        if (that.state.timeLeft < 1) {
          clearInterval(interval);
          callback(that)
        } else {
          let totalTime = that.state.timeLeft;
          that.setState({
            timeLeft: totalTime - 1
          })
        }
      }, 1000)
    }
  }
  _beginCountDown(e) {
    e.preventDefault();
    e.stopPropagation();
    if (this.state.begin === 1){
      return;
    }
const value=this.getUserMobile();
    RequireUtils.baseRequire('site/send-sms',value,function (data) {

    }.bind(this));
    let time = this.state.timeLeft;
    console.log("===lin===> time " + time);
    let afterEnd = this.afterEnd;
    let begin = this.state.begin;
    console.log("===lin===> start " + begin);
    this.countdownfn(time, afterEnd, begin)
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.form.validateFields((errors, values) => {
      if (!!errors) {
        console.log('Errors in form!!!');
        return;
      }
      console.log(values);
      RequireUtils.baseRequire('person/modify-mobile',values,function (data) {
        if (data)
        {
          alert(data.msg);
        }
        else{
          alert("提交失败!");
        }
        this.props.go();
        this.props.sent();
        this.props.form.resetFields();
        this.setState({
          begin:0,
          timeLeft:0
        });

        // RequireUtils.baseRequire('site/logout',{},function (data) {
        //   if(data.code==1){
        //     window.location.href="#/login";
        //     alert(data.msg);
        //   }
        //   else{
        //
        //   }
        // });

      }.bind(this));

    });
  }


  checkPass2(rule, value, callback) {
    const form = this.props.form;
    if (value && value.length!==11) {
      callback('请输入11位手机号');
    } else {
      callback();
    }
  }

  _afterEnd(that) {
    that.setState({
      begin : 0,
      timeLeft : 60,
    })
  }
  componentDidMount() {
    this.setState({
      begin : 0,
      timeLeft : 60,

    });
    this.props.form.resetFields();
  }

  render() {
    const { getFieldProps } = this.props.form;
    const rePassProps = getFieldProps('new_mobile', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请输入手机号',
      }, {
        validator: this.checkPass2,
      }],
    });
    const valid = getFieldProps('code', {
      rules: [{
        required: true,
        whitespace: true,
        message: '',
      }, {
        // validator: this.checkPass2,
      }],
    });
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <div className={'dsb-useimportant'}>
        <Form horizontal
              // form={this.props.form}
        >
          <Row>
            <Col span="18">
              <FormItem
                {...formItemLayout}
                label="手机号码"
              >
                <Input ref="user_mobile" {...rePassProps} type="telephone"
                       onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                       autoComplete="off" id="re_new_Pass"
                />
              </FormItem>
            </Col>
            <Col span="6">
              {this.state.rePassBarShow ? this.renderPassStrengthBar('re_new_Pass') : null}
            </Col>
          </Row>
          <Row>
            <Col span="18">
              <FormItem
                {...formItemLayout}
                label="验证码"
              >
                <Input {...valid} type="text"
                       onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                       autoComplete="off" id="code"
                />
              </FormItem>
            </Col>
            <Col span="6">
              <Button type="primary" onClick={this._beginCountDown} size={"small"} ghost>{ this.state.begin === 0 ? '点击获取验证码' : this.state.timeLeft}</Button>

            </Col>
          </Row>
          <Row>
            <Col span="18">
              <Col span="18" offset="6">
                <Button type="primary" onClick={this.handleSubmit}>提交</Button>
              </Col>
            </Col>
          </Row>
        </Form>
      </div>
    );
  }
}

Demo = createForm()(Demo);
export default Demo;
