import { cwd } from 'node:process';
import { resolve, isAbsolute } from 'node:path';

import { regenerateIndex } from '../utils/indexFile.js';

import { failure, info, success } from '../utils/finish.js';

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
