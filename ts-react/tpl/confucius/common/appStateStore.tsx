import { observable } from 'mobx';
import { inject, Provider } from 'mobx-react';
import * as React from 'react';

export class AppStateStore {
    @observable appState: {
        currentUser?: {
            id?: string,
            username?: string,
            name?: string,
            permissions?: string[],
            email?: string,
            phone?: string,
        },
    };

    constructor() {

        this.appState = {
            currentUser: { permissions: [''] },
        };

    }

}

export interface WithAppState {
    data: AppStateStore;
}

export class AppStateProvider extends React.Component<{}, {}> {
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
    return inject('data')(UnderlyingComponent as any);
}
