import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select ,message} from 'antd';
import Header from './Common/header';
import Mation from './personalcenter';
import Security from './securitysetting';
import CompanyRelation from './CompanyRelation' ;
import './Homepage.less';
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class TagsDemo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           info:{}
        }
        this.callback = this.callback.bind(this);
        this.findRoleAll=this.findRoleAll.bind(this);
    }
    callback(key) {
        console.log(key);
    }
  componentDidMount(){
      this.findRoleAll();
  }

  findRoleAll(){
    var context=this;
    RequireUtils.baseRequire('person/person-info',{},function (data) {
      if(data.code==1) {
        this.setState({
          info:data.data.info
        });
        localStorage.setItem('company_id', data.data.info.company_id);
      }
      else{
        message.error("获取用户信息失败！");
      }
    }.bind(this));
  }
    render() {
    const info=this.state.info;
        return (
            <div>
          <Row>
            <Header  info={info} />

          </Row>
           <Row gutter={8} style={{ marginTop: '10px' }} className={'myhomepage'}>
                    <Col span={24}>
                        <Card hoverable title="基本" type="card">
                            <Tabs onChange={this.callback} defaultActiveKey="1" type="card">
                                <TabPane tab="个人信息" key="1">
                                <Mation info={info}  fresh={this.findRoleAll}/>
                              </TabPane>
                                <TabPane tab="安全信息" key="3">
                                  <Security  info ={info} go={this.findRoleAll}/>
                                </TabPane>
                                <TabPane tab="公司关系" key="4">
                                  <CompanyRelation/>
                                </TabPane>
                            </Tabs>
                        </Card>
                    </Col>

                </Row>
            </div >
        )
    }
}




export default TagsDemo;
