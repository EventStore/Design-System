import { join } from 'path';
import { existsSync } from 'fs';

import { type Config as StencilConfig } from '@stencil/core';
import { parseFlags } from '@stencil/core/cli';
import { type CopyTask } from '@stencil/core/internal';
import { postcss } from '@stencil-community/postcss';
import postcssPresetEnv from 'postcss-preset-env';

import { assetsPath } from '@eventstore-ui/assets';
import { devMode } from './dev/devMode';

export const flags = parseFlags(process.argv.slice(2));

interface PackageConfig extends Partial<Config> {
    namespace: string;
    copy?: CopyTask[];
}

interface Config extends StencilConfig {
    buildDocs?: boolean;
}

export const packageConfig = ({
    devServer = {},
    plugins = [],
    copy,
    ...config
}: PackageConfig): Config => ({
    taskQueue: 'async',
    globalStyle:
        config.globalStyle ??
        (flags.dev ? join(__dirname, './dev/dev.css') : undefined),
    outputTargets: flags.dev
        ? [
              devMode(),
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
    tsconfig:
        !flags.dev && existsSync('./tsconfig.build.json')
            ? './tsconfig.build.json'
            : './tsconfig.json',
    buildDocs: flags.dev || undefined,
    cacheDir: join(__dirname, '../../.stencil', config.namespace),
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
