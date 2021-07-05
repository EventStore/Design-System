import type {
    OnHandler,
    OnChangeHandler,
    Subscription,
    ObservableMap,
    Handlers,
} from '../types';

export const createObservableMap = <T extends Record<string, unknown>>(
    defaultState: T,
    shouldUpdate: (newV: any, oldValue: any, prop: keyof T) => boolean = (
        a,
        b,
    ) => a !== b,
): ObservableMap<T> => {
    let data = new Map<string, any>(Object.entries(defaultState ?? {}));

    const handlers: Handlers<T> = {
        dispose: new Set(),
        keys: new Set(),
        get: new Set(),
        set: new Set(),
        reset: new Set(),
        delete: new Set(),
        insert: new Set(),
    };

    const state = new Proxy<T>(defaultState, {
        get(_, propName: any) {
            handlers.get.forEach((cb) => cb(propName));
            return data.get(propName);
        },
        ownKeys(_) {
            handlers.keys.forEach((cb) => cb());
            return Array.from(data.keys());
        },
        getOwnPropertyDescriptor() {
            return {
                enumerable: true,
                configurable: true,
            };
        },
        has(_, propName: any) {
            return data.has(propName);
        },
        set(_, propName: any, value) {
            const oldValue = data.get(propName);
            const isInsert = !data.has(propName);

            if (shouldUpdate(value, oldValue, propName)) {
                data.set(propName, value);

                if (isInsert) {
                    handlers.insert.forEach((cb) => cb(propName, value));
                }

                handlers.set.forEach((cb) => cb(propName, value, oldValue));
            }
            return true;
        },
        deleteProperty(_, propName: any) {
            const success = data.delete(propName);

            if (success) {
                handlers.delete.forEach((cb) => cb(propName));
            }

            return success;
        },
    });

    const reset = (): void => {
        data = new Map<string, any>(Object.entries(defaultState ?? {}));
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
        const unReset = on('reset', () => cb(defaultState?.[propName] as any));
        return () => {
            unSet();
            unReset();
        };
    };

    const use = (...subscriptions: Subscription<T>[]): void => {
        subscriptions.forEach((subscription) => {
            if (subscription.delete) on('delete', subscription.delete);
            if (subscription.dispose) on('dispose', subscription.dispose);
            if (subscription.get) on('get', subscription.get);
            if (subscription.insert) on('insert', subscription.insert);
            if (subscription.keys) on('keys', subscription.keys);
            if (subscription.reset) on('reset', subscription.reset);
            if (subscription.set) on('set', subscription.set);
        });
    };

    return {
        state,
        on,
        onChange,
        use,
        dispose,
        reset,
    };
};
