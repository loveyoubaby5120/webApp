import * as bodyParser from 'body-parser';
import * as express from 'express';
import { Server } from 'http';
import * as path from 'path';
import Browser = require('zombie');
import './jest-globals';

import { createGQLMock } from 'common/test/gql-mock';
import { serializer } from './serializer';
(expect as any).addSnapshotSerializer(serializer);

// TODO:
// [ ] Console filtering.
// [ ] Proper console location report.

const projectRoot = path.join(__dirname, '../../../');
const serverPort = 7007;

async function startServer(asset: string, introspection: any) {
    const app = express();
    const gqlMock = createGQLMock(introspection);

    app.use('/dist', express.static(`${projectRoot}/dist`));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use((req, res, next) => {
        console.log(req.method, req.originalUrl);
        next();
    });
    app.get('/ajax/auth/status', (req, res) => {
        res.send({
            status: 'user',
            user_id: 'user_id_0',
            user_name: 'user_name_0',
            user_email: 'user_email_0',
            user_tags: ['user'],
            email_verified: 'user_0@applysquare.com',
        });
    });
    app.post('/ajax/graphql', (req, res) => {
        const query = req.body;
        gqlMock.execute(query.query, query.variables).then((result) => {
            res.send(result);
        });
    });
    app.get('/*', (req, res) => {
        res.send(`<html>
        <body>
        <div id="app" style="position:absolute;left:0;right:0;top:0;bottom:0;"></div>
        <script src="/dist/${asset}/vendor.js"></script>
        <script src="/dist/${asset}/app.js"></script>`);
    });

    let server: Server = null;
    await (new Promise((resolve, reject) => {
        server = app.listen(serverPort, resolve);
    }));
    return server;
}

export function quickTest(opt: {
    name: string,
    baseURL: string,
    asset: string,
    introspection: any,
    urls: string[],
}) {
    jest.setTimeout(10000);
    describe(`visit ${opt.name}`, async () => {
        let browser: Browser = null;
        let server: Server = null;
        beforeAll(async () => {
            server = await startServer(opt.asset, opt.introspection);
            Browser.waitDuration = '2s';
            Browser.localhost('*.com', serverPort);
            Browser.localhost('*.cn', serverPort);
            Browser.localhost('*.net', serverPort);
            Browser.localhost('*.org', serverPort);
            Browser.localhost('*.edu', serverPort);
            browser = new Browser();
            browser.on('loading', (doc) => {
                doc.getSelection = (): any => null;
            });
        });
        afterAll(() => {
            browser.destroy();
            server.close();
        });

        test('setup ok', async () => {
            await browser.visit(opt.baseURL + '/', { duration: '3s' });
        });

        for (const url of opt.urls) {
            test(`visit ${url}`, async () => {
                await browser.visit(opt.baseURL + url);
                const html = browser.window.document.getElementById('app').innerHTML;
                expect(`<!-- ${browser.window.location.href} -->\n${html}`).toMatchSnapshot(`visit ${opt.name} ${url}`);
            });
        }
    });
}
