import React from 'react'
import { Link } from 'react-router'
import Option from './right/option.js'
import Bd_more from './right/bd_more.js'
import Qs_more from './right/qs_more.js'

export default class Info_Right extends React.Component {
	constructor(props) {
        super(props);
		this.state = {
			show: 'qs_more'
		};

    }

    onChildChanged(newState){

    	this.setState({
	    	show: newState
	    });
	}


  	render() {

	    return (
	        <div className="right">
	        	<Option initChildShow={this.state.show} callbackParent={this.onChildChanged.bind(this)}></Option>
	        	<Bd_more show={this.state.show} type={this.props.type} show_2={this.props.show} callbackParent={this.props.callbackParent}></Bd_more>
	        	<Qs_more show={this.state.show} type={this.props.type}></Qs_more>
	        </div>
	    )
  	}
}

