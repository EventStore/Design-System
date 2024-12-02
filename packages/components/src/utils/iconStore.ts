import type { FunctionalComponent, h as JSXFactory } from '@stencil/core';
import { createLogger } from '@kurrent-ui/utils';
import type { JSXBase } from '@stencil/core/internal';

const ICON_STORE = Symbol.for('c2-icon-store');
const ROOT = ':root';
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
    private icons: Map<string | symbol, Icons> = new Map();

    constructor() {
        if (window[ICON_STORE] == null) {
            window[ICON_STORE] = this;
        }
    }

    public addIcons(namespace: string | symbol, icons: Icons): void;
    public addIcons(icons: Icons): void;
    public addIcons(a: string | symbol | Icons, b?: Icons) {
        const namespaced = typeof a === 'string' || typeof a === 'symbol';
        const namespace = namespaced ? (a as string) : ROOT;
        const icons = namespaced ? b! : (a as Icons);

        if (!this.icons.has(namespace)) {
            this.icons.set(namespace, {});
        }

        for (const key of Object.keys(icons)) {
            if (this.has(namespace, key)) {
                logger.error(
                    `Duplicate icon ${key} added to iconStore${
                        namespaced ? `in namespace ${String(namespace)}.` : ''
                    }.`,
                );
                continue;
            }

            Object.defineProperty(
                this.icons.get(namespace)!,
                key,
                Object.getOwnPropertyDescriptor(icons, key)!,
            );
        }
    }

    public has = (name: string, namespace: string | symbol = ROOT): boolean => {
        return name in (this.icons.get(namespace) ?? {});
    };

    public get = (
        name: string,
        namespace: string | symbol = ROOT,
    ): Icon | undefined => {
        return this.icons.get(namespace)?.[name];
    };
}

/**
 * Register icons for `c2-icon` to reference by name.
 * It is recommended to use [`@kurrent-ui/icon-manager`](/icon-manager) to manage your icons.
 */
export const iconStore = window[ICON_STORE] ?? new IconStore();
