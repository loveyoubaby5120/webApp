import { Base as LayoutBase } from 'confucius/layout/base';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppStateProvider } from '../common/appStateStore';

ReactDOM.render(
    <AppStateProvider>
        <LayoutBase applysq={true} />
    </AppStateProvider>,
    document.getElementById('confucius_header'),
);
