import { join, dirname } from 'path';

const editorRoot = dirname(
    require.resolve('@eventstore-ui/monaco-editor/package.json'),
);

/**
 * Path to the location of the webworkers
 * Include the workers in your stencil project by adding them to "copy" in your stencil config.
 */
export const workerPath = join(editorRoot, 'workers');

/**
 * Path to the location of the assets
 * Include the assets in your stencil project by adding them to "copy" in your stencil config.
 */
export const assetsPath = join(editorRoot, 'assets');
