import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Input,DatePicker,message,Upload,Form } from 'antd';
import createHistory from 'history/createHashHistory';
import { Divider } from 'antd';
import {RequireUtils} from 'utils';
import moment from 'moment' ;
import mystyle from './tabstyle.less';
const createForm = Form.create;
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;


function showbill(id) {
  createHistory().push({
    pathname: '/customerbilllistdetail/?customerid='+id,
  })
}

function submitAndLook(e) {
  this.setState({
    lookloading:true
  }) ;
  const { fileList } = this.state;
  const formData = new FormData();
  fileList.forEach((file) => {
    formData.append('RelationForm[record_bill_img]', file);
  });
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (err) {
      this.setState({
        lookloading:false
      }) ;
    }else{
      var form = this.state.form ;
      formData.append('company_id2',form.company_id) ;
      formData.append('record_date',form.record_date) ;
      formData.append('money_num',form.money_num) ;
      formData.append('scenario',"add_cust_record") ;
      RequireUtils.fileBaseRequire('relation/add-record',formData,function (data) {
        if (data.code)
        {
          message.success(data.msg,1,showbill(data.data.customer_id));
        }else{
          message.error(data.msg);
          this.setState({
            lookloading:false
          }) ;
        }
      }.bind(this));
    }
  });
}

function submit(e) {
  this.setState({
    loading:true
  }) ;
  const { fileList } = this.state;
  const formData = new FormData();
  fileList.forEach((file) => {
    formData.append('RelationForm[record_bill_img]', file);
  });
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    console.log(err) ;
    if (err) {
      this.setState({
        loading:false
      }) ;
    }else{
      var form = this.state.form ;
      formData.append('company_id2',form.company_id) ;
      formData.append('record_date',form.record_date) ;
      formData.append('money_num',form.money_num) ;
      formData.append('scenario',"add_cust_record") ;
      RequireUtils.fileBaseRequire('relation/add-record',formData,function (data) {
        if (data.code)
        {
          message.success(data.msg);
          this.setState({
            loading:false
          }) ;
          this.props.form.resetFields();
          this.setState({
            showFileList:[],
            fileList:[]
          })
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

function noop() {
  return false;
}

class CustomerPrePayment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyoptions:[],
      showFileList:[],
      fileList:[],
      lookloading:false,
      imgindex:0,
      form:{
        company_id:"",
        record_date:"",
        money_num:"",
        pay_way:""
      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {
    var _this = this ;
    RequireUtils.baseRequire('/relation/cust-select',{},function (data) {
      if(data.code==1) {
        var list = data.data.list ;
        this.setState({
          companyoptions:list
        });
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }

  handleChange = (info) => {
    var _this = this ;
    var reader = new FileReader();
    if(info.file.status=="removed"){
      var showFileList = this.state.showFileList ;
      const index = showFileList.indexOf(info.file);
      const newFileList = showFileList.slice();
      newFileList.splice(index, 1);
      _this.setState({
        showFileList:[...newFileList]
      }) ;
      return ;
    }
    reader.readAsDataURL(info.file);
    reader.onload = function (e) {
      var  showFileList = _this.state.showFileList ;
      var index = _this.state.imgindex ;
      var ss = {
        uid: index,
        name: 'xxx.png',
        status: 'done',
        url: this.result,
      } ;
      _this.setState({
        showFileList:[...showFileList,ss],
        imgindex:index+1
      });
    }
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType:"picture-card",
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file);
          const newFileList = fileList.slice();
          newFileList.splice(index, 1);
          return {
            fileList: newFileList,
          };
        });
      },
      beforeUpload: (file) => {
        this.setState(({ fileList }) => ({
          fileList: [...fileList, file],
        }));
        return false;
      },
      fileList: this.state.fileList,
    };

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const {companyoptions,showFileList} = this.state ;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'my-custom-padding'}>
        <Row>
          <Col span={5}>
            <FormItem
              {...formItemLayout}
              label="公司名称">
              {getFieldDecorator('company_id', {
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }],
              })(

                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('company_id',value)}
                >
                  {
                    companyoptions.map(function (item,index) {
                      return <Option value={item.id} key={index}>{item.company_name}</Option>
                    })
                  }
                </Select>
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={5}>
            <FormItem
              {...formItemLayout}
              label="付款渠道">
              {getFieldDecorator('pay_way', {
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Input
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off"
                  onChange={(e) => valueChange.bind(this)('pay_way', e.target.value)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={5} >
            <FormItem
              {...formItemLayout}
              label="收款时间">
              {getFieldDecorator('record_date', {
                rules: [{ required: true, message: '该选项为必填项' }],
              })(
                <DatePicker
                  placeholder=""
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime={{  defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  onChange={(date,dateString) => valueChange.bind(this)('record_date', dateString)}
                  style={{width:'100%'}} />

              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={5} >
            <FormItem
              {...formItemLayout}
              label="收款金额">
              {getFieldDecorator('money_num', {
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Input
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off"
                  onChange={(e) => valueChange.bind(this)('money_num', e.target.value)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={24} >
            <p style={{marginBottom:'3px'}}><span style={{color:'red',fontSize:'14px',fontFamily:'SimSun'}}>*</span>上传凭证</p>
            <Upload
              {...props}
              fileList={showFileList}
              /* listType="picture-card"
               onPreview={this.handlePreview}
               onChange={this.handleChange}*/
              onChange={this.handleChange}
            >
              {showFileList.length >= 1 ? null : uploadButton}
            </Upload>
            <small style={{verticalAlign:'bottom',marginLeft:'10px'}}>仅支持JPG、PNG格式，文件小于2M(方形图)</small>
          </Col>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>
          <Col span={6} >
            <Button  type="primary" loading={this.state.loading} onClick={(e)=>submit.bind(this)(e)}  style={{marginRight:'10px'}}>继续提交</Button>
            <Button  type="primary" loading={this.state.lookloading} onClick={(e)=>submitAndLook.bind(this)(e)}>提交并查看</Button>
          </Col>
        </Row>
      </div >
    )
  }
}

CustomerPrePayment = createForm()(CustomerPrePayment);
export default CustomerPrePayment;
