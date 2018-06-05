import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,message } from 'antd';
import './Center.less';
import {RequireUtils} from 'utils';
import {config} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Center extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      info:{}
    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentDidMount(){

  }
  findRoleAll(){
    var context=this;
    RequireUtils.baseRequire('person/person-info',{},function (data) {
      if(data.code==1) {
        this.setState({
          info:data.data.info
        });
        localStorage.setItem('company_id', data.data.info.company_id);
        console.log(this.state.info);

      }
      else{
        message.error(data.msg);
      }
    }.bind(this));

  }
  render() {
    return (
      {/*<div className={"text"} style={{height:120}}>*/}
        {/*<div className={"items"}>*/}
        {/*<Row gutter={16} style={{ marginTop: '10px'}}>*/}
            {/*<div  className={""}>*/}
           {/*<div  className={"dun1"}>*/}

           {/*</div>*/}
            {/*</div>*/}
          {/*<Col span={}*/}

          {/*>*/}
          {/*<div className={"shadow"}*/}
               {/*// style={{width:300 ,float:"left",marginLeft:20,}}*/}
          {/*>*/}
            {/*<Card style={{ width: "100%" ,height: "140px", }} className={"dun"}>*/}
              {/*<Row gutter={8}>*/}
                {/*<Col span={12} >*/}
                  {/*<img className={"dance"}   src={config.dun} style={{ width: "100%" ,height: "100px",display: "block" }} alt=""/>*/}
                {/*</Col>*/}
                {/*<Col span={12} style={{textAlign:"center", marginTop:45}} >*/}
                  {/*<div><span style={{fontSize:10,color:"white",fontWeight:100}}>今日成交量</span></div>*/}
                  {/*<div><span><Icon  style={{fontSize:20,color:"red", }} type="arrow-up" /></span><span style={{fontSize:15,color:"white",fontWeight:'bold'}}>{parseInt(this.props.sumWeight)}</span> <span style={{fontWeight:'bold'}}>吨</span></div>*/}
                {/*</Col>*/}
              {/*</Row>*/}
            {/*</Card>*/}
          {/*</div>*/}
          {/*</Col>*/}
          {/*</Col>*/}
          {/*<Col span={}*/}
          {/*<Col span={8}>*/}
          {/*<div className={"shadow"}*/}
               {/*// style={{width:300 ,float:"left",marginLeft:20}}*/}
          {/*>*/}
            {/*<Card style={{ width: "100%" ,height: "140px",}} className={"lian"}>*/}
              {/*<Row gutter={8}>*/}
                {/*<Col span={12}>*/}
                {/*<img src=""  className={"dance"} style={{ width: "100%" ,height: "71px",display: "block" }} alt=""/>*/}
                {/*</Col>*/}
                {/*<Col span={12} style={{textAlign:"center",marginTop:45}}>*/}
                 {/*<div> <span  style={{fontSize:10,color:"white",fontWeight:100}}>今日出车量</span></div>*/}
                  {/*<div><span><Icon  style={{fontSize:20,color:"red", marginRight:10}} type="arrow-up" /></span><span style={{fontSize:15,color:"white",fontWeight:'bold'}}>{parseInt(this.props.sumCar)}</span> <span style={{fontWeight:'bold'}}>辆</span></div>*/}
                {/*</Col>*/}
              {/*</Row>*/}
            {/*</Card>*/}
          {/*</div>*/}
          {/*</Col>*/}
          {/*<Col span={}*/}
          {/*<Col span={8}>*/}
          {/*<div  className={"shadow"}*/}
                {/*// style={{width:300 ,float:"left",marginLeft:20}}*/}
          {/*>*/}
            {/*<Card style={{ width: "100%" ,height: "140px",}}  className={"yuan"}>*/}
              {/*<Row gutter={8}>*/}
                {/*<Col span={12}>*/}
                  {/*<img src={config.yuan} className={"dance"} style={{ width: "100%" ,height: "71px",display: "block" }} alt=""/>*/}
                {/*</Col>*/}
                {/*<Col span={12} style={{textAlign:"center",marginTop:45}}>*/}
                  {/*<div><span  style={{fontSize:10,color:"#999",fontWeight:100}}>今日成交均价</span></div>*/}
                 {/*<div><span><Icon  style={{fontSize:20,color:"red", marginRight:10}} type="arrow-up" /></span><span style={{fontSize:15,color:"#c51919",fontWeight:'bold'}}>{parseInt(this.props.sumPrice)}</span> <span style={{fontWeight:'bold'}}>元</span></div>*/}
                {/*</Col>*/}
              {/*</Row>*/}
            {/*</Card>*/}
        {/*</div>*/}
          {/*</Col>*/}
          {/*<Col span={5} >*/}
          {/*</Col>*/}
        {/*</Row>*/}
        // </div>
      // </div>
    )
  }
}
export default Center;
