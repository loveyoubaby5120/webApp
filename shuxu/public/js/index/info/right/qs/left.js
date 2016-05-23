import React from 'react'
import { Link } from 'react-router'


export default class Left extends React.Component {
  render() {

    return (
        <ul className="qs_left">
            <li className="title bzrc">本周热词</li>
            <li className="jtb"></li>
            <li className="item top"><a href="javascript:;">题舆论走势</a></li>
            <li className="item active"><a href="javascript:;">互联网+</a></li>
            <li className="item"><a href="javascript:;">题舆论走势</a></li>
            <li className="item"><a href="javascript:;">题舆论走势</a></li>
            <li className="title dzbq">定制标签</li>
            <li className="jtb"></li>
            <li className="item top"><a href="javascript:;">题舆论走势</a></li>
            <li className="item"><a href="javascript:;">题舆论走势</a></li>
            <li className="item"><a href="javascript:;">题舆论走势</a></li>
            <li className="item"><a href="javascript:;">题舆论走势</a></li>
        </ul>
    )
  }
}

