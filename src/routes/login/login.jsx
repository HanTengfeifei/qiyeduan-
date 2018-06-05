import React from 'react';
import { hashHistory } from 'dva/router';
import PropTypes from 'prop-types';
import { config } from 'utils';
import {RequireUtils} from 'utils';
import { Form, Icon, Input, Button ,message} from 'antd';
import reqwest from "reqwest";
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
  constructor(props){
    super(props);
    this.state={
      value:{}
    }
  }
  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        RequireUtils.baseRequire('site/account-login',values,function (data) {
          console.log(data);
          if(data.code==1) {
            window.localStorage.setItem('isLogin',1) ;
            window.location.href = "#/homepage";
            return ;
          }
          else{
            message.error(data.msg);
          }
        }.bind(this));
      };
    });
  }
  render() {
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;

    // Only show error after a field is touched.
    const userNameError = isFieldTouched('user_mobile') && getFieldError('user_mobile');
    const passwordError = isFieldTouched('user_pass') && getFieldError('user_pass');
    return (

      <Form layout="inline" onSubmit={this.handleSubmit}>
        <FormItem
          validateStatus={userNameError ? 'error' : ''}
          help={userNameError || ''}
        >
          {getFieldDecorator('user_mobile', {
            rules: [{ required: true, message: 'Please input your username!' }],
          })(
            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
          )}
        </FormItem>
        <FormItem
          validateStatus={passwordError ? 'error' : ''}
          help={passwordError || ''}
        >
          {getFieldDecorator('user_pass', {
            rules: [{ required: true, message: 'Please input your Password!' }],
          })(
            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            size="large"
            htmlType="submit"
            disabled={hasErrors(getFieldsError())}
          >
            Log in
          </Button>
        </FormItem>123
      </Form>
    );
  }
}

const WrappedHorizontalLoginForm = Form.create()(HorizontalLoginForm);
export default  WrappedHorizontalLoginForm;
