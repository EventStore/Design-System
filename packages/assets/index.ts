import { join, dirname } from 'path';

const root = dirname(require.resolve('@eventstore-ui/assets/package.json'));

/**
 * Path to the location of all assets
 * Include in your stencil project by adding the path to "copy" in your stencil config.
 */
export const assetsPath = join(root, 'assets');

/**
 * Path to the location of the favicons
 * Include in your stencil project by adding the path to "copy" in your stencil config.
 */
export const faviconsPath = join(assetsPath, 'favicons');

/**
 * Path to the location of all fonts
 * Include in your stencil project by adding the path to "copy" in your stencil config.
 */
export const fontsPath = join(assetsPath, 'fonts');

/**
 * Path to the location of "Spline Sans Mono" font
 * Include in your stencil project by adding the path to "copy" in your stencil config.
 */
export const splineSansMonoPath = join(fontsPath, 'assets');

/**
 * Path to the location of the "Work Sans" font
 * Include in your stencil project by adding the path to "copy" in your stencil config.
 */
export const workSansPath = join(fontsPath, 'assets');
