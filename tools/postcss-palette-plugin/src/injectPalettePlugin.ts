import * as postcss from 'postcss';
import { flattenPalette } from './flattenPalette';
import { Palette } from './types';
import { palette } from './defaultPalette';

interface Options {
    palette?: Palette;
    prefix?: string;
}

// eslint-disable-next-line no-restricted-syntax
export default postcss.plugin<Options>('postcss-inject-palette', (options) => {
    if (!options?.palette) {
        // eslint-disable-next-line no-console
        console.warn('Using default palette');
    }

    const vars = flattenPalette(
        options?.palette ?? palette,
        options?.prefix ?? 'color',
    );

    return (css) => {
        css.walkAtRules((node) => {
            if (node.name === 'inject-palette') {
                node.replaceWith(
                    Array.from(vars.entries(), ([prop, value]) =>
                        postcss.decl({ prop, value }),
                    ),
                );
            }
        });
    };
});
