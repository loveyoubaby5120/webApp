import React from 'react'
import { Link } from 'react-router'

export default class Top extends React.Component {

    constructor(props) {
        super(props);
         this.state = {
            datas: [{"time":"--","gzhCount":'--',"artCount":'--',"readSum":'--'}],
            show: this.props.show
        };
    }

    componentDidMount(){
      $('.logo .search .left').click(function(){
          // window.location.reload();
          window.location.href = '/index'
      });
    }

     onChangeShow(val,event){
        var newState = val;
        this.setState({
            show: newState
        });
        this.props.callbackParent(newState);
    }

    render() {
      return (
         <div className="logo">
          <div className="search">
              <div style={{'cursor': 'pointer'}}>
                  <span className="left"></span><span className="right">微信公众号排行榜</span>
              </div>
              <div className="right_div">
                <span className="end_time">数据截止&nbsp;&nbsp;&nbsp;{new Date().format('yyyy年MM月dd日')}</span>
                <span className="introducing" onClick={this.onChangeShow.bind(this,true)}>
                    <span className='document'>?</span>&nbsp;数据说明
                </span>
              </div>
          </div>
      </div>
      )
    }
}


Date.prototype.format = function (format) {
    var date = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S+": this.getMilliseconds()
    };
    if (/(y+)/i.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in date) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? date[k] : ("00" + date[k]).substr(("" + date[k]).length));
        }
    }
    return format;
};