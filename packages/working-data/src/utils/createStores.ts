import { createStore, Store } from '@eventstore/stores';
import type {
    InternalWorkingDataOptions,
    InternalFieldOptions,
    WorkingDataState,
    ValidationMessages,
    ValidationFailedCallback,
    BeforeFocusCallback,
    WorkingData,
} from '../types';
import { isWorkingData } from './isWorkingData';

type MessageStore<T> = { [key in keyof T]: ValidationMessages };

interface Stores<T> {
    dataStore: Store<T>;
    messageStore: Store<MessageStore<T>>;
    state: Store<WorkingDataState>;
    fields: Map<
        keyof T,
        Required<InternalFieldOptions<any, T>> | WorkingData<any>
    >;
    refs: Map<keyof T, HTMLElement>;
    children: Map<string, WorkingData<any>>;
    validationFailedCallbacks: Map<
        keyof T | '*',
        Set<ValidationFailedCallback<T>>
    >;
    beforeFocusCallbacks: Set<BeforeFocusCallback<keyof T>>;
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
    const children = new Map<string, WorkingData<any>>();
    const messages: Record<string, any> = {
        [':root']: blankMessages(),
    };
    const fields = new Map<string, any>();
    const defaultState: WorkingDataState = {
        frozen: false,
    };

    for (const [key, value] of Object.entries<
        InternalFieldOptions<any, any> | WorkingData<any>
    >(options)) {
        fields.set(key, value);

        if (isWorkingData(value)) {
            children.set(key, value);
        } else {
            initialValues[key] = value.initialValue;
            messages[key] = blankMessages();
        }
    }

    return {
        children,
        dataStore: createStore<T>(initialValues as any),
        messageStore: createStore<MessageStore<T>>(messages as any),
        state: createStore<WorkingDataState>(defaultState),
        fields: fields as any,
        refs: new Map(),
        validationFailedCallbacks: new Map(),
        beforeFocusCallbacks: new Set(),
    };
};
