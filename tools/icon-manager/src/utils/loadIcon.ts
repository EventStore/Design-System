import { readFile } from 'node:fs/promises';
import { cwd } from 'node:process';
import { resolve, isAbsolute, parse } from 'node:path';

import * as clipboardy from 'clipboardy';
import { optimiseSVG } from './optimiseSVG.js';
import { fileExists } from './exists.js';

export interface Loaded {
    kind: 'jsx' | 'svg';
    content: string;
}

const loadFromPath = async (path: string): Promise<Loaded> => {
    const filePath = isAbsolute(path) ? path : resolve(cwd(), path);
    const exists = await fileExists(filePath);

    if (!exists) {
        throw new Error(`Cannot find icon at path ${filePath}`);
    }

    const ext = parse(filePath).ext;
    const fileContent = await readFile(filePath, 'utf-8');

    if (/(j|t)sx?$/.test(ext)) {
        const content = fileContent.match(/<svg[\s\S]+svg>/);

        if (!content) {
            throw 'Unable to extract icon from jsx';
        }

        return {
            kind: 'jsx',
            content: content[0],
        };
    }

    const content = await optimiseSVG(fileContent);

    return {
        kind: 'svg',
        content,
    };
};

interface LoadIconOptions {
    clipboard?: boolean;
    file?: string;
}

export const loadIcon = async ({
    clipboard,
    file,
}: LoadIconOptions): Promise<Loaded> => {
    if (clipboard) {
        const clipboardContent = await clipboardy.read();

        if (clipboardContent.includes('<svg')) {
            const content = await optimiseSVG(clipboardContent);
            return { kind: 'svg', content };
        }

        return loadFromPath(clipboardContent);
    }

    return loadFromPath(file!);
};
