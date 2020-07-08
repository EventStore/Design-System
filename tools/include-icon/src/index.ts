#!/usr/bin/env node

import * as yargs from 'yargs';
import { addIcon } from './commands/addIcon';
import { removeIcon } from './commands/removeIcon';

yargs
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
        'remove an icon',
        (yargs) => {
            yargs.positional('name', {
                describe: 'The icon to remove',
                type: 'string',
                demandOption: true,
            });
        },
        removeIcon,
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
