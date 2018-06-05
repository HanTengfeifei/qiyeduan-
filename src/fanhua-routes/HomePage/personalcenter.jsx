import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';
import { Divider } from 'antd';
import { Modal } from 'antd';
import Form from './Form';
import './personalcenter.less';


const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Mation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          ModalText: 'Content of the modal',
          visible: false,
          confirmLoading: false,
        }
        this.callback = this.callback.bind(this);
    }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = (e) => {
      this.refs["form"].handleSubmit(e) ;
      setTimeout(() => {
          this.setState({
              visible: false,
              confirmLoading: false,
          });
      }, 2000);
  };
  handleCancel = () => {
        console.log('Clicked cancel button');
        this.setState({
            visible: false,
        });
    };
    callback(key) {
        console.log(key);
    }
    componentDidMount() {
    }
    render() {
      const { visible, confirmLoading, ModalText } = this.state;
      const {user_name,user_wechat,user_phone,user_mobile}=this.props.info;
        return (
            <div>
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col span={4} >
                 真实姓名:
                </Col>
                 <Col span={20}>
                {user_name}
                </Col>
              </Row>
              <Divider></Divider>
                  <Row gutter={8} style={{ marginTop: '10px' }}>
                  <Col span={4} >
                绑定微信:
                </Col>
                 <Col span={20}>
                {user_wechat}
                </Col>
                  </Row>
              <Divider></Divider>
                  <Row gutter={8} style={{ marginTop: '10px' }}>
                    <Col span={4} >
                办公电话:
                </Col>
                 <Col span={20}>
                {user_phone}
                </Col>
                  </Row>
              <Divider></Divider>
              {/*<Row gutter={8} style={{ marginTop: '10px' }}>*/}
                    {/*<Col span={4} >*/}
                {/*登录手机:*/}
                {/*</Col>*/}
                 {/*<Col span={20}>*/}
                {/*{user_mobile}*/}
                {/*</Col>*/}
                  {/*</Row>*/}
              {/*<Divider></Divider>*/}
              <Row gutter={8} style={{ marginTop: '10px' }}>
                <Col    span={24} >
                  <Button  className={"button1"} type="primary" onClick={this.showModal}>编辑</Button>

                  <Modal title="编辑个人信息"
                         visible={visible}
                         onOk={this.handleOk}
                         confirmLoading={confirmLoading}
                         onCancel={this.handleCancel}
                  >
                    <Form ref="form"  info={this.props.info} sent={this.props.fresh}  />
                  </Modal>
                </Col>

              </Row>
              <Divider></Divider>
            </div >
        )
    }
}


class SlidingTabsDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            mode: 'top',
        };
    }
    handleModeChange = (e) => {
        const mode = e.target.value;
        this.setState({ mode });
    }
    render() {
        const { mode } = this.state;
        return (
            <div>
                <Radio.Group onChange={this.handleModeChange} value={mode} style={{ marginBottom: 8 }}>
                    <Radio.Button value="top">Horizontal</Radio.Button>
                    <Radio.Button value="left">Vertical</Radio.Button>
                </Radio.Group>
                <Tabs
                    defaultActiveKey="1"
                    tabPosition={mode}
                    style={{ height: 220 }}
                >
                    <TabPane tab="Tab 1" key="1">Content of tab 1</TabPane>
                    <TabPane tab="Tab 2" key="2">Content of tab 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of tab 3</TabPane>
                    <TabPane tab="Tab 4" key="4">Content of tab 4</TabPane>
                    <TabPane tab="Tab 5" key="5">Content of tab 5</TabPane>
                    <TabPane tab="Tab 6" key="6">Content of tab 6</TabPane>
                    <TabPane tab="Tab 7" key="7">Content of tab 7</TabPane>
                    <TabPane tab="Tab 8" key="8">Content of tab 8</TabPane>
                    <TabPane tab="Tab 9" key="9">Content of tab 9</TabPane>
                    <TabPane tab="Tab 10" key="10">Content of tab 10</TabPane>
                    <TabPane tab="Tab 11" key="11">Content of tab 11</TabPane>
                </Tabs>
            </div>
        );
    }
}

class PositionDemo extends React.Component {
    state = {
        tabPosition: 'top',
    }
    changeTabPosition = (tabPosition) => {
        this.setState({ tabPosition });
    }
    render() {
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    Tab position：
          <Select
                        value={this.state.tabPosition}
                        onChange={this.changeTabPosition}
                        dropdownMatchSelectWidth={false}
                    >
                        <Option value="top">top</Option>
                        <Option value="bottom">bottom</Option>
                        <Option value="left">left</Option>
                        <Option value="right">right</Option>
                    </Select>
                </div>
                <Tabs tabPosition={this.state.tabPosition}>
                    <TabPane tab="Tab 1" key="1">Content of Tab 1</TabPane>
                    <TabPane tab="Tab 2" key="2">Content of Tab 2</TabPane>
                    <TabPane tab="Tab 3" key="3">Content of Tab 3</TabPane>
                </Tabs>
            </div>
        );
    }
}

class CloseOrAddDemo extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab 1', key: '1', closable: false },
            { title: 'Tab 2', content: 'Content of Tab 2', key: '2' },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
    render() {
        return (
            <Tabs
                onChange={this.onChange}
                activeKey={this.state.activeKey}
                type="editable-card"
                onEdit={this.onEdit}
            >
                {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key} closable={pane.closable}>{pane.content}</TabPane>)}
            </Tabs>
        );
    }
}

class CustomDemo extends React.Component {
    constructor(props) {
        super(props);
        this.newTabIndex = 0;
        const panes = [
            { title: 'Tab 1', content: 'Content of Tab Pane 1', key: '1' },
            { title: 'Tab 2', content: 'Content of Tab Pane 2', key: '2' },
        ];
        this.state = {
            activeKey: panes[0].key,
            panes,
        };
    }

    onChange = (activeKey) => {
        this.setState({ activeKey });
    }
    onEdit = (targetKey, action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex++}`;
        panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
        this.setState({ panes, activeKey });
    }
    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }
    render() {
        return (
            <div>
                <div style={{ marginBottom: 16 }}>
                    <Button onClick={this.add}>ADD</Button>
                </div>
                <Tabs
                    hideAdd
                    onChange={this.onChange}
                    activeKey={this.state.activeKey}
                    type="editable-card"
                    onEdit={this.onEdit}
                >
                    {this.state.panes.map(pane => <TabPane tab={pane.title} key={pane.key}>{pane.content}</TabPane>)}
                </Tabs>
            </div>
        );
    }
}

export default Mation;
