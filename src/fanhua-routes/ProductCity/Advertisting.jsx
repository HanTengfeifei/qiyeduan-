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


  componentDidMount(){

  }
  componentWillReceiveProps(){
  }
  render() {
    return (
      <div>
        <div
          style={{width: "50%", height: "134px",marginLeft:"25%",marginTop:200}}>
          <img style={{width: "100%", height: "134px"}} src={config.adSrc} alt="加载错误"/>
        </div>
      </div>
    )
  }
}
export default Advertisting;
