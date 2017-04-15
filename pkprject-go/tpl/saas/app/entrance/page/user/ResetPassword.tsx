import * as React from 'react';
import { withAuth, WithAuth } from 'common/auth';
import { Link } from 'common/Link';
import * as Radium from 'radium';
import { Base as LayoutBase } from 'saas/common/layout/Base';
import { withAppState, WithAppState } from 'saas/common/AppStateStore';
import { BaseStyles } from 'saas/common/BaseStyles';

interface State {
  email?: string;
  password?: string;
  confrim_password?: string;
  error?: string;
  readied?: boolean;
  current_password?: string;
}

@withAuth
@Radium
export class ResetPassword extends React.Component<WithAuth, State> {
  postChangePassword = (ev: React.MouseEvent<any>) => {
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
        window.location.assign('/usercenter');
        return;
      }
      this.setState({ error: r.error });
    });
  };

  componentWillMount() {
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
            ]}>
              <label htmlFor='professional' style={[BaseStyles.option.label2]}>
                原密码
                </label>
              <div style={[
                BaseStyles.option.input,

              ]}>
                <input type='password' className='form-control' placeholder='当前密码'
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
            ]}>
              <label htmlFor='total_score' style={[BaseStyles.option.label2]}>
                新密码
                </label>
              <div style={[
                BaseStyles.option.input,

              ]}>
                <input type='password' className='form-control' placeholder='新密码'
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
            ]}>
              <label htmlFor='total_score' style={[BaseStyles.option.label2]}>
                确认密码
                </label>
              <div style={[
                BaseStyles.option.input,

              ]}>
                <input type='password' className='form-control' placeholder='确认密码'
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
            <button className='btn btn-success'
              style={[
                {
                  width: '100px',
                },
                BaseStyles.opStyle,
              ]}
              onClick={this.postChangePassword}>
              确认修改
            </button>
            <Link
              className='btn btn-default'
              to={`/usercenter`}
              style={[
                {
                  width: '100px',
                },
                BaseStyles.opStyle,
              ]}>返回</Link>
          </div>

        </div>
      </LayoutBase>
    );
  }
}
