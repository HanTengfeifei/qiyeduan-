import React from 'react';
import { Row, Col, Tabs,Select,Form,Input,DatePicker,Button,Cascader,message } from 'antd';
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

function changeState() {
  this.setState({
    firstEnter:false
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
  e.preventDefault();
  this.props.form.validateFields((err, values) => {
    if (err) {
    }else{
      var form = this.state.form ;
      var id = this.props.updateData.id ;
      form.id = id ;
      RequireUtils.baseRequire('addr/modify-addr',form,function (data) {
        if (data.code)
        {
          message.success(data.msg);
          this.setState({
            loading:false
          }) ;
          this.props.go() ;
          this.props.handleUpateCancel() ;
          this.props.form.resetFields();
        }else{
          message.error(data.msg) ;
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
    this.firstEnter =true,
    this.state = {
      loading:false,
      linpeopleoptions:[],
      options:[],
      form:{
        id:"",
        addr_contact:"",
        addr_province:"",
        addr_city:"",
        addr_county:"",
        addr_name:"",
        addr_detail:"",
        type_id:""
      }
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  loadData = (selectedOptions) => {
    var reactp = this.props.reactp ;
    changeState.bind(reactp)() ;
    let targetOption = selectedOptions[selectedOptions.length - 1];
    targetOption.loading = true;
    if (targetOption.district_level<=2) {

      RequireUtils.baseRequire('/common/get-district', {parent_code: targetOption.district_code}, function (data) {
        if (data.code == 1) {
          const list = data.data.list.map(function (item) {
            const obj = {
              label: item.district_name,
              value: item.district_name,
              isLeaf: false,
              id: item.id,
              district_code: item.district_code,
              parent_code: item.parent_code,
              district_level: item.district_level
            };
            return obj;
          });
          setTimeout(() => {
            targetOption.loading = false;
            targetOption.children = list;
            this.setState({
              options: [...this.state.options],
            });
          }, 1000);
        }
        else {
          alert(data.msg);
        }
      }.bind(this));

      // load options lazily
    }
    else{
      targetOption.loading = false;
      targetOption.isLeaf=true;
      this.setState({
        options: [...this.state.options,targetOption],
      });
      return;
    }
  };

  onChange = (value, selectedOptions) => {
    var {form} = this.state ;
    var provice = "";
    var city = "" ;
    var county = "" ;
    for(var i = 0;i< selectedOptions.length;i++){
      var selectoption = selectedOptions[i] ;

      if(selectoption.district_level==1){
        provice = selectoption.value ;
        form['addr_province'] = provice ;
        form['addr_city']='' ;
        form['addr_county'] = '' ;
      }
      if(selectoption.district_level==2){
        city = selectoption.value ;
        form['addr_city'] = city ;
        form['addr_county'] = '' ;
      }
      if(selectoption.district_level==3){
        county = selectoption.value ;
        form['addr_county'] = county ;
      }
    }

    this.setState({
      form:form
    });
  };

  componentDidMount() {
    var _this = this ;
    RequireUtils.baseRequire('/common/get-district',{parent_code :""},function (data) {
      if(data.code==1) {
        const list=data.data.list.map(function(item){
          const obj={
            label:item.district_name,
            value:item.district_name,
            isLeaf:false,
            id:item.id,
            district_code:item.district_code,
            parent_code:item.parent_code,
            district_level:item.district_level
          };
          return obj;
        });

        this.setState({
          options:list
        });

      }else{
        alert(data.msg);
      }
    }.bind(this));
    RequireUtils.baseRequire('/addr/user-select',{},function (data) {
      if(data.code==1) {
        var list = data.data.list ;
        this.setState({
          linpeopleoptions:list
        });
      }else{
        alert(data.msg);
      }
    }.bind(this));
  }
   displayRender = (labels, selectedOptions,value) => labels.map((label, i) => {
       const option = selectedOptions[i];
       this.firstEnter = this.props.firstEnter ;
       if(this.firstEnter&&labels.length==1){
          var mvs = value.filter(function (item,index) {
              if(item){
                return item
              }
          }) ;
         var len = mvs.length ;
          var mks = mvs.map(function (item,index) {
            if(item){
              if(len-1==index){
                return item
              }else{
                return item+"/"
              }
            }
          }) ;
          return <span key={option.value}>{mks.join("")} </span>;
       }


     if (i === labels.length - 1) {
       return (
         <span key={option.value}>
              {label}
            </span>
       );
     }
    return <span key={option.value}>{label} / </span>;
  });


  contractFieldStationName(rule, value, callback){
    if(value.length>32){
      callback('不得超过32位!');
    }else{
      callback() ;
    }
  }

  contractFieldStationadress(rule, value, callback){
    if(value.length>50){
      callback('不得超过50位!');
    }else{
      callback() ;
    }
  }

  render() {
    var {updateData} = this.props ;

    this.state.form = updateData ;
    const formItemLayout = {
      labelCol: { span: 24 },
      wrapperCol: { span: 24 }
    };
    const {options,linpeopleoptions} = this.state ;
    const {addr_contact, addr_province, addr_city, addr_county, addr_name, addr_detail, type_id} = this.props.updateData ;
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <Row gutter={8} >
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="场站名称">
                  {getFieldDecorator('addr_name', {
                    initialValue:addr_name?addr_name:"",
                    rules: [
                      { required: true, message: '该选项为必填项' },
                      {
                        validator: this.contractFieldStationName.bind(this),
                      }
                      ]
                  })(
                    <Input
                       onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('addr_name', e.target.value)}
                    />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} >
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="场站类型">
                  {getFieldDecorator('type_id', {
                    initialValue:type_id,
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Select style={{ width: '100%' }}
                            onChange={(value)=>valueChange.bind(this)('type_id',value)}
                    >
                      <Option value="" key={'0'}>--请选择--</Option>
                      <Option value="0" key={'1'}>液厂</Option>
                      <Option value="1" key={'2'}>接收站</Option>
                      <Option value="2" key={'3'}>加气站</Option>
                      <Option value="3" key={'3'}>气化站</Option>
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="联系人">
                  {getFieldDecorator('addr_contact', {
                    initialValue:addr_contact?addr_contact+"":"",
                    rules: [{ required: true, message: '该选项为必填项' }],
                  })(
                    <Select style={{ width: '100%' }}
                            onChange={(value)=>valueChange.bind(this)('addr_contact',value)}
                    >
                      {
                        linpeopleoptions.map(function (item,index) {
                          return <Option value={item.id}  key={index}>{item.user_name}</Option>
                        })
                      }
                    </Select>
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="地址">
                  {getFieldDecorator('pp', {
                    initialValue: [ addr_province,addr_city,addr_county],
                    rules: [{ type: 'array', required: true, message: '该选项为必填项!' }],
                  })(
                    <Cascader options={options}
                              loadData={this.loadData}
                              onChange={this.onChange}
                              displayRender={(labels, selectedOptions)=>this.displayRender(labels, selectedOptions,[ addr_province,addr_city,addr_county])}
                              changeOnSelect />
                  )}
                </FormItem>
              </Col>
            </Row>
            <Row gutter={8} >
              <Col span={12}>
                <FormItem
                  {...formItemLayout}
                  label="详细地址">
                  {getFieldDecorator('addr_detail', {
                    initialValue:addr_detail,
                    rules: [
                      { required: true, message: '该选项为必填项' },
                      {
                        validator: this.contractFieldStationadress.bind(this),
                      }
                      ],
                  })(
                    <Input
                      onContextMenu={noop} onPaste={noop} onCopy={noop} onCut={noop}
                      autoComplete="off"
                      onChange={(e) => valueChange.bind(this)('addr_detail', e.target.value)}
                    />
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
