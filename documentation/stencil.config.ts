import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postcssPresetEnv from 'postcss-preset-env';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import requireContext from 'rollup-plugin-require-context';

import { string } from 'rollup-plugin-string';
import { workerPath } from '@eventstore/editor/configure';

import { dirname, join } from 'path';

const imports = [
    ['rollup'],
    ['@stencil/core/compiler'],
    ['@stencil/core/internal'],
    ['@eventstore/components', 'collection'],
    ['@eventstore/fields', 'collection'],
    ['@eventstore/editor', 'collection'],
    ['@eventstore/router'],
    ['@eventstore/utils'],
    ['@eventstore/stores'],
].map(([name, sub = '.']) => ({
    src: join(dirname(require.resolve(name)), sub),
    dest: `modules/${name}/`,
    warn: true,
}));

export const config: Config = {
    globalStyle: 'src/global/app.css',
    globalScript: 'src/global/app.ts',
    taskQueue: 'async',
    outputTargets: [
        {
            type: 'www',
            serviceWorker: null,
            baseUrl: 'https://myapp.local/',
            copy: [
                ...imports,
                {
                    src: '../preview/preview.html',
                    dest: 'preview.html',
                },
                {
                    src: '../preview/www/build',
                    dest: 'preview',
                },
                {
                    src: workerPath,
                    dest: 'workers',
                },
            ],
        },
    ],
    commonjs: {
        include: undefined,
    } as any,
    devServer: {
        openBrowser: false,
        reloadStrategy: 'pageReload',
    },
    plugins: [
        string({
            include: '../**/*.md',
        }),
        postcss({
            plugins: [
                postcssPresetEnv({
                    stage: 2,
                    features: {
                        'nesting-rules': true,
                    },
                    browsers: ['defaults', 'not IE 11'],
                }),
            ],
        }),
    ],
    rollupPlugins: {
        before: [requireContext({ include: ['**/*.ts', '**/*.tsx'] })],
        after: [nodePolyfills()],
    },
};
