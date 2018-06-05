import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'dva/router';
import { Layout, Icon, Menu, Badge, Switch, Popover } from 'antd';
import { CommonMenus } from '../Common';
import classnames from 'classnames';
import {RequireUtils,config} from 'utils';
import {message} from "antd/lib/index";
import createHistory from 'history/createHashHistory';
const { Header } = Layout;
const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;

class  LeftModeHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.siteOut=this.siteOut.bind(this);
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
  render(){
    const {  siteOut, siderFold, siderRespons, lightThem, siderOpenKeys, menuResponsVisible, onSwitchSidebar, onSwitchTheme, onSwitchMenuMode, onMenuOpenChange, onSwitchMenuPopover }=this.props
    const popMenuProps = {
      menuMode: 'left',
      siderFold: false,
      lightThem: true,
      siderOpenKeys,
      onMenuOpenChange,
      onSwitchMenuMode
    }
    return (
      <div style={{backgroundColor:'#fff'}}>
      <Header className="leftHeader">
        {/*{*/}
          {/*//响应式菜单*/}
          {/*siderRespons ?*/}
            {/*<Popover*/}
              {/*placement="bottomLeft"*/}
              {/*onVisibleChange={onSwitchMenuPopover}*/}
              {/*visible={menuResponsVisible}*/}
              {/*trigger="click"*/}
              {/*overlayClassName="responsMenu"*/}
              {/*content={<CommonMenus {...popMenuProps} />}>*/}
              {/*/!*<span className="btnBars"><Icon type='bars'/></span>*!/*/}
            {/*</Popover>*/}
            {/*:*/}
            {/*<span className="btnBars" onClick={onSwitchSidebar}>*/}
            {/*<Icon type={siderFold ? 'menu-unfold' : 'menu-fold'}/>*/}
          {/*</span>*/}
        {/*}*/}
        <Menu mode="horizontal" className="rightMenu" onClick={onSwitchMenuMode}>
          <Menu.Item key="notification">
          <Link to="/Home"><Icon type="export" />返回商城</Link>
          </Menu.Item>
          {/*{*/}
            {/*!siderRespons ?*/}
              {/*<SubMenu title={<span><Icon type="setting"/>设置</span>}>*/}
                {/*<MenuItemGroup title="菜单布局">*/}
                  {/*<Menu.Item key="left">左侧</Menu.Item>*/}
                  {/*<Menu.Item key="top">顶部</Menu.Item>*/}
                {/*</MenuItemGroup>*/}
                {/*<MenuItemGroup title="主题设置">*/}
                  {/*<Menu.Item key="theme">*/}
                    {/*<Switch onChange={onSwitchTheme} checked={!lightThem} size="small" checkedChildren="暗"*/}
                            {/*unCheckedChildren="亮"/>*/}
                  {/*</Menu.Item>*/}
                {/*</MenuItemGroup>*/}
              {/*</SubMenu>*/}
              {/*:*/}
              {/*''*/}
          {/*}*/}
          <SubMenu title={<span> <Icon type="user"/>个人中心</span>}>
            <Menu.Item key="profile">
            <Link to="/homepage" style={{marginLeft:35}} >个人资料</Link>
            </Menu.Item>
            <Menu.Item key="logout">
              {/*<Link >*/}
              {/*<Link >*/}
              <div  style={{marginLeft:35}}>
              <span onClick={this.siteOut} style={{width:"100%", height:"100%" ,textAlign:"center"}}>
              退出登录
               </span></div>
            {/*</Link>*/}
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Header>
      </div>
    )
  }
}
export default LeftModeHeader;
// LeftModeHeader.prototype = {
//   siderFold: PropTypes.bool,
//   siderRespons: PropTypes.bool,
//   lightThem: PropTypes.string,
//   siderOpenKeys: PropTypes.array,
//   menuResponsVisible: PropTypes.bool,
//   onSwitchSidebar: PropTypes.func,
//   onSwitchTheme: PropTypes.func,
//   onSwitchMenuMode: PropTypes.func,
//   onMenuOpenChange: PropTypes.func,
//   onSwitchMenuPopover: PropTypes.func,
// }


