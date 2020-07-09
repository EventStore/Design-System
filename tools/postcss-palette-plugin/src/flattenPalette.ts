import { Palette } from './types';

export type FlatPalette = Map<string, string>;
type FlattenPalette = (palette: Palette, prefix: string | null) => FlatPalette;

const kebab = (str: string) =>
    str.replace(/([A-Z])/g, (_, l) => '-' + l.toLowerCase());

export const cssify = (prefix: string | null) => (
    name: string,
    parent?: string,
) => {
    return `-${prefix ? `-${prefix}` : ''}${parent ? `-${kebab(parent)}` : ''}${
        !parent || name !== 'main' ? `-${kebab(name)}` : ''
    }`;
};

export const flattenPalette: FlattenPalette = (palette, prefix = 'color') => {
    const toCSSVar = cssify(prefix);
    const flattener = (
        group: Record<string, string | Record<string, string>>,
        parent?: string,
    ): FlatPalette =>
        Object.entries(group).reduce<FlatPalette>((acc, [key, value]) => {
            if (typeof value === 'string') {
                acc.set(toCSSVar(key, parent), value);
                return acc;
            } else {
                return acc.size
                    ? new Map([
                          ...Array.from(acc),
                          ...Array.from(flattener(value, key)),
                      ])
                    : flattener(value, key);
            }
        }, new Map());

    return flattener(palette as any);
};
