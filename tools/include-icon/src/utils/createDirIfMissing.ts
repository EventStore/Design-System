import * as fs from 'fs';
import { parse } from 'path';
import { promisify } from 'util';

const createDir = promisify(fs.mkdir);

const pathExists = promisify(fs.exists);

export const createDirIfMissing = async (directory: string) => {
    const { dir } = parse(directory);
    const exists = await pathExists(dir);
    if (exists) return;
    return createDir(dir, { recursive: true });
};
