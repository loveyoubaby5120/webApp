import * as React from 'react';
import { Link } from 'common/Link';
import * as Radium from 'radium';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { withRouter } from 'react-router';
import { BaseStyles } from '../../BaseStyles';
import { risks, batchs, staticURL, format } from '../../PublicData';
import { Querier, mutate, pendingMessage } from 'common/graphql';
import { get as getPath } from 'object-path';
import { observable, autorun } from 'mobx';
import { observer } from 'mobx-react';

const mutationCreate = `
mutation($data: InputUserCepingProfile!){
  gaokao{
    create (
      data: $data,
    )
  }
}
`;

const mutationUpdata = `
mutation($data: InputUserCepingProfile!,$id: String!) {
  gaokao{
    update (
      data: $data,
      id: $id,
    ){
      error_msg
      status
    }
  }
}
`;

const query = `
query($id: String!, $round: Int, $level: Int){
  gaokao {
    getReportInstituteSheet(id: $id, round: $round, level: $level) {
      institutes {
        slug
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
            localized_name {
              cn
            }
          }
        }
        recommanded_field_of_studies {
          name
        }
        scores {
          avg
          high
          low
          year
        }
      }
    }
  }
}`;

@observer
@Radium
export class AnalysisBox extends React.Component<WithAppState & { router: any; }, void> {
  query: Querier<any, any>;
  @observable private resultData: any = [];

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.onSent();
  }

  getData() {
    this.query = new Querier({
      query: query,
      variables: {
        id: this.props.data.gaoKaoState.userInfo.id,
        round: batchs.indexOf(this.props.data.gaoKaoState.batch),
        level: risks.indexOf(this.props.data.gaoKaoState.risk),
      },
    });

    autorun(() => {
      if (this.query.result.status === 'ok') {
        this.resultData = this.query.result.result.data;
        this.forceUpdate();
      }
      this.props.data.closeConfirm();
    });
  }

  onSent() {
    this.props.data.showConfirm(
      '提示',
      '分析中',
      false,
      false,
    );

    let oLi = document.getElementById('a2-saas-config').getElementsByTagName('li');
    let site = '';
    for (let i = 0; i < oLi.length; i++) {
      if (oLi[i].dataset['name'] === 'site') {
        site = oLi[i].dataset['value'];
      }
    }
    if (site === 'minghu') {
      this.props.data.gaoKaoState.userInfo.location = 'shandong';
    }

    mutate<{}, any>({
      query: this.props.data.gaoKaoState.userInfo.id ? mutationUpdata : mutationCreate,
      variables: {
        data: format(this.props.data.gaoKaoState.userInfo),
        id: this.props.data.gaoKaoState.userInfo.id,
      },
    }).then(r => {
      if (!this.props.data.gaoKaoState.userInfo.id) {
        this.props.data.gaoKaoState.userInfo.id = r.data.gaokao.create;
      }
      this.getData();
    }, error => {
      this.props.data.showConfirm(
        '警告',
        `Error: ${JSON.stringify(error)}`,
        true,
        false,
      );
    });
  }

  onChangeText = (ev) => {
    let val = ev.target.getAttribute('data-value');
    let kind = ev.target.getAttribute('data-kind');
    this.props.data.gaoKaoState[kind] = val;
    this.getData();
  }

  render() {
    const pending = pendingMessage(getPath(this.query, 'result'));
    if (pending) {
      return (<div>{pending}</div>);
    }

    return (
      <div>
        <div className='col-sm-9'>
          <div style={[
            BaseStyles.content,
          ]}>
            <div style={[BaseStyles.title]}>
              高考报考测评分析结果
            </div>
            <div style={[BaseStyles.option]}>
              <label style={[BaseStyles.option.label3]}>
                报考风险:
              </label>
              <ul className='list-unstyled' style={[
                BaseStyles.option.input,
                BaseStyles.search,
              ]}>
                {
                  risks.map((r, i) => {
                    return (
                      <li key={i}
                        style={[
                          BaseStyles.search.item,
                        ]}>
                        <span key={`risk${i}lable`}
                          data-kind='risk'
                          data-value={r}
                          onClick={this.onChangeText}
                          style={[
                            BaseStyles.search.item.span,
                            this.props.data.gaoKaoState.risk === r ?
                              BaseStyles.search.item.span.active : {},
                          ]}>{r}</span>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
            <div style={[]}>
              <label style={[BaseStyles.option.label3]}>
                学校批次:
              </label>
              <ul className='list-unstyled' style={[
                BaseStyles.option.input,
                BaseStyles.search,
              ]}>
                {
                  batchs.map((r, i) => {
                    return (
                      <li key={i}
                        style={[
                          BaseStyles.search.item,
                        ]}>
                        <span key={`batch${i}lable`}
                          data-kind='batch'
                          data-value={r}
                          onClick={this.onChangeText}
                          style={[
                            BaseStyles.search.item.span,
                            this.props.data.gaoKaoState.batch === r ?
                              BaseStyles.search.item.span.active : {},
                          ]}>{r}</span>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </div>
          {
            (this.resultData.gaokao.getReportInstituteSheet.institutes || []).map((r, i) => {
              return (
                <div style={[
                  BaseStyles.content,
                  BaseStyles.content.m,
                  BaseStyles.institute,
                ]}
                  key={i}
                  data-slug={r.slug}
                  onClick={(ev) => {
                    ev.preventDefault();
                    this.props.router.push(
                      `/gaokao/ceping/institute/${r.slug}/${batchs.indexOf(this.props.data.gaoKaoState.batch)}/${risks.indexOf(this.props.data.gaoKaoState.risk)}`
                    );
                  }}>
                  <div style={[BaseStyles.institute.t]}>
                    <img src={staticURL(r.slug)} alt='' style={[BaseStyles.institute.t.img]} />
                    <div style={[BaseStyles.institute.t.info]}>
                      <div style={[BaseStyles.institute.t.info.content]}>
                        <span style={[BaseStyles.institute.t.info.content.title]}>
                          {
                            getPath(r, 'institute.wikipedia.localized_name.cn') || getPath(r, 'institute.name') || ''
                          }
                        </span>
                        <span className='fa fa-map-marker' style={[
                          BaseStyles.institute.t.info.content.icon,
                          r.institute && r.institute.status ?
                            {} : {
                              display: 'none',
                            },
                        ]} />
                        <span style={[BaseStyles.institute.t.info.content.map]}>
                          {getPath(r, 'institute.status') || ''}
                        </span>
                      </div>
                      <div style={[BaseStyles.institute.t.info.kind]}>
                        <span style={[BaseStyles.institute.t.info.kind.span]}>
                          {getPath(r, 'institute.china.type') || ''}
                        </span>
                        <span style={[BaseStyles.institute.t.info.kind.span]}>
                          {getPath(r, 'institute.china.level') || ''}
                        </span>
                        <span style={[BaseStyles.institute.t.info.kind.span]}>
                          {getPath(r, 'institute.china.belong_to') || ''}
                        </span>
                      </div>
                      <div style={[BaseStyles.institute.t.info.score]}>
                        <div className='col-sm-7' style={[BaseStyles.institute.t.info.score.left]}>
                          <label style={[BaseStyles.institute.t.info.score.left.label]}>平均分</label>
                          {
                            r.scores.map((item, index) => {
                              if (index < 3) {
                                return (
                                  <span key={index} style={[
                                    BaseStyles.institute.t.info.score.left.span,
                                    index === 2 ? { borderRight: 'none' } : {},
                                  ]}>
                                    {item.year}: {item.avg ? item.avg : '无'}
                                  </span>
                                );
                              }
                            })
                          }
                        </div>
                        <div className='col-sm-5' style={[BaseStyles.institute.t.info.score.right]}>
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
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={[BaseStyles.institute.b]}>
                    <div style={[BaseStyles.institute.b.title]}>
                      匹配专业
                    </div>
                    <div style={[BaseStyles.institute.b.right]}>
                      {
                        (r.recommanded_field_of_studies || []).map((item, index) => {
                          return (
                            <span key={index}
                              className='col-xs-4'
                              style={[
                                BaseStyles.institute.b.right.span,
                                {
                                  marginBottom: '10px',
                                },
                              ]}>
                              {`${index + 1}、${item.name}`}
                            </span>
                          );
                        })
                      }
                    </div>
                  </div>
                </div>
              );
            })
          }
          <div className='text-center'
            style={[
              this.resultData.gaokao.getReportInstituteSheet.institutes.length === 0 ?
                {

                } :
                {
                  display: 'none',
                },
              {
                fontSize: '16px',
                color: '#666666',
                margin: '40px 0',
              },
            ]}>
            鉴于你所处的分数段，该批次的策略理应不是你重点考虑的对象，因此我们在此不做推荐。
          </div>
        </div>
        <div className='col-sm-3'>
          <div style={[
            BaseStyles.content,
          ]}>
            <div style={[
              BaseStyles.option.bb,
            ]}>
              <div style={[
                BaseStyles.title,
                {
                  position: 'relative',
                  display: 'block',
                },
              ]}>
                基本信息
                <Link
                  to={`/gaokao/ceping/baseInfo`}
                  query={{ url: '/gaokao/ceping/analysis' }}
                  style={[
                    BaseStyles.option.edit2,
                  ]}>
                  <span className='fa fa-pencil'
                    style={[
                      BaseStyles.option.edit2.span,
                    ]} />
                  编辑
                </Link>
              </div>
              <div style={[BaseStyles.option]}>
                <label>
                  总分
                </label>
                <div style={[BaseStyles.option.fc]}>
                  {this.props.data.gaoKaoState.userInfo.total_score}
                </div>
              </div>
              <div style={[
                BaseStyles.option,
              ]}>
                <label>
                  文理
                </label>
                <div style={[BaseStyles.option.fc]}>
                  {this.props.data.gaoKaoState.userInfo.discipline}
                </div>
              </div>
              <div style={[
                BaseStyles.option,
              ]}>
                <label>
                  自主招生
                </label>
                <div style={[BaseStyles.option.fc]}>
                  {
                    this.props.data.gaoKaoState.userInfo.recruit.map((r, i) => {
                      if (r.kind && r.score) {
                        return (
                          <span key={i}
                            style={[
                              { display: 'block' },
                            ]}>
                            {r.kind}
                            <span style={[
                              { marginLeft: '20px' },
                            ]}>
                              {r.score}分
                          </span>
                          </span>
                        );
                      }
                    })
                  }
                </div>
              </div>
              <div style={[
                BaseStyles.option,
              ]}>
                <label>
                  加分项目
                </label>
                <div style={[BaseStyles.option.fc]}>
                  <span style={[
                    { marginBottom: '10px', display: 'block' },
                  ]}>
                    {this.props.data.gaoKaoState.userInfo.awarded.name}
                    <span style={[
                      { marginLeft: '20px' },
                    ]}>
                      {
                        this.props.data.gaoKaoState.userInfo.awarded.name ?
                          `${this.props.data.gaoKaoState.userInfo.awarded.score}分` : ''
                      }
                    </span>
                  </span>
                </div>
              </div>
            </div>
            <div style={[
              { padding: '20px 0 0' },
            ]}>
              <div style={[BaseStyles.title]}>
                选择与偏好
              </div>
              <div style={[BaseStyles.option]}>
                <label style={[
                  {
                    position: 'relative',
                    display: 'block',
                  },
                ]}>
                  优先选择
                  <Link
                    to={`/gaokao/ceping/preference/fill`}
                    query={{ url: '/gaokao/ceping/analysis' }}
                    style={[
                      BaseStyles.option.edit2,
                    ]}>
                    <span className='fa fa-pencil'
                      style={[
                        BaseStyles.option.edit2.span,
                      ]} />
                    编辑
                  </Link>
                </label>
                <div style={[BaseStyles.option.fc]}>
                  {this.props.data.gaoKaoState.userInfo.fill}
                </div>
              </div>
              <div style={[
                BaseStyles.option,
              ]}>
                <label style={[
                  {
                    position: 'relative',
                    display: 'block',
                  },
                ]}>
                  省份偏好
                  <Link
                    to={`/gaokao/ceping/preference/regional`}
                    query={{ url: '/gaokao/ceping/analysis' }}
                    style={[
                      BaseStyles.option.edit2,
                    ]}>
                    <span className='fa fa-pencil'
                      style={[
                        BaseStyles.option.edit2.span,
                      ]} />
                    编辑
                  </Link>
                </label>
                <div style={[BaseStyles.option.fc]}>
                  {this.props.data.gaoKaoState.userInfo.regionalName.join(',')}
                </div>
              </div>
              <div style={[
                BaseStyles.option,
              ]}>
                <label style={[
                  {
                    position: 'relative',
                    display: 'block',
                  },
                ]}>
                  专业偏好
                  <Link
                    to={`/gaokao/ceping/preference/professional`}
                    query={{ url: '/gaokao/ceping/analysis' }}
                    style={[
                      BaseStyles.option.edit2,
                    ]}>
                    <span className='fa fa-pencil'
                      style={[
                        BaseStyles.option.edit2.span,
                      ]} />
                    编辑
                  </Link>
                </label>
                <div style={[BaseStyles.option.fc]}>
                  {this.props.data.gaoKaoState.userInfo.professionalName.join(',')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export const Analysis = withAppState(withRouter(AnalysisBox));
