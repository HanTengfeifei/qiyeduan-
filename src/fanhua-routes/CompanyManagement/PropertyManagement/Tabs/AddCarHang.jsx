import React from 'react';
import { Form, Input, Select,  AutoComplete,message,DatePicker } from 'antd';
import {RequireUtils} from 'utils';
import'./AddCarHang.less'
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
    RequireUtils.baseRequire('/car/user-select',{},function (data) {
      if(data.code==1) {
        this.setState({
          driver:data.data.list,
        });
      }
      else{
        alert("信息失败！");
      }
    }.bind(this));
  }
  handleSubmit(){
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const params=values;
        var mylastcheck = values.last_check ;
        if(mylastcheck){
          mylastcheck = mylastcheck.format('YYYY-MM-DD') ;
        }
        values['last_check'] = mylastcheck ;
        params.scenario='add_g_car';
        params.car_type=1;
        RequireUtils.baseRequire('/car/add-car',params,function (data) {
          if(data.code==1) {
            message.success(data.msg);
            this.props.go();
            this.props.nbb.setState({
                visible: false,
                confirmLoading: false,
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
        sm: { span: 6},
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
      <Form onSubmit={this.handleSubmit} className={'add-car-hang'}>
        <FormItem
          {...formItemLayout}
          label="车牌号"
        >
          {getFieldDecorator('car_num', {
            rules: [ {
              required: true, message: '车牌号为必填项!',
            }],
          })(
            <Input maxLength={7}/>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="核载货总质量"
        >
          {getFieldDecorator('car_load', {
            rules: [{
              required: true, message: '核载货总质量为必填项!',
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
              { required: true, message: '联系人为必填项!' },
            ],
          })(
            <Select >
              {this.state.driver.map((item,index)=>{
                return <Option value={item.id} key={index}> {item.user_name}</Option>
              })
              }
            </Select>
          )}
        </FormItem>
        <FormItem
        {...formItemLayout}
        label="生产厂商"
        >
        {getFieldDecorator('prod_firm', {
        rules: [{
        required: false, message: '该选项为必填项!',
        }, {
        validator: this.validateToNextPassword,
        }],
        })(
        <Input type="text" />
        )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="货物类型"
        >
          {getFieldDecorator('cargo_type', {
            rules: [{
              required: false, message: '该选项为必填项!',
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
              required: false, message: '该选项为必填项!',
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
              required: false, message: '该选项为必填项!',
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
const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default  WrappedRegistrationForm ;
