import React from 'react';
import { Row, Col,Select,Form,Input,DatePicker,Button,Icon,Radio,Table,Upload,message } from 'antd';
import { Map,Polyline,Markers } from 'react-amap';
import stationpic from '../../../assets/img/mapcar.png'
import moment from 'moment';
import {RequireUtils} from 'utils';
const RadioGroup = Radio.Group;
const createForm = Form.create;
const FormItem = Form.Item;
const Option = Select.Option;

function noop() {
  return false;
}


class zdbdList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    };
    this.callback = this.callback.bind(this);
  }
  callback(key) {
    console.log(key);
  }

  componentDidMount() {

  }

  renderMarkerFn=(extData)=>{
    const url = 'url('+stationpic + ')' ;
    return <div style={{position:'relative'}}>
               <div style={{position:'absolute',textAlign:'center',top:'10px',left:'-60px',transform: 'translateY(-100%)'}}>
                 <div style={{background:'white',width:'180px',padding:'10px',fontSize:'16px',color:'#929090'}}>
                   <div>{extData.position.marktitle}</div>
                   <div>{extData.position.station}</div>
                 </div>
                 <div style={{verticalAlign:'top',width:0,height:0,borderLeft:'5px solid transparent',display:"inline-block",borderRight:'10px solid transparent',borderTop:'12px solid white'}}></div>
               </div>
              <div style={{width:'56px',height:'56px',background:url,position:'relative'}}></div>
            </div>
        } ;
  render() {
    const mapdata = this.props.mapdata ;
    const marksdata = mapdata.map(function (item) {
      var obj = {} ;
      obj.position = item ;
      return obj ;
    }) ;

    return (
      <div className={'my-custom-padding'}>
        <main>
          <Form >
            <div style={{width:'100%',height:'400px'}}>
              <Map >
                <Polyline
                  style={{strokeColor:'red'}}
                  path={ mapdata }
                />
                <Markers
                  render={this.renderMarkerFn}
                  markers={marksdata}
                />
              </Map>
            </div>
          </Form>
        </main>
      </div >
    )
  }
}
zdbdList = createForm()(zdbdList);
export default zdbdList;
