import { applyTheme } from './utils/applyTheme';
import { logger } from './utils/logger';
import { THEME, LOCAL_STORAGE_KEY } from './utils/constants';
import type {
    ChildThemeDefinition,
    ThemeDefinition,
    ThemeListener,
} from './types';
import { loadTheme, BaseThemeKey } from './themes';

declare global {
    interface Window {
        [THEME]?: ThemeCore;
    }
}

class ThemeCore {
    public activeTheme!: ThemeDefinition;
    public activeChildThemes!: ChildThemeDefinition[];

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

    public select = (theme: string) => {
        if (theme === 'auto') {
            window.localStorage?.removeItem(LOCAL_STORAGE_KEY);
        } else {
            window.localStorage?.setItem(LOCAL_STORAGE_KEY, theme);
        }

        this.updateTheme();
    };

    public updateTheme = () => {
        const previousScheme = this.activeTheme?.name;
        const scheme = this.chooseScheme();
        const [activeTheme, childThemes] = loadTheme(scheme);
        this.activeTheme = activeTheme;
        this.activeChildThemes = childThemes;

        applyTheme(this.activeTheme, this.activeChildThemes);
        this.informListeners();

        if (previousScheme !== scheme) {
            logger.log(`Updated theme to "${scheme}"`);
        }
    };

    public autoThemeName = (): BaseThemeKey => {
        const dark = this.dark.matches;
        const highContrast = this.highContrast.matches;

        if (dark && highContrast) return 'high_contrast_dark';
        if (!dark && highContrast) return 'high_contrast_light';
        if (dark && !highContrast) return 'dark';
        return 'light';
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
}

/**
 * The global theme object, for getting info about and controlling the currently active theme.
 * @usage ./theme.usage.md
 */
export const themeCore: ThemeCore = window[THEME] ?? new ThemeCore();
