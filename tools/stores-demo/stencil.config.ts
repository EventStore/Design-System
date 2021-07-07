import { Config } from '@stencil/core';

// https://stenciljs.com/docs/config

export const config: Config = {
    globalStyle: 'src/global/app.css',
    outputTargets: [
        {
            type: 'www',
            serviceWorker: null, // disable service workers
        },
    ],
};
