import * as React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { route as userRoute } from './page/user/routes';
import { route as homeRoute } from './page/home/routes';
import { loginRequired } from 'common/auth';
import { UserCenter } from './page/user/UserInfo';
import { ResetPassword } from './page/user/ResetPassword';

@loginRequired
export class RootInfo extends React.Component<any, {}> {
  render() {
    return (
      <div>{this.props.children}</div>
    );
  }
}

export const routes = (<Router history={browserHistory}>
  {userRoute}
  <Route path='/' component={RootInfo}>
    <IndexRedirect to='home' />
    {homeRoute}
    <Route path='usercenter' component={UserCenter} />
    <Route path='resetPassword' component={ResetPassword} />
  </Route>
</Router>);
