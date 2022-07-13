import { Config } from '@stencil/core';
import { parseFlags } from '@stencil/core/cli';
import { CopyTask } from '@stencil/core/internal';
import { postcss } from '@stencil/postcss';
import postcssPresetEnv from 'postcss-preset-env';

import { assetsPath } from '@eventstore-ui/assets';

export const flags = parseFlags(process.argv.slice(2));

interface PackageConfig extends Partial<Config> {
    namespace: string;
    copy?: CopyTask[];
}

export const packageConfig = ({
    devServer = {},
    plugins = [],
    copy,
    ...config
}: PackageConfig): Config => ({
    taskQueue: 'async',
    outputTargets: flags.dev
        ? [
              {
                  type: 'www',
                  copy: [
                      {
                          src: assetsPath,
                          dest: 'assets',
                      },
                      ...(copy ?? []),
                  ],
              },
          ]
        : [
              {
                  type: 'dist',
                  esmLoaderPath: './loader',
                  copy,
              },
              {
                  type: 'docs-readme',
                  footer: '',
                  strict: true,
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
