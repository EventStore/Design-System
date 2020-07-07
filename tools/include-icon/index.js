#!/usr/bin/env node

/* eslint-disable no-console */

const fs = require('fs');
const { resolve, isAbsolute } = require('path');
const { promisify } = require('util');
const process = require('process');

const yargs = require('yargs');
const prettier = require('prettier');
const clipboardy = require('clipboardy');
const { toPascalCase } = require('js-convert-case');

const svgo = require('./optimise');

const createDir = promisify(fs.mkdir);
const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const removeFile = promisify(fs.unlink);
const pathExists = promisify(fs.exists);

const optimise = async (icon) => {
    const { data } = await svgo.optimize(icon);
    return data;
};

const convertToComponent = (icon, name) => `
import { h } from '@stencil/core';

export const ${name} = (props: any) => (
    ${icon.toString().replace('<svg', '<svg {...props}')}
);
`;

const prettify = async (icon, destination) => {
    const prettierConfig = await prettier.resolveConfig(destination);
    return prettier.format(icon, {
        ...(prettierConfig || {}),
        parser: 'babel-ts',
    });
};

const createDirIfMissing = async (directory) => {
    const exists = await pathExists(directory);
    if (exists) return;
    return createDir(directory, { recursive: true });
};

const readIndex = async (destination) => {
    const indexPath = resolve(destination, 'index.ts');
    const exists = await pathExists(indexPath);
    const currentIndex = exists ? (await readFile(indexPath)).toString() : '';
    return new Set(currentIndex.trim().split('\n'));
};

const writeIndex = async (destination, indexSet) => {
    const indexPath = resolve(destination, 'index.ts');
    const updatedIndex = Array.from(indexSet).sort().join('\n');
    const index = await prettify(updatedIndex);
    return writeFile(indexPath, index);
};

const addToIndex = async (destination, componentName) => {
    const indexFile = await readIndex(destination);
    indexFile.add(`export { ${componentName} } from './${componentName}';`);
    return writeIndex(destination, indexFile);
};

const removeFromIndex = async (destination, componentName) => {
    const indexFile = await readIndex(destination);
    indexFile.delete(`export { ${componentName} } from './${componentName}';`);
    return writeIndex(destination, indexFile);
};

const loadFromPath = async (path) => {
    const filePath = isAbsolute(path) ? path : resolve(process.cwd(), path);
    const exists = await pathExists(filePath);

    if (!exists) {
        throw new Error(`Cannot find icon at path ${filePath}`);
    }

    const file = await readFile(filePath);
    return file.toString();
};

const loadIcon = async ({ clipboard, file }) => {
    if (clipboard) {
        const contents = await clipboardy.read();

        if (contents.includes('<svg')) return contents;

        return loadFromPath(contents);
    }

    return loadFromPath(file);
};

const addIcon = async ({ name, clipboard, file, dir }) => {
    const directory = isAbsolute(dir) ? dir : resolve(process.cwd(), dir);
    await createDirIfMissing(directory);

    const componentName = toPascalCase(name);
    const icon = await loadIcon({ clipboard, file });
    const optimised = await optimise(icon);
    const component = convertToComponent(optimised, componentName);
    const cleanedUp = await prettify(component, directory);
    const filePath = resolve(directory, `${componentName}.tsx`);

    await addToIndex(directory, componentName);
    await writeFile(filePath, cleanedUp);
    console.log(`created ${name} as ${componentName} in ${filePath}`);
};

const removeIcon = async ({ name, dir }) => {
    const directory = isAbsolute(dir) ? dir : resolve(process.cwd(), dir);
    const componentName = toPascalCase(name);
    const filePath = resolve(directory, `${componentName}.tsx`);

    await removeFromIndex(directory, componentName);
    await removeFile(filePath);

    console.log(`removed ${name} from ${filePath}`);
};

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
