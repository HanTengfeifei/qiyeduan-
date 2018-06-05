import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button,Cascader,Icon,Upload,Modal } from 'antd';
import MyAvatar from './MyAvatar' ;
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
  this.setState({
    showFileList:[],
    fileList:[]
  }) ;
}

/**
 * 新增或者删除
 * @param type
 */
function submit(e) {
  this.setState({
    loading:true
  }) ;
  const { fileList } = this.state;
  const formData = new FormData();
  fileList.forEach((file) => {
    formData.append('ContractForm[contract_files][]', file);
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
      formData.append('buyer_id',form.buyer_id) ;
      formData.append('saler_id',form.saler_id) ;
      formData.append('start_date',form.start_date) ;
      formData.append('end_date',form.end_date) ;
      formData.append('contract_code',form.contract_code) ;
      formData.append('contract_name',form.contract_name) ;
      formData.append('type_id',form.type_id) ;
      RequireUtils.fileBaseRequire('contract/add-contract',formData,function (data) {
        if (data.code)
        {
          alert(data.msg);
          this.setState({
            loading:false
          }) ;
          this.props.go() ;
          this.props.handleAddCancel() ;
          this.setState({
            showFileList:[],
            fileList:[]
          }) ;
          this.props.form.resetFields();
        }else{
          alert(data.msg);
          this.setState({
            loading:false
          }) ;
        }
      }.bind(this));
    }
  });
}
class AddContractManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      previewVisible: false,
      previewImage: '',
      companyoptions:[],
      contracttypeoptions:[],
      fileList: [

        ],
      showFileList:[],
      uploading: false,

      form:{
        buyer_id:"",
        saler_id:"",
        start_date:"",
        end_date:"",
        contract_code:"",
        contract_name:"",
        type_id:""
      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {
    var _this = this ;
    RequireUtils.baseRequire('/contract/company-select',{},function (data) {
      if(data.code==1) {
        var list = data.data.list ;
        this.setState({
          companyoptions:list
        });
      }else{
        alert(data.msg);
      }
    }.bind(this));
    RequireUtils.baseRequire('/contract/type-select',{},function (data) {
      if(data.code==1) {
        var list = data.data.list ;
        this.setState({
          contracttypeoptions:list
        });
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  handleCancel = () => this.setState({ previewVisible: false }) ;
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
      var ss = {
        uid: new Date().getTime(),
        name: 'xxx.png',
        status: 'done',
        url: this.result,
      } ;
      _this.setState({
        showFileList:[...showFileList,ss],
      });
    }
  };

  contractLen(rule, value, callback){
      if(value.length>20){
        callback('不得超过20位!');
      }else{
        callback() ;
      }
  }


  contractNameLen(rule, value, callback){
    if(value.length>20){
      callback('不得超过20位!');
    }else{
      callback() ;
    }
  }


  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const _this = this ;
    const { previewVisible, previewImage, fileList,companyoptions,showFileList,contracttypeoptions } = this.state;

    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

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
    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <Row gutter={8} >
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="合同编号">
                  {getFieldDecorator('contract_code', {
                    initialValue:'',
                    rules: [
                      { required: true, message: '该选项为必填项' },
                      {
                        validator: this.contractLen.bind(this),
                      }
                      ]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('contract_code', e.target.value)}
                    />
                  )}

                </FormItem>
              </Col>


              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="合同名称">
                  {getFieldDecorator('contract_name', {
                    initialValue:'',
                    rules: [
                      { required: true, message: '该选项为必填项' },
                      {
                        validator: this.contractNameLen.bind(this),
                      }
                      ]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('contract_name', e.target.value)}
                    />
                  )}

                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} >
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="选择甲方">
                  {getFieldDecorator('saler_id', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(

                    <Select style={{ width: '100%' }}
                            onChange={(value)=>valueChange.bind(this)('saler_id',value)}
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
              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="选择乙方">
                  {getFieldDecorator('buyer_id', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(

                    <Select style={{ width: '100%' }}
                            onChange={(value)=>valueChange.bind(this)('buyer_id',value)}
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
              <Col span={11}>
                <div><span style={{color:'red',fontSize:'14px',fontFamily:'SimSun',marginRight:"4px"}}>*</span>持续时间</div>
                <Row style={{marginTop:'3px'}}>
                  <Col span={11}>
                    <FormItem
                      {...formItemLayout}
                    >
                      {getFieldDecorator('start_date', {
                        rules: [{ required: true, message: '该选项为必填项' }],
                      })(
                        <DatePicker
                          placeholder=""
                          onChange={(date,dateString) => valueChange.bind(this)('start_date', dateString)}
                          style={{width:'100%'}} />

                      )}
                    </FormItem>
                  </Col>
                  <Col span={2}>
                    <div style={{marginTop:'9px',textAlign:'center'}}>至</div>
                  </Col>
                  <Col span={11}>
                    <FormItem
                      {...formItemLayout}
                    >
                      {getFieldDecorator('end_date', {
                        rules: [{ required: true, message: '该选项为必填项' }],
                      })(
                        <DatePicker
                          placeholder=""
                          onChange={(date,dateString) => valueChange.bind(this)('end_date',dateString)}
                          style={{width:'100%'}}  />
                      )}
                    </FormItem>
                  </Col>
                </Row>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="合同类型">
                  {getFieldDecorator('type_id', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(

                    <Select style={{ width: '100%' }}
                            onChange={(value)=>valueChange.bind(this)('type_id',value)}
                    >
                      {
                        contracttypeoptions.map(function (item,index) {
                          return <Option value={item.meta_code} key={index}>{item.meta_name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>

            <Row gutter={8}>
              <Row gutter={8} style={{ marginTop: '10px',marginLeft:'4px' }}>
                <Upload
                  {...props}
                  fileList={showFileList}
                  onChange={this.handleChange}
                >
                  {showFileList.length >= 1000 ? null : uploadButton}
                </Upload>
                <small style={{verticalAlign:'bottom',marginLeft:'10px'}}>仅支持JPG、PNG格式，文件小于1M(方形图)</small>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Row>
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
AddContractManagement = createForm()(AddContractManagement);
export default AddContractManagement;
