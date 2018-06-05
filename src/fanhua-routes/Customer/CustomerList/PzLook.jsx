import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button,Cascader,Icon,Upload,Modal } from 'antd';
import MyAvatar from '../../Contract/ContractManagement/MyAvatar' ;
import {RequireUtils} from 'utils';
import mystyle from '../../Contract/ContractManagement/tabstyle.less' ;
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
  this.props.handleUpateCancel() ;
  this.props.form.resetFields();
}

/**
 * 新增或者删除
 * @param type
 */
function submit(e) {
  var _this = this ;
  this.setState({
    loading:true
  }) ;
  const { fileList ,showFileList} = this.state;
  const formData = new FormData();
  fileList.forEach((file) => {
    formData.append('ContractForm[contract_files][]', file);
  });

  var remainFiles = showFileList.filter(function (item) {
    return !item.my_custom
  })
  if(remainFiles.length==0||!remainFiles){
    formData.append('contract_imgs[]',[]);
  }else{
    remainFiles.forEach((file) =>{
      formData.append('contract_imgs[]', file.name);
    });
  }
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    console.log(err) ;
    if (err) {
      this.setState({
        loading:false
      }) ;
    }
    else{
      var form = this.state.form ;
      var id = this.props.updateData.id ;
      formData.append('buyer_id',values.buyer_id) ;
      formData.append('saler_id',values.saler_id) ;
      formData.append('start_date',values.start_date.format("YYYY-MM-DD")) ;
      formData.append('end_date',values.end_date.format("YYYY-MM-DD")) ;
      formData.append('contract_code',values.contract_code) ;
      formData.append('contract_name',values.contract_name) ;
      formData.append('type_id',values.type_id) ;
      formData.append('id',id) ;
      RequireUtils.fileBaseRequire('contract/modify-contract',formData,function (data) {
        if (data.code)
        {
          alert(data.msg);
          this.setState({
            loading:false,
            fileList:[],
            showFileList:[]
          }) ;
          this.props.go() ;
          this.props.handleUpateCancel() ;
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
      imageFiles:[],
      fileList: [

      ],
      showFileList:[],
      uploading: false,

    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {

  }
  handleCancel = () => this.setState({ previewVisible: false }) ;

  /* handleChange = ({ fileList }) => this.setState({ fileList }) ;*/
  handleChange = (info) => {
    var _this = this ;
    var {reactp} = _this.props ;
    var reader = new FileReader();
    if(info.file.status=="removed"){
      var showFileList = this.state.showFileList ;
      const index = showFileList.indexOf(info.file);
      const newFileList = showFileList.slice();
      newFileList.splice(index, 1);

      reactp.setState({
        imageFiles:[...newFileList]
      }) ;
      _this.setState({
        remainFiles:[...newFileList]
      }) ;
      return ;
    }
    reader.readAsDataURL(info.file);
    reader.onload = function (e) {
      var  showFileList = _this.state.showFileList ;
      var newFiles = _this.state.newFiles ;
      var ss = {
        uid:new Date().getTime(),
        name: 'xxx.png',
        status: 'done',
        url: this.result,
        my_custom:true
      } ;
      reactp.setState({
        imageFiles:[...showFileList,ss]
      }) ;
      _this.setState({
        newFiles:[...newFiles,ss]
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

    const {imageFiles} = this.props ;
    this.state.showFileList = imageFiles ;
    this.state.remainFiles = imageFiles ;
    const { previewVisible, previewImage,companyoptions,showFileList,contracttypeoptions } = this.state;
    const { getFieldDecorator } = this.props.form;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const dateFormat = 'YYYY-MM-DD';
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType:"picture-card",
    };
    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <Row gutter={8}>
              <Row gutter={8} style={{ marginTop: '10px',marginLeft:'4px' }}>
                <Upload
                  style={{width:'80%'}}
                  {...props}
                  showUploadList={{showPreviewIcon:true,showRemoveIcon:false}}
                  fileList={showFileList}
                  onChange={this.handleChange}
                >
                  {/*{showFileList.length >= 1 ? null : uploadButton}*/}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Row>
            </Row>
          </Form>
        </main>
      </div >
    )
  }
}
AddContractManagement = createForm()(AddContractManagement);
export default AddContractManagement;
