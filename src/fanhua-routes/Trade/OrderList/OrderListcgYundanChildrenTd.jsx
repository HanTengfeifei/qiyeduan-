import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Modal,Divider,Input  } from 'antd';
import ScZdbdList from './ScZdbdList' ;
import ScxCbdList from './ScxCbdList' ;
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class OrderListYundanChildrenTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sczcbd:false,
      scxcbd:false,
      imgsFiles:[],
      rimgFiles:[]
    };
    this.callback = this.callback.bind(this);
  }
  handleSubmit(e){
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }

  deleteCars(record){
    const {pthis,mykey} = this.props ;
    const yundans = pthis.state.yundans ;
    var target = yundans[mykey] ;
    const cars = target.cars ;
    const cartarget = cars.filter(item => record.key !== item.key);
    yundans[mykey].cars = cartarget ;
    var yundannum = cartarget.length ;
    target.yundannum = yundannum ; //几张出车单
    pthis.setState({
      yundans:yundans
    })
  }

  myinputChange(e,cloumn,record){
    var value = e.target.value ;
    var allgoodsnums = 0 ;
    const {pthis,mykey} = this.props ;
    const yundans =  pthis.state.yundans ;
    const target = yundans[mykey] ;
    const cars = target.cars ;
    const cartarget = cars.filter(item => record.key === item.key)[0];
    if(cartarget){
      if(cloumn=='final_num'){
        cartarget[cloumn] = value?value:0 ;
      }else{
        cartarget[cloumn] = value ;
      }

    }
    if(cloumn=='final_num'){
      for(var i = 0;i<yundans.length;i++){
        var yundan = yundans[i] ;
        var allcars = yundan.cars ;
        var currentnum = 0 ;
        for(var j=0;j<allcars.length;j++){
          var final_num = Number(allcars[j].final_num) ?Number(allcars[j].final_num) : 0;
          allgoodsnums =Number(Number(allgoodsnums) + Number(final_num)) ; //结算单采购量
          currentnum = Number(Number(currentnum) +　Number(final_num))　;//运单结算量
        }
        yundans[i].total = currentnum ;
      } //获取采购量

      const {jiesuanoptions} = pthis.state ;
      const joptions = jiesuanoptions[0] ;
      var gprice = joptions.price?  joptions.price:0;
      var dfee = joptions.deliver_fee?joptions.deliver_fee:0;
      var efee = joptions.extra_fee?joptions.extra_fee:0;
      var money = Number(Number(gprice)*Number(allgoodsnums))+Number(dfee)+Number(efee) ;
      joptions.goods_num = Number(allgoodsnums) ;
      joptions.money = Number(money) ; //获取结算金额
      pthis.setState({
        jiesuanoptions:[joptions],
        yundans:yundans
      })
    }else{
      pthis.setState({
        yundans:yundans
      })
    }
  }

  handleSczcbdCancel(){
    this.setState({
      sczcbd:false
    })
  }

  handleScxcbdCancel(){
    this.setState({
      scxcbd:false
    })
  }


  updateXcbd(item){
    if(item.recv_name){
      this.setState({
        rimgFiles:[{
          uid: new Date().getTime(),
          name: 'xxx.png',
          status: 'done',
          url: item.recv_name,
        }],
        scxcbd:true,
      })
    }else{
      this.setState({
        scxcbd:true,
        rimgFiles:[]
      }) ;
    }
  }

  updateZcbd(item){
    if(item.bill_name){
      this.setState({
        imgsFiles:[{
          uid: new Date().getTime(),
          name: 'xxx.png',
          status: 'done',
          url: item.bill_name,
        }],
        sczcbd:true,
      })

    }else{
      this.setState({
        sczcbd:true,
        imgsFiles:[]
      }) ;
    }
  }

  handleSczcbdCancel(){
    this.setState({
      sczcbd:false
    })
  }

  callback(key) {
    console.log(key);
  }
  render() {
    const {item,go,pthis,mykey}=this.props;
    const {sczcbd,imgsFiles,scxcbd,rimgFiles} = this.state ;
    const _this = this ;
    return (
      <div>
        <div >
          <Row className={'offline-table-other-line'} type="flex" align="middle">
            <Col span={6}>
              <div className={'my-custom-center'}>
                <span style={{width:'100px',marginRight:'5px'}}>车头</span>
                <Input
                  value={item.head_card}
                  onChange={(e)=>this.myinputChange.bind(this)(e,'head_card',item)}
                  style={{width:'60%',
                    display:'inline-block'}}/>
              </div>
            </Col>
            <Col span={6}>
              <div className={'my-custom-center'}>
                <span style={{width:'100px',marginRight:'5px'}}>车挂</span>
                <Input
                  value={item.body_card}
                  onChange={(e)=>this.myinputChange.bind(this)(e,'body_card',item)}
                  style={{width:'60%',display:'inline-block'}}/>
              </div>
            </Col>
            <Col span={6} >
              <div className={'my-custom-center'}>
                <span style={{width:'100px',marginRight:'5px'}}>结算量（吨）</span>
                <Input
                  style={{width:'60%',display:'inline-block'}}
                  defaultValue={item.final_num}
                  onChange={(e)=>this.myinputChange.bind(this)(e,'final_num',item)}
                />
              </div>
            </Col>
            <Col span={6}>
              <div style={{textAlign:'center'}}>
                <a href={'javascript:void(0)'} style={{marginRight:'5px'}} onClick={()=>this.updateZcbd.bind(_this)(item)}><Icon type="arrow-up" />上传装车磅单</a>
                <a href={'javascript:void(0)'} style={{marginRight:'5px'}} onClick={()=>this.updateXcbd.bind(_this)(item)}><Icon type="arrow-up" />上传卸车磅单</a>
                <a href={'javascript:void(0)'} style={{marginRight:'5px'}} onClick={()=>this.deleteCars.bind(_this)(item)}><Icon type="delete" />删除</a>
              </div >
            </Col>
          </Row>
        </div>

        <Modal title="上传装车磅单"
               visible={sczcbd}
               onOk={this.handleOk}
               onCancel={this.handleSczcbdCancel.bind(this)}
               footer={null}>

          <ScZdbdList item={item} _this={this} pthis={pthis} mykey={mykey} imgFiles={imgsFiles} handleSczcbdCancel={this.handleSczcbdCancel.bind(this)} ></ScZdbdList>
        </Modal>
        <Modal title="上传卸车磅单"
               visible={scxcbd}
               onOk={this.handleOk}
               onCancel={this.handleScxcbdCancel.bind(this)}
               footer={null}>

          <ScxCbdList item={item} _this={this} pthis={pthis} mykey={mykey} rimgFiles={rimgFiles} handleScxcbdCancel={this.handleScxcbdCancel.bind(this)} ></ScxCbdList>
        </Modal>
      </div >
    )
  }
}
export default OrderListYundanChildrenTd;
