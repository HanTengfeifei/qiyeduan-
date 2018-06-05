import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker, Button, AutoComplete,Tabs,Divider } from 'antd';
import mystyle from '../../tabstyle.less'
import DynamicIput from './DynamicIputTTwo';
import {RequireUtils} from 'utils';
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
  }
  callback(value) {
    console.log(value);
    this.props.sent(value);
  }
  valueChange(name,value) {
    if(name==="prod_id"){
      RequireUtils.baseRequire('goods/prod-info',{prod_id:value},function (data){
        if(data.code==1) {
          var form = this.state ;
          form[name] = value ;
          form.productDetail=data.data.info;
          this.setState({
            ...form
          });
          this.props.sentParents();
        }
        else{
          var form = this.state ;
          this.setState({
            ...form
          });
        }
      }.bind(this));

    }if(name==="buyer_id"){
      // this.props.sentParents(value);

      var form = this.props.form ;
      form.setFieldsValue({contract_id:"",buyer_person:""}) ;
      var form = this.state ;
      form["contract_id"] = "" ;
      form["buyer_person"] = "" ;
      this.setState({
        ...form,
      });
      RequireUtils.baseRequire('unilateral-order/contract-select',{company_id:value},function (data){
        if(data.code==1) {
          var form = this.state ;
          form[name] = value ;
          this.setState({
            ...form,
            contract_select: data.data.list,
          });
        }
        else{
          var form = this.state ;
          form[name] = value ;
          this.setState({
            ...form,
            contract_select:[]
          });
        }
      }.bind(this));
      RequireUtils.baseRequire('unilateral-order/user-select',{company_id:value},function (data){
        if(data.code==1) {
          this.setState({
            buyer_contact_id_all: data.data.list,
          });
        }
        else{
          this.setState({
            buyer_contact_id_all: []
          });
        }
      }.bind(this));

    }if(name==="status"){
      var form = this.state ;
      form[name] = parseInt(value) ;
      this.setState({
        ...form
      })
    }
    else{
      var form = this.state ;
      form[name] = value ;
      this.setState({
        ...form
      })
    }
  }

  componentWillMount(){
    RequireUtils.baseRequire('unilateral-order/company-select',{},function (data){
      if(data.code==1) {
        this.setState({
          provider_all: data.data.list,
        });
      }
      else{
        this.setState({
          provider_all: []
        });
      }
    }.bind(this));

  }
  componentDidMount(){
    this.props.onRef(this);
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const {   sentParents} = this.props ;
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
            <div style={{margin:'12px 0'}}>配送方式</div>
            <Input
              type="text"
              value={'配送'}
              onChange={(e) => this.valueChange('psfs', e.target.value)}
              disabled
            />
          </Col>
          <Col span={2}></Col>

          <Col span={6}>
            <FormItem
              label="购买方"
            >
              {getFieldDecorator('buyer_id', {
                rules: [{
                  required: true, message: '该选项为必填项!',
                }]
              })(
                <Select dropdownMatchSelectWidth={true} style={{ width: "100%"}}
                        onChange={(value)=>this.valueChange.bind(this)('buyer_id',value)}
                >{
                  provider_all.filter(key => key.id !== this.props.company_all.id+"").map((item)=>{
                    return  (<Option value={item.id}>{item.company_name}</Option>);
                  })
                }
                </Select>
              )}
            </FormItem>


          </Col>

          <Col span={2}></Col>

          <Col span={6}>
            <div style={{margin:'12px 0'}}>供货方</div>
            <Input
              type="text"
              value={this.props.company_all.company_name}
              onChange={(e) => this.valueChange('saler_id', e.target.value)}
              disabled
            />
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={6}>
            <FormItem
              label="到站时间"
            >
              {getFieldDecorator('deliver_date', {
                rules: [{
                  required: true, message: '该选项不能为空!',
                }],
              })(
                <DatePicker
                  placeholder={'请填写日期和时间'}
                  format="YYYY-MM-DD HH:mm:ss"
                  style={{ width: "100%"}}
                  onChange={(date) => this.valueChange('deliver_date', date) }
                  showTime={true}
                />
              )}
            </FormItem>
          </Col>
          <Col span={2}></Col>

          <Col span={6}>
            <FormItem
              label="买方业务联系人"
          >
            {getFieldDecorator('buyer_person', {
              rules: [{
                required: true, message: '该选项不能为空!',
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
            <FormItem
              label="关联合同"
          >
            {getFieldDecorator('contract_id', {
              rules: [{
                required: false, message: '该选项不能为空!',
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
          <DynamicIput sentParents={sentParents} ref={(DynamicIput)=>(this.DynamicIput=DynamicIput)}
            countAll={this.props.countAll} father={this} sentparents={this.callback}  my_buyer_id={this.state.buyer_id} addr_select_all={this.state.addr_select_all}/>
        </Row>
      </div>
    )
  }
}
const WrappedRegistrationForm = Form.create()(AddOrderInput);
export default  WrappedRegistrationForm ;
