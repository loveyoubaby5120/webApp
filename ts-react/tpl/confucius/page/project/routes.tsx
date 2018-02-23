import { Base as LayoutBase } from 'confucius/layout/base';
import * as React from 'react';
import { IndexRedirect, Route } from 'react-router';
import { Apply } from './apply';
import { Base } from './base';
import { Info } from './info';
import { List } from './list';
import { Success } from './success';

export const route =
    <Route component={LayoutBase} >
        <Route path='project' component={Base} >
            <IndexRedirect to='list' />
            <Route path='list' component={List} />
            <Route path='info(/:id)' component={Info} />
            <Route path='apply(/:id)' component={Apply} />
            <Route path='success(/:id)' component={Success} />
        </Route>
    </Route>;
