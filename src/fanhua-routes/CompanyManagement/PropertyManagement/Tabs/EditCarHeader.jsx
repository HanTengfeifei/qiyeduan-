import React from 'react';
import { Form, Input, Select,  Button, AutoComplete,DatePicker,message } from 'antd';
import {RequireUtils} from 'utils';
import moment from  'moment';
import'./EditCarHeader.less'
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
  }
  componentDidMount(){
    this.props.onRefS(this);
    RequireUtils.baseRequire('/car/user-select',{},function (data) {
      if(data.code==1) {
        console.log (data);
        this.setState({
          driver:data.data.list,
        });

      }
      else{
        alert("信息失败！");
      }
    }.bind(this));
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
       var mylastcheck =  values['last_check'] ;
       if(mylastcheck){
         mylastcheck =  mylastcheck.format('YYYY-MM-DD') ;
       }
        values['last_check'] = mylastcheck ;
        const params=values;
        params.scenario='modify_t_car';
        params.car_type=0;
        params.id=this.props.record.id;
        console.log(params);
        RequireUtils.baseRequire('/car/modify-car',params,function (data) {
          if(data.code==1) {
            message.success(data.msg);
            this.props.go();
            this.props.nbb.setState({
              visible2: false,
            });
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

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  };

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
      <Form onSubmit={this.handleSubmit} className={"update-edit-car-header"}>
        <FormItem
          {...formItemLayout}
          label="车牌号"
        >
          {getFieldDecorator('car_num', {
            rules: [ {
              required: true, message: '车牌号不能空!',
            }],
          })(
            <Input maxLength={7}/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="准牵引总质量"
        >
          {getFieldDecorator('car_load', {
            rules: [{
              required: true, message: '准牵引总质量不能空!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系人"
        >
          {getFieldDecorator('car_owner', {
            rules: [
              { required: true, message: '联系人不能空!' },
            ],
          })(
            <Select >
              {this.state.driver.map((item,index)=>{
                return <Option value={item.id} key={index}>{item.user_name}</Option>
              })
              }
            </Select>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="车架号"
        >
          {getFieldDecorator('car_vin', {
            rules: [{
              required: false, message: '该选项不能空!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="燃料类型"
        >
          {getFieldDecorator('car_fuel', {
            rules: [{
              required: false, message: '该选项不能空!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="发动机号"
        >
          {getFieldDecorator('car_motor', {
            rules: [{
              required: false, message: '该选项不能空!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="车辆型号"
        >
          {getFieldDecorator('car_model', {
            rules: [{
              required: false, message: '该选项不能空!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="车审周期"
        >
          {getFieldDecorator('check_interval', {
            rules: [{
              required: false, message: '该选项不能空!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="上次车审"
        >
          {getFieldDecorator('last_check', {
            rules: [{
              required: false, message: '该选项不能空!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <DatePicker
              placeholder=""
              style={{width:'100%'}} />
          )}
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create({mapPropsToFields(props) {
    var last_check = '';
    if(props.record.last_check){
        last_check = moment(props.record.last_check,"YYYY-MM-DD") ;
    }

    return {
      car_num: Form.createFormField({
        ...props.record.car_num,
        value: props.record.car_num,
      }),
      car_load: Form.createFormField({
        ...props.record.car_load,
        value: props.record.car_load,
      }),
      car_owner: Form.createFormField({
        ...props.record.car_owner,
        value: props.record.car_owner,
      }),
      car_vin: Form.createFormField({
        ...props.record.car_vin,
        value: props.record.car_vin,
      }),
      car_fuel: Form.createFormField({
        ...props.record.car_fuel,
        value: props.record.car_fuel,
      }),
      car_motor: Form.createFormField({
        ...props.record.car_motor,
        value: props.record.car_motor,
      }),
      car_model: Form.createFormField({
        ...props.record.car_model,
        value: props.record.car_model,
      }),
      check_interval: Form.createFormField({
        ...props.record.check_interval,
        value: props.record.check_interval,
      }),
      last_check: Form.createFormField({
        ...props.record.last_check,
        value: last_check,
      }),

    };
  },})(RegistrationForm);
export default  WrappedRegistrationForm ;
