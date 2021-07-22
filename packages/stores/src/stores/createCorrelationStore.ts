import { $data } from '../symbols';
import { createListStore, ListStore } from './createListStore';

export type Group = Record<string, unknown>;
export type IdList = string[];

export interface CorrelatableItem {
    id: string;
}

export interface CorrelationStore<T extends CorrelatableItem> {
    readonly state: Record<string, string[]>;
    delete: (id: string) => boolean;
    firstItem: (id: string) => T | undefined;
    get: (id: string) => string[] | undefined;
    getHead: (id: string) => string | undefined;
    getTail: (id: string) => string[] | undefined;
    has: (id: string) => boolean;
    insert: (item: T) => void;
    invalidateMemos: () => void;
    items: ListStore<T>;
    keys: () => Array<string>;
    memo: <R>(fn: (store: CorrelationStore<T>) => R) => () => R;
    memoFilteredKeys: (
        fn: (item: T) => boolean,
        sort?: (a: T, b: T) => number,
    ) => () => string[];
    memoReduce: <R>(
        fn: (acc: R, item: T, id: string, store: CorrelationStore<T>) => R,
        initial: R,
    ) => () => R;
    memoSome: (
        fn: (item: T, id: string, store: CorrelationStore<T>) => boolean,
    ) => () => boolean;
    size: number;
    values: () => Array<string[]>;
    [Symbol.iterator]: () => Array<[string, string[]]>;
}

type SortingFunction<T> = (a: T, b: T) => number;

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
        getTail: (id) => ids.get(id)?.slice(1),
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
