import * as React from 'react';

export class Base extends React.Component<void, void> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
};
