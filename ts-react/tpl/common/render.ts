import * as ReactDOM from 'react-dom';
import * as React from 'react';

export default function render(node: React.ReactElement<any>) {
  ReactDOM.render(node as any, document.getElementById('root'));
}
