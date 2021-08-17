import type { FunctionalComponent } from '@stencil/core';

type Icons = Record<string, Promise<FunctionalComponent<any>>>;

class IconStore {
    private icons: Icons = {};

    public addIcons = (icons: Icons) => {
        for (const key of Object.keys(icons)) {
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
export const iconStore = new IconStore();
