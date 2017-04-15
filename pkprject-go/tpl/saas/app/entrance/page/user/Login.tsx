import * as React from 'react';
import * as Radium from 'radium';
let Style = Radium.Style;
import { withAuth, WithAuth } from 'common/auth';
import { Location } from 'history';
import { S } from 'common/locale_error';
import 'saas/common/style/base_login.sass';

const styles = {
  form: {
    maxWidth: '380px',
    padding: '15px',
    margin: '0 auto',
  },
};

interface LoginProps {
  next?: string;
  location: Location;
}

interface State {
  email?: string;
  password?: string;
  errorText?: string;
  showText?: boolean;
}

@Radium
class LoginView extends React.Component<LoginProps & WithAuth, State> {
  constructor(props, context?) {
    super(props, context);
    this.state = {
      email: '',
      password: '',
      errorText: '',
      showText: false,
    };
  }

  postLogin = (ev: React.MouseEvent<any>) => {
    ev.preventDefault();
    this.props.auth.login({
      email: this.state.email,
      password: this.state.password,
    }).then(r => {
      if (r.kind === 'result') {
        return;
      }
      this.setState({ errorText: S[r.error_key] });
    });
  };

  showText = (ev) => {
    this.setState({
      showText: !this.state.showText,
    });
  }

  render() {
    const status = this.props.auth.status;
    if (status.state === 'user') {
      window.location.assign(this.props.location.query['next'] || '/');
    }

    return (
      <div>
        <Style rules={{
          '.header': {
            height: '60px',
            borderBottom: '1px solid #e4e4e4',
            fontSize: '16px',
            background: '#fff',
          },
          '.logo': {
            float: 'left',
          },
          '.logo-img': {
            height: '49px',
            verticalAlign: 'top',
          },
          '.logo-content': {
            display: 'inline-block',
            height: '80px',
            color: '#000',
            paddingLeft: '10px',
            width: '270px',
            fontSize: '16px',
          },
          '.logo-content-top': {
            lineHeight: '30px',
            fontSize: '16px',
          },
          '.logo-content-bottom': {
            height: '50%',
            lineHeight: '20px',
            fontSize: '14px',
          },
          '.form-signin-heading .logo-content': {
            display: 'block',
            margin: '10px auto',
            color: 'rgba(111, 57, 152, 0.7)',
            fontSize: '16px',
            width: '100%',
          },
          '.form-signin-heading .logo-content .logo-content-bottom': {
            lineHeight: '20px',
          },
          'form': {
            backgroundColor: '#fff',
            padding: '35px 15px !important',
            border: '1px solid #e6e3e3',
          },
        }} />
        <div className='animation'>
          <form
            style={styles.form}
            onSubmit={this.postLogin}>
            <div className='logo'>
              <span style={[
                {
                  backgroundColor: '#0099ff',
                  borderRadius: '50%',
                  fontSize: '20px',
                  padding: '15px 20px',
                  margin: '0 0 0 10px',
                  width: '60px',
                  height: '60px',
                  float: 'left',
                },
              ]}>
                <span className='fa fa-university' style={[
                  {
                    color: '#fff',
                  },
                ]} />
              </span>
              <div className='logo-content'>
                <div className='logo-content-top'>山东省明湖中学</div>
                <div className='logo-content-bottom'>学生学业发展与规划培养信息化平台</div>
              </div>
            </div>
            <div className='form-group'>
              <input
                type='email'
                className='form-control'
                placeholder='电子邮箱'
                required
                autoFocus={true}
                onChange={
                  (ev: React.MouseEvent<any>) => {
                    this.setState({
                      email: ev.currentTarget.value,
                    });
                  }
                }
              />
            </div>
            <div className='form-group'>
              <input
                type='password'
                className='form-control'
                placeholder='密码'
                required
                onChange={
                  (ev) => {
                    this.setState({
                      password: ev.currentTarget.value,
                    });
                  }
                } />
            </div>
            {
              this.state.errorText ?
                (
                  <p style={[
                    { color: 'red', fontSize: '12px' },
                  ]}>
                    {this.state.errorText}
                  </p>
                )
                : null
            }
            <button className='btn btn-info btn-block' type='submit'>登录</button>
            <span style={[
              {
                color: '#0099ff',
                display: 'block',
                padding: '10px 0 5px',
                cursor: 'pointer',
              },
            ]}
              onClick={this.showText}>忘记密码？</span>
            <span style={[
              this.state.showText ?
                {}
                : {
                  display: 'none',
                },
              {
                marginTop: '5px',
                color: '#F86043',
              },
            ]}>
              请联系学校网络管理员，重置密码
            </span>
          </form>
        </div>
      </div>
    );
  }
}

export const Login = withAuth(LoginView);
