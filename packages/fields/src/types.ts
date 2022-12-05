import type { h as jsxFactory, VNode } from '@stencil/core';

export type RenderFunction<T extends any[] = []> = (
    h: typeof jsxFactory,
    ...args: T
) => VNode | VNode[] | null | string;

export type Severity = 'error' | 'warning' | 'info';
export type ValidationMessage = string | RenderFunction;
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
