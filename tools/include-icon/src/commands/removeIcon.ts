/* eslint-disable no-console */

import * as fs from 'fs';
import * as process from 'process';
import { resolve, isAbsolute } from 'path';
import { promisify } from 'util';

import * as camelCase from 'camelcase';
import { removeFromIndex } from '../utils/indexFile';

const removeFile = promisify(fs.unlink);

interface RemoveIconOptions {
    name: string;
    dir: string;
}

export const removeIcon = async ({ name, dir }: RemoveIconOptions) => {
    const directory = isAbsolute(dir) ? dir : resolve(process.cwd(), dir);
    const componentName = camelCase(name, { pascalCase: true });
    const filePath = resolve(directory, `${componentName}.tsx`);

    await removeFromIndex(directory, componentName);
    await removeFile(filePath);

    console.log(`removed ${name} from ${filePath}`);
};
