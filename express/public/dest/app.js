webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(32);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var HelloWord = function (_React$Component) {
		_inherits(HelloWord, _React$Component);

		function HelloWord() {
			_classCallCheck(this, HelloWord);

			return _possibleConstructorReturn(this, Object.getPrototypeOf(HelloWord).apply(this, arguments));
		}

		_createClass(HelloWord, [{
			key: 'render',
			value: function render() {
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
		}]);

		return HelloWord;
	}(_react2.default.Component);

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

	(0, _reactDom.render)(_react2.default.createElement(HelloWord, null), document.getElementById('app'));

	// module.exports.HelloWord = HelloWord;

/***/ }
]);