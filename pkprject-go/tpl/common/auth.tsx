import * as React from 'react';
import { getPromise, postPromise } from 'common/ajax';
import { observable } from 'mobx';
import { Provider, inject, observer } from 'mobx-react';
import * as _ from 'lodash';
import { Result, makeError, makeResult } from 'common/types';

interface User {
  name?: string;
  email?: string;
  tags?: [string];
  email_verified?: boolean;
  id: string;
}

interface AuthAPIStatus {
  status: 'guest' | 'user';
  user_id?: string;
  user_name?: string;
  user_email?: string;
  user_tags?: [string];
  email_verified?: boolean;
  error?: string;
  error_key?: string;
}

interface Config {
  statusURL: string;
  loginURL: string;
  logoutURL: string;
  registerURL: string;
  changepasswordURL: string;
}

export function defaultConfig(c?: { prefix?: string }): Config {
  let prefix = (c && c.prefix) || '';
  return {
    statusURL: prefix + '/ajax/auth/status',
    loginURL: prefix + '/ajax/auth/login',
    logoutURL: prefix + '/ajax/auth/logout',
    registerURL: prefix + '/ajax/auth/register',
    changepasswordURL: prefix + '/ajax/auth/changepassword',
  };
}

export class AuthStore {
  @observable status:
  { state: 'user', user: User }
  | { state: 'guest' }
  | { state: 'loading' }
  | { state: 'error', err: string, error_key: string };

  config: Config;

  constructor(config) {
    this.config = config;
    this.update();
  }

  update() {
    this.status = { state: 'loading' };
    getPromise(this.config.statusURL).then((r: AuthAPIStatus) => {
      if (r.status === 'guest') {
        this.status = { state: 'guest' };
        return;
      }
      if (r.status === 'user') {
        this.status = {
          state: 'user',
          user: {
            id: r.user_id,
            name: r.user_name,
            email: r.user_email,
            tags: r.user_tags,
            email_verified: r.email_verified,
          },
        };
        return;
      }
      this.setError('unknown result');
    }).catch((err) => {
      this.setError(err);
    });
  }

  getErrorMessage(err: any): string {
    if (_.isString(err)) {
      return err;
    }
    if (err instanceof Object) {
      if (err.hasOwnProperty('responseText')) {
        return err.responseText;
      }
      if (err.hasOwnProperty('error') && _.isString(err.error)) {
        return err.error;
      }
    }
    return 'Error: ' + JSON.stringify(err);
  }

  setError(err: any) {
    this.status = { state: 'error', err: this.getErrorMessage(err), error_key: 'error_message' };
  }

  async doPost(url: string, param: any): Promise<Result<any, string, string>> {
    let r;
    try {
      r = await postPromise(url, param);
    } catch (e) {
      return makeError(this.getErrorMessage(e), 'error_message');
    }
    if (r.error) {
      return makeError(this.getErrorMessage(r.error), r.error_key);
    }
    return makeResult(r);
  }

  async register(
    { username, email, password }: { username: string, email: string, password: string }):
    Promise<Result<void, string, string>> {
    this.status = { state: 'loading' };

    const r = await this.doPost(this.config.registerURL, {
      username, email, password,
    });

    if (r.kind === 'error') {
      this.update();
    } else {
      this.status = {
        state: 'user', user: {
          id: r.result.user_id,
          name: r.result.user_name,
          email: r.result.user_email,
          tags: r.result.user_tags,
          email_verified: r.result.email_verified,
        },
      };
    }
    return r;
  }

  async login({ email, username, password }: { email?: string, username?: string, password: string }):
    Promise<Result<void, string, string>> {
    this.status = { state: 'loading' };
    if (!email && !username) {
      return { kind: 'error', error: 'Email and username are empty', error_key: 'error_message' };
    }
    let parms = {};
    parms['password'] = password;
    if (email) {
      parms['email'] = email;
    }
    if (username) {
      parms['username'] = username;
    }

    const r = await this.doPost(this.config.loginURL, parms);

    if (r.kind === 'error') {
      this.update();
    } else {
      this.status = {
        state: 'user', user: {
          id: r.result.user_id,
          name: r.result.user_name,
          email: r.result.user_email,
          tags: r.result.user_tags,
          email_verified: r.result.email_verified,
        },
      };
    }
    return r;
  }

  changePassword({ email, password, oldPassword }: { email: string, password: string, oldPassword: string }):
    Promise<Result<void, string, string>> {
    return this.doPost(this.config.changepasswordURL, {
      email, password, oldPassword,
    });
  }

  logout() {
    this.status = { state: 'loading' };
    getPromise(this.config.logoutURL).then(() => {
      this.update();
    });
  }
}

export class AuthProvider extends React.Component<{ config?: Config }, void> {
  private store: AuthStore;
  constructor(props, context) {
    super(props, context);
    let config = props.config || defaultConfig();
    this.store = new AuthStore(config);
  }

  render() {
    return <Provider auth={this.store}>
      {this.props.children}
    </Provider>;
  }
}

export interface WithAuth {
  auth: AuthStore;
}

export function withAuth<C extends Function>(component: C): C {
  return inject('auth')(observer(component as any));
}

export function loginRequired<C extends Function>(component: C): C {
  let Component: any = component;
  return withAuth(((props) => {
    const auth: AuthStore = props.auth;
    switch (auth.status.state) {
      case 'loading':
        return <div>Loading...</div>;
      case 'guest':
        window.location.assign('/user/login');
        return <div>Redirecting...</div>;
      case 'user':
        return <Component {...props} />;
      case 'error':
        return <div>Error: {auth.status.err}<br />Please reload this page.</div>;
      default:
        const e: never = auth.status;
    }
  }) as any);
}
