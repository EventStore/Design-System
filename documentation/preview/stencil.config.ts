import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postcssPresetEnv from 'postcss-preset-env';
import injectPalettePlugin from '@eventstore/postcss-palette-plugin';

import { palette } from '../src/global/palette';

export const config: Config = {
    globalStyle: '../src/global/app.css',
    globalScript: './src/main.ts',
    taskQueue: 'async',
    outputTargets: [
        {
            type: 'www',
            serviceWorker: null,
            baseUrl: 'https://myapp.local/',
        },
    ],
    plugins: [
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
};
