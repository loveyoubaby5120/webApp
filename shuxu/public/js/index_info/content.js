import React from 'react'
import { Link } from 'react-router'
import Info from './info.js'

export default class Content extends React.Component {
  render() {

    return (
        <div className="content">
        	<Info></Info>
        	<div class="go_top" id="go_top" onclick="myScroll()"></div>
        </div>
    )
  }
}

