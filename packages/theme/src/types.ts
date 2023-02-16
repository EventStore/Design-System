import type { BaseThemeKey } from './themes';

export type Color = string;
export type Colors = Record<string, Color>;

export type Shade = 'light' | 'dark';
export type Contrast = 'high' | 'low';

export interface ThemeDefinition {
    name: string;
    title: string;
    prefix: string;
    scheme: BaseScheme;
    meta: {
        shade: Shade;
        contrast: Contrast;
    };
}

export interface ChildThemeDefinition<Scheme extends object = object> {
    prefix: string;
    scheme: Scheme;
}

export interface BaseScheme {
    // basic
    background: Color;
    contrast: Color;

    // text
    text: Color;

    title_1: Color;
    title_2: Color;
    title_3: Color;

    // scheme
    primary: Color;
    primary_alt: Color;
    primary_contrast: Color;

    secondary: Color;
    secondary_alt: Color;
    secondary_contrast: Color;

    highlight: Color;
    highlight_alt: Color;
    highlight_contrast: Color;

    // levels
    error: Color;
    error_contrast: Color;
    error_alt: Color;
    error_alt_contrast: Color;

    warning: Color;
    warning_contrast: Color;
    warning_alt: Color;
    warning_alt_contrast: Color;

    success: Color;
    success_contrast: Color;
    success_alt: Color;
    success_alt_contrast: Color;

    info: Color;
    info_contrast: Color;
    info_alt: Color;
    info_alt_contrast: Color;

    // shades
    shade_10: Color;
    shade_20: Color;
    shade_30: Color;
    shade_40: Color;
    shade_50: Color;
    shade_60: Color;

    // special
    overlay: Color;
    overlay_alpha: number;

    focus: Color;
    disabled: Color;
    disabled_border: Color;
    disabled_contrast: Color;
}

/** A theme change callback */
export type ThemeListener = (
    /** The currently selected theme. */
    theme: ThemeDefinition,
    /** The currently selected child themes. */
    childThemes: ChildThemeDefinition[],
) => void;

/** Theme info and control. */
export interface Theme {
    /** User selected theme name, returns `auto` if no theme is selected. */
    readonly selected: string;
    /** Currently active theme name. */
    readonly name: string;
    /** The active base theme colors. */
    readonly colors: BaseScheme;
    /** The active theme contrast level. */
    readonly contrast: Contrast;
    /** The active theme shade level. */
    readonly shade: Shade;
    /** Returns true if the active theme is high contrast. */
    isHighContrast(): boolean;
    /** Returns true if the active theme is low contrast. */
    isLowContrast(): boolean;
    /** Returns true if the active theme is light. */
    isLight(): boolean;
    /** Returns true if the active theme is dark. */
    isDark(): boolean;
    /** Sets the theme to the passed theme name. Pass `'auto'` to choose based off of system settings. */
    select(theme: string): void;
    /** Returns a theme name based off of system settings. */
    autoThemeName(): BaseThemeKey;
    /** Call during render to re-render a component on theme change.  */
    registerInterest(): void;
    /** Register a callback to call when the theme changes. */
    onThemeChange(
        /** The callback to call when the theme changes.  */
        cb: ThemeListener,
        /** If the callback should be called immediately, with the current theme selection. */
        runNow?: boolean,
    ): () => void;
    /** @internal (re) initialize the theme. */
    updateTheme(): void;
}
