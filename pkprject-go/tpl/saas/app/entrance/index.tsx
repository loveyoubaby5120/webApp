import { routes } from './routes';
import { render } from 'react-dom';
import * as React from 'react';
import { AppStateProvider } from 'saas/common/AppStateStore';
import { AuthProvider } from 'common/auth';
import { setDefaultEndpoint } from 'common/graphql';

setDefaultEndpoint('/ajax/graphql');

render(
    <AuthProvider>
        <AppStateProvider>
            {routes}
        </AppStateProvider>
    </AuthProvider>,
    document.getElementById('app'));



