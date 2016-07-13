import React from 'react'
import { Link } from 'react-router'
import Left from './left.js'
import Right from './right.js'


export default class Info extends React.Component {
  render() {

    return (
        <div className="qs_info">
	        <Left type={this.props.type}></Left>
	        <Right type={this.props.type}></Right>
        </div>
    )
  }
}

