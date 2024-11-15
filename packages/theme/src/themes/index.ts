import { dark } from './dark';
import { light } from './light';

import type { ChildThemeDefinition, ThemeDefinition } from '../types';
import { THEME } from '../utils/constants';
import { logger } from '../utils/logger';

export type BaseThemeKey =
    | 'light'
    | 'dark'
    | 'high_contrast_light'
    | 'high_contrast_dark';

export const themes: Record<string, ThemeDefinition> = {
    light: {
        title: 'Light',
        name: 'light',
        prefix: 'color',
        scheme: light,
        meta: {
            shade: 'light',
            contrast: 'low',
        },
    },
    dark: {
        title: 'Light',
        name: 'light',
        prefix: 'color',
        scheme: dark,
        meta: {
            shade: 'dark',
            contrast: 'low',
        },
    },
    high_contrast_light: {
        title: 'Light high contrast',
        name: 'high_contrast_light',
        prefix: 'color',
        scheme: light,
        meta: {
            shade: 'light',
            contrast: 'high',
        },
    },
    high_contrast_dark: {
        title: 'Dark high contrast',
        name: 'high_contrast_dark',
        prefix: 'color',
        scheme: dark,
        meta: {
            shade: 'dark',
            contrast: 'high',
        },
    },
};

export const childThemes: Record<string, ChildThemeDefinition[]> = {};

/** Add a custom theme. */
export const addCustomTheme = (
    theme: ThemeDefinition,
    children: ChildThemeDefinition[],
    extend: BaseThemeKey,
) => {
    themes[theme.name] = theme;
    childThemes[theme.name] = [
        ...children,
        ...Array.from(childThemes[extend]).filter(
            (c) => !children.some(({ prefix }) => prefix === c.prefix),
        ),
    ];

    logger.log(`Added theme "${theme.name}"`);

    window[THEME]?.updateTheme();
};

/** Attach a child theme to each theme type. */
export const addChildTheme = <T extends object>(
    /** Prefix each variable. */
    prefix: string,
    /** A record of each theme type with it's corresponding theme. */
    children: Record<BaseThemeKey, T>,
) => {
    for (const [key, scheme] of Object.entries(children)) {
        childThemes[key as BaseThemeKey]?.push({ prefix, scheme });
    }

    logger.log(`Added child theme "${prefix}"`);

    window[THEME]?.updateTheme();
};

export const loadTheme = (
    name: string,
): [ThemeDefinition, ChildThemeDefinition[]] => {
    const trueName: BaseThemeKey =
        name in themes ? (name as BaseThemeKey) : 'light';
    return [themes[trueName], childThemes[trueName]];
};
