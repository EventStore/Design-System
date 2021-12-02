import { writeFile } from 'fs/promises';
import { cwd } from 'process';
import { resolve, join, isAbsolute } from 'path';

import {
    addToIndex,
    isInIndex,
    removeAliasFromIndex,
} from '../utils/indexFile';
import { prettify } from '../utils/prettify';
import { loadIcon } from '../utils/loadIcon';
import {
    createDeclarationIfMissing,
    createDirIfMissing,
} from '../utils/scaffold';
import { componentMetadata } from '../utils/componentMetadata';

import { convertToComponent } from '../components/icon';
import { failure, info, success } from '../utils/finish';

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
