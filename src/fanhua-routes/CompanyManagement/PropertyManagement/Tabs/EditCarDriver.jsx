import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select,  AutoComplete,message } from 'antd';
import {RequireUtils} from 'utils';
import'./EditCarHang.less';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      autoCompleteResult: [],
      driver:[],
    };
    this. handleConfirmBlur=this.handleSubmit.bind(this);
    this.reset=this.reset.bind(this);
    this.handleSubmit=this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.props.onRefS(this);
  }
  handleSubmit(e){
    e.preventDefault(e);
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const params=values;
        params.id=this.props.record.id;
        console.log(params);
        RequireUtils.baseRequire('/driver/modify-driver',params,function (data) {
          if(data.code==1) {
            message.success(data.msg);
            this.props.go();
          }
          else{
            message.error(data.msg);
          }
          this.props.form.resetFields();
        }.bind(this));
      }
    });
  }
  reset(){
    this.props.form.resetFields();
  }
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult ,options} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };
    // const prefixSelector = getFieldDecorator('prefix', {
    //   initialValue: '86',
    // })(
    //   <Select style={{ width: 70 }}>
    //     <Option value="86">+86</Option>
    //     <Option value="87">+87</Option>
    //   </Select>
    // );

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="司机姓名"
        >
          {getFieldDecorator('driver_name', {
            rules: [ {
              required: true, message: '该选项不能为空!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="司机身份证号"
        >
          {getFieldDecorator('driver_card', {
            rules: [{
              required: true, message: '该选项不能为空!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" maxLength={18} />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="司机手机号"
        >
          {getFieldDecorator('driver_mobile', {
            rules: [{
              required: true, message: '该选项不能为空!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" maxLength={11} />
          )}
        </FormItem>
      </Form>
    );
  }
}
const WrappedRegistrationForm = Form.create({mapPropsToFields(props) {
    return {
      driver_name: Form.createFormField({
        ...props.record.driver_name,
        value: props.record.driver_name,
      }),
      driver_mobile: Form.createFormField({
        ...props.record.driver_mobile,
        value: props.record.driver_mobile,
      }),
      driver_card: Form.createFormField({
        ...props.record.driver_card,
        value: props.record.driver_card,
      }),
    };
  },})(RegistrationForm);
export default  WrappedRegistrationForm ;
