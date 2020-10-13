import { VNode } from '@stencil/core';

export interface CellProps<T> {
    data: T;
    parent: string;
    key: string;
}

export type TableCellVariant =
    | 'default'
    | 'no-pad'
    | 'borderless'
    | 'centered'
    | 'full-width';

export interface TableCell<T> {
    title: string;
    cell?: (d: CellProps<T>) => string | VNode | VNode[] | null;
    width?: string;
    variant?: TableCellVariant | TableCellVariant[];
}

export type TableCells<T> = Record<string, TableCell<T>>;
