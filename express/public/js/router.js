import React from 'react'
import { render } from 'react-dom'
import { browserHistory, Router, Route, Link } from 'react-router'
import * as other from './other.js'


render((
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <Route path="user/:userID" component={User} />
    </Route>
    <Route path="*" component={PageNotFound} />
  </Router>
), document.getElementById('app'))
