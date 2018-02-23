import { withAuth, WithAuth } from 'common/auth';
import { Link } from 'common/Link';
import { S as ERROR_S } from 'common/locale_error';
import * as Radium from 'radium';
import * as React from 'react';
import { BaseStyles } from 'saas/common/BaseStyles';
import { Base as LayoutBase } from 'saas/common/layout/Base';
import { getSiteConfig } from 'saas/common/PublicData';

interface State {
    email?: string;
    password?: string;
    confrim_password?: string;
    error?: string;
    readied?: boolean;
    current_password?: string;
    site?: string;
    platform?: string;
}

@withAuth
@Radium
export class ResetPassword extends React.Component<WithAuth, State> {
    constructor(props, context?) {
        super(props, context);
        this.state = {
            site: 'saas',
            platform: 'saas',
        };
    }

    postChangePassword = (ev) => {
        ev.preventDefault();
        this.setState({
            error: null,
        });
        if (!this.state.current_password) {
            this.setState({
                error: '请输入当前密码',
            });
            return;
        }
        if (!this.state.password) {
            this.setState({
                error: '请输入要修改的密码',
            });
            return;
        }
        const reg = /^[0-9A-Za-z]{6,21}$/;
        if (!reg.test(this.state.password)) {
            this.setState({
                error: '请输入6-20位密码大小写字母或数字',
            });
            return;
        }
        if (this.state.password !== this.state.confrim_password) {
            this.setState({
                error: '两次输入密码不一致',
            });
            return;
        }
        this.props.auth.changePassword({
            email: this.state.email,
            password: this.state.password,
            oldPassword: this.state.current_password,
        }).then(r => {
            if (r.kind === 'result') {
                if (getSiteConfig(this.state, 'usercenter') === true) {
                    window.location.assign('/usercenter');
                } else {
                    window.location.assign('/');
                }
                return;
            }
            this.setState({ error: ERROR_S[r.error_key] || r.error });
        });
    }

    componentWillMount() {
        const oLi = document.getElementById('a2-saas-config').getElementsByTagName('li');
        let site = '';
        for (let i = 0; i < oLi.length; i++) {
            if (oLi[i].dataset['name'] === 'site') {
                site = oLi[i].dataset['value'];
            }
        }

        this.setState({
            site,
        });

        if (this.props.auth.status.state === 'user' && this.props.auth.status.user.email && !this.state.readied) {
            this.setState({
                email: this.props.auth.status.user.email,
                readied: true,
            });
        }
    }

    componentWillReceiveProps(newProps) {
        if (newProps.auth.status.state === 'user' && newProps.auth.status.user.email && !this.state.readied) {
            this.setState({
                email: newProps.auth.status.user.email,
                readied: true,
            });
        }
    }

    render() {
        const status = this.props.auth.status;
        if (this.props.auth.status.state === 'user' && this.props.auth.status.user.email && !this.state.readied) {
            this.setState({
                email: this.props.auth.status.user.email,
                readied: true,
            });
        }
        if (!this.state.readied) {
            return <div></div>;
        }

        return (
            <LayoutBase>
                <div style={[
                    BaseStyles.content,
                    {
                        overflow: 'hidden',
                    },
                ]}>
                    {this.state.error ? <div className='alert alert-danger'>
                        Error: {this.state.error}
                    </div> : null}
                    {(() => {
                        if (status.state === 'error') {
                            return <div className='alert alert-danger'>
                                Error: {JSON.stringify(status.err)}
                            </div>;
                        }
                    })()}
                    <div style={[BaseStyles.title]}>
                        修改密码
          </div>
                    <div className='col-sm-6'>
                        <div style={[
                            BaseStyles.option,
                            BaseStyles.option.bb,
                            { borderBottom: 'none' },
                        ]}>
                            <label htmlFor='regional' style={[BaseStyles.option.label2]}>
                                用户名
                </label>
                            <div style={[
                                BaseStyles.option.input,

                            ]}>
                                <input type='email' className='form-control'
                                    disabled={
                                        this.props.auth.status.state === 'user' &&
                                            this.props.auth.status.user.tags &&
                                            this.props.auth.status.user.tags.indexOf('ata:admin') > -1 ?
                                            false : true
                                    }
                                    value={this.state.email} onChange={
                                        (ev) => {
                                            this.setState({
                                                email: (ev.target as HTMLInputElement).value,
                                            });
                                        }
                                    } />
                            </div>
                        </div>
                        <div style={[
                            BaseStyles.option,
                            BaseStyles.option.bb,
                            { borderBottom: 'none' },
                        ]}>
                            <label htmlFor='professional' style={[BaseStyles.option.label2]}>
                                原密码
                </label>
                            <div style={[
                                BaseStyles.option.input,

                            ]}>
                                <input type='password'
                                    id='current_password'
                                    className='form-control'
                                    placeholder='当前密码'
                                    value={this.state.current_password}
                                    onChange={
                                        (ev) => {
                                            this.setState({
                                                current_password: (ev.target as HTMLInputElement).value,
                                            });
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div style={[
                            BaseStyles.option,
                            BaseStyles.option.bb,
                            { borderBottom: 'none' },
                        ]}>
                            <label htmlFor='total_score' style={[BaseStyles.option.label2]}>
                                新密码
                </label>
                            <div style={[
                                BaseStyles.option.input,
                            ]}>
                                <input type='password'
                                    className='form-control'
                                    id='password'
                                    placeholder='新密码'
                                    value={this.state.password}
                                    onChange={
                                        (ev) => {
                                            this.setState({
                                                password: (ev.target as HTMLInputElement).value,
                                            });
                                        }
                                    }
                                />
                            </div>
                        </div>
                        <div style={[
                            BaseStyles.option,
                            BaseStyles.option.bb,
                            { borderBottom: 'none' },
                        ]}>
                            <label htmlFor='total_score' style={[BaseStyles.option.label2]}>
                                确认密码
                </label>
                            <div style={[
                                BaseStyles.option.input,

                            ]}>
                                <input type='password'
                                    id='confrim_password'
                                    className='form-control'
                                    placeholder='确认密码'
                                    value={this.state.confrim_password}
                                    onChange={
                                        (ev) => {
                                            this.setState({
                                                confrim_password: (ev.target as HTMLInputElement).value,
                                            });
                                        }
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className='col-sm-12'>
                        <button className='btn btn-info'
                            id='postChangePassword'
                            style={[
                                BaseStyles.opStyle,
                                BaseStyles.button,
                                { marginRight: '10px' },
                            ]}
                            onClick={this.postChangePassword}>
                            确认修改
            </button>
                        {
                            getSiteConfig(this.state, 'usercenter') ?
                                (
                                    <Link
                                        className='btn btn-default'
                                        to={`/usercenter`}
                                        style={[
                                            BaseStyles.button,
                                            BaseStyles.opStyle,
                                        ]}>返回</Link>
                                )
                                :
                                null
                        }
                    </div>

                </div>
            </LayoutBase>
        );
    }
}
