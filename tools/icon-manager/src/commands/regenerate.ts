import { cwd } from 'process';
import { resolve, isAbsolute } from 'path';

import { regenerateIndex } from '../utils/indexFile';

import { failure, info, success } from '../utils/finish';

interface RegenerateOptions {
    dir: string;
}

export const regenerate = async ({ dir }: RegenerateOptions) => {
    try {
        const directory = isAbsolute(dir) ? dir : resolve(cwd(), dir);

        info('Regenerating index.');

        await regenerateIndex(directory);

        return success('Regenerated index');
    } catch (error) {
        return failure(error);
    }
};
