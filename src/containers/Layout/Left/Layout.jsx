import React from 'react';
import classnames from 'classnames';
import { Layout , message} from 'antd';
import LeftHeader from './Header';
import { CommonMenus, CommonBeard, CommonFooter } from '../Common';
import createHistory from 'history/createHashHistory';
import { config } from 'utils';
import {RequireUtils} from 'utils';
import { Link } from 'dva/router';

const { Content, Sider } = Layout;

class LayoutLeftMode extends React.Component {
  state = {
    menudata: [],
  }
  componentDidMount() {
    this.selectMenu();
  }
  siteOut=()=>{
    console.log(99999);
    RequireUtils.baseRequire('site/log-out', {}, function (data) {
      if(data.code) {
        createHistory().push({
          pathname: '/',
        })
      }
      else{
      message.error(data.msg);
      }
    }.bind(this));
  }
  selectMenu = () => {
    RequireUtils.baseRequire('site/get-menu', {}, function (data) {
      if(data.code) {
        this.setState({
          menudata: data.data.menu,
        });
      }
      else{
        this.setState({
          menudata: [{id: "100", pid: "0", name: "首页", url: "/echarthomepage", enable: null, key: "23", level: "1"}],
        });
      }
    }.bind(this));
  }

  onSwitchSidebar = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'global/switchSidebar' });
  }

  onSwitchTheme = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'global/switchTheme' });
  }

  onMenuOpenChange = (openKeys) => {
    const { dispatch } = this.props;
    dispatch({ type: 'global/onMenuOpenChange', payload: { siderOpenKeys: openKeys } });
  }

  onSwitchMenuMode = (e) => {
    const { dispatch, global } = this.props;
    const key = e && e.key;
    if (key === 'left' || key === 'top') {
      dispatch({ type: 'global/switchFakeGlobal', payload: true })
      setTimeout(function () {
        dispatch({ type: 'global/switchFakeGlobal', payload: false })
        dispatch({ type: 'global/switchMenuMode', payload: key });
      }, 600);
    }
    // 响应式模式下调用
    if (global && global.siderRespons) {
      this.onSwitchMenuPopover();
    }
  }

  onSwitchMenuPopover = () => {
    const { dispatch } = this.props;
    dispatch({ type: 'global/switchMenuPopver' })
  }

  render() {
    const { global, children, location } = this.props;
    const { siderFold, siderRespons, lightThem, menuMode, siderOpenKeys, menuResponsVisible } = global;
    const menuProps = {
      location,
      menuMode,
      lightThem,
      siderOpenKeys,
      onSwitchTheme: this.onSwitchTheme,
      onMenuOpenChange: this.onMenuOpenChange,
      onSwitchMenuMode: this.onSwitchMenuMode,
      menuData: this.state.menudata,
    }

    const headerProps = {
      siderFold,
      siderRespons,
      lightThem,
      siderOpenKeys,
      menuResponsVisible,
      onSwitchTheme: this.onSwitchTheme,
      onSwitchSidebar: this.onSwitchSidebar,
      onSwitchMenuMode: this.onSwitchMenuMode,
      onMenuOpenChange: this.onMenuOpenChange,
      onSwitchMenuPopover: this.onSwitchMenuPopover
    }

    const beardProps = {
      location,
      CommonMenus
    }

    const comStyle = {
      overflow: 'auto',
      height: '100vh',
      transition: 'all .3s cubic-bezier(.215,.61,.355,1)'
    }

    const dyncStyle = siderRespons ? comStyle : (
      !siderFold ? Object.assign(comStyle, { marginLeft: 200 }) : Object.assign(comStyle, { marginLeft: 78 })
    )

    return (
      <div>
        <div className="layout-left">
          <Layout>
            <Link to="/echarthomepage">
              { !siderRespons ?
                <div
                  className={classnames("leftSiderLogo", { "leftSiderLogoMini": siderFold || false })}
                >
                <div className="qianse" style={{padding:'0 13px'}}>
                  <img alt={'logo'} style={ {width:"100%",height:"100%"}} src={siderFold ? config.logoFold : config.title} />
                {/*{siderFold ? '' : <span className={siderFold ? '' : 'action'}>{config.name}</span>}*/}
                </div>
              </div>:""}
            </Link>
            {
              // 左侧菜单可折叠
              !siderRespons ?
                <Sider
                  trigger={null}
                  collapsible
                  collapsed={siderFold}
                  className={classnames("leftSider", { "leftSiderFold": siderFold || false }, { "leftSiderWhite": false })}
                >
                  <CommonMenus {...menuProps} />
                </Sider>
                :
                ''
            }
            <Layout style={dyncStyle}>
              <LeftHeader {...headerProps} />
              <CommonBeard {...beardProps} />
              <Content style={{ padding: 25 }}>
                {children}
              </Content>
              <CommonFooter />
            </Layout>
          </Layout>
        </div>
      </div>
    );
  }
}

export default LayoutLeftMode;
