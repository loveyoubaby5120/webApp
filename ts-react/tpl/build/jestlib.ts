import * as fs from 'fs-extra';
import * as glob from 'glob';
import * as jest from 'jest';
import * as path from 'path';

export async function runJest(opt: {
    tplRoot: string,
    projectRoot: string,
    project: { name: string },
    updateSnapshot: boolean,
}) {
    const snapshotSrcDir = `${opt.tplRoot}/${opt.project.name}/tests/__snapshots__`;
    const snapshotWorkDir = `${opt.projectRoot}/dist/${opt.project.name}/__snapshots__`;

    mergeSnapshots(snapshotSrcDir, snapshotSrcDir);
    try {
        const jestConfig = {
            moduleFileExtensions: ['ts', 'tsx', 'js'],
            transform: {
                '^.+\\.(ts|tsx)$': `${opt.tplRoot}/build/jest-ts-transform.js`,
            },
            testMatch: [`<rootDir>/tpl/${opt.project.name}/tests/*.test.ts`],
            verbose: true,
            modulePathIgnorePatterns: ['cache', 'pkg', 'vendor', 'testdata'],
            moduleDirectories: ['node_modules', 'tpl'],
            testEnvironment: 'node',
        };
        const result = await jest.runCLI({
            config: JSON.stringify(jestConfig),
            updateSnapshot: opt.updateSnapshot,
            bail: true,
        }, [opt.projectRoot]);
        if (!result.results.success) {
            throw new Error(`Test failed for project ${opt.project.name}.`);
        }
    } finally {
        splitSnapshots(snapshotSrcDir, snapshotSrcDir);
    }
}

function splitSnapshots(srcDir: string, destDir: string) {
    // For each *.snap file in the dir. Read them and split them by the key.
    // write out *.snap.split-xxxx.
    glob(`${destDir}/*.snap.split-*`, (err, matches) => {
        matches.forEach(fn => {
            fs.removeSync(fn);
        });
    });
    glob(`${srcDir}/*.snap`, (err, matches) => {
        if (matches.length > 0) {
            fs.ensureDirSync(destDir);
        }
        matches.forEach(fn => {
            const exports: { [key: string]: string } = {};
            {
                const src = fs.readFileSync(fn).toString();
                // tslint:disable-next-line:no-eval
                eval(src);  // Should add values to exports.
            }
            Object.keys(exports).forEach(key => {
                console.log(key);
                const m = key.split(' ');
                const fileKey = m.slice(0, m.length - 1).join(' ').replace(/[^a-zA-Z0-9]/g, '_');
                fs.appendFileSync(
                    path.join(destDir, path.basename(fn) + '.split-' + fileKey),
                    `${'\n'}exports[${'`'}${key}${'`'}] = ${'`'}${exports[key]}${'`;\n'}`);
            });
            fs.removeSync(fn);
        });
    });
}

function mergeSnapshots(srcDir: string, destDir: string) {
    const merged = {};
    glob(`${srcDir}/*.snap.split-*`, (err, matches) => {
        if (matches.length > 0) {
            fs.ensureDirSync(destDir);
        }
        matches.forEach(fn => {
            const splits = path.basename(fn).split('.snap.split-');
            const origName = path.join(destDir, splits[0] + '.snap');
            if (!merged[origName]) {
                merged[origName] = true;
                fs.removeSync(origName);
                fs.appendFileSync(origName, '// Jest Snapshot v1, https://goo.gl/fbAQLP\n');
            }
            const src = fs.readFileSync(fn);
            fs.appendFileSync(origName, src);
        });
    });
}
