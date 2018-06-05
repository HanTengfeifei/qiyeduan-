import React from 'react';
import {Calendar, Badge,Icon,Radio, Button,Input,Switch,Row,Col,Tooltip} from 'antd';
import {RequireUtils} from 'utils';
import mystyle from './tabstyle.less' ;
import mycalendar from './mycalendar.less' ;
import {message} from "antd/lib/index";
const RadioGroup = Radio.Group;
const editable=[];
class MerchandiseCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      all:[],
      price_date:[],
      month_day_moneys:{},
      year:"",
      month:"",
      defaultButton:1
    } ;
    this.callback = this.callback.bind(this);
    this.dateCellRender=this.dateCellRender.bind(this);
    this.onPanelChange=this.onPanelChange.bind(this);
    this.pushPrice=this.pushPrice.bind(this);
  }

  pushPrice(value) {
    const newAll = [...this.state.price_date];
    const target = newAll.filter(item => value.goods_date === item.goods_date)[0];
    if (target) {
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
        price_date:newAll
      });
    }
  }
  onPanelChange(value,mode){
    var year = value.format("YYYY") ;
    var month = Number(value.format('MM')) ;
    var myid = this.props.myid ;
    RequireUtils.baseRequire('goods/goods-info',{id:myid,year:year,month:month},function (data){
      if(data.code==1) {
        var price_date = data.data.price_date ;
        var defaulstatus = data.data.goods.status ;
        const {month_day_moneys} = this.state ;
        for(var i = 1;i<32;i++){
          var my_date = year +"-" + (month<10?"0"+month:month) + "-" + (i<10?"0"+i:i) ;
          month_day_moneys[my_date] = {} ;
          var currentNum = this.getPriceNum(my_date,price_date).num ;
          if(currentNum<0){
            month_day_moneys[my_date].status  = defaulstatus ;
            month_day_moneys[my_date].goods_date = my_date ;
            month_day_moneys[my_date].goods_price = "" ;
          }else{
            month_day_moneys[my_date].status  = this.getPriceNum(my_date,price_date).flag?price_date[currentNum].status:defaulstatus ;
            month_day_moneys[my_date].goods_date = my_date ;
            month_day_moneys[my_date].goods_price = price_date[currentNum]?price_date[currentNum].goods_price:'';
          }
        }
        this.setState({
          month_day_moneys:{...month_day_moneys},
          year:year,
          month:month
        })
      }else{
        this.setState({
          month_day_moneys:{},
          year:year,
          month:month
        });
      }
    }.bind(this));
  }

  getPriceNum(my_c_date,price_date){
    var num = "" ;
    var falg = false ;
      for(var m=0;m<price_date.length;m++){
        if(my_c_date<price_date[m].goods_date){
            num = m-1 ;
         break ;
        }else{
          if(my_c_date==price_date[m].goods_date){
            falg = true ;
          }
          if(price_date.length-1==m){
            num = m ;
            break ;
          }
        }
      }
      return {num:num,flag:falg} ;
  }

  componentDidMount(){
    var current = new Date() ;
    var currentYear = current.getFullYear() ;
    var currentMonth = current.getMonth()+1;
    // const {currentNum,month_day_moneys} = this.state ;
    this.setState({
      year:currentYear ,
      month:currentMonth
    }) ;
    var myid = this.props.myid ;
    RequireUtils.baseRequire('goods/goods-info',{id:myid,year:currentYear,month:currentMonth},function (data){
      if(data.code==1) {
        var defaulstatus = data.data.goods.status ;
        var price_date = data.data.price_date ;
        const {month_day_moneys} = this.state ;
        for(var i = 1;i<32;i++){
          var my_date = currentYear +"-" + (currentMonth<10?"0"+currentMonth:currentMonth) + "-" + (i<10?"0"+i:i) ;
          month_day_moneys[my_date] = {} ;
         var currentNum = this.getPriceNum(my_date,price_date).num ;
          if(currentNum<0){
            month_day_moneys[my_date].status  = defaulstatus ;
            month_day_moneys[my_date].goods_date = my_date ;
            month_day_moneys[my_date].goods_price = "" ;
          }else{
            month_day_moneys[my_date].status  = this.getPriceNum(my_date,price_date).flag?price_date[currentNum].status:defaulstatus ;
            month_day_moneys[my_date].goods_date = my_date ;
            month_day_moneys[my_date].goods_price = price_date[currentNum]?price_date[currentNum].goods_price:'';
          }
        }
        this.setState({
          month_day_moneys:{...month_day_moneys},
          year:currentYear,
          month:currentMonth
        })
      }
      else{
        this.setState({
          month_day_moneys: {},
          year:currentYear,
          month:currentMonth
        });
      }
    }.bind(this));
    this.props.onRef2(this);
  }


  dateCellRender(value) {
    const {month_day_moneys} = this.state ;
    const sing_goods = month_day_moneys[value.format("YYYY-MM-DD")] ;
      if(sing_goods){
        return (<EditableCell go={this.props.go}  pthis={this}  isChecked={sing_goods.status} info={sing_goods.goods_price}  value={value} />)
      }else{
        return <EditableCell  go={this.props.go} info={""} pthis = {this} isChecked={0}  value={value}/>
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
          <span> 选择自动发布后当天若没有商品价格系统将自动参照最近一天的价格</span>
          <div style={{color:'red'}}>红色价格表示已上架</div>
        </div>
        <Calendar  dateCellRender={this.dateCellRender} onPanelChange={this.onPanelChange}/>
      </div>
    )
  }
}

class EditableCell extends React.Component {
  constructor(props) {
    super(props);
    this.firstEnter=true ;
    this.state = {
      editable:false,
      value:null,
      checked:1,
      allValue:{}
    } ;

    this.onChange=this.onChange.bind(this);
    this.switch=this.switch.bind(this);
    this.save=this.save.bind(this);
    this.onSwitch=this.onSwitch.bind(this);
  }

  switch(e){
    e.preventDefault() ;
    e.stopPropagation() ;
    const tagname = e.target.tagName ;
    if(this.state.editable){
      const obj={};
      obj.goods_date=this.props.value.format('YYYY-MM-DD');
      obj.goods_price= this.state.value;
      obj.status=this.state.checked;

      if(tagname=='BUTTON'||tagname=='INPUT'||tagname=="SPAN"){
        this.setState({
          editable:true,
          allvalue:obj,
        }) ;
      }else{
        this.setState({
          editable:false,
          allvalue:obj,
        }) ;
      }
    }else{
      this.setState({
        editable:!this.state.editable
      })
    }
  }

  save(){

  }

  componentDidMount(){
  }

  onSwitch(checked,date,pthis) {

    var mydate = date.format("YYYY-MM-DD") ;
    const {month_day_moneys} = pthis.state ;
    const obj =  month_day_moneys[mydate] ;
    const {all} = pthis.state ;
    if (checked === false) {
      obj.status = 1 ;
      // this.setState({
      //   checked: 1
      // });
      pthis.setState({
        month_day_moneys:month_day_moneys,
        all:[...all,obj]
      })
    }
    else {
      obj.status = 0 ;
      // this.setState({
      //   checked: 0
      // });
      pthis.setState({
        month_day_moneys:month_day_moneys,
        all:[...all,obj]
      })
    }
  }


  onChange(value,date,pthis){
    var mydate = date.format("YYYY-MM-DD") ;
    const {month_day_moneys} = pthis.state ;
    month_day_moneys[mydate].goods_price = value ;
    const obj =  month_day_moneys[mydate] ;
    const {all} = pthis.state ;
    pthis.setState({
      month_day_moneys:month_day_moneys,
      all:[...all,obj]
    })
  }

  render() {
    var {editable}=this.state;
    const {info,pthis,value,isChecked,len} = this.props;
    return(
      <div  onClick={(e)=>this.switch(e)} style={{height:'100%'}} className={"uuuuuuuuuuuuuuuuuu"}>
        {editable
          ? <div>
            <Row>
              <Col span={12}>
                <Tooltip title="输入商品价格">
                  <Input style={{margin: '5px 0'}} value={info} onChange={e => this.onChange(e.target.value,value,pthis)}/>
                </Tooltip>
              </Col>
              <Col span={2}>
              </Col>
              <Col span={10}>
                <Tooltip title="商品上下架控制开关">
                  <Switch  style={{margin: '15px 0'}} size="small"   checked={isChecked==0?true:false} onChange={(checked)=>this.onSwitch(checked,value,pthis)} />
                </Tooltip>
              </Col>
            </Row>
            {/*<Row>*/}
              {/*<Button type="primary" ghost onClick={this.save} >save</Button>*/}
            {/*</Row>*/}
          </div>
          : <div >
              <div style={{color:isChecked==0?'red':'rgba(117, 113, 113, 0.65)'}}>{info}</div>
              <div  style={{}}> </div>
           </div>
        }
      </div>
    )
  }
}
export default MerchandiseCalendar;

// padding:"0,0" , margin: '-5px 0',width:88 ,height:116
