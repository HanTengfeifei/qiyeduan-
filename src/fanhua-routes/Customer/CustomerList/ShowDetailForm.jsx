import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button,message } from 'antd';
import {RequireUtils} from 'utils';
import moment from 'moment';
import mystyle from './tabstyle.less' ;
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

function noop() {
  return false;
}


/**
 * input值发生更改时值也及时发生改变
 * @param name
 * @param value
 */
function valueChange(name,value) {
  var {form} = this.state ;
  form[name] = value ;
  this.setState({
    form:form
  })
}

/**
 * 关闭页面
 */
function onCancel() {
  this.props.handleCancel() ;
  // this.props.form.resetFields();
}
/**
 * 新增或者删除
 * @param type
 */
function mysubmit(e) {
  this.setState({
    loading:true
  }) ;
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    console.log(err)
    if (err) {
    }else{
      var form = this.state.form ;
      const {updateData} = this.props ;
      form.id = updateData.id ;
      RequireUtils.baseRequire('plan/modify-plan',form,function (data) {
        if (data.code)
        {
          message.success(data.msg);
          this.setState({
            loading:false
          }) ;
          this.props.go() ;
          this.props.handleCancel() ;
          this.props.form.resetFields();
        }
        else{
          message.error("提交失败!");
          this.setState({
            loading:false
          }) ;
        }
      }.bind(this));
    }
  })
}

/**
 * 采购方发生改变时 合同和接受场站也发生改变
 * @param name
 * @param value
 */
function buyValueChange(name,value){
  var _this = this ;
  if(!value){
    return ;
  }
  RequireUtils.baseRequire("plan/contract-addr-select",{buyer_id:value},function (data) {
    if(data.code==1) {
      var list = data.data.list ;
      _this.setState({
        contractoption:list.contract,
        $addroption:list.addr
      });
    }else{
      this.setState({update:true})
    }
  }.bind(this))
}
class PlanListUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      updateData:{}
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {
    const {updateData} = this.props ;
    buyValueChange.bind(this)("",updateData.buyer_id) ;
    this.setState({
      form:updateData
    })
  }

  render() {
    const { getFieldProps } = this.props.form;
    const {contractoption,$addroption,form,loading} = this.state ;
    const {updateData} = this.props ;
    const {
      plan_status,
      id,
      deliver_id,
      buyer_name,
      addr_name,
      goods_name,
      contract_name,
      status_name,
      plan_weight,
      deliver_name,
      goods_id,
      start_date,
      end_date,
      plan_interval} = updateData;
    /**
     * 获取原来的值
     * @type {{plan_status, id: *, deliver_id: *, buyer_id: *, contract_id: *, recv_id: *, plan_weight: *, bill_name: *, start_date: *, end_date: *, plan_interval: *}}
     */
    const _this = this ;
    const formItemLayout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const timeformItemLayout = {
      labelCol: { span: 3 },
      wrapperCol: { span: 21 },
    };
    const plan = updateData;
    const { getFieldDecorator } = this.props.form;
    const dateFormat = 'YYYY-MM-DD';
    const monthFormat = 'YYYY-MM';

    return (
      <div className={'my-custom-padding'}>
        <main>
        <Form >
        <Row gutter={8} >
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="采购方">
              {getFieldDecorator('buyer_name', {
              })(
                <span>{buyer_name}</span>
              )}
            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="接收场站">
              {getFieldDecorator('addr_name', {
              })(
                <span>{addr_name}</span>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="状态">
              {getFieldDecorator('status_name', {
              })(
                <span>{status_name}</span>
              )}
            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="运输方式">
              {getFieldDecorator('deliver_name', {
              })(
                <span>{deliver_name}</span>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="单次执行量">
              {getFieldDecorator('plan_weight', {
              })(
               <span>{plan_weight}</span>
              )}
            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="执行周期">
              {getFieldDecorator('plan_interval', {
              })(
                <span>{plan_interval}天</span>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="计划商品">
              {getFieldDecorator('goods_name', {
              })(
                <span>{goods_name}</span>
              )}
            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="归属合同">
              {getFieldDecorator('contract_name', {
              })(
                <span>{contract_name}</span>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8}>
          <Col span={24}>
            <FormItem
              {...timeformItemLayout}
              label="持续时间">
              {getFieldDecorator('start_date', {
              })(
                <div>
                  <span>{start_date}</span>
                  <span>至</span>
                  <span>{end_date}</span>
                </div>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row style={{marginTop:'10px'}}>
          <Col style={{textAlign:'right'}}>
            <Button onClick={onCancel.bind(this)} style={{marginRight:'10px'}} >取消</Button>
          </Col>
        </Row>
        </Form>
        </main>
      </div >
    )
  }
}
PlanListUpdate = createForm()(PlanListUpdate);
export default PlanListUpdate;
