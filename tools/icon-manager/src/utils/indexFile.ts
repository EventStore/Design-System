import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import { gt, SemVer } from 'semver';

import { version } from './version';
import { prettify } from './prettify';
import { convertToLoader } from '../components/loader';
import type { ComponentMetadata } from './componentMetadata';
import { fileExists } from './exists';

export type IndexMap = Map<string, ComponentMetadata>;

interface IconJSONV00 {
    [name: string]: ComponentMetadata;
}

interface IconJSONV01 {
    version: string;
    icons: {
        [name: string]: ComponentMetadata;
    };
}

type UnknownIndexFile = IconJSONV00 | IconJSONV01;
type CurrentIndexFile = IconJSONV01;

type UpdateNeeded = false | 'full' | 'number';

const needsUpdate = (index: UnknownIndexFile): UpdateNeeded => {
    if (typeof index.version !== 'string') return 'full';
    const indexVersion = index.version;

    const oSV = new SemVer(version);
    const iSV = new SemVer(indexVersion);

    if (
        oSV.major !== iSV.major ||
        (oSV.major === 0 && oSV.minor !== iSV.minor)
    ) {
        if (gt(oSV, iSV)) return 'full';
        throw `Icons generated with a newer version of icon-manager. Please update your version of icon-manager to at least ${indexVersion}`;
    }

    return false;
};

const indexToMap = (index: UnknownIndexFile, force: boolean): IndexMap => {
    const indexVersion =
        typeof index.version === 'string' ? index.version : '0.0.x';

    if (indexVersion === '0.0.x') {
        if (force)
            return new Map<string, ComponentMetadata>(
                Object.entries(index as IconJSONV00),
            );
        throw 'Icons generated with v0.0.x of icon-manager. Please run icon upgrade to regenerate icons.';
    }

    if (!force && needsUpdate(index) === 'full') {
        throw 'Icons generated with older version of icon-manager. Please run icon upgrade to regenerate icons.';
    }

    return new Map<string, ComponentMetadata>(
        Object.entries((index as IconJSONV01).icons),
    );
};

export const checkIfIndexNeedsUpdate = async (
    destination: string,
): Promise<UpdateNeeded> => {
    const indexPath = join(destination, 'icons.json');
    const exists = await fileExists(indexPath);
    if (!exists) throw `No index file found in ${destination}`;
    const file = await readFile(indexPath, 'utf-8');
    const content = JSON.parse(file);
    return needsUpdate(content);
};

export const readIndex = async (
    destination: string,
    force: boolean = false,
): Promise<IndexMap> => {
    const indexPath = join(destination, 'icons.json');
    const exists = await fileExists(indexPath);

    if (exists) {
        const file = await readFile(indexPath, 'utf-8');
        const content = JSON.parse(file);
        return indexToMap(content, force);
    }

    return new Map();
};

const writeIndex = async (destination: string, indexMap: IndexMap) => {
    const indexFile: CurrentIndexFile = {
        version,
        icons: Array.from(indexMap)
            .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
            .reduce((acc, [name, info]) => ({ ...acc, [name]: info }), {}),
    };
    const indexPath = join(destination, 'icons.json');
    const index = JSON.stringify(indexFile);
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

export const regenerateIndex = async (destination: string) => {
    const indexFile = await readIndex(destination, true);
    return updateIndex(destination, indexFile);
};
