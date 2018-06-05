import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Modal,Divider  } from 'antd';
import ShowMap from './ShowMap' ;
import mystyle from './tablestyle.less' ;
import BalanceDetailChildrenTd from './BalanceDetailChildrenTd' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class BalanceDetailTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showmap:false
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


  callback(key) {
    console.log(key);
  }

  handleAddCancel = () => {
    this.refs['AddCar'].resetFields() ;
    this.setState({
      addcar:false,
      freeselectData:[]
    });
  } ;

  handleMapCancel=()=>{
    this.setState({
      showmap:false
    })
  };

  showMap=()=>{
    this.setState({
      showmap:true
    })
  } ;


  render() {
    const {item,tableExpand,go}=this.props;
    const  {showmap} = this.state ;
    const exname = tableExpand?'expand-mark table-expand':'expand-mark table-not-expand' ;
    const zcdd = item.faddr_province+item.faddr_city+item.faddr_county+item.faddr_detail ;
    const xcdd = item.addr_province+item.addr_city+item.addr_county+item.addr_detail ;
    const mapdata = [{ longitude:item.f_lon ,
      latitude: item.f_lat,
      marktitle:"装车场站",
      station:item.addr_name
    },{ longitude:item.j_lon ,
      latitude: item.j_lat,
      marktitle:"卸车场站",
      station:item.f_addr_name
    }] ;


    return (
      <div>
        <div >
          <Row className={'table-first-line'}>
            <div >
              < Col span={24}>
                <div style={{textAlign:'left'}}>
                  <span style={{marginRight:'5px'}}>运单编号</span>
                  <span style={{marginRight:'20px'}}>{item.deliver_code}</span>
                </div>
              </Col>
            </div>
          </Row>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col>
              <div className={'my-custom-center'}>
                <i className={exname}></i>
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'}>
                <span>运输情况</span>
              </div>
              <div className={'my-custom-center'}>
                <span>{item.load_num}/{item.recv_num}吨</span>
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'} style={{overflow: 'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>
                <span style={{marginRight:'5px'}}>装车站点</span>
                <span title={zcdd}>{item.faddr_province}{item.faddr_city}{item.faddr_county}{item.faddr_detail}</span>
              </div>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>{item.send_contact}</span>
                <span title={item.send_mobile}>{item.send_mobile}</span>
              </div>
            </Col>
            <Col span={7} >
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>卸车站点</span>
                <span title={xcdd}>{item.addr_province}{item.addr_city}{item.addr_county}{item.addr_detail}</span>
              </div>
              <div className={'my-custom-center'}>
                <span style={{marginRight:'5px'}}>{item.recv_contact}</span>
                <span title={item.recv_mobile}>{item.recv_mobile }</span>
              </div>
            </Col>
            <Col span={4}>
              <div className={'my-custom-center'}>
                <span>结算量</span>
              </div>
              <div className={'my-custom-center'}>
                <span>{item.final_num}吨</span>
              </div>
            </Col>
            <Col span={3}>
              <div className={'my-custom-center'} onClick={this.showMap}>
                <Icon type="environment-o" />地图
              </div >
             {/* {mybuttons}*/}
            </Col>
          </Row>
        </div>
        <Modal title="运单地图"
               visible={showmap}
               width={'60%'}
               onOk={this.handleOk}
               onCancel={this.handleMapCancel}
               footer={null}>
          <ShowMap ref="ShowMap" mapdata={mapdata}></ShowMap>
        </Modal>
      </div >
    )
  }
}
export default BalanceDetailTd;
