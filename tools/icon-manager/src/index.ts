#!/usr/bin/env node

import * as yargs from 'yargs';
import { addIcon } from './commands/addIcon';
import { aliasIcon } from './commands/aliasIcon';
import { removeIcon } from './commands/removeIcon';
import { upgrade } from './commands/upgrade';
import { version } from './utils/version';

yargs
    .version(version)
    .command(
        'add [name]',
        'add an icon',
        (yargs) => {
            yargs
                .positional('name', {
                    describe: 'The icon name to use',
                    type: 'string',
                    demandOption: true,
                })
                .options({
                    clipboard: {
                        alias: 'c',
                        describe: 'Take the svg from the clipboard',
                        type: 'boolean',
                        conflicts: ['file'],
                    },
                    file: {
                        alias: 'f',
                        describe: 'Take the svg from a file',
                        type: 'string',
                        conflicts: ['clipboard'],
                    },
                    force: {
                        describe: 'Overwrite existing files or aliases',
                        type: 'boolean',
                    },
                })
                .check(({ clipboard, file }) => {
                    if (!clipboard && !file) {
                        throw new Error('Either clipboard or file is required');
                    }

                    return true;
                });
        },
        addIcon,
    )
    .command(
        'remove [name]',
        'remove an icon or alias',
        (yargs) => {
            yargs.positional('name', {
                describe: 'The icon to remove',
                type: 'string',
                demandOption: true,
            });
        },
        removeIcon,
    )
    .command(
        'alias [name] [alias]',
        'add an icon alias',
        (yargs) => {
            yargs
                .positional('name', {
                    describe: 'The icon to apply the alias to',
                    type: 'string',
                    demandOption: true,
                })
                .positional('alias', {
                    describe: 'The alias to apply',
                    type: 'string',
                    demandOption: true,
                });
        },
        aliasIcon,
    )
    .command(
        'upgrade',
        'Upgrade from a previous version of icon manager',
        () => {
            // no additional args
        },
        upgrade,
    )
    .option('dir', {
        alias: 'd',
        demandOption: true,
        describe: 'Where to store your icons',
        type: 'string',
    })
    .demandCommand(1)
    .showHelpOnFail(true, 'Specify --help for available options')
    .help('help').argv;
