import { Config } from '@stencil/core';
import { postcss } from '@stencil/postcss';
import postcssPresetEnv from 'postcss-preset-env';

export const config: Config = {
    globalStyle: './src/preview.css',
    globalScript: './src/main.ts',
    taskQueue: 'async',
    outputTargets: [
        {
            type: 'www',
            serviceWorker: null,
            baseUrl: 'https://design-system.eventstore.com/',
        },
    ],
    plugins: [
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
};
