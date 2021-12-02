import { cwd } from 'process';
import { mkdir, rename, rm, writeFile } from 'fs/promises';
import { resolve, isAbsolute, join } from 'path';

import {
    checkIfIndexNeedsUpdate,
    regenerateIndex,
    readIndex,
    addToIndex,
} from '../utils/indexFile';

import { failure, info, success } from '../utils/finish';
import { convertToComponent } from '../components/icon';
import { loadIcon } from '../utils/loadIcon';
import { prettify } from '../utils/prettify';
import {
    createDirIfMissing,
    createDeclarationIfMissing,
} from '../utils/scaffold';
import { version } from '../utils/version';

interface UpgradeOptions {
    dir: string;
}

export const upgrade = async ({ dir }: UpgradeOptions) => {
    try {
        const directory = isAbsolute(dir) ? dir : resolve(cwd(), dir);
        const needsUpdate = await checkIfIndexNeedsUpdate(directory);

        if (!needsUpdate) {
            return failure('No upgrade needed');
        }

        if (needsUpdate === 'number') {
            await regenerateIndex(directory);
            return success(`Updated version to ${version}`);
        }

        info('Major version update. Regenerating icons.');

        const index = await readIndex(directory, true);
        const old = `${directory}_old`;

        await rename(directory, old);
        await mkdir(directory, { recursive: true });

        try {
            for (const [name, metadata] of index) {
                info(`Updating ${name}`);
                const oldPath = join(old, metadata.path);
                const filePath = join(directory, metadata.path);

                const icon = await loadIcon({ file: oldPath });
                const component = convertToComponent(icon, metadata);
                const cleanedUp = await prettify(component, filePath);

                await createDirIfMissing(filePath);
                await createDeclarationIfMissing(directory, true);
                await addToIndex(directory, metadata);
                await writeFile(filePath, cleanedUp);
            }
        } catch (error) {
            failure(error);
            await rm(directory, { force: true, recursive: true });
            await rename(old, directory);
            return failure('Updating failed, previous icon library restored.');
        }

        info('Cleaning up.');

        await rm(old, { force: true, recursive: true });

        return success(`Updated version to ${version}`);
    } catch (error) {
        return failure(error);
    }
};
