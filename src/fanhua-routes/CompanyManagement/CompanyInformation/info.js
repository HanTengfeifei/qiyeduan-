import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select } from 'antd';

import './Homepage.less';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Info extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  render() {

    return (
      <div>
vfdd
      </div>
    )
  }
}
export default Info;
