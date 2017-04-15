import * as React from 'react';
import { Link } from 'common/Link';
import * as Radium from 'radium';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { withRouter } from 'react-router';
import { BaseStyles } from '../../BaseStyles';
let Style = Radium.Style;

interface Props {
  location: { query: any };
  router: any;
}

interface State {
}

@Radium
export class BaseInfoBox extends React.Component<WithAppState & Props, State> {
  constructor(props) {
    super(props);
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
              className='form-control' />
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
              style={[{ width: '173px' }]}>
              <option value='' style={[{ display: 'none' }]}>--选择文理科--</option>
              <option value='文科'>文科</option>
              <option value='理科'>理科</option>
            </select>
          </div>
        </div>
        <button
          className='btn btn-success'
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
