webpackJsonp([2,3,4],[
/* 0 */
/***/ function(module, exports) {

	"use strict";
	
	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}
	
	var initWebGl = function initWebGl(canvas) {
		_classCallCheck(this, initWebGl);
	
		var gl = void 0;
		try {
			gl = canvas.getContext("experimental-webgl");
		} catch (e) {
			var msg = "Error creating WebGL Context!: " + e.toString();
			alert(msg);
			throw Error(msg);
		}
	
		return gl;
	};
	
	var initViewport = function initViewport(gl, canvas) {
		_classCallCheck(this, initViewport);
	
		gl.viewport(0, 0, canvas.width, canvas.height);
	};
	
	var createSquare = function createSquare(gl) {
		_classCallCheck(this, createSquare);
	
		var vertexBuffer = void 0;
		vertexBuffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		var verts = [.5, .5, 0.0, -.5, .5, 0.0, .5, -.5, 0.0, -.5, -.5, 0.0];
		gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(varts), gl.STATIC_DRAW);
		var square = {
			buffer: vertexBuffer,
			vertSize: 3,
			nVerts: 4,
			primtype: gl.TRIAGLE_STRIP
		};
	
		return square;
	};

/***/ }
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wdWJsaWMvanMvd2ViR0wuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFhOztBQUViLDBCQUFpQyxVQUFhLGFBQUc7QUFBQyxNQUFJLEVBQVUsb0JBQXdCLGNBQUU7QUFBRSxTQUFNLElBQUksVUFBK0M7QUFBRTtBQUFFOztBQUV6SixLQUFhLFlBQUcsbUJBQXlCLFFBQ3pDO0FBQUMsa0JBQW9CLE1BQWE7O0FBRWpDLE1BQU0sS0FBRyxLQUFPO0FBQ2hCLE1BQUk7QUFDRCxRQUFTLE9BQVcsV0FBdUI7QUFDN0MsSUFBQyxPQUFRLEdBQUU7QUFDWCxPQUFPLE1BQW9DLG9DQUFJLEVBQVk7QUFDM0QsU0FBVztBQUNYLFNBQU0sTUFDUjtBQUFFOztBQUVELFNBQ0Q7QUFBRTs7QUFFRixLQUFnQixlQUFHLHNCQUF3QixJQUFRLFFBQ25EO0FBQUMsa0JBQW9CLE1BQWdCOztBQUVsQyxLQUFTLFNBQUUsR0FBRyxHQUFRLE9BQU0sT0FBUSxPQUN2QztBQUFFOztBQUVGLEtBQWdCLGVBQUcsc0JBQXdCLElBQzNDO0FBQUMsa0JBQW9CLE1BQWdCOztBQUVwQyxNQUFnQixlQUFHLEtBQU87QUFDZCxpQkFBSyxHQUFnQjtBQUMvQixLQUFXLFdBQUcsR0FBYSxjQUFnQjtBQUM3QyxNQUFTLFFBQUcsQ0FBRyxJQUFJLElBQUssS0FBRSxDQUFHLElBQUksSUFBSyxLQUFJLElBQUUsQ0FBRyxJQUFLLEtBQUUsQ0FBRyxJQUFFLENBQUcsSUFBTztBQUNuRSxLQUFXLFdBQUcsR0FBYSxjQUFFLElBQUksYUFBbUIsUUFBSSxHQUFjO0FBQ3hFLE1BQVU7QUFDSCxXQUFjO0FBQ1osYUFBRztBQUNMLFdBQUc7QUFDRCxhQUFJLEdBQ1g7QUFMVzs7QUFPYixTQUFjO0FBQ2QsRyIsImZpbGUiOiJ3ZWJHTC5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG52YXIgaW5pdFdlYkdsID0gZnVuY3Rpb24gaW5pdFdlYkdsKGNhbnZhcykge1xuXHRfY2xhc3NDYWxsQ2hlY2sodGhpcywgaW5pdFdlYkdsKTtcblxuXHR2YXIgZ2wgPSB2b2lkIDA7XG5cdHRyeSB7XG5cdFx0Z2wgPSBjYW52YXMuZ2V0Q29udGV4dChcImV4cGVyaW1lbnRhbC13ZWJnbFwiKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdHZhciBtc2cgPSBcIkVycm9yIGNyZWF0aW5nIFdlYkdMIENvbnRleHQhOiBcIiArIGUudG9TdHJpbmcoKTtcblx0XHRhbGVydChtc2cpO1xuXHRcdHRocm93IEVycm9yKG1zZyk7XG5cdH1cblxuXHRyZXR1cm4gZ2w7XG59O1xuXG52YXIgaW5pdFZpZXdwb3J0ID0gZnVuY3Rpb24gaW5pdFZpZXdwb3J0KGdsLCBjYW52YXMpIHtcblx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIGluaXRWaWV3cG9ydCk7XG5cblx0Z2wudmlld3BvcnQoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbn07XG5cbnZhciBjcmVhdGVTcXVhcmUgPSBmdW5jdGlvbiBjcmVhdGVTcXVhcmUoZ2wpIHtcblx0X2NsYXNzQ2FsbENoZWNrKHRoaXMsIGNyZWF0ZVNxdWFyZSk7XG5cblx0dmFyIHZlcnRleEJ1ZmZlciA9IHZvaWQgMDtcblx0dmVydGV4QnVmZmVyID0gZ2wuY3JlYXRlQnVmZmVyKCk7XG5cdGdsLmJpbmRCdWZmZXIoZ2wuQVJSQVlfQlVGRkVSLCB2ZXJ0ZXhCdWZmZXIpO1xuXHR2YXIgdmVydHMgPSBbLjUsIC41LCAwLjAsIC0uNSwgLjUsIDAuMCwgLjUsIC0uNSwgMC4wLCAtLjUsIC0uNSwgMC4wXTtcblx0Z2wuYnVmZmVyRGF0YShnbC5BUlJBWV9CVUZGRVIsIG5ldyBGbG9hdDMyQXJyYXkodmFydHMpLCBnbC5TVEFUSUNfRFJBVyk7XG5cdHZhciBzcXVhcmUgPSB7XG5cdFx0YnVmZmVyOiB2ZXJ0ZXhCdWZmZXIsXG5cdFx0dmVydFNpemU6IDMsXG5cdFx0blZlcnRzOiA0LFxuXHRcdHByaW10eXBlOiBnbC5UUklBR0xFX1NUUklQXG5cdH07XG5cblx0cmV0dXJuIHNxdWFyZTtcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9+L2JhYmVsLWxvYWRlcj97XCJwcmVzZXRzXCI6W1wiZXMyMDE1XCIsXCJyZWFjdFwiLFwic3RhZ2UtMFwiXX0hLi9wdWJsaWMvanMvd2ViR0wuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9