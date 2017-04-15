import * as React from 'react';
import { Route, IndexRedirect } from 'react-router';
import { Base as LayoutBase } from 'saas/common/layout/Base';
import { Base } from './Base';
import { BaseInfo } from './BaseInfo';
import { Info } from './Preference/Info';
import { MultipleChoice } from './Preference/MultipleChoice';
import { Fill } from './Preference/Fill';
import { Analysis } from './Analysis';
import { Institute } from './Institute';

export const route =
  <Route component={LayoutBase}>
    <Route path='ceping' component={Base}>
      <IndexRedirect to='baseInfo' />
      <Route path='baseInfo' component={BaseInfo} />
      <Route path='preference' >
        <IndexRedirect to='info' />
        <Route path='info' component={Info} />
        <Route path='regional' component={MultipleChoice} />
        <Route path='professional' component={MultipleChoice} />
        <Route path='fill' component={Fill} />
      </Route>
      <Route path='analysis' component={Analysis} />
      <Route path='institute/(:slug)/(:round)/(:level)' component={Institute} />
    </Route>
  </Route>;
