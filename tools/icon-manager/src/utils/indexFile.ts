import { readFile, unlink, writeFile } from 'fs/promises';
import { join } from 'path';

import { gt, SemVer } from 'semver';

import { version } from './version';
import { prettify } from './prettify';
import { convertToLoader } from '../components/loader';
import type { ComponentMetadata } from './componentMetadata';
import { fileExists } from './exists';

export type IndexMap = Map<string, ComponentMetadata>;
export interface IndexFileDetails {
    destination: string;
    iconStoreImportPath?: string;
    namespace?: string;
    indexMap: IndexMap;
}

interface IconJSONV00 {
    [name: string]: ComponentMetadata;
}

interface IconJSONV01 {
    version: string;
    namespace?: string;
    iconStoreImportPath?: string;
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
    const details = await readIndexFileDetails(destination, force);
    return details.indexMap;
};

export const readIndexFileDetails = async (
    destination: string,
    force: boolean = false,
): Promise<IndexFileDetails> => {
    const indexPath = join(destination, 'icons.json');
    const exists = await fileExists(indexPath);

    if (exists) {
        const file = await readFile(indexPath, 'utf-8');
        const content = JSON.parse(file);

        return {
            destination,
            indexMap: indexToMap(content, force),
            namespace: content.namespace,
            iconStoreImportPath: content.iconStoreImportPath,
        };
    }

    return {
        destination,
        indexMap: new Map(),
    };
};

export const readNamespace = async (
    destination: string,
): Promise<string | undefined> => {
    const indexPath = join(destination, 'icons.json');
    const exists = await fileExists(indexPath);

    if (exists) {
        const file = await readFile(indexPath, 'utf-8');
        const content = JSON.parse(file);
        return content.namespace;
    }

    return;
};

const writeIndex = async ({
    destination,
    namespace,
    iconStoreImportPath,
    indexMap,
}: IndexFileDetails) => {
    const indexFile: CurrentIndexFile = {
        version,
        namespace,
        iconStoreImportPath,
        icons: Array.from(indexMap)
            .sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0))
            .reduce((acc, [name, info]) => ({ ...acc, [name]: info }), {}),
    };

    const indexPath = join(destination, 'icons.json');
    const index = JSON.stringify(indexFile);
    const prettyIndex = await prettify(index, indexPath);
    return writeFile(indexPath, prettyIndex);
};

const createNamespace = async ({
    destination,
    namespace,
}: IndexFileDetails): Promise<boolean> => {
    const namespacePath = join(destination, 'namespace.ts');
    if (await fileExists(namespacePath)) {
        await unlink(namespacePath);
    }

    if (!namespace) return false;

    const isSymbol = namespace.startsWith('@@');
    const name = namespace.replace(/^@@/, '');
    const namespaceFile = `export const ICON_NAMESPACE = ${
        isSymbol ? `Symbol('${name}');` : `'${name}'`
    }`;
    const prettyNamespaceFile = await prettify(namespaceFile, namespacePath);

    await writeFile(namespacePath, prettyNamespaceFile);

    return true;
};

const writeLoader = async (options: IndexFileDetails) => {
    const namespaced = await createNamespace(options);
    const { destination, indexMap, iconStoreImportPath } = options;
    const loaderPath = join(destination, 'index.ts');
    const loader = convertToLoader(indexMap, iconStoreImportPath, namespaced);
    const prettyLoader = await prettify(loader, loaderPath);
    return writeFile(loaderPath, prettyLoader);
};

export const updateIndex = async (options: IndexFileDetails) => {
    await writeIndex(options);
    await writeLoader(options);
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
    const indexFile = await readIndexFileDetails(destination);
    indexFile.indexMap.set(component.name, component);
    return updateIndex(indexFile);
};

export const addAliasToIndex = async (
    destination: string,
    name: string,
    alias: string,
) => {
    const { indexMap, ...indexFile } = await readIndexFileDetails(destination);

    if (!indexMap.has(name)) {
        throw `Unable to alias ${name} as ${alias}, because no icon named ${name} exists`;
    }

    if (indexMap.has(alias)) {
        throw `Unable to alias ${name} as ${alias}, because ${alias} is an existing icon`;
    }

    const existing = Array.from(indexMap.values()).find(({ aliases }) =>
        aliases?.includes(alias),
    );

    if (existing) {
        throw `Unable to alias ${name} as ${alias}, because ${alias} already exists as an alias of ${existing.name}`;
    }

    const component = indexMap.get(name)!;

    indexMap.set(name, {
        ...component,
        aliases: [...(component.aliases ?? []), alias].sort(),
    });

    return updateIndex({
        indexMap,
        ...indexFile,
    });
};

export const removeAliasFromIndex = async (
    destination: string,
    name: string,
    alias: string,
) => {
    const { indexMap, ...indexFile } = await readIndexFileDetails(destination);

    if (!indexMap.has(name)) {
        throw `Unable to remove alias ${alias} from ${name}, as no icon named ${name} exists`;
    }

    const { aliases: prior, ...component } = indexMap.get(name)!;
    const aliases = prior?.filter((a) => a !== alias);

    if (aliases?.length) {
        indexMap.set(name, {
            ...component,
            aliases,
        });
    } else {
        indexMap.set(name, component);
    }

    return updateIndex({
        indexMap,
        ...indexFile,
    });
};

export const removeFromIndex = async (
    destination: string,
    component: ComponentMetadata,
) => {
    const indexFile = await readIndexFileDetails(destination);
    indexFile.indexMap.delete(component.name);
    return updateIndex(indexFile);
};

export const regenerateIndex = async (destination: string) => {
    const indexFile = await readIndexFileDetails(destination, true);
    return updateIndex(indexFile);
};
