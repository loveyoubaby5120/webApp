import * as React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { route as cepingRoute } from './page/ceping/routes';
import { loginRequired } from 'common/auth';

@loginRequired
export class RootInfo extends React.Component<any, void> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export const routes = (<Router history={browserHistory}>
  <Route path='/gaokao' component={RootInfo}>
    <IndexRedirect to='ceping' />
    {cepingRoute}
  </Route>
</Router>);
