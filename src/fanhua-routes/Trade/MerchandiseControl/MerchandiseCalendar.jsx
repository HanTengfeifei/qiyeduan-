import React from 'react';
import {Calendar, Badge,Icon,Radio, Button,Input,Switch,Row,Col,Tooltip} from 'antd';
import {RequireUtils} from 'utils';
import mystyle from './tabstyle.less' ;
import mycalendar from './mycalendar.less' ;
const RadioGroup = Radio.Group;
const editable=[];
class MerchandiseCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      all:[],
    }
    this.callback = this.callback.bind(this);
    this.dateCellRender=this.dateCellRender.bind(this);
   this.onPanelChange=this.onPanelChange.bind(this);
   // this.onSelect=this.onSelect.bind(this);
   this.pushPrice=this.pushPrice.bind(this);
  }
  pushPrice(value) {
    console.log(value);
    const newAll = [...this.state.all];
    const target = newAll.filter(item => value.goods_date === item.goods_date)[0];
    if (target) {
      console.log(value.value);
      target.goods_price = value.goods_price;
      target.status = value.status;
      this.setState({
          ... newAll,
        target,
      })
    }
    else {
      newAll.push(value);
      this.setState({
        all: newAll,
      });

    }
  }
  onPanelChange(value,mode){
console.log(value);
  }
  componentDidMount(){
    this.props.onRef2(this);
  }
  dateCellRender(value) {
    return (<EditableCell pushPrice={this.pushPrice}    value={value} />);
}
  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <div style={{padding:'10px'}}>
        <div>
          <Icon type="calendar" style={{fontSize:'18px',marginRight:'15px',color:'#ff8f00'}}/>
          <RadioGroup defaultValue={1}>
            <Radio value={1}></Radio>
          </RadioGroup>选择自动发布后当天若没有商品价格系统将自动参照最近一天的价格
        </div>
        <Calendar dateCellRender={this.dateCellRender}  />
      </div >
    )
  }
}
class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editable:false,
      value:null,
      checked:true,
      allValue:{},

    }
    this.onChange=this.onChange.bind(this);
    this.switch=this.switch.bind(this);
    this.save=this.save.bind(this);
    this.onSwitch=this.onSwitch.bind(this);
  }
  componentDidMount(){

  }
  // componentWillReceiveProps(){
  //   this.setState({
  //     checked:this.props.status,
  //   })
  // }
switch(){
    this.setState({
      editable:true,
    })
}
save(){
  const obj={};
  obj.goods_date=this.props.value.format('YYYY-MM-DD');
  obj.goods_price=this.state.value;
  obj.status=this.state.checked? "0":"1";
  this.setState({
    editable:false,
    allvalue:obj
  })
  console.log(obj);
  this.props.pushPrice(obj);


}
onSwitch(checked) {
    this.setState({
      checked: checked,
    });
}
  onChange(value){
this.setState({
  value:value,
});
  }
  render() {
    const {editable,value,checked}=this.state;
    return(
      <div>
        {editable
          ? <div>
            <Row>
              <Col span={12}>
                <Tooltip title="输入商品价格">
                  <Input style={{margin: '5px 0'}} value={value} onChange={e => this.onChange(e.target.value)}/>
              </Tooltip>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={10}>
                <Tooltip title="商品上下架控制开关">
                  <Switch  style={{margin: '15px 0'}} size="small"   checked={checked} onChange={this.onSwitch} />
                </Tooltip>

              </Col>
          </Row>
            <Row>
            <Button type="primary" ghost onClick={this.save} >save</Button>
            </Row>
          </div>
          : <div style={{overflow:'hidden',overflowY:'hidden'}}>
            <div style={{textAlign:"center"}}>{value}</div>
          <div  style={{margin: '-5px 0',width:70 ,height:100}} onClick={this.switch}>
          </div>
          </div>
        }
      </div>
    )
  }
}
export default MerchandiseCalendar;
