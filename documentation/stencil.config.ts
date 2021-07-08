import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postcssPresetEnv from 'postcss-preset-env';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import requireContext from 'rollup-plugin-require-context';

import { mdx } from '@eventstore/stencil-markdown-plugin/plugin';
import injectPalettePlugin from '@eventstore/postcss-palette-plugin';

import { palette } from './src/global/palette';

export const config: Config = {
    globalStyle: 'src/global/app.css',
    globalScript: 'src/global/app.ts',
    taskQueue: 'async',
    outputTargets: [
        {
            type: 'www',
            serviceWorker: null,
            baseUrl: 'https://myapp.local/',
        },
    ],
    devServer: {
        openBrowser: false,
        reloadStrategy: 'pageReload',
    },
    plugins: [
        mdx(),
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
