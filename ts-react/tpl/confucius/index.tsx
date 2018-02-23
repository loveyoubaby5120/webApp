import { AuthProvider } from 'common/auth';
import { setDefaultEndpoint } from 'common/graphql';
import * as React from 'react';
import { render } from 'react-dom';
import { GQLStoreProvider } from '../common/gql_store';
import { AppStateProvider } from './common/appStateStore';
import { routes } from './routes';

setDefaultEndpoint('/ajax/graphql');

render(
    <AuthProvider>
        <AppStateProvider>
            <GQLStoreProvider site='ccss'>{routes}</GQLStoreProvider>
        </AppStateProvider>
    </AuthProvider>,
    document.getElementById('app'));
