import { observer } from 'mobx-react';
import * as Radium from 'radium';
import * as React from 'react';
import { withRouter } from 'react-router';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { fangfangNav, Nav, studentNav, teacherNav } from 'saas/common/NavData';
import PermissionTags from 'saas/common/permission_tags';
import { staticURL } from 'saas/common/PublicData';
import { Role } from 'saas/common/types';
const Style = Radium.Style;

@Radium
@observer
export class HomeView extends React.Component<{ router: any; } & WithAppState, {}> {
    render() {
        let navList: Nav[];
        const permissions = this.props.data.appState.currentUser.permissions;
        const site = this.props.data.siteConfigState.site;
        const role = PermissionTags.GetRole(permissions, site);
        let isStudent = true;
        if (Role.Student === role) {
            navList = studentNav;
        } else {
            isStudent = false;
            navList = teacherNav;
        }

        if (this.props.data.siteConfigState.site === 'fangfang') {
            navList = fangfangNav;
            isStudent = true;
        }

        navList = (navList || []).filter((r, i) => {
            let showNav = false;
            this.props.data.siteConfigState.config.apps.forEach((o, n) => {
                r.childer.forEach((k, c) => {
                    if (o === k.key) {
                        showNav = true;
                    }
                });
            });
            return showNav;
        });

        return (
            <div className='home-body-box'>
                <Style rules={{
                    '.home-body-box': {
                        minHeight: '100%',
                        position: 'relative',
                        paddingBottom: '200px',
                    },
                    '.body': {
                        background: '#f8f8f8',
                    },
                    '.body-box': {
                        padding: '0',
                    },
                    '.home-body': {
                        padding: '0 10%',
                    },
                    '.home-item-box': {
                        cursor: 'pointer',
                        marginBottom: '20px',
                        borderRadius: '5px',
                        boxShadow: '0 1px 6px 0 rgba(0, 0, 0, 0.05)',
                        border: '1px solid #e4e4e4',
                        background: '#fff',
                    },
                    '.home-item': {
                        height: '135px',
                        display: 'table-cell',
                        verticalAlign: 'middle',
                        overflow: 'hidden',
                        padding: '0 20px',
                        position: 'relative',
                    },
                    '.home-item-box:hover': {
                        backgroundColor: '#F9F9FB',
                    },
                    '.home-item-box:hover h3': {
                        color: '#0099ff !important',
                    },
                    '.home-bottom': {
                        padding: '100px 0',
                        textAlign: 'center',
                        background: `url(${staticURL('home/background.png')}) no-repeat bottom`,
                        position: 'absolute',
                        width: '100%',
                        bottom: 0,
                    },
                    'mediaQueries': {
                        '(max-width: 750px)': {
                            '.home-body-box': {
                                paddingBottom: '100px',
                            },
                            '.home-body': {
                                padding: 0,
                            },
                            '.home-bottom': {
                                padding: '50px',
                            },
                        },
                    },
                }} />
                <div className='home-body'>
                    <div className='row'
                        style={{
                            margin: 0,
                            paddingTop: '30px',
                        }}>
                        {
                            navList.map((r, i) => {
                                let showNav = false;
                                r.childer.forEach((k, c) => {
                                    if (this.props.data.siteConfigState.config.apps.indexOf(k.key) === -1) {
                                        return;
                                    }
                                    if (!k.permissions
                                        || (k.permissions(site, permissions))) {
                                        showNav = true;
                                    }
                                });
                                if (!showNav) {
                                    return null;
                                }

                                return (
                                    <div key={i} className='col-sm-12'>
                                        <p style={[
                                            {
                                                padding: '0 5px',
                                                margin: '0 0 20px',
                                                fontSize: '18px',
                                                color: '#000',
                                            },
                                        ]}>
                                            {r.title}
                                        </p>
                                        {
                                            r.childer.map((item, index) => {
                                                if (this.props.data.siteConfigState.config.apps.indexOf(item.key) === -1) {
                                                    return null;
                                                }
                                                if (item.permissions
                                                    && !item.permissions(site, permissions)) {
                                                    return null;
                                                }

                                                return (
                                                    <div key={index} className='col-sm-4' style={{ padding: '0 5px' }}>
                                                        <div className='home-item-box'>
                                                            <div className='home-item'
                                                                id={item.key}
                                                                onClick={(ev) => {
                                                                    ev.preventDefault();
                                                                    if (item.openWindow && item.openWindow === true) {
                                                                        window.open(item.link);
                                                                    } else {
                                                                        window.location.href = item.link;
                                                                    }
                                                                }}>
                                                                <img src={staticURL(this.props.data.siteConfigState.site === 'fangfang' ? item.icon : `home/${item.icon}`)}
                                                                    style={[
                                                                        {
                                                                            position: 'absolute',
                                                                            width: '50px',
                                                                            top: '50%',
                                                                            marginTop: '-25px',
                                                                        },
                                                                    ]} />
                                                                <div style={{ marginLeft: '70px' }}>
                                                                    <h3 style={[
                                                                        {
                                                                            color: '#333',
                                                                            fontSize: '18px',
                                                                            margin: '0 0 10px',
                                                                        },
                                                                    ]}>
                                                                        {item.title}
                                                                    </h3>
                                                                    <p style={[
                                                                        {
                                                                            color: '#666666',
                                                                            fontSize: '14px',
                                                                            maxHeight: '60px',
                                                                            overflow: 'hidden',
                                                                            textOverflow: 'ellipsis',
                                                                        },
                                                                    ]} title={item.describe}>
                                                                        {item.describe}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })
                                        }
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
                <div className='home-bottom'>
                    ApplySquare（申请方）提供平台数据及技术支持
                </div>
            </div>
        );
    }
}

export const Home = withRouter(withAppState(HomeView));
