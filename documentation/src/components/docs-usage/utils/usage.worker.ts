import type StencilTypes from '@stencil/core/compiler';
import type RollupTypes from 'rollup';
import { replace } from './replace';

import { createLogger } from '@eventstore/utils';
import type { Files } from './types';
import { Build } from '@stencil/core';

declare const stencil: typeof StencilTypes;
declare const rollup: typeof RollupTypes;
declare const importScripts: (script: string) => void;

if (!Build.isServer) {
    importScripts('/modules/@stencil/core/compiler/stencil.js');
    importScripts('/modules/rollup/rollup.browser.js');
}

export const logger = createLogger(
    'useage worker',
    'linear-gradient( 108.9deg,  rgba(251,140,0,1) 11.2%, rgba(0,139,155,1) 88.9% )',
);

const fs = new Map<string, string>();
const resolveLookup = new Map<string, string>([
    ['@stencil/core', '/modules/@stencil/core/internal/client/index.js'],
    [
        '@stencil/core/internal/client',
        '/modules/@stencil/core/internal/client/index.js',
    ],
    [
        '@stencil/core/internal/app-data',
        '/modules/@stencil/core/internal/app-data/index.js',
    ],
    ['@eventstore/components', '/modules/@eventstore/components/index.js'],
    ['@eventstore/fields', '/modules/@eventstore/fields/index.js'],
    ['@eventstore/editor', '/modules/@eventstore/editor/index.js'],
    ['@eventstore/router', '/modules/@eventstore/router/index.js'],
    ['@eventstore/utils', '/modules/@eventstore/utils/index.mjs'],
    ['@eventstore/stores', '/modules/@eventstore/stores/index.mjs'],
]);

let ready: Promise<void>;

const fetchDependency = async (path: string) => {
    const response = await fetch(path);
    if (response.status !== 200) {
        throw new Error(response.statusText);
    }
    const code = await response.text();
    fs.set(path, code);
};

const loadDeps = async () => {
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

export const bundle = async (files: Files) => {
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

    fs.set(
        '/index.ts',
        Object.keys(files)
            .filter((p) => p.match(/.(t|j)sx?$/))
            .map((p) => `import '${p}';`)
            .join('\n'),
    );

    // prevent this from getting replaced in the build
    const envString = ['process', 'env', 'NODE_ENV'].join('.');

    const inputOptions: RollupTypes.InputOptions = {
        input: '/index.ts',
        treeshake: false,
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

                        const extension =
                            u.pathname.split('.').length > 1 ? '' : '.js';

                        return u.pathname + extension + u.search;
                    }

                    if (files[importee]) {
                        return `/${importee}`;
                    }

                    if (files[`${importee}.ts`]) {
                        return `/${importee}.ts`;
                    }

                    if (files[`${importee}.tsx`]) {
                        return `/${importee}.tsx`;
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
            replace({
                [envString]: JSON.stringify('production'),
            }),
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

        logger.error(errorMessage);

        return { error: errorMessage };
    }
};
