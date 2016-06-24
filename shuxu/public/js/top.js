import React from 'react'
import { Link } from 'react-router'

export default class Top extends React.Component {

    componentDidMount(){
      $('.logo .search>div').click(function(){
          // window.location.reload();
          window.location.href = '/index'
      });
    }

    render() {

      return (
         <div className="logo">
          <div className="search">
              <div style={{'cursor': 'pointer'}}>
                  <span className="left"></span><span className="right">微信公众号排行榜</span>
              </div>
              <div className="right_div">
              </div>
          </div>
      </div>
      )
    }
}

