import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { Base as LayoutBase } from 'saas/common/layout/Base';
import { Base } from './Base';
import { BaseInfo } from './BaseInfo';

export const route =
  <Route component={LayoutBase}>
    <Route path='ceping' component={Base}>
      <IndexRedirect to='baseInfo' />
      <Route path='baseInfo' component={BaseInfo} />
    </Route>
  </Route>;
