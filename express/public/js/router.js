import React from 'react'
import ReactDom from 'react-dom'
import { browserHistory, Router, Route, IndexRoute,Redirect } from 'react-router'
import * as other from './other.js'


class Dashboard extends React.Component {
  render() {
    return <div>Welcome to the app!</div>
  }
}


ReactDom.render((
  <Router history={browserHistory}>
    <Route path="/other" component={other.App}>
			<IndexRoute component={Dashboard} />
			<Route path="user/:userID" component={other.User} />
			// <Route path="inbox" component={other.Inbox}>
			//   <Route path="messages/:id" component={other.Message} />
			// </Route>
		
			

			<Route path="inbox" component={other.Inbox}>
        {/* Redirect /inbox/messages/:id to /messages/:id */}
        <Redirect from="messages/:id" to="/messages/:id" />
      </Route>
			{/* Use /messages/:id instead of /inbox/messages/:id */}
			<Route component={other.Inbox}>
				<Route path="messages/:id" component={other.Message} />
			</Route>

    </Route>
    <Route path="*" component={other.PageNotFound} />
  </Router>
), document.getElementById('app'))
