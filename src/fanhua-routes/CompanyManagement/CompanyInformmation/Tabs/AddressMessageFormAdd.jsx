import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import {RequireUtils} from 'utils';
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
      residences:[],
      confirmDirty: false,
      autoCompleteResult: [],
      options:[{
        value: 'zhejiang',
        label: 'Zhejiang',
        isLeaf: false,
      }, {
        value: 'jiangsu',
        label: 'Jiangsu',
        isLeaf: false,
      }],
    };
    this.flag=0;
    this. handleConfirmBlur=this.handleSubmit.bind(this);
  }
  componentDidMount(){
    this.props.onRef(this);
    RequireUtils.baseRequire('/common/get-district',{parent_code :""},function (data) {
      if(data.code==1) {
        console.log(data.data.list);
        console.log(data.data.count);
        const list=data.data.list.map(function(item){
          const obj={
            label:item.district_name,
            value:item.district_name,
            isLeaf:false,
            id:item.id,
            district_code:item.district_code,
            parent_code:item.parent_code,
            district_level:item.district_level
          };
          return obj;
        });
        this.setState({
          options:list
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  }
  onChange = (value, selectedOptions) => {
    console.log(value, selectedOptions);
  }
  loadData = (selectedOptions) => {
    let targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    if (targetOption.district_level<=2) {

      RequireUtils.baseRequire('/common/get-district', {parent_code: targetOption.district_code}, function (data) {
        if (data.code == 1) {
          console.log(data.data.list);
          console.log(data.data.count);
          const list = data.data.list.map(function (item) {
            const obj = {
              label: item.district_name,
              value: item.district_name,
              isLeaf: false,
              id: item.id,
              district_code: item.district_code,
              parent_code: item.parent_code,
              district_level: item.district_level
            };
            return obj;
          });
          setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = list;
            this.setState({
              options: [...this.state.options],
            });
          }, 1000);
        }
        else {
          alert("获取用户信息失败！");
        }
      }.bind(this));

      // load options lazily
    }
    else{
    targetOption.loading = false;
    targetOption.isLeaf=true;
      this.setState({
        options: [...this.state.options,targetOption],
      });
    return;
    }
  }
  handleSubmit(){
    // e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const params={
        };
        params.company_id=localStorage.getItem("company_id");
        params.addr_contact=values.addr_contact;
        params.addr_name=values.addr_name;
        params.addr_phone=values.addr_phone;
        params.addr_province=values.pp[0];
        params.addr_city=values.pp[1];
        params.addr_county= values.pp[2];
        params.addr_detail=values.addr_detail;

        RequireUtils.baseRequire('/company/add-addr',params,function (data) {
          if(data.code==1) {
            alert(data.msg);
            this.props.go();
          }
          else{
            alert("添加地址信息失败！");
          }
          this.props.form.resetFields();
        }.bind(this));

      }
    });
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
          label="地址名称"
        >
          {getFieldDecorator('addr_name', {
            rules: [ {
              required: true, message: 'Please input your E-mail!',
            }],
          })(
            <Input />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系人"
        >
          {getFieldDecorator('addr_contact', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="联系人电话"
        >
          {getFieldDecorator('addr_phone', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="地址详情"
        >
          {getFieldDecorator('addr_detail', {
            rules: [{
              required: true, message: 'Please input your password!',
            }, {
              validator: this.validateToNextPassword,
            }],
          })(
            <Input type="text" />
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="送货地址"
        >
          {getFieldDecorator('pp', {
            initialValue: ['zhejiang', 'hangzhou', 'xihu'],
            rules: [{ type: 'array', required: true, message: 'Please select your habitual residence!' }],
          })(
            <Cascader options={options}
                      loadData={this.loadData}
                      onChange={this.onChange}
                      changeOnSelect />
          )}
        </FormItem>
      </Form>
    );
  }
}

const WrappedRegistrationForm = Form.create()(RegistrationForm);
export default  WrappedRegistrationForm ;
