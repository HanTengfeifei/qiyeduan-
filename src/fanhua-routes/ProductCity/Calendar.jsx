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
      price_date:[],
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
    this.props.onRef2(this);}
  componentWillMount() {
    this.setState({
      all:this.props.price_date,
    })
  }
  dateCellRender(value) {
    const price_date=this.props.price_date;
console.log(price_date);
    if (value.format("YYYY-MM-DD").replace(/-/g,"/") <price_date[0].goods_date.replace(/-/g,"/")) {
      return (<EditableCell   info={""}  pushPrice={this.pushPrice}   value={value} />);
    }
    if (value.format("YYYY-MM-DD").replace(/-/g,"/") >= price_date[price_date.length -1].goods_date.replace(/-/g,"/")) {
      return (<EditableCell   info={price_date[price_date.length -1 ].goods_price}   pushPrice={this.pushPrice}   value={value} />);
    }
    else {
      for (var i = 1; i <= price_date.length - 1; i++) {
        if (price_date[i - 1].goods_date.replace(/-/g, "/") <= value.format("YYYY-MM-DD").replace(/-/g, "/") && value.format("YYYY-MM-DD").replace(/-/g, "/") < price_date[i].goods_date.replace(/-/g, "/")) {
          return (<EditableCell info={price_date[i - 1].goods_price} pushPrice={this.pushPrice} value={value}/>);
        }
      }
    }

  }
  callback(key) {
    console.log(key);
  }
  render() {
    return (
      <div style={{padding:'10px'}}>
        <div>
          {/*<Icon type="calendar" style={{fontSize:'18px',marginRight:'15px',color:'#ff8f00'}}/>*/}

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
      checked:1,
      allValue:{},
    }
    this.onChange=this.onChange.bind(this);
    this.switch=this.switch.bind(this);
    this.save=this.save.bind(this);
    this.onSwitch=this.onSwitch.bind(this);
  }
  componentWillMount(){
    this.setState({
      value:this.props.info
    });
  }
  componentDidMount(){
   console.log(this.state.value);
  }
  switch(){
    this.setState({
      editable:!this.state.editable,
    })
  }
  save(){
    const obj={};
    obj.goods_date=this.props.value.format('YYYY-MM-DD');
    obj.goods_price=this.state.value;
    obj.status=this.state.checked;
    this.setState({
      editable:false,
      allvalue:obj,
    })
    this.props.pushPrice(obj);
  }
  onSwitch(checked) {
    if (checked === false) {
      this.setState({
        checked: 0,
      });
    }
    else {
      this.setState({
        checked: 1,
      });
    }
  }
  onChange(value){
    this.setState({
      value:value,
    });
  }
  render() {
    const {editable,value}=this.state;
    return(
      <div>
        {/*{editable*/}
          {/*? <div>*/}
            {/*<Row>*/}
              {/*<Col span={12}>*/}
                {/*<Tooltip title="输入商品价格">*/}
                  {/*<Input style={{margin: '5px 0'}} value={value} onChange={e => this.onChange(e.target.value)}/>*/}
                {/*</Tooltip>*/}
              {/*</Col>*/}
              {/*<Col span={2}>*/}
              {/*</Col>*/}
              {/*<Col span={10}>*/}
                {/*<Tooltip title="商品上下架控制开关">*/}
                  {/*<Switch  style={{margin: '15px 0'}} size="small"   defaultChecked onChange={this.onSwitch} />*/}
                {/*</Tooltip>*/}
              {/*</Col>*/}
            {/*</Row>*/}
            {/*<Row>*/}
              {/*<Button type="primary" ghost onClick={this.save} >save</Button>*/}
            {/*</Row>*/}
          {/*</div>*/}
           <div><div style={{color:'red' ,textAlign:'center',marginTop:20}}><Icon type="pay-circle-o"/>{this.props.info}</div>
            {/*<div  style={{ padding:"0,0" , margin: '-5px 0',width:88 ,height:116}} onClick={this.switch}> </div>*/}
          </div>

      </div>
    )
  }
}
export default MerchandiseCalendar;
