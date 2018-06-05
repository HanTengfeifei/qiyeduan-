import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, DatePicker ,AutoComplete,message } from 'antd';
import {RequireUtils} from 'utils';
import'./AddCarHeader.less'
const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const residences = [{
  value: 'zhejiang',
  label: 'Zhejiang',
  children: [{
    value: 'hangzhou',
    label: 'Hangzhou',
    children: [{
      value: 'xihu',
      label: 'West Lake',
    }],
  }],
}, {
  value: 'jiangsu',
  label: 'Jiangsu',
  children: [{
    value: 'nanjing',
    label: 'Nanjing',
    children: [{
      value: 'zhonghuamen',
      label: 'Zhong Hua Men',
    }],
  }],
}];

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
  handleSubmit(){
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        var mylastcheck = values.last_check ;
        if(mylastcheck){
          mylastcheck = mylastcheck.format('YYYY-MM-DD');
        }
        values.last_check = mylastcheck;
        const params=values;
        params.scenario='add_t_car';
        params.car_type=0;
        console.log(params);
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
  }
  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  }
  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  }
  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }
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
      <Form onSubmit={this.handleSubmit} className={'my-add-car'}>
        <FormItem
          {...formItemLayout}
          label="车牌号"
        >
          {getFieldDecorator('car_num', {
            rules: [ {
              required: true, message: '车牌号不能为空!'
            } ,{
               message: '请确保车牌号只能为七位!',len:7,
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
              required: true, message: '请填写牵引总共质量!',
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
              { required: true, message: '请选择联系人!' },
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
              required: false, message: '请输入车架号!',
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
              required: false, message: '请输入燃料类型!',
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
              required: false, message: '请输入发动机号!',
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
              required: false, message: '请输入车牌号!',
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
              required: false, message: '请填入车审周期!',
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
              required: false, message: '请选择上次车审时间!',
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
