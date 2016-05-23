import React from 'react'
import { Link } from 'react-router'

export default class Chart extends React.Component {
  render() {

    return (
		<div className="chart">
            <ul>
                <li className="item first"><a href="javascript:;">话题传播数量趋势</a></li>
                <li className="item active"><a href="javascript:;">题舆论走势</a></li>
                <li className="item"><a href="javascript:;">话题脉搏</a></li>
            </ul>

            <div id="main" style={{width: '530px',height:'400px'}}></div>
        </div>
    )
  }
}

