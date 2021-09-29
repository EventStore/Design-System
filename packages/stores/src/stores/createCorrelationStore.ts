import { $data } from '../symbols';
import { createListStore, ListStore } from './createListStore';

export type Group = Record<string, unknown>;
export type IdList = string[];

export interface CorrelatableItem {
    id: string;
}

/** A store for holding a list of objects, correlated by a key. */
export interface CorrelationStore<T extends CorrelatableItem> {
    /** The internal state of the store. */
    readonly state: Record<string, string[]>;
    /** Delete an entry from the list. */
    delete: (id: string) => boolean;
    /** extract the first item with id or correlationId. */
    firstItem: (id: string) => T | undefined;
    /** Get a list of ids that were correlated by the passed id. */
    get: (id: string) => string[] | undefined;
    /** Get the first id that was correlated by the passed id. */
    getHead: (id: string) => string | undefined;
    /** Get all but the first ids that were correlated by the passed id. */
    getTail: (id: string, truncate?: number) => string[] | undefined;
    /** Get the number of items correlated by the passed id.. */
    getSize: (id: string) => number | undefined;
    /** Check if an item is available in the list. */
    has: (id: string) => boolean;
    /** Insert an item into the list. */
    insert: (item: T) => void;
    /** Invalidate all memos. */
    invalidateMemos: () => void;
    /** Access to the backing [ListStore](/stores/types/ListStore) */
    items: ListStore<T>;
    /** Returns an array of all the keys in the store. */
    keys: () => Array<string>;
    /** Memoize a function against the store. */
    memo: <R>(fn: (store: CorrelationStore<T>) => R) => () => R;
    /** Memoize a function that filters and optionally sorts keys from the store. */
    memoFilteredKeys: (
        fn: (item: T) => boolean,
        sort?: (a: T, b: T) => number,
    ) => () => string[];
    /** Memoize a reducer against the store. */
    memoReduce: <R>(
        fn: (acc: R, item: T, id: string, store: CorrelationStore<T>) => R,
        initial: R,
    ) => () => R;
    /** Memoize a function that checks if any items return true for the passed function. */
    memoSome: (
        fn: (item: T, id: string, store: CorrelationStore<T>) => boolean,
    ) => () => boolean;
    /** Current number of items in the store. */
    size: number;
    /** Return all correlated its in the store. */
    values: () => Array<string[]>;
    /** Allows the correlated its to be iterated over. */
    [Symbol.iterator]: () => Array<[string, string[]]>;
}

type SortingFunction<T> = (a: T, b: T) => number;

/** Create a new correlation store with a sorting function. */
export const createCorrelationStore = <T extends CorrelatableItem>(
    sortingFunction: SortingFunction<T>,
    correlateBy: keyof T = 'correlationId' as keyof T,
): CorrelationStore<T> => {
    const ids = createListStore<string[]>();
    const items = createListStore<T>();
    let memos = new WeakMap();

    const invalidateMemos = () => {
        memos = new WeakMap();
    };

    const store: CorrelationStore<T> = {
        state: ids.state,
        delete: (id) => {
            invalidateMemos();
            ids.get(id)?.forEach(items.delete);
            return ids.delete(id);
        },
        firstItem: (id) => {
            const itemId = ids.get(id)?.[0];
            return itemId ? items.get(itemId) : undefined;
        },
        get: ids.get,
        getHead: (id) => ids.get(id)?.[0],
        getTail: (id, truncate) =>
            ids.get(id)?.slice(1, truncate ? truncate + 1 : undefined),
        getSize: (id) => ids.get(id)?.length,
        has: ids.has,
        insert: (item) => {
            invalidateMemos();
            const correlationId =
                ((item[correlateBy] as unknown) as string) ?? item.id;
            const itemIds = ids.get(correlationId) ?? [];
            items.set(item.id, item);

            const itemData = items[$data];

            ids.set(
                correlationId,
                Array.from(new Set([...itemIds, item.id])).sort((a, b) =>
                    sortingFunction(itemData.get(a)!, itemData.get(b)!),
                ),
            );
        },
        invalidateMemos,
        items,
        keys: ids.keys,
        memo: (fn) => () => {
            if (memos.has(fn)) return memos.get(fn);
            const result = fn(store);
            memos.set(fn, result);
            return result;
        },
        memoFilteredKeys: (fn, sort) => () => {
            if (memos.has(fn)) return memos.get(fn);
            let result = ids
                .entries()
                .reduce<string[]>((acc, [id, [itemId]]) => {
                    if (items.has(itemId) && fn(items.get(itemId)!)) {
                        acc.push(id);
                    }
                    return acc;
                }, []);

            if (sort) {
                const itemData = items[$data];
                result = result.sort((a, b) =>
                    sort(
                        itemData.get(ids.get(a)![0])!,
                        itemData.get(ids.get(b)![0])!,
                    ),
                );
            }

            memos.set(fn, result);
            return result;
        },
        memoReduce: (fn, initial) => () => {
            if (memos.has(fn)) return memos.get(fn);
            const result = ids
                .entries()
                .reduce(
                    (acc, [id, [itemId]]) =>
                        fn(acc, items.get(itemId)!, id, store),
                    initial,
                );
            memos.set(fn, result);
            return result;
        },
        memoSome: (fn) => () => {
            if (memos.has(fn)) return memos.get(fn);
            const result = ids
                .entries()
                .some(([id, [itemId]]) => fn(items.get(itemId)!, id, store));
            memos.set(fn, result);
            return result;
        },
        get size() {
            return ids.size;
        },
        values: ids.values,
        [Symbol.iterator]: ids[Symbol.iterator],
    };

    return store;
};
