import   React from 'react';
import {
  Form, Select, InputNumber, Switch, Radio,
  Slider, Button, Upload, Icon, Rate,Input,Row,DatePicker,Col,
} from 'antd';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

class Demo1 extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  handleSelectChange = (value) => {
    console.log(value);
    this.props.form.setFieldsValue({
      note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };
    return (
      <Form onSubmit={this.handleSubmit}>
        <Row gutter={48}>
          <Col span={12}>
        <FormItem
          label="用户姓名"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('name', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input />
          )}
        </FormItem>
          </Col>
          <Col span={12}>
          <FormItem
            label="注册时间"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
          >
            {getFieldDecorator('time', {
              rules: [{ type: 'object', required: true, message: 'Please select time!' }],
            })(
              <DatePicker />
            )}
          </FormItem>
        </Col>

        </Row>
        <Row gutter={48}>
          <Col span={12}>
        <FormItem
          label="账号"
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 8 }}
        >
          {getFieldDecorator('account', {
            rules: [{ required: true, message: 'Please input your note!' }],
          })(
            <Input />
          )}
        </FormItem>
          </Col>
          <Col span={12}>
          <FormItem
            label="状态"
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 8 }}
          >
            {getFieldDecorator('status', {
              rules: [{ required: true, message: 'Please input your note!' }],
            })(
              <Select placeholder="Please select a country">
                <Option value="china">全部</Option>
                <Option value="use">正常</Option>
              </Select>
            )}
          </FormItem>
        </Col>

        </Row>
        <FormItem
          {...formItemLayout}
          label="Select[multiple]"
        >
          {getFieldDecorator('select-multiple', {
            rules: [
              { required: true, message: 'Please select your favourite colors!', type: 'array' },
            ],
          })(
            <Select mode="multiple" placeholder="Please select favourite colors">
              <Option value="1">管理</Option>
              <Option value="2">市场</Option>
              <Option value="3">系统管理员</Option>
              <Option value="4">调度</Option>
              <Option value="5">结算</Option>
              <Option value="6">财务</Option>
              <Option value="7">司机</Option>
              <Option value="8">客户经理</Option>
            </Select>
          )}
        </FormItem>

        <FormItem
          wrapperCol={{ span: 8, offset: 4 }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </FormItem>
      </Form>
    );
  }
}

const Demo1App = Form.create()(Demo1);
export  default  Demo1App ;
