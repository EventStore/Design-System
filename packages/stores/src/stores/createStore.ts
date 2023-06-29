import type { OnHandler, OnChangeHandler, Handlers, Plugin } from '../types';
import { stencilPlugin } from '../plugins/stencil';
import { $data } from '../symbols';

/** A basic key value store. */
export interface Store<T> {
    /** Proxied object that will detect dependencies and call the subscriptions and computed properties. */
    readonly state: T;
    /** Check if store has key */
    has<K extends keyof T>(key: K): boolean;
    /** Get value for key in store. */
    get<K extends keyof T>(key: K): T[K];
    /** set value for key in store */
    set<K extends keyof T>(key: K, value: T[K]): void;
    /** remove value for key in store */
    keys(): IterableIterator<keyof T>;
    /** remove value for key in store */
    delete<K extends keyof T>(key: K): boolean;
    /** subscribe to events within the store */
    on: OnHandler<T>;
    /** Listen for value changes on a specified key. */
    onChange: OnChangeHandler<T>;
    /** Resets the state to its original state and signals a dispose event to all the plugins. */
    dispose(): void;
    /** Resets the state to its original state. */
    reset(): void;
    /** Registers a subscription that will be called whenever the user gets, sets, or resets a value. */
    use(...plugins: Plugin<T>[]): () => void;
    /** the number of key / value pairs in the store */
    readonly size: number;

    /**
     * internal access to data
     */
    readonly [$data]: Readonly<Map<keyof T, T>>;
}

/** Create a new basic store with the given initial state. */
export const createStore = <T extends { [key: string]: any }>(
    defaultState: T,
    shouldUpdate: (newV: any, oldValue: any, prop: keyof T) => boolean = (
        a,
        b,
    ) => a !== b,
): Store<T> => {
    let backingMap = new Map<any, any>(Object.entries(defaultState ?? {}));

    const handlers: Handlers<T> = {
        dispose: new Set(),
        keys: new Set(),
        get: new Set(),
        set: new Set(),
        reset: new Set(),
        delete: new Set(),
        insert: new Set(),
    };

    const reset = (): void => {
        backingMap = new Map<string, any>(Object.entries(defaultState ?? {}));
        handlers.reset.forEach((cb) => cb());
    };

    const dispose = (): void => {
        // Call first dispose as resetting the state would
        // cause less updates ;)
        handlers.dispose.forEach((cb) => cb());
        reset();
    };

    const on: OnHandler<T> = (eventName: keyof Handlers<T>, callback: any) => {
        handlers[eventName].add(callback);
        return () => {
            handlers[eventName].delete(callback);
        };
    };

    const onChange: OnChangeHandler<T> = (propName, cb) => {
        const unSet = on('set', (key, newValue) => {
            if (key === propName) {
                cb(newValue);
            }
        });
        const unReset = on('reset', () => cb(backingMap.get(propName)));
        const unDelete = on('delete', (key) => {
            if (propName === key) {
                cb(backingMap.get(propName));
            }
        });
        return () => {
            unSet();
            unReset();
            unDelete();
        };
    };

    const use = (...subscriptions: Plugin<T>[]): (() => void) => {
        const unsubscribes = subscriptions.reduce<Array<() => void>>(
            (acc, plugin) => {
                const subscription = plugin(store);

                if (subscription.delete) {
                    acc.push(on('delete', subscription.delete));
                }
                if (subscription.dispose) {
                    acc.push(on('dispose', subscription.dispose));
                }
                if (subscription.get) {
                    acc.push(on('get', subscription.get));
                }
                if (subscription.insert) {
                    acc.push(on('insert', subscription.insert));
                }
                if (subscription.keys) {
                    acc.push(on('keys', subscription.keys));
                }
                if (subscription.reset) {
                    acc.push(on('reset', subscription.reset));
                }
                if (subscription.set) {
                    acc.push(on('set', subscription.set));
                }

                return acc;
            },
            [],
        );

        return () => {
            unsubscribes.forEach((fn) => fn());
        };
    };

    const state = new Proxy<T>(defaultState, {
        get(_, propName: any) {
            handlers.get.forEach((cb) => cb(propName));
            return backingMap.get(propName);
        },
        ownKeys(_) {
            handlers.keys.forEach((cb) => cb());
            return Array.from(backingMap.keys());
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: true,
                configurable: true,
            };
        },
        has(_, propName: any) {
            return backingMap.has(propName);
        },
        set(_, propName: any, value) {
            const oldValue = backingMap.get(propName);
            const isInsert = !backingMap.has(propName);

            if (shouldUpdate(value, oldValue, propName)) {
                backingMap.set(propName, value);

                if (isInsert) {
                    handlers.insert.forEach((cb) => cb(propName, value));
                }

                handlers.set.forEach((cb) => cb(propName, value, oldValue));
            }
            return true;
        },
        deleteProperty(_, propName: any) {
            const success = backingMap.delete(propName);

            if (success) {
                handlers.delete.forEach((cb) => cb(propName));
            }

            return success;
        },
    });

    const store: Store<T> = {
        state,
        has: (key) => backingMap.has(key),
        get: (key) => state[key],
        set: (key, value) => (state[key] = value),
        keys: () => backingMap.keys(),
        delete: (key) => {
            const existed = backingMap.has(key);
            delete state[key];
            return existed;
        },
        on,
        onChange,
        dispose,
        reset,
        use,
        get size() {
            return backingMap.size;
        },
        [$data]: backingMap,
    };

    store.use(stencilPlugin());

    return store;
};
