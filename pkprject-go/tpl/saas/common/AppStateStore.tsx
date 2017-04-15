import * as React from 'react';
import { observable } from 'mobx';
import { Provider, inject, observer } from 'mobx-react';
import * as ReactRouter from 'react-router';
import { Query } from 'saas/common/PublicData';

export class AppStateStore {
  @observable appState: {
    echartsTheme: string,
    site: string,
    currentUser: {
      id?: string,
      username?: string,
      name?: string,
      permissions?: string[],
      email?: string,
      gender?: string,
      entryyear?: string
      class?: string,
      stu_id?: string
      previousSampling?: [string],
    },
  };

  @observable confirm: {
    title?: string,
    describe?: string,
    ok?: any,
    cancel?: any,
    show?: boolean,
  };

  @observable gaoKaoState: {
    userInfo?: {
      id?: string,
      location: string,
      total_score?: number,
      discipline?: string,
      recruit?: { kind: string, score: number, slug: string }[],
      awarded?: { kind: string, score: number, name: string },
      regional?: string[],
      regionalName?: string[],
      professional?: string[],
      professionalName?: string[],
      fill?: string,
    },
    risk?: string,
    batch?: string,
  };

  @observable surveyState: {
    query: Query,
    showEdit: number,
    batch?: {
      save?: boolean,
      kind?: string,
      edit?: boolean,
      callback?: any,
      query: Query,
    },
  };

  constructor() {
    this.appState = {
      echartsTheme: 'walden',
      site: 'saas',
      currentUser: { permissions: [''] },
    };

    this.confirm = {
      title: '',
      describe: '',
      ok: '',
      cancel: '',
      show: false,
    };

    this.gaoKaoState = {
      userInfo: {
        id: '',
        location: '',
        discipline: '文科',
        total_score: 600,
        recruit: [],
        regional: [],
        regionalName: [],
        professional: [],
        professionalName: [],
        fill: '学校',
      },
      risk: '中立',
      batch: '本一批次',
    };

    this.surveyState = {
      query: new Query(),
      showEdit: -1,
      batch: {
        save: false,
        kind: '',
        edit: false,
        callback: '',
        query: new Query(),
      },
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
