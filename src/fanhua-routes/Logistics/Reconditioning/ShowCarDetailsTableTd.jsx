import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Table,Switch } from 'antd';
// import mystyle from '../tablestyle.less'
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class ShowCarDetailsTableTd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tt:{
        key: '2',
        code:'9272653782755380',
        porder: '927265328342342342',
        exitorder:"92726342358349573",
        time:'2017-09-09',
        name: "黄冈气",
        allnum:'140吨',
        expople:'黄先生',
        extelephone:'15678989876',
        inplace:'湖北黄冈',
        inpople:"陈先生",
        intel:"15689077658",
        place:"湖北黄冈",
        linkpeople:"黄波",
        telephone:'15678907655',
        status:'运输中'
      }
    };
    this.callback = this.callback.bind(this);
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
    const {item}=this.props;

    return (
      <div>
        <div>
          <Row className={'table-first-line'}>
            <div >
              < Col span={21}>
                <div>
                  <span style={{marginRight:'5px'}}>运输单号</span>
                  <span style={{marginRight:'20px'}}>{item.code}</span>
                  <span style={{marginRight:'5px'}}>所属单号</span>
                  <span style={{marginRight:'20px'}}>{item.porder}</span>
                  <span style={{marginRight:'5px'}}>出车单号</span>
                  <span style={{marginRight:'10px'}}>{item.exitorder}</span>
                </div>
              </Col>
              < Col span={3}>
                <div style={{textAlign:'right'}}>
                  <div style={{textAlign:'right'}}><span>{item.time}</span></div>
                </div>
              </Col>
            </div>
          </Row>
          <Row className={'table-other-line'} type="flex" align="middle">
            <Col span={2}>{item.name}</Col>
            <Col span={2}>{item.allnum}</Col>
            <Col span={6}>
              <div>派单联系人</div>
              <div><span style={{marginRight:'10px'}}>{item.expople}</span><span>{item.extelephone}</span></div>
            </Col>
            <Col span={6}>
              <div>装车地 {item.inplace}</div>
              <div><span style={{marginRight:'10px'}}>{item.inpople}</span><span>{item.intel}</span></div>
            </Col>
            <Col span={6}>
              <div>卸车地 {item.place}</div>
              <div><span style={{marginRight:'10px'}}>{item.linkpeople}</span><span>{item.telephone}</span></div>
            </Col>
            <Col span={2}>{item.status}</Col>
          </Row>
        </div>
      </div >
    )
  }
}
export default ShowCarDetailsTableTd;
