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
  })
}

/**
 * 新增或者删除
 * @param type
 */
function submit(e) {
  e.preventDefault();
  this.setState({
    loading:true
  }) ;
  const { fileList } = this.state;
  const formData = new FormData();
  fileList.forEach((file) => {
    formData.append('CompanyForm[cert]', file);
  });
      formData.append('id',this.props.id);
      RequireUtils.fileBaseRequire('company/modify-cert',formData,function (data) {
        if (data.code)
        {
          alert(data.msg);
          this.setState({
            loading:false
          }) ;
          this.props.go() ;
          this.props.handleAddCancel() ;
          this.props.form.resetFields();
        }else{
          alert(data.msg);
          this.setState({
            loading:false
          }) ;
        }
      }.bind(this));
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
      fileList: [],
      showFileList:[],
      uploading: false,
       id:"",
      form:{
        buyer_id:"",
        saler_id:"",
        start_date:"",
        end_date:"",
        contract_code:"",
        contract_name:"",
        type_id:""
      }
    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  setStateTo(id){
    this.setState({
      id:id,
    })
  }
  componentDidMount() {
    this.props.onRef(this);
  }
  handleCancel = () => this.setState({ previewVisible: false }) ;
/* handleChange = ({ fileList }) => this.setState({ fileList }) ;*/
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
          <Form>
            <Row gutter={8}>
              <Row gutter={8} style={{marginTop: '10px', marginLeft: '4px'}}>
                <Upload
                  {...props}
                  fileList={showFileList}
                  /* listType="picture-card"
                   onPreview={this.handlePreview}
                   onChange={this.handleChange}*/
                  onChange={this.handleChange}
                >
                  {showFileList.length >=1? null : uploadButton}
                </Upload>
                <small style={{verticalAlign: 'bottom', marginLeft: '10px'}}>仅支持JPG、PNG格式，文件小于1M(方形图)</small>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{width: '100%'}} src={previewImage}/>
                </Modal>
              </Row>
            </Row>

            <Row style={{marginTop: '10px'}}>
              <Col style={{textAlign: 'right'}}>
                <Button onClick={onCancel.bind(this)} style={{marginRight: '10px'}}>取消</Button>
                <Button type="primary" loading={this.state.loading} onClick={(e) => submit.bind(this)(e)}>确定</Button>
              </Col>
            </Row>
          </Form>
        </main>
      </div>
    )
  }
}

AddContractManagement = createForm()(AddContractManagement);
export default AddContractManagement;
