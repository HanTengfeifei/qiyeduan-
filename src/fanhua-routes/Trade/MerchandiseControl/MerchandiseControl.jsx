import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch ,Modal,Input,message} from 'antd';
import MerchandiseControlTable from './MerchandiseControlTable' ;
import {RequireUtils} from 'utils';
import { Link } from 'dva/router';
import MerchandiseDetail from './MerchandiseDetail' ;
import MyTradeAdd from './TradeAdd' ;
import mystyle from './tabstyle.less'

const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MerchandiseControl extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible:false,
      ModalText:"商品添加",
      confirmLoading:false,
      searchparams:{find_str:"",f_type:""}
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  } ;


  changeSearchParams = (filed,value) => {
    const {searchparams} = this.state ;
    searchparams[filed] = value ;
    this.setState({
      searchparams: searchparams
    });
  };

  search=()=>{
    var {searchparams} = this.state ;
    this.refs["MerchandiseControlTable"].fetch(searchparams) ;
  };

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
  };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
    // this.child.reset();
  };


  myselfonkeydown(e){
    if(e.keyCode == 13){
      this.search();
    }
  }

  render() {
    const {visible, ModalText, confirmLoading }=this.state;
    return (
      <div onKeyDown={(e)=>this.myselfonkeydown.bind(this)(e)}>
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '10px' }}>

          <Col span={24}>
              <div style={{padding:'15px'}}>
                <span style={{fontSize:'20px',fontWeight:'bold'}}>商品管理</span>
              </div>
            <Row>
              <Col span={4}>
                <div style={{padding:'10px 0'}}>
                  <Select
                    style={{ width: '100%' }}
                    size="large"
                    placeholder="搜索运输类型"
                    onChange={(value)=> this.changeSearchParams("f_type",value)}
                  >
                    <Option value="" key="0">运输方式</Option>
                    <Option value="0" key="1">配送</Option>
                    <Option value="1" key="2">自提</Option>
                  </Select>
                </div>
              </Col>
              <Col span={2}>
                  <div style={{padding:'10px 0'}}>
                      <Button size='large' onClick={this.search.bind(this)}>筛选</Button>
                  </div>
              </Col>
              <Col span={7}></Col>
              <Col span={9}>
                  <div style={{padding:'10px 0'}}>
                      <Input
                          placeholder="搜索商品名称、地区、气源类型、气源产地"
                          size="large"
                          onChange={(e)=>this.changeSearchParams.bind(this)('find_str',e.target.value)}
                      />
                  </div>
              </Col>
              <Col span={2}>
                <div style={{padding:'10px 0'}}>
                  <Button icon="search" size='large' onClick={this.search.bind(this)}>查询</Button>
                </div>
              </Col>
            </Row>
            <Card  title="" type="card">
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col span={24} >
                  <div style={{marginBottom:'10px',textAlign:'right'}}>
                    {/*<span style={{marginRight:'15px'}}>*/}
                      {/*<Icon type="plus-circle-o" style={{marginRight:'8px'}} />*/}
                      {/*批量导入*/}
                    {/*</span>*/}
                    <span>
                      <Link to="/AddMerchandiseControl"><span>
                       <Icon type="plus-circle-o" style={{marginRight:'8px'}} />
                      新增
                    </span></Link>
                    </span>
                    <Modal title={ModalText}
                           visible={visible}
                           onOk={this.handleOk}
                           confirmLoading={confirmLoading}
                           onCancel={this.handleCancel}
                      // afterClose={this.close}
                    >

                    </Modal>
                  </div>
                </Col>
              </Row>
             <MerchandiseControlTable ref={"MerchandiseControlTable"}></MerchandiseControlTable>
            </Card>
          </Col>
        </Row>
      </div >
    )
  }
}
export default MerchandiseControl;
