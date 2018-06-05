import React from 'react';
import { Card, Row, Col, Tabs, Icon,Select,Modal,message } from 'antd';
import Qzfrom from './Qzfrom' ;
import mystyle from './tabstyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MerchandiseDetailBasic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      qzreport:false
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  qzreport(flag){
    if(flag){
      this.setState({
        qzreport:true
      })
    }else {
        message.info("暂无气质报告") ;
    }
  }

  handleCancel(){
    this.setState({
      qzreport:false
    })
  }

  render() {
    const info=this.props.info;
     const reports = info.reports ;
    const {qzreport} = this.state ;
    return (
      <div>
        <Row gutter={8} type="flex" justify="space-around" align="middle">
          <Col span={20}>
            <Row gutter={8} >
              <Col span={8}>
                <span className={'my-custom-title'}>标品:</span>
                <span>{info.prod_name}</span>
              </Col>
              <Col span={8}>
                <span className={'my-custom-title'}>气源地区:</span>
                <span>{info.place_name}</span>
              </Col>
              <Col span={8}>
                <span className={'my-custom-title'}>热值:</span>
                <span>{info.hot_value}</span>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <span className={'my-custom-title'}>气源产地:</span>
                <span>{info.area_name}</span>
              </Col>
              <Col span={8}>
                <span  className={'my-custom-title'}>生产批次:</span>
                <span>{}</span>
              </Col>
              <Col span={8}>
                <span className={'my-custom-title'}>气化率:</span>
                <span>{info.gas_value}</span>
              </Col>
            </Row>
            <Row gutter={8}>
              <Col span={8}>
                <span className={'my-custom-title'}>气源类型:</span>
                <span>{info.type_name}</span>
              </Col>
              <Col span={8}>
                <span className={'my-custom-title'}>生产企业:</span>
                <span>{info.produce_company}</span>
              </Col>
              <Col span={8}>
                <span className={'my-custom-title'}>液温</span>
                <span>{info.temp_name}</span>
              </Col>
            </Row>
          </Col>
          <Col span={4}>
            <div style={{textAlign:'center',color:'#004cff'}}>
              <div style={{width:'100px'}}  onClick={()=>(reports&&reports.length>0)?this.qzreport.bind(this)(true):this.qzreport.bind(this)()}>
                <div><Icon type="profile" style={{fontSize:'18px'}} /></div>
                <div>气质报告</div>
              </div>
            </div>
          </Col>
        </Row>
        <Modal title="气质报告"
               visible={qzreport}
               onCancel={this.handleCancel.bind(this)}
               footer={null}
               width={'60%'}
        >
          <Qzfrom ref={'Qzfrom'} reports={reports}   handleCancel={this.handleCancel.bind(this)} ></Qzfrom>
        </Modal>
      </div>
    )
  }
}
export default MerchandiseDetailBasic;
