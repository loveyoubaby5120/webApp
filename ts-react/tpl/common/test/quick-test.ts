import { createGQLMock } from 'common/test/gql-mock';
import { buildClientSchema, graphql } from 'graphql';
import { addMockFunctionsToSchema, makeExecutableSchema } from 'graphql-tools';
import * as $ from 'jquery';
import * as path from 'path';
import { ModuleReference } from 'typescript';
import * as URL from 'url';
import xhrMock from 'xhr-mock';
import './jest-globals';
import { serializer } from './serializer';

const setURL = (url: string) => {
    const u = URL.parse(url);
    Object.defineProperty(window.location, 'href', {
        writable: true,
        value: URL.format(u),
    });
    Object.defineProperty(window.location, 'pathname', {
        writable: true,
        value: u.path,
    });
    window.dispatchEvent(new PopStateEvent('popstate', { state: null }));
};

function timeout(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

(expect as any).addSnapshotSerializer(serializer);

export function quickTest(opt: {
    name: string,
    baseURL: string,
    loadJS: () => void,
    introspection: any,
    urls: string[],
}) {
    describe(`visit ${opt.name}`, async () => {
        const gqlMock = createGQLMock(opt.introspection);

        beforeAll(() => {
            xhrMock.setup();
            xhrMock.mock((req, res) => {
                if (req.url().toString() === '/ajax/graphql') {
                    const query = JSON.parse(req.body());
                    return gqlMock.execute(query.query, query.variables)
                        .then(result => {
                            res.status(200).body(JSON.stringify(result));
                            return res;
                        }).catch(err => {
                            console.error(err);
                            throw err;
                        });
                }
                console.error('No mocking defined for', req.url);
                return res.status(404).body('not mocked');
            });

            const localStorageMock = (() => {
                let store: { [key: string]: any } = {};
                return {
                    getItem(key: string) {
                        return store[key] || null;
                    },
                    setItem(key: string, value: any) {
                        store[key] = value.toString();
                    },
                    clear() {
                        store = {};
                    },
                };
            })();
            Object.defineProperty(window, 'localStorage', {
                value: localStorageMock,
            });

            document.getSelection = () => null;
        });

        afterAll(() => {
            xhrMock.teardown();
            Object.defineProperty(window, 'localStorage', null);
        });

        test(`load page`, () => {
            document.body.innerHTML = `<div id="app"></div>`;
            require('common/init.js');

            setURL(opt.baseURL + opt.urls[0]);
            opt.loadJS();
        });

        for (const url of opt.urls) {
            test(`visit ${url}`, async () => {
                setURL(opt.baseURL + url);
                await timeout(10);
                expect($('#app').html()).toMatchSnapshot(`visit ${opt.name} ${url}`);
            });
        }
    });
}
