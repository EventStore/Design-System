import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';

import css from 'rollup-plugin-import-css';
import copy from 'rollup-plugin-copy';
import { babel } from '@rollup/plugin-babel';

import monacoPackage from 'monaco-editor/package.json' assert { type: 'json' };

const monacoPath = dirname(
    createRequire(import.meta.url).resolve('monaco-editor/package.json'),
);

const entry = join(monacoPath, monacoPackage.module);
const types = join(monacoPath, monacoPackage.typings);

// eslint-disable-next-line no-restricted-syntax
export default {
    input: entry,
    context: 'self',
    output: [
        {
            format: 'esm',
            dir: 'dist',
            preserveModules: true,
            entryFileNames: '[name].mjs',
        },
    ],
    plugins: [
        babel({
            babelHelpers: 'bundled',
            plugins: ['@babel/plugin-transform-class-static-block'],
        }),
        css({
            inject: true,
            transform: (c) => {
                if (c.includes('@font-face')) {
                    return c.replace(
                        /url\(([^)]*)\)/g,
                        (_, url) =>
                            `url('${
                                new URL(url, 'http://example.com/assets/')
                                    .pathname
                            }')`,
                    );
                }
                return c;
            },
        }),
        copy({
            targets: [
                {
                    src: types,
                    dest: 'dist/editor',
                },
            ],
            verbose: true,
        }),
    ],
};
