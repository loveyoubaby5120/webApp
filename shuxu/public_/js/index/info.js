import React from 'react'
import { Link } from 'react-router'
import Left from './info/left.js'
import Right from './info/right.js'

export default class Info extends React.Component {
	constructor(props) {
        super(props);
		this.state = {
			type: 0
		};
    }


    onChildChanged(newState){
	    this.setState({
			type: newState
		});

	}

  	render() {

	    return (
	        <div className="info">
		        <Left type={this.state.type} callbackParent={this.onChildChanged.bind(this)}></Left>
		        <Right type={this.state.type} ></Right>
	        </div>
	    )
  	}
}

