webpackJsonp([0,3],[
/* 0 */
/***/ function(module, exports) {

	import React from 'react';
	import { render } from 'react-dom';

	class HelloWord extends React.Component {

		render() {
			return React.createElement(
				'p',
				{ ref: 'childp' },
				'Hello,',
				function (obj) {

					if (obj.props.name) {
						return obj.props.name;
					} else {
						return "world";
					}
				}(this),
				'      ',
				React.createElement(
					'a',
					{ href: '/other' },
					'go to other'
				)
			);
		}
	}

	// var HelloWord = React.createClass({
	// 	render: function(){
	// 		return <p ref='childp'>Hello,{(function(obj){

	// 			if(obj.props.name){
	// 				return obj.props.name;
	// 			}
	// 			else{
	// 				return "world";
	// 			}

	// 		})(this)}      <a href='/other'>go to other</a></p>;
	// 	}
	// });

	render(React.createElement(HelloWord, null), document.getElementById('app'));

	// module.exports.HelloWord = HelloWord;

/***/ }
]);