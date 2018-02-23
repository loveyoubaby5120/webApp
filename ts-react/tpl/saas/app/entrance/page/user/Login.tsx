import * as Radium from 'radium';
import * as React from 'react';
const Style = Radium.Style;
import { withAuth, WithAuth } from 'common/auth';
import { Querier } from 'common/graphql';
import { S } from 'common/locale_error';
import { staticBaseURL } from 'common/staticURL';
import { Location } from 'history';
import { observable, reaction } from 'mobx';
import { observer } from 'mobx-react';
import { get as getPath } from 'object-path';
import { getSiteConfig, staticSaasURL } from 'saas/common/PublicData';


const siteCOnfigQuery = `
query {
  saas {
    getSiteConfig {
      apps
      name
      province
      slug
    }
  }
}`;

interface LoginProps {
  next?: string;
  location: Location;
}

interface State {
  identifier?: string;
  password?: string;
  errorText?: string;
  showText?: boolean;
  siteConfigState?: {
    site?: string,
    app?: string,
    platform?: string,
    config: {
      apps?: string[],
      name?: string,
      province?: string,
      slug?: string,
    },
  };
}

const loginText = [
  {
    img: 'login1.png',
    title: '成长档案',
    content: '在线一站式管理学生整体学业过程的档案与报告',
  },
  {
    img: 'login2.png',
    title: '生涯规划',
    content: '聚合专业规划、选科目规划及志愿填报工具',
  },
  {
    img: 'login3.png',
    title: '选课走班',
    content: '帮助院校及学生管理选课排课，生成师生个人课表',
  },
  {
    img: 'login4.png',
    title: '高考报告',
    content: '高考报考、专业职业选择及志愿填报模拟等工具',
  },
  {
    img: 'login5.png',
    title: '问卷调查',
    content: '学生参与调查，院校发布调查并收集信息',
  },
  {
    img: 'login6.png',
    title: '开放资源',
    content: '随时查询多种学业数据库，支持定制化服务',
  },
];

@Radium
@observer
class LoginView extends React.Component<LoginProps & WithAuth, State> {
  siteCOnfigQuery: Querier<any, any> = new Querier(null);
  disposers: Array<() => void> = [];

  constructor(props, context?) {
    super(props, context);
    this.state = {
      identifier: '',
      password: '',
      errorText: '',
      showText: false,
      siteConfigState: {
        site: 'saas',
        app: 'entrance',
        platform: 'saas',
        config: {
          apps: [
            'entrance',
          ],
        },
      },
    };
  }

  componentWillUnmount() {
    this.disposers.forEach(f => f());
    this.disposers = [];
  }

  componentWillMount() {
    this.getData();
  }

  getData() {
    this.siteCOnfigQuery.setReq({ query: siteCOnfigQuery });

    this.disposers.push(reaction(() => {
      return (getPath(this.siteCOnfigQuery.result, 'result.data.saas.getSiteConfig') as any) || [];
    }, searchData => {
      const oLi = document.getElementById('a2-saas-config').getElementsByTagName('li');
      let app = '';
      let site = '';
      for (let i = 0; i < oLi.length; i++) {
        if (oLi[i].dataset['name'] === 'app') {
          app = oLi[i].dataset['value'];
        }
        if (oLi[i].dataset['name'] === 'site') {
          site = oLi[i].dataset['value'];
        }
      }

      this.setState({
        siteConfigState: {
          site,
          app,
          config: {
            apps: searchData['apps'] || ['entrance'],
            name: searchData['name'] || undefined,
            province: searchData['province'] || undefined,
            slug: searchData['slug'] || undefined,
          },
        },
      });
    }));
  }

  postLogin = (ev) => {
    ev.preventDefault();
    this.props.auth.login({
      identifier: this.state.identifier,
      password: this.state.password,
    }).then(r => {
      if (r.kind === 'result') {
        return;
      }
      this.setState({ errorText: S[r.error_key] });
    });
  }

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
          '.animation': {
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            backgroundImage: `url(${staticBaseURL('saas/login.jpg')})`,
          },
          '.header': {
            height: '60px',
            borderBottom: '1px solid #e4e4e4',
            fontSize: '16px',
            background: '#fff',
          },
          '.logo': {
            float: 'left',
            paddingBottom: '10px',
          },
          '.logo-img': {
            height: '60px',
            borderRadius: '50%',
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
            fontSize: '18px',
            fontWeight: 'bold',
          },
          '.logo-content-bottom': {
            height: '50%',
            lineHeight: '30px',
            fontSize: '14px',
            color: '#999',
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
            borderRadius: '5px',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            padding: '50px 40px !important',
            boxShadow: '0 2px 20px 0 rgba(0, 0, 0, 0.1)',
          },
          '.login-title': {
            width: '288px',
            fontSize: '32px',
            fontWeight: 700,
            marginBottom: '10px',
          },
          '.login-icon': {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            overflow: 'hidden',
            float: 'left',
          },
          '.login-icon img': {
            width: '100%',
            height: '100%',
          },
          '.login-content-box': {
            margin: '-3px 0 48px 70px',
            color: '#fff',
          },
          '.login-content-title': {
            fontSize: '18px',
            marginBottom: '7px',
          },
          '.login-content': {
            fontSize: '12px',
          },
          '.form-input': {
            height: '46px',
            padding: '14px 10px',
            border: '1px solid #e4e4e4',
          },
          '.form-input-group': {
            marginBottom: '20px',
          },
          '.form-button': {
            height: '46px',
            color: '#fff',
            background: '#24a8ff',
            borderRadius: '5px',
          },
          '.form-button:hover': {
            color: '#fff',
          },
          '.login-bottom': {
            color: '#fff',
            textAlign: 'center',
            margin: '20px 0 10px',
          },
          '.login-form': {
            width: '460px',
            padding: '15px',
            marginTop: '45px',
            float: 'right',
          },
          '.login-form-sm': {
            width: '100%',
            padding: '50px 15px!important',
            marginTop: '40px',
          },
          'mediaQueries': {
            '(max-width: 768px)': {
              '.login-container': {
                padding: '0 5px',
              },
              '.logo-content': {
                width: 'auto',
              },
            },
          },
        }} />
        <div className='animation'></div>
        <div style={{ position: 'relative', paddingTop: '115px' }}>
          <div className='container login-container'>
            <div>
              <div className='col-md-6' style={{ color: '#fff' }}>
                <div className='login-title'>学生学业发展<br />与规划培养数据平台</div>
                <div>数据助力学生学业发展与规划培养，帮助学生找到最优学业解决方案</div>
                <form
                  className='login-form-sm visible-xs visible-sm'
                  onSubmit={this.postLogin}>
                  <div className='logo'>
                    {
                      getSiteConfig(this.state.siteConfigState, 'img.show') ?
                        (
                          <img className='logo-img'
                            src={`${getSiteConfig(this.state.siteConfigState, 'img.url')}`} />
                        )
                        :
                        this.state.siteConfigState.config.slug ?
                          (
                            <img className='logo-img'
                              src={staticSaasURL(`${this.state.siteConfigState.config.slug}`)} />
                          )
                          :
                          (
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
                          )
                    }
                    <div className='logo-content'>
                      <div className='logo-content-top'>
                        {
                          this.state.siteConfigState.config.name &&
                            this.state.siteConfigState.site !== 'fangfang' ?
                            this.state.siteConfigState.config.name
                            :
                            getSiteConfig(this.state.siteConfigState, 'logoContent.top')
                        }
                      </div>
                      <div className='logo-content-bottom'>
                        {getSiteConfig(this.state.siteConfigState, 'logoContent.bottom')}
                      </div>
                    </div>
                  </div>
                  <div className='form-input-group'>
                    <input
                      type='text'
                      className='form-control form-input'
                      placeholder='电子邮箱/用户名'
                      required
                      autoFocus={true}
                      onChange={
                        (ev) => {
                          this.setState({
                            identifier: ev.currentTarget.value.trim(),
                          });
                        }
                      }
                    />
                  </div>
                  <div className='form-input-group'>
                    <input
                      type='password'
                      className='form-control form-input'
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
                  <button className='btn btn-block form-button' id='login' type='submit'>登录</button>
                  <span id='forgetPassword'
                    style={[
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
                <div style={{ marginTop: '60px' }} className='row'>
                  {
                    loginText.map((row, i) => {
                      return (
                        <div className='col-md-6' key={i}>
                          <div className='login-icon' >
                            <img src={staticBaseURL(`saas/home/${row.img}`)} />
                          </div>
                          <div className='login-content-box'>
                            <div className='login-content-title'>{row.title}</div>
                            <div className='login-content'>{row.content}</div>
                          </div>
                        </div>
                      );
                    })
                  }
                </div>
              </div>
              <div className='col-md-6 hidden-xs hidden-sm'>
                <form
                  className='login-form'
                  onSubmit={this.postLogin}>
                  <div className='logo'>
                    {
                      getSiteConfig(this.state.siteConfigState, 'img.show') ?
                        (
                          <img className='logo-img'
                            src={`${getSiteConfig(this.state.siteConfigState, 'img.url')}`} />
                        )
                        :
                        this.state.siteConfigState.config.slug ?
                          (
                            <img className='logo-img'
                              src={staticSaasURL(`${this.state.siteConfigState.config.slug}`)} />
                          )
                          :
                          (
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
                          )
                    }
                    <div className='logo-content'>
                      <div className='logo-content-top'>
                        {
                          this.state.siteConfigState.config.name &&
                            this.state.siteConfigState.site !== 'fangfang' ?
                            this.state.siteConfigState.config.name
                            :
                            getSiteConfig(this.state.siteConfigState, 'logoContent.top')
                        }
                      </div>
                      <div className='logo-content-bottom'>
                        {getSiteConfig(this.state.siteConfigState, 'logoContent.bottom')}
                      </div>
                    </div>
                  </div>
                  <div className='form-input-group'>
                    <input
                      type='text'
                      className='form-control form-input'
                      placeholder='电子邮箱/用户名'
                      required
                      autoFocus={true}
                      onChange={
                        (ev) => {
                          this.setState({
                            identifier: ev.currentTarget.value.trim(),
                          });
                        }
                      }
                    />
                  </div>
                  <div className='form-input-group'>
                    <input
                      type='password'
                      className='form-control form-input'
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
                  <button className='btn btn-block form-button' id='login' type='submit'>登录</button>
                  <span id='forgetPassword'
                    style={[
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
              <div className='clearfix'></div>
            </div>
            <div className='login-bottom'>ApplySquare（申请方）提供平台数据及技术支持</div>
          </div>
        </div>
      </div>
    );
  }
}

export const Login = withAuth(LoginView);
