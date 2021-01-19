import { createStore, ObservableMap } from '@stencil/store';
import {
    InternalWorkingDataOptions,
    InternalFieldOptions,
    WorkingDataState,
    ValidationMessages,
} from '../../types';

type MessageStore<T> = { [key in keyof T]: ValidationMessages };

interface Stores<T> {
    dataStore: ObservableMap<T>;
    messageStore: ObservableMap<MessageStore<T>>;
    state: ObservableMap<WorkingDataState>;
    fields: Map<keyof T, Required<InternalFieldOptions<any, T>>>;
    refs: Map<keyof T, HTMLElement>;
}

export const blankMessages = (): ValidationMessages => ({
    error: [],
    warning: [],
    info: [],
});

export const createStores = <T>(
    options: InternalWorkingDataOptions<T>,
): Stores<T> => {
    const initialValues: Record<string, any> = {};
    const messages: Record<string, any> = {};
    const fields = new Map<string, any>();
    const defaultState: WorkingDataState = {
        frozen: false,
    };

    for (const [key, value] of Object.entries<InternalFieldOptions<any, any>>(
        options,
    )) {
        initialValues[key] = value.initialValue;
        messages[key] = blankMessages();
        fields.set(key, value);
    }

    return {
        dataStore: createStore<T>(initialValues as any),
        messageStore: createStore<MessageStore<T>>(messages as any),
        state: createStore<WorkingDataState>(defaultState),
        fields: fields as any,
        refs: new Map(),
    };
};
