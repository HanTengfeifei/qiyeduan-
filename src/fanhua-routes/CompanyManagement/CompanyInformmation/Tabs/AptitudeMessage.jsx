import React from 'react';
import { Card, Row, Col, Tabs,Table, Icon, Button, Radio, Select,message } from 'antd';
import {RequireUtils} from 'utils';
import { Divider } from 'antd';

class AptitudeMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }
  componentDidMount(){
    RequireUtils.baseRequire('company/cert-list',{},function (data) {
      if(data.code==1) {
        this.setState({
          data:data.data.list,
        });
        }
      else{
        message.error(data.msg);
      }
    }.bind(this));
  }
  render() {
    const {data}=this.state;
    const columns = [{
      title: '资质名称',
      dataIndex: 'cert_name',
      key: 'cert_name'
    }, {
      title: '认证说明',
      dataIndex: 'cert_desc',
      key: 'cert_desc',
    }, {
      title: '认证状态',
      dataIndex: 'flag_name',
      key: 'flag_name',
      // render: (text, record) => {
      //   return <span>
      //
      //               <a href="#"><Icon type="edit"/>编辑</a>
      //           </span>
      // },
    },
      {
      title: '操作',
      key: 'action',
        render: (text, record) => {
        if(parseInt(record.cert_flag)>0)
          return  <div>
            <span>
            <a href="#"><Icon type="edit"/>重新上传</a>
            </span>
            <span>
            <a href="#"><Icon type="edit"/>编辑</a>
            </span>
          </div>
          else{
            return <span>
               <a href="#"><Icon type="edit"/>上传</a>
            </span>
        }
        },
    }];
    return (
      <div className={'my-table-title-zz-center my-custom-padding'}>
        <Table columns={columns} dataSource={data} />
      </div >
    )
  }
}
export default  AptitudeMessage;
