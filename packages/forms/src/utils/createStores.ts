import { createStore, type Store } from '@eventstore-ui/stores';
import type {
    InternalValidatedFormOptions,
    InternalFieldOptions,
    ValidatedFormState,
    ValidationMessages,
    ValidationFailedCallback,
    BeforeFocusCallback,
    ValidatedForm,
    ValidateOn,
    Validation,
} from '../types';
import { isValidatedForm } from './isValidatedForm';

type MessageStore<T> = { [key in keyof T]: ValidationMessages };
type ValidationSets<T> = Record<ValidateOn, Set<keyof T>>;

interface Stores<T> {
    dataStore: Store<T>;
    messageStore: Store<MessageStore<T>>;
    state: Store<ValidatedFormState>;
    fields: Map<
        keyof T,
        Required<InternalFieldOptions<any, T>> | ValidatedForm<any>
    >;
    refs: Map<keyof T, HTMLElement>;
    children: Map<string, ValidatedForm<any>>;
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
    options: InternalValidatedFormOptions<T>,
): Stores<T> => {
    const initialValues: Record<string, any> = {};
    const children = new Map<string, ValidatedForm<any>>();
    const messages: Record<string, any> = {
        [':root']: blankMessages(),
    };
    const fields = new Map<string, any>();
    const defaultState: ValidatedFormState = {
        frozen: false,
    };
    const validationSets: ValidationSets<T> = {
        always: new Set(),
        submit: new Set(),
    };

    for (const [key, value] of Object.entries<
        InternalFieldOptions<any, any> | ValidatedForm<any>
    >(options)) {
        fields.set(key, value);

        if (isValidatedForm(value)) {
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
        dataStore: createStore(initialValues as any),
        messageStore: createStore<MessageStore<T>>(messages as any),
        state: createStore<ValidatedFormState>(defaultState),
        fields: fields as any,
        refs: new Map(),
        validationFailedCallbacks: new Map(),
        beforeFocusCallbacks: new Set(),
        validationSets,
    };
};
