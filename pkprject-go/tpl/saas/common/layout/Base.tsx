import * as React from 'react';
import * as Radium from 'radium';
let Style = Radium.Style;
import { withRouter } from 'react-router';
import { Link } from 'common/Link';
import { staticBaseURL } from 'common/staticURL';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { Confirm } from 'saas/common/Confirm';
import { BatchSave } from './BatchSave';
import * as echarts from 'echarts';
let walden = require('saas/common/walden.json');

export const staticURL = (img: string) => {
  return staticBaseURL('saas/' + img);
};

export const cdnURL = (img: string) => {
  return 'https://cdn.applysquare.net/sass/' + img + '/logo.png';
};

interface Props {
  router?: any;
}
@Radium
class BaseInfo extends React.Component<Props & WithAppState, void> {
  constructor(props) {
    super(props);
  }

  render() {
    echarts.registerTheme('walden', walden);

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
            cursor: 'pointer',
          },
          '.logo-img': {
            height: '49px',
            verticalAlign: 'top',
          },
          '.logo-content': {
            display: 'inline-block',
            height: '60px',
            color: '#000',
            paddingLeft: '6px',
            width: '270px',
            fontSize: '16px',
          },
          '.logo-content-top': {
            lineHeight: '60px',
          },
          '.logo-content-bottom': {
            height: '50%',
            lineHeight: '15px',
          },
          '.nav': {
            height: '100%',
            float: 'left',
            position: 'relative',
          },
          '.nav a': {
            textDecoration: 'none',
            color: '#fff',
            lineHeight: '56px',
            padding: '0 25px',
            display: 'inline-block',
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
            lineHeight: '60px',
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
            top: '60px',
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
        }} />
        <Confirm />
        <BatchSave />
        <div className='header'>
          <div className='logo'
            onClick={(ev) => {
              ev.preventDefault();
              window.location.href = `/`;
            }}>
            <span style={[
              {
                backgroundColor: '#0099ff',
                borderRadius: '50%',
                fontSize: '20px',
                padding: '10px',
                margin: '0 0 0 10px',
              },
            ]}>
              <span className='fa fa-university' style={[
                {
                  color: '#fff',
                },
              ]} />
            </span>
            <div className='logo-content'>
              <div className='logo-content-top'>学生学业发展与规划培养信息化平台</div>
            </div>
          </div>
          <div className='nav'>
          </div>
          <div className='admin' style={{ float: 'right', position: 'relative', minWidth: '120px', cursor: 'pointer' }}>
            <Link>
              <span style={[
                {
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
              ]}>
                <span className='fa fa-user' style={[
                  {
                    color: '#fff',
                    position: 'absolute',
                    left: '8px',
                    top: '7px',
                  },
                ]} />
              </span>
              {this.props.data.appState.currentUser.name}
            </Link>
            <div className='user-center'>
              <a href='/user/logout'>退出</a>
            </div>
          </div>
        </div>
        <div className='body clearfix'>
          <div style={[
            {
              padding: '0 10% 50px',
              height: '100%',
              margin: '0 auto',
              overflow: 'auto',
            },
          ]}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

export const Base = withAppState(withRouter(BaseInfo));
