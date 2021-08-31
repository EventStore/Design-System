import {
    Component,
    h,
    Prop,
    Host,
    Event,
    EventEmitter,
    VNode,
} from '@stencil/core';
import { Link, router } from '@eventstore/router';
import { TableCell, TableCells } from './types';
import { logger } from '../../utils/logger';

export type RowData = any;
export type RawRow = any;

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
    /** Sync function for extracting the data from the row. By default, it assumes you passed an array of data as your columns. */
    @Prop() getCellData: <T = RawRow>(key: T) => RowData = (d) => d;
    /** A record of table cell definitions. */
    @Prop() cells!: TableCells<RowData>;
    /** The order and keys of the cells to be rendered. If omitted, all cells will be rendered. */
    @Prop() columns?: string[];
    /** An array of rows to render. Each item in the array is passed to getCellData, to allow passing keys or other identifiers.  */
    @Prop() rows!: RawRow[];
    /** A function to calculate a href from the cell data. */
    @Prop() linkRowTo?: (row: RowData) => string;
    /** If rows should be allowed to take focus */
    @Prop() rowTakesFocus?: boolean;
    /** A function to calculate the class or classes of the row from the cellData. */
    @Prop() rowClass: (
        row: RowData,
    ) => Record<string, boolean> | string | undefined = () => undefined;
    /** Allows rendering a node after the row. */
    @Prop() renderExpansion: (key: RawRow) => VNode | null = () => null;

    /** Triggered whenever a row is clicked. The `detail` is the item in the row array. */
    @Event() clickRow!: EventEmitter<RowData>;

    private renderHeader = () => {
        if (this.headless) return null;
        return (
            <div role={'row'}>
                {this.getColumns()
                    .filter((col) => this.getCell(col).variant !== 'exclude')
                    .map((name) => (
                        <div role={'columnheader'} aria-sort="none">
                            {this.getCell(name).title}
                        </div>
                    ))}
            </div>
        );
    };

    private renderRowGroup = (key: string, i: number) => (
        <div role={'rowgroup'}>
            {this.renderRow(key, i)}
            {this.renderExpansion(key)}
        </div>
    );

    private renderRow = (key: string, i: number) => {
        const data = this.getCellData?.(key);

        if (!data) {
            logger.warn.once(
                'es-table:',
                `Data not found for cell with key ${key} at index ${i}`,
            );
            return null;
        }

        if (this.linkRowTo) {
            return (
                <Link
                    url={this.linkRowTo(data)}
                    role={'row'}
                    aria-rowindex={i}
                    key={key}
                    class={this.rowClass(data)}
                    onClick={this.emitRowClick(data)}
                    tabindex={'-1'}
                >
                    {this.renderCells(data, key)}
                </Link>
            );
        }

        return (
            <div
                role={'row'}
                aria-rowindex={i}
                key={key}
                class={this.rowClass(data)}
                onClick={this.emitRowClick(data)}
                tabindex={'-1'}
            >
                {this.renderCells(data, key)}
            </div>
        );
    };

    private renderCells = (data: any, key: string) =>
        this.getColumns().map((name, i) => {
            const { cell: Cell, variant, class: rawClasses } = this.getCell(
                name,
            );
            const value = data[name];
            const variants =
                typeof variant === 'string' ? [variant] : variant ?? [];
            const child =
                typeof value === 'string' || typeof value === 'number'
                    ? value
                    : null;

            const focusCell =
                i === 0 && (!!this.rowTakesFocus || !!this.linkRowTo);

            const classes =
                typeof rawClasses === 'function'
                    ? rawClasses(data)
                    : rawClasses;

            const extraClasses = !classes
                ? {}
                : typeof classes === 'string'
                ? { [classes]: true }
                : classes;

            return (
                <span
                    role={'cell'}
                    tabindex={focusCell ? '0' : undefined}
                    onKeyDown={
                        focusCell ? this.focusCellKeyPress(data) : undefined
                    }
                    class={{
                        no_pad: variants.includes('no-pad'),
                        borderless: variants.includes('borderless'),
                        centered: variants.includes('centered'),
                        focusCell,
                        ...extraClasses,
                    }}
                >
                    {Cell ? (
                        <Cell key={key} data={data} parent={this.identifier} />
                    ) : (
                        child
                    )}
                </span>
            );
        });

    render() {
        return (
            <Host
                role={'table'}
                style={{ gridTemplateColumns: this.gridTemplateColumns() }}
            >
                {this.renderHeader()}
                {this.rows.map(this.renderRowGroup)}
            </Host>
        );
    }

    private focusCellKeyPress = (data: any) => (e: KeyboardEvent) => {
        if (e.code !== 'Space' && e.code !== 'Enter') return;

        this.clickRow.emit(data);
        if (this.linkRowTo) {
            const link = this.linkRowTo(data);
            router.history?.push(link);
        }
    };

    private emitRowClick = (data: any) => () => {
        this.clickRow.emit(data);
    };

    private getCell = (col: string): TableCell<unknown> => {
        return this.cells[col] ?? { title: '' };
    };

    private getColumns = (): string[] => {
        if (this.columns) return this.columns;
        return Object.keys(this.cells);
    };

    private gridTemplateColumns = () =>
        this.getColumns().reduce((acc, col) => {
            const cell = this.getCell(col);
            if (cell.variant === 'exclude') return acc;
            return `${acc} ${cell.width ?? 'auto'}`;
        }, '');
}
