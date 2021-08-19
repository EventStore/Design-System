import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postcssPresetEnv from 'postcss-preset-env';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import requireContext from 'rollup-plugin-require-context';

import { mdx } from '@eventstore/stencil-markdown-plugin/plugin';
import { workerPath } from '@eventstore/editor/configure';

import { dirname } from 'path';
import injectPalettePlugin from '@eventstore/postcss-palette-plugin';

import { palette } from './src/global/palette';

const imports = [
    'rollup',
    '@stencil/core/compiler',
    '@stencil/core/internal',
    '@eventstore/components',
    '@eventstore/fields',
    '@eventstore/router',
    '@eventstore/editor',
    '@eventstore/utils',
    '@eventstore/stores',
].map((name) => ({
    src: dirname(require.resolve(name)),
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
                    src: './components/docs-usage/preview.html',
                    dest: 'preview.html',
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
        mdx({
            visitors: [['comment', () => 'skip']],
        }),
        postcss({
            plugins: [
                injectPalettePlugin({ palette }),
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
