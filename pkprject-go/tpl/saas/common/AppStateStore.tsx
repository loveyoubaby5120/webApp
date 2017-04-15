import * as React from 'react';
import { observable } from 'mobx';
import { Provider, inject, observer } from 'mobx-react';
import * as ReactRouter from 'react-router';

export class AppStateStore {
  @observable appState: {
  };

  @observable confirm: {
    title?: string,
    describe?: string,
    ok?: any,
    cancel?: any,
    show?: boolean,
  };

  constructor() {
    this.appState = {
    };

    this.confirm = {
      title: '',
      describe: '',
      ok: '',
      cancel: '',
      show: false,
    };

  }

  showConfirm = (title, describe, ok, cancle) => {
    this.confirm.title = title;
    this.confirm.describe = describe;
    this.confirm.ok = ok;
    this.confirm.cancel = cancle;
    this.confirm.show = true;
  }

  closeConfirm = (ev?) => {
    this.confirm.show = false;
  }
}

export interface WithAppState {
  data: AppStateStore;
}

export interface WithRouter {
  router: ReactRouter.InjectedRouter;
}

export class AppStateProvider extends React.Component<void, void> {
  private store: AppStateStore;
  constructor(props) {
    super(props);
    this.store = new AppStateStore();
  }
  render() {
    return (
      <Provider data={this.store}>
        {this.props.children}
      </Provider>
    );
  }
}

export function withAppState<P>(
  UnderlyingComponent: React.ComponentClass<P & WithAppState>
    | React.StatelessComponent<P & WithAppState>)
  : React.ComponentClass<P> {
  return inject('data')(observer(UnderlyingComponent as any));
}
