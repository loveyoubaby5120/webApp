import React from 'react'
import ReactDom from 'react-dom'
import { browserHistory, Router, Route } from 'react-router'
import * as index from 'index.js'



ReactDom.render((
  <Router history={browserHistory}>

    <Route path="/index" component={index.App}>
      <Route path="user/:userID" component={index.User} />
    </Route>

    <Route path="/index_info" component={index.App_info}>
      <Route path="user/:userID" component={index.User} />
    </Route>

    <Route path="*" component={index.PageNotFound} />
  </Router>
), document.getElementById('app'))

