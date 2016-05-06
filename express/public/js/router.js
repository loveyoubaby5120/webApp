import React from 'react'
import ReactDom from 'react-dom'
import { browserHistory, Router, Route } from 'react-router'
import * as other from './other.js'


ReactDom.render((
  <Router history={browserHistory}>
    <Route path="/other" component={other.App}>
      <Route path="user/:userID" component={other.User} />
    </Route>
    <Route path="*" component={other.PageNotFound} />
  </Router>
), document.getElementById('app'))
