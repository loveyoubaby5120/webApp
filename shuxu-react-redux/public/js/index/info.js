import React from 'react'
import { Link } from 'react-router'
import Left from './info/left.js'
import Right from './info/right.js'

export default class Info extends React.Component {
	constructor(props) {
        super(props);
		this.state = {
			gzh_id: 0
		};
    }


    onChildChanged(newState){
	    this.setState({
			gzh_id: newState
		});

	}

  	render() {

	    return (
	        <div className="info">
		        <Left gzh_id={this.state.gzh_id} callbackParent={this.onChildChanged.bind(this)}></Left>
		        <Right gzh_id={this.state.gzh_id} ></Right>
	        </div>
	    )
  	}
}

