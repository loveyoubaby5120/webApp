import * as React from 'react';
import { Link } from 'common/Link';
import * as Radium from 'radium';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { withRouter } from 'react-router';
import { BaseStyles } from '../../BaseStyles';
import { Querier } from 'common/graphql';
import { observer } from 'mobx-react';
import { observable, autorun } from 'mobx';
import { gaokaoAddingScoreItems } from '../../PublicData';
import { Select } from 'common/antd/select';
const Option = Select.Option;
import 'antd/lib/select/style/css';
let Style = Radium.Style;

interface Props {
  location: { query: any };
  router: any;
}

interface State {
  recruit?: { kind: string, score: number, slug: string }[];
  awarded?: { kind: string, score: number, name: string };
  timeout?: any;
  currentValue?: any;
}

const query = `
query($offset: Int!, $q: String!) {
  gaokao {
    searchInstitute (size: 200, offset: $offset, q : $q) {
      items {
        slug
        native_name
        wikipedia {
          localized_name {
            cn
          }
        }
        name
      }
      page_info {
        count
        offset
      }
    }
  }
}`;

@observer
@Radium
export class BaseInfoBox extends React.Component<WithAppState & Props, State> {
  query: Querier<any, any>;
  @observable private resultData: any = [];

  constructor(props) {
    super(props);
    this.state = {
      recruit: this.props.data.gaoKaoState.userInfo.recruit,
      awarded: this.props.data.gaoKaoState.userInfo.awarded ?
        this.props.data.gaoKaoState.userInfo.awarded :
        {
          kind: undefined,
          score: undefined,
          name: undefined,
        },
      currentValue: '',
    };
  }

  componentWillMount() {
    if (this.state.recruit.length === 0) {
      this.state.recruit.push({
        kind: undefined,
        score: undefined,
        slug: undefined,
      });
    }
  }

  getData = () => {
    this.query = new Querier({
      query: query,
      variables: {
        offset: ((this.props.location.query.page || 1) - 1) * 20,
        q: this.state.currentValue,
      },
    });

    autorun(() => {
      if (this.query.result.status === 'ok') {
        this.resultData = this.query.result.result.data.gaokao.searchInstitute.items;
        this.forceUpdate();
      }
    });
  }

  onNext = (ev) => {
    if (
      !this.props.data.gaoKaoState.userInfo.total_score ||
      this.props.data.gaoKaoState.userInfo.total_score <= 0
    ) {
      this.props.data.showConfirm(
        '警告',
        '总分必填且大于0',
        false,
        true,
      );
      return;
    }
    if (!this.props.data.gaoKaoState.userInfo.discipline) {
      this.props.data.showConfirm(
        '警告',
        '文理必填',
        false,
        true,
      );
      return;
    }
    let recruitArray = [];
    this.state.recruit.forEach((r, i) => {
      if (r.kind && r.score) {
        recruitArray.push(r);
      }
    });

    this.props.data.gaoKaoState.userInfo.recruit = recruitArray;
    this.props.data.gaoKaoState.userInfo.awarded = this.state.awarded;

    if (this.props.location.query.url) {
      this.props.router.push(this.props.location.query.url);
    } else {
      this.props.router.push('/gaokao/ceping/preference');
    }
  }

  save = (ev) => {
    let kind = ev.target.getAttribute('data-kind');
    this.state[kind].push(
      {
        kind: undefined,
        score: undefined,
      }
    );
    this.forceUpdate();
  }

  del = (ev) => {
    let kind = ev.target.getAttribute('data-kind');
    let index = ev.target.getAttribute('data-index');
    this.state[kind].splice(index, 1);
    this.forceUpdate();
  }

  onChangeText = (ev) => {
    let val = ev.target.value;
    let kind = ev.target.getAttribute('data-kind');
    if (kind === 'total_score') {
      val = parseInt(val || 0, 10);
    }
    this.props.data.gaoKaoState.userInfo[kind] = val;
    this.forceUpdate();
  }

  onAwardedChangeText = (ev) => {
    let val = ev.target.value;
    let kind = ev.target.getAttribute('data-kind');
    let key = ev.target.getAttribute('data-key');

    if (key === 'score') {
      val = parseInt(val, 10);
    }
    this.props.data.gaoKaoState.userInfo[kind][key] = val;

    if (key === 'kind') {
      gaokaoAddingScoreItems.forEach((item, index) => {
        if (item.key === val) {
          this.props.data.gaoKaoState.userInfo[kind].name = item.content;
        }
      });
    }

    this.forceUpdate();
  }

  onChange = (ev) => {
    let val = ev.target.value;
    let index = ev.target.getAttribute('data-index');
    let key = ev.target.getAttribute('data-key');
    let kind = ev.target.getAttribute('data-kind');

    if (key === 'score') {
      val = parseInt(val, 10);
    }

    this.state[kind][index][key] = val;
    this.forceUpdate();
  }

  handleChange(kind: string, slug: string, index: number): (value) => void {
    return (value) => {
      if (this.state.timeout) {
        clearTimeout(this.state.timeout);
        this.state.timeout = null;
      }

      this.resultData.forEach((r, i) => {
        if (r.native_name === value) {
          this.state.recruit[index].kind = r.native_name;
          this.state.recruit[index].slug = r.slug;
        }
      });

      this.state.currentValue = value;

      this.state.timeout = setTimeout(this.getData, 300);

    };
  }

  render() {
    return (
      <div style={[BaseStyles.content]}>
        <Style rules={{
          '.ant-select-lg .ant-select-selection--single': {
            height: '34px',
          },
          '.ant-select-lg .ant-select-selection__rendered': {
            lineHeight: '32px',
          },
        }} />
        <div style={[BaseStyles.title]}>
          高考分数
        </div>
        <div style={[BaseStyles.option]}>
          <label htmlFor='total_score' style={[BaseStyles.option.label]}>
            总分
              <span style={[{ color: 'red' }]}>*</span>
          </label>
          <div style={[BaseStyles.option.input]}>
            <input type='number'
              className='form-control'
              id='total_score'
              value={
                this.props.data.gaoKaoState.userInfo.total_score ?
                  this.props.data.gaoKaoState.userInfo.total_score : ''
              }
              data-kind='total_score'
              onChange={this.onChangeText} />
          </div>
        </div>
        <div style={[{ marginBottom: '40px' }]}>
          <label htmlFor='discipline' style={[BaseStyles.option.label]}>
            文理
              <span style={[{ color: 'red' }]}>*</span>
          </label>
          <div style={[BaseStyles.option.input]}>
            <select id='discipline'
              className='form-control'
              style={[{ width: '173px' }]}
              value={
                this.props.data.gaoKaoState.userInfo.discipline ?
                  this.props.data.gaoKaoState.userInfo.discipline : ''
              }
              data-kind='discipline'
              onChange={this.onChangeText}>
              <option value='' style={[{ display: 'none' }]}>--选择文理科--</option>
              <option value='文科'>文科</option>
              <option value='理科'>理科</option>
            </select>
          </div>
        </div>
        <div htmlFor='recruit' style={[BaseStyles.title]}>
          自主招生
        </div>
        <div style={[]}>
          {
            this.state.recruit.map((r, i) => {
              return (
                <div key={i}
                  style={[
                    BaseStyles.option.input,
                    BaseStyles.option.mb,
                  ]}>
                  <Select
                    size='large'
                    combobox
                    defaultValue={r.kind ? r.kind : ''}
                    placeholder='输入或者搜索院校名'
                    notFoundContent=''
                    defaultActiveFirstOption={false}
                    filterOption={false}
                    onChange={this.handleChange(r.kind, r.slug, i)}
                    style={{
                      width: '300px',
                      marginRight: '10px',
                      fontSize: '14px',
                    }}
                  >
                    {
                      (this.resultData || []).map((row, index) => {
                        return (
                          <Option key={index}
                            value={
                              row.native_name ?
                                row.native_name
                                :
                                row.wikipedia.localized_name.cn ?
                                  row.wikipedia.localized_name.cn
                                  :
                                  row.name
                            }>
                            {
                              row.native_name ?
                                row.native_name
                                :
                                row.wikipedia.localized_name.cn ?
                                  row.wikipedia.localized_name.cn
                                  :
                                  row.name
                            }
                          </Option>
                        );
                      })
                    }
                  </Select>
                  <input type='number'
                    className='form-control'
                    value={r.score ? r.score : ''}
                    onChange={this.onChange}
                    data-index={i}
                    data-key='score'
                    data-kind='recruit'
                    style={[
                      BaseStyles.option.input,
                      BaseStyles.option.input.rightInput,
                    ]} />
                  <span className='fa fa-times'
                    data-index={i}
                    data-kind='recruit'
                    onClick={this.del}
                    style={[
                      BaseStyles.option.del,
                    ]} />
                </div>
              );
            })
          }
          <div style={[
            BaseStyles.option.save,
          ]}
            data-kind='recruit'
            onClick={this.save}>
            <span className='fa fa-plus' style={[BaseStyles.icon]} />
            添加自主招生学校
            </div>
        </div>
        <div htmlFor='awarded' style={[BaseStyles.title]}>
          加分选项
        </div>
        <div style={[]}>
          <div style={[
            BaseStyles.option.input,
            BaseStyles.option.mb,
            {
              marginBottom: '20px',
            },
          ]}>
            <select id='awarded'
              className='form-control'
              style={[
                BaseStyles.option.input,
                BaseStyles.option.input.leftInput,
              ]}
              value={this.state.awarded.kind ? this.state.awarded.kind : undefined}
              onChange={this.onAwardedChangeText}
              data-key='kind'
              data-kind='awarded'>
              <option value={undefined} style={[{ display: 'none' }]}>--选择加分项--</option>
              {
                gaokaoAddingScoreItems.map((item, index) => {
                  return (
                    <option key={index} value={item.key}>{item.content}</option>
                  );
                })
              }
            </select>
            <input type='number'
              className='form-control'
              value={this.state.awarded.score ? this.state.awarded.score : ''}
              onChange={this.onAwardedChangeText}
              data-key='score'
              data-kind='awarded'
              style={[
                BaseStyles.option.input,
                BaseStyles.option.input.rightInput,
              ]} />
          </div>
        </div>
        <button
          className='btn btn-success'
          onClick={this.onNext}
          style={[
            { width: '100px' },
            BaseStyles.opStyle,
          ]}>
          {
            this.props.location.query.url ?
              '修改' : '下一步'
          }
        </button>
        {
          this.props.location.query.url ?
            (
              <Link
                className='btn btn-default'
                to={this.props.location.query.url}
                style={[
                  { width: '100px' },
                  BaseStyles.opStyle,
                ]}>返回</Link>
            )
            : ''
        }
      </div>
    );
  }
}

export const BaseInfo = withAppState(withRouter(BaseInfoBox));
