import { postFormDataPromise, postPromise } from 'common/ajax';
import { action, observable, transaction } from 'mobx';
import { observer } from 'mobx-react';
import * as Radium from 'radium';
import * as React from 'react';

let defaultEndpoint = '';
let defaultLoading = () => <div>Loading...</div>;

export function setDefaultLoading(f: () => React.ReactElement<any>) {
  defaultLoading = f;
}

export interface Request<V> {
  query: string;
  variables?: V;
  operationName?: string;
  repeat?: boolean;
}

function mapErrors<T extends { errors?: any }>(p: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    p.then(r => {
      const data: any = r;
      if (!(data instanceof Object)) {
        resolve(r);
        return;
      }
      if (!r['errors']) {
        resolve(r);
        return;
      }
      reject(new Error(JSON.stringify(r, null, 2)));
    }).catch(e => {
      reject(e);
    });
  });
}

export function setDefaultEndpoint(url: string) {
  defaultEndpoint = url;
}

export function gqlPromise<V, R>(
  { endpoint, query, variables, operationName }: {
    endpoint?: string,
  } & Request<V>): Promise<R> {
  endpoint = endpoint || defaultEndpoint;
  if (variables && hasUpload(variables)) {
    const data = new FormData();
    if (operationName) {
      data.append('operationName', operationName);
    }
    data.append('query', query);

    for (const key in variables) {
      if (!variables.hasOwnProperty(key)) {
        continue;
      }
      const v = variables[key];
      if (v instanceof FileList) {
        Array.from(v).forEach(f => data.append(key, f));
      } else {
        if (v instanceof Array) {
          v.forEach((f) => {
            if (f instanceof File) {
              data.append(key, f);
            }
          });
        }
      }
    }
    data.append('variables', JSON.stringify(variables));
    return mapErrors(postFormDataPromise(endpoint, data));
  }

  return mapErrors(postPromise(endpoint, {
    query,
    variables,
    operationName,
  }));
}

type Result<R> = { status: 'ok', result: R } | { status: 'error', error: any } | { status: 'loading' };

interface Refresher {
  refresh: () => void;
}

export function mutate<V, R>(req: Request<V>, refreshers?: Refresher[]): Promise<R> {
  return new Promise((resolve, reject) => {
    gqlPromise<V, R>(req).then((r) => {
      resolve(r);
      refreshers.forEach((v) => {
        v.refresh();
      });
    }).catch((err) => {
      reject(err);
    });
  });
}

export class Querier<V = { [name: string]: any }, R = any> {
  @observable public result: Result<R>;
  @observable public refreshing: boolean;
  private req: Request<V>;

  constructor(req: Request<V> = null) {
    // req can be null, if req is null, no query is made.
    this.result = { status: 'loading' };
    Promise.resolve(this.setReq(req || null));
  }

  public setReq(r: Request<V>): Promise<void> {
    if (r && r.repeat !== true && JSON.stringify(this.req) === JSON.stringify(r)) {
      return;
    }
    this.req = r;
    return this.refresh();
  }

  public setVariables(v: V): Promise<void> {
    if (JSON.stringify(this.req.variables) === JSON.stringify(v)) {
      return;
    }
    this.req.variables = v;
    return this.refresh();
  }

  @action public refresh(variables?: V): Promise<void> {
    if (this.req === null) {
      this.result = { status: 'loading' };
      return null;
    }

    if (variables) {
      this.req.variables = Object.assign({}, this.req.variables || {}, variables);
    } else {
      variables = this.req.variables;
    }

    this.refreshing = true;
    if (this.result.status === 'error') {
      this.result = { status: 'loading' };
    }
    return gqlPromise<V, R>(this.req).then(action((r: R) => {
      this.refreshing = false;
      if (this.req.variables === variables) {
        this.result = { status: 'ok', result: r };
      }
      return;
    })).catch(action((err) => {
      this.refreshing = false;
      if (this.req.variables === variables) {
        this.result = { status: 'error', error: err };
      }
      throw err;
    }));
  }
}

export class GQLCache {
  endpoint: string;
  cache: { [key: string]: any };

  constructor({ endpoint }: { endpoint?: string }) {
    this.endpoint = endpoint;
    this.cache = {};
  }

  public query<V, R>(req: Request<V>): Promise<R> {
    const key = JSON.stringify(req);
    const value = this.cache[key];
    if (value === undefined) {
      return this.promise<V, R>(req).then((resp) => {
        this.cache[key] = resp;
        return resp;
      });
    }
    return new Promise((resolve, reject) => {
      resolve(value);
    });
  }

  public mutate<V, R>(req: Request<V>): Promise<R> {
    return this.promise(req);
  }

  private promise<V, R>(req: Request<V>): Promise<R> {
    return gqlPromise<V, R>({
      endpoint: this.endpoint,
      query: req.query,
      variables: req.variables,
      operationName: req.operationName,
    });
  }
}

function hasUpload(variables: { [key: string]: any }): boolean {
  for (const key in variables) {
    if (!variables.hasOwnProperty(key)) {
      continue;
    }
    const v = variables[key];
    if (v instanceof FileList) {
      return true;
    }

    if (!v || !v.length) {
      continue;
    }

    for (const obj in v) {
      if (!v.hasOwnProperty(obj)) {
        continue;
      }
      if (v[obj] instanceof File) {
        return true;
      }
    }

  }
  return false;
}

export function pendingMessage(result: any) {
  if (result && result.status === 'error') {
    return `Error: ${JSON.stringify(result.error)}`;
  }
  if (result && result.status === 'ok') {
    return;
  }

  return '正在调取数据和分析图表……';
}

@Radium
@observer
export class QueryContainer<V, R> extends React.Component<{
  query: string,
  vars: V,
  ok: (r: R) => React.ReactElement<any>,
  loading?: () => React.ReactElement<any>,
  error?: (errMsg: string) => React.ReactElement<any>,
}> {
  querier = new Querier<V, { data: R }>();

  componentDidMount() {
    this.querier.setReq({
      query: this.props.query,
      variables: this.props.vars,
    });
  }

  componentDidUpdate() {
    this.querier.setReq({
      query: this.props.query,
      variables: this.props.vars,
    });
  }

  render() {
    if (this.querier.result.status === 'loading') {
      if (this.props.loading) {
        return this.props.loading();
      }
      return defaultLoading();
    }

    if (this.querier.result.status === 'error') {
      // TODO: Make error rendering look better.
      const errMsg = (() => {
        const err = this.querier.result.error;
        if (err instanceof Error) {
          return err.message;
        }
        return JSON.stringify(this.querier.result.error);
      })();
      if (this.props.error) {
        return this.props.error(errMsg);
      }
      return <div>Error: {errMsg}</div>;
    }

    return this.props.ok(this.querier.result.result.data);
  }
}
