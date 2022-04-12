import { createStore, Store } from '@eventstore/stores';
import type {
    InternalWorkingDataOptions,
    InternalFieldOptions,
    WorkingDataState,
    ValidationMessages,
    ValidationFailedCallback,
    BeforeFocusCallback,
    WorkingData,
    ValidateOn,
    Validation,
} from '../types';
import { isWorkingData } from './isWorkingData';

type MessageStore<T> = { [key in keyof T]: ValidationMessages };
type ValidationSets<T> = Record<ValidateOn, Set<keyof T>>;

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
    validationSets: ValidationSets<T>;
}

export const blankMessages = (): ValidationMessages => ({
    error: [],
    warning: [],
    info: [],
});

export const addToValidationSets = <T>(
    key: keyof T,
    validations: Validation<any, T>[],
    validationSets: ValidationSets<T>,
) => {
    validationSets.submit.add(key);
    for (const { validateOn = 'submit' } of validations) {
        validationSets[validateOn].add(key);
    }
};

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
    const validationSets: ValidationSets<T> = {
        always: new Set(),
        submit: new Set(),
    };

    for (const [key, value] of Object.entries<
        InternalFieldOptions<any, any> | WorkingData<any>
    >(options)) {
        fields.set(key, value);

        if (isWorkingData(value)) {
            children.set(key, value);
            continue;
        }

        initialValues[key] = value.initialValue;
        messages[key] = blankMessages();

        addToValidationSets(
            key as keyof T,
            value.validations ?? [],
            validationSets,
        );
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
        validationSets,
    };
};
