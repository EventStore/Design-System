import { theme as dark } from './dark';
import { theme as light } from './light';
import { theme as high_contrast_light } from './high_contrast_light';
import { theme as high_contrast_dark } from './high_contrast_dark';

import type { ChildThemeDefinition, ThemeDefinition } from '../types';
import { THEME } from '../utils/constants';
import { logger } from '../utils/logger';

export type BaseThemeKey =
    | 'light'
    | 'dark'
    | 'high_contrast_light'
    | 'high_contrast_dark';

export const themes: Record<string, ThemeDefinition> = {
    light,
    dark,
    high_contrast_light,
    high_contrast_dark,
};

export const childThemes: Record<string, ChildThemeDefinition[]> = {
    light: [],
    dark: [],
    high_contrast_light: [],
    high_contrast_dark: [],
};

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
