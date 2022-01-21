import { forceUpdate, getElement, getRenderingRef } from '@stencil/core';
import { debounce } from '@eventstore/utils';

import { applyTheme } from './utils/applyTheme';
import { logger } from './utils/logger';
import { THEME, LOCAL_STORAGE_KEY } from './utils/constants';
import type {
    BaseScheme,
    ChildThemeDefinition,
    Contrast,
    Shade,
    Theme,
    ThemeDefinition,
    ThemeListener,
} from './types';
import { loadTheme, ThemeKey } from './themes';

declare global {
    interface Window {
        [THEME]?: Theme;
    }
}

/** Theme info and control. */
export class ThemeControl implements Theme {
    private activeTheme!: ThemeDefinition;
    private activeChildThemes!: ChildThemeDefinition[];

    private interestedElements = new Set<Element>();
    private listeners = new Set<ThemeListener>();
    private dark: MediaQueryList;
    private highContrast: MediaQueryList;

    constructor() {
        this.dark = window.matchMedia('(prefers-color-scheme: dark)');
        this.dark?.addEventListener?.('change', this.updateTheme);

        this.highContrast = window.matchMedia('(prefers-contrast: more)');
        this.highContrast?.addEventListener?.('change', this.updateTheme);

        if (window[THEME] == null) {
            window[THEME] = this;
        }

        // we're in an iframe, so listen to the parent theme changes
        if (window.parent?.[THEME] && this !== window.parent[THEME]) {
            const unsubscribe = window.parent[THEME]!.onThemeChange(
                ({ name }) => {
                    this.select(name);
                },
            );

            window.addEventListener('unload', unsubscribe);
        }

        this.updateTheme();
    }

    public get selected(): string {
        return window.localStorage?.getItem(LOCAL_STORAGE_KEY) ?? 'auto';
    }
    public get name(): string {
        this.registerInterest();
        return this.activeTheme.name;
    }
    public get colors(): BaseScheme {
        this.registerInterest();
        return this.activeTheme.scheme;
    }
    public get contrast(): Contrast {
        this.registerInterest();
        return this.activeTheme.meta.contrast;
    }
    public get shade(): Shade {
        this.registerInterest();
        return this.activeTheme.meta.shade;
    }

    public isHighContrast = () => this.contrast === 'high';
    public isLowContrast = () => this.contrast === 'low';
    public isLight = () => this.shade === 'light';
    public isDark = () => this.shade === 'dark';

    public select = (theme: string) => {
        if (theme === 'auto') {
            window.localStorage?.removeItem(LOCAL_STORAGE_KEY);
        } else {
            window.localStorage?.setItem(LOCAL_STORAGE_KEY, theme);
        }

        this.updateTheme();
    };

    public updateTheme = async () => {
        const scheme = this.chooseScheme();
        const [activeTheme, childThemes] = loadTheme(scheme);
        this.activeTheme = activeTheme;
        this.activeChildThemes = childThemes;

        applyTheme(this.activeTheme, this.activeChildThemes);
        this.informListeners();
        this.refreshElements();

        logger.log(`Updated theme to "${scheme}"`);
    };

    public autoThemeName = (): ThemeKey => {
        const dark = this.dark.matches;
        const highContrast = this.highContrast.matches;

        if (dark && highContrast) return 'high_contrast_dark';
        if (!dark && highContrast) return 'high_contrast_light';
        if (dark && !highContrast) return 'dark';
        return 'light';
    };

    public registerInterest = () => {
        const el = getRenderingRef();
        if (el) this.interestedElements.add(el);
        this.scheduleCleanup();
    };

    public onThemeChange = (cb: ThemeListener, runNow: boolean = false) => {
        this.listeners.add(cb);

        if (runNow) {
            try {
                cb(this.activeTheme, this.activeChildThemes);
            } catch (error) {
                logger.error(error);
            }
        }

        return () => {
            this.listeners.delete(cb);
        };
    };

    private chooseScheme = () => {
        if (this.selected !== 'auto') return this.selected;
        return this.autoThemeName();
    };

    private informListeners = () => {
        for (const fn of this.listeners) {
            try {
                fn(this.activeTheme, this.activeChildThemes);
            } catch (error) {
                logger.error(error);
            }
        }
    };

    private scheduleCleanup = debounce(() => {
        for (const element of this.interestedElements) {
            if (getElement(element)?.isConnected) continue;
            this.interestedElements.delete(element);
        }
    }, 2_000);

    private refreshElements = () => {
        for (const el of Array.from(this.interestedElements)) {
            // force update returns false if it fails but is typed wrong
            const successfullyUpdated = (forceUpdate(el) as unknown) as boolean;

            if (!successfullyUpdated) {
                this.interestedElements.delete(el);
            }
        }

        this.scheduleCleanup();
    };
}

/**
 * The global theme object, for getting info about and controlling the currently active theme.
 * @usage ./theme.usage.md
 */
export const theme: Theme = window[THEME] ?? new ThemeControl();
