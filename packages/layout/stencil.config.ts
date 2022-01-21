import { Config } from '@stencil/core';

export const config: Config = {
    namespace: 'es-layout',
    taskQueue: 'async',
    globalScript: 'src/init.ts',
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
