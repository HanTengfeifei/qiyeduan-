import React from 'react';
import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, DatePicker, Button, AutoComplete,Tabs } from 'antd';
import mystyle from './tabstyle.less'
import {RequireUtils} from 'utils';
const Option = Select.Option;
const FormItem = Form.Item;
const AutoCompleteOption = AutoComplete.Option;

class SaleMerchandiseMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pay_type_all:[],
      pro_id_all:[],
      stock_type_all:[],
       prod_id:"",
      deliver_type:"",
      pay_type:"",
      goods_stock:"",
      contact_id:"",
      contact_id_all:[],
      stock_type:"",
      productDetail:{},
      valuesAll:{},
      status:0
    };
    this.callback = this.callback.bind(this);
    this.valueChange=this.valueChange.bind(this);
  }
  callback(key) {
    console.log(key);
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
          alert("获取用户信息失败！");
        }
      }.bind(this));

    }if(name==="status"){
       var form = this.state;
       // this.props.onSwitchStatus(value);
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
    RequireUtils.baseRequire('goods/product-select',{},function (data){
      if(data.code==1) {
        this.setState({
          pro_id_all: data.data.list,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
    RequireUtils.baseRequire('goods/user-select',{},function (data){
      if(data.code==1) {
        this.setState({
          contact_id_all: data.data.list,
        });
      }
      else{
        alert("获取业务联系人失败!");
      }
    }.bind(this));
    RequireUtils.baseRequire('goods/pay-select',{},function (data){
      if(data.code==1) {
        this.setState({
          pay_type_all: data.data.list,
        });
      }
      else{
        alert("获取业务联系人失败!");
      }
    }.bind(this));
  }
  componentDidMount(){
  this.props.onRef(this);
    RequireUtils.baseRequire('goods/stock-select',{},function (data){
      if(data.code==1) {
        this.setState({
          stock_type_all: data.data.list,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const{pro_id_all,stock_type_all,contact_id_all,pay_type_all}=this.state;
    return (
      <div className={'shop-add'}>
        <Row>
          <Col span={24}>
            <span style={{fontSize:'16px'}}>挂售信息</span>
          </Col>
        </Row>
        <Row gutter={8}>
              <Col span={6}>
               <FormItem
                 label={'选择商品'}
              >
                {getFieldDecorator('prod_id', {
                  rules: [{
                    required: true, message: '该选项不能为空!',
                  }],
                })(
                  <Select dropdownMatchSelectWidth={true} style={{ width: "100%"}}
                          onChange={(value)=>this.valueChange.bind(this)('prod_id',value)}
                  >{
                    pro_id_all.map((item)=>{
                      return  (<Option value={item.id}>{item.prod_name}</Option>);
                    })
                  }
                  </Select>
                )}
              </FormItem>
              </Col>
              <Col span={2}></Col>
              <Col span={6}>
                <FormItem
                  label={'运输类型'}
                >
                {getFieldDecorator('deliver_type', {
                  rules: [{
                    required: true, message: '该选项不能为空!',
                  }],
                })(
                  <Select dropdownMatchSelectWidth={true} style={{ width: "100%"}}
                          onChange={(value)=>this.valueChange.bind(this)('deliver_type',value)}
                  >
                    <Option value="0">配送</Option>
                    <Option value="1">自提</Option>
                  </Select>
                )}
              </FormItem>
              </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <FormItem
                label={'挂售量（吨）'}
              >
              {getFieldDecorator('goods_stock', {
                rules: [{
                  required: true, message: '该选项不能为空!',
                }],
              })(
                <Input type="text"
                       onChange={(e) => this.valueChange('goods_stock', e.target.value)}
                />
              )}
            </FormItem>
            </Col>
            <Col span={2}></Col>
            <Col span={6}>
              <FormItem
                label={'业务联系人'}
              >
              {getFieldDecorator('contact_id', {
                rules: [{
                  required: true, message: '该选项不能为空!',
                }],
              })(
                <Select dropdownMatchSelectWidth={true} style={{ width: "100%"}}
                onChange={(value)=>this.valueChange.bind(this)('contact_id',value)}
                >{
                contact_id_all.map((item)=>{
                return  (<Option value={item.id}>{item.user_name}</Option>);
              })
              }
                </Select>
              )}
            </FormItem>
            </Col>
          </Row>
          <Row gutter={8}>
            <Col span={6}>
              <FormItem
                label={'库存类型'}
              >
              {getFieldDecorator('stock_type', {
                rules: [{
                  required: true, message: '该选项不能为空!',
                }],
              })(
                <Select   style={{ width: "100%" }} dropdownMatchSelectWidth={true}
                        onChange={(value)=>this.valueChange('stock_type',value)}
                >
                  {
                    stock_type_all.map((item)=>{
                      return  (<Option value={item.meta_code}>{item.meta_name}</Option>);

                    })
                  }
                </Select>
              )}
            </FormItem>
            </Col>
            <Col span={2}></Col>
            <Col span={6}>
              <FormItem
                label={'上下架状态'}
              >
              {getFieldDecorator('status', {
                rules: [{
                  required: true, message: '该选项不能为空!',
                }],
              })(
                <Select style={{ width: '100%' }} dropdownMatchSelectWidth={true}
                        onChange={(value)=>this.valueChange('status',value)}>
                  <Option value="0">上架</Option>
                  <Option value="1">下架</Option>
                </Select>
              )}
            </FormItem>
            </Col>
        </Row>
        <Row gutter={8}>
            <Col span={6}>
              <FormItem
                label={'付款方式'}
              >
              {getFieldDecorator('pay_type', {
                rules: [{
                  required: true, message: '该选项不能为空!',
                }],
              })(
                <Select style={{ width: "100%" }} dropdownMatchSelectWidth={true}
                        onChange={(value)=>this.valueChange('pay_type',value)}
                >
                  <Option value="0">款到发货</Option>
                  <Option value="1">货到付款</Option>

                </Select>
              )}
            </FormItem>
            </Col>

        </Row>
      </div>
    )
  }
}
const WrappedRegistrationForm = Form.create()(SaleMerchandiseMessage);
export default  WrappedRegistrationForm ;

