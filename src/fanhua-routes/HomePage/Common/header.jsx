import React from 'react';
import './header.less';
import reqwest from 'reqwest';

import style from './header.less';


class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name:"韩腾飞",
          job:"web前端",
          company:"凡华科技有限公司"
        };
        this.handleImageSrc=this.handleImageSrc.bind(this);
    }
   callback(){

   }
   handleImageSrc(){
      this.setState({
        src:"https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      })
   }

    render() {
const {user_name,role_name, company_name,user_head}=this.props.info;
const{src}=this.state;

        return (
            <div className="container my-header">
               <div href="" className="left">
               <img src={user_head} alt="加载错误!" onError={(e)=>{e.target.src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"}} />
               </div>
               <div className="right" style={{color:"white"}}>
               <p>{user_name }</p>
               <p>{role_name}</p>
               <p>{company_name}</p>
               </div>
            </div>
        );
    }
}
export default Header;
