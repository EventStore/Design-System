import type { Store } from './stores/createStore';

export interface Handlers<T> {
    delete: Set<DeleteEventHandler<T>>;
    dispose: Set<DisposeEventHandler>;
    get: Set<GetEventHandler<T>>;
    insert: Set<InsertEventHandler<T>>;
    keys: Set<KeysEventHandler>;
    reset: Set<ResetEventHandler>;
    set: Set<SetEventHandler<T>>;
}

export type SetEventHandler<StoreType> = (
    key: keyof StoreType,
    newValue: any,
    oldValue: any,
) => void;
export type InsertEventHandler<StoreType> = (
    key: keyof StoreType,
    value: any,
) => void;
export type GetEventHandler<StoreType> = (key: keyof StoreType) => void;
export type DeleteEventHandler<StoreType> = (key: keyof StoreType) => void;
export type KeysEventHandler = () => void;
export type ResetEventHandler = () => void;
export type DisposeEventHandler = () => void;

export interface OnHandler<StoreType> {
    (eventName: 'delete', callback: DeleteEventHandler<StoreType>): () => void;
    (eventName: 'dispose', callback: DisposeEventHandler): () => void;
    (eventName: 'get', callback: GetEventHandler<StoreType>): () => void;
    (eventName: 'insert', callback: InsertEventHandler<StoreType>): () => void;
    (eventName: 'keys', callback: KeysEventHandler): () => void;
    (eventName: 'reset', callback: ResetEventHandler): () => void;
    (eventName: 'set', callback: SetEventHandler<StoreType>): () => void;
}

export interface OnChangeHandler<StoreType> {
    <Key extends keyof StoreType>(
        propName: Key,
        cb: (newValue: StoreType[Key]) => void,
    ): () => void;
}

export type Plugin<T> = (store: Store<T>) => Subscription<T>;

/** An interface for creating subscriptions on the store. */
export interface Subscription<StoreType> {
    /** Triggered when an item is deleted from the store. */
    delete?: DeleteEventHandler<StoreType>;
    /** Triggered when the `dispose` method is called on the store. */
    dispose?: DisposeEventHandler;
    /** Triggered when an item is read from the store. */
    get?: GetEventHandler<StoreType>;
    /** Triggered when an item not previously in the store was set. */
    insert?: InsertEventHandler<StoreType>;
    /** Triggered when the keys of the store where read. For example, the store is iterated over. */
    keys?: KeysEventHandler;
    /** Triggered when the store is reset. */
    reset?: ResetEventHandler;
    /** Triggered when an item is set in the store (regardless of if it was previously present or not). */
    set?: SetEventHandler<StoreType>;
    /** Triggered when a store is created. */
}
