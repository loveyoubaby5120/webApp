import { Link } from 'common/Link';
import { S } from 'common/locale_to_b';
import { WithAppState, withAppState } from 'confucius/common/appStateStore';
import { staticURL, ToolNav } from 'confucius/publicData';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import * as Radium from 'radium';
import * as React from 'react';
import { withRouter } from 'react-router';
import { Row } from 'common/antd/row';
import { Col } from 'common/antd/col';
const Style = Radium.Style;

@Radium
@observer
export class BaseInfo extends React.Component<WithAppState & { router?: any, applysq?: boolean }, {}> {

    @observable private language: string = document.documentElement.lang || 'cn';

    constructor(props) {
        super(props);
    }

    render() {
        const nList = (ToolNav || []).map((row, index) => {
            return (
                <Link key={index}
                    to={row.link}
                    onClick={(ev) => {
                        ev.preventDefault();
                        if (row.windowRouter && row.windowRouter === true && !this.props.applysq) {
                            this.props.router.push(row.link);
                        } else {
                            window.location.href = row.link;
                        }
                    }}>
                    {S[row.title]}
                </Link>
            );
        }).filter(ele => !!ele);

        return (
            <div>
                <Style rules={{
                    '#confucius_header': {
                        position: 'fixed',
                        right: 0,
                        left: 0,
                        top: 0,
                        zIndex: 1030,
                    },
                    'body': {
                        fontSize: '14px',
                    },
                    '.header': {
                        height: '50px',
                        fontSize: '14px',
                        padding: '0 150px 0 20px',
                        border: '1px #e4e4e4 solid',
                    },
                    '.logo': {
                        float: 'left',
                        // cursor: 'pointer',
                    },
                    '.logo-img': {
                        height: '30px',
                        margin: '10px 0',
                    },
                    '.nav': {
                        height: '100%',
                        float: 'left',
                        position: 'relative',
                        paddingLeft: '20px',
                    },
                    '.nav a': {
                        textDecoration: 'none',
                        color: '#999999',
                        lineHeight: '50px',
                        padding: '0 25px',
                        display: 'inline-block',
                        cursor: 'pointer !important',
                        transition: 'none',
                    },
                    '.nav a:hover': {
                        color: '#000',
                    },
                    '.nav a.active': {
                        color: '#000',
                    },
                    '.language': {
                        float: 'right',
                        position: 'relative',
                        lineHeight: '50px',
                        height: '100%',
                    },
                    '.language span': {
                        cursor: 'pointer',
                        color: '#999999',
                    },
                    '.language span.active': {
                        cursor: 'pointer',
                        color: '#000',
                    },
                    '.language i': {
                        padding: '0 5px',
                    },
                    '.banner': {
                        height: '120px',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        position: 'relative',
                    },
                    '.banner_text': {
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: 'right center',
                        height: '120px',
                        width: '220px',
                        display: 'inline-block',
                        position: 'absolute',
                        right: '150px',
                        top: 0,
                    },
                    '.body': {
                        position: 'absolute',
                        top: '50px',
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: '#fafafa',
                    },
                    '.body-box': {
                        height: '100%',
                        margin: '0 auto',
                        overflow: 'auto',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'bottom',
                    },
                }} />
                <div className='header' style={this.props.applysq ? { backgroundColor: '#fff' } : {}}>
                    <div className='logo'>
                        <img className='logo-img' src={staticURL('hb_logo.png')} />
                        <img className='logo-img' src={staticURL('a2logo.png')} style={{ marginLeft: '20px' }} />
                    </div>
                    <div className='nav'>
                        {nList}
                    </div>
                    <div className='language'>
                        <span className={this.language === 'cn' ? 'active' : ''}
                            onClick={() => {
                                document.documentElement.lang = 'cn';
                                this.language = 'cn';
                            }}>中文</span>
                        <i>/</i>
                        <span className={this.language === 'en' ? 'active' : ''}
                            onClick={() => {
                                document.documentElement.lang = 'en';
                                this.language = 'en';
                            }}>English</span>
                    </div>
                </div>
                <div className='body clearfix' style={this.props.applysq ? { display: 'none' } : {}}>
                    <div className='body-box' ref='body-box' style={[
                        { backgroundImage: `url(${staticURL('bottom.jpg')})` },
                    ]}>
                        <div className='banner' style={{ backgroundImage: `url(${staticURL('top.jpg')})` }}>
                            <div className='banner_text' style={{ backgroundImage: `url(${staticURL('text.png')})` }}></div>
                        </div>
                        <div style={{ padding: '0 10% 50px' }}>
                            {this.props.children}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const Base = withRouter(withAppState(BaseInfo));
