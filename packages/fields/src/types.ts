import { wDKey, focusError, insertError, wDAKey } from './symbols';

interface ChangeEventValue<T extends object, K extends keyof T> {
    name: K;
    value: T[K];
}

export type FieldChangeEvent<T extends object> = CustomEvent<
    ChangeEventValue<T, keyof T>
>;

export type Severity = 'error' | 'warning' | 'info';
export type ValidationMessages = Record<Severity, string[]>;

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

export interface WorkingDataArray<T> {
    /** The key of the WorkingDataArray within the containing WorkingData */
    readonly name: string;
    /** The access the contained data directly */
    readonly data: T[];
    /** If modifications are currently frozen, (for example, by submitting the data). */
    readonly frozen: boolean;
    /** All validation messages contained in the form.  */
    readonly messages: ValidationMessages;
    /** @internal */
    readonly [wDAKey]: true;

    /** Reset all values and validations to default.  */
    reset: () => void;
    /** Delete an entry at index. */
    delete: (index: number, options?: any) => void;
    /** Set a value at index. */
    set: (index: number, item: T, options?: any) => void;
    /** Replace the entire value of the array. */
    update: (update: T[]) => void;
    /** Connect a component to the data, for two way data binding. */
    connect: (i: number) => BasicConnection<string, T>;
    /** Validate the data, optionally focusing the first error. */
    validate: (forceFocus?: boolean) => Promise<any>;
    /**
     * Validate the data, with a callback on success.
     * The data will be frozen while the callback promise is unresolved.
     * If a [HTTPError](/utils/utils/HTTPError) the HTTPProblemDetails fields will be taken as errors, and applied to the fields.
     */
    submit: (
        fn: (data: T[]) => Promise<any>,
        options?: SubmitOptions,
    ) => Promise<void>;
    /** Listen to FieldChange events, and update the data from them. */
    listen: (e: FieldChangeEvent<Record<string, T>>) => void;
    /** Called whenever the data changes. */
    onChange(cb: (newValue: T) => void): () => void;
    /** Called whenever validation has failed. */
    onValidationFailed: OnValidationFailedHandler<Record<number, T>>;
    /** Called before the first error is attempted to be focused. */
    onBeforeFocus: OnBeforeFocusHandler<Record<number, T>>;
    /** Freeze the data in the store, preventing changes. */
    freeze: () => void;
    /** Unfreeze the data in the store, allowing changes. */
    unfreeze: () => void;

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
            name: K;
            value: V;
        }>,
    ) => void;
    ref: (ref?: HTMLElement) => void;
}

interface WDConnection<K extends string, V extends object> {
    name: K;
    data: WorkingData<V>;
}

interface WDAConnection<V> {
    name: string;
    data: WorkingDataArray<V>;
}

export type Connection<K extends string, V> = V extends Array<any>
    ? WDAConnection<V[0]>
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
        ? FieldOptions<T[key], T> | T[key] | WorkingDataArray<T[key][0]>
        : T[key] extends object
        ? FieldOptions<T[key], T> | T[key] | WorkingData<T[key]>
        : FieldOptions<T[key], T> | T[key];
};

/** Validation and setup otions for fields */
export interface FieldOptions<T, U> {
    /** The initial value of the field. */
    initialValue: T;
    /** A boolean or function stating if a field is optional. (all keys are required by default.) */
    optional?: boolean | ((data: U) => boolean);
    /** Message to display if the value is not provided. */
    message?: Message<T, U> | string;
    /** Pass a custom function to check if a value has been provided. */
    checkExists?: CheckExists<T, U>;
    /** An array of validations to be called against the value on validations. Functions will only be called if `checkExists` returns true. */
    validations?: Validation<T, U>[];
}

/** Validation and setup options for an array based field */
export interface ArrayOptions<T> {
    /** The key of the array in the containing Working Data. */
    name: string;
    /** The initial value of the array. */
    initialValue?: T[];

    /** minimum length of the array */
    minLength?: {
        value: number;
        message: Message<T[], void> | string;
    };
    /** maximum length of the array */
    maxLength?: {
        value: number;
        message: Message<T[], void> | string;
    };
    /** Validations afainst the entire array. */
    globalValidations?: Validation<T[], void>[];

    /** If a single item having a value is optional. (required by default) */
    valueOptional?: boolean | ((i: number, data: T) => boolean);
    /** Check that a single item exists. */
    checkValueExists?: CheckExists<T, T[]>;
    /** Message to display a single item value doesnt exist. */
    requiredValueMessage?: Message<T, T[]> | string;
    /** Run validations against each single item in the array. Functions will only be called if `checkValueExists` returns true. */
    validations?: Validation<T, T[]>[];
}

export interface InternalArrayOptions<T>
    extends Omit<
        Required<ArrayOptions<T>>,
        'minLength' | 'maxLength' | 'optional'
    > {
    minLength?: ArrayOptions<T>['minLength'];
    maxLength?: ArrayOptions<T>['minLength'];
    valueOptional: (i: number, data: T) => boolean;
}

export type InternalWorkingDataOptions<T> = {
    [key in keyof T]: T[key] extends object
        ? InternalFieldOptions<T[key], T> | WorkingData<T[key]>
        : InternalFieldOptions<T[key], T>;
};

export interface InternalFieldOptions<T, U>
    extends Required<Omit<FieldOptions<T, U>, 'optional'>> {
    optional: (data: U) => boolean;
}

export type CheckExists<T, U> = (value: T, data: U) => boolean;

export type Validator<T, U> = (
    value: Exclude<T, null>,
    data: U,
) => boolean | Promise<boolean>;

export type Message<T, U> = (value: T, data: U) => string;

/** Validate a value in the data */
export interface Validation<T, U> {
    /** The id of the validation. */
    id?: string;
    /** A function to validate the value. Will be awaited on, if it returns a promise. (return true if valid) */
    validator: Validator<T, U>;
    /** A message, or message creator to display if the validation fails. */
    message: Message<T, U> | string;
    /** What severity this validation is. */
    severity?: Severity;
}

export interface WorkingDataState {
    frozen: boolean;
}
