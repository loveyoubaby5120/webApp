import React from 'react'
import { Link } from 'react-router'
import Right from './right.js'


export default class Info extends React.Component {
  render() {

    return (
        <div className="qs_info">
	        <Right type={this.props.type}></Right>
        </div>
    )
  }
}

