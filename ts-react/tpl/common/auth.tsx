import { getPromise, postPromise } from 'common/ajax';
import { makeError, makeResult, Result } from 'common/types';
import * as _ from 'lodash';
import { observable } from 'mobx';
import { inject, observer, Provider } from 'mobx-react';
import * as React from 'react';

interface User {
    name?: string;
    email?: string;
    tags?: [string];
    email_verified?: boolean;
    id: string;
    phone?: string;
}

interface AuthAPIStatus {
    status: 'guest' | 'user';
    user_id?: string;
    user_name?: string;
    user_email?: string;
    user_tags?: [string];
    email_verified?: boolean;
    user_phone?: string;
    error?: string;
    error_key?: string;
}

interface Config {
    statusURL: string;
    loginURL: string;
    logoutURL: string;
    registerURL: string;
    changepasswordURL: string;
    sendCodeURL: string;
    resetPasswordURL: string;
}

export function defaultConfig(c?: { prefix?: string }): Config {
    const prefix = (c && c.prefix) || '';
    return {
        statusURL: prefix + '/ajax/auth/status',
        loginURL: prefix + '/ajax/auth/login',
        logoutURL: prefix + '/ajax/auth/logout',
        registerURL: prefix + '/ajax/auth/register',
        changepasswordURL: prefix + '/ajax/auth/changepassword',
        sendCodeURL: prefix + '/ajax/auth/sendcode',
        resetPasswordURL: '/ajax/auth/resetpassword',
    };
}

export class AuthStore {
    @observable status: { state: 'user', user: User }
        | { state: 'guest' }
        | { state: 'loading' }
        | { state: 'error', err: string, error_key: string };

    config: Config;

    constructor(config: Config) {
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
                        phone: r.user_phone,
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
        console.log('auth error', err);
        this.status = { state: 'error', err: this.getErrorMessage(err), error_key: 'error_message' };
    }

    async doPost(url: string, param: any): Promise<Result<any, string, string>> {
        let r;
        try {
            r = await postPromise(url, param);
        } catch (e) {
            return makeError(this.getErrorMessage(e), 'error_message');
        }
        if (!r || !r.error) {
            return makeResult(r);
        }

        return makeError(this.getErrorMessage(r.error), r.error_key);

    }

    async sendCode(
        { phone, kind }: { phone: string, kind?: string }):
        Promise<Result<void, string, string>> {

        const parms: any = {};
        if (phone) {
            parms['phone'] = phone;
        }

        if (kind) {
            parms['kind'] = kind;
        }

        const r = await this.doPost(this.config.sendCodeURL, parms);

        if (r.kind === 'error') {
            this.update();
        }
        return r;
    }

    async register(
        { username, email, phone, password, code }: { username?: string, email?: string, phone?: string, password: string, code?: string }):
        Promise<Result<void, string, string>> {
        this.status = { state: 'loading' };

        const parms: any = {};
        parms['password'] = password;
        if (email) {
            parms['email'] = email;
        }
        if (username) {
            parms['username'] = username;
        }
        if (phone) {
            parms['phone'] = phone;
        }
        if (code) {
            parms['code'] = code;
        }

        const r = await this.doPost(this.config.registerURL, parms);

        if (r.kind === 'error') {
            this.update();
        } else {
            this.status = {
                state: 'user', user: {
                    id: r.result.user_id,
                    name: r.result.user_name,
                    email: r.result.user_email,
                    phone: r.result.user_phone,
                    tags: r.result.user_tags,
                    email_verified: r.result.email_verified,
                },
            };
        }
        return r;
    }

    async resetPassword(
        { phone, password, code }: { phone: string, password: string, code: string }):
        Promise<Result<void, string, string>> {
        this.status = { state: 'loading' };

        const parms: any = {};
        parms['password'] = password;

        if (phone) {
            parms['phone'] = phone;
        }
        if (code) {
            parms['code'] = code;
        }

        const r = await this.doPost(this.config.resetPasswordURL, parms);

        if (r.kind === 'error') {
            this.update();
        } else {
            this.status = {
                state: 'user', user: {
                    id: r.result.user_id,
                    name: r.result.user_name,
                    email: r.result.user_email,
                    phone: r.result.user_phone,
                    tags: r.result.user_tags,
                    email_verified: r.result.email_verified,
                },
            };
        }
        return r;
    }

    async login(
        { email, username, phone, identifier, password }: { email?: string, username?: string, phone?: string, identifier?: string, password: string },
    ): Promise<Result<void, string, string>> {
        this.status = { state: 'loading' };
        if (!email && !username && !identifier && !phone) {
            return { kind: 'error', error: 'Email , username and phone are empty', error_key: 'error_message' };
        }
        const parms: any = {};
        parms['password'] = password;
        if (email) {
            parms['email'] = email;
        }
        if (username) {
            parms['username'] = username;
        }
        if (identifier) {
            parms['identifier'] = identifier;
        }
        if (phone) {
            parms['phone'] = phone;
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
                    phone: r.result.user_phone,
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

export class AuthProvider extends React.Component<{ config?: Config }, {}> {
    private store: AuthStore;
    constructor(props: { config?: Config }, context: any) {
        super(props, context);
        const config = props.config || defaultConfig();
        this.store = new AuthStore(config);
    }

    render() {
        return <Provider auth={this.store}>
            {this.props.children}
        </Provider>;
    }
}

export interface WithAuth {
    auth?: AuthStore;
}

export function withAuth<C extends {}>(component: C): C {
    return inject('auth')(observer(component as any));
}

export function loginRequired<C extends {}>(component: C): C {
    return loginRequiredWithOptions({ loginURL: '/user/login' })(component);
}

export function loginRequiredWithOptions(opt: { loginURL: string }): <C extends {}>(component: C) => C {
    return <C extends {}>(component: C): C => {
        const Component: any = component;
        return withAuth(((props: { auth: AuthStore }) => {
            const auth: AuthStore = props.auth;
            switch (auth.status.state) {
                case 'loading':
                    return <div>Loading...</div>;
                case 'guest':
                    window.location.assign(opt.loginURL);
                    return <div>Redirecting...</div>;
                case 'user':
                    return <Component {...props} />;
                case 'error':
                    return <div>Error: {auth.status.err}<br />Please reload this page.</div>;
                default:
                    const unused: never = auth.status;
            }
        }) as any);
    };
}
