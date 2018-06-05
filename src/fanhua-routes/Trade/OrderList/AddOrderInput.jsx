import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker, Button, AutoComplete,Tabs,Divider } from 'antd';
import mystyle from './tabstyle.less'
import DynamicIput from './DynamicIput';
import {RequireUtils} from 'utils';
import "./AddOrderInput.less" ;
// import echarts from 'echarts';
// import echarts from 'echarts/lib/echarts';
// import  'echarts/lib/chart/bar';
// import 'echarts/lib/component/tooltip';
// import 'echarts/lib/component/title';
const FormItem = Form.Item;
const { Option, OptGroup } = Select;
const AutoCompleteOption = AutoComplete.Option;
function valueChange(name,value) {
  var {form} = this.state ;
  form[name] = value ;
  this.setState({
    form:form
  })
}
class AddOrderInput extends React.Component {
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
      buyer_id:"",
    };
    this.callback = this.callback.bind(this);
    this.valueChange=this.valueChange.bind(this);
    // this.filter_addr=this.filter_addr.bind(this);
  }
  callback(value) {
   console.log(value);
   this.props.sent(value);
  }
  valueChange(name,value) {
    if(name==="prod_id"){
      RequireUtils.baseRequire('goods/prod-info',{prod_id:value},function (data){
        if(data.code==1) {
          console.log(data);
          var form = this.state ;
          form[name] = value ;
          form.productDetail=data.data.info;
          this.setState({
            ...form
          });
          this.props.sentParents();
        }
        else{
          alert("获取用户信息失败！");
        }
      }.bind(this));

    }if(name==="saler_id"){
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

    }if(name==="status"){
      var form = this.state ;
      form[name] = parseInt(value) ;
      console.log(form);
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

  componentWillMount(){
    RequireUtils.baseRequire('order/company-select',{},function (data){
      if(data.code==1) {
        this.setState({
          provider_all: data.data.list,
        });
      }
      else{
        alert("获取用户信息失败！");
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
  }
  componentDidMount(){
    this.props.onRef(this);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const{provider_all,buyer_contact_id_all,contract_select }=this.state;
    return (
      <div>
        <Row>
          <Col span={8}>
            <span style={{fontSize:'16px'}}>配送信息</span>
          </Col>
          <Col span={8}>
            <span style={{fontSize:'16px'}}>买方信息</span>
          </Col>

          <Col span={8}>
            <span style={{fontSize:'16px'}}>卖方信息</span>
          </Col>
        </Row>
        <Divider />
        <Row gutter={8}>
          <Col span={6}>
            配送方式<FormItem
          >
            {getFieldDecorator('order_source', {
              rules: [{
                required: false, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Select dropdownMatchSelectWidth={true} style={{ width: "100%"}}
                      onChange={(value)=>this.valueChange.bind(this)('order_source',value)}
              >
               <Option value={"0"}>配送</Option>
               <Option value={"1"}>自提</Option>
              </Select>
            )}
          </FormItem>
          </Col>
          <Col span={2}></Col>

          <Col span={6}>
            购买方
            <Input
              type="text"
              value={this.props.company_all.company_name}
              onChange={(e) => this.valueChange('buyer_id', e.target.value)}
              disabled
            />
          </Col>

          <Col span={2}></Col>

          <Col span={6}>
            供货方<FormItem
          >
            {getFieldDecorator('saler_id', {
              rules: [{
                required: false, message: '该选项为必填项!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Select dropdownMatchSelectWidth={true} style={{ width: "100%"}}
                      onChange={(value)=>this.valueChange.bind(this)('saler_id',value)}
              >{

                provider_all.filter(key => key.id !== this.props.company_all.id+"").map((item)=>{
                  return  (<Option value={item.id}>{item.company_name}</Option>);
                })
              }
              </Select>
            )}
          </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={6}>
            到站时间
            <span className={"my-delever-time-placeholder"}>
                <DatePicker
                  placeholder={'请填写日期和时间'}
                  format="YYYY-MM-DD-HH:mm:ss"
                  style={{ width: "100%"}}
                  onChange={(date) => this.valueChange('deliver_date', date) }
                  showTime={true}
                />
            </span>
          </Col>
          <Col span={2}></Col>

          <Col span={6}>
            买方业务联系人<FormItem
          >
            {getFieldDecorator('buyer_person', {
              rules: [{
                required: false, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Select placeholder="请选择买方联系人"  style={{ width: "100%" }} dropdownMatchSelectWidth={true}
                      onChange={(value)=>this.valueChange('buyer_person',value)}>
                {
                  buyer_contact_id_all.map((item)=>{
                    return  (<Option value={item.id}>{item.user_name}</Option>);
                  })
                }
              </Select>
            )}
          </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={6}>
            关联合同<FormItem
          >
            {getFieldDecorator('contract_id', {
              rules: [{
                required: false, message: 'Please input your password!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Select dropdownMatchSelectWidth={true} style={{ width: "100%"}}
                      onChange={(value)=>this.valueChange.bind(this)('contract_id',value)}
              >{
                contract_select.map((item)=>{
                  return  (<Option value={item.id}>{item.contract_name}</Option>);
                })
              }
              </Select>
            )}
          </FormItem>
          </Col>
        </Row>
        <Row gutter={8} style={{display:'none'}}>
          <Col span={6}>

            <FormItem
          >
             <span style={{display:'none'}}>
                 <Input  addonAfter="吨" type="text"
                         value={this.props.numberAll}
                 />
            </span>
          </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={6}>

          </Col>
          <Col span={2}></Col>
          <Col span={6}>
            <div style={{display:'none'}}>
              卖方联系人
              <Input type="text" value={this.props.contact_name} onChange={(e) => this.valueChange('saler_person', e.target.value)}/>
            </div>
          </Col>
        </Row>
        <Row>
        <div>场站地址:</div>
        </Row>
        <Row>
          <DynamicIput
            countAll={this.props.countAll} father={this} sentparents={this.callback}  addr_select_all={this.state.addr_select_all}/>
        </Row>
      </div>
    )
  }
}
const WrappedRegistrationForm = Form.create()(AddOrderInput);
export default  WrappedRegistrationForm ;
