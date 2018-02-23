import { Button } from 'common/antd/button';
import { Card } from 'common/antd/card';
import { Col } from 'common/antd/col';
import { Icon } from 'common/antd/icon';
import { Row } from 'common/antd/row';
import { pendingMessage, Querier } from 'common/graphql';
import { LanguageCode } from 'common/languageCode';
import { Link } from 'common/Link';
import { S } from 'common/locale_to_b';
import { BaseStyles } from 'confucius/baseStyles';
import { WithAppState, withAppState } from 'confucius/common/appStateStore';
import { staticURL, ToolNav } from 'confucius/publicData';
import { autorun, observable, reaction, toJS } from 'mobx';
import { observer } from 'mobx-react';
import { get as getPath } from 'object-path';
import * as Radium from 'radium';
import * as React from 'react';
import { withRouter } from 'react-router';
import { staticInstituteURL, staticInstituteURLCoverApp } from 'saas/common/PublicData';

const Style = Radium.Style;

const query = `
query{
    confucius {
        getRecommendedInstitutes{
            institutes {
                description {
                    cn
                    en
                }
                name {
                    cn
                    en
                }
                can_apply
                province
                slug
            }
        }
    }
}`;

@Radium
@observer
export class HomeView extends React.Component<{ router: any; } & WithAppState, {}> {
    query: Querier<any, any> = new Querier(null);
    disposers: Array<() => void> = [];

    @observable private language: string = document.documentElement.lang || 'cn';
    @observable private resultData?: any;
    @observable private loading: boolean = false;

    constructor(props) {
        super(props);
    }

    componentWillUnmount() {
        this.disposers.forEach(f => f());
        this.disposers = [];
    }

    componentDidMount() {
        this.getData();
    }

    getData() {
        this.disposers.push(autorun(() => {
            this.query.setReq({
                query,
            });
        }));

        this.disposers.push(autorun(() => {
            this.loading = this.query.refreshing;
        }));

        this.disposers.push(reaction(() => {
            return (getPath(this.query.result, 'result.data.confucius.getRecommendedInstitutes.institutes') as any) || {};
        }, searchData => {
            this.resultData = searchData;
        }));
    }

    render() {
        if (!toJS(this.resultData)) {
            return (<div></div>);
        }

        const nList = (ToolNav || []).map((row, index) => {
            return (
                <Link key={index}
                    to={row.link}
                    onClick={(ev) => {
                        ev.preventDefault();
                        if (row.windowRouter && row.windowRouter === true) {
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
            <div style={{ marginBottom: '100px' }}>
                <Style rules={{
                    '.banner': {
                        padding: '0 150px',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        height: '400px',
                    },
                    '.banner_text': {
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'contain',
                        backgroundPosition: '256px center',
                        marginTop: '58px',
                        height: '170px',
                    },
                    '.header': {
                        height: '80px',
                        fontSize: '14px',
                        paddingTop: '20px',
                    },
                    '.logo': {
                        float: 'left',
                        cursor: 'pointer',
                    },
                    '.logo-img': {
                        height: '60px',
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
                        lineHeight: '60px',
                        padding: '0 25px',
                        display: 'inline-block',
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
                        lineHeight: '60px',
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
                    '.body': {
                        padding: '0 150px',
                    },
                    '.body > .title': {
                        marginTop: '40px',
                        marginBottom: '10px',
                        fontSize: '14px',
                    },
                    '.custom-image img': {
                        display: 'block',
                        height: '100px',
                    },
                    '.custom-card': {
                        fontSize: '14px',
                        padding: '22px 22px',
                        position: 'relative',
                    },
                    '.custom-card p': {
                        color: '#333333',
                    },
                    '.custom-card p .icon': {
                        float: 'right',
                        marginTop: '3px',
                    },
                }} />
                <div className='banner' style={[{ backgroundImage: `url('${staticURL('banner.jpg')}')` }]}>
                    <div className='header'>
                        <div className='logo'>
                            <img className='logo-img' src={staticURL('hb_logo.png')} />
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
                    <div className='banner_text' style={[{ backgroundImage: `url('${staticURL('home_banner_text.png')}')` }]}></div>
                </div>
                <div className='body'>
                    <div className='title'>
                        {S['I Want To']}
                    </div>
                    <Row gutter={20}>
                        <Col span={8}>
                            <Card bodyStyle={{ padding: 0 }}>
                                <div className='custom-image'>
                                    <img alt='example' width='100%' src={staticURL('rank.jpg')} />
                                </div>
                                <div className='custom-card' style={{ cursor: 'pointer' }} onClick={() => {
                                    this.props.router.push(`/project/list?kind=order`);
                                }}>
                                    <p>
                                        <span>{S['View university project by rankings']}</span>
                                        <Icon className='icon' type='right' />
                                    </p>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card bodyStyle={{ padding: 0 }}>
                                <div className='custom-image'>
                                    <img alt='example' width='100%' src={staticURL('add.jpg')} />
                                </div>
                                <div className='custom-card' style={{ cursor: 'pointer' }} onClick={() => {
                                    this.props.router.push(`/project/list?kind=province`);
                                }}>
                                    <p>
                                        <span>{S['View university project by region']}</span>
                                        <Icon className='icon' type='right' />
                                    </p>
                                </div>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <Card bodyStyle={{ padding: 0 }}>
                                <div className='custom-image'>
                                    <img alt='example' width='100%' src={staticURL('all.jpg')} />
                                </div>
                                <div className='custom-card' style={{ cursor: 'pointer' }} onClick={() => {
                                    this.props.router.push(`/project/list`);
                                }}>
                                    <p>
                                        <span>{S['View all university projects']}</span>
                                        <Icon className='icon' type='right' />
                                    </p>
                                </div>
                            </Card>
                        </Col>
                    </Row>
                    <div className='title'>
                        {S['Recommended Universities']}
                    </div>
                    <Row gutter={20}>
                        <Col span={8}>
                            <Card bodyStyle={{ padding: 0 }}>
                                <div className='custom-image' style={{
                                    height: '160px',
                                    backgroundImage: `url('${staticInstituteURLCoverApp(`${this.resultData[0].slug}`)}')`,
                                    backgroundPosition: 'center',
                                    backgroundSize: 'cover',
                                    backgroundRepeat: 'no-repeat',
                                }}>
                                </div>
                                <div style={[
                                    BaseStyles.recommendedInstitutes.item.logo,
                                    BaseStyles.recommendedInstitutes.first.logo,
                                ]}>
                                    <div style={[
                                        {
                                            zIndex: '1',
                                            position: 'relative',
                                        },
                                    ]}>
                                        <img alt='example' style={BaseStyles.recommendedInstitutes.item.logo.img} src={staticInstituteURL(`${this.resultData[0].slug}`)} />
                                    </div>
                                    <div style={[
                                        BaseStyles.recommendedInstitutes.item.logo.textContent,
                                        {
                                            zIndex: '0',
                                        },
                                    ]}>
                                        <p style={[
                                            BaseStyles.recommendedInstitutes.item.logo.textContent.p,
                                            {
                                                color: '#fff',
                                                fontSize: '20px',
                                                backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                            },
                                        ]}>{this.resultData[0].name[LanguageCode]}</p>
                                        <p style={BaseStyles.recommendedInstitutes.item.logo.textContent.p}>{this.resultData[0].province}</p>
                                    </div>
                                </div>
                                <div className='custom-card'>
                                    <p style={[
                                        BaseStyles.recommendedInstitutes.item.description,
                                        {
                                            height: '60px',
                                        },
                                    ]}>
                                        {
                                            this.resultData[0].description[LanguageCode]
                                        }
                                    </p>
                                    <Button type='primary'
                                        onClick={() => {
                                            console.log(`/institute-${LanguageCode}/${this.resultData[0].slug}/`)
                                            window.open(`/institute-${LanguageCode}/${this.resultData[0].slug}/`);
                                        }}>{S['View']}</Button>
                                    <Button type='primary'
                                        disabled={!this.resultData[0].can_apply}
                                        style={{ marginLeft: '15px' }}
                                        onClick={() => {
                                            this.props.router.push({
                                                pathname: `/project/info/${this.resultData[0].slug}`,
                                                query: {
                                                    title: this.resultData[0].name[LanguageCode],
                                                },
                                            });
                                        }}>{S['Apply']}</Button>
                                </div>
                            </Card>
                        </Col>
                        <Col span={16}>
                            <Row gutter={20}>
                                {
                                    this.resultData.map((r, i) => {
                                        if (i === 0) {
                                            return;
                                        }
                                        return (
                                            <Col span={12} key={i} style={
                                                i > 2 ? {
                                                    marginTop: '15px',
                                                } : {}
                                            }>
                                                <Card bodyStyle={{ padding: 0 }}>
                                                    <div className='custom-image' style={{
                                                        height: '120px',
                                                        backgroundImage: `url('${staticInstituteURLCoverApp(`${r.slug}`)}')`,
                                                        backgroundPosition: 'center',
                                                        backgroundSize: 'cover',
                                                        backgroundRepeat: 'no-repeat',
                                                    }}>
                                                    </div>
                                                    <div style={BaseStyles.recommendedInstitutes.item.logo}>
                                                        <div style={[
                                                            {
                                                                zIndex: '1',
                                                                position: 'relative',
                                                                width: '100px',
                                                            },
                                                        ]}>
                                                            <img alt='example' style={BaseStyles.recommendedInstitutes.item.logo.img} src={staticInstituteURL(`${r.slug}`)} />
                                                        </div>
                                                        <div style={[
                                                            BaseStyles.recommendedInstitutes.item.logo.textContent,
                                                            {
                                                                zIndex: '0',
                                                            },
                                                        ]}>
                                                            <p style={[
                                                                BaseStyles.recommendedInstitutes.item.logo.textContent.p,
                                                                {
                                                                    color: '#fff',
                                                                    fontSize: '20px',
                                                                    backgroundColor: 'rgba(0, 0, 0, 0.4)',
                                                                },
                                                            ]}>{r.name[LanguageCode]}</p>
                                                            <p style={[
                                                                BaseStyles.recommendedInstitutes.item.logo.textContent.p,
                                                                { paddingRight: '110px' },
                                                            ]}>
                                                                {r.province}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className='custom-card'>
                                                        <Button type='primary'
                                                            style={BaseStyles.recommendedInstitutes.item.btn}
                                                            onClick={() => {
                                                                window.open(`/institute-${LanguageCode}/${r.slug}/`);
                                                            }}>{S['View']}</Button>
                                                    </div>
                                                </Card>
                                            </Col>
                                        );
                                    })
                                }
                            </Row>
                        </Col>
                    </Row>
                </div>

                <Row gutter={20} style={{ marginTop: '150px', padding: '0 40px' }}>
                    <Col span={8}>
                        <Row gutter={20}>
                            <Col span={8} style={{ lineHeight: '100px', paddingTop: '20px' }}>
                                <img src='http://www.chinesecio.com/about/img/page3_s1.png'
                                    style={{
                                        maxWidth: '96px',
                                        width: '100%',
                                    }} />
                            </Col>
                            <Col span={8} style={{ lineHeight: '100px', paddingTop: '20px' }}>
                                <img src='http://www.chinesecio.com/about/img/page3_s2.png'
                                    style={{
                                        maxWidth: '96px',
                                        width: '100%',
                                    }} />
                            </Col>
                            <Col span={8} style={{ lineHeight: '100px', paddingTop: '20px' }}>
                                <img src='http://www.chinesecio.com/about/img/page3_s3.png'
                                    style={{
                                        maxWidth: '96px',
                                        width: '100%',
                                    }} />
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={20}>
                            <Col span={8} style={{ lineHeight: '33.3px', textAlign: 'center', paddingTop: '20px' }}>
                                <a href='http://www.chinesecio.com/about/about_us.html' style={{ display: 'block' }}>关于我们</a>
                                <a href='http://www.chinesecio.com/about/f_privacy.html' style={{ display: 'block' }}>隐私与条款</a>
                                <a href='http://www.chinesecio.com/about/f_statement.html' style={{ display: 'block' }}>网站声明</a>
                            </Col>
                            <Col span={8} style={{ textAlign: 'center' }}>
                                <img src='http://www.chinesecio.com/about/img/footer_logo.png'
                                    style={{
                                        maxWidth: '130px',
                                        width: '100%',
                                    }} />
                                <p style={{
                                    color: '#2e8c70',
                                    fontSize: '14px',
                                    fontWeight: 'bold',
                                    marginTop: '20px',
                                }}>学习汉语 体验文化</p>
                            </Col>
                            <Col span={8} style={{ lineHeight: '33.3px', textAlign: 'center', paddingTop: '20px' }}>
                                <a href='http://www.chinesecio.com/about/f_copyright.html' style={{ display: 'block' }}>默认版权协议</a>
                                <a href='http://www.chinesecio.com/about/f_contact.html' style={{ display: 'block' }}>联系我们</a>
                                <a href='mailto:contact@chinesecio.com' style={{ display: 'block' }}>意见反馈</a>
                            </Col>
                        </Row>
                    </Col>
                    <Col span={8}>
                        <Row gutter={20}>
                            <Col span={8} style={{ lineHeight: '100px', paddingTop: '20px' }}>
                                <img src='http://www.chinesecio.com/about/img/page3_s4.png'
                                    style={{
                                        maxWidth: '96px',
                                        width: '100%',
                                    }} />
                            </Col>
                            <Col span={8} style={{ lineHeight: '100px', paddingTop: '20px' }}>
                                <img src='http://www.chinesecio.com/about/img/page3_s5.png'
                                    style={{
                                        maxWidth: '96px',
                                        width: '100%',
                                    }} />
                            </Col>
                            <Col span={8} style={{ lineHeight: '100px', paddingTop: '20px' }}>
                                <img src='http://www.chinesecio.com/about/img/page3_s6.png'
                                    style={{
                                        maxWidth: '96px',
                                        width: '100%',
                                    }} />
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }
}

export const Home = withRouter(withAppState(HomeView));
