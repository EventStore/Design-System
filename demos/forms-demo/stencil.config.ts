import type { Config } from '@stencil/core';
import { assetsPath } from '@kurrent-ui/assets';

// https://stenciljs.com/docs/config

export const config: Config = {
    globalStyle: 'src/global/app.css',
    globalScript: 'src/global/app.ts',
    taskQueue: 'async',
    outputTargets: [
        {
            type: 'www',
            serviceWorker: null,
            copy: [
                {
                    src: assetsPath,
                    dest: 'assets',
                },
            ],
        },
    ],
};
