import * as React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { route as homeRoute } from './page/home/routes';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { get as getPath } from 'object-path';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';

export const routes = (<Router history={browserHistory}>
  <Route path='/'>
    <IndexRedirect to='home' />
    {homeRoute}
  </Route>
</Router>);
