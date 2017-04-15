import * as React from 'react';
import { Route } from 'react-router';
import { Login } from './Login';
import { Register } from './Register';
import { withRouter } from 'react-router';
import { getPromise } from 'common/ajax';

@withRouter
class Logout extends React.Component<any, void> {
    componentWillMount() {
        getPromise('/ajax/auth/logout').then(() => {
            this.props.router.push('/user/login');
        }).catch(() => {
            window.location.assign('/user/login');
        });
    }
    render() {
        return <div>退出中...</div>;
    }
}

export const route = <Route path='user'>
    <Route path='login' component={Login} />
    <Route path='logout' component={Logout} />
</Route>;
