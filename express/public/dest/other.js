webpackJsonp([1,3],[
/* 0 */
/***/ function(module, exports) {

	import React from 'react';
	import { render } from 'react-dom';
	import { browserHistory, Router, Route, Link } from 'react-router';

	export class User extends React.Component {
	  render() {
	    let { userID } = this.props.params;
	    let { query } = this.props.location;
	    let age = query && query.showAge ? '33' : '';

	    return React.createElement(
	      'div',
	      { className: 'User' },
	      React.createElement(
	        'h1',
	        null,
	        'User id: ',
	        userID
	      ),
	      age
	    );
	  }
	}

	export class App extends React.Component {
	  render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'ul',
	        null,
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            Link,
	            { to: '/user/bob', activeClassName: 'active' },
	            'Bob'
	          )
	        ),
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            Link,
	            { to: { pathname: '/user/bob', query: { showAge: true } }, activeClassName: 'active' },
	            'Bob With Query Params'
	          )
	        ),
	        React.createElement(
	          'li',
	          null,
	          React.createElement(
	            Link,
	            { to: '/user/sally', activeClassName: 'active' },
	            'Sally'
	          )
	        )
	      ),
	      this.props.children
	    );
	  }
	}

	export class PageNotFound extends React.Component {
	  render() {
	    return React.createElement(
	      'div',
	      null,
	      React.createElement(
	        'h1',
	        null,
	        'Page Not Found.'
	      ),
	      React.createElement(
	        'p',
	        null,
	        'Go to ',
	        React.createElement(
	          Link,
	          { to: '/' },
	          'Home Page'
	        )
	      )
	    );
	  }
	}

	export default { App };

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