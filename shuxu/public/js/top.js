import React from 'react'
import { Link } from 'react-router'

export default class Top extends React.Component {
  render() {

    return (
       <div className="logo">
        <div className="search">
            <div>
                <span className="left">微信公众号</span><span className="right">排行榜</span>
            </div>
            <div className="right_div">
                <input type="text" placeholder="请输入微信公众号id,名称" />
                <i></i>
            </div>
        </div>
    </div>
    )
  }
}

