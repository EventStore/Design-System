import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'es-components',
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
