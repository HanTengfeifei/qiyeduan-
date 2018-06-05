
import React from "react";
import { Button, Form, Input, Row, Col } from 'antd';
import classNames from 'classnames';
import "./Forms.less";
import {RequireUtils} from 'utils';
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
    this.getPassStrenth=this.getPassStrenth.bind(this);
    this.checkPass=this.checkPass.bind(this);
    this.checkPass2=this.checkPass2.bind(this);
    this.renderPassStrengthBar=this.renderPassStrengthBar.bind(this);
    this._beginCountDown=this._beginCountDown.bind(this);
    this._afterEnd=this._afterEnd.bind(this);
    this.countdownfn=this.countdownfn.bind(this);
    this.flesh=this.flesh.bind(this);
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
  _beginCountDown() {
    if (this.state.begin === 1){
      return;
    }
    RequireUtils.baseRequire('person/get-code',{},function (data) {

    }.bind(this));
    let time = this.state.timeLeft;
    let afterEnd = this.afterEnd;
    let begin = this.state.begin;
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
      RequireUtils.baseRequire('person/modify-pass',values,function (data) {
        if (data)
        {
          this.props.sent();
          alert(data.msg);
        }
        else{
          alert("提交失败!");
        }
        this.props.form.resetFields();
        this.setState({
             begin:0,
          timeLeft:0
        });

      }.bind(this));

      });
  }

  getPassStrenth(value, type) {
    if (value) {
      let strength;
      // 密码强度的校验规则自定义，这里只是做个简单的示例
      if (value.length < 6) {
        strength = 'L';
      } else if (value.length <= 9) {
        strength = 'M';
      } else {
        strength = 'H';
      }
      if (type === 'new_pass') {
        this.setState({ passBarShow: true, passStrength: strength });
      } else {
        this.setState({ rePassBarShow: true, rePassStrength: strength });
      }
    } else {
      if (type === 'new_pass') {
        this.setState({ passBarShow: false });
      } else {
        this.setState({ rePassBarShow: false });
      }
    }
  }

  checkPass(rule, value, callback) {
    const form = this.props.form;
    this.getPassStrenth(value, 'new_pass');
    //
    // if (form.getFieldValue('new_pass')) {
    //   form.validateFields(['re_new_pass'], { force: true });
    // }
    callback();
  }

  checkPass2(rule, value, callback) {
    const form = this.props.form;
    this.getPassStrenth(value, 're_new_pass');
    if (value && value !== form.getFieldValue('new_pass')) {
      // form.validateFields(['re_new_pass'], { force: true });
      callback('两次输入密码不一致！');
    } else {
      callback();
    }
  }

  renderPassStrengthBar(type) {
    const strength = type === 'new_pass' ? this.state.passStrength : this.state.rePassStrength;
    const classSet = classNames({
      'ant-pwd-strength': true,
      'ant-pwd-strength-low': strength === 'L',
      'ant-pwd-strength-medium': strength === 'M',
      'ant-pwd-strength-high': strength === 'H',
    });
    const level = {
      L: '低',
      M: '中',
      H: '高',
    };

    return (
      <div>

      </div>
    );
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
  flesh(){

  }
  render() {
    const {code,password,repassword}=this.state;
    const { getFieldProps } = this.props.form;

    const passProps = getFieldProps('new_pass', {
      rules: [
        { required: true, whitespace: true, message: '请填写密码' },
        { validator: this.checkPass },
      ],
      onChange: (e) => {
        console.log('你的密码就是这样被盗的：', e.target.value);
      },
    });
    const rePassProps = getFieldProps('re_new_pass', {
      rules: [{required: true,whitespace: true, message: '改选项为必填项'},
              { validator: this.checkPass2}
              ],
    });
    const valid = getFieldProps('code', {
      rules: [{
        required: true,
        whitespace: true,
        message: '请正确填写验证码!',
      }, {
        // validator: this.checkPass2,
      }],
    });
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    };
    return (
      <div className={'dab-userimportant-form'}>
        <Form horizontal form={this.props.form}>
          <Row>
            <Col span="18">
              <FormItem
                {...formItemLayout}
                label="密码"
              >
                <Input {...passProps} type="password"
                       onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                       autoComplete="off" id="new_pass"
                />
              </FormItem>
            </Col>
            <Col span="6">
              {/*{this.state.passBarShow ? this.renderPassStrengthBar('new_pass') : null}*/}
            </Col>
          </Row>

          <Row>
            <Col span="18">
              <FormItem
                {...formItemLayout}
                label="确认密码"
              >
                <Input {...rePassProps} type="password"
                       onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                       autoComplete="off" id="re_new_Pass"
                />
              </FormItem>
            </Col>
            <Col span="6">
              {/*{this.state.rePassBarShow ? this.renderPassStrengthBar('re_new_Pass') : null}*/}
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
              {this.state.rePassBarShow ? this.renderPassStrengthBar('re_new_Pass') : null}
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
