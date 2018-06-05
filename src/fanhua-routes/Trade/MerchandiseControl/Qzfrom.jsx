import React from 'react';
import { Row, Col, Tabs,Select,Form,Button,Upload,Modal } from 'antd';
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

function onCancel() {
  this.props.handleCancel() ;
}


class PlanListUpdate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      previewVisible:false,
      previewImage:''
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  } ;

  handleCancel = () => this.setState({ previewVisible: false }) ;

  componentDidMount() {

  }

  render() {
    const {} = this.state ;
    const {reports} = this.props ;

    const myshowfilelist = reports.map(function (item,index) {
      var myobj = {
        uid: index,
        name: item,
        status: 'done',
        url: item
      }  ;
      return myobj ;
    }) ;
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



    const {previewVisible,previewImage} = this.state ;
    return (
      <div className={'my-custom-padding'}>
        <main>
        <Form >
        <Row gutter={8} >
          <Upload
            listType="picture-card"
            onPreview={this.handlePreview}
            props
            fileList={myshowfilelist}
            showUploadList={{showPreviewIcon:true,showRemoveIcon:false}}
            onChange={this.handleChange}
          >
            {/*{showFileList.length >= 1000 ? null : uploadButton}*/}
          </Upload>
          <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
            <img alt="example" style={{ width: '100%' }} src={previewImage} />
          </Modal>
        </Row>
          <Row style={{marginTop:'10px'}}>
            <Col style={{textAlign:'right'}}>
              <Button onClick={onCancel.bind(this)} style={{marginRight:'10px'}} >取消</Button>
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
