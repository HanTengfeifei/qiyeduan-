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
  this.props.form.resetFields();
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
      this.setState({
        loading:false
      }) ;
    }else{
      console.log(values.end_date) ;
      var form = this.state.form ;
      const {updateData} = this.props ;
      form.id = updateData.id ;
      var obj = {} ;
      obj.id =  updateData.id ;
      obj.plan_status = values.plan_status ;
      obj.deliver_id = values.deliver_id ;
      obj.saler_id = values.saler_id ;
      obj.contract_id = values.contract_id ;
      obj.recv_id = values.recv_id ;
      obj.plan_weight = values.plan_weight ;
      obj.start_date = values.start_date.format('YYYY-MM-DD') ;
      obj.end_date = values.end_date.format('YYYY-MM-DD') ;
      obj.plan_interval = values.plan_interval ;
      obj.price = values.price ;
      obj.prod_id = values.prod_id ;
      RequireUtils.baseRequire('/plan/modify-caigou-plan',obj,function (data) {
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

class PlanListUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      updateData:{},
      contractoption:[],
      $addroption:[],
      companyoption:[],
      productoption:[],
      form:{
        plan_status:"",
        id:"",
        deliver_id:"",//配送方式
        buyer_id:"", //采购方
        contract_id:"", //合同
        recv_id:"",
        plan_weight:"",
        start_date:"",
        end_date:"",
        plan_interval:"",
        price:"",
        prod_id:""
      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  saleChange(value,flag){
    console.log(1111111) ;
    console.log(flag );
    const {setFieldsValue} = this.props.form ;
    if(!flag){
      setFieldsValue({recv_id:""});
      setFieldsValue({contract_id:""});
    }
    RequireUtils.baseRequire('plan/contract-select',{company_id:value},function (data) {
      if (data.code)
      {
        this.setState({
          contractoption:data.data.list,
        }) ;
      }
      else{
        alert("提交失败!");
      }
    }.bind(this));
  }

  componentDidMount() {
    var _this = this ;
    const {updateData} = this.props ;
    RequireUtils.baseRequire('plan/addr-select',{},function (data) {
      if (data.code)
      {
        _this.setState({
          $addroption:data.data.list,
        }) ;
      }
      else{
        alert("提交失败!");
      }
    }.bind(this));
    this.saleChange.bind(this)(updateData.saler_id,true) ;
    this.setState({
      form:updateData
    })
  }


  dealinitValue(value){
    if(value==0){
      return value+"" ;
    }
    if(value){
      return value+"" ;
    }else {
      return ""
    }
  }

  render() {
    const { getFieldProps } = this.props.form;
    const {contractoption,$addroption,form,loading} = this.state ;
    const {updateData,companyoption,productoption} = this.props ;
    const {
      plan_status,
      id,
      deliver_id,
      saler_id,
      contract_id,
      recv_id,
      plan_weight,
      start_date,
      end_date,
      price,
      prod_id,
      plan_interval} = updateData;
    /**
     * 获取原来的值
     * @type {{plan_status, id: *, deliver_id: *, buyer_id: *, contract_id: *, recv_id: *, plan_weight: *, bill_name: *, start_date: *, end_date: *, plan_interval: *}}
     */
    const _this = this ;
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 },
    };
    const timeformItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 6 },
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
              label="卖方">
              {getFieldDecorator('saler_id', {
                initialValue:saler_id+'',
                rules: [{ required: true, message: '该选项为必填项' }],
              })(
                <Select style={{ width: '100%' }}
                        onSelect={(value)=>this.saleChange.bind(this)(value)}
                        onChange={(value)=>valueChange.bind(this)('saler_id',value)}
                >
                  {
                    companyoption.map(function (item,index) {
                      return <Option value={item.id} key={index}>{item.company_name}</Option>
                    })
                  }
                </Select>
              )}

            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="卸车场站">
              {getFieldDecorator('recv_id', {
                initialValue:recv_id+"",
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('recv_id',value)}
                >
                  {
                    $addroption.map(function (item,index) {
                      return <Option value={item.id}  key={index}>{item.addr_name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="状态">

              {getFieldDecorator('plan_status', {
                initialValue:plan_status+"",
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('plan_status',value)}
                >
                  <Option value="0" key={'1'}>正常</Option>
                  <Option value="1" key={'2'}>终止</Option>
                </Select>
              )}

            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="运输方式">
              {getFieldDecorator('deliver_id', {
                initialValue:deliver_id+"",
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('deliver_id',value)}
                >
                  <Option value="0" key={'1'}>配送</Option>
                  <Option value="1" key={'2'}>自提</Option>
                </Select>
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
                initialValue:plan_weight,
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Input
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off"
                  onChange={(e) => valueChange.bind(this)('plan_weight', e.target.value)}
                />
              )}

            </FormItem>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="执行周期">
              {getFieldDecorator('plan_interval', {
                initialValue:plan_interval,
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('plan_interval',value)}
                >
                  <Option value="1" key={'1'}>1天</Option>
                  <Option value="2" key={'2'}>2天</Option>
                  <Option value="3" key={'3'}>3天</Option>
                  <Option value="4" key={'4'}>4天</Option>
                  <Option value="5" key={'5'}>5天</Option>
                  <Option value="6" key={'6'}>6天</Option>
                  <Option value="7" key={'7'}>7天</Option>
                  <Option value="10" key={'10'}>10天</Option>
                  <Option value="15" key={'15'}>15天</Option>
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
          <Row gutter={8} style={{marginTop:'10px'}}>
            <Col span={11}>
              <FormItem
                {...formItemLayout}
                label="计划标品">
                {getFieldDecorator('prod_id', {
                  initialValue:prod_id+'',
                  rules: [{ required: true, message: '该选项为必填项' }],
                })(
                  <Select style={{ width: '100%' }}
                          onChange={(value)=>valueChange.bind(this)('prod_id',value)}
                  >
                    {
                      productoption.map(function (item,index) {
                        return <Option value={item.id}  key={index}>{item.prod_name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
            <Col span={2}></Col>
            <Col span={11}>
              <FormItem
                {...formItemLayout}
                label="归属合同">
                {getFieldDecorator('contract_id', {
                  initialValue:this.dealinitValue(contract_id),
                  rules: [{ required: false, message: '该选项为必填项' }],
                })(
                  <Select style={{ width: '100%' }}
                          allowClear={true}
                          onChange={(value)=>valueChange.bind(this)('contract_id',value)}
                  >
                    {
                      contractoption.map(function (item,index) {
                        return <Option value={item.id}  key={index}>{item.contract_name}</Option>
                      })
                    }
                  </Select>
                )}
              </FormItem>
            </Col>
          </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={11}>
            <div><span style={{fontSize:'14px',color:'red',fontFamily:'SimSun',marginRight:'4px'}}>*</span>持续时间</div>
            <Row>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                >
                  {getFieldDecorator('start_date', {
                    initialValue: moment(start_date, dateFormat),
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <DatePicker
                      placeholder=""
                      format={dateFormat}
                      onChange={(date,dateString) => valueChange.bind(this)('start_date', dateString)}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
                <div style={{marginTop:'9px',textAlign:'center'}}>至</div>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}>
                  {getFieldDecorator('end_date', {
                    initialValue: moment(end_date, dateFormat),
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <DatePicker
                      placeholder=""
                      format={dateFormat}
                      onChange={(date,dateString) => valueChange.bind(this)('end_date',dateString)}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
          </Col>
          <Col span={2}></Col>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="商品价格">
              {getFieldDecorator('price', {
                initialValue:price,
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Input
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off"
                  onChange={(e) => valueChange.bind(this)('price', e.target.value)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
          <Row style={{marginTop:'10px'}}>
            <Col style={{textAlign:'right'}}>
              <Button onClick={onCancel.bind(this)} style={{marginRight:'10px'}} >取消</Button>
              <Button type="primary" loading={loading} onClick={(e)=>mysubmit.bind(this)(e)}>确定</Button>
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
