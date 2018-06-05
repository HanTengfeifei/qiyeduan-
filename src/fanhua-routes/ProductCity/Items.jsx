import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch ,Modal,Layout} from 'antd';
import MerchandiseControlTable from './MerchandiseControlTable' ;
import {RequireUtils} from 'utils';
import {config} from 'utils';
import { Link } from 'dva/router';
import {message} from "antd/lib/index";
// import MerchandiseDetail from './MerchandiseDetail' ;
// import MyTradeAdd from './TradeAdd' ;
import './Items.less';
const { Header, Footer, Content } = Layout;
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      ModalText:"商品添加",
      confirmLoading:false,
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  }
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    const params={};
    RequireUtils.baseRequire('car/car-list',params,function (data){
      if(data.code==1) {
        const pagination = { ...this.state.pagination };
        pagination.total = data.count;
        this.setState({
          loading: false,
          data: data.data.list,
          pagination,
        });
      }
      else{
        message.error(data.msg);
      }
    }.bind(this));
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
      // this.child.handleSubmit();
    }, 2000);
  }
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
    // this.child.reset();
  }
  render() {
    const {visible, ModalText, confirmLoading }=this.state;
    return (
      <div className={"tableShadowIsFather"}>
      <div className={"tableShadow"}  style={{textAlign:"center"}}>
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }} className={"lng"}>
          <Col span={24}>
            <div >
              <MerchandiseControlTable goods={this.props.goods}></MerchandiseControlTable>
            </div>
          </Col>
        </Row>
      </div >
      </div>
    )
  }
}
export default Items;
