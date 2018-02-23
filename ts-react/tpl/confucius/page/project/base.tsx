import { S } from 'common/locale_to_b';
import { WithAppState, withAppState } from 'confucius/common/appStateStore';
import { MenuBase } from 'confucius/common/menuBase';
import { ProjectNav } from 'confucius/publicData';
import * as _ from 'lodash';
import * as Radium from 'radium';
import * as React from 'react';

interface Props {
    params?: any;
    location?: any;
}

@Radium
export class BaseView extends React.Component<Props & WithAppState, {}> {

    constructor(props) {
        super(props);
    }

    render() {
        const nav = _.cloneDeep(ProjectNav);
        nav.title = S[nav.title] || nav.title;
        this.childerMap(nav.childer);

        return (
            <MenuBase nav={nav} {...this.props} />
        );
    }

    private childerMap(item) {
        item.map(r => {
            let title = this.props.location.query.title;
            if (title && S[title]) {
                title = S[title];
            }

            r.link = r.link.replace('/${id}', this.props.params.id ? `\/${this.props.params.id}` : '/${id}');
            r.link = r.link.replace('/${state}', this.props.params.state ? `\/${this.props.params.state}` : '/${state}');
            r.title = r.title.replace('${title}', title ? `${title}` : '${title}');
            if (r.describe) {
                r.describe = r.describe.replace('${describe}', title ? `${title}` : '${describe}');
            }
            if (S[r.title]) {
                r.title = S[r.title];
            }
            if (S[r.describe]) {
                r.describe = S[r.describe];
            }

            r.query = this.props.location.query;
            if (r.childer && r.childer.length > 0) {
                this.childerMap(r.childer);
            }
        });
    }
}

export const Base = withAppState(BaseView);
