import type { FunctionalComponent, h as JSXFactory } from '@stencil/core';
import { createLogger } from '@eventstore/utils';
import type { JSXBase } from '@stencil/core/internal';

const ICON_STORE = Symbol.for('es-icon-store');
const logger = createLogger('iconStore', 'orange');

declare global {
    interface Window {
        [ICON_STORE]?: IconStore;
    }
}

export type SVGProps = JSXBase.SVGAttributes<SVGElement>;
type Icon = Promise<(h: typeof JSXFactory) => FunctionalComponent<SVGProps>>;
type Icons = Record<string, Icon>;

class IconStore {
    private icons: Icons = {};

    constructor() {
        if (window[ICON_STORE] == null) {
            window[ICON_STORE] = this;
        }
    }

    public addIcons = (icons: Icons) => {
        for (const key of Object.keys(icons)) {
            if (this.has(key)) {
                logger.error(`Duplicate icon ${key} added to iconStore`);
                continue;
            }

            Object.defineProperty(
                this.icons,
                key,
                Object.getOwnPropertyDescriptor(icons, key)!,
            );
        }
    };

    public has = (name: string) => {
        return name in this.icons;
    };

    public get = (name: string) => this.icons[name];
}

/**
 * Register icons for `es-icon` to reference by name.
 * It is recommended to use [`@eventstore/icon-manager`](/icon-manager) to manage your icons.
 */
export const iconStore = window[ICON_STORE] ?? new IconStore();
