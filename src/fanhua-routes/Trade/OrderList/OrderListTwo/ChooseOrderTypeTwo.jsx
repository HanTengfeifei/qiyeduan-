import React from 'react';
import { Row, Col, Tabs,Select,Form,Button,Radio  } from 'antd';
import {RequireUtils} from 'utils';
import createHistory from 'history/createHashHistory';
import mystyle from '../tabstyle.less' ;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

/**
 * 关闭页面
 */
function onCancel() {
  this.props.cancelOrderMark() ;
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
    console.log(err) ;
    if (err) {
    }else{
      var my_type = values['order_type'] ;
      this.setState({
        loading:false
      }) ;
      if(my_type==1){
        createHistory().push({
          pathname: '/offlineaddorder/'
        })
      }
      if(my_type==2){
        createHistory().push({
          pathname: '/offlinecgaddorder/'
        })
      }
    }
  });
}
class ChooseOrderType extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const _this = this ;
    const {} = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <Row gutter={8} >
              <Col span={11}>
                <FormItem
                  {...formItemLayout}
                  label="">
                  {getFieldDecorator('order_type', {
                    initialValue:'1',
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <RadioGroup>
                      <Radio value="1">线下销售订单</Radio>
                      <Radio value="2">线下采购订单</Radio>
                    </RadioGroup>
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
ChooseOrderType = createForm()(ChooseOrderType);
export default ChooseOrderType;
