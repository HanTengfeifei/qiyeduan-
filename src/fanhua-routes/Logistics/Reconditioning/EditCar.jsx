import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker, Button, AutoComplete,Tabs,Divider,Radio,message } from 'antd';
import mystyle from './tabstyle.less'
import moment from 'moment';
import 'moment/locale/zh-cn';
import {RequireUtils} from 'utils';
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
      start_date:new Date(),
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
    console.log(111111);
    e.preventDefault();
    console.log('Received values of form: ', this.state);
    RequireUtils.baseRequire('car-free/modify-free',{
      car_head:this.state.car_head,
      driver1: this.state.driver1,
      car_body:this.state.car_body,
      send_num:this.state.send_num,
      company_id:this.state.company_id,
      start_date:this.state.start_date,
      prod_id:this.state.prod_id,
         id:this.props.record.id,
    },function (data){
      if(data.code==1) {
        message.success(data.msg);
      }
      else{
        alert("获取业务联系人失败!");
      }
    }.bind(this));
  }
  clearForm(){
    this.setState({
      send_num:"",
      company_id:"",
      car_head:"",
      car_body:"",
      driver1:"",
      prod_id:"",
    });
  }
  callback(value) {
    console.log(value);
    this.props.sent(value);
  }
  valueChange(name,value) {
    if(name==="company_id"){
      console.log(value);
      RequireUtils.baseRequire('car-free/car-select',{chengyun_id:value},function (data){
        if(data.code==1){
          console.log(1111111111111111);
          console.log(data);

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
          alert("获取业务联系人失败!");
        }
      }.bind(this));
    }
    if(name==="status"){
      var form = this.state ;
      form[name] = parseInt(value) ;
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
  componentWillReceiveProps(){
    this.setState({
      car_head:this.props.record.car_head,
      driver1: this.props.record.driver1,
      car_body:this.props.record.car_body,
      send_num:this.props.record.send_num,
      company_id:this.props.record.company_id,
      start_date:this.props.record.start_date,
      prod_id:this.props.record.prod_id,
    });
  }
  componentWillMount(){
    RequireUtils.baseRequire('car-free/car-select',{company_id:this.props.record.company_id},function (data){
      if(data.code==1){
        var form = this.state;
        form.company_id=this.props.record.company_id;
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
        form.company_id=this.props.record.company_id ;
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
   this.setState({
     car_head:this.props.record.car_head,
     driver1: this.props.record.driver1,
     car_body:this.props.record.car_body,
     send_num:this.props.record.send_num,
     company_id:this.props.record.company_id,
     start_date:this.props.record.start_date,
     prod_id:this.props.record.prod_id,
   }) ;

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
    this.props.onRef(this);
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
    console.log('radio checked', e.target.value);
    if( e.target.value==0){
      RequireUtils.baseRequire('order-deliver/company-select',{},function (data){
        if(data.code==1) {
          this.setState({
            company_car_all: data.data.list,
            flag: e.target.value,
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
    return (
      <div>
        <Row style={{marginTop:'10px'}}>
          <RadioGroup onChange={this.onChange} value={this.state.flag}>
            <Radio value={0}>承运商车队</Radio>
            <Radio value={1}>自有车队</Radio>
          </RadioGroup>
        </Row>
        <Divider />
        <Row gutter={8} style={{marginTop:'10px'}}>
          { flag?
            <Col span={11}>
              <div></div>
            </Col>
            :
            <Col span={11}>
              承运商车队
              <Select dropdownMatchSelectWidth={true} style={{width: "100%"}}
                      onChange={(value) => this.valueChange.bind(this)('company_id', value)}
                      onSelect={(value) => this.valueChange.bind(this)('company_id', value)}
                      value={this.state.company_id}
              >
                {
                  company_car_all.map((item)=>{
                    return  (<Option value={item.id}>{item.company_name}</Option>);
                  })
                }
              </Select>
            </Col>
          }
          <Col span={2}></Col>
          <Col span={11}>
            到站时间
            <DatePicker
              style={{ width: "100%"}}
              onChange={(date) => this.valueChange('start_date', date.format('YYYY-MM-DD'))}
              defaultValue={moment(this.state.start_date, 'YYYY-MM-DD')}
              // defaultValue={moment('2015-01-01', 'YYYY-MM-DD')}
              allowClear={true}
            />
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={11}>
            车头牌号
            <Select dropdownMatchSelectWidth={true} style={{width: "100%"}}
                    onChange={(value) => this.valueChange.bind(this)('car_head', value)}
                    onSelect={(value) => this.valueChange.bind(this)('car_head', value)}
                    value={this.state.car_head}
            >
              {
                head_car_all .map((item)=>{
                  return  (<Option value={item.id}>{item.car_num}</Option>);
                })
              }
            </Select>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            车挂牌号
            <Select dropdownMatchSelectWidth={true} style={{width: "100%"}}
                    onChange={(value) => this.valueChange.bind(this)('car_body', value)}
                    onSelect={(value) => this.valueChange.bind(this)('car_body', value)}
                    value={this.state.car_body}
            >
              {
                body_car_all .map((item)=>{
                  return  (<Option value={item.id}>{item.car_num}</Option>);
                })
              }
            </Select>
          </Col>
          <Col span={2}></Col>
        </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={11}>
            压车司机
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
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            待调度量
            <Input type="text"   value={this.state.send_num} onChange={(e) => this.valueChange('send_num', e.target.value)}/>
          </Col>
        </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={11}>
            商品
            <Select   style={{ width: "100%" }}
                    value={this.state.prod_id}
                    dropdownMatchSelectWidth={true}
                    onChange={(value)=>this.valueChange('prod_id',value)}>
              {
                product_all.map((item)=>{
                  return  (<Option value={item.id}>{item.prod_name}</Option>);
                })
              }
            </Select>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>

          </Col>
        </Row>
      </div>
    )
  }
}
export default  AddCar ;
