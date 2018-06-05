import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button,Cascader,message } from 'antd';
import {RequireUtils} from 'utils';
import mystyle from './tabstyle.less' ;
import moment from 'moment';
const createForm = Form.create;
const FormItem = Form.Item;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const MonthPicker = DatePicker.MonthPicker;

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
  this.props.handleAddCancel() ;
  this.props.form.resetFields();
}

/**
 * 新增或者删除
 * @param type
 */
function submit(e) {
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
      var form = this.state.form ;
      RequireUtils.baseRequire('/person/add-company',form,function (data) {
        if (data.code)
        {
          message.success(data.msg);
          this.setState({
            loading:false
          }) ;
          this.props.handleAddCancel();
          window.location.reload();
          this.props.form.resetFields();
        }else{
          message.error(data.msg);
          this.setState({
            loading:false
          }) ;
        }
      }.bind(this));
    }
  });
}

class AddFieldStationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      linpeopleoptions:[],
      form:{
        addr_contact:"",
        addr_province:"",
        addr_city:"",
        addr_county:"",
        addr_name:"",
        addr_detail:"",
        type_id:"",
        prop_id:"",
        company_name:"",
        license_num:"",
        company_abbr:"",
        company_contact:"",
        company_desc:"",
        contact_phone:"",
        register_addr:"",
        company_owner:"",
        company_mail:"",
        owner_phone:"",


      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {
    var _this = this ;
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
          {/*  <Row gutter={8} style={{ marginTop: '10px',marginLeft:'4px' }}>
              <CompanyMessageAvatar></CompanyMessageAvatar>
              <small style={{verticalAlign:'bottom',marginLeft:'10px'}}>仅支持JPG、PNG格式，文件小于1M(方形图)</small>
            </Row>*/}
            <Row gutter={8} style={{ marginTop: '10px' }}>
              <Col span={11} >
                <FormItem
                  {...formItemLayout}
                  label="公司名称">
                  {getFieldDecorator('company_name', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('company_name', e.target.value)}
                    />
                  )}
                </FormItem>

              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="营业执照号码">
                  {getFieldDecorator('license_num', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('license_num', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} style={{ marginTop: '10px' }}>
              <Col span={11} >
                <FormItem
                  {...formItemLayout}
                  label="公司简称">
                  {getFieldDecorator('company_abbr', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('company_abbr', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="公司类型">
                  {getFieldDecorator('type_id', {
                    initialValue:'',
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('type_id', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} style={{ marginTop: '10px' }}>
              <Col span={11} >
                <FormItem
                  {...formItemLayout}
                  label="联系人姓名">
                  {getFieldDecorator('company_contact', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('company_contact', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11} >
                <FormItem
                  {...formItemLayout}
                  label="联系方式">
                  {getFieldDecorator('contact_phone', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('contact_phone', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} style={{ marginTop: '10px' }}>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="公司简介">
                  {getFieldDecorator('company_desc', {
                    initialValue:'',
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('company_desc', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="注册地址">
                  {getFieldDecorator('register_addr', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('register_addr', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} style={{ marginTop: '10px' }}>
              <Col span={11} >
                <FormItem
                  {...formItemLayout}
                  label="法人姓名">
                  {getFieldDecorator('company_owner', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('company_owner', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11} >
                <FormItem
                  {...formItemLayout}
                  label="联系方式">
                  {getFieldDecorator('owner_phone', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('owner_phone', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} style={{ marginTop: '10px' }}>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="邮箱">
                  {getFieldDecorator('company_mail', {
                    initialValue:'',
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('company_mail', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="公司性质">
                  {getFieldDecorator('prop_id', {
                    initialValue:'',
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('prop_id', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row style={{marginTop:'10px'}}>
              <Col style={{textAlign:'right'}}>
                <Button onClick={onCancel.bind(this)} style={{marginRight:'10px'}} >取消</Button>
                <Button type="primary" loading={this.state.loading} onClick={(e)=>submit.bind(this)(e)}>确定</Button>
              </Col>
            </Row>
          </Form>
        </main>
      </div >
    )
  }
}
AddFieldStationList = createForm()(AddFieldStationList);
export default AddFieldStationList;
