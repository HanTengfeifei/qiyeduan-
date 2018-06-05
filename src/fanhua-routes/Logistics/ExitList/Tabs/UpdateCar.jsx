import React from 'react';
import { Row, Col,Select,Form,Input,DatePicker,Button,Icon,Radio,Table,message  } from 'antd';
import moment from 'moment';
import {RequireUtils} from 'utils';
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

function noop() {
  return false;
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
function submit(e,car_type) {

  this.setState({
    loading:true
  }) ;
  var url = "order-deliver/modify-car" ;
  e.preventDefault();
  this.props.form.validateFields((err, fieldsValue) => {
    this.setState({
      loading:true
    }) ;
    console.log(err) ;
    if (err) {
      this.setState({
        loading:false
      }) ;
    }else{
      var form = {
        car_head:fieldsValue['car_head'],
        car_body:fieldsValue['car_body'],
        load_num:fieldsValue['load_num'],
        driver1:fieldsValue['driver1'],
        start_date:fieldsValue['start_date'].format('YYYY-MM-DD'),
        end_date:fieldsValue['end_date'].format('YYYY-MM-DD')
      } ;
      var updateData = this.props.updateData ;
      form.id = updateData.id ;
      RequireUtils.baseRequire(url,form,function (data) {
        if (data.code)
        {
          message.success(data.msg);
          this.setState({
            loading:false
          }) ;
          this.props.go() ;
          this.props.handleAddCancel() ;
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

class AddCar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      heavyid:'',
      companyoptions:[],
      headcaroptions:[],
      bodycaroptions:[],
      driveroptions:[],
      heavycarsData:[]
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }


  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const { getFieldDecorator } = this.props.form;
    const {updateData,headcaroptions,bodycaroptions,driveroptions,companyoption} = this.props ;
    const {load_num,car_head,car_body,driver1,start_date,end_date} = updateData ;

    const dateFormat = 'YYYY-MM-DD';
    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <Row gutter={8} >
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="承运商">
                  {getFieldDecorator('saler_id', {
                    initialValue:companyoption.company_name,
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      disabled={true}
                    />
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="运载量">
                  {getFieldDecorator('load_num', {
                    initialValue:load_num,
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="车头车牌">
                  {getFieldDecorator('car_head', {
                    initialValue:car_head+"",
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Select style={{ width: '100%' }}

                    >
                      {
                        headcaroptions.map(function (item,index) {
                          return <Option value={item.id} key={index}>{item.car_num}</Option>
                        })
                      }
                    </Select>
                  )}

                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <div>装车时间</div>
                <Row style={{marginTop:'3px'}}>
                  <Col span={24}>
                    <FormItem
                      {...formItemLayout}
                    >
                      {getFieldDecorator('start_date', {
                        initialValue: moment(start_date, dateFormat),
                        rules: [{ required: true, message: '该选项为必填项' }],
                      })(
                        <DatePicker
                          placeholder=""
                          style={{width:'100%'}} />

                      )}
                    </FormItem>
                  </Col>
                  <Col span={2}></Col>
                </Row>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="车挂车牌">
                  {getFieldDecorator('car_body', {
                    initialValue:car_body+"",
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Select style={{ width: '100%' }}
                    >
                      {
                        bodycaroptions.map(function (item,index) {
                          return <Option value={item.id} key={index}>{item.car_num}</Option>
                        })
                      }
                    </Select>
                  )}

                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={11}>
                <div>卸车时间</div>
                <Row style={{marginTop:'3px'}}>
                  <Col span={24}>
                    <FormItem
                      {...formItemLayout}
                    >
                      {getFieldDecorator('end_date', {
                        initialValue: moment(end_date, dateFormat),
                        rules: [{ required: true, message: '该选项为必填项' }],
                      })(
                        <DatePicker
                          placeholder=""
                          style={{width:'100%'}} />

                      )}
                    </FormItem>
                  </Col>
                  <Col span={2}></Col>

                </Row>
              </Col>
            </Row>
            <Row gutter={8} >
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="司押员">
                  {getFieldDecorator('driver1', {
                    initialValue:driver1+"",
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <Select style={{ width: '100%' }}
                    >
                      {
                        driveroptions.map(function (item,index) {
                          return <Option value={item.id} key={index}>{item.driver_name}</Option>
                        })
                      }
                    </Select>
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
AddCar = createForm()(AddCar);
export default AddCar;
