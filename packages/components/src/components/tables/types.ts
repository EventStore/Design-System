import type { VNode } from '@stencil/core';

/** Props passed to the cell renderer. */
export interface CellProps<T> {
    /** The data for the cell. */
    data: T;
    /** The identifier prop of the table rendering the cell. */
    parent: string;
    /** The key of the cell in the table cell record. */
    key: string;
}

export type TableCellVariant =
    | 'default'
    | 'no-pad'
    | 'borderless'
    | 'centered'
    | 'full-width'
    | 'exclude';

/** A single table cell definition. */
export interface TableCell<T> {
    /** The title to be placed in the header. */
    title?: string;
    /** The cell renderer. By default it will take the it's key in in the record, and extract that key from the row data. */
    cell?: (d: CellProps<T>) => string | VNode | VNode[] | null;
    /** Allows passing a [track sizing function](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns#values) for use in the grid. */
    width?: string;
    /**
     * Allows specifiying a predefined variant for the cell.
     * - `default`: The default styling.
     * - `no-pad`: Removes padding.
     * - `borderless`: Removes border.
     * - `centered`: Center aligns the content.
     * - `full-width`:  Breaks the cell onto its own row, taking the full width. **Only use on last cell of row**
     * - `exclude`: Disables the cell.
     */
    variant?: TableCellVariant | TableCellVariant[];
    /** Pass a custom class function, string or record to apply to the cell. */
    class?:
        | ((d: T) => string | Record<string, boolean>)
        | string
        | Record<string, boolean>;
    /** If the table can be sorted by this column */
    sortable?: boolean;
}

export type SortOrder = 'ascending' | 'descending' | 'other' | 'none';
export type TableSort = [key: string, order: SortOrder];

/** A record of table cell definitions. */
export type TableCells<T> = Record<string, TableCell<T>>;

export interface JumpOptions {
    highlight: boolean;
    smooth: 'auto' | false;
}

export interface LoadWindow {
    from: bigint;
    to: bigint;
    count: bigint;
}

export type LoadWindowEvent = CustomEvent<LoadWindow>;

export interface ClickRow<T = any> {
    index: bigint;
    key: string;
    data: T;
}

export type ClickRowEvent<T> = CustomEvent<ClickRow<T>>;

export type ClickSortEvent = CustomEvent<string>;
