import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Input,DatePicker,message,Upload } from 'antd';
import { Divider } from 'antd';
import mystyle from './tabstyle.less';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class TradeAddSelect extends  React.Component{
  render() {
    var {params} = this.props ;
    var data = [{value:"jack",text:"jack"},{value:"lucy",text:"lucy"},{value:"tom",text:"tom"}] ;
    return (
      <div>
        <Row gutter={8}>
          <Col >
            {params.title}<Select
            showSearch
            style={{ width: '100%' }}
            placeholder="Select a person"
            optionFilterProp="children"
            filterOption={(input, option) => option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
          >
            {
              data.map((item, index) => (
                <Option value={item.value} key={index}>{item.text}</Option>
              ))
            }
          </Select>
          </Col>
        </Row>
      </div>
    )
  }
}
export default TradeAddSelect;
