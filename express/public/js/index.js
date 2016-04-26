import React from 'react'
import { render } from 'react-dom'

var HelloWord = React.createClass({
	render: function(){
		return <p ref='childp'>Hello,{(function(obj){

			if(obj.props.name){
				return obj.props.name;
			}
			else{
				return "world";
			}

		})(this)}      <a href='/other'>go to other</a></p>;
	}
});


render(
  <HelloWord />,
  document.getElementById('app')
);


// module.exports.HelloWord = HelloWord;

