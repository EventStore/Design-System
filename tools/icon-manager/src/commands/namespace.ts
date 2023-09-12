import { cwd } from 'node:process';
import { resolve, isAbsolute } from 'node:path';

import { readIndexFileDetails, updateIndex } from '../utils/indexFile.js';

import { failure, success } from '../utils/finish.js';

interface SetNamespaceOptions {
    dir: string;
    namespace?: string;
}

export const setNamespace = async ({ dir, namespace }: SetNamespaceOptions) => {
    if (namespace == null) return removeNamespace(dir);

    try {
        const directory = isAbsolute(dir) ? dir : resolve(cwd(), dir);
        const indexFile = await readIndexFileDetails(directory);

        if (indexFile.namespace === namespace) {
            return failure(`Namespace is already "${namespace}" in ${dir}`);
        }

        await updateIndex({ ...indexFile, namespace: namespace });

        return success(`Set Namespace to ${namespace} in ${dir}`);
    } catch (error) {
        return failure(error);
    }
};

const removeNamespace = async (dir: string) => {
    try {
        const directory = isAbsolute(dir) ? dir : resolve(cwd(), dir);
        const { namespace, ...indexFile } = await readIndexFileDetails(
            directory,
        );

        if (namespace == null) {
            return failure(`No namespace set in ${dir}`);
        }

        await updateIndex(indexFile);

        return success(`Removed namespace in ${dir}`);
    } catch (error) {
        return failure(error);
    }
};
