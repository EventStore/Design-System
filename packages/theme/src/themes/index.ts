import { theme as dark } from './dark';
import { theme as light } from './light';
import { theme as high_contrast_light } from './high_contrast_light';
import { theme as high_contrast_dark } from './high_contrast_dark';

import type { ChildThemeDefinition, ThemeDefinition } from '../types';
import { THEME } from '../utils/constants';

export type ThemeKey = keyof typeof themes;

export const themes = {
    light,
    dark,
    high_contrast_light,
    high_contrast_dark,
};

export const childThemes: Record<ThemeKey, ChildThemeDefinition[]> = {
    light: [],
    dark: [],
    high_contrast_light: [],
    high_contrast_dark: [],
};

/** Attach a child theme to each theme type. */
export const addChildTheme = <T extends object>(
    /** Prefix each variable. */
    prefix: string,
    /** A record of each theme type with it's corresponding theme. */
    children: Record<ThemeKey, T>,
) => {
    for (const [key, scheme] of Object.entries(children)) {
        childThemes[key as ThemeKey]?.push({ prefix, scheme });
    }

    window[THEME]?.updateTheme();
};

export const loadTheme = (
    name: string,
): [ThemeDefinition, ChildThemeDefinition[]] => {
    const trueName: ThemeKey = name in themes ? (name as ThemeKey) : 'light';
    return [themes[trueName], childThemes[trueName]];
};
