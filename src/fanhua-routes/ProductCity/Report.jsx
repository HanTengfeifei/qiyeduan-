import React from 'react';
import { Card, Row, Col, Tabs, Button, Radio, Select , Upload, Icon, Modal} from 'antd';
import { Link } from 'dva/router';
import './Head.less';
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:{},
      previewVisible: false,
      previewImage: '',
      fileList: [{
        uid: -1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      },{
        uid: 1,
        name: 'xxx.png',
        status: 'done',
        url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
      }],
    };
    this.callback = this.callback.bind(this);
    }

handleCancel = () => this.setState({ previewVisible: false });

  callback(key) {
    console.log(key);
  }
  componentDidMount(){
    // RequireUtils.baseRequire('mall/report',{ id:this.props.prod_id},function (data) {
    //   if(data.code==1) {
    //     this.setState({
    //       fileList :data.data.info
    //     });
    //
    //     console.log(this.state.info);
    //   }
    //   else{
    //     alert("获取用户信息失败！");
    //   }
    // }.bind(this));
  }
  componentWillMount(){
    console.log(22222222);
    console.log(this.props.prod_id);
    RequireUtils.baseRequire('mall/report',{ id:this.props.prod_id},function (data) {
      if(data.code==1) {
        this.setState({
          fileList : data.data.info.map((item ,index)=>{
            const picture={};
            picture.uid="-"+{index};
            picture.name=index;
            picture.status="done";
            picture.url=item.detail_url;
            return picture;
            })
      });}
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  }
  findRoleAll(){
    var context=this;
    RequireUtils.baseRequire('person/person-info',{},function (data) {
      if(data.code==1) {
        this.setState({
          info:data.data.info
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  }
  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="//jsonplaceholder.typicode.com/posts/"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          onRemove={false}
          showUploadList={{showRemoveIcon:false }}
        >
          {fileList.length >= 1 ? null : uploadButton}
        </Upload>
        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    )
  }
}
export default Report;
