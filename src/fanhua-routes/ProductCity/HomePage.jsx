import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select ,message,BackTop,Layout,Menu,Divider } from 'antd';
import Head from './Head';
import createHistory from 'history/createHashHistory';
import { Link } from 'dva/router';
import Brand from './Brand';
// import Info from './Center';
import Cen from './Centers';
import Item from './Items';
import  Menud from './Menu';
import {config} from 'utils';
import  Adver from './Advertisting';
import  AdverLater from './AdvertistingLater';
import './HomePage.less';
import {RequireUtils} from 'utils';
// import {config} from 'utils';
import Items from "./Items";
const TabPane = Tabs.TabPane;
const Option = Select.Option;
const SubMenu = Menu.SubMenu;
const { Header, Footer, Content } = Layout;
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner:[
        {banner_desc:"",banner_flag:"",banner_url:"",id:0},
        {banner_desc:"",banner_flag:"",banner_url:"",id:0},
        {banner_desc:"",banner_flag:"",banner_url:"",id:0},
      ],
      goods:[],
      sumOrder:0,
      sumPrice:0,
      allWeight:{type:"",weight:"0"},
      sumWeight:0,
    }
    this.callback = this.callback.bind(this);
    this.findRoleAll=this.findRoleAll.bind(this);
    };

  callback(key) {
    console.log(key);
  }
  componentWillMount(){
    RequireUtils.baseRequire('mall/home-page',{},function (data){
      if(data.code==1) {
        this.setState({
          banner:data.data.datalist.banner,
          goods:data.data.datalist.goods.map(function (item,index) {
            item.key = index ;
            return item ;
          }),
          sumOrder:data.data.datalist.sumOrder,
          sumPrice:data.data.datalist.sumPrice,
          allWeight:data.data.datalist.allWeight,
          sumWeight:data.data.datalist.sumWeight,
        });
      }
      else{
        alert("获取用户信息失败！");
      }
    }.bind(this));
  }
  componentDidMount(){
  }

  siteOut(){
    RequireUtils.baseRequire('site/logout', {}, function (data) {
      if (data.code) {
        window.localStorage.setItem('isLogin',0) ;
        createHistory().push({
          pathname: '#/',
        })
      }
      else {
        message.error(data.msg);
      }}.bind(this));
  }

  findRoleAll(){

  }
  render() {
    const {banner,goods, sumOrder,sumPrice,sumWeight,allWeight}=this.state;
    const isLogin = window.localStorage.getItem('isLogin') ;
    return (
      <div className={"my-custom-htf"}>
        {/*<BackTop>*/}
          {/*<div className="ant-back-top-inner">UP</div>*/}
        {/*</BackTop>*/}
        <Menud />
        <Layout >
          <Header   className="layout" >
            <div className="logo2"  >
              <img src={config.log} alt="加载错误"  style={{height:'auto',width:'100%'}}/>
            </div>
            <Menu
              theme="light"
              mode="horizontal"
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1"  >
                <Link to="/echarthomepage"   style={{color:"#1E4EDE"}}>
                    <span className={'my_ywgl'}>
                      管理中心
                    </span>
                </Link>
              </Menu.Item>
              {isLogin==1? <SubMenu className={'my-submenu'}  title={<span  style={{color:' #1E4EDE',fontFamily:'PingFangSC-Medium'}}> 个人中心</span>}>
                <Menu.Item key="profile">
                  <Link to="/homepage" style={{marginLeft:35}} >个人资料</Link>
                </Menu.Item>
                <Menu.Item key="logout">
                  <div  style={{marginLeft:35}}>
                    <span onClick={this.siteOut} style={{width:"100%", height:"100%" ,textAlign:"center"}}>
                        退出登录
                     </span>
                  </div>
                </Menu.Item>
              </SubMenu> :<Menu.Item key="2"  style={{ marginLeft:"20px"}}>
                <Link to="/Login1" style={{color:"#1E4EDE"}}>
                <span style={{color:' #1E4EDE'}}>
                    登录
                </span>
                </Link>
                </Menu.Item>}
            </Menu>
          </Header>
          <Content className="layout_content">
             <Brand  banner={banner} />

             <Cen  sumOrder={sumOrder} allWeight={allWeight} sumWeight={sumWeight}/>

             <Item  goods={goods} />
            <div style={{textAlign:'center',padding:'96px 0 46px 0'}}>
              <img src={config.mycorperation} style={{height:'96%',opacity:'0.8'}}/>
            </div>

            <div className="guangContainer">
              <img className="guang" src={config.cooperation} alt="加载错误"/>
            </div>

            <div style={{textAlign:'center',padding:'96px 0 46px 0'}}>
              <img src={config.xjln} style={{height:'96%',opacity:'0.8'}}/>
            </div>

            <div className="img_top">
              <img  className="img_top_img"  src={config.adSrc} alt="加载错误"/>
            </div>


        </Content>
          <Footer  style={{textAlign:"center",fontWeight:100 ,fontSize:10 ,backgroundColor:'#71757E',marginTop:'63px'}} className={"footer"}>
            <div className="footer_inner">
              <Row >
                <div>
                  <a href="#">法律声明</a>
                  <Divider type="vertical" />
                  <a href="#">隐私声明</a>
                  {/*<Divider type="vertical" />*/}
                  {/*<a href="#">诚聘英才</a>*/}
                  {/*<a href="#">友情链接</a>*/}
                  <Divider type="vertical"  />
                  <a href="#">帮助</a>
                </div>
              </Row>
              {/*<Row >*/}
                {/*<div>*/}
                  {/*<a href="#" style={{fontSize:10}}>我们欢迎你我们欢迎你</a>*/}
                {/*</div>*/}
              {/*</Row>*/}
              {/*<Row >*/}
                {/*<div>*/}
                  {/*<img src={config.an} alt=""/>*/}
                  {/*<a href="#" style={{fontSize:10}}>浙江网安备</a>*/}
                {/*</div>*/}
              {/*</Row>*/}
            </div>
          </Footer>
        </Layout>
      </div >
    )
  }
}
export default HomePage;
