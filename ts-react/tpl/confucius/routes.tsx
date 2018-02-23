import { loginRequired } from 'common/auth';
import * as React from 'react';
import { browserHistory, IndexRedirect, Route, Router } from 'react-router';
import { route as homeRoute } from './page/home/routes';
import { route as projectRoute } from './page/project/routes';

// @loginRequired
export class RootInfo extends React.Component<any, {}> {
    render() {
        return (
            <div>{this.props.children}</div>
        );
    }
}

export const routes = (<Router history={browserHistory}>
    <Route path='/' component={RootInfo}>
        <IndexRedirect to='home' />
        {homeRoute}
        {projectRoute}
    </Route>
</Router>);
