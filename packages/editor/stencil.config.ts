import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'es-editor',
    taskQueue: 'async',
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: './loader',
        },
        {
            type: 'docs-readme',
        },
    ],
    devServer: {
        openBrowser: false,
    },
};
