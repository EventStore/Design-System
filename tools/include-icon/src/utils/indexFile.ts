import * as fs from 'fs';
import { join } from 'path';
import { promisify } from 'util';

import { prettify } from './prettify';
import { convertToLoader } from '../components/loader';
import { ComponentMetadata } from './componentMetadata';

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const pathExists = promisify(fs.exists);

export type IndexMap = Map<string, ComponentMetadata>;

const readIndex = async (destination: string): Promise<IndexMap> => {
    const indexPath = join(destination, 'icons.json');
    const exists = await pathExists(indexPath);
    const indexFile = exists ? (await readFile(indexPath)).toString() : '{}';
    const index = JSON.parse(indexFile);
    return new Map<string, ComponentMetadata>(Object.entries(index));
};

const writeIndex = async (destination: string, indexMap: IndexMap) => {
    const indexPath = join(destination, 'icons.json');
    const index = JSON.stringify(
        Array.from(indexMap)
            .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
            .reduce((acc, [name, info]) => ({ ...acc, [name]: info }), {}),
    );
    const prettyIndex = await prettify(index, indexPath);
    return writeFile(indexPath, prettyIndex);
};

const writeLoader = async (destination: string, indexMap: IndexMap) => {
    const loaderPath = join(destination, 'index.ts');
    const loader = convertToLoader(indexMap);
    const prettyLoader = await prettify(loader, loaderPath);
    return writeFile(loaderPath, prettyLoader);
};

const updateIndex = async (destination: string, indexMap: IndexMap) => {
    await writeIndex(destination, indexMap);
    await writeLoader(destination, indexMap);
};

export const addToIndex = async (
    destination: string,
    component: ComponentMetadata,
) => {
    const indexFile = await readIndex(destination);
    indexFile.set(component.name, component);
    return updateIndex(destination, indexFile);
};

export const removeFromIndex = async (
    destination: string,
    component: ComponentMetadata,
) => {
    const indexFile = await readIndex(destination);
    indexFile.delete(component.name);
    return updateIndex(destination, indexFile);
};
