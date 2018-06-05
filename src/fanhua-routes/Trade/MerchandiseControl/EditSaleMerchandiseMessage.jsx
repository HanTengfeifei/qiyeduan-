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
      pro_id_all:[],
      stock_type_all:[],
      prod_id:"",
      deliver_name:"",
      deliver_type:"",
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

    }if(name==="status"){
      var form = this.state ;
      form[name] = parseInt(value) ;
      console.log(form);
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
    this.setState({
      prod_id:this.props.goods.prod_id,
      deliver_name:this.props.goods.deliver_name,
      stock_type:this.props.goods.stock_type,
      goods_stock:this.props.goods.goods_stock,
      contact_id:this.props.goods.contact_id,
      status:this.props.goods.status,
      deliver_type:this.props.goods.deliver_type,
    })
    RequireUtils.baseRequire('goods/prod-info',{prod_id:this.props.goods.prod_id},function (data){
      if(data.code==1) {
        console.log(data);
        var form = this.state ;
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
        console.log(3333333);
        console.log(data);
        this.setState({
          contact_id_all: data.data.list,
        });
      }
      else{
        alert("获取业务联系人失败!");
      }
    }.bind(this));
  }
  componentDidMount(){
console.log(this.props.goods.prod_id);
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
    const{pro_id_all,stock_type_all,contact_id_all}=this.state;
    return (
      <div>
        <Row>
          <Col span={24}>
            <span style={{fontSize:'16px'}}>挂售信息</span>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={6}>
            <FormItem
              label="选择商品"
          >
            {getFieldDecorator('prod_id', {
              rules: [{
                required: true, message: '该选项为必填项!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Select dropdownMatchSelectWidth={true} style={{ width: "100%"}}
                      onSelect={(value)=>this.valueChange.bind(this)('prod_id',value)}
                      onChange={(value)=>this.valueChange.bind(this)('prod_id',value)}
                      defaultValue={this.state. prod_id}
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
              label="运输类型"
          >
            {getFieldDecorator('deliver_type', {
              rules: [{
                required: true, message: '该选项不能为空!',
              }],
              initialValue:this.state.deliver_type,
            })(
              <Select dropdownMatchSelectWidth={true} style={{ width: "100%"}}
                      onChange={(value)=>this.valueChange.bind(this)('deliver_type',value)}
                      // defaultValue={this.state.deliver_type}
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
              label="挂售量（吨）"
          >
            {getFieldDecorator('goods_stock', {
              rules: [{
                required: true, message: '该选项为必填项!',
              }, {
                validator: this.validateToNextPassword,
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
              label="业务联系人"
          >
            {getFieldDecorator('contact_id', {
              rules: [{
                required: true, message: '该选项为必填项!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Select dropdownMatchSelectWidth={true} style={{ width: "100%"}}
                      onChange={(value)=>this.valueChange.bind(this)('contact_id',value)}
                      defaultValue={this.state.contact_id}
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
              label="库存类型"
          >
            {getFieldDecorator('stock_type', {
              rules: [{
                required: true, message: '该选项为必填项!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Select placeholder="Please select a country"  style={{ width: "100%" }} dropdownMatchSelectWidth={true}
                      onChange={(value)=>this.valueChange('stock_type',value)}
                      defaultValue={this.state.stock_type}
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
              label="上下架状态"
          >
            {getFieldDecorator('status', {
              rules: [{
                required: true, message: '该选项为必填项!',
              }, {
                validator: this.validateToNextPassword,
              }],
            })(
              <Select placeholder="Please select a country"  style={{ width: 210 }} dropdownMatchSelectWidth={true}
                      onChange={(value)=>this.valueChange('status',value)}>
                <Option value="0">上架</Option>
                <Option value="1">下架</Option>
              </Select>
            )}
          </FormItem>
          </Col>
        </Row>
      </div>
    )
  }
}
const WrappedRegistrationForm = Form.create({mapPropsToFields(props) {
  const deliver_type ={ ...props.goods.deliver_type} ;

  function getdeliver_type(type) {
    if(type==0){
      return type ;
    }
    if(type){
      return type ;
    }else {
      return "" ;
    }
  }
  const str_deliver_type = getdeliver_type(deliver_type["0"]);

    return {
      prod_id: Form.createFormField({
        ...props.goods.prod_id,
        value: props.goods.prod_id,
      }),
      deliver_name: Form.createFormField({
        ...props.goods.deliver_name,
        value: props.goods.deliver_name,
      }),
      goods_stock: Form.createFormField({
        ...props.goods.goods_stock,
        value: props.goods.goods_stock,
      }),
      contact_id: Form.createFormField({
        ...props.goods.contact_id,
        value: props.goods.contact_id,
      }),
      stock_type: Form.createFormField({
        ...props.goods.stock_type,
        value: props.goods.stock_type,
      }),
      status: Form.createFormField({
        ...props.goods.last_check,
        value: props.goods.status,
      }),
      deliver_type: Form.createFormField({
        ...props.goods.deliver_type,
        value:str_deliver_type
      }),
    };
  },}

)(SaleMerchandiseMessage);
export default  WrappedRegistrationForm ;
