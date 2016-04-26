webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(32);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var HelloWord = _react2.default.createClass({
		displayName: 'HelloWord',

		render: function render() {
			return _react2.default.createElement(
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
				_react2.default.createElement(
					'a',
					{ href: '/other' },
					'go to other'
				)
			);
		}
	});

	(0, _reactDom.render)(_react2.default.createElement(HelloWord, null), document.getElementById('app'));

	// module.exports.HelloWord = HelloWord;

/***/ }
]);