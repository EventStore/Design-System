/* eslint-disable no-console */

import * as fs from 'fs';
import * as process from 'process';
import { resolve, join, isAbsolute } from 'path';
import { promisify } from 'util';

import { optimiseSVG } from '../utils/optimiseSVG';
import { addToIndex } from '../utils/indexFile';
import { prettify } from '../utils/prettify';
import { loadIcon } from '../utils/loadIcon';
import { createDirIfMissing } from '../utils/createDirIfMissing';
import { componentMetadata } from '../utils/componentMetadata';

import { convertToComponent } from '../components/icon';

const writeFile = promisify(fs.writeFile);

interface AddIconOptions {
    name: string;
    dir: string;
    clipboard?: boolean;
    file?: string;
}

export const addIcon = async ({
    name,
    clipboard,
    file,
    dir,
}: AddIconOptions) => {
    const directory = isAbsolute(dir) ? dir : resolve(process.cwd(), dir);
    await createDirIfMissing(directory);

    const metadata = componentMetadata(name);
    const icon = await loadIcon({ clipboard, file });
    const optimised = await optimiseSVG(icon);
    const component = convertToComponent(optimised, metadata);
    const filePath = join(directory, metadata.path);
    const cleanedUp = await prettify(component, filePath);

    await addToIndex(directory, metadata);
    await writeFile(filePath, cleanedUp);
    console.log(`created ${name} in ${filePath}`);
};
