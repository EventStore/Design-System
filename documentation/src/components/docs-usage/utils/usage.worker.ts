import type StencilTypes from '@stencil/core/compiler';
import type RollupTypes from 'rollup';

import { createLogger } from '@eventstore/utils';
import type { Files } from './types';

declare const stencil: typeof StencilTypes;
declare const rollup: typeof RollupTypes;
declare const importScripts: (script: string) => void;

importScripts('/modules/@stencil/core/compiler/stencil.js');
importScripts('/modules/rollup/rollup.browser.js');

export const logger = createLogger(
    'useage worker',
    'linear-gradient( 108.9deg,  rgba(251,140,0,1) 11.2%, rgba(0,139,155,1) 88.9% )',
);

const fs = new Map<string, string>();
const resolveLookup = new Map<string, string>();

let ready: Promise<void>;

const fetchDependency = async (path: string) => {
    const response = await fetch(path);
    const code = await response.text();
    fs.set(path, code);
};

const loadDeps = async () => {
    resolveLookup.set(
        '@stencil/core',
        '/modules/@stencil/core/internal/client/index.js',
    );
    resolveLookup.set(
        '@stencil/core/internal/client',
        '/modules/@stencil/core/internal/client/index.js',
    );
    resolveLookup.set(
        '@stencil/core/internal/app-data',
        '/modules/@stencil/core/internal/app-data/index.js',
    );
    resolveLookup.set(
        '@eventstore/stores',
        '/modules/@eventstore/stores/index.mjs',
    );
    resolveLookup.set(
        '@eventstore/utils',
        '/modules/@eventstore/utils/index.mjs',
    );

    await Promise.all([
        await fetchDependency(
            '/modules/@stencil/core/internal/client/index.js',
        ),
        await fetchDependency(
            '/modules/@stencil/core/internal/client/shadow-css.js',
        ),
        await fetchDependency(
            '/modules/@stencil/core/internal/app-data/index.js',
        ),
        await fetchDependency(
            '/modules/@stencil/core/internal/client/css-shim.js',
        ),
        await fetchDependency('/modules/@stencil/core/internal/client/dom.js'),
    ]);
};

export const bundle = async (entry: string, files: Files) => {
    if (!ready) {
        ready = loadDeps();
    }

    await ready;

    for (const [name, content] of Object.entries(files)) {
        const opts: StencilTypes.TranspileOptions = {
            componentExport: 'customelement',
            componentMetadata: 'null',
            file: name,
            module: 'esm',
            proxy: 'defineproperty',
            sourceMap: false,
            style: 'static',
            styleImportData: 'queryparams',
            target: 'latest',
        };

        const results = await stencil.transpile(content, opts);

        results.diagnostics.forEach((d: any) => {
            if (d.level === 'error') {
                logger.error(d);
            } else if (d.level === 'warn') {
                logger.warn(d);
            } else {
                logger.log(d);
            }
        });

        fs.set(`/${name}`, results.code);
    }

    const inputOptions: RollupTypes.InputOptions = {
        input: entry,
        treeshake: true,
        plugins: [
            {
                name: 'browserPlugin',
                resolveId: (importee?: string, importer?: string) => {
                    if (!importee) return;

                    if (importee.startsWith('.')) {
                        const u = new URL(
                            importee,
                            'http://url.resolve' + (importer || ''),
                        );
                        return u.pathname + u.search;
                    }

                    if (resolveLookup.has(importee)) {
                        return resolveLookup.get(importee);
                    }

                    return importee;
                },
                load: async (id: string) => {
                    const [path] = id.split('?');

                    if (!fs.has(path)) {
                        await fetchDependency(path);
                    }

                    return fs.get(path);
                },
            },
        ],
        onwarn(warning: any) {
            logger.groupCollapsed(warning.loc ? warning.loc.file : '');
            logger.warn(warning.message);
            if (warning.frame) {
                logger.log(warning.frame);
            }
            if (warning.url) {
                logger.log(`See ${warning.url} for more information`);
            }
            logger.groupEnd();
        },
    };

    try {
        const build = await rollup.rollup(inputOptions);
        const generated = await build.generate({
            format: 'esm',
        });

        return { bundle: generated.output[0].code };
    } catch (e) {
        logger.error(e);

        let errorMessage = e.toString();

        if (e.loc && e.loc.file) {
            errorMessage += '\n\n\n' + e.loc.file;
        }
        if (e.frame) {
            errorMessage += '\n\n\n' + e.frame;
        }

        return { error: errorMessage };
    }
};
