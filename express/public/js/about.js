// /** @jsx React.DOM */

// var React = require('react');


var HelloAbout = React.createClass({
	render: function(){
		return <p ref='childp'>Hello,{(function(obj){

			if(obj.props.name){
				return obj.props.name;
			}
			else{
				return "about";
			}

		})(this)}      <a href='/'>go to index</a></p>;
	}
});


ReactDOM.render(
  <HelloAbout />,
  document.getElementById('app')
);


// module.exports.HelloAbout = HelloAbout;

