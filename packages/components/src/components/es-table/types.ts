import { VNode } from '@stencil/core';

export interface CellProps<T> {
    data: T;
}
export interface TableColumn<T> {
    name: string | keyof T;
    title: string;
    cell?: (d: CellProps<T>) => string | VNode | VNode[] | null;
}
