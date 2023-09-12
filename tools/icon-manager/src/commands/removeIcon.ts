import { unlink } from 'node:fs/promises';
import { cwd } from 'node:process';
import { resolve, isAbsolute } from 'node:path';

import {
    isInIndex,
    removeAliasFromIndex,
    removeFromIndex,
} from '../utils/indexFile.js';
import { componentMetadata } from '../utils/componentMetadata.js';
import { failure, success } from '../utils/finish.js';

interface RemoveIconOptions {
    name: string;
    dir: string;
}

export const removeIcon = async ({ name, dir }: RemoveIconOptions) => {
    try {
        const directory = isAbsolute(dir) ? dir : resolve(cwd(), dir);
        const metadata = componentMetadata(name);

        const filePath = resolve(directory, metadata.path);

        const [exists, parent] = await isInIndex(directory, name);

        if (!exists) {
            return failure(`Failed to remove ${name}, icon does not exist.`);
        }

        if (parent) {
            await removeAliasFromIndex(directory, parent, name);
            return success(`Removed alias ${name} from icon ${parent}`);
        }

        await removeFromIndex(directory, metadata);
        await unlink(filePath);

        return success(`Removed icon ${name} in ${filePath}`);
    } catch (error) {
        return failure(error);
    }
};
