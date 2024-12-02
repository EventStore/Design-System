import type { Config } from '@stencil/core';
import { postcss } from '@stencil-community/postcss';
import { assetsPath } from '@kurrent-ui/assets';
import postcssPresetEnv from 'postcss-preset-env';

import { string } from 'rollup-plugin-string';
import * as editor from '@kurrent-ui/editor/configure';

export const config: Config = {
    globalStyle: 'src/global/app.css',
    globalScript: 'src/global/app.ts',
    taskQueue: 'async',
    sourceMap: true,
    outputTargets: [
        {
            type: 'www',
            baseUrl: 'https://design-system.eventstore.com/',
            serviceWorker: false,
            copy: [
                { src: 'preview.html', dest: 'preview/index.html' },
                {
                    src: editor.assetsPath,
                    dest: 'assets',
                },
                {
                    src: editor.workerPath,
                    dest: 'workers',
                },
                {
                    src: assetsPath,
                    dest: 'assets',
                },
                { src: 'site.manifest', dest: 'assets/site.manifest' },
            ],
        },
    ],
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
};
