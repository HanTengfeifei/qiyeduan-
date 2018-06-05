import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Carousel } from 'antd';
import {RequireUtils} from 'utils';
import {config} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Advertisting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }

  }

  componentWillMount(){
  }
  componentDidMount(){

  }
  componentWillReceiveProps(){
  }
  render() {
    return (
      <div>
        <div
          style={{width: "100%", height: "200px",marginTop:5}}>
          <img style={{width: "100%", height: "200px"}} src={config.later} alt="加载错误"/>
        </div>
      </div>
    )
  }
}
export default Advertisting;
