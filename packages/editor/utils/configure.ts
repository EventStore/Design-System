import { join, dirname } from 'path';

/**
 * Path to the location of the webworkers
 * Include the workers in your stencil project by adding them to "copy" in your stencil config.
 */
export const workerPath = join(
    dirname(require.resolve('@eventstore-ui/editor/package.json')),
    'workers',
);
