import React from 'react';
import { Card, Row, Col, Tabs, Icon, Button, Radio, Select,Carousel } from 'antd';
import './Head.less';
import './Brand.less';


import {RequireUtils} from 'utils';
const TabPane = Tabs.TabPane;
const Option = Select.Option;

class Brand extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      banner: [],
    }
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentWillMount(){
  }
  componentDidMount(){
    console.log(5555555);
    console.log(this.props.banner);
  }
  componentWillReceiveProps(){
  }
  findRoleAll(){
    var context=this;
    // RequireUtils.baseRequire('person/person-info',{},function (data) {
    //     if(data.code==1) {
    //       this.setState({
    //         info:data.data.info
    //       });
    //       localStorage.setItem('company_id', data.data.info.company_id);
    //       console.log(this.state.info);
    //     }
    //     else{
    //       alert("获取用户信息失败！");
    //     }
    // }.bind(this));

  }
  render() {
    const style={ width: "100%" ,height: "auto" };
   /* const urls=this.props.banner;*/
   /* console.log(urls[0].banner_url);*/
    return (
      <div>
        <Carousel autoplay
          // style={{ width: "100%" }}
        >{
          this.props.banner.map((item) => {
            return <div style={style}><img style={
              {width: '100%', height: "auto"}
              // { width: 'auto' ,height: "auto" ,maxWidth:"100%",
              //   // maxHeight:"100%"
              // }
            } src={item.banner_img} alt="加载错误"/>
            </div>
          })
        }
        </Carousel>
      </div>
    )
  }
}
export default Brand;
