import * as React from 'react';
import { Link } from 'common/Link';
import * as Radium from 'radium';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { withRouter } from 'react-router';
import { BaseStyles } from '../../../BaseStyles';

@Radium
export class InfoBox extends React.Component<WithAppState & { router: any; }, void> {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div style={[BaseStyles.content]}>
        <div style={[BaseStyles.title]}>
          偏好于策略
          </div>
        <div style={[
          BaseStyles.option,
          BaseStyles.option.bb,
        ]}>
          <label htmlFor='regional' style={[BaseStyles.option.label2]}>
            地域偏好
            </label>
          <div style={[
            BaseStyles.option.input,
            BaseStyles.option.span,
          ]}>
            {
              this.props.data.gaoKaoState.userInfo.regional.length > 0 ?
                this.props.data.gaoKaoState.userInfo.regionalName.join(',')
                : '无'
            }
          </div>
          <Link
            to={`/gaokao/ceping/preference/regional`}
            style={[
              BaseStyles.option.edit,
            ]}>修改</Link>
        </div>
        <div style={[
          BaseStyles.option,
          BaseStyles.option.bb,
        ]}>
          <label htmlFor='professional' style={[BaseStyles.option.label2]}>
            专业偏好
            </label>
          <div style={[
            BaseStyles.option.input,
            BaseStyles.option.span,
          ]}>
            {
              this.props.data.gaoKaoState.userInfo.professional.length > 0 ?
                this.props.data.gaoKaoState.userInfo.professionalName.join(',')
                : '无'
            }
          </div>
          <Link
            to={`/gaokao/ceping/preference/professional`}
            style={[
              BaseStyles.option.edit,
            ]}>修改</Link>
        </div>
        <div style={[
          BaseStyles.option,
          BaseStyles.option.bb,
        ]}>
          <label htmlFor='total_score' style={[BaseStyles.option.label2]}>
            填报策略
            </label>
          <div style={[
            BaseStyles.option.input,
            BaseStyles.option.span,
          ]}>
            {this.props.data.gaoKaoState.userInfo.fill}
          </div>
          <Link
            to={`/gaokao/ceping/preference/fill`}
            style={[
              BaseStyles.option.edit,
            ]}>修改</Link>
        </div>
        <Link
          className='btn btn-success'
          to={`/gaokao/ceping/analysis`}
          style={[
            { width: '100px' },
            BaseStyles.opStyle,
          ]}>开始分析</Link>
        <Link
          className='btn btn-default'
          to={`/gaokao/ceping/baseInfo`}
          style={[
            { width: '100px' },
            BaseStyles.opStyle,
          ]}>返回</Link>
      </div>
    );
  }
}

export const Info = withAppState(withRouter(InfoBox));
