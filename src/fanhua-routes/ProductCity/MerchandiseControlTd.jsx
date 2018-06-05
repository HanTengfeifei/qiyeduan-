import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Divider } from 'antd';
import mystyle from './tabstyle.less' ;
import { Link } from 'dva/router';
import './MerchandiseControlTd.less';
import createHistory from 'history/createHashHistory';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MerchandiseControlTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status:true,
    };
    this.callback = this.callback.bind(this);
    this.onChange= this.onChange.bind(this);
    this.skit= this.skit.bind(this);
    this.onMouseEnter= this.onMouseEnter.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }
  callback(key) {
    console.log(key);
  }
  skit(){
    createHistory().push({
      // pathname: '/EditMerchandiseControl/?id='+this.props.item.id,
      pathname: '/ProductCityOrder/?id='+this.props.item.goodsId,
    })
  }
onChange(){
this.setState({
  status:!this.state.status,
})
}
onMouseEnter(e){
    e.target.type="primary"
}
  render() {
    const {item,text}=this.props;
    return (
      <div style={{fontSize:10}} >
          <Row className={'table-other-line shop-card-line'} type="flex" align="middle">
            <Col span={11}  >
               <div style={{paddingLeft:'36px'}}>
                  <p className={"huanHang"}>
                <span style={{fontFamily: 'PingFangSC-Regular',fontSize:'16px',color:'#6C6C6C'}} className={'mark-vertical'}>{item.goodsName}</span>
                <span  className={"huanHang"} style={{fontSize:14,fontFamily: 'PingFangSC-Regular',color:'#9B9B9B'}}>供应商&nbsp;&nbsp;{item.companyName}</span>
              </p>
                  <p style={{padding:'8px 0',fontSize:'14px',fontFamily: 'PingFangSC-Regular','color':'#9B9B9B'}}>
                <span>{parseInt(item.weight)}</span><span >吨</span>
              </p>
                  <p style={{fontSize:14,color:'#9B9B9B'}}><span><Icon type="environment-o" /></span><span>{item.addrCity}{item.addrCounty}{item.addrDetail}</span></p>
               </div>
            </Col>

            <Col span={9} style={{color:"#FF6913",fontSize:'14px' ,textAlign:"right"}}>
              <div style={{padding:'3px'}}>
                <div className={"shop-price-show"}>
                  <p>
                    {item.priceUpDown? <span ><Icon type="arrow-up" /></span>: <span><Icon type="arrow-down" /></span> }&nbsp;
                    <span>{item.percent}</span>&nbsp;&nbsp;
                    ￥<span style={{fontSize:30,marginLeft:"1%"}}>{item.price}</span>
                    <span style={{display:'inline-block',width:'20px',textAlign:'center',fontSize:'12px'}}>
                      <span style={{borderBottom:'1px solid ',paddingBottom:'2px'}}>元</span>
                      <span>吨</span>
                    </span>
                  </p>
                  <p><span style={{color:"#FF6913",marginLeft:'10%',fontSize:'14px'}}>{item.payType}</span></p>
                </div>
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-customer-table-title'} onClick={this.skit}>
                <Button type="primary" onMouseEnter={this.onMouseEnter}  size="small" ghost>&nbsp;&nbsp;&nbsp;下&nbsp;单&nbsp;&nbsp;&nbsp;</Button>

              </div>
            </Col>
          </Row>
      </div >
    )
  }
}
export default MerchandiseControlTd;
