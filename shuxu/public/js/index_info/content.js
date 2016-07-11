import React from 'react'
import { Link } from 'react-router'
import Info from './info.js'

export default class Content extends React.Component {



  render() {

    return (
        <div className="content">
        	<Info gzh_id={this.props.gzh_id}></Info>
        	<div className="go_top" id="go_top"></div>
        </div>
    )
  }
}

