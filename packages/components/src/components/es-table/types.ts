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
    | 'full-width'
    | 'exclude';

export interface TableCell<T> {
    title: string;
    cell?: (d: CellProps<T>) => string | VNode | VNode[] | null;
    width?: string;
    variant?: TableCellVariant | TableCellVariant[];
    class?:
        | ((d: T) => string | Record<string, boolean>)
        | string
        | Record<string, boolean>;
}

export type TableCells<T> = Record<string, TableCell<T>>;
