import type { VNode } from '@stencil/core';

export type Severity = 'error' | 'warning' | 'info';
export type ValidationMessage = string | VNode | VNode[];
export interface ValidationMessages {
    error: ValidationMessage[];
    warning: ValidationMessage[];
    info: ValidationMessage[];
    children?: Record<number, Record<Severity, ValidationMessage[]>>;
}

export interface FieldChange<T> {
    name: string;
    value: T;
}

export type FieldChangeEvent<T> = CustomEvent<FieldChange<T>>;
