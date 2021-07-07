import { createStore } from './createStore';

export interface ListStore<T extends object> {
    reset: () => void;
    readonly state: Record<string, T>;
    delete: (id: string) => boolean;
    entries: () => Array<[string, T]>;
    extract: <R = T>(
        ids: string[],
        filterMap?: (item: T, i: number) => R | null,
    ) => Array<R>;
    get: (id: string) => T | undefined;
    has: (id: string) => boolean;
    keys: () => Array<string>;
    onChange(id: string, cb: (item: T) => void): () => void;
    onChange(cb: (list: Record<string, T>) => void): () => void;
    set: (id: string, item: T) => void;
    size: number;
    update: (id: string, updater: (item: T) => T) => boolean;
    updateWhenAvailable: (
        id: string,
        updater: (item: T) => T,
        maxWait?: number,
    ) => Promise<boolean>;
    updateOrSet: (
        id: string,
        updater: (item: T) => T,
        creator: () => T,
    ) => boolean;
    values: () => Array<T>;
    [Symbol.iterator]: () => Array<[string, T]>;
}

export const createListStore = <T extends object>(
    initialState: Record<string, T> = {},
): ListStore<T> => {
    const { state, onChange, reset, on } = createStore(initialState);

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
            return () => {
                unSet();
                unReset();
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
                state[id] = updater({ ...state[id] });
                return true;
            }
            state[id] = creator();
            return false;
        },
        values: () => Object.values(state),
        [Symbol.iterator]: () => Object.entries(state),
    };
};
