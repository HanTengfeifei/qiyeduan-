import React from 'react';
import {  Tabs, Select,Rate } from 'antd';
import mystyle from './tabstyle.less' ;
import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class MyButton extends React.Component {
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
    const {rate} = this.props ;
    return (
      <div style={{marginBottom:'5px'}} className={'my-custom-star'}>
        <div>
          <span  style={{fontWeight:'bold',fontSize:'15px',color:'black'}}><span>{rate.company_name} </span><span>{rate.user_name}</span></span>
          <span style={{float:'right'}}><Rate disabled  value={Number(rate.comment_rank)} /></span>
        </div>
        <div style={{color:'rgb(167,165,167)'}}>
          <span style={{wordBreak:'break-all'}}>{rate.comment_text}</span>
          <span style={{float:'right'}}>{rate.comment_date}</span>
        </div>
      </div>
    )
  }
}
export default MyButton;
