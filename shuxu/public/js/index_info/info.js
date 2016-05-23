import React from 'react'
import { Link } from 'react-router'
import Left from './info/left.js'
import Right from './info/right.js'

export default class Info extends React.Component {
  render() {

    return (
        <div className="info">
	        <Left></Left>
	        <Right></Right>
        </div>
    )
  }
}

