import * as React from 'react';
import { Link } from 'common/Link';
import * as Radium from 'radium';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { withRouter } from 'react-router';
import { BaseStyles } from '../../BaseStyles';
import {
  staticURL, staticDifficultyURL,
  gaokaoDifficulties, staticFieldOfStudyURL,
} from '../../PublicData';
import { Querier, pendingMessage } from 'common/graphql';
import { get as getPath } from 'object-path';
import { observer } from 'mobx-react';

const query = `
query($id: String!, $round: Int, $level: Int, $slug: String!){
  gaokao {
    getReportInstitute(id: $id, round: $round, level: $level, slug: $slug) {
      slug
      difficulty
      probability
      institute {
        name
        state
        logo_url
        china {
          type
          level
          belong_to
        }
        wikipedia {
          localized_description {
            cn
          }
          localized_name {
            cn
          }
        }
      }
      recommanded_field_of_studies {
        name
        field_of_study {
          name {
            cn
            en
          }
        }
        probability
        score {
          high
          low
          avg
          year
        }
        slug
      }
      scores {
        avg
        high
        low
        year
      }
    }
  }
}`;

interface Props {
  params?: { slug: string, round: number, level: number };
}

interface State {
  showContent?: boolean;
  showClick?: boolean;
  onRun?: boolean;
}

@observer
@Radium
export class InstituteBox extends React.Component<WithAppState & Props, State> {
  query: Querier<any, any>;
  text: any;

  constructor(props) {
    super(props);
    this.state = {
      showContent: false,
      showClick: false,
      onRun: true,
    };
  }

  onWindowResize = () => {
    let clientHeight = this.text['clientHeight'];
    if (!this.state.showClick) {
      this.setState({
        showContent: clientHeight < 100,
      });
    }
  }

  componentDidUpdate() {
    if (this.query.result.status === 'ok' && this.state.onRun) {
      this.onWindowResize();
      this.state.onRun = false;
    }
  }

  componentWillMount() {
    window.addEventListener('resize', this.onWindowResize);
    this.getData();
  }

  getData() {
    this.query = new Querier({
      query: query,
      variables: {
        slug: this.props.params.slug,
        id: this.props.data.gaoKaoState.userInfo.id,
        round: this.props.params.round,
        level: this.props.params.level,
      },
    });
  }

  showContent = (ev) => {
    this.setState({
      showContent: !this.state.showContent,
      showClick: true,
    });
  }

  render() {
    const pending = pendingMessage(getPath(this.query, 'result'));
    if (pending) {
      return (<div>{pending}</div>);
    }
    let resultData: any = getPath(this.query, 'result.result.data');

    let probability = parseFloat((resultData.gaokao.getReportInstitute.probability * 100).toFixed(2));
    let trRegion = { transform: `rotate(${(18 / 5) * probability}deg)` };
    let clipAuto = { clip: 'rect(auto, auto, auto, auto)' };
    let wth0 = { width: 0 };
    let clipAutoRegion;
    let wth0Region;

    if (probability <= 50) {
      clipAutoRegion = {};
      wth0Region = wth0;
    } else {
      clipAutoRegion = clipAuto;
      wth0Region = {};
    }

    return (
      <div style={[BaseStyles.content]}>
        <div style={[
          BaseStyles.title,
          {
            position: 'relative',
            display: 'block',
          },
        ]}>
          院校信息
          <Link
            to={`/gaokao/ceping/analysis`}
            style={[
              BaseStyles.option.black,
            ]}>
            返回志愿表
          </Link>
        </div>
        <div style={[
          BaseStyles.institute.t,
          {
            borderBottom: 'none',
          },
        ]}>
          <img src={staticURL(resultData.gaokao.getReportInstitute.slug)} alt='' style={[BaseStyles.institute.t.img]} />
          <div style={[BaseStyles.institute.t.info]}>
            <div style={[BaseStyles.institute.t.info.content]}>
              <span style={[BaseStyles.institute.t.info.content.title]}>
                {
                  getPath(resultData.gaokao.getReportInstitute, 'institute.wikipedia.localized_name.cn') ||
                  getPath(resultData.gaokao.getReportInstitute, 'institute.name') || ''
                }
              </span>
              <span className='fa fa-map-marker' style={[
                BaseStyles.institute.t.info.content.icon,
                resultData.gaokao.getReportInstitute.institute &&
                  resultData.gaokao.getReportInstitute.institute.status ?
                  {} : {
                    display: 'none',
                  },
              ]} />
              <span style={[BaseStyles.institute.t.info.content.map]}>
                {getPath(resultData.gaokao.getReportInstitute, 'institute.status') || ''}
              </span>
            </div>
            <div style={[BaseStyles.institute.t.info.kind]}>
              <span style={[BaseStyles.institute.t.info.kind.span]}>
                {getPath(resultData.gaokao.getReportInstitute, 'institute.china.type') || ''}
              </span>
              <span style={[BaseStyles.institute.t.info.kind.span]}>
                {getPath(resultData.gaokao.getReportInstitute, 'institute.china.level') || ''}
              </span>
              <span style={[BaseStyles.institute.t.info.kind.span]}>
                {getPath(resultData.gaokao.getReportInstitute, 'institute.china.belong_to') || ''}
              </span>
            </div>
          </div>
        </div>
        <div ref={r => this.text = r}
          style={[
            {
              overflow: 'hidden',
              lineHeight: '25px',
            },
            this.state.showContent ?
              {

              } : {
                maxHeight: '100px',
              },
          ]}>
          {getPath(resultData.gaokao.getReportInstitute, 'institute.wikipedia.localized_description.cn') || ''}
        </div>
        <p onClick={this.showContent}
          style={[
            BaseStyles.instituteInfo.clr,
            {
              cursor: 'pointer',
              margin: '5px 0',
            },
            this.state.showContent ||
              !resultData.gaokao.getReportInstitute.institute.wikipedia.localized_description.cn ?
              {
                display: 'none',
              } : {

              },
          ]}>
          查看更多》
        </p>
        <div style={[
          BaseStyles.instituteInfo,
        ]}>
          <span className='fa fa-bar-chart'
            style={[
              BaseStyles.instituteInfo.icon,
            ]} />
          <label style={[BaseStyles.institute.t.info.score.left.label]}>平均分</label>
          <span style={[
            BaseStyles.institute.t.info.score.left.span,
            BaseStyles.instituteInfo.clr,
            BaseStyles.pointer,
          ]}>
            <a href={`https://www.applysquare.com/institute-cn/${this.props.params.slug}/`} target='_blank'>
              初始院校信息
            </a>
          </span>
          <span style={[
            BaseStyles.institute.t.info.score.left.span,
            BaseStyles.instituteInfo.clr,
            BaseStyles.pointer,
          ]}>
            <a href={`https://www.applysquare.com/institute-cn/${this.props.params.slug},gaokao/`} target='_blank'>
              高考报名信息
            </a>
          </span>
          <span style={[
            BaseStyles.institute.t.info.score.left.span,
            BaseStyles.instituteInfo.clr,
            BaseStyles.pointer,
          ]}>
            <a href={`https://www.applysquare.com/institute-cn/${this.props.params.slug},life/`} target='_blank'>
              校园生活信息
            </a>
          </span>
          <span style={[
            BaseStyles.institute.t.info.score.left.span,
            BaseStyles.instituteInfo.clr,
            BaseStyles.pointer,
          ]}>
            <a href={`https://www.applysquare.com/institute-cn/${this.props.params.slug},career/`} target='_blank'>
              毕业求职信息
            </a>
          </span>
        </div>
        <div style={[
          BaseStyles.instituteInfo.step,
        ]}>
          1、录取分析
        </div>
        <div style={[
          {
            overflow: 'hidden',
            padding: '50px 0',
          },
        ]}>
          <div className='col-sm-6'>
            <h5 className='text-center'>录取概率</h5>
            <div>
              <div style={[
                BaseStyles.instituteInfo.garden,
                BaseStyles.instituteInfo.garden.po,
                BaseStyles.instituteInfo.garden.wrap,
              ]}>
                <div style={[
                  BaseStyles.instituteInfo.garden,
                  BaseStyles.instituteInfo.garden.wrap.circle,
                  clipAutoRegion,
                ]}>
                  <div style={[
                    BaseStyles.instituteInfo.garden,
                    BaseStyles.instituteInfo.garden.wrap.circle.percent,
                    BaseStyles.instituteInfo.garden.wrap.circle.left,
                    trRegion,
                  ]}></div>
                  <div style={[
                    BaseStyles.instituteInfo.garden,
                    BaseStyles.instituteInfo.garden.wrap.circle.percent,
                    BaseStyles.instituteInfo.garden.wrap.circle.right,
                    wth0Region,
                  ]}></div>
                </div>
                <div style={[BaseStyles.instituteInfo.garden.num]}>
                  <span>{probability}</span>%
                </div>
              </div>
            </div>
          </div>
          <div className='col-sm-6 text-center'>
            <h5 className='text-center'>报考定位</h5>
            <img src={staticDifficultyURL(resultData.gaokao.getReportInstitute.difficulty + 1)}
              alt=''
              style={[BaseStyles.institute.t.imgCenter]} />
            <p className='text-center'>
              {gaokaoDifficulties[resultData.gaokao.getReportInstitute.difficulty]}
            </p>
          </div>
        </div>
        <div style={[
          BaseStyles.instituteInfo.step,
        ]}>
          2、推荐专业列表
        </div>
        <div style={[
          {
            backgroundColor: '#f7f7f7',
            padding: '10px',
            marginBottom: '10px',
          },
        ]}>
          我们结合你对专业的偏好已经你的成绩情况，我们为你推荐了如下
          {
            (
              resultData.gaokao.getReportInstitute.recommanded_field_of_studies || []
            ).length
          }
          个专业。点击每个专业，你将进入该专业的学业数据库，查看更详细的信息
        </div>
        {
          (
            resultData.gaokao.getReportInstitute.recommanded_field_of_studies || []
          ).map((r, i) => {
            return (
              <div key={i}
                style={[
                  BaseStyles.institute,
                  BaseStyles.institute.t,
                  {
                    padding: '20px 0',
                  },
                ]}
                onClick={(ev) => {
                  ev.preventDefault();
                  if (r.slug) {
                    window.open(`https://www.applysquare.com/fos/${r.slug}/`);
                  }
                }}>
                <a style={[
                  BaseStyles.instituteInfo.leftIndex,
                ]}>
                  <span style={[
                    BaseStyles.instituteInfo.leftIndex.index,
                  ]}>
                    {(Array(2).join('0') + (i + 1)).slice(-2)}
                    <div style={[
                      BaseStyles.instituteInfo.leftIndex.numberLine,
                    ]} />
                  </span>
                </a>
                <div>
                  <img src={staticFieldOfStudyURL(r.slug)} alt='' style={[BaseStyles.institute.t.img]} />
                  <div style={[
                    BaseStyles.institute.t.info,
                    {
                      overflow: 'hidden',
                    },
                  ]}>
                    <div className='col-sm-6'>
                      <div style={[BaseStyles.institute.t.info.content]}>
                        <span style={[
                          BaseStyles.institute.t.info.content.title,
                          {
                            color: '#333333',
                            fontWeight: 'bold',
                          },
                        ]}>
                          {r.name}
                        </span>
                      </div>
                      <div style={[]}>
                        <span style={[
                          BaseStyles.institute.t.info.kind.span,
                          {
                            color: '#0099ff',
                          },
                        ]}>
                          {getPath(r, 'field_of_study.name.cn') || ''}
                        </span>
                      </div>
                      <div style={[]}>
                        <span style={[
                          BaseStyles.institute.t.info.kind.span,
                          {
                            color: '#0099ff',
                          },
                        ]}>
                          {getPath(r, 'field_of_study.name.en') || ''}
                        </span>
                      </div>
                    </div>
                    <div className='col-sm-6' style={[BaseStyles.institute.t.info.score.right]}>
                      <table style={[
                        { width: '100%' },
                      ]} className='hight-blue-progress'>
                        <tbody>
                          <tr>
                            <td style={[
                              { width: '60px' },
                            ]}>录取概率</td>
                            <td>
                              <div className='progress sp-bottom sp-top'
                                style={[
                                  {
                                    height: '15px',
                                    margin: '0 10px',
                                    borderRadius: '7.5px',
                                  },
                                ]}>
                                <div role='progressbar'
                                  style={[
                                    {
                                      width: `${(r.probability * 100).toFixed(2)}%`,
                                      backgroundColor: '#4baaf7',
                                    },
                                  ]}
                                  className='progress-bar'>
                                </div>
                              </div>
                            </td>
                            <td style={[
                              {
                                width: '80px',
                                textAlign: 'left',
                                fontSize: '20px',
                                color: '#4baaf7',
                              },
                            ]}>
                              {`${(r.probability * 100).toFixed(2)}%`}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <p style={[
                        {
                          marginTop: '10px',
                        },
                      ]}>
                        <span style={[BaseStyles.instituteInfo.red]}>
                          {
                            r.score.year ? r.score.year : '2015'
                          }
                        </span>
                        <span style={[
                          BaseStyles.instituteInfo.span,
                        ]}>
                          最高分
                        </span>
                        <span style={[BaseStyles.instituteInfo.red]}>
                          {
                            r.score.high ?
                              r.score.high : '无'
                          }
                        </span>
                        <span style={[
                          BaseStyles.instituteInfo.span,
                        ]}>
                          最低分
                        </span>
                        <span style={[BaseStyles.instituteInfo.red]}>
                          {
                            r.score.low ?
                              r.score.low : '无'
                          }
                        </span>
                        <span style={[
                          BaseStyles.instituteInfo.span,
                        ]}>
                          平均分
                        </span>
                        <span style={[BaseStyles.instituteInfo.red]}>
                          {
                            r.score.avg ?
                              r.score.avg : '无'
                          }
                        </span>
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
  }
}

export const Institute = withAppState(withRouter(InstituteBox));
