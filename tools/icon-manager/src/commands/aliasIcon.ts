import { cwd } from 'process';
import { resolve, isAbsolute } from 'path';

import { addAliasToIndex } from '../utils/indexFile';
import { failure, success } from '../utils/finish';

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
