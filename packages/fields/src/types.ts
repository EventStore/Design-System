export type Severity = 'error' | 'warning' | 'info';
export interface ValidationMessages {
    error: string[];
    warning: string[];
    info: string[];
    children?: Record<string | number, ValidationMessages>;
}

export interface FieldChange<T> {
    name: string;
    value: T;
}

export type FieldChangeEvent<T> = CustomEvent<FieldChange<T>>;
