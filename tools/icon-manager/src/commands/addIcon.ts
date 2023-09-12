import { writeFile } from 'node:fs/promises';
import { cwd } from 'node:process';
import { resolve, join, isAbsolute } from 'node:path';

import {
    addToIndex,
    isInIndex,
    readAliasesFromIndex,
    removeAliasFromIndex,
} from '../utils/indexFile.js';
import { prettify } from '../utils/prettify.js';
import { loadIcon } from '../utils/loadIcon.js';
import {
    createDeclarationIfMissing,
    createDirIfMissing,
} from '../utils/scaffold.js';
import { componentMetadata } from '../utils/componentMetadata.js';

import { convertToComponent } from '../components/icon.js';
import { failure, info, success } from '../utils/finish.js';

interface AddIconOptions {
    name: string;
    dir: string;
    clipboard?: boolean;
    file?: string;
    force?: boolean;
}

export const addIcon = async ({
    name,
    clipboard,
    file,
    dir,
    force,
}: AddIconOptions) => {
    try {
        const directory = isAbsolute(dir) ? dir : resolve(cwd(), dir);
        const metadata = componentMetadata(name);
        const filePath = join(directory, metadata.path);

        const [exists, parent] = await isInIndex(directory, name);

        if (parent) {
            if (!force) {
                return failure(
                    `Failed to add ${name}, as ${name} exists as an alias for ${parent}`,
                    'Remove alias first, or use --force to overwrite',
                );
            }

            await removeAliasFromIndex(directory, parent, name);

            info(`Removed alias ${name} from icon ${parent}`);
        } else if (exists) {
            if (!force) {
                return failure(
                    `Failed to add ${name}, icon already exists.`,
                    'Remove icon first, or use --force to overwrite',
                );
            }

            info(`Overwriting icon ${name} in ${filePath}`);

            metadata.aliases = await readAliasesFromIndex(directory, name);
        }

        const icon = await loadIcon({ clipboard, file });
        const component = convertToComponent(icon, metadata);
        const cleanedUp = await prettify(component, filePath);

        await createDirIfMissing(filePath);
        await createDeclarationIfMissing(directory);
        await addToIndex(directory, metadata);
        await writeFile(filePath, cleanedUp);

        return success(`Created ${name} in ${filePath}`);
    } catch (error) {
        return failure(error);
    }
};
