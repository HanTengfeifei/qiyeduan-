import React from 'react';
import reqwest from  'reqwest';
import './Form.less';
import {Input ,  Row, Col ,message  } from 'antd';
import {RequireUtils} from 'utils';
class UserEdit extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      form: {
        user_name: {
          valid: false,
          value: '',
          error: ''
        },
        user_wechat: {
          valid: false,
          value: '',
          error: ''
        },
        user_phone1: {
          valid: false,
          value: '',
          error: ''
        },
        user_phone2: {
            valid: false,
            value: '',
            error: ''
        },
        // user_mobile: {
        //   valid: false,
        //   value: '',
        //   error: ''
        // },
      },

    };
    this.handleSubmit=this.handleSubmit.bind(this);
    this.handleValueChange=this.handleValueChange.bind(this);
  }
  componentDidMount (){
    const info =this.props.info;
    var phone = info.user_phone.split('-');

    const {form} = this.state;
    this.setState({
      form: {
        user_name: {
          valid: true,
          value: info.user_name,
          error: ''
        },
        user_wechat: {
          valid: true,
          value: info.user_wechat,
          error: ''
        },
        user_phone1: {
          valid: true,
          value: phone[0],
          error: ''
        },
        user_phone2: {
          valid: true,
          value: phone[1],
          error: ''
        },
        // user_mobile: {
        //   valid: true,
        //   value: info.user_mobile,
        //   error: ''
        // },
      },

    });
    }
  componentWillReceiveProps (){
    const info =this.props.info;
    var phone1='';
    var phone2='';
    if(info.user_phone){
        var phone = info.user_phone.split('-');
        phone1 = phone[0];
        phone2 = phone[1];
    }

    const {form} = this.state;
    this.setState({
      form: {
        user_name: {
          valid: true,
          value: info.user_name,
          error: ''
        },
        user_wechat: {
          valid: true,
          value: info.user_wechat,
          error: ''
        },
        user_phone1: {
          valid: true,
          value: phone1,
          error: ''
        },
        user_phone2: {
            valid: true,
            value: phone2,
            error: ''
        },
        // user_mobile: {
        //   valid: true,
        //   value: info.user_mobile,
        //   error: ''
        // },
      },

    });
    }
//改变menu值
  handleValueChange (field, value, type = 'string') {
    if (type === 'number') {
      value = +value;
    }
    const {form} = this.state;

    const newFieldObj = {value, valid: true, error: ''};

    switch (field) {
      case 'user_name': {
        if (value.length >= 11) {
          newFieldObj.error = '用户名最多10个字符';
          newFieldObj.valid = false;
        } else if (value.length === 0) {
          newFieldObj.error = '请输入角色名';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'user_wechat': {
        if (value.length > 20 || value <= 0) {
          newFieldObj.error = '请输入1~20个字符';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'user_phone1': {
        if (value.length !==4) {
          newFieldObj.error = '请输入4个数字';
          newFieldObj.valid = false;
        }
        break;
      }
      case 'user_phone2': {
            if (value.length !==8) {
                newFieldObj.error = '请输入8个数字';
                newFieldObj.valid = false;
            }
            break;
      }
      // case 'user_mobile': {
      //   if (value.length !==11) {
      //     newFieldObj.error = '请输入11个数字';
      //     newFieldObj.valid = false;
      //   }
      //   break;
      // }
    }

    this.setState({
      form: {
        ...form,
        [field]: newFieldObj
      }
    });
  }



  handleSubmit (e) {
    e.preventDefault();
    const  info=this.props.info;
    const {form: {user_name,user_wechat,user_phone1,user_phone2,user_mobile}} = this.state;

    if (!user_wechat.valid || !user_name.valid||!user_phone1.valid||!user_phone2.valid||!user_mobile.valid ) {
      alert('请填写正确的信息后重试!');
      return;
    }
    var phone = user_phone1.value+'-'+user_phone2.value;

    RequireUtils.baseRequire('person/modify-info',{id: info.id,
      user_name:user_name.value,
      user_wechat:user_wechat.value,
      user_phone:phone,
      user_mobile:user_mobile.value,
    },function (data) {
        if (data.code==1)
        {
          message.success(data.msg);
          this.props.sent();
        }
        else{
          message.error("提交失败!");
        }
    }.bind(this));
  }

  render () {
    const {form: {user_name,user_wechat,user_phone1,user_phone2,user_mobile}} = this.state;
    return (
      <div>
        <main>
          <form>
            <Row gutter={4}>
              <Col span={4}>

                <label className="dec">真实姓名：</label>
              </Col>
              <Col span={16}>
                <Input
                  type="text"
                  value={user_name.value}
                  onChange={(e) => this.handleValueChange('user_name', e.target.value)}
                />
              </Col>
            </Row>
              <Row gutter={4}>
                  <Col span={4}>
                  </Col>
                  <Col span={16}>
                      {!user_name.valid && <span style={{color:"red"}}>{user_name.error}</span>}
                  </Col>
              </Row>
            <br/>
            <Row gutter={4}>
              <Col span={4}>
                <label className="dec">绑定微信：</label>
              </Col>
              <Col span={16}>
                <Input
                  type="text"
                  value={user_wechat.value || ''}
                  onChange={(e) => this.handleValueChange('user_wechat', e.target.value, 'string')}
                  placeholder='打开微信--点击“我"查看微信号'
                />
              </Col>

            </Row>
              <Row gutter={4}>
                  <Col span={4}>
                  </Col>
                  <Col span={16}>
                      {!user_wechat.valid && <span style={{color:"red"}}>{user_wechat.error}</span>}
                  </Col>
              </Row>
            <br/>
            <Row gutter={4}>
              <Col span={4}>
                <label className="dec">办公电话：</label>
              </Col>
              <Col span={5}>
                <Input
                  type="text"
                  value={user_phone1.value || ''}
                  onChange={(e) => this.handleValueChange('user_phone1', e.target.value, 'string')}
              />
            </Col>
            <Col span={1} style={{marginTop:'4px'}}><span > — </span></Col>
            <Col span={10}>
                <Input
                    type="text"
                    value={user_phone2.value || ''}
                    onChange={(e) => this.handleValueChange('user_phone2', e.target.value, 'string')}
                />
            </Col>

            </Row>
              <Row gutter={4}>
                  <Col span={4}>
                  </Col>
                  <Col span={5}>
                      {!user_phone1.valid && <span style={{color:"red"}}>{user_phone1.error}</span>}
                  </Col>
                  <Col span={1}></Col>
                  <Col span={10}>
                      {!user_phone2.valid && <span style={{color:"red"}}>{user_phone2.error}</span>}
                  </Col>
              </Row>
            {/*<br/>*/}
            {/*<Row gutter={4}>*/}
              {/*<Col span={4}>*/}
                {/*<label className="dec">登录手机：</label>*/}
              {/*</Col>*/}
              {/*<Col span={16}>*/}
                {/*<Input*/}
                  {/*type="text"*/}
                  {/*value={user_mobile.value || ''}*/}
                  {/*onChange={(e) => this.handleValueChange('user_mobile', e.target.value, 'string')}*/}
              {/*/>*/}
            {/*</Col>*/}
            {/*</Row>*/}
              {/*<Row gutter={4}>*/}
                  {/*<Col span={4}>*/}
                  {/*</Col>*/}
                  {/*<Col span={16}>*/}
                      {/*{!user_mobile.valid && <span style={{color:"red"}}>{user_mobile.error}</span>}*/}
                  {/*</Col>*/}
              {/*</Row>*/}
            <br/>
          </form>
        </main>
      </div>
    );
  }
}

export default UserEdit;
