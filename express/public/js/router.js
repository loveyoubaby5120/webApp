import React from 'react'
import { render } from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import * as other from './other.js'


// render((
//   <Router history={browserHistory}>
//     <Route path="/" component={other.App}>
//       <Route path="user/:userID" component={other.User} />
//     </Route>
//     <Route path="*" component={other.PageNotFound} />
//   </Router>
// ), document.body)