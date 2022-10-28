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

/** Describes which style of table cell should be used. */
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
    /** If this cell should be grouped with others. */
    group?: string;
    /** The cell renderer. By default it will take the it's key in in the record, and extract that key from the row data. */
    cell?: (d: CellProps<T>) => string | VNode | VNode[] | null;
    /** Allows passing a [track sizing function](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template-columns#values) for use in the grid. */
    width?: string;
    /**
     * Allows specifiying a predefined variant for the cell.
     * - `default`: The default styling.
     * - `no-pad`: Removes padding.
     * - `borderless`: Removes border, if set.
     * - `centered`: Center aligns the content.
     * - `full-width`: Breaks the cell onto its own row, taking the full width. **Only use on last cell of row, or in es-table-detail. Not supported in es-table-virtualized **
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

/** The order that the table column is sorted in. */
export type SortOrder = 'ascending' | 'descending' | 'other' | 'none';

/** A tuple representing the column name and order that a table is sorted by. */
export type TableSort = [
    /** The column name the table is sorted on. */
    key: string,
    /** The order of the sort. */
    order: SortOrder,
];

/** A record of table cell definitions. */
export type TableCells<T> = Record<string, TableCell<T>>;

/** @internal */
export type NamedCell = [name: string, cell: TableCell<unknown>];

/** @internal */
export type ColumnGroups = Array<
    [group: string | undefined, cells: NamedCell[]]
>;

/** How the table should jump to a row.  */
export interface JumpOptions {
    highlight: boolean;
    smooth: 'auto' | false;
}

/** How the table should jump to a row.  */
export interface LoadWindow {
    /** The first index of the window */
    from: bigint;
    /** The last index of the window */
    to: bigint;
    /** The number of rows in the window */
    count: bigint;
}

/** An event emitted when a window is loaded. */
export type LoadWindowEvent = CustomEvent<LoadWindow>;

/** Information on the row which was clicked. */
export interface ClickRow<T = any> {
    /** The index of the row that was clicked. */
    index: bigint;
    /** The key of the row that was clicked. */
    key: string;
    /** The data (if available) of the row that was clicked. */
    data: T;
}

/** An event emitted when a row is clicked. */
export type ClickRowEvent<T> = CustomEvent<ClickRow<T>>;

/**
 * An event emitted when a sortable header is clicked.
 * The detail contains the key of the header.
 */
export type ClickSortEvent = CustomEvent<string>;
