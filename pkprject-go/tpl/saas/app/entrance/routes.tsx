import * as React from 'react';
import { Router, Route, IndexRedirect, browserHistory } from 'react-router';
import { route as userRoute } from './page/user/routes';
import { route as homeRoute } from './page/home/routes';
import { loginRequired } from 'common/auth';
import { UserCenter } from './page/user/UserInfo';
import { ResetPassword } from './page/user/ResetPassword';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { Querier, pendingMessage } from 'common/graphql';
import { get as getPath } from 'object-path';
import { autorun } from 'mobx';
import { observer } from 'mobx-react';

const query = `
query {
  auth {
    get_user_info {
      id
      username
      email
      site
      tags
      data {
        class
        entryyear
        gender
        grade
        institute_slug
        lang
        name
        phone
        position
        stu_id
      }
    }
  }
}`;

@observer
@loginRequired
export class RootInfo extends React.Component<any & WithAppState, void> {
  query: Querier<any, any>;

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    this.query = new Querier({
      query: query,
    });
    autorun(() => {
      if (this.query.result.status === 'ok') {

        let oLi = document.getElementById('a2-saas-config').getElementsByTagName('li');
        let site = '';
        for (let i = 0; i < oLi.length; i++) {
          if (oLi[i].dataset['name'] === 'site') {
            site = oLi[i].dataset['value'];
          }
        }
        this.props.data.appState.site = site;

        const searchData = (getPath(this.query.result, 'result.data') as any) || [];

        this.props.data.appState.currentUser.id = searchData.auth['get_user_info'].id || '';
        this.props.data.appState.currentUser.username = searchData.auth['get_user_info'].username || '';
        this.props.data.appState.currentUser.name = searchData.auth['get_user_info'].data.name || '';
        this.props.data.appState.currentUser.permissions = searchData.auth['get_user_info'].tags || [];
        this.props.data.appState.currentUser.gender = searchData.auth['get_user_info'].data.gender || '';
        this.props.data.appState.currentUser.entryyear = searchData.auth['get_user_info'].data.entryyear || '';
        this.props.data.appState.currentUser.class = searchData.auth['get_user_info'].data.class || '';
        this.props.data.appState.currentUser.stu_id = searchData.auth['get_user_info'].data.stu_id || '';
        this.forceUpdate();
      }
    });
  }

  render() {
    const pending = pendingMessage(this.query.result);
    if (pending) {
      return (<div>{pending}</div>);
    }

    return (
      <div>{this.props.children}</div>
    );
  }
}

export const routes = (<Router history={browserHistory}>
  {userRoute}
  <Route path='/' component={withAppState(RootInfo)}>
    <IndexRedirect to='home' />
    {homeRoute}
    <Route path='usercenter' component={UserCenter} />
    <Route path='resetPassword' component={ResetPassword} />
  </Route>
</Router>);
