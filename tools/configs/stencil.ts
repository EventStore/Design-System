import { Config } from '@stencil/core';
import { parseFlags } from '@stencil/core/cli';
import { postcss } from '@stencil/postcss';
import postcssPresetEnv from 'postcss-preset-env';

export const flags = parseFlags(process.argv.slice(2));

export const packageConfig = ({
    devServer = {},
    plugins = [],
    ...config
}: Partial<Config>): Config => ({
    taskQueue: 'async',
    outputTargets: flags.dev
        ? [
              {
                  type: 'www',
              },
          ]
        : [
              {
                  type: 'dist',
                  esmLoaderPath: './loader',
              },
              {
                  type: 'docs-readme',
                  footer: '',
              },
          ],
    devServer: {
        openBrowser: false,
        ...devServer,
    },
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
        ...plugins,
    ],
    ...config,
});
