import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Input,Form,Divider,Upload,message } from 'antd';
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const FormItem = Form.Item;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}
function beforeUpload(file) {
  const isJPG = (file.type === 'image/jpeg'|| file.type ==='image/png');
  if (!isJPG) {
    message.error('仅支持jpg、png格式!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('图片内容不得超过 2MB!');
  }
  return isJPG && isLt2M;
}
class CompanyMessageAvatar extends React.Component {
  constructor(props){
    super(props);
    this.state={
      imageUrl:false,
    }

  }

  componentDidMount(){
  }
  componentWillMount(){
      const url=this.props.imgUrl.license_url;
      if (url) {
        this.setState({
          imageUrl: url,
        });
      }
      else {
        this.setState({
          imgUrl:false,
        })
      }
    }

  componentWillReceiveProps(){
    const url=this.props.imgUrl.license_url;
    if (url) {
      this.setState({
        imageUrl: url,
      });
    }
    else {
      this.setState({
        imgUrl:false,
      })
    }
  }

  uploadsuccess(data){
     if(data.code==0){
        message.error(data.msg) ;
      }else{
        this.setState({
          imageUrl:data.license_url
        })
      }
  }
  render() {
    const imageUrl = this.state.imageUrl;
    const url = RequireUtils.ip + "company/modify-license" ;
    return (
      <div>
        <Row gutter={8} style={{ marginTop: '10px',marginLeft:'4px' }}>
      <Upload
        className="avatar-uploader"
        name="CompanyForm[license]"
        showUploadList={false}
        action={url}
        beforeUpload={beforeUpload}
        onSuccess={this.uploadsuccess.bind(this)}
      >
        {
          imageUrl ?
            <img src={imageUrl} onError={(e)=>{e.target.src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}} alt="" className="avatar" /> :
            <Icon type="plus" className="avatar-uploader-trigger" />
        }
      </Upload>
          <span style={{display:'inline-block',width:'300px',verticalAlign:'bottom'}}>
            <small style={{verticalAlign:'bottom',marginLeft:'10px'}}>上传公司营业执照</small>
            <br/>
            <small style={{verticalAlign:'bottom',marginLeft:'10px'}}>仅支持JPG、PNG格式，文件小于2M(方形图)</small>
          </span>
        </Row>
      </div>
    );
  }
}
export default CompanyMessageAvatar;
