import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'es-layout',
    taskQueue: 'async',
    outputTargets: [
        {
            type: 'dist',
            esmLoaderPath: './loader',
        },
        {
            type: 'docs-readme',
            footer: '',
        },
    ],
};