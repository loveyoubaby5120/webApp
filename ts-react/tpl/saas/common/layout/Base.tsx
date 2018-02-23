import * as Radium from 'radium';
import * as React from 'react';
const Style = Radium.Style;
import { Icon } from 'common/antd/icon';
import { Modal } from 'common/antd/modal';
import { pendingMessage, Querier } from 'common/graphql';
import { Link } from 'common/Link';
import { autorun, reaction } from 'mobx';
import { observer } from 'mobx-react';
import { get as getPath } from 'object-path';
import { withRouter } from 'react-router';
import { staticURL as qkyStaticURL } from 'saas/app/courseArrangement/publicData';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { qkyToolNav, toolNav } from 'saas/common/NavData';
import { getSiteConfig, staticSaasURL, staticURL } from 'saas/common/PublicData';
import 'saas/common/style/base_antd.sass';
import { BatchSave } from './BatchSave';

import * as echarts from 'echarts';
const walden = require('saas/common/walden.json');
// let china = require('echarts/map/json/china.json');

export const cdnURL = (img: string) => {
  return 'https://cdn.applysquare.net/sass/' + img + '/logo.png';
};

const siteConfigQuery = `
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
        interested_fos_keys
        interested_fos {
            key
            name {
                cn
                en
            }
        }
        selected_elective_names
        selected_electives {
            icon
            name
        }
      }
    }
  }
}`;

interface Props {
  router?: any;
  location?: any;
}

interface BaseState {
  showMenu?: boolean;
}

@Radium
@observer
class BaseInfo extends React.Component<Props & WithAppState, BaseState> {
  siteConfigQuery: Querier<any, any> = new Querier(null);
  query: Querier<any, any> = new Querier(null);
  disposers: Array<() => void> = [];

  constructor(props) {
    super(props);
    this.state = {
      showMenu: true,
    };
  }

  showMenuClick = (ev) => {
    ev.preventDefault();
    this.setState({ showMenu: !this.state.showMenu });
  }

  componentWillMount() {
    const oLi = document.getElementById('a2-saas-config').getElementsByTagName('li');
    let app = '';
    let site = '';
    let platform = '';
    for (let i = 0; i < oLi.length; i++) {
      if (oLi.hasOwnProperty(i)) {
        if (oLi[i].dataset && oLi[i].dataset['name'] === 'app') {
          app = oLi[i].dataset['value'];
        }
        if (oLi[i].dataset && oLi[i].dataset['name'] === 'site') {
          site = oLi[i].dataset['value'];
        }
        if (oLi[i].dataset && oLi[i].dataset['name'] === 'platform') {
          platform = oLi[i].dataset['value'];
        }
      }
    }
    this.props.data.siteConfigState.app = app;
    this.props.data.siteConfigState.site = site;
    this.props.data.siteConfigState.platform = platform;
    this.getData();
  }

  componentWillUnmount() {
    this.disposers.forEach(f => f());
    this.disposers = [];
  }

  getData() {
    this.siteConfigQuery.setReq({ query: siteConfigQuery });
    this.query.setReq({ query });

    this.disposers.push(reaction(() => {
      return (getPath(this.siteConfigQuery.result, 'result.data.saas.getSiteConfig') as any) || [];
    }, searchData => {
      this.props.data.siteConfigState.config.apps = searchData['apps'] || ['entrance'];
      this.props.data.siteConfigState.config.name = searchData['name'] || undefined;
      this.props.data.siteConfigState.config.province = searchData['province'] || undefined;
      this.props.data.siteConfigState.config.slug = searchData['slug'] || undefined;
      this.props.data.gaokaoScoreState.userInfo.location = searchData['province'] || undefined;
      this.props.data.gaokaoScoreState.userInfo.currentschool = {
        key: searchData['name'] || undefined,
        value: searchData['name'] || undefined,
      };
    }));

    this.disposers.push(reaction(() => {
      return (getPath(this.query.result, 'result.data.auth.get_user_info') as any) || [];
    }, searchData => {
      this.props.data.appState.currentUser.id = searchData['id'] || '';
      this.props.data.appState.currentUser.username = searchData['username'] || '';
      this.props.data.appState.currentUser.email = searchData['email'] || '';
      this.props.data.appState.currentUser.permissions = searchData['tags'] || [];
      if (searchData['data']) {
        this.props.data.appState.currentUser.name = searchData['data'].name || '';
        this.props.data.appState.currentUser.gender = searchData['data'].gender || '';
        this.props.data.appState.currentUser.entryyear = searchData['data'].grade || '';
        this.props.data.appState.currentUser.class = searchData['data'].class || '';
        this.props.data.appState.currentUser.stu_id = searchData['data'].stu_id || '';
        this.props.data.appState.currentUser.phone = searchData['data'].phone || '';
        this.props.data.appState.currentUser.position = searchData['data'].position || '';
        this.props.data.appState.currentUser.interested_fos = searchData['data'].interested_fos || [];
        this.props.data.appState.currentUser.interested_fos_keys = searchData['data'].interested_fos_keys || [];
        this.props.data.appState.currentUser.selected_electives = searchData['data'].selected_electives || [];
        this.props.data.appState.currentUser.selected_elective_names = searchData['data'].selected_elective_names || [];
      }
    }));
  }

  render() {
    const pending = pendingMessage(this.siteConfigQuery.result);
    const pendingQuery = pendingMessage(this.query.result);
    if (pending || pendingQuery) {
      return (<div>{pending || pendingQuery}</div>);
    }

    echarts.registerTheme('walden', walden);

    const nList = ((getSiteConfig(this.props.data.siteConfigState, 'baseLayout.nav') || toolNav)[this.props.data.siteConfigState.app] || []).map((row, index) => {
      let hasPerm = false;
      let renderTab = false;
      if (!row.permissions) {
        hasPerm = true;
      } else {
        hasPerm = row.permissions(this.props.data.siteConfigState.site, this.props.data.appState.currentUser.permissions);
      }
      if (!row.ifRenderTab) {
        renderTab = true;
      } else {
        renderTab = row.ifRenderTab(this.props.data.siteConfigState.config.apps);
      }
      if (!hasPerm || !renderTab) {
        return null;
      }
      return (
        <Link key={index}
          id={this.props.data.siteConfigState.app + '-' + index}
          to={row.link}
          onClick={(ev) => {
            ev.preventDefault();
            if (row.windowRouter && row.windowRouter === true) {
              this.props.router.push(row.link);
            } else {
              window.location.href = row.link;
            }
          }}>
          {row.title}
        </Link>
      );
    }).filter(ele => !!ele);

    return (
      <div>
        <Style rules={{
          'body': {
            fontSize: '14px',
          },
          '.header': {
            height: '50px',
            fontSize: '14px',
            background: '#fff',
            borderBottom: '1px solid #e4e4e4',
            position: 'fixed',
            width: '100%',
            zIndex: 10,
          },
          '.logo': {
            float: 'left',
            cursor: 'pointer',
          },
          '.logo-img-qky': {
            height: '50px',
            padding: '5px',
            marginRight: '20px',
          },
          '.logo-icon': {
            backgroundColor: '#0099ff',
            borderRadius: '50%',
            fontSize: '20px',
            padding: '10px',
            margin: '0 0 0 10px',
          },
          '.logo-img': {
            height: '30px',
            marginLeft: '15px',
            borderRadius: '5px',
            marginTop: '-5px',
          },
          '.logo-img-saas': {
            width: '26px',
            marginLeft: '22px',
            marginTop: '-20px',
          },
          '.logo-content': {
            display: 'inline-block',
            height: '50px',
            color: '#000',
            paddingLeft: '6px',
            width: '270px',
            fontSize: '16px',
          },
          '.logo-content-saas': {
            display: 'inline-block',
            height: '50px',
            color: '#666',
            padding: '5px 10px 5px 12px',
            width: '150px',
            fontSize: '14px',
          },
          '.logo-content-top': {
            lineHeight: '50px',
          },
          '.logo-content-bottom': {
            height: '50%',
            lineHeight: '15px',
          },
          '.logo-line': {
            width: '1px',
            height: '30px',
            display: 'inline-block',
            background: '#e4e4e4',
            marginRight: '10px',
          },
          '.nav': {
            height: '100%',
            float: 'left',
            position: 'relative',
          },
          '.nav a': {
            textDecoration: 'none',
            color: '#000',
            lineHeight: '46px',
            padding: '0 25px',
            display: 'inline-block',
            transition: 'none',
          },
          '.nav a:hover': {
            color: '#0099FF',
            borderBottom: '4px solid #0099FF',
          },
          '.nav a.active': {
            color: '#0099FF',
            borderBottom: '4px solid #0099FF',
          },
          '.admin > a': {
            textDecoration: 'none',
            color: '#000',
            lineHeight: '50px',
            display: 'inline-block',
            padding: '0 25px',
          },
          '.header .oe-img': {
            height: '30px',
            position: ' absolute',
            top: '10px',
            left: '-18px',
          },
          '.body': {
            position: 'fixed',
            top: '50px',
            bottom: 0,
            left: 0,
            right: 0,
            background: '#fafafa',
          },
          '.content': {
            marginLeft: '278px',
            marginRight: '18px',
            transition: 'width .2s',
            height: '100%',
            overflow: 'auto',
            paddingBottom: '50px',
          },
          '.icon-color': {
            color: 'rgba(119, 63, 162, 0.5)',
          },
          '.admin:hover, .admin.active': {
            backgroundColor: 'rgba(228, 228, 228, 0.5)',
            color: '#0099FF',
          },
          '.user-center': {
            position: 'absolute',
            right: 0,
            zIndex: 2,
            background: '#fff',
            width: '100%',
            display: 'none',
          },
          '.user-center a': {
            display: 'block',
            width: '100%',
            height: '50px',
            textAlign: 'center',
            lineHeight: '50px',
            color: '#000',
            transition: 'none',
            textDecoration: 'none',
          },
          '.admin:hover .user-center': {
            display: 'block',
          },
          '.user-center a:hover': {
            color: '#0099FF',
            background: 'rgba(228, 228, 228, 0.5)',
          },
          '.fa-plus': {
            color: '#6c3',
          },
          '.body-box': {
            padding: '0 10% 50px',
            height: '100%',
            margin: '0 auto',
            overflow: 'auto',
          },
          '.admin': {
            float: 'right',
            position: 'relative',
            minWidth: '120px',
            cursor: 'pointer',
          },
          '.admin-background': {
            backgroundColor: '#0099ff',
            borderRadius: '50%',
            fontSize: '16px',
            margin: '0 10px 0 0',
            display: 'inline-block',
            width: '30px',
            height: '30px',
            position: 'relative',
            verticalAlign: 'middle',
          },
          '.fa-user': {
            color: '#fff',
            position: 'absolute',
            left: '9px',
            top: '6px',
          },
          '.menu': {
            float: 'left',
            cursor: 'pointer',
            padding: '0 12px',
            lineHeight: '46px',
          },
          '.logo-content-add': {
            display: 'inline-block',
            verticalAlign: 'top',
          },
          '.logo-content-name': {
            display: 'inline-block',
            padding: '15px 10px',
          },
          'mediaQueries': {
            '(min-width: 750px)': {
              '.menu': {
                display: 'none',
              },
            },
            '(max-width: 750px)': {
              '.header': {
                height: '50px',
                borderBottom: '1px solid #e4e4e4',
                fontSize: '16px',
                background: '#fff',
              },
              '.body-box': {
                padding: 0,
              },
              '.logo-content': {
                height: '50px',
                fontSize: '14px',
              },
              '.logo-content-add': {
                display: 'none',
              },
              '.logo-img, .logo-background': {
                display: 'none',
              },
              '.logo-img-saas': {
                display: 'none',
              },
              '.nav': {
                float: 'none',
                position: 'absolute',
                top: '50px',
                width: '100%',
                left: '0',
                zIndex: '2',
                borderBottom: '1px solid #e4e4e4',
                display: this.state.showMenu ? 'none' : '',
              },
              '.nav a': {
                textDecoration: 'none',
                color: '#000',
                lineHeight: '40px',
                padding: '10 0 10 20px',
                display: 'block',
                transition: 'none',
                fontSize: '14px',
                width: '100%',
                backgroundColor: '#fff',
              },
              '.nav a.active': {
                color: '#0099FF',
                borderBottom: '0px solid #0099FF',
              },
              '.admin': {
                float: 'none',
                position: 'absolute',
                right: '0',
                minWidth: '45px',
              },
              '.admin > a': {
                lineHeight: '50px',
                padding: '0 15px',
                fontSize: '12px',
              },
              '.admin-background': {
                backgroundColor: 'transparent',
                fontSize: '14px',
                margin: '0 15px 0 0',
                display: 'inline-block',
                width: '10px',
              },
              '.fa-user': {
                color: '#0099FF',
                marginRight: '5px',
              },
            },
          },
        }} />
        <Modal
          title={this.props.data.loading.title}
          confirmLoading={true}
          visible={this.props.data.loading.show}
          closable={false}
          style={{ textAlign: 'center', top: '40%' }}
          footer={null}
        >
          <p>
            <Icon type='loading' style={{ paddingRight: '10px' }} />
            {this.props.data.loading.tip}
          </p>
        </Modal>
        <BatchSave />
        <div className='header'>
          <div className='menu'>
            <div onClick={this.showMenuClick}>
              <i className={'fa fa-bars'} style={{ color: '#0099ff' }}></i>
            </div>
          </div>
          {getSiteConfig(this.props.data.siteConfigState, 'baseLayout.logo') ? <div className='logo'>
            <img className='logo-img-qky'
              src={qkyStaticURL(this.props.data.siteConfigState.app === 'courseArrangement' ? 'logo2.png' : 'logo3.png')} />
          </div> : <div className='logo'
            onClick={(ev) => {
              ev.preventDefault();
              window.location.href = `/`;
            }}>
              {
                getSiteConfig(this.props.data.siteConfigState, 'img.show') ?
                  (
                    <div style={{ display: 'inline-blcok' }}>
                      <img className='logo-img'
                        src={`${getSiteConfig(this.props.data.siteConfigState, 'img.url')}`} />
                      <div className='logo-content'>
                        <div className='logo-content-top'>
                          {getSiteConfig(this.props.data.siteConfigState, 'logoContent.bottom')}
                        </div>
                      </div>
                    </div>
                  )
                  :
                  (
                    <div style={{ display: 'inline-blcok' }}>

                      {
                        this.props.data.siteConfigState.app === 'entrance' && this.props.location && this.props.location.pathname === '/home' ? (<div className='logo-content-add'>
                          <img className='logo-img-saas' style={{ marginTop: '0' }} src={staticSaasURL(`${this.props.data.siteConfigState.config.slug}`)} />
                          <div className='logo-content-name'>
                            {this.props.data.siteConfigState.config.name}
                          </div>
                          <div className='logo-line' style={{ marginTop: '10px', float: 'right' }}></div>
                        </div>) : (<img className='logo-img-saas' src={staticURL('logo.png')} />)
                      }
                      <div className='logo-content-saas'>
                        <div>
                          {(() => {
                            const title = getSiteConfig(this.props.data.siteConfigState, 'logoContent.bottom');
                            if (title === '学生学业发展与规划培养数据平台') {
                              return (
                                <div>
                                  学生学业发展<br />与规划培养数据平台
                                                            </div>
                              );
                            }
                            return title;
                          })()}
                        </div>
                      </div>
                      {
                        this.props.data.siteConfigState.app === 'entrance' && this.props.location && this.props.location.pathname === '/home' ? null : (
                          <div className='logo-line'></div>
                        )
                      }
                    </div>
                  )
              }
            </div>}

          <div className='nav' onClick={this.showMenuClick}>
            {nList}
          </div>
          <div className='admin'
            id='admin-user-info'>
            <Link>
              <span className='admin-background'>
                <span className='fa fa-user' />
              </span>
              {this.props.data.appState.currentUser.name}
            </Link>
            {
              getSiteConfig(this.props.data.siteConfigState, 'baseLayout.logout') ?
                (
                  < div className='user-center' >
                    <a href='/user/logout'>退出</a>
                  </div>
                ) : null
            }
          </div>
        </div>
        <div className='body clearfix'>
          <div className='body-box' ref='body-box'>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export const Base = withRouter(withAppState(BaseInfo));
