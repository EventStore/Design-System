import { wDKey, focusError, insertError } from './symbols';

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
    readonly data: T;
    readonly frozen: boolean;
    readonly [wDKey]: true;
    reset: () => void;
    set: (key: keyof T, item: T[typeof key], options?: any) => void;
    update: (update: Partial<T>) => void;
    connect: Connector<T>;
    validate: (forceFocus?: boolean) => Promise<any>;
    submit: (
        fn: (data: T) => Promise<any>,
        options?: SubmitOptions,
    ) => Promise<void>;
    listen: (e: FieldChangeEvent<T>) => void;
    onChange: OnChangeHandler<T>;
    onValidationFailed: OnValidationFailedHandler<T>;
    onBeforeFocus: OnBeforeFocusHandler<T>;
    freeze: () => void;
    unfreeze: () => void;
    extend: (options: ExtendOptions<T>) => void;

    [focusError]: () => Promise<boolean>;
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
    onFieldChange: (
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

export type WorkingDataOptions<T> = {
    [key in keyof T]: T[key] extends object
        ? FieldOptions<T[key], T> | T[key] | WorkingData<T[key]>
        : FieldOptions<T[key], T> | T[key];
};

export interface FieldOptions<T, U> {
    initialValue: T;
    optional?: boolean | ((data: U) => boolean);
    message?: Message<T, U> | string;
    checkExists?: CheckExists<T, U>;
    validations?: Validation<T, U>[];
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

export interface Validation<T, U> {
    id?: string;
    validator: Validator<T, U>;
    message: Message<T, U> | string;
    severity?: Severity;
}

export interface WorkingDataState {
    frozen: boolean;
}
