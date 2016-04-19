/** @jsx React.DOM */

var React = require('react');


var HelloWord = React.createClass({
	render: function(){
		return <p ref='childp'>Hello,{(function(obj){

			if(obj.props.name){
				return obj.props.name;
			}
			else{
				return "world";
			}

		})(this)}</p>;
	}
});


// ReactDOM.render(
//   <HelloWord />,
//   document.getElementById('app')
// );


module.exports.HelloWord = HelloWord;

