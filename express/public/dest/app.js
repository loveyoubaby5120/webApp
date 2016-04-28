webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);
			}
		}return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;
		};
	}();
	
	var _react = __webpack_require__(1);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _reactDom = __webpack_require__(32);
	
	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : { default: obj };
	}
	
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}
	
	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}return call && (typeof call === "object" || typeof call === "function") ? call : self;
	}
	
	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}
	
	var HelloWord = function (_React$Component) {
		_inherits(HelloWord, _React$Component);
	
		function HelloWord() {
			_classCallCheck(this, HelloWord);
	
			return _possibleConstructorReturn(this, Object.getPrototypeOf(HelloWord).apply(this, arguments));
		}
	
		_createClass(HelloWord, [{
			key: 'render',
			value: function render() {
				return _react2.default.createElement('p', { ref: 'childp' }, 'Hello,', function (obj) {
	
					if (obj.props.name) {
						return obj.props.name;
					} else {
						return "world";
					}
				}(this), '      ', _react2.default.createElement('a', { href: '/other' }, 'go to other'));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFhOztBQUViLEtBQWdCLDJCQUFnQjtBQUFDLDRCQUFnQyxRQUFPLE9BQUc7QUFBQyxRQUFLLElBQUssSUFBSSxHQUFHLElBQVEsTUFBTyxRQUFLLEtBQUU7QUFBRSxRQUFjLGFBQVEsTUFBSSxHQUFXLFdBQVcsYUFBYSxXQUFXLGNBQVUsTUFBVyxXQUFhLGVBQVEsS0FBQyxJQUFXLFdBQWMsWUFBWSxXQUFTLFdBQVEsS0FBTyxPQUFlLGVBQU8sUUFBWSxXQUFJLEtBQWM7QUFBRTtBQUFFLEdBQUMsT0FBTyxVQUFxQixhQUFZLFlBQWEsYUFBRztBQUFDLE9BQWMsWUFBRSxpQkFBNEIsWUFBVSxXQUFjLFlBQUMsSUFBZSxhQUFFLGlCQUE0QixhQUFlLGFBQUMsT0FBbUI7QUFBRztBQUFLLEVBQWppQjs7QUFFbkIsS0FBVSxTQUFHLG9CQUFpQjs7QUFFOUIsS0FBVyxVQUFHLHVCQUErQjs7QUFFN0MsS0FBYSxZQUFHLG9CQUFxQjs7QUFFckMsaUNBQW1DLEtBQUc7QUFBQyxTQUFVLE9BQU8sSUFBVyxhQUFNLE1BQUcsRUFBUyxTQUFRO0FBQUU7O0FBRS9GLDBCQUFpQyxVQUFhLGFBQUc7QUFBQyxNQUFJLEVBQVUsb0JBQXdCLGNBQUU7QUFBRSxTQUFNLElBQUksVUFBK0M7QUFBRTtBQUFFOztBQUV6SixxQ0FBd0MsTUFBTSxNQUFHO0FBQUMsTUFBSSxDQUFLLE1BQUU7QUFBRSxTQUFNLElBQUksZUFBNEU7QUFBRSxHQUFDLE9BQVcsU0FBSyxPQUFXLFNBQWEsWUFBSSxPQUFXLFNBQWdCLGNBQU8sT0FBUTtBQUFFOztBQUVoUCxvQkFBMkIsVUFBWSxZQUFHO0FBQUMsTUFBSSxPQUFpQixlQUFlLGNBQWMsZUFBUyxNQUFFO0FBQUUsU0FBTSxJQUFJLFVBQW9FLDZEQUFHLE9BQW1CO0FBQUUsR0FBUyxTQUFVLFlBQVMsT0FBTyxPQUFXLGNBQWMsV0FBVSxXQUFFLEVBQWEsYUFBRSxFQUFPLE9BQVUsVUFBWSxZQUFPLE9BQVUsVUFBTSxNQUFjLGNBQVksVUFBQyxJQUFjLFlBQVEsT0FBZSxpQkFBUyxPQUFlLGVBQVMsVUFBYSxjQUFXLFNBQVUsWUFBYztBQUFFOztBQUU5ZSxLQUFhLHNCQUE2QixrQkFDMUM7QUFBQyxZQUFtQixXQUFvQjs7QUFFdkMsV0FBa0IsWUFDbkI7QUFBRSxtQkFBb0IsTUFBYTs7QUFFakMsVUFBTywyQkFBK0IsTUFBUSxPQUFlLGVBQVcsV0FBTSxNQUFLLE1BQ3JGO0FBQUU7O0FBRUQsZUFBc0I7QUFDbEIsUUFBVTtBQUNSLFVBQUUsU0FBZSxTQUFJO0FBQ3pCLFdBQWMsUUFBUSxRQUFjLGNBQ2hDLEtBQ0gsRUFBSyxLQUFZLFlBRXJCLG9CQUFpQixLQUFHOztBQUVmLFNBQU8sSUFBTSxNQUFLLE1BQUU7QUFDbkIsYUFBVSxJQUFNLE1BQU07QUFDdEIsWUFBTTtBQUNOLGFBQWU7QUFDZjtBQUNELEtBUEQsQ0FPTyxPQUNDLFVBQ0QsUUFBUSxRQUFjLGNBQ3pCLEtBQ0gsRUFBTSxNQUFZLFlBR2xCO0FBRUE7QUF2QnFCLEdBQUQ7O0FBeUJ4QixTQUNEO0FBQUMsRUFuQ2UsQ0FtQ1AsUUFBUSxRQWVYOzs7Ozs7Ozs7Ozs7Ozs7OztBQUVOLEVBQUUsR0FBVyxVQUFPLFFBQVMsUUFBUSxRQUFjLGNBQVUsV0FBTyxPQUFVLFNBQWUsZUFFN0YiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX3JlYWN0ID0gcmVxdWlyZSgncmVhY3QnKTtcblxudmFyIF9yZWFjdDIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWFjdCk7XG5cbnZhciBfcmVhY3REb20gPSByZXF1aXJlKCdyZWFjdC1kb20nKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG52YXIgSGVsbG9Xb3JkID0gZnVuY3Rpb24gKF9SZWFjdCRDb21wb25lbnQpIHtcblx0X2luaGVyaXRzKEhlbGxvV29yZCwgX1JlYWN0JENvbXBvbmVudCk7XG5cblx0ZnVuY3Rpb24gSGVsbG9Xb3JkKCkge1xuXHRcdF9jbGFzc0NhbGxDaGVjayh0aGlzLCBIZWxsb1dvcmQpO1xuXG5cdFx0cmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIE9iamVjdC5nZXRQcm90b3R5cGVPZihIZWxsb1dvcmQpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuXHR9XG5cblx0X2NyZWF0ZUNsYXNzKEhlbGxvV29yZCwgW3tcblx0XHRrZXk6ICdyZW5kZXInLFxuXHRcdHZhbHVlOiBmdW5jdGlvbiByZW5kZXIoKSB7XG5cdFx0XHRyZXR1cm4gX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoXG5cdFx0XHRcdCdwJyxcblx0XHRcdFx0eyByZWY6ICdjaGlsZHAnIH0sXG5cdFx0XHRcdCdIZWxsbywnLFxuXHRcdFx0XHRmdW5jdGlvbiAob2JqKSB7XG5cblx0XHRcdFx0XHRpZiAob2JqLnByb3BzLm5hbWUpIHtcblx0XHRcdFx0XHRcdHJldHVybiBvYmoucHJvcHMubmFtZTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0cmV0dXJuIFwid29ybGRcIjtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0odGhpcyksXG5cdFx0XHRcdCcgICAgICAnLFxuXHRcdFx0XHRfcmVhY3QyLmRlZmF1bHQuY3JlYXRlRWxlbWVudChcblx0XHRcdFx0XHQnYScsXG5cdFx0XHRcdFx0eyBocmVmOiAnL290aGVyJyB9LFxuXHRcdFx0XHRcdCdnbyB0byBvdGhlcidcblx0XHRcdFx0KVxuXHRcdFx0KTtcblx0XHR9XG5cdH1dKTtcblxuXHRyZXR1cm4gSGVsbG9Xb3JkO1xufShfcmVhY3QyLmRlZmF1bHQuQ29tcG9uZW50KTtcblxuLy8gdmFyIEhlbGxvV29yZCA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbi8vIFx0cmVuZGVyOiBmdW5jdGlvbigpe1xuLy8gXHRcdHJldHVybiA8cCByZWY9J2NoaWxkcCc+SGVsbG8seyhmdW5jdGlvbihvYmope1xuXG4vLyBcdFx0XHRpZihvYmoucHJvcHMubmFtZSl7XG4vLyBcdFx0XHRcdHJldHVybiBvYmoucHJvcHMubmFtZTtcbi8vIFx0XHRcdH1cbi8vIFx0XHRcdGVsc2V7XG4vLyBcdFx0XHRcdHJldHVybiBcIndvcmxkXCI7XG4vLyBcdFx0XHR9XG5cbi8vIFx0XHR9KSh0aGlzKX0gICAgICA8YSBocmVmPScvb3RoZXInPmdvIHRvIG90aGVyPC9hPjwvcD47XG4vLyBcdH1cbi8vIH0pO1xuXG4oMCwgX3JlYWN0RG9tLnJlbmRlcikoX3JlYWN0Mi5kZWZhdWx0LmNyZWF0ZUVsZW1lbnQoSGVsbG9Xb3JkLCBudWxsKSwgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpKTtcblxuLy8gbW9kdWxlLmV4cG9ydHMuSGVsbG9Xb3JkID0gSGVsbG9Xb3JkO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vfi9iYWJlbC1sb2FkZXI/e1wicHJlc2V0c1wiOltcImVzMjAxNVwiLFwicmVhY3RcIixcInN0YWdlLTBcIl19IS4vcHVibGljL2pzL2luZGV4LmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==