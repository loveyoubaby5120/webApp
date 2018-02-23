import { fromResult, tryToUnwrap } from 'common/errs';
import { GQLCache } from 'common/graphql';
import * as _ from 'lodash';
import * as React from 'react';

export class GQLStore {
    private site: string;
    private cache: GQLCache;

    constructor(site: string) {
        this.cache = new GQLCache({ endpoint: '/ajax/graphql' });
        this.site = site;
    }

    gqlQueries(queries: Query[]): Promise<any> {
        const qa: { [key: string]: string[] } = {};
        qa['query'] = [];

        queries.forEach(({ key, container, params, fields }) => {
            let paramStr = params ? Object.keys(params).map((key) => {
                if (key === 'size' || key === 'offset') {
                    return params[key] ? `${key}: ${params[key]}` : '';
                }
                return params[key] ?
                    ['size', 'offset'].indexOf(key) > -1 ?
                        `${key}: ${params[key]}` : `${key}: "${params[key]}"`
                    : '';
            }).
                filter(v => v).join(',') : '';
            paramStr = paramStr ? '(' + paramStr + ')' : '';
            const fieldStr = fields ? '{' + fields.join(' ') + '}' : '';
            container = container ? container : 'query';
            if (qa[container] === undefined) {
                qa[container] = [];
            }
            if (key) {
                qa[container].push(`${key}${paramStr} ${fieldStr}`);
            }
        });

        let query = '';

        for (const o in qa) {
            if (qa.hasOwnProperty(o)) {
                if (qa[o].length > 0) {
                    query += `${o} { ${qa[o].join(' ')} }`;
                }
            }
        }

        return this.cache.query<void, { data: any }>({
            query: `{ ${this.site} { ${query} } }`,
        }).then((v) => {
            const result: { [key: string]: any } = {};
            queries.map(({ key, container }) => {
                const resultKey = key.split(':')[0];
                result[resultKey] = v.data[this.site][container ? container : 'query'][resultKey];
            });
            return result;
        }).catch((err) => {
            console.error(err);
            throw err;
        });
    }

    gqlMutationQueries(queries: [Query]): Promise<any> {
        const qs = queries.map(({ key, params, fields }) => {
            let paramStr = params ? Object.keys(params).map((key) => {
                if (key === 'size' || key === 'offset') {
                    return params[key] ? `${key}: ${params[key]}` : '';
                }
                // 判断如果参数类型是Array，则转换成Array类型字符串
                if (params[key] instanceof Array) {
                    return params[key] ? `${key}: ${JSON.stringify(params[key])}` : '';
                }
                return params[key] ?
                    ['size', 'offset', 'num'].indexOf(key) > -1 ?
                        `${key}: ${params[key]}` : `${key}: "${params[key]}"`
                    : '';
            }).
                filter(v => v).join(',') : '';
            paramStr = paramStr ? '(' + paramStr + ')' : '';
            const fieldStr = fields ? '{' + fields.join(' ') + '}' : '';
            return `${key}${paramStr} ${fieldStr}`;
        }).join(' ');
        return this.cache.mutate<void, { data: any }>({
            query: `mutation{ ${this.site} { ${qs} } }`,
        }).then((v) => {
            const result: { [key: string]: any } = {};
            queries.map(({ key }) => {
                result[key] = v.data[this.site][key];
            });
            return result;
        }).catch((err) => {
            console.error(err);
            throw err;
        });
    }
}

export interface Query {
    key: string;
    container?: string;
    params?: { [key: string]: any };
    fields?: string[];
}

interface QueryOptions {
    queries: (props: any) => [Query];
}

interface ContainerState {
    loading?: boolean;
    result?: { [key: string]: any };
    err?: any;
}

export interface withResult {
    gqlResult?: { [key: string]: any };
    gqlLoading?: boolean;
}

export function withGQLStore<P extends withResult>(
    UnderlyingComponent: React.ComponentType<P>, options: QueryOptions): React.ComponentClass<P> {
    return class extends React.Component<P, ContainerState> {
        static contextTypes = {
            gqlStore: React.PropTypes.object.isRequired,
        };

        private store: GQLStore;
        private activeQueries: any;

        constructor(props: any, context: any) {
            super(props, context);
            this.store = context.gqlStore;
            this.state = {
                loading: true,
                result: null,
                err: null,
            };
        }

        componentDidMount() {
            this.setState({ loading: true });
            const queries = options.queries(this.props);
            this.fetchData(queries);
        }

        fetchData(queries: Query[]) {
            this.activeQueries = queries;
            this.setState({ loading: true });
            if (!queries) {
                this.setState({ loading: false, result: {}, err: null });
                return;
            }
            this.store.gqlQueries(queries)
                .then((result) => {
                    this.setState({ loading: false, result, err: null });
                })
                .catch((err) => {
                    if (queries !== this.activeQueries) {
                        return;
                    }
                    console.log('gql store error', err);
                    this.setState({ loading: false, err });
                });
        }

        componentWillReceiveProps(nextProps: any) {
            const newQueries = options.queries(nextProps);
            if (_.isEqual(newQueries, this.activeQueries)) {
                return;
            }
            this.fetchData(newQueries);
        }

        render() {
            if (this.state.err) {
                if (this.state.err.message.indexOf('Forbidden error: 403') !== -1) {
                    return (<div>您没有权限访问该页面</div>);
                }
                return <div>Error: {JSON.stringify(this.state.err).toString()}</div>;
            }
            return (<div>
                <UnderlyingComponent
                    {...this.props}
                    gqlResult={this.state.result}
                    gqlLoading={this.state.loading}
                />
                {this.state.loading ? <div>正在调取数据和分析图表...</div> : null}
            </div>);
        }
    };
}

export class GQLStoreProvider extends React.Component<{ site: string }, {}> {
    static childContextTypes = {
        gqlStore: React.PropTypes.object.isRequired,
    };

    private store: GQLStore;

    constructor(props: any, context: any) {
        super(props, context);
        this.store = new GQLStore(this.props.site);
    }

    getChildContext() {
        return {
            gqlStore: this.store,
        };
    }

    render() {
        return React.Children.only(this.props.children);
    }
}
