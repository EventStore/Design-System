import {
    Component,
    h,
    Prop,
    Host,
    Event,
    type EventEmitter,
} from '@stencil/core';
import { Link, router } from '@eventstore-ui/router';
import { theme } from '@eventstore-ui/theme';

import type {
    ClickRow,
    TableCell,
    TableCells,
    TableSort,
    ColumnGroups,
    NamedCell,
} from '../types';
import { logger } from '../../../utils/logger';
import { TableHeader } from '../TableHeader';
import { autoExtract } from '../utils/autoExtract';
import { cellClasses } from '../utils/cellClasses';
import { variantMatches } from '../utils/variantMatches';
import type { RenderFunction } from '../../../types';

/** Create a table from data. */
@Component({
    tag: 'es-table',
    styleUrl: 'es-table.css',
    shadow: false,
})
export class Table {
    /** Passed to cell renderer as `parent`. */
    @Prop() identifier: string = 'table';
    /** Do not render header. */
    @Prop() headless: boolean = false;
    /** Header sticks to scroll parent. */
    @Prop() stickyHeader: boolean = false;
    /** Sync function for extracting the data from the row. By default, it assumes you passed an array of data as your columns. */
    @Prop() getCellData: (row: any) => any = (d) => d;
    /** Sync function for extracting a key from your row data. By default, if the passed rows are strings it will use them directly, otherwise it will warn and use the index. */
    @Prop() getRowKey: (row: any, i: number) => string = (row, i) => {
        if (typeof row === 'string') return row;
        logger.warn.once(
            'es-table:',
            `Key not found for row ${row} at index ${i}. Using index as key (unsafe).`,
            'Pass the `getRowKey` prop to convert your row into a key.',
        );
        return `${i}`;
    };
    /** A record of table cell definitions. */
    @Prop() cells!: TableCells<any, any>;
    /** The order and keys of the cells to be rendered. If omitted, all cells will be rendered. */
    @Prop() columns?: string[];
    /** An array of rows to render. Each item in the array is passed to getCellData, to allow passing keys or other identifiers.  */
    @Prop() rows!: unknown[];
    /** A function to calculate a href from the cell data. */
    @Prop() linkRowTo?: (data: any) => string;
    /** If rows should be allowed to take focus */
    @Prop() rowTakesFocus?: boolean;
    /** A function to calculate the class or classes of the row from the cellData. */
    @Prop() rowClass: (
        data: any,
        row: any,
    ) => Record<string, boolean> | string | undefined = () => undefined;
    /** Allows rendering a node after the row. */
    @Prop() renderExpansion: RenderFunction<
        [row: any, key: string, i: number]
    > = () => null;
    /** How the table is sorted */
    @Prop() sort?: TableSort;
    /** Pass extra props to cells */
    @Prop() extraCellProps?: (key: string, data: any) => Record<string, any>;
    /** Indicates if the loading indicators should be displayed */
    @Prop() loading?: boolean;
    /** Specifies the number of rows to display when loading is true. Defaults to 1. */
    @Prop() loadingRows: number = 1;

    /** Triggered whenever a row is clicked. */
    @Event() clickRow!: EventEmitter<ClickRow<any>>;
    /** Triggered whenever a sortable header is clicked */
    @Event() clickSort!: EventEmitter<string>;

    private renderRowGroup = (row: any, i: number) => {
        const key = this.loading ? `loading-${i}` : this.getRowKey(row, i);
        return (
            <div
                key={key}
                role={'rowgroup'}
                class={{
                    odd: i % 2 !== 0,
                }}
            >
                {this.renderRow(row, key, i)}
                {!this.loading && this.renderExpansion(h, row, key, i)}
            </div>
        );
    };

    private renderRow = (row: unknown, key: string, index: number) => {
        const data = this.loading ? {} : this.getCellData?.(row);

        if (!data) {
            logger.warn.once(
                'es-table:',
                `Data not found for cell with row ${row} at index ${index}`,
            );
            return null;
        }

        if (!this.loading && this.linkRowTo) {
            return (
                <Link
                    url={this.linkRowTo(data)}
                    role={'row'}
                    aria-rowindex={index}
                    class={this.rowClass(data, row)}
                    onClick={this.emitRowClick({
                        index,
                        key,
                        row,
                        data,
                    })}
                    tabindex={'-1'}
                >
                    {this.renderCells(data, row, key, index)}
                </Link>
            );
        }

        return (
            <div
                role={'row'}
                aria-rowindex={index}
                class={this.loading ? undefined : this.rowClass(data, key)}
                onClick={this.emitRowClick({
                    index,
                    key,
                    row,
                    data,
                })}
                tabindex={'-1'}
            >
                {this.renderCells(data, row, key, index)}
            </div>
        );
    };

    private renderCells = (
        data: any,
        row: unknown,
        key: string,
        index: number,
    ) =>
        this.getColumnGroups().map(([_, cells], groupIndex, groups) =>
            cells.map(([name, cell], cellIndex, cells) => {
                const focusCell =
                    groupIndex === 0 &&
                    cellIndex === 0 &&
                    (!!this.rowTakesFocus || !!this.linkRowTo) &&
                    !this.loading;

                return (
                    <div
                        key={name}
                        role={'cell'}
                        tabindex={focusCell ? '0' : undefined}
                        onKeyDown={
                            focusCell
                                ? this.focusCellKeyPress({
                                      index,
                                      row,
                                      key,
                                      data,
                                  })
                                : undefined
                        }
                        class={cellClasses(cell, data, focusCell, {
                            groupIndex,
                            groupCount: groups.length,
                            cellIndex,
                            cellCount: cells.length,
                        })}
                    >
                        {this.renderCellContent(data, key, name, cell)}
                    </div>
                );
            }),
        );

    private renderCellContent = (
        data: any,
        key: string,
        name: NamedCell[0],
        cell: NamedCell[1],
    ) => {
        if (this.loading) {
            if (cell.expectedLength === 0 && !cell.variance) return undefined;
            if (cell.expectedLength === undefined && !cell.title?.length)
                return undefined;
            return (
                <es-loading-text
                    expectedLength={Math.max(
                        cell.title?.length ?? 0,
                        cell.expectedLength ?? 30,
                    )}
                    variance={cell.variance}
                />
            );
        } else if (cell.cell) {
            return cell.cell(h, {
                ...(this.extraCellProps?.(key, data) ?? {}),
                key,
                data,
                parent: this.identifier,
            });
        } else {
            return autoExtract(data, name);
        }
    };

    render() {
        return (
            <Host
                role={'table'}
                style={{ gridTemplateColumns: this.gridTemplateColumns() }}
                high-contrast={theme.isHighContrast()}
                dark={theme.isDark()}
            >
                <TableHeader
                    columnGroups={this.getColumnGroups()}
                    clickSort={this.clickSort}
                    headless={this.headless}
                    sort={this.sort}
                    sticky={this.stickyHeader}
                />
                {this.loading
                    ? Array.from({ length: this.loadingRows }, (_, i) =>
                          this.renderRowGroup({}, i),
                      )
                    : this.rows?.map(this.renderRowGroup)}
            </Host>
        );
    }

    private focusCellKeyPress = (data: ClickRow) => (e: KeyboardEvent) => {
        if (this.loading) return;
        if (e.code !== 'Space' && e.code !== 'Enter') return;

        this.clickRow.emit(data);
        if (this.linkRowTo) {
            const link = this.linkRowTo(data);
            router.history?.push(link);
        }
    };

    private emitRowClick = (data: ClickRow) => () => {
        if (this.loading) return;
        this.clickRow.emit(data);
    };

    private getCell = (col: string): TableCell<unknown> => {
        return this.cells[col] ?? { title: '' };
    };

    private getColumns = (): string[] => {
        if (this.columns) return this.columns;
        return Object.keys(this.cells ?? {});
    };

    private getColumnGroups = (): ColumnGroups => {
        return this.getColumns().reduce<ColumnGroups>((acc, col) => {
            const cell = this.getCell(col);
            if (cell.variant === 'exclude') return acc;
            if (acc.at(-1) != null && acc.at(-1)![0] === cell.group) {
                acc.at(-1)![1].push([col, cell]);
            } else {
                acc.push([cell.group, [[col, cell]]]);
            }
            return acc;
        }, []);
    };

    private gridTemplateColumns = () =>
        this.getColumns().reduce((acc, col) => {
            const cell = this.getCell(col);
            if (variantMatches(cell.variant, 'exclude', 'full-width')) {
                return acc;
            }
            return `${acc} ${cell.width ?? 'auto'}`;
        }, '');
}
