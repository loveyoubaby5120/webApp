import { Base as LayoutBase } from 'confucius/layout/base';
import * as React from 'react';
import { Route } from 'react-router';
import { Home } from './home';

export const route =
    <Route>
        <Route path='home' component={Home} />
    </Route>;
