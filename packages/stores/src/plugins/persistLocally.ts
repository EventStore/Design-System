import type { Logger } from '@stencil/core/internal';
import type { Plugin } from '../types';
import type { Store } from '..';
export type PersistLocallyOptions<T> = {
    /** Store keys to be persisted locally. */
    keys?: Array<keyof T>;
    /** The storage area. */
    storage?: Storage;
    /** Serializer method to handle data conversion from browser storage to store. */
    serialize?: (d: Partial<T>) => string;
    /** Deserializer method to handle data conversion from store to browser storage. */
    deserialize?: (s: string) => Partial<T>;
    /** The logger. */
    logger?: Logger;
};

/** Persist store content to browser storage. */
export const persistLocally = <T>(
    storageKey: string,
    {
        serialize = JSON.stringify,
        deserialize = JSON.parse,
        storage = localStorage,
        ...options
    }: PersistLocallyOptions<T> = {},
): Plugin<T> => (store: Store<T>) => {
    const filterKeys = (data: Partial<T>): Partial<T> => {
        if (!options.keys) return data;
        return options.keys.reduce<Partial<T>>((acc, key) => {
            acc[key] = data[key];
            return acc;
        }, {});
    };
    const readFromStorage = () => {
        try {
            const stored = storage.getItem(storageKey);
            if (!stored) return;
            const data = filterKeys(deserialize(stored));
            const keys =
                options.keys ??
                new Set<keyof T>([
                    ...(Object.keys(data) as Array<keyof T>),
                    ...store.keys(),
                ]);

            for (const key of keys) {
                if (key in data) {
                    store.set(key, data[key]!);
                } else {
                    store.delete(key);
                }
            }
        } catch (error) {
            options.logger?.error(error);
        }
    };
    let debounce: ReturnType<typeof setTimeout>;
    const persistToStorage = () => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            try {
                const data = filterKeys(store.state);
                storage.setItem(storageKey, serialize(data));
            } catch (error) {
                options.logger?.error(error);
            }
        });
    };
    if (!storage.getItem(storageKey)) {
        persistToStorage();
    } else {
        readFromStorage();
    }
    globalThis.addEventListener(
        'storage',
        (event) => {
            if (event.storageArea === storage && event.key === storageKey) {
                readFromStorage();
            }
        },
        false,
    );
    return {
        reset: () => {
            persistToStorage();
        },
        set: (key) => {
            if (options.keys && !options.keys.includes(key)) return;
            persistToStorage();
        },
        delete: (key) => {
            if (options.keys && !options.keys.includes(key)) return;
            persistToStorage();
        },
    };
};
