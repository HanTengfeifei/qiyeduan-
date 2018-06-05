import React from 'react';
import { Card,  Tabs, Select,Table,Row,Col } from 'antd';
import {RequireUtils} from 'utils';
import echarts from 'echarts/lib/echarts' ;
import 'echarts/lib/chart/bar' ;
import 'echarts/lib/chart/line' ;
import 'echarts/lib/component/tooltip' ;
import 'echarts/lib/component/title' ;
import bieimg from '../../../src/assets/img/bie.png';
import lineimg from '../../../src/assets/img/line.png' ;
import barimg from '../../../src/assets/img/bar.png' ;
import createHistory from 'history/createHashHistory';
import './DataReport.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ShowCustomerDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cust:{},
      addr:[],
      order:[],
      fileList:[],
      statistics:{}
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {
    var _this = this ;
  }

  render() {
    const {} = this.state ;
    const props = {
      action: '//jsonplaceholder.typicode.com/posts/',
      listType:"picture-card"
    };
    return (
      <div >
        <Card hoverable title="数据报表" type="card" >
          <Row style={{marginBottom:'5px'}}>
              <div style={{background:'rgb(240, 242, 245)',padding:'10px',boxSizing:'border-box',boxShadow:'0 0 2px rgb(212,212,200)'}}>
                  <span style={{display:'table-cell',width:'150px',height:'150px',verticalAlign:'middle'}}>
                       <img src={bieimg}/>
                  </span>
                  <span style={{display:'table-cell',width:'100%',paddingLeft:'60px',verticalAlign:'middle'}}>
                        <Row>
                          <Col>
                            <div style={{fontSize:'18px',fontWeight:'600'}}>缺陷分布图</div>
                          </Col>
                        </Row>
                        <Row style={{marginTop:'25px'}}>
                          <Col>
                            <div className={'tbox-content'}>
                              <div className={'my-fb'}>
                                 <ul>
                                  <li>缺陷状态分布图</li>
                                  <li>缺陷严重级别分布图</li>
                                  <li>缺陷根源分布图</li>
                                </ul>
                              </div>
                            </div>
                          </Col>
                        </Row>
                  </span>
              </div>
          </Row>
          <Row style={{marginBottom:'5px'}}>
            <div style={{background:'rgb(240, 242, 245)',padding:'10px',boxSizing:'border-box',boxShadow:'0 0 2px rgb(212,212,200)'}}>
                  <span style={{display:'table-cell',width:'150px',height:'150px',verticalAlign:'middle'}}>
                       <img src={lineimg}/>
                  </span>
                  <span style={{display:'table-cell',width:'100%',paddingLeft:'60px',verticalAlign:'middle'}}>
                            <Row>
                              <Col>
                                <div style={{fontSize:'18px',fontWeight:'600'}}>缺陷分布图</div>
                              </Col>
                            </Row>
                            <Row style={{marginTop:'25px'}}>
                              <Col>
                                <div className={'tbox-content'}>
                                  <div className={'my-fb'}>
                                     <ul>
                                      <li>缺陷状态分布图</li>
                                      <li>缺陷严重级别分布图</li>
                                      <li>缺陷根源分布图</li>
                                    </ul>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                      </span>
              </div>
          </Row>
          <Row>
            <div style={{background:'rgb(240, 242, 245)',padding:'10px',boxSizing:'border-box',boxShadow:'0 0 2px rgb(212,212,200)'}}>
                  <span style={{display:'table-cell',width:'150px',height:'150px',verticalAlign:'middle'}}>
                       <img src={barimg}/>
                  </span>
                 <span style={{display:'table-cell',width:'100%',paddingLeft:'60px',verticalAlign:'middle'}}>
                            <Row>
                              <Col>
                                <div style={{fontSize:'18px',fontWeight:'600'}}>缺陷分布图</div>
                              </Col>
                            </Row>
                            <Row style={{marginTop:'25px'}}>
                              <Col>
                                <div className={'tbox-content'}>
                                  <div className={'my-fb'}>
                                     <ul>
                                      <li>缺陷状态分布图</li>
                                      <li>缺陷严重级别分布图</li>
                                      <li>缺陷根源分布图</li>
                                    </ul>
                                  </div>
                                </div>
                              </Col>
                            </Row>
                      </span>
            </div>
          </Row>
          <Row>
          </Row>
        </Card>
      </div >
    )
  }
}
export default ShowCustomerDetails;
