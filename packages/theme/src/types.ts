import type { BaseThemeKey } from './themes';

export type Hex = string;
export type Colors = Record<string, Hex>;

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
    background: Hex;
    foreground: Hex;

    title: Hex;
    title_contrast: Hex;

    highlight: Hex;
    highlight_contrast: Hex;

    link: Hex;
    link_contrast: Hex;

    focus: Hex;
    focus_contrast: Hex;

    // levels
    error: Hex;
    error_contrast: Hex;
    error_alt: Hex;
    error_alt_contrast: Hex;

    warning: Hex;
    warning_contrast: Hex;
    warning_alt: Hex;
    warning_alt_contrast: Hex;

    success: Hex;
    success_contrast: Hex;
    success_alt: Hex;
    success_alt_contrast: Hex;

    info: Hex;
    info_contrast: Hex;
    info_alt: Hex;
    info_alt_contrast: Hex;

    // shades
    shade_10: Hex;
    shade_20: Hex;
    shade_30: Hex;
    shade_40: Hex;
    shade_50: Hex;
    shade_60: Hex;

    // special
    overlay: Hex;
    overlay_alpha: number;

    disabled: Hex;
    disabled_border: Hex;
    disabled_contrast: Hex;
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
