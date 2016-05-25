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


  	render() {

	    return (
	        <div className="right">
	        	<Option></Option>
	        	<Bd_more show={this.state.show}></Bd_more>
	        	<Qs_more show={this.state.show}></Qs_more>
	        </div>
	    )
  	}
}

