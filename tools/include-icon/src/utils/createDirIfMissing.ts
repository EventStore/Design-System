import * as fs from 'fs';

import { promisify } from 'util';

const createDir = promisify(fs.mkdir);

const pathExists = promisify(fs.exists);

export const createDirIfMissing = async (directory: string) => {
    const exists = await pathExists(directory);
    if (exists) return;
    return createDir(directory, { recursive: true });
};
