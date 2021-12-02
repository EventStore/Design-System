import { mkdir, writeFile } from 'fs/promises';
import { parse } from 'path';
import { join } from 'path/posix';
import { declaration } from '../components/declaration';
import { dirExists, fileExists } from './exists';

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
