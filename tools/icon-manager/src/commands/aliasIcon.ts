import { cwd } from 'node:process';
import { resolve, isAbsolute } from 'node:path';

import { addAliasToIndex } from '../utils/indexFile.js';
import { failure, success } from '../utils/finish.js';

interface AliasIconOptions {
    name: string;
    alias: string;
    dir: string;
}

export const aliasIcon = async ({ name, alias, dir }: AliasIconOptions) => {
    const directory = isAbsolute(dir) ? dir : resolve(cwd(), dir);

    try {
        await addAliasToIndex(directory, name, alias);
        return success(`Aliased ${name} as ${alias}`);
    } catch (error) {
        return failure(error);
    }
};
