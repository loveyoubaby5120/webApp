"use strict";

// /** @jsx React.DOM */

// var React = require('react');

var HelloWord = React.createClass({ displayName: "HelloWord",
	render: function render() {
		return React.createElement("p", { ref: "childp" }, "Hello,", function (obj) {

			if (obj.props.name) {
				return obj.props.name;
			} else {
				return "world";
			}
		}(this), "      ", React.createElement("a", { href: "/about" }, "go to about"));
	}
});

ReactDOM.render(React.createElement(HelloWord, null), document.getElementById('app'));

// module.exports.HelloWord = HelloWord;