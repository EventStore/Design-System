import { $data } from '../symbols';
import { createStore } from './createStore';
import type { OnHandler, Plugin } from '../types';

/** A store for holding a list of objects. */
export interface ListStore<T> {
    /** Reset the store to initial state. */
    reset: () => void;
    /** Registers a subscription that will be called whenever the user gets, sets, or resets a value. */
    use(...plugins: Plugin<Record<string, T>>[]): () => void;
    /** The internal state of the store. */
    readonly state: Record<string, T>;
    /** Delete an entry from the list. */
    delete: (id: string) => boolean;
    /** Returns an array of own enumerable string-keyed property [key, value] pairs. (Similar to `Object.entries`) */
    entries: () => Array<[string, T]>;
    /** Extract a list of ids from the store, with optional filter map. */
    extract: <R = T>(
        ids: string[],
        filterMap?: (item: T, i: number) => R | null,
    ) => Array<R>;
    /** Get a single item from the list. */
    get: (id: string) => T | undefined;
    /** Get a single item from the list, or insert a default and return it */
    getOrInsert: (id: string, defaultValue: () => T) => T;
    /** Check if an item is available in the list. */
    has: (id: string) => boolean;
    /** Returns an array of all the keys in the store. */
    keys: () => Array<string>;
    /** Listen to a change on a single item in the store. */
    onChange(id: string, cb: (item: T) => void): () => void;
    /** Listen to a change on the entire store. */
    onChange(cb: (list: Record<string, T>) => void): () => void;
    /** Insert or overwrite value with key. */
    set: (id: string, item: T) => void;
    /** Current number of items in the store. */
    size: number;
    /** Update an item in the store. */
    update: (id: string, updater: (item: T) => T) => boolean;
    /** Update an item in the store, waiting for it to be inserted. Will return false if the item wasnt inserted before maxWait. */
    updateWhenAvailable: (
        id: string,
        updater: (item: T) => T,
        maxWait?: number,
    ) => Promise<boolean>;
    /** Update an item in the store, or set, if it isn't present. Returns false if the item was created, true if updated. */
    updateOrSet: (
        id: string,
        updater: (item: T) => T,
        creator: () => T,
    ) => boolean;
    /** Returns an array of all the values in the store. */
    values: () => Array<T>;
    /** Allows the store to be iterated over. */
    [Symbol.iterator]: () => Array<[string, T]>;
    /**
     * internal access to data
     */
    readonly [$data]: Readonly<Map<string, T>>;
    /** subscribe to events within the store */
    on: OnHandler<Record<string, T>>;
    /** Resets the state to its original state and signals a dispose event to all the plugins. */
    dispose(): void;
}

/** Create a new list store with the given initial state. */
export const createListStore = <T>(
    initialState: Record<string, T> = {},
): ListStore<T> => {
    const store = createStore<Record<any, any>>(initialState);
    const { state, onChange, reset, on } = store;

    const update = (id: string, updater: (tem: T) => T) => {
        if (id in state) {
            state[id] = updater(state[id]);
            return true;
        }
        return false;
    };

    return {
        reset,
        get state() {
            return state;
        },
        delete: (id) => {
            if (id in state) {
                delete state[id];
                return true;
            }
            return false;
        },
        entries: () => Object.entries(state),
        extract: (ids, mapping) =>
            ids.reduce<any>((acc, id, i) => {
                const item = state[id];
                if (item == null) return acc;
                const mapped = mapping ? mapping(item, i) : item;
                if (mapped == null) return acc;
                acc.push(mapped);
                return acc;
            }, []),
        get: (id) => state[id],
        getOrInsert: (id, defaultValue) => {
            if (!(id in state)) {
                state[id] = defaultValue();
            }
            return state[id];
        },
        has: (id) => id in state,
        keys: () => Object.keys(state),
        onChange: (...args: any[]) => {
            if (typeof args[0] === 'string') {
                const [id, cb] = args;
                return onChange(id, cb);
            }
            const [cb] = args;
            const unSet = on('set', () => cb(state));
            const unReset = on('reset', () => cb(state));
            const unDelete = on('delete', () => cb(state));
            return () => {
                unSet();
                unReset();
                unDelete();
            };
        },
        get size() {
            return Object.keys(state).length;
        },
        set: (id, item) => {
            state[id] = item;
        },
        update,
        updateWhenAvailable: async (id, updater, maxWait = 5000) => {
            if (!(id in state)) {
                await new Promise<void>((resolve) => {
                    const unsub = on('insert', (key) => {
                        if (key === id) {
                            unsub();
                            clearTimeout(timeout);
                            resolve();
                        }
                    });
                    const timeout = setTimeout(() => {
                        unsub();
                        resolve();
                    }, maxWait);
                });
            }
            return update(id, updater);
        },
        updateOrSet: (id, updater, creator) => {
            if (id in state) {
                state[id] = updater(state[id]);
                return true;
            }
            state[id] = creator();
            return false;
        },
        values: () => Object.values(state),
        use: store.use,
        on: store.on,
        dispose: store.dispose,
        [Symbol.iterator]: () => Object.entries(state),
        [$data]: store[$data],
    };
};
