import { routes } from './routes';
import { render } from 'react-dom';
import * as React from 'react';
import { AppStateProvider } from 'saas/common/AppStateStore';

render(
  <AppStateProvider>
    {routes}
  </AppStateProvider>,
  document.getElementById('app'));



