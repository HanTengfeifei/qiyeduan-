import React from 'react';
import { Row, Col,Select,Form,Input,DatePicker,Button,Icon,Radio,Table,Checkbox,message  } from 'antd';
import moment from 'moment';
import {RequireUtils} from 'utils';
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;
const { TextArea } = Input;

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
  this.props.handleExCancel() ;
  this.props.form.resetFields();
}

/**
 * 新增或者删除
 * @param type
 */
function submit(e,id) {
  this.setState({
    loading:true
  }) ;
var _this = this ;
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    console.log(err) ;
    if (err) {
      this.setState({
        loading:false
      }) ;
    }else{
      var form = this.state.form ;
      form.id = id ;
      RequireUtils.baseRequire('order-deliver/except-close',form,function (data) {
        if (data.code)
        {
          message.success(data.msg);
          this.setState({
            loading:false
          }) ;
          this.props.go() ;
          this.props.handleExCancel() ;
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
      checked:false,
      form:{
        car_memo:"",
        free_flag:1
      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {
  }
  onCheckChange = (e) => {
    var value = e.target.checked ;
    var flag = 1 ;
    if(value){
      flag = 0 ;
    }
    var form = this.state.form ;
    form.free_flag = flag ;
    this.setState({
      checked: e.target.checked,
      form:form
    });
  };

  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const { getFieldDecorator } = this.props.form;
    const {item} = this.props ;
    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <p>异常关闭后，该出车单将释放已经装载的货品数量回到运单中。</p>
            <p>如果货品已经装车，该车默认将直接被并入重车区。</p>
            <p>已经完成卸车单仍然可以异常关闭</p>
            <Row>
              <Col span={24}>
                <FormItem
                  {...formItemLayout}
                  label="">
                  {getFieldDecorator('car_memo', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }]
                  })(
                    <TextArea onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                     onChange={(e) => valueChange.bind(this)('car_memo', e.target.value)}
                    autoComplete="off" autosize={{ minRows: 2, maxRows: 6 }} />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} >
              <Col span={18}>
                <FormItem
                  {...formItemLayout}
                  label=""
                >
                  {getFieldDecorator('free_flag',{
                    initialValue:''
                  })(
                    <Checkbox
                      checked={this.state.checked}
                      onChange={this.onCheckChange}
                    >
                      该车不被归入重车区
                    </Checkbox>

                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
            </Row>
            <Row style={{marginTop:'10px'}}>
              <Col style={{textAlign:'right'}}>
                <Button onClick={onCancel.bind(this)} style={{marginRight:'10px'}} >取消</Button>
                <Button type="primary" loading={this.state.loading} onClick={(e)=>submit.bind(this)(e,item.id)}>提交</Button>
              </Col>
            </Row>
          </Form>
        </main>
      </div>
    )
  }
}
AddCar = createForm()(AddCar);
export default AddCar;
