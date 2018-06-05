import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
import { Link } from 'dva/router';
import './EchartHomepage.less';
import echarts from 'echarts/lib/echarts' ;
import 'echarts/lib/chart/bar' ;
import 'echarts/lib/chart/line' ;
import 'echarts/lib/component/tooltip' ;
import 'echarts/lib/component/title' ;
import {RequireUtils,config} from 'utils';
import order from '../../assets/img/order.png' ;
import customer from '../../assets/img/customer.png' ;
import mycustomer from '../../assets/img/mycustomer.png' ;
import sale from '../../assets/img/sale.png' ;
import daichuliaccount from '../../assets/img/daichuliaccount.png' ;
import daichulicarlist from '../../assets/img/daichulicarlist.png' ;
import daichulideliver from '../../assets/img/daichulideliver.png' ;
import daichuliorder from '../../assets/img/daichuliorder.png' ;

const TabPane = Tabs.TabPane;
const Option = Select.Option;
class EchartHomepage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      prePrice:0,
      daichulidingdan:0,
      daishenhezhanghao:0,
      daochuliyundan:0,
      dingdanzongliang:0,
      fuwuchangzhan:0,
      kehushuliang:0,
      xiaoshouzongliang:0,
      zhixingchuchedan:0
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentDidMount() {
    var _this = this ;
    var priceip = RequireUtils.priceip ;
    RequireUtils.basePriceRequire('price/get-price',{},function (data) {
      if(data.code==1) {
        var price = data.data.price?data.data.price:0 ;
        _this.setState({
          prePrice:price
        })
      }
      else{
        _this.setState({
          prePrice:0
        })
      }
    }.bind(this));

    RequireUtils.baseRequire('/site/statistics',{},function (data) {
      if(data.code==1) {
          console.log(data);
        var data = data.data?data.data:{} ;
        _this.setState({
          date:data.charts.date,
          caigou:data.charts.caigou,
          xiaoliang:data.charts.xiaoliang,
          daichulidingdan:data.daichulidingdan,
          daishenhezhanghao:data.daishenhezhanghao,
          daochuliyundan:data.daochuliyundan,
          dingdanzongliang:data.dingdanzongliang,
          fuwuchangzhan:data.fuwuchangzhan,
          kehushuliang:data.kehushuliang,
          xiaoshouzongliang:data.xiaoshouzongliang,
          zhixingchuchedan:data.zhixingchuchedan,
        }) ;
          var myChart = echarts.init(document.getElementById('mytest'));
          var colors = ['#F7A789', '#65A4F4', '#4066B1'];
          var option = {
              color: colors,
              title: {
                  text: '销售与采购统计'
              },
              tooltip: {
                  trigger: 'axis',
                  axisPointer: {
                      type: 'cross',
                      label: {
                          // backgroundColor: 'rgb(215,216,218)'
                      }
                  }
              },

              // legend: {
              //     data:['销售量','采购量']
              // },
              // grid: {
              //     left: '3%',
              //     right: '4%',
              //     bottom: '3%',
              //     containLabel: true
              // },
              calculable : true,
              xAxis : [
                  {
                      type : 'category',
                      name : '日期',
                      boundaryGap : false,
                      // axisTick: {
                      //     alignWithLabel: true
                      // },
                      // axisLine: {
                      //     onZero: false,
                      //     lineStyle: {
                      //         color: 'rgb(92,96,105)'
                      //     }
                      // },
                      data : data.charts.date
                  }
              ],
              yAxis : [
                  {
                      type : 'value',
                      name : '量(吨)',
                  }
              ],
              series : [
                  {
                      name:'销售',
                      type:'line',
                      smooth:true,
                      stack: '总量',
                      lineStyle: {
                          color: colors[1]
                      },
                      // areaStyle: {normal: {}},//面积
                      data:data.charts.xiaoliang
                  },
                  {
                      name:'采购',
                      type:'line',
                      smooth:true,
                      stack: '总量',

                      lineStyle: {
                          color: colors[0]
                      },
                      // areaStyle: {normal: {}},//面积
                      data:data.charts.caigou
                  }
              ]
          };
          myChart.setOption(option)
      }
      else{
        _this.setState({
          daichulidingdan:0,
          daishenhezhanghao:0,
          daochuliyundan:0,
          dingdanzongliang:0,
          fuwuchangzhan:0,
          kehushuliang:0,
          xiaoshouzongliang:0,
          zhixingchuchedan:0
        })
      }
    }.bind(this));

/*   var myChart = echarts.init(document.getElementById('mytest')) ;*/

  }
  render() {
    const {
      prePrice,
      daichulidingdan,
      daishenhezhanghao,
      daochuliyundan,
      dingdanzongliang,
      fuwuchangzhan,
      kehushuliang,
      xiaoshouzongliang,
      zhixingchuchedan
    } = this.state ;
    return (
      <div  className="htf_homepage">
        <Row>
        </Row>
        <Row gutter={8} style={{ marginTop: '0px' }}>
          <Col span={24}>
              <div style={{padding:'25px 15px'}}>
                  <span style={{fontSize:'20px',fontWeight:'bold'}}>首页</span>
              </div>
          <Row>
            <Col span={4}>
              <div style={{textAlign:'center',height:'170px',background:'#ffffff'}}>
                <div style={{padding:'20px 0',borderBottom:'1px solid #EEEEEE'}}>
                    <span style={{display:'inline-block',width:'40px',height:'50px',opacity:'0.8'}}>
                      <img src={config.htfdingdan} style={{width:'100%',height:'100%'}}/>
                    </span>
                </div>
                <div style={{fontSize:'25px',fontWeight:'800',color:'#4A4A4A',padding:'5px 0 0 0 '}}>{dingdanzongliang}</div>
                <div style={{padding:'2px 0',color:'#9B9B9B',fontSize:'16px'}}>累计成交订单</div>
              </div>
            </Col>
            <Col span={4}>
              <div style={{textAlign:'center',height:'170px',background:'#ffffff'}}>
                <div style={{padding:'20px 0',borderBottom:'1px solid #EEEEEE'}}>
                    <span style={{display:'inline-block',width:'40px',height:'50px',opacity:'0.8'}}>
                      <img src={config.htfxiaoshouliang} style={{width:'100%',height:'100%'}}/>
                    </span>
                </div>
                <div style={{fontSize:'25px',fontWeight:'800',color:'#4A4A4A',padding:'5px 0 0 0 '}}>{xiaoshouzongliang}</div>
                <div style={{padding:'2px 0',color:'#9B9B9B',fontSize:'16px'}}>累积销售量(吨)</div>
              </div>
            </Col>
            <Col span={4}>
              <div style={{textAlign:'center',height:'170px',background:'#ffffff'}}>
                <div style={{padding:'20px 0',borderBottom:'1px solid #EEEEEE'}}>
                    <span style={{display:'inline-block',width:'40px',height:'50px',opacity:'0.8'}}>
                      <img src={config.htfkehu} style={{width:'100%',height:'100%'}}/>
                    </span>
                </div>
                <div style={{fontSize:'25px',fontWeight:'800',color:'#4A4A4A',padding:'5px 0 0 0 '}}>{kehushuliang}</div>
                <div style={{padding:'2px 0',color:'#9B9B9B',fontSize:'16px'}}>客户数量</div>
              </div>
            </Col>
            <Col span={4}>
              <div style={{textAlign:'center',height:'170px',background:'#ffffff'}}>
                <div style={{padding:'20px 0',borderBottom:'1px solid #EEEEEE'}}>
                     <span style={{display:'inline-block',width:'40px',height:'50px',opacity:'0.8'}}>
                      <img src={config.htffuwuzhan} style={{width:'100%',height:'100%'}}/>
                    </span>
                </div>
                <div style={{fontSize:'25px',fontWeight:'800',color:'#4A4A4A',padding:'5px 0 0 0 '}}>{fuwuchangzhan}</div>
                <div style={{padding:'2px 0',color:'#9B9B9B',fontSize:'16px'}}>累积服务场站</div>
              </div>
            </Col>
            <Col span={8}>
              <div style={{paddingLeft:'15px'}}>
                <div style={{textAlign:'center',height:'170px',background:'#ffffff'}}>
                  <div style={{padding:'20px 0 0 0'}}>
                     <span style={{display:'inline-block',width:'40px',height:'40px',opacity:'0.8'}}>
                      <img src={config.preyq} style={{width:'100%',height:'100%'}}/>
                    </span>
                  </div>
                  <div style={{padding:'3px'}}>
                    <p style={{fontSize:'26.5px',fontWeight:'800',marginTop:'10px',color:'#2783F9'}}>{prePrice}元/吨</p>
                    <div style={{marginBottom:'5px'}}></div>
                    <p style={{color:'#898F97',fontSize:'16px'}}>山东省到岸价预测</p>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row  style={{marginTop:'10px'}}>
              <Col span={16}>
                <div >
                  <div style={{textAlign:'center',padding:'10px',height:'413px',background:'#ffffff'}}>
                    <div id='mytest' style={{height:'100%'}}></div>
                  </div>
                </div>
              </Col>
              <Col span={8}>
                <div  style={{paddingLeft:'15px'}}>
                  <div  style={{marginBottom:'10px',padding:'3px'}}>
                    <Row>
                      <Col span={12}>
                        <div style={{textAlign:"center",background:'#ffffff',height:'90px',padding:'22px'}}>
                            <span style={{display:'inline-block',height:'45px',width:'45px',textAlign:'center'}}>
                              <img src={config.htfdaichuli} style={{width:'100%',height:'100%'}}/>
                            </span>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{background:'#FBFBFB',height:'90px',padding:'9px 0 9px 0'}}>
                          <div style={{marginLeft:'1px solid #ddd',height:'100%',borderLeft:'1px solid #ddd'}}>
                            <Link to="/orderlist">
                              <div style={{textAlign:'center'}}>
                                <p style={{color:'#FF6913',fontSize:'30px',fontWeight:'bold'}}>{daichulidingdan}</p>
                                <div>待处理订单</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <div style={{marginBottom:'10px',padding:'3px'}}>
                    <Row >
                      <Col span={12}>
                        <div style={{textAlign:"center",background:'#ffffff',height:'90px',padding:'22px'}}>
                            <span style={{display:'inline-block',height:'45px',width:'45px',textAlign:'center'}}>
                              <img src={config.htfdaichulichuche} style={{width:'100%',height:'100%'}}/>
                            </span>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{background:'#FBFBFB',height:'90px',padding:'9px 0 9px 0 '}}>
                          <div style={{marginLeft:'1px solid #ddd',height:'100%',borderLeft:'1px solid #ddd'}}>
                            <Link to="/exitlist">
                              <div style={{textAlign:'center'}}>
                                <p style={{color:'#FF6913',fontSize:'30px',fontWeight:'bold'}}>{zhixingchuchedan}</p>
                                <div>执行中的出车单</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div style={{marginBottom:'10px',padding:'3px'}}>
                    <Row>
                      <Col span={12}>
                        <div style={{textAlign:"center",background:'#ffffff',height:'90px',padding:'22px'}}>
                          <span style={{display:'inline-block',height:'45px',width:'45px',textAlign:'center'}}>
                            <img src={config.htfdaishenhe} style={{width:'100%',height:'100%'}}/>
                          </span>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{background:'#FBFBFB',height:'90px',padding:'9px 0 9px 0 '}}>
                          <div style={{marginLeft:'1px solid #ddd',height:'100%',borderLeft:'1px solid #ddd'}}>
                            <Link to="/EmployeeManagement">
                              <div style={{textAlign:'center'}}>
                                <p style={{color:'#FF6913',fontSize:'30px',fontWeight:'bold'}}>{daishenhezhanghao}</p>
                                <div>待审核账号</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                  <div style={{marginBottom:'10px'}}>
                    <Row>
                      <Col span={12}>
                        <div style={{}}>
                          <div style={{textAlign:"center",background:'#ffffff',height:'90px',padding:'19px'}}>
                            <span style={{display:'inline-block',height:'45px',width:'45px',textAlign:'center'}}>
                                {/*<Icon type="clock-circle-o" style={{fontSize:'40px'}}/>*/}
                              <img src={config.htfdaichuliyundan} style={{width:'100%',height:'100%'}}/>
                              {/* <img/>*/}
                            </span>
                          </div>
                        </div>
                      </Col>
                      <Col span={12}>
                        <div style={{background:'#FBFBFB',height:'90px',padding:'9px 0 9px 0 '}}>
                          <div style={{marginLeft:'1px solid #ddd',height:'100%',borderLeft:'1px solid #ddd'}}>
                            <Link to="/waybilllist">
                              <div style={{textAlign:'center'}}>
                                <p style={{color:'#FF6913',fontSize:'30px',fontWeight:'bold'}}>{daochuliyundan}</p>
                                <div style={{}}>待处理运单</div>
                              </div>
                            </Link>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </div>
              </Col>
          </Row>
          </Col>
        </Row>
      </div >
    )
  }
}
export default EchartHomepage;
