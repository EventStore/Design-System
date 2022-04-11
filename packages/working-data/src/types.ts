import { wDKey, focusError, insertError } from './symbols';

interface ChangeEventValue<T extends object, K extends keyof T> {
    name: K;
    value: T[K];
}

export type FieldChangeEvent<T extends object> = CustomEvent<
    ChangeEventValue<T, keyof T>
>;

export type Severity = 'error' | 'warning' | 'info';
export interface ValidationMessages {
    error: string[];
    warning: string[];
    info: string[];
    children?: Record<number, Record<Severity, string[]>>;
}

interface SubmitOptions {
    forceFocus?: boolean;
}

export interface WorkingData<T extends object> {
    /** The access the contained data directly */
    readonly data: T;
    /** If modifications are currently frozen, (for example, by submitting the data). */
    readonly frozen: boolean;
    /** All validation messages contained in the form.  */
    readonly messages: ValidationMessages;
    /** @internal */
    readonly [wDKey]: true;

    /** Reset all values and validations to default.  */
    reset: () => void;
    /** Set the value of a item. */
    set: (key: keyof T, item: T[typeof key], options?: any) => void;
    /** Perform a partial update of the data contained in the store.. */
    update: (update: Partial<T>) => void;
    /** Connect a component to the data, for two way data binding. */
    connect: Connector<T>;
    /** Validate the data, optionally focusing the first error. */
    validate: (forceFocus?: boolean) => Promise<any>;
    /**
     * Validate the data, with a callback on success.
     * The data will be frozen while the callback promise is unresolved.
     * If a [HTTPError](/utils/utils/HTTPError) the HTTPProblemDetails fields will be taken as errors, and applied to the fields.
     */
    submit: (
        fn: (data: T) => Promise<any>,
        options?: SubmitOptions,
    ) => Promise<void>;
    /** Listen to FieldChange events, and update the data from them. */
    listen: (e: FieldChangeEvent<T>) => void;
    /** Called whenever the data changes. */
    onChange: OnChangeHandler<T>;
    /** Called whenever validation has failed. */
    onValidationFailed: OnValidationFailedHandler<T>;
    /** Called before the first error is attempted to be focused. */
    onBeforeFocus: OnBeforeFocusHandler<T>;
    /** Freeze the data in the store, preventing changes. */
    freeze: () => void;
    /** Unfreeze the data in the store, allowing changes. */
    unfreeze: () => void;
    /** Extend the options used to create the store, allowing you to add more validations. Allows components to provide built in validations. */
    extend: (options: ExtendOptions<T>) => void;

    /** @internal */
    [focusError]: () => Promise<boolean>;
    /** @internal */
    [insertError]: (
        keys: string[],
        severity: Severity,
        message: string,
        id: string,
    ) => void;
}

interface BasicConnection<K extends string, V> {
    value: V;
    invalid: boolean;
    messages: ValidationMessages;
    name: K;
    onFieldchange: (
        e: CustomEvent<{
            name: string;
            value: V;
        }>,
    ) => void;
    ref: (ref?: HTMLElement) => void;
}

interface WDConnection<K extends string, V extends object> {
    name: K;
    data: WorkingData<V>;
}

export type Connection<K extends string, V> = V extends Array<any>
    ? BasicConnection<K, V>
    : V extends object
    ? WDConnection<K, V>
    : BasicConnection<K, V>;

export interface Connector<T> {
    <K extends string & keyof T>(key: K): Connection<K, T[K]>;
    <K extends string & keyof T, K2 extends string & keyof T[K]>(
        key: K,
        key2: K2,
    ): Connection<K2, T[K][K2]>;
    <
        K extends string & keyof T,
        K2 extends string & keyof T[K],
        K3 extends string & keyof T[K][K2]
    >(
        key: K,
        key2: K2,
        key3: K3,
    ): Connection<K3, T[K][K2][K3]>;
    <
        K extends string & keyof T,
        K2 extends string & keyof T[K],
        K3 extends string & keyof T[K][K2],
        K4 extends string & keyof T[K][K2][K3]
    >(
        key: K,
        key2: K2,
        key3: K3,
        key4: K4,
    ): Connection<K4, T[K][K2][K3][K4]>;
}

export interface OnChangeHandler<T> {
    <Key extends keyof T>(key: Key, cb: (newValue: T[Key]) => void): () => void;
}

export type ValidationFailedCallback<T> = (
    info: { id: string; severity: Severity; message: string; key: keyof T },
    ref?: HTMLElement,
) => void;

export interface OnValidationFailedHandler<T> {
    <Key extends keyof T>(
        key: Key | '*',
        cb: ValidationFailedCallback<T>,
    ): () => void;
}

export type BeforeFocusCallback<K> = (
    key: K,
    ref: HTMLElement | undefined,
) => boolean | void | Promise<boolean | void>;
export interface OnBeforeFocusHandler<T> {
    (cb: BeforeFocusCallback<keyof T>): () => void;
}

export type ExtendOptions<T> = {
    [key in keyof T]?: T[key] extends object
        ? Omit<FieldOptions<T[key], T>, 'initialValue'> | ExtendOptions<T[key]>
        : Omit<FieldOptions<T[key], T>, 'initialValue'>;
};

/**
 * Validation and setup otions for a Working Data store.
 * Each key can be:
 * - An inital value (required by default, uses default validation messages)
 * - a FieldOptions object, describing the field.
 * - Another WorkingData store
 * - A WorkingDataArray store, to back an array.
 */
export type WorkingDataOptions<T> = {
    [key in keyof T]: T[key] extends Array<any>
        ? FieldOptions<T[key], T> | T[key]
        : T[key] extends object
        ? FieldOptions<T[key], T> | T[key] | WorkingData<T[key]>
        : FieldOptions<T[key], T> | T[key];
};

/** Validation and setup otions for fields */
export interface FieldOptions<ItemType, T> {
    /** The initial value of the field. */
    initialValue: ItemType;
    /** A boolean or function stating if a field is optional. (all keys are required by default.) */
    optional?: boolean | ((data: T) => boolean);
    /** Message to display if the value is not provided. */
    message?: Message<ItemType, T> | string;
    /** Pass a custom function to check if a value has been provided. */
    checkExists?: CheckExists<ItemType, T>;
    /** An array of validations to be called against the value on validations. Functions will only be called if `checkExists` returns true. */
    validations?: ItemType extends Array<any>
        ? ArrayValidation<ItemType, T>[]
        : Validation<ItemType, T>[];
}

export type InternalWorkingDataOptions<T> = {
    [key in keyof T]: T[key] extends object
        ? InternalFieldOptions<T[key], T> | WorkingData<T[key]>
        : InternalFieldOptions<T[key], T>;
};

export interface InternalFieldOptions<ItemType, T>
    extends Required<Omit<FieldOptions<ItemType, T>, 'optional'>> {
    optional: (data: T) => boolean;
}

export type CheckExists<ItemType, T> = (value: ItemType, data: T) => boolean;

export type Validator<ItemType, T> = (
    value: Exclude<ItemType, null>,
    data: T,
) => boolean | Promise<boolean>;

export type Message<ItemType, T> = (value: ItemType, data: T) => string;

/** Validate a value in the data */
export type Validation<ItemType, T> = {
    /** The id of the validation. */
    id?: string;
    /** A function to validate the value. Will be awaited on, if it returns a promise. (return true if valid) */
    validator: Validator<ItemType, T>;
    /** A message, or message creator to display if the validation fails. */
    message: Message<ItemType, T> | string;
    /** What severity this validation is. */
    severity?: Severity;
};

/** Validate a value in the data */
export type ArrayValidation<ItemType extends Array<any>, T> =
    | (Validation<ItemType, T> & { callOnEach?: false })
    | (Validation<ItemType[0], T> & { callOnEach: true });

export interface WorkingDataState {
    frozen: boolean;
}
