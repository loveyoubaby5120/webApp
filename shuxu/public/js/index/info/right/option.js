import React from 'react'
import { Link } from 'react-router'

export default class Option extends React.Component {

	constructor(props) {
        super(props);
		this.state = {
			initChildShow: this.props.initChildShow
		};
    }

    onChangeShow(val,event){
	    var newState = val;
	    this.setState({
	    	initChildShow: newState
	    });
	    this.props.callbackParent(newState);
  	}


  	render() {

	    return (
	        <ul className="option">
	            <li className={this.state.initChildShow=='bd_more' ? "bd active" : "bd"} onClick={this.onChangeShow.bind(this,'bd_more')}><a href="javascript:;" >榜单</a></li>
	            <li className={this.state.initChildShow=='qs_more' ? "qs active " : "qs"} onClick={this.onChangeShow.bind(this,'qs_more')}><a href="javascript:;">趋势</a></li>
	        </ul>
	    )
  	}
}

