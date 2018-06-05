import React from 'react';
import { Form, Input, Icon, Button,Row ,Col,Select} from 'antd';
import './DynamicInputTwo.less';
import {RequireUtils} from 'utils';
const FormItem = Form.Item;
const Option = Select.Option;

let uuid = 0;
class DynamicFieldSet extends React.Component {
  constructor(props){
    super(props);
    this.state={
      acount_all:0,
      addr_select_all:[],
      old_my_select:[]
    };
  }

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const nextKeys = keys.concat(uuid);
    uuid++;
    form.setFieldsValue({
      keys: nextKeys,
    });
  } ;


  addressSelect(value,key){
    var oldselect = this.state.addr_select_all ;
    const nitem = oldselect.filter(function (item) {
      return item.id!=value ;
    }) ;
    this.setState({
      addr_select_all:nitem
    }) ;

    // var names = this.props.form.getFieldsValue().name ;
    this.myonchange(value,key,true) ;
  }

  getDefaultValue(k){
    var value = this.props.form.getFieldValue('name['+k+']') ;
    var oldselect = this.state.old_my_select ;

    var olditem= oldselect.filter(function (item) {
      return item.id ==value;
    }) ;
    if(olditem[0]){
      return olditem[0].addr_name ;
    }
  }

  remove = (k) => {
    const { form } = this.props;
    // can use data-binding to get
    const keys = form.getFieldValue('keys');
    var  addr= this.state.addr_select_all ;
    var oldselect= this.state.old_my_select ;
    var value = this.props.form.getFieldValue('name['+k+']') ;
    var olditem= oldselect.filter(function (item) {
      return item.id ==value;
    }) ;

    if(olditem&&olditem[0]){
      this.setState({
        addr_select_all:[...addr,olditem[0]]
      }) ;
    }

    if (keys.length === 1) {
      return;
    }

    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
     this.myonchange("",-1) ;
  } ;

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      const ObjAll = [];
      var  countAll=0;
      var keys = values.keys ;
      for (let i = 0; i < keys.length; i++) {
        let obj = {};
        var my_key = keys[i] ;
        obj.addr_id = values.name[my_key];
        obj.recv_sum = values.number[my_key];
        ObjAll.push(obj);
        var my_number_value = values.number[my_key]?values.number[my_key]:0 ;
        countAll=countAll+parseInt(my_number_value);
      }
      this.props.countAll(countAll);
      this.props.father.setState({
        station_all: ObjAll,
      });
    });
  } ;


  componentWillReceiveProps(nextProps){
    var my_buyer_id = nextProps.my_buyer_id ;
    var n_buyer_id = this.props.my_buyer_id ;
    if(!n_buyer_id){
      n_buyer_id = "" ;
    }
    if(!my_buyer_id){
      my_buyer_id = "" ;
    }
    if(my_buyer_id===n_buyer_id){
      return false;
    }

    var names = this.props.form.getFieldsValue().name ;
    var nums = this.props.form.getFieldsValue().number ;
    if(names){
      for(var i=0;i<names.length;i++){
        var finame = 'name['+i+']' ;
        var obj = {} ;
        obj[finame] = "" ;
        this.props.form.setFieldsValue(obj) ;
      }
    }

    if(nums){
      for(var j = 0;j<nums.length;j++){
        var finame = 'number['+j+']' ;
        var obj = {} ;
        obj[finame] = "" ;
        this.props.form.setFieldsValue(obj) ;
      }
    }

    this.myonchange("",-1) ;

    RequireUtils.baseRequire('unilateral-order/addr-select',{company_id:my_buyer_id},function (data){
      if(data.code==1) {
        this.setState({
          addr_select_all: data.data.list,
          old_my_select:data.data.list
        });
      }
      else{
        this.setState({
          addr_select_all: [],
          old_my_select:[]
        });
      }
    }.bind(this));
  }

  componentWillMount(){
    var {my_buyer_id} = this.props ;
    RequireUtils.baseRequire('unilateral-order/addr-select',{company_id:my_buyer_id},function (data){
      if(data.code==1) {
        this.setState({
          addr_select_all: data.data.list,
          old_my_select:data.data.list
        });
      }
      else{
        this.setState({
          addr_select_all: [],
          old_my_select:[]
        });
      }
    }.bind(this));
  }

  myonchange = (value,key,flag) => {
    var values = this.props.form.getFieldsValue() ;
    const ObjAll = [];
    var  countAll=0;
    var keys = values.keys;
    for (let i = 0; i < keys.length; i++) {
      var my_key = keys[i] ;
      let obj = {};

      if(flag){
        obj.recv_sum = values.number[my_key];
        if(key==my_key){
          obj.addr_id = value?value:"";
        }else{
          obj.addr_id = values.name[my_key];
        }
      }else{
        obj.addr_id = values.name[my_key];
        if(key==my_key){
          obj.recv_sum = value?value:0;
        }else{
          obj.recv_sum = values.number[my_key];
        }
      }
      ObjAll.push(obj);
      var my_number_value = obj.recv_sum?obj.recv_sum:0 ;
      countAll=countAll+parseInt(my_number_value);
    }
    this.props.countAll(countAll);
    this.props.father.setState({
      station_all: ObjAll,
    });
  } ;



  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {addr_select_all} = this.state ;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    getFieldDecorator('keys', {
      trigger:["onChange",'onBlur'],
      initialValue: []
    });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => {
      return (
        <div>
          <Row>
            <Col span={10}>
              <FormItem
                {... formItemLayout }
                labelCol={{span: 4}}
                required={false}
                key={k}
              >
                {getFieldDecorator(`name[${k}]`, {
                  validateTrigger: ['onChange', 'onBlur'],
                  rules: [{
                    required: true,
                    whitespace: true,
                    message: "请选择场站和相应的购买量.",
                  }],
                })(
                  <Select  placeholder="购买地址" dropdownMatchSelectWidth={true} style={{ width: '60%', marginRight: 8 }}
                           onSelect = {(value)=>this.addressSelect.bind(this)(value,k)}
                  >
                    {
                      this.props.form.getFieldValue(`name[${k}]`)?<Option value={this.props.form.getFieldValue(`name[${k}]`)}>{this.getDefaultValue(k)}</Option>:""
                    }
                    {
                      addr_select_all.map((item,index)=>{
                        return  (<Option value={item.id} key={index}>{item.addr_name}</Option>);
                      })
                    }
                  </Select>
                )}
                {keys.length > 1 ? (
                  <Icon
                    className="dynamic-delete-button"
                    type="minus-circle-o"
                    disabled={keys.length === 1}
                    onClick={() => this.remove(k)}
                  />
                ) : null}
              </FormItem>
            </Col>
            <Col span={4} pull={3}>
              <FormItem
              >
                {getFieldDecorator(`number[${k}]`, {
                  rules: [{
                    required: true, message: '该选项为必填项!',
                  }],
                })(
                  <Input  onChange={(e)=>this.myonchange(e.target.value,k)}  addonAfter="吨" type="number"/>
                )}
              </FormItem>
            </Col>
          </Row>
        </div>
      );
    });
    return (
      <Form onSubmit={this.handleSubmit}>
        {formItems}
        <FormItem {... formItemLayout }>
          <Button type="dashed" onClick={this.add} style={{ width: '55%' }}>
            <Icon type="plus" /> 添加场站和采购量
          </Button>
        </FormItem>

        {/*<FormItem {... formItemLayout } style={{ width: '55%' }}>*/}
          {/*<Button type="primary" htmlType="submit" style={{width:'100%'}}>保存采购量</Button>*/}
        {/*</FormItem>*/}
      </Form>
    );
  }
}
const WrappedDynamicFieldSet = Form.create()(DynamicFieldSet);
export default  WrappedDynamicFieldSet;
