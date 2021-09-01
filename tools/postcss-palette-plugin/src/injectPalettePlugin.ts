import { PluginCreator, decl } from 'postcss';
import { flattenPalette } from './flattenPalette';
import { Palette } from './types';
import { palette } from './defaultPalette';

interface Options {
    palette?: Palette;
    prefix?: string;
}

const injectPalettePlugin: PluginCreator<Options> = (options = {}) => {
    if (!options?.palette) {
        // eslint-disable-next-line no-console
        console.warn('Using default palette');
    }

    const declarations = Array.from(
        flattenPalette(options?.palette ?? palette, options?.prefix ?? 'color'),
        ([prop, value]) => decl({ prop, value }),
    );

    return {
        postcssPlugin: 'inject-palette',
        AtRule(node) {
            if (node.name !== 'inject-palette') return;
            node.replaceWith(declarations);
        },
    };
};
injectPalettePlugin.postcss = true;

// eslint-disable-next-line no-restricted-syntax
export default injectPalettePlugin;
