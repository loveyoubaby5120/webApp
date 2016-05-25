import React from 'react'
import { Link } from 'react-router'
import $ from 'jquery'

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
	    console.log(event);
	    console.log(event.target);
        $('.option li').removeClass('active');
        // $(this).addClass('active');
  }


  	render() {

	    return (
	        <ul className="option">
	            <li className="bd active" onClick={this.onChangeShow.bind(this,'bd_more')}><a href="javascript:;" >榜单</a></li>
	            <li className="qs" onClick={this.onChangeShow.bind(this,'qs_more')}><a href="javascript:;">趋势</a></li>
	        </ul>
	    )
  	}
}

