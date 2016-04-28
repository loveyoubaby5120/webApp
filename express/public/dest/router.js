webpackJsonp([2,3],[
/* 0 */
/***/ function(module, exports) {

	import React from 'react';
	import { render } from 'react-dom';
	import { browserHistory, Router, Route, Link } from 'react-router';
	import { App } from 'other';
	// import * as other from './other.js'

	render(React.createElement(
	  Router,
	  { history: browserHistory },
	  React.createElement(
	    Route,
	    { path: '/', component: App },
	    React.createElement(Route, { path: 'user/:userID', component: User })
	  ),
	  React.createElement(Route, { path: '*', component: PageNotFound })
	), document.getElementById('app'));

/***/ }
]);