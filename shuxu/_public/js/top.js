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
                <span className="end_time">数据截止 2016年7月10日</span>
                <span className="introducing" onClick={this.onChangeShow.bind(this,true)}>
                    <span className='document'>?</span>&nbsp;数据说明
                </span>
              </div>
          </div>
      </div>
      )
    }
}

