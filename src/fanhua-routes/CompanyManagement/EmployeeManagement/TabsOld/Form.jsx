import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button,Radio,message } from 'antd';
import {RequireUtils} from 'utils';
import moment from 'moment';
import mystyle from './tabstyle.less' ;
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

function noop() {
  return false;
}


/**
 * input值发生更改时值也及时发生改变
 * @param name
 * @param value
 */
function valueChange(name,value) {
  var form = this.state;
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
    console.log(values);
    console.log(2222222222222);
    if (!err) {
        RequireUtils.baseRequire('user/modify-user',Object.assign(values,{id:this.props.updateData.id}),function (data) {
          if (data.code==1)
          {
            this.setState({
              loading:false
            }) ;
            this.props.go();
            this.props.handleCancel() ;
            this.props.form.resetFields();
            message.success(data.msg);
          }
          else{
            alert("提交失败!");
            this.setState({
              loading:false
            }) ;
          }
        }.bind(this));
    }
    // else{
    //   var form = this.state;
    //   const {updateData} = this.props ;
    //   form.id = updateData.id;
    //   RequireUtils.baseRequire('user/modify-user',form,function (data) {
    //     if (data.code)
    //     {
    //       alert(data.msg);
    //       this.setState({
    //         loading:false
    //       }) ;
    //       this.props.go() ;
    //       this.props.handleCancel() ;
    //       this.props.form.resetFields();
    //     }
    //     else{
    //       alert("提交失败!");
    //       this.setState({
    //         loading:false
    //       }) ;
    //     }
    //   }.bind(this));
    // }
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
        bill_name:"",
        start_date:"",
        end_date:"",
        plan_interval:""
      }
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
    const {loading} = this.state ;
    const {updateData} = this.props ;
    const {
      user_name,
      plan_status,
      id,
      deliver_id,
      buyer_id,
      contract_id,
      recv_id,
      plan_weight,
      bill_name,
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
              label="用户姓名">
              {getFieldDecorator('user_name', {
                initialValue:recv_id+"",
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Input
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off"
                  onChange={(e) => valueChange.bind(this)('user_name', e.target.value)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
          <Row gutter={8} >
            <Col span={11}>
              <FormItem
                {...formItemLayout}
                label="登录手机账号">
                {getFieldDecorator('user_mobile', {
                  initialValue:recv_id+"",
                  rules: [{ required: true, message: '该选项为必填项' }]
                })(
                  <Input
                    onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                    autoComplete="off"
                    onChange={(e) => valueChange.bind(this)('user_mobile', e.target.value)}
                  />
                )}
              </FormItem>
            </Col>
          </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="状态">

              {getFieldDecorator('user_status', {
                initialValue:plan_status+"",
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('user_status',value)}
                >
                  <Option value="" key={'0'}>--请选择--</Option>
                  <Option value="0" key={'1'}>启用</Option>
                  <Option value="1" key={'2'}>禁用</Option>
                </Select>
              )}

            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} style={{marginTop:'10px'}}>
          <Col span={24}>
            <FormItem
              {...formItemLayout}
              label="角色分配"
            >
              {getFieldDecorator('role_id',{
                initialValue:'',
                rules: [{ required: false, message: '该选项为必填项' }],
              })(
                <RadioGroup
                  onChange={(value)=>valueChange.bind(this)('role_id',value)}
                >{
                  this.props.role.map((item,index)=>{
                    return (<Radio value={item.id}>{item.role_name}</Radio>)
                  })
                }
                </RadioGroup>
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
PlanListUpdate = createForm(
  {mapPropsToFields(props) {
      return {
        user_name: Form.createFormField({
          ...props.updateData.user_name,
          value: props.updateData.user_name,
        }),
        user_mobile: Form.createFormField({
          ...props.updateData.user_mobile,
          value: props.updateData.user_mobile,
        }),
        user_status: Form.createFormField({
          ...props.updateData.user_status,
          value: props.updateData.user_status,
        }),
        role_id: Form.createFormField({
          ...props.updateData.role_id,
          value: props.updateData.role_id,
        }),
      };
    },}
)(PlanListUpdate);
export default PlanListUpdate;
