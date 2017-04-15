import * as React from 'react';
import * as Radium from 'radium';
import { WithAppState, withAppState } from 'saas/common/AppStateStore';
import { withRouter } from 'react-router';
import { BaseStyles } from '../../../BaseStyles';

@Radium
export class FillBox extends React.Component<WithAppState & { router: any; location: { query: any }; }, void> {
  constructor(props) {
    super(props);
  }

  ok = (ev) => {
    let value = ev.target.getAttribute('data-value');
    this.props.data.gaoKaoState.userInfo.fill = value;

    if (this.props.location.query.url) {
      this.props.router.push(this.props.location.query.url);
    } else {
      this.props.router.push('/gaokao/ceping/preference');
    }
  }

  render() {
    return (
      <div style={[BaseStyles.content]}>
        <div style={[BaseStyles.title]}>
          优先选择
        </div>
        <div style={[BaseStyles.option]}>
          下列哪项是你报考志愿的优先标准?
        </div>
        <button onClick={this.ok}
          data-value='学校'
          className='btn btn-success'
          style={[
            { width: '100px' },
            BaseStyles.opStyle,
          ]}>学校</button>
        <button onClick={this.ok}
          data-value='专业'
          className='btn btn-info'
          style={[
            { width: '100px' },
            BaseStyles.opStyle,
          ]}>专业</button>
      </div>
    );
  }
}

export const Fill = withAppState(withRouter(FillBox));
