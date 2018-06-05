import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button,Cascader } from 'antd';
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
  form['join_id'] = value ;
  this.setState({
    form:form
  })
}

/**
 * 关闭页面
 */
function onCancel() {
  this.props.handleChangeCancel() ;
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
    console.log(err)
    if (err) {
      this.setState({
        loading:false
      }) ;
    }else{
      var form = this.state.form ;
      RequireUtils.baseRequire('person/join-company',form,function (data) {
        if (data.code)
        {
          alert(data.msg);
          this.setState({
            loading:false
          }) ;
          this.props.handleChangeCancel() ;
          window.location.reload() ;
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

class AddFieldStationList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false,
      companyoptions:[],
      form:{
        join_id:"",
      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {
    var _this = this ;
    RequireUtils.baseRequire('/person/company-select',{parent_code :""},function (data) {
      if(data.code==1) {
        var list = data.data.list ;
        this.setState({
          companyoptions:list
        });
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }


  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const {companyoptions} = this.state ;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="变更公司">
                  {getFieldDecorator('addr_contact', {
                    initialValue:'',
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Select style={{ width: '100%' }}
                            onChange={(value)=>valueChange.bind(this)('addr_contact',value)}
                    >
                      {
                        companyoptions.map(function (item,index) {
                          return <Option value={item.id}  key={index}>{item.company_name}</Option>
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
AddFieldStationList = createForm()(AddFieldStationList);
export default AddFieldStationList;
