import * as React from 'react';
import { Link } from 'common/Link';
import * as Radium from 'radium';
import * as mobx from 'mobx';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { withRouter } from 'react-router';
import { BaseStyles } from '../../../BaseStyles';
import {
  regionalData, regionalListData,
  professionalData, professionalListData,
} from '../../../PublicData';

interface Props {
  router: any;
  route: any;
  location: { query: { url: string } };
}

interface State {
  resultData?: any;
  loading?: boolean;
  error?: boolean;
  errorMessage?: string;
  data?: { key: string, value: string }[];
  listData?: any;
  select?: string[];
  selectName?: string[];
}

@Radium
export class MultipleChoiceBox extends React.Component<WithAppState & Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      resultData: [],
      loading: true,
      error: false,
      data: this.props.route.path === 'regional' ? regionalData : professionalData,
      listData: this.props.route.path === 'regional' ? regionalListData : professionalListData,
      select: mobx.toJS(this.props.data.gaoKaoState.userInfo[this.props.route.path]),
      selectName: mobx.toJS(this.props.data.gaoKaoState.userInfo[`${this.props.route.path}Name`]),
    };
  }

  ok = (ev) => {
    this.props.data.gaoKaoState.userInfo[this.props.route.path] = this.state.select;
    this.props.data.gaoKaoState.userInfo[`${this.props.route.path}Name`] = this.state.selectName;
    if (this.props.location.query.url) {
      this.props.router.push(this.props.location.query.url);
    } else {
      this.props.router.push('/gaokao/ceping/preference');
    }
  }

  onClick = (ev) => {
    let key = ev.target.getAttribute('data-key');
    let regionKey = ev.target.getAttribute('data-regionKey');
    let regionList = this.state.listData[regionKey];
    if (key !== 'all') {
      let lableNum = 0;
      for (let i = 0; i < regionList.length; i++) {
        let subscript = this.state.select.indexOf(regionList[i].key);
        if (subscript > -1) {
          lableNum++;
        }
      }

      if (lableNum === regionList.length) {
        for (let i = 0; i < regionList.length; i++) {
          let index = this.state.select.indexOf(regionList[i].key);
          if (index > -1) {
            this.state.select.splice(index, 1);
            this.state.selectName.splice(index, 1);
          }
        }
      }

      let value = ev.target.getAttribute('data-value');
      let index = this.state.select.indexOf(key);
      if (index > -1) {
        this.state.select.splice(index, 1);
        this.state.selectName.splice(index, 1);
      } else {
        this.state.select.push(key);
        this.state.selectName.push(value);
      }
    } else {
      let lableNum = 0;
      for (let i = 0; i < regionList.length; i++) {
        let subscript = this.state.select.indexOf(regionList[i].key);
        if (subscript > -1) {
          lableNum++;
        }
      }

      if (lableNum === regionList.length) {
        for (let i = 0; i < regionList.length; i++) {
          let index = this.state.select.indexOf(regionList[i].key);
          if (index > -1) {
            this.state.select.splice(index, 1);
            this.state.selectName.splice(index, 1);
          }
        }
      }else {
        for (let i = 0; i < regionList.length; i++) {
          let index = this.state.select.indexOf(regionList[i].key);
          if (index === -1) {
            this.state.select.push(regionList[i].key);
            this.state.selectName.push(regionList[i].value);
          }
        }
      }
    }
    this.forceUpdate();
  }

  render() {
    return (
      <div style={[BaseStyles.content]}>
        <div style={[BaseStyles.title.title]}>
          请选择你的
          {
            this.props.route.path === 'regional' ?
              '省份' : '兴趣专业'
          }
          （可多选）
        </div>
        {
          this.props.route.path === 'regional' ?
            (
              <span style={[BaseStyles.describe]}>
                你的省份选择将会影响生成的志愿表中的学校范围
              </span>
            )
            : ''
        }
        <ul className='list-unstyled' style={[BaseStyles.multipleChoice]}>
          {
            this.state.data.map((r, i) => {
              let regionList = this.state.listData[r.key];
              let lableNum = 0;
              for (let n = 0; n < regionList.length; n++) {
                let subscript = this.state.select.indexOf(regionList[n].key);
                if (subscript > -1) {
                  lableNum++;
                }
              }

              return (
                <li key={i}
                  style={[
                    BaseStyles.multipleChoice.item,
                  ]}>
                  <div style={[
                    BaseStyles.multipleChoice.item.title,
                  ]}>
                    {r.value}:
                  </div>
                  <ul className='list-unstyled'
                    style={[
                      BaseStyles.multipleChoice.item.children,
                    ]}>
                    <li
                      style={[
                        BaseStyles.multipleChoice.item.children.item,
                      ]}>
                      {
                        regionList.length > 0 ?
                          (
                            <span key={`children${i}all`}
                              data-key='all'
                              data-regionKey={r.key}
                              onClick={this.onClick}
                              style={[
                                BaseStyles.multipleChoice.item.children.item.lable,
                                lableNum === regionList.length ?
                                  BaseStyles.multipleChoice.item.children.item.lable.active : {},
                              ]}>
                              全部
                          </span>
                          ) : ''
                      }
                    </li>
                    {
                      (regionList || []).map((item, index) => {
                        let isActive = false;
                        if (
                          this.state.select.indexOf(item.key) > -1 &&
                          lableNum < regionList.length
                        ) {
                          isActive = true;
                        }

                        return (
                          <li key={`children${i}${index}`}
                            style={[
                              BaseStyles.multipleChoice.item.children.item,
                            ]}>
                            <span key={`children${i}${index}lable`}
                              data-key={item.key}
                              data-value={item.value}
                              data-regionKey={r.key}
                              onClick={this.onClick}
                              style={[
                                BaseStyles.multipleChoice.item.children.item.lable,
                                isActive ? BaseStyles.multipleChoice.item.children.item.lable.active : {},
                              ]}>
                              {item.value}
                            </span>
                          </li>
                        );
                      })
                    }
                  </ul>
                </li>
              );
            })
          }
        </ul>
        <button onClick={this.ok}
          className='btn btn-success'
          style={[
            { width: '100px' },
            BaseStyles.opStyle,
          ]}>确定</button>
        <Link
          className='btn btn-default'
          to={
            this.props.location.query.url ?
              this.props.location.query.url : `/gaokao/ceping/preference/info`
          }
          style={[
            { width: '100px' },
            BaseStyles.opStyle,
          ]}>返回</Link>
      </div>
    );
  }
}

export const MultipleChoice = withAppState(withRouter(MultipleChoiceBox));
