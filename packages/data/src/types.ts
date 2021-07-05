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

export interface Subscription<StoreType> {
    delete?: DeleteEventHandler<StoreType>;
    dispose?: DisposeEventHandler;
    get?: GetEventHandler<StoreType>;
    insert?: InsertEventHandler<StoreType>;
    keys?: KeysEventHandler;
    reset?: ResetEventHandler;
    set?: SetEventHandler<StoreType>;
}

export interface ObservableMap<T> {
    /**
     * Proxied object that will detect dependencies and call
     * the subscriptions and computed properties.
     */
    state: T;

    /**
     * @example
     * store.on('set', (prop, value) => {
     *   console.log(`Prop ${prop} changed to: ${value}`);
     * });
     */
    on: OnHandler<T>;

    /**
     * Easily listen for value changes of the specified key.
     */
    onChange: OnChangeHandler<T>;

    /**
     * Resets the state to its original state and
     * signals a dispose event to all the plugins.
     *
     * This method is intended for plugins to reset
     * all their internal state between tests.
     */
    dispose(): void;

    /**
     * Resets the state to its original state.
     */
    reset(): void;

    /**
     * Registers a subscription that will be called whenever the user gets, sets, or
     * resets a value.
     */
    use(...plugins: Subscription<T>[]): void;
}
