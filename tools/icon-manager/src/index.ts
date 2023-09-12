#!/usr/bin/env node

import yargs from 'yargs';
import { addIcon } from './commands/addIcon.js';
import { aliasIcon } from './commands/aliasIcon.js';
import { setNamespace } from './commands/namespace.js';
import { removeIcon } from './commands/removeIcon.js';
import { upgrade } from './commands/upgrade.js';
import { display } from './commands/display.js';
import { regenerate } from './commands/regenerate.js';
import { version } from './utils/version.js';

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
        'namespace [namespace]',
        'set the namespace of the icons in the directory',
        (yargs) => {
            yargs.positional('namespace', {
                describe:
                    'The namespace to set.\nPrefix with @@ to use a symbol.\nOmit to remove namespace',
                type: 'string',
            });
        },
        setNamespace,
    )
    .command(
        'upgrade',
        'Upgrade from a previous version of icon manager',
        (yargs) => {
            yargs.options({
                force: {
                    describe: 'Upgrade even if not needed.',
                    type: 'boolean',
                },
            });
        },
        upgrade,
    )
    .command(
        'regenerate',
        'Regenerate your index from icons.json',
        () => {
            // no options
        },
        regenerate,
    )
    .command(
        'display',
        'Display icons in browser',
        () => {
            yargs.options({
                port: {
                    alias: 'p',
                    describe: 'Which port to host on',
                    type: 'number',
                    default: 8080,
                },
                watch: {
                    alias: 'w',
                    describe: 'Watch for changes',
                    type: 'boolean',
                    default: true,
                },
            });
        },
        display,
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
