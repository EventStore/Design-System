import { forceUpdate, getElement, getRenderingRef } from '@stencil/core';
import { debounce } from '@eventstore/utils';

import type { BaseScheme, Contrast, Shade, Theme } from './types';
import { themeCore } from './themeCore';

/** Theme info and control. */
export class ThemeControl implements Theme {
    private interestedElements = new Set<Element>();

    constructor() {
        themeCore.onThemeChange(() => {
            this.refreshElements();
        });
    }

    public select = themeCore.select;
    public updateTheme = themeCore.updateTheme;
    public autoThemeName = themeCore.autoThemeName;
    public onThemeChange = themeCore.onThemeChange;

    public get selected(): string {
        return themeCore.selected;
    }
    public get name(): string {
        this.registerInterest();
        return themeCore.activeTheme.name;
    }
    public get colors(): BaseScheme {
        this.registerInterest();
        return themeCore.activeTheme.scheme;
    }
    public get contrast(): Contrast {
        this.registerInterest();
        return themeCore.activeTheme.meta.contrast;
    }
    public get shade(): Shade {
        this.registerInterest();
        return themeCore.activeTheme.meta.shade;
    }

    public isHighContrast = () => this.contrast === 'high';
    public isLowContrast = () => this.contrast === 'low';
    public isLight = () => this.shade === 'light';
    public isDark = () => this.shade === 'dark';

    public registerInterest = () => {
        const el = getRenderingRef();
        if (el) this.interestedElements.add(el);
        this.scheduleCleanup();
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
export const theme: Theme = new ThemeControl();
