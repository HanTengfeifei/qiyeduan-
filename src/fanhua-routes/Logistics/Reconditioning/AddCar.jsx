import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker, Button, AutoComplete,Tabs,Divider,Radio,message } from 'antd';
import mystyle from './tabstyle.less'
import moment from 'moment';
import 'moment/locale/zh-cn';
import {RequireUtils} from 'utils';
import './AddCar.less';
// moment.locale('zh-cn');
const Option = Select.Option;
const RadioGroup = Radio.Group;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;
function valueChange(name,value) {
  var {form} = this.state ;
  form[name] = value ;
  this.setState({
    form:form
  })
}
class AddCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      addr_select_all:[],
      provider_all:[],
      contract_select:[],
      order_source:"",
      saler_id:"",
      goods_stock:"",
      contact_id:"",
      buyer_contact_id_all:[],
      stock_type:"",
      productDetail:{},
      valuesAll:{},
      status:0,
      station_all:[],
      flag:0,
      company_car_all:[],
      company_id:"",
      start_date:null,
      driver_select_all:[],
      body_car_all:[],
      head_car_all:[],
      car_head:"",
      driver1:"",
      car_body:"",
      send_num:"",
      prod_id:"",
      product_all:[],
    };
    this.callback = this.callback.bind(this);
    this.valueChange=this.valueChange.bind(this);
    this.clearForm=this.clearForm.bind(this);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      console.log('Received values of form: ', this.state);
      if (!err) {
        const newValues=values;
        newValues.start_date=values.start_date&&values.start_date.format('YYYY-MM-DD');
      RequireUtils.baseRequire('car-free/add-free',
      //   {
      //   car_head: this.state.car_head,
      //   driver1: this.state.driver1,
      //   car_body: this.state.car_body,
      //   send_num: this.state.send_num,
      //   company_id: this.state.company_id,
      //   start_date: this.state.start_date,
      //   prod_id: this.state.prod_id,
      // },
        newValues,
        function (data) {
        if (data.code == 1) {
          message.success(data.msg);
          this.clearForm();
        }
        else {
          message.error(data.msg);
          this.clearForm();
        }
      }.bind(this));
    }
  });
  }
  clearForm(){
    // const _this=this;
    this.props.form.resetFields();
    // console.log("我走啦！");
    // this.setState({
    //   send_num:"",
    //   company_id:"",
    //   car_head:"",
    //   car_body:"",
    //   driver1:"",
    //   start_date:null,
    //   driver_select_all:[],
    // body_car_all:[],
    // head_car_all:[],
    // product_all:[],
    // });
  }
  callback(value) {
    console.log(value);
    this.props.sent(value);
  }
  valueChange(name,value) {
    if(name==="company_id"){
      RequireUtils.baseRequire('car-free/car-select',{company_id:value},function (data){
        if(data.code==1){
          var form = this.state;
          form[name] = value;
          form.driver_select_all=data.data.list.driver;
          form.body_car_all=data.data.list.body;
          form.head_car_all=data.data.list.head;
          form.product_all=data.data.list.product;

          this.setState({
            ...form
          });
        }
        else{
          var form = this.state ;
          form[name] = value ;
          form.driver_select_all=[];
          form.body_car_all=[];
          form.head_car_all=[];
          form.product_all=[];
          this.setState({
            ...form
          });
          alert("获取用户信息失败！");
        }
      }.bind(this));

    }
    if(name==="saler_id"){
      this.props.sentParents(value);
      RequireUtils.baseRequire('order/contract-select',{saler_id:value},function (data){
        if(data.code==1) {
          var form = this.state ;
          form[name] = value ;
          this.setState({
            ...form,
            contract_select: data.data.list,
          });
        }
        else{
          message.error(data.msg);
        }
      }.bind(this));
    }
    if(name==="status"){
      var form = this.state ;
      form[name] = parseInt(value);
      this.setState({
        ...form
      })
    }
    else{
      console.log(value);
      var form = this.state ;
      form[name] = value ;
      this.setState({
        ...form
      })
    }
  }
  // componentWillUpdate(){
  //   console.log(this.state.station_all[0].name);
  // }

  componentWillMount(){
    RequireUtils.baseRequire('order/company-select',{},function (data){
      if(data.code==1) {
        this.setState({
          provider_all: data.data.list,
        });
      }
      else{
        message.error(data.msg);
      }
    }.bind(this));
    RequireUtils.baseRequire('order/user-select',{},function (data){
      if(data.code==1) {
        this.setState({
          buyer_contact_id_all: data.data.list,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
    RequireUtils.baseRequire('order/addr-select',{},function (data){
      if(data.code==1) {
        this.setState({
          company_car_all: data.data.list,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));

  }
  componentDidMount(){
    this.props.onRefS(this);
    RequireUtils.baseRequire('order-deliver/company-select',{},function (data){
      if(data.code==1) {
        this.setState({
          company_car_all: data.data.list,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  }
  onChange = (e) => {

    this.props.form.resetFields() ;
    if( e.target.value==0){
      var form = this.state ;
      form.driver_select_all=[];
      form.body_car_all=[];
      form.head_car_all=[];
      form.product_all=[];
      this.setState({
        ...form,
        flag: e.target.value,
      });
      RequireUtils.baseRequire('order-deliver/company-select',{},function (data){
        if(data.code==1) {
          this.setState({
            company_car_all: data.data.list,
            // flag: e.target.value,
          });
        }
        else{
          alert("获取用户信息失败！");
        }
      }.bind(this));
    }
    else{
      RequireUtils.baseRequire('car-free/car-select',{},function (data){
        if(data.code==1) {
          var form = this.state;
          form.driver_select_all=data.data.list.driver;
          form.body_car_all=data.data.list.body;
          form.head_car_all=data.data.list.head;
          form.product_all=data.data.list.product;

          this.setState({
            ...form,
            flag: e.target.value,
          });
        }
        else{
          var form = this.state ;
          form.driver_select_all=[];
          form.body_car_all=[];
          form.head_car_all=[];
          form.product_all=[];
          this.setState({
            ...form,
            flag: e.target.value,
          });
          alert("获取用户信息失败！");
        }
      }.bind(this));
    }
  }
  render() {
    const {flag,company_car_all,driver_select_all,body_car_all,head_car_all,product_all}=this.state;
    const{provider_all,buyer_contact_id_all,contract_select }=this.state;
    const { getFieldDecorator } = this.props.form;
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
    return (
      <div>
        <Row style={{marginTop:'10px'}}>
          <RadioGroup onChange={this.onChange} value={this.state.flag}>
            <Radio value={0}>承运商车辆</Radio>
            <Radio value={1}>自有车辆</Radio>
          </RadioGroup>
        </Row>
        <Divider />
        <Form onSubmit={this.handleSubmit} className={'my-add-car'}>
          {flag ?
            <FormItem
              {...formItemLayout}
            >
            <Col span={11}>
              <div></div>
            </Col>
            </FormItem>
            :
            <FormItem
              {...formItemLayout}
              label="承运商"
            >
              {getFieldDecorator('company_id', {
                rules: [{
                  required: true, message: ''
                }],
                initialValue: null,
              })(
                <Select dropdownMatchSelectWidth={true} style={{width: "100%"}}
                        onChange={(value) => this.valueChange.bind(this)('company_id', value)}
                        // onSelect={(value) => this.valueChange.bind(this)('company_id', value)}
                >
                  {
                    company_car_all.map((item)=>{
                      return  (<Option value={item.id}>{item.company_name}</Option>);
                    })
                  }
                </Select>
              )}
            </FormItem>
          }
          <FormItem
            {...formItemLayout}
            label="到站时间"
          >
            {getFieldDecorator('start_date', {
              rules: [ {
                required: true, message: ''
              } ],
              // initialValue:this.state.company_id,
            })(
              <DatePicker
                style={{ width: "100%"}}
                onChange={(date) => this.valueChange('start_date', date.format('YYYY-MM-DD')) }
                // defaultValue={this.state.start_date}
                // value={moment(this.state.start_date)}
                allowClear={true}
              />
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="车头牌号"
          >
            {getFieldDecorator('car_head', {
              rules: [ {
                required: true, message: ''
              } ],
              // initialValue:this.state.car_head,
            })(
              <Select dropdownMatchSelectWidth={true} style={{width: "100%"}}
                      onChange={(value) => this.valueChange.bind(this)('car_head', value)}
                      onSelect={(value) => this.valueChange.bind(this)('car_head', value)}
                      // value={this.state.car_head}
              >
                {
                  head_car_all.map((item)=>{
                    return  (<Option value={item.id}>{item.car_num}</Option>);
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="车挂牌号"
          >
            {getFieldDecorator('car_body', {
              rules: [ {
                required: true, message: ''
              } ],
              // initialValue:this.state.car_body,
            })(
              <Select dropdownMatchSelectWidth={true} style={{width: "100%"}}
                      onChange={(value) => this.valueChange.bind(this)('car_body', value)}
                      onSelect={(value) => this.valueChange.bind(this)('car_body', value)}
                      // value={this.state.car_head}
              >
                {
                  body_car_all .map((item)=>{
                    return  (<Option value={item.id}>{item.car_num}</Option>);
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="压车司机"
          >
            {getFieldDecorator('driver1', {
              rules: [ {
                required: true, message: ''
              } ],
              // initialValue:this.state.car_body,
            })(
              <Select placeholder="请选择司机"  style={{ width: "100%" }}
                      value={this.state.driver1}
                      dropdownMatchSelectWidth={true}
                      onChange={(value)=>this.valueChange('driver1',value)}>
                {
                  driver_select_all.map((item)=>{
                    return  (<Option value={item.id}>{item.driver_name}</Option>);
                  })
                }
              </Select>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label="待调度量"
          >
            {getFieldDecorator('send_num', {
              rules: [ {
                required: true, message: ''
              } ],
              // initialValue:this.state.car_body,
            })(
              <Input type="text" addonAfter="吨"  value={this.state.send_num} onChange={(e) => this.valueChange('send_num', e.target.value)}/>
            )}
          </FormItem>
          <FormItem
            {...formItemLayout}
            label=" 商品"
          >
            {getFieldDecorator('prod_id', {
              rules: [ {
                required: true, message: ''
              } ],
              // initialValue:this.state.car_body,
            })(
              <Select style={{ width: "100%" }}
                      value={this.state.prod_id}
                      dropdownMatchSelectWidth={true}
                      onChange={(value)=>this.valueChange('prod_id',value)}>
                {
                  product_all.map((item)=>{
                    return  (<Option value={item.id}>{item.prod_name}</Option>);
                  })
                }
              </Select>
            )}
          </FormItem>
        </Form>
      </div>
    )
  }
}
const WrappedRegistrationForm = Form.create()(AddCar);
export default WrappedRegistrationForm ;
