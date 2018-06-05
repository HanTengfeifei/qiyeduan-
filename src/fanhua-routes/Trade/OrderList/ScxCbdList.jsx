import React from 'react';
import { Row, Col,Select,Form,Input,DatePicker,Button,Icon,Radio,Table,Upload,message  } from 'antd';
import moment from 'moment';
import {RequireUtils} from 'utils';
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;



/**
 * 关闭页面
 */
function onCancel() {
  this.props.handleScxcbdCancel() ;
  this.props.form.resetFields();
}

/**
 * 新增或者删除
 * @param type
 */
function submit(e,item) {
  this.setState({
    loading:true
  }) ;
  const { fileList } = this.state;
  const formData = new FormData();
  fileList.forEach((file) => {
    formData.append('SpecialOrderForm[recv_bill_file]', file);
  });

  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    console.log(err) ;
    if (err) {
      this.setState({
        loading:false
      }) ;
    }else{
      RequireUtils.fileBaseRequire("special-order/recv-bill",formData,function (data) {
        if (data.code)
        {
          message.success(data.msg);
          this.setState({
            loading:false
          }) ;
          var {pthis,mykey,item} = this.props ;
          const {yundans} = pthis.state ;
          const yundan = yundans[mykey] ;
          const cars = yundan.cars ;
          const target = cars.filter(record => record.key === item.key)[0];
          target.recv_name =  data.recv_bill ; //RequireUtils.ip+'/resource/image/bill/'+
          pthis.setState({
            yundans:yundans
          }) ;
         /* this.props.go() ;*/
          this.props.handleScxcbdCancel() ;
          /*  cleardata.bind(this)() ;*/
        /*  this.props.form.resetFields();*/
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

class zdbdList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      mymark:true,
      fileList: [

      ],
      showFileList:[],
      form:{
        send_num:"",
      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }


  handleChange = (info) => {
    var _this = this ;
    var mpthis = this.props._this ;
    var reader = new FileReader();
    if(info.file.status=="removed"){
      var showFileList = this.state.showFileList ;
      const index = showFileList.indexOf(info.file);
      const newFileList = showFileList.slice();
      newFileList.splice(index, 1);
      mpthis.setState({
        rimgFiles:[...newFileList]
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

      mpthis.setState({
        rimgFiles:[...showFileList,ss]
      }) ;
    }
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const {item} = this.props ;
    const {rimgFiles,_this} = this.props ;

   this.state.showFileList = rimgFiles ;

    const { getFieldDecorator } = this.props.form;
    const {showFileList} = this.state ;

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

    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <Row>
              <Col span={11}>
                <div>上传卸车磅单</div>
                <Upload
                  {...props}
                  fileList={showFileList}
                  onChange={this.handleChange}
                >
                  {showFileList.length >= 1 ? null : uploadButton}
                </Upload>
              </Col>
            </Row>
            <Row style={{marginTop:'10px'}}>
              <Col style={{textAlign:'right'}}>
                <Button onClick={onCancel.bind(this)} style={{marginRight:'10px'}} >取消</Button>
                <Button type="primary" loading={this.state.loading} onClick={(e)=>submit.bind(this)(e,item)}>确定</Button>
              </Col>
            </Row>
          </Form>
        </main>
      </div >
    )
  }
}
zdbdList = createForm()(zdbdList);
export default zdbdList;
