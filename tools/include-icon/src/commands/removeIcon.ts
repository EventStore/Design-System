/* eslint-disable no-console */

import * as fs from 'fs';
import * as process from 'process';
import { resolve, isAbsolute } from 'path';
import { promisify } from 'util';

import { removeFromIndex } from '../utils/indexFile';
import { componentMetadata } from '../utils/componentMetadata';

const removeFile = promisify(fs.unlink);

interface RemoveIconOptions {
    name: string;
    dir: string;
}

export const removeIcon = async ({ name, dir }: RemoveIconOptions) => {
    const directory = isAbsolute(dir) ? dir : resolve(process.cwd(), dir);
    const metadata = componentMetadata(name);

    const filePath = resolve(directory, metadata.path);

    await removeFromIndex(directory, metadata);
    await removeFile(filePath);

    console.log(`removed ${name} from ${filePath}`);
};
