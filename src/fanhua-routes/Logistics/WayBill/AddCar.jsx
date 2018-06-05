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
 * 根据选择不同的车队获取不同的内容
 */
function getAddCarContents() {
  const {pthis} = this.props ;
   var type = pthis.state.default_car_type ;
  // var type = default_car_type;
  const formItemLayout = {
    labelCol: { span: 24 },
    wrapperCol: { span: 24 }
  };
  const columns = [{
    title: '车头',
    dataIndex: 'head_card',
    key: 'head_card'
  }, {
    title: '车挂',
    dataIndex: 'body_card',
    key: 'body_card',
  },{
    title: '司机',
    dataIndex: 'driver_name',
    key: 'driver_name',
  },{
    title: '商品',
    dataIndex: 'prod_name',
    key: 'prod_name',
  },{
    title: '装车日期',
    dataIndex: 'start_date',
    key: 'start_date',
  },{
    title: '未分配量',
    dataIndex: 'send_num',
    key: 'send_num'
  }];

  const { getFieldDecorator } = this.props.form;
  const {companyoptions,headcaroptions,bodycaroptions,driveroptions,heavycarsData} = this.state ;
  var str = '' ;
  switch(type)
  {
    case "0":  //自有车队 ;
      str = <div>
        <Row gutter={8} >
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="车头车牌">
              {getFieldDecorator('car_head', {
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('car_head',value)}
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
            <FormItem
              {...formItemLayout}
              label="运载量">
              {getFieldDecorator('load_num', {
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Input
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off"
                  onChange={(e) => valueChange.bind(this)('load_num', e.target.value)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="车挂车牌">
              {getFieldDecorator('car_body', {
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('car_body',value)}
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
            <Row style={{marginTop:'3px'}}>
              <Col span={24}>
                <FormItem
                  label="装车时间"
                  {...formItemLayout}
                >
                  {getFieldDecorator('start_date', {
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <DatePicker
                      placeholder=""
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={true}
                      onChange={(date,dateString) => valueChange.bind(this)('start_date', dateString)}
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
              label="司押员">
              {getFieldDecorator('driver1', {
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('driver1',value)}
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

          <Col span={2}>
          </Col>
          <Col span={11}>
            <Row style={{marginTop:'3px'}}>
              <Col span={24}>
                <FormItem
                  label="卸车时间"
                  {...formItemLayout}
                >
                  {getFieldDecorator('end_date', {
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <DatePicker
                      placeholder=""
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={true}
                      onChange={(date,dateString) => valueChange.bind(this)('end_date', dateString)}
                      style={{width:'100%'}} />

                  )}
                </FormItem>
              </Col>
              <Col span={2}></Col>

            </Row>
          </Col>
        </Row>
      </div>
      break;
    case "1": //承运商
      str = <div>
        <Row gutter={8} >
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="承运商">
              {getFieldDecorator('saler_id', {
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }],
              })(
                <Select style={{ width: '100%' }}
                        onSelect={(value)=>buyValueChange.bind(this)('',value)}
                        onChange={(value)=>valueChange.bind(this)('saler_id',value)}
                >
                    {
                        companyoptions.map(function (item,index) {
                          return <Option value={item.id} key={index}>{item.company_name}</Option>
                        })
                      }
                </Select>
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
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Input
                  onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                  autoComplete="off"
                  onChange={(e) => valueChange.bind(this)('load_num', e.target.value)}
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
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('car_head',value)}
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
            <Row style={{marginTop:'3px'}}>
              <Col span={24}>
                <FormItem
                  label="装车时间"
                  {...formItemLayout}
                >
                  {getFieldDecorator('start_date', {
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <DatePicker
                      placeholder=""
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={true}
                      onChange={(date,dateString) => valueChange.bind(this)('start_date', dateString)}
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
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('car_body',value)}
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
            <Row style={{marginTop:'3px'}}>
              <Col span={24}>
                <FormItem
                  label="卸车时间"
                  {...formItemLayout}
                >
                  {getFieldDecorator('end_date', {
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <DatePicker
                      placeholder=""
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={true}
                      onChange={(date,dateString) => valueChange.bind(this)('end_date', dateString)}
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
                initialValue:'',
                rules: [{ required: true, message: '该选项为必填项' }]
              })(
                <Select style={{ width: '100%' }}
                        onChange={(value)=>valueChange.bind(this)('driver1',value)}
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
      </div>;
      break;
    default: //重车  默认
      const {pthis} = this.props ;
      const {load_num,car_head,car_body,driver1,start_date} = pthis.state.tableselectrecord ;
      var {freeselectData} = this.props ;
      const dateFormat = 'YYYY-MM-DD';
      const startdateopt = start_date? {
        initialValue: moment(start_date, dateFormat),
      }:{} ;
      str = <div>
        <div className={'my-table-title-center'}>
          <Table
            columns={columns}
            dataSource={freeselectData}
            pagination={{position:'none'}}
            rowSelection={{type:'radio',onSelect:this.tableSelecet.bind(this)}}
            type={'radio'}
            loading={false}
          />
        </div >
        <Row gutter={8} >
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="车头车牌">
              {getFieldDecorator('car_head', {
                initialValue:car_head,
                rules: [{ required: true, message: '该选项为必填项' }]
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
                  onChange={(e) => valueChange.bind(this)('load_num', e.target.value)}
                />
              )}
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <FormItem
              {...formItemLayout}
              label="车挂车牌">
              {getFieldDecorator('car_body', {
                initialValue:car_body
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
            <Row style={{marginTop:'3px'}}>
              <Col span={24}>
                <FormItem
                  label="装车时间"
                  {...formItemLayout}
                >
                  {getFieldDecorator('start_date', startdateopt)(
                    <DatePicker
                      placeholder=""
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={true}
                      disabled={true}
                      onChange={(date,dateString) => valueChange.bind(this)('start_date', dateString)}
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
              label="司押员">
              {getFieldDecorator('driver1', {
                initialValue:driver1,
                rules: [{ required: true, message: '该选项为必填项' }]
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
            <Row style={{marginTop:'3px'}}>
              <Col span={24}>
                <FormItem
                  {...formItemLayout}
                  label="卸车时间"
                >
                  {getFieldDecorator('end_date', {
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <DatePicker
                      placeholder=""
                      format="YYYY-MM-DD HH:mm:ss"
                      showTime={true}
                      onChange={(date,dateString) => valueChange.bind(this)('end_date', dateString)}
                      style={{width:'100%'}} />

                  )}
                </FormItem>
              </Col>
              <Col span={2}></Col>

            </Row>
          </Col>
        </Row>
      </div>
      break ;
  }
  return str ;
}

/**
 * input值发生更改时值也及时发生改变
 * @param name
 * @param value
 */
function valueChange(name,value) {
  const {pthis} = this.props ;
  var {tableselectrecord} = pthis.state ;
  tableselectrecord[name] = value ;
  pthis.setState({
    tableselectrecord:tableselectrecord
  })
}

function cleardata() {
  const {pthis} = this.props ;
  pthis.setState({
    tableselectrecord:{
      car_head:"",
      car_body:"",
      load_num:"",
      driver1:"",
      start_date:"",
      end_date:""
    }
  });
}
/**
 * 关闭页面
 */
function onCancel() {
  this.props.handleAddCancel() ;
  cleardata.bind(this)() ;
  this.props.form.resetFields();
  const {pthis} = this.props ;
  pthis.setState({
    default_car_type:2
  })
}

/**
 * 新增或者删除
 * @param type
 */
function submit(e) {
  this.setState({
    loading:true
  }) ;
  const {pthis} = this.props ;
  var car_type = pthis.state.default_car_type ;
  var url = "" ;
  if(car_type==0||car_type==1){
    url = "order-deliver/add-car" ;
  }else{
    url = "order-deliver/add-free" ;
  }

  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (err) {
      this.setState({
        loading:false
      }) ;
    }else{
      var form = {
        car_type:values['car_type'],
        car_head:values['car_head'],
        car_body:values['car_body'],
        load_num:values['load_num'],
        driver1:values['driver1'],
        start_date:values['start_date'].format('YYYY-MM-DD'),
        end_date:values['end_date'].format('YYYY-MM-DD')
      } ;
      var {yundanid} = this.props ;
      form.deliver_id = yundanid ;
      if(car_type==2){
          var heavid = this.state.heavyid ;
          form.free_id = heavid ;
      }
      RequireUtils.baseRequire(url,form,function (data) {
        if (data.code)
        {
          message.success(data.msg);
          cleardata.bind(this)() ;
          this.props.go() ;
          this.props.handleAddCancel() ;
          this.setState({
            loading:false,
          }) ;
          pthis.setState({
            default_car_type:2
          }) ;
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
/**
 * 采购方发生改变时 合同和接受场站也发生改变
 * @param name
 * @param value
 */
function buyValueChange(name,value){
  var _this = this ;
  RequireUtils.baseRequire("order-deliver/car-select",{chengyun_id:value},function (data) {
    if(data.code==1) {
      var list = data.data.list ;
      _this.setState({
        headcaroptions:list.head,
        bodycaroptions:list.body,
        driveroptions:list.driver
      });
    }else{
      this.setState({update:true})
    }
  }.bind(this))
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
      heavycarsData:[],
      form:{
        car_head:"",
        car_body:"",
        load_num:"",
        driver1:"",
        start_date:"",
        end_date:""
      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {
    var _this = this ;
    RequireUtils.baseRequire('/order-deliver/company-select',{},function (data) {
      if(data.code==1) {
        var list = data.data.list ;
        this.setState({
          companyoptions:list
        });
      }else{
        alert(data.msg);
      }
    }.bind(this));
    RequireUtils.baseRequire('order-deliver/free-select',{},function (data) {
      if(data.code==1) {
        var list = data.data.list ;
        var nlist = list.map(function (item,index) {
            item.key = index ;
            return item ;
        }) ;
        this.setState({
          heavycarsData:nlist
        });
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
  onRadioChange = (e) => {
    var _this = this ;
    const {pthis} = _this.props ;
    var form = {
        car_head:"",
        car_body:"",
        load_num:"",
        driver1:"",
        start_date:"",
        end_date:""
    };
    this.props.form.resetFields();
    var car_type = e.target.value ;
    if(car_type!=1){
      RequireUtils.baseRequire("order-deliver/car-select",{},function (data) {
        if(data.code==1) {
          var list = data.data.list ;
          _this.setState({
            headcaroptions:list.head,
            bodycaroptions:list.body,
            driveroptions:list.driver
          });
          pthis.setState({
            default_car_type:car_type,
            tableselectrecord:form
          }) ;
        }else{
          this.setState({
            update:true
          }) ;
          pthis.setState({
            default_car_type:car_type,
            tableselectrecord:form
          }) ;
        }
      }.bind(this))
    }else{
      // this.setState({
      //   form: form
      // }) ;
      pthis.setState({
        default_car_type:car_type,
        tableselectrecord:form
      });
    }
  };

  tableSelecet(record){
    const {pthis} = this.props;
    this.setState({
      heavyid:record.id
    }) ;
    pthis.setState({
      tableselectrecord:{
        start_date:record.start_date,
        car_head:record.head_card,
        car_body:record.body_card,
        load_num:record.send_num,
        driver1:record.driver_name
      }
    })
  }

  render() {
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const { getFieldDecorator } = this.props.form;

    const addCarContent = getAddCarContents.bind(this)() ;

    const {loading} = this.state ;


    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <Row gutter={8} >
              <Col span={18}>
                <FormItem
                  {...formItemLayout}
                  label=""
                >
                  {getFieldDecorator('car_type',{
                    initialValue:'2'
                  })(
                    <RadioGroup onChange={this.onRadioChange}>
                      <Radio value="2">选择重车</Radio>
                      <Radio value="1">承运商车队</Radio>
                      <Radio value="0">自有车队</Radio>
                    </RadioGroup>
                  )}
                </FormItem>
              </Col>
              <Col span={2}>
              </Col>
            </Row>
            {addCarContent}
            <Row style={{marginTop:'10px'}}>
              <Col style={{textAlign:'right'}}>
                <Button onClick={onCancel.bind(this)} style={{marginRight:'10px'}} >取消</Button>
                <Button type="primary" loading={loading} onClick={(e)=>submit.bind(this)(e)}>确定</Button>
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
