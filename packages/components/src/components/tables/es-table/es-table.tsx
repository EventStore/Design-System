import {
    Component,
    h,
    Prop,
    Host,
    Event,
    EventEmitter,
    VNode,
} from '@stencil/core';
import { Link, router } from '@eventstore-ui/router';
import { theme } from '@eventstore-ui/theme';

import type {
    ClickRow,
    TableCell,
    TableCells,
    TableSort,
    ColumnGroups,
} from '../types';
import { logger } from '../../../utils/logger';
import { TableHeader } from '../TableHeader';
import { autoExtract } from '../utils/autoExtract';
import { cellClasses } from '../utils/cellClasses';
import { variantMatches } from '../utils/variantMatches';

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
    @Prop() getCellData: (key: string) => any = (d) => d;
    /** A record of table cell definitions. */
    @Prop() cells!: TableCells<any>;
    /** The order and keys of the cells to be rendered. If omitted, all cells will be rendered. */
    @Prop() columns?: string[];
    /** An array of rows to render. Each item in the array is passed to getCellData, to allow passing keys or other identifiers.  */
    @Prop() rows!: any[];
    /** A function to calculate a href from the cell data. */
    @Prop() linkRowTo?: (row: any) => string;
    /** If rows should be allowed to take focus */
    @Prop() rowTakesFocus?: boolean;
    /** A function to calculate the class or classes of the row from the cellData. */
    @Prop() rowClass: (
        row: any,
    ) => Record<string, boolean> | string | undefined = () => undefined;
    /** Allows rendering a node after the row. */
    @Prop() renderExpansion: (key: string) => VNode | null = () => null;
    /** How the table is sorted */
    @Prop() sort?: TableSort;

    /** Triggered whenever a row is clicked. */
    @Event() clickRow!: EventEmitter<ClickRow<any>>;
    /** Triggered whenever a sortable header is clicked */
    @Event() clickSort!: EventEmitter<string>;

    private renderRowGroup = (key: string, i: number) => (
        <div
            role={'rowgroup'}
            class={{
                odd: i % 2 !== 0,
            }}
        >
            {this.renderRow(key, i)}
            {this.renderExpansion(key)}
        </div>
    );

    private renderRow = (key: string, index: number) => {
        const data = this.getCellData?.(key);

        if (!data) {
            logger.warn.once(
                'es-table:',
                `Data not found for cell with key ${key} at index ${index}`,
            );
            return null;
        }

        if (this.linkRowTo) {
            return (
                <Link
                    url={this.linkRowTo(data)}
                    role={'row'}
                    aria-rowindex={index}
                    key={key}
                    class={this.rowClass(data)}
                    onClick={this.emitRowClick({
                        index,
                        key,
                        data,
                    })}
                    tabindex={'-1'}
                >
                    {this.renderCells(data, key, index)}
                </Link>
            );
        }

        return (
            <div
                role={'row'}
                aria-rowindex={index}
                key={key}
                class={this.rowClass(data)}
                onClick={this.emitRowClick({
                    index,
                    key,
                    data,
                })}
                tabindex={'-1'}
            >
                {this.renderCells(data, key, index)}
            </div>
        );
    };

    private renderCells = (data: any, key: string, index: number) =>
        this.getColumnGroups().map(([_, cells], groupIndex, groups) =>
            cells.map(([name, cell], cellIndex, cells) => {
                const focusCell =
                    groupIndex === 0 &&
                    cellIndex === 0 &&
                    (!!this.rowTakesFocus || !!this.linkRowTo);

                return (
                    <div
                        role={'cell'}
                        tabindex={focusCell ? '0' : undefined}
                        onKeyDown={
                            focusCell
                                ? this.focusCellKeyPress({
                                      index,
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
                        {cell.cell
                            ? h(cell.cell, {
                                  key,
                                  data,
                                  parent: this.identifier,
                              })
                            : autoExtract(data, name)}
                    </div>
                );
            }),
        );

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
                {this.rows?.map(this.renderRowGroup)}
            </Host>
        );
    }

    private focusCellKeyPress = (data: ClickRow) => (e: KeyboardEvent) => {
        if (e.code !== 'Space' && e.code !== 'Enter') return;

        this.clickRow.emit(data);
        if (this.linkRowTo) {
            const link = this.linkRowTo(data);
            router.history?.push(link);
        }
    };

    private emitRowClick = (data: ClickRow) => () => {
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
