import React from 'react'
import { Link } from 'react-router'

export default class Option extends React.Component {
  render() {

    return (
        <ul className="option">
            <li className="bd active"><a href="javascript:;">榜单</a></li>
            <li className="qs"><a href="javascript:;">趋势</a></li>
        </ul>
    )
  }
}

