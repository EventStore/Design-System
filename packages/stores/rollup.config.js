import pkg from './package.json';

// eslint-disable-next-line no-restricted-syntax
export default {
    input: 'build/index.js',

    output: [
        {
            format: 'cjs',
            file: pkg.main,
        },
        {
            format: 'esm',
            file: pkg.module,
        },
    ],
    external: ['@stencil/core', '@eventstore/utils'],
};
