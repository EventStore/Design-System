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

type ExistDetails = [exists: boolean, aliasOf?: string];

export const isInIndex = async (
    destination: string,
    name: string,
): Promise<ExistDetails> => {
    const indexFile = await readIndex(destination);

    if (indexFile.has(name)) return [true];

    const aliased = Array.from(indexFile.values()).find(({ aliases }) =>
        aliases?.includes(name),
    );

    if (aliased) return [true, aliased.name];

    return [false];
};

export const addToIndex = async (
    destination: string,
    component: ComponentMetadata,
) => {
    const indexFile = await readIndex(destination);
    indexFile.set(component.name, component);
    return updateIndex(destination, indexFile);
};

export const addAliasToIndex = async (
    destination: string,
    name: string,
    alias: string,
) => {
    const indexFile = await readIndex(destination);

    if (!indexFile.has(name)) {
        throw `Unable to alias ${name} as ${alias}, because no icon named ${name} exists`;
    }

    if (indexFile.has(alias)) {
        throw `Unable to alias ${name} as ${alias}, because ${alias} is an existing icon`;
    }

    const existing = Array.from(indexFile.values()).find(({ aliases }) =>
        aliases?.includes(alias),
    );

    if (existing) {
        throw `Unable to alias ${name} as ${alias}, because ${alias} already exists as an alias of ${existing.name}`;
    }

    const component = indexFile.get(name)!;

    indexFile.set(name, {
        ...component,
        aliases: [...(component.aliases ?? []), alias].sort(),
    });

    return updateIndex(destination, indexFile);
};

export const removeAliasFromIndex = async (
    destination: string,
    name: string,
    alias: string,
) => {
    const indexFile = await readIndex(destination);

    if (!indexFile.has(name)) {
        throw `Unable to remove alias ${alias} from ${name}, as no icon named ${name} exists`;
    }

    const { aliases: prior, ...component } = indexFile.get(name)!;
    const aliases = prior?.filter((a) => a !== alias);

    if (aliases?.length) {
        indexFile.set(name, {
            ...component,
            aliases,
        });
    } else {
        indexFile.set(name, component);
    }

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
