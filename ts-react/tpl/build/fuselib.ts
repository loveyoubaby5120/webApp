import {
    BabelPlugin, CSSPlugin, CSSResourcePlugin, EnvPlugin,
    FuseBox, JSONPlugin, LESSPlugin, ReplacePlugin, SassPlugin,
    UglifyJSPlugin,
} from 'fuse-box';
import * as fusebox from 'fuse-box';
import {
    BundleSource,
} from 'fuse-box/dist/commonjs/BundleSource';

import * as crypto from 'crypto';
import { walkSync } from 'file';
import * as fs from 'fs-extra';
import * as jest from 'jest';
import * as mkdirp from 'mkdirp';
import * as path from 'path';
import { runJest } from './jestlib';
import { typeCheck as realTypeCheck } from './typecheck';
import { hrtimeToSeconds } from './utils';

const argv = require('minimist')(process.argv.slice(2));

const projectRoot = path.join(__dirname, '../../');
const tplRoot = path.join(projectRoot, 'tpl/');
const distRoot = path.join(projectRoot, 'dist/');
const cacheRoot = process.env.FUSE_CACHE_DIR || path.join(projectRoot, 'node_modules/.cache/a2/');

function exitWithUsage() {
    console.log('Usage: node fuse.js <app name regex> [--production]');
    process.exit(1);
}

const tplDirs = fs.readdirSync(tplRoot);

function typeCheck(files: string[], opt: { strict: boolean }) {
    if (argv['fast']) {
        return;
    }
    realTypeCheck(tplRoot, files, opt);
}

function sha1(data) {
    const generator = crypto.createHash('sha1');
    generator.update(data);
    return generator.digest('hex');
}

const FixFuseboxIE8 = {
    postBundle(context) {
        const includeSourceMaps = context.source.includeSourceMaps;
        const concat = context.source.getResult();
        const source = concat.content.toString();
        const sourceMap = concat.sourceMap;
        const newSource = new BundleSource(context);
        newSource.includeSourceMaps = includeSourceMaps;
        context.source = newSource;
        const newConcat = context.source.getResult();
        // Hack to make fusebox output to support ie8.
        const source2 = source.replace(/\.import\(/, '["import"](');
        newConcat.add(null, source2, sourceMap);
    },
};

const Base64Plugin = {
    test: /\.docx$/,
    extensions: ['.docx'],

    init(context) {
        this.extensions.forEach(ext => context.allowExtension(ext));
    },
    transform: (file) => {
        file.isLoaded = true;
        const content = fs.readFileSync(file.absPath);
        // convert binary data to base64 encoded string
        const data = new Buffer(content).toString('base64');
        file.contents = `module.exports = ${JSON.stringify(data)}`;
    },
};

let cacheDirCreated = false;

function lookupOrInsertCache(hash: string, gen: () => string): string {
    const cacheDir = cacheRoot + '/compressed';
    if (!cacheDirCreated) {
        mkdirp.sync(cacheRoot + '/compressed');
        cacheDirCreated = true;
    }
    const cacheFile = path.join(cacheDir, hash);
    if (fs.existsSync(cacheFile)) {
        console.log(`Compression cached.`);
        return fs.readFileSync(cacheFile).toString();
    }
    const content = gen();
    fs.writeFileSync(cacheFile, content);
    return content;
}

const CachedCompress = () => {
    return {
        postBundle(context) {
            const opt: any = {
                compress: false,
                mangle: {
                    ie8: true,
                },
                output: {
                    ie8: true,
                },
            };
            const UglifyJs = require('uglify-js');
            if (UglifyJs.mangle_properties !== undefined) {
                opt.fromString = true;
            }
            const concat = context.source.getResult();
            const source = concat.content.toString();
            const newSource = new BundleSource(context);
            context.source = newSource;
            const newConcat = context.source.getResult();

            const key = sha1(source);
            const newSourceStr = lookupOrInsertCache(key, () => {
                const timeStart = process.hrtime();
                const result = UglifyJs.minify(source, opt);
                if (result.error) {
                    const message = `CachedCompress - ${result.error.message}`;
                    context.log.echoError(message);
                    return Promise.reject(result.error);
                }
                const ret = result.code.replace(/\.import\(/, '["import"](');
                const took = process.hrtime(timeStart);
                const bytes = Buffer.byteLength(ret, 'utf8');
                console.log(`Compress took ${hrtimeToSeconds(took)}s, size: ${bytes / 1024} kb.`);
                context.log.echoBundleStats('Bundle (Uglified)', bytes, took);
                return ret;
            });
            newConcat.add(null, newSourceStr, null);
        },
    };
};

function buildOne(prj: Project) {
    const isProduction = !!argv['production'] || process.env.NODE_ENV === 'production' || false;
    const verbose = !!argv['verbose'] || false;
    const watch = argv['watch'] || false;
    const test = argv['test'] || false;

    if ((watch || test) && isProduction) {
        console.error('cannot watch or test in production mode.');
        process.exit(1);
    }

    if (test) {
        if (!fs.existsSync(`${tplRoot}/${prj.name}/tests/main.test.ts`)) {
            // TODO: move this to higher level.
            console.log(`? ${prj.name} Test file not exists.`);
            return Promise.resolve();
        }
        typeCheck([`${prj.testSourceDir}/main.test.ts`], { strict: prj.strict });
    }

    const useHash = isProduction;

    console.log('Building', prj.name);
    console.time(`Built ${prj.name}`);
    const timeEnd = () => {
        console.timeEnd(`Built ${prj.name}`);
    };
    const Echo = {
        transform: (file, ast) => {
            if (!verbose) {
                return;
            }
            console.log('Processing: ', file.info.absPath);
        },
    };

    const plugins: any[] = [
        EnvPlugin({
            NODE_ENV: isProduction ? 'production' : 'development',
            A2_JSDOM_TEST: test,
        }),
        [Base64Plugin],
        ['.json', JSONPlugin()],
        [/.*\.css/, Echo, CSSResourcePlugin({ inline: true }), CSSPlugin()],
        ['.sass', SassPlugin({
            indentedSyntax: true,  // sass or scss.
            includePaths: [
                `${projectRoot}/node_modules/compass-mixins/lib`,
            ],
        }), CSSPlugin()],
        ['.less', LESSPlugin(({
            paths: [
                path.resolve(projectRoot, 'node_modules'),
                tplRoot,
            ],
        }) as any), CSSPlugin()],
    ];

    const alias = {};
    tplDirs.forEach(dir => {
        alias[dir] = `~/${dir}`;
    });
    // Fix a require bug in component-class package.
    alias['~/component-indexof.js'] = 'component-indexof';

    if (isProduction) {
        plugins.push([
            /.*\.jsx?/,
            BabelPlugin(),
        ]);
        plugins.push([
            ReplacePlugin({
                'PRODUCTION': 'true',
                'process.env.NODE_ENV': '\'production\'',
                'process.env.A2_JSDOM_TEST': test,
            }),
            CachedCompress(),
        ]);
    } else {
        plugins.push(ReplacePlugin({
            'PRODUCTION': 'false',
            'process.env.NODE_ENV': '\'development\'',
            'process.env.A2_JSDOM_TEST': test,
        }));
    }

    const outputDir = path.join(distRoot, prj.name);
    const fuse = FuseBox.init({
        homeDir: tplRoot,
        output: path.join(outputDir, useHash ? '$name_$hash.js' : '$name.js'),
        plugins,
        tsConfig: path.join(projectRoot, 'tsconfig.json'),
        hash: useHash,
        cache: !!argv['fast'] || !isProduction,
        debug: verbose,
        log: verbose || watch,
        alias,
        sourceMaps: !isProduction && !test,
    });
    // Somehow the above FuseBox.init() will set NODE_ENV to production.
    // This will mess things up when calling buildOne in sequence.
    // Below is hack to fix this.
    process.env.NODE_ENV = isProduction ? 'production' : 'development';

    if (watch) {
        fuse.dev({
            port: 8088,
            httpServer: false,
        });
    }

    const wrapBundle = (bundle) => {
        bundle = bundle.target('browser');
        if (!watch) {
            return bundle;
        }
        return bundle.watch();
    };

    const wrapVendor = (bundle) => {
        const b = wrapBundle(bundle);
        if (watch) {
            b.hmr({ socketURI: 'ws://localhost:8088' });
        }
    };

    switch (prj.mode) {
        case 'spa':
            typeCheck([`${prj.sourceDir()}/index.tsx`], { strict: prj.strict });
            wrapVendor(fuse.bundle('vendor')
                .instructions(`> common/init.js ~ ${prj.dir}/index.tsx`));
            wrapBundle(fuse.bundle('app')
                .instructions(`!> [${prj.dir}/index.tsx]`));
            break;
        case 'mpa':
            const vendors = ['> common/init.js'];
            const tsFiles = [];

            walkSync(prj.sourceDir(), (dirPath, unused, files) => {
                const relDirPath = path.relative(prj.sourceDir(), dirPath);
                files.forEach((f) => {
                    const m = f.match('^(page_.*)\.[tj]sx?$');
                    if (!m) {
                        return;
                    }
                    const entryFile = path.join(dirPath.slice(tplRoot.length), f);
                    wrapBundle(fuse.bundle(path.join(relDirPath, m[1]))
                        .instructions(`!> [${entryFile}]`));
                    vendors.push(`~ ${entryFile}`);
                    tsFiles.push(path.join(dirPath, f));
                });
            });
            typeCheck(tsFiles, { strict: prj.strict });
            wrapVendor(fuse.bundle('vendor').instructions(vendors.join(' ')));
            break;
        default: const _: never = prj.mode;
    }

    return fuse.run().then(async producer => {
        const assets = {
            files: {},
        };
        producer.bundles.forEach((bundle, name) => {
            assets.files[name + '.js'] = path.relative(
                outputDir,
                bundle.context.output.lastPrimaryOutput.path);
        });
        timeEnd();
        await fs.writeFile(
            path.join(outputDir, 'assets.json'),
            JSON.stringify(assets, null, 2));

        if (test) {
            await runJest({
                project: prj,
                tplRoot,
                projectRoot,
                updateSnapshot: !!argv['u'],
            });
        }
    });
}

function serial(promiseCreators) {
    return promiseCreators.reduce((prev, creator) => {
        return prev.then(r => {
            return creator().then(v => {
                r.push(v);
                return r;
            });
        });
    }, Promise.resolve([]));
}

function main(projects: { [name: string]: Project }) {
    const app = argv._[0];

    if (!app) {
        exitWithUsage();
    }

    const prjs = (() => {
        const pattern = new RegExp(`^${app}$`);
        return Object.keys(projects).filter(name => {
            return name.match(pattern);
        }).map(name => {
            return projects[name];
        });
    })();

    if (argv['list']) {
        prjs.forEach(prj => {
            console.log(prj.name);
        });
        process.exit(0);
        return;
    }

    if (prjs.length === 0) {
        console.error('No matching projects: ', app);
        process.exit(1);
    }

    if (!argv['fast'] && !argv['no_strict_common_check']) {
        fs.removeSync(projectRoot + '/.fusebox');
        realTypeCheck(tplRoot, [`${tplRoot}/common/**/*`], { strict: true });
    }

    serial(prjs.map(prj => {
        return () => buildOne(prj);
    })).catch(err => {
        console.error(err);
        process.exit(1);
    });
}

class Project {
    name: string;
    mode: 'spa' | 'mpa';  // single-page-app or multi-page-app.
    strict: boolean;
    dir: string;

    constructor(fields: {
        name: string,
        mode: 'spa' | 'mpa',
        strict: boolean,
        dir: string,
    }) {
        Object.assign(this, fields);
    }

    sourceDir = () => {
        return `${tplRoot}/${this.dir}`;
    }
    testSourceDir = () => {
        return `${tplRoot}/${this.dir}/tests`;
    }
}

class Spec {
    projects: { [name: string]: Project } = {};

    AddSPA = (name, opts?: { dir?: string, strict?: boolean }) => {
        opts = opts || {};
        const dir = opts.dir || name;
        const strict = opts.strict || false;
        this.projects[name] = new Project({
            name,
            dir,
            strict,
            mode: 'spa',
        });
    }

    AddPaged = (name, dir?) => {
        dir = dir || name;
        this.projects[name] = new Project({
            name,
            dir,
            mode: 'mpa',
            strict: false,
        });
    }
    Run = () => {
        main(this.projects);
    }
}

export const NewSpec = () => {
    return new Spec();
};
