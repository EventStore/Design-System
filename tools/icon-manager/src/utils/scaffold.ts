import { mkdir, writeFile } from 'node:fs/promises';
import { parse } from 'node:path';
import { join } from 'node:path/posix';

import { declaration } from '../components/declaration.js';
import { dirExists, fileExists } from './exists.js';

export const createDirIfMissing = async (directory: string) => {
    const { dir } = parse(directory);
    const exists = await dirExists(dir);
    if (exists) return;
    return mkdir(dir, { recursive: true });
};

export const createDeclarationIfMissing = async (
    directory: string,
    force: boolean = false,
) => {
    const path = join(directory, 'icon.d.ts');
    const exists = await fileExists(path);
    if (!force && exists) return;
    return writeFile(path, declaration);
};
