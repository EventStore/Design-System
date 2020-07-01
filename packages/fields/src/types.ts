interface CEV<T extends object, K extends keyof T> {
    name: K;
    value: T[K];
}

export type FieldChangeEvent<T extends object> = CustomEvent<CEV<T, keyof T>>;

export type Severity = 'error' | 'warning' | 'info';
export type ValidationMessages = Record<Severity, string[]>;

interface SubmitOptions {
    forceFocus?: boolean;
}

export interface WorkingData<T extends object> {
    readonly data: T;
    readonly frozen: boolean;
    reset: () => void;
    set: (key: keyof T, item: T[typeof key], options?: any) => void;
    update: (update: Partial<T>) => void;
    connect: Connector<T>;
    validate: () => Promise<any>;
    submit: (
        fn: (data: T) => Promise<any>,
        options?: SubmitOptions,
    ) => Promise<void>;
    listen: (e: FieldChangeEvent<T>) => void;
    onChange: OnChangeHandler<T>;
    freeze: () => void;
    unfreeze: () => void;
}

export interface Connection<U> {
    value: U;
    invalid: boolean;
    messages: ValidationMessages;
    name: string;
    ref: (ref?: HTMLElement) => void;
}

export interface Connector<T> {
    <Key extends keyof T>(key: Key, options?: any): Connection<T[Key]>;
}

export interface OnChangeHandler<T> {
    <Key extends keyof T>(key: Key, cb: (newValue: T[Key]) => void): () => void;
}

export type WorkingDataOptions<T> = {
    [key in keyof T]: FieldOptions<T[key], T> | T[key];
};

export interface FieldOptions<T, U> {
    initialValue: T;
    optional?: boolean;
    message?: Message<T, U> | string;
    checkExists?: CheckExists<T>;
    validations?: Validation<T, U>[];
}

export type InternalWorkingDataOptions<T> = {
    [key in keyof T]: InternalFieldOptions<T[key], T>;
};

export type InternalFieldOptions<T, U> = Required<FieldOptions<T, U>>;

export type CheckExists<T> = (value: T) => boolean;

export type Validator<T, U> = (
    value: Exclude<T, null>,
    data: U,
) => boolean | Promise<boolean>;

export type Message<T, U> = (value: T, data: U) => string;

export interface Validation<T, U> {
    validator: Validator<T, U>;
    message: Message<T, U> | string;
    severity?: Severity;
}

export interface WorkingDataState {
    frozen: boolean;
}
