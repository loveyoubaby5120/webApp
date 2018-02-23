import * as React from 'react';
import { Route } from 'react-router';
import { Base as LayoutBase } from 'saas/common/layout/Base';
import { Home } from './Home';

export const route =
  <Route component={LayoutBase}>
    <Route path='home' component={Home} />
  </Route>;
