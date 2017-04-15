import { postPromise, postFormDataPromise } from 'common/ajax';
import { observable } from 'mobx';

let defaultEndpoint = '';

interface Request<V> {
  query: string;
  variables?: V;
  operationName?: string;
}

function mapErrors<T>(p: Promise<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    p.then(r => {
      let data: any = r;
      if (!(data instanceof Object)) {
        resolve(r);
        return;
      }
      if (!r['errors']) {
        resolve(r);
        return;
      }
      reject(r['errors']);
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

    const newVariables: any = {};
    for (let key in variables) {
      if (!variables.hasOwnProperty(key)) {
        continue;
      }
      let v = variables[key];
      if (v instanceof FileList) {
        Array.from(v).forEach(f => data.append(key, f));
      } else {
        newVariables[key] = v;
      }
    }
    data.append('variables', JSON.stringify(variables));
    return mapErrors(postFormDataPromise(endpoint, data));
  }

  return mapErrors(postPromise(endpoint, {
    query: query,
    variables: variables,
    operationName: operationName,
  }));
}

type Result<R> = { status: 'ok', result: R } | { status: 'error', error: any } | { status: 'loading' }

interface Refresher {
  refresh();
}

export function mutate<V, R>(req: Request<V>, refreshers?: Refresher[]): Promise<R> {
  return new Promise((resolve, reject) => {
    gqlPromise<V, R>(req).then(r => {
      resolve(r);
      refreshers.forEach(v => {
        v.refresh();
      });
    }).catch(err => {
      reject(err);
    });
  });
}

export class Querier<V, R> {
  @observable public result: Result<R>;
  private req: Request<V>;

  constructor(req: Request<V>) {
    // req can be null, if req is null, no query is made.
    this.result = { status: 'loading' };
    Promise.resolve(this.setReq(req));
  }

  public setReq(r): Promise<void> {
    this.req = r;
    return this.refresh();
  }

  public setVariables(v): Promise<void> {
    this.req.variables = v;
    return this.refresh();
  }

  public refresh(variables?: V): Promise<void> {
    if (this.req === null) {
      this.result = { status: 'loading' };
      return null;
    }

    if (variables) {
      this.req.variables = Object.assign({}, this.req.variables || {}, variables);
    } else {
      variables = this.req.variables;
    }

    return new Promise<void>((resolve, reject) => {
      if (this.result.status === 'error') {
        this.result = { status: 'loading' };
      }
      gqlPromise<V, R>(this.req).then(r => {
        if (this.req.variables === variables) {
          this.result = { status: 'ok', result: r };
        }
        resolve();
      }).catch(err => {
        if (this.req.variables === variables) {
          this.result = { status: 'error', error: err };
        }
        reject(err);
      });
    });
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
    let value = this.cache[key];
    if (value === undefined) {
      return this.promise(req).then((resp) => {
        this.cache[key] = value;
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
};

function hasUpload(variables: Object): boolean {
  for (let key in variables) {
    if (!variables.hasOwnProperty(key)) {
      continue;
    }
    let v = variables[key];
    if (v instanceof FileList) {
      return true;
    }
  }
  return false;
}

export function pendingMessage(result: any) {
  if (!result || result.status === 'loading' || result.status !== 'ok') {
    return '正在调取数据和分析图表……';
  }
  if (result.status === 'error') {
    return `Error: ${JSON.stringify(result.error)}`;
  }
  return;
}
