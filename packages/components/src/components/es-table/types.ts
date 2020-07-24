import { VNode } from '@stencil/core';

export interface CellProps<T> {
    data: T;
}

export interface TableCell<T> {
    title: string;
    cell?: (d: CellProps<T>) => string | VNode | VNode[] | null;
}

export type TableCells<T> = Record<string, TableCell<T>>;
