import * as React from 'react';
import { Confirm } from 'saas/common/Confirm';

class BaseInfo extends React.Component<void, void> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Confirm />
        <div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export const Base = BaseInfo;
