import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, AutoComplete,message } from 'antd';
import {RequireUtils} from 'utils';
import'./AddCarDriver.less';
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Opangtion;
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
  }
  componentDidMount(){
    this.props.onRef(this);
  }
  handleSubmit(){
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const params=values;
        params.company_id=localStorage.getItem("company_id");
        RequireUtils.baseRequire('/driver/add-driver',params,function (data) {
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
  } ;

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult ,options} = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
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
    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));
    return (
      <Form onSubmit={this.handleSubmit} className={'add-car-driver'}>
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
              label="身份证号码"
            >
              {getFieldDecorator('driver_card', {
                rules: [{
                  required: true, message: '该选项不能为空!',
                }, {
                  validator: this.validateToNextPassword,
                }],
              })(
                <Input type="text" maxLength={18}/>
              )}
            </FormItem>

        <FormItem
          {...formItemLayout}
          label="司机手机号码"
        >
          {getFieldDecorator('driver_mobile', {
            rules: [{
              required: true, message: '该选项不能为空!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" maxLength={11}/>
          )}
        </FormItem>
      </Form>
    );
  }
}
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default  WrappedRegistrationForm ;
