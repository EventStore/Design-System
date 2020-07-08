import * as fs from 'fs';
import * as process from 'process';
import { resolve, isAbsolute } from 'path';
import { promisify } from 'util';

import * as clipboardy from 'clipboardy';

const readFile = promisify(fs.readFile);

const pathExists = promisify(fs.exists);

const loadFromPath = async (path: string) => {
    const filePath = isAbsolute(path) ? path : resolve(process.cwd(), path);
    const exists = await pathExists(filePath);

    if (!exists) {
        throw new Error(`Cannot find icon at path ${filePath}`);
    }

    const file = await readFile(filePath);
    return file.toString();
};

interface LoadIconOptions {
    clipboard?: boolean;
    file?: string;
}

export const loadIcon = async ({ clipboard, file }: LoadIconOptions) => {
    if (clipboard) {
        const contents = await clipboardy.read();

        if (contents.includes('<svg')) return contents;

        return loadFromPath(contents);
    }

    return loadFromPath(file!);
};
