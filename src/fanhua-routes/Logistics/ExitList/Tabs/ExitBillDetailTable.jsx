import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch,Modal } from 'antd';
import ExitWayBillDetailTd from './ExitWayBillDetailTd' ;
import ExitWayBillDetailChildrenTd from './ExitWayBillDetailChildrenTd' ;

import tablestyle from '../tablestyle.less';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ExitBillDetailTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
    this.callback = this.callback.bind(this);
  }

  componentDidMount(){
    var _this = this ;
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


  render() {
    const {datas,cars,go,_pthis}=this.props;
    const columns = [{
      title: '',
      dataIndex: 'order',
      key: 'order',
      render: (text, record) => (
        <ExitWayBillDetailTd item = {record} go={go} _pthis = {_pthis}></ExitWayBillDetailTd>
      )
    }];
    const item = datas[0] ?datas[0]:{};
    return (
      <div>
        <div style={{marginBottom:'10px',background:'#fff',border:'1px solid #ddd'}}>
          <Row className={'table-first-line'} style={{background:'#f7f7f7'}}>
            <div style={{color:'#898F97'}}>
              < Col span={18}>
                <div style={{textAlign:'left',whiteSpace: 'nowrap'}}>
                  <span style={{marginRight:'5px'}}>运单编号</span>
                  <span style={{marginRight:'20px'}}>{item.deliver_code}</span>
                  <span style={{marginRight:'5px'}}>所属订单</span>
                  <span style={{marginRight:'20px'}}>{item.order_code}</span>
                </div>
              </Col>
              < Col span={6}>
                <div style={{textAlign:'right'}}>
                  <span style={{marginRight:'5px'}}>到站时间</span>
                  <span style={{marginRight:'10px'}}>{item.dispatch_date}</span>
                </div>
              </Col>
            </div>
          </Row>
          <Row>
            <div style={{color:'#6C6C6C',fontSize:'18px',padding:'15px 10px'}}>
              订单状态：{item.status_name}
            </div>
          </Row>
        </div>
        <Row>
          <div style={{padding:'0 18px',fontSize: '16px',color: 'black', marginBottom: '10px'}}>商品信息
          </div>
        </Row>
        <Card>

          <Row style={{paddingBottom:'5px',borderBottom:'1px solid rgb(234, 226, 226)'}} className={'ccd-yundan-title'}>
            <div style={{padding:'0 15px'}}>
              < Col span={5}>
                <div className={'my-center'}>
                  商品名称
                </div>
              </Col>
              < Col span={3}>
                <div className={'my-center'}>
                  数量
                </div>
              </Col>
              < Col span={4}>
                <div className={'my-center'}>
                  派单联系人
                </div>
              </Col>
              < Col span={6}>
                <div className={'my-center'}>
                  装车地及联系人
                </div>
              </Col>
              < Col span={6}>
                <div className={'my-center'}>
                  卸车地及联系人
                </div>
              </Col>
            </div>
          </Row>
          <Table
            className={'no-padding'}
            showHeader={false}
            columns={columns}
            dataSource={datas}
            pagination={{ position: 'none' }}
            bordered={false}
          />
        </Card>
        <Row>
          <div style={{padding:'10px 18px',fontSize: '16px',color: 'black'}}>车辆信息
          </div>
        </Row>
        <div>
          {cars.map(function (item,index) {
            return <Card style={{marginBottom:'10px'}}>
              <div style={{background:'#fff',padding:''}} >
                <Row style={{paddingBottom:'5px',borderBottom:'1px solid rgb(234, 226, 226)'}} className={'ccd-yundan-title'}>
                  <div style={{padding:'0 15px'}}>
                    < Col span={5}>
                      <div className={'my-center'}>
                        出车单编号
                      </div>
                    </Col>
                    < Col span={3}>
                      <div className={'my-center'}>
                        运载量
                      </div>
                    </Col>
                    < Col span={3}>
                      <div className={'my-center'}>
                        车头
                      </div>
                    </Col>
                    < Col span={3}>
                      <div className={'my-center'}>
                        车挂
                      </div>
                    </Col>
                    < Col span={4}>
                      <div className={'my-center'}>
                        联系人
                      </div>
                    </Col>
                    < Col span={3}>
                      <div className={'my-center'}>
                        装车时间
                      </div>
                    </Col>
                    < Col span={3}>
                      <div className={'my-center'}>
                        卸车时间
                      </div>
                    </Col>
                  </div>
                </Row>
              </div>
            <ExitWayBillDetailChildrenTd item={item}  go={go} _pthis = {_pthis} key={index} style={{ margin: 0 }}></ExitWayBillDetailChildrenTd>
            </Card>
          })}
        </div>
      </div>
    )
  }
}
export default ExitBillDetailTable;
