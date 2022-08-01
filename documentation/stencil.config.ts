import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import { assetsPath } from '@eventstore-ui/assets';
import postcssPresetEnv from 'postcss-preset-env';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import requireContext from 'rollup-plugin-require-context';

import { string } from 'rollup-plugin-string';
import { workerPath } from '@eventstore-ui/editor/configure';

import { dirname, join } from 'path';

const imports = [
    ['rollup'],
    ['@stencil/core/compiler'],
    ['@stencil/core/internal'],
    ['@eventstore-ui/components', 'collection'],
    ['@eventstore-ui/fields', 'collection'],
    ['@eventstore-ui/editor', 'collection'],
    ['@eventstore-ui/layout', 'collection'],
    ['@eventstore-ui/theme'],
    ['@eventstore-ui/router'],
    ['@eventstore-ui/utils'],
    ['@eventstore-ui/stores'],
    ['@eventstore-ui/forms'],
].map(([name, sub = '.']) => ({
    src: join(dirname(require.resolve(name)), sub),
    dest: `modules/${name}/`,
    warn: true,
}));

export const config: Config = {
    globalStyle: 'src/global/app.css',
    globalScript: 'src/global/app.ts',
    taskQueue: 'async',
    sourceMap: true,
    outputTargets: [
        {
            type: 'www',
            baseUrl: 'https://design-system.eventstore.com/',
            serviceWorker: {
                swSrc: './src/global/sw.js',
                globPatterns: ['**/*.{js,css,woff,woff2}'],
                // monaco is pretty chunky, but we still want to pre-cache it
                maximumFileSizeToCacheInBytes: 3_000_000,
            },
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
                {
                    src: assetsPath,
                    dest: 'assets',
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
