import { join, dirname } from 'path';

/**
 * Path to the location of the assets
 * Include the assets in your stencil project by adding them to "copy" in your stencil config.
 */
export const assetsPath = join(
    dirname(require.resolve('@eventstore/assets/package.json')),
    'assets',
);
