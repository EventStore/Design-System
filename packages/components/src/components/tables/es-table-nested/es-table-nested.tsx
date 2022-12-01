import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    State,
    Fragment,
} from '@stencil/core';
import { ICON_NAMESPACE } from '../../../icons/namespace';
import type { RenderFunction } from '../../../types';
import type { TableCells } from '../types';

/** Create a nested table from data. */
@Component({
    tag: 'es-table-nested',
    styleUrl: 'es-table-nested.css',
    shadow: false,
})
export class TableNested {
    /** Passed to cell renderer as `parent`. */
    @Prop() outerIdentifier: string = 'table';
    /** Sync function for extracting the data from the row. By default, it assumes you passed an array of data as your columns. */
    @Prop() getCellData?: (key: string) => any;
    /** A record of table cell definitions.Some built in cells are cells are available for use:
     * - `--borderless`: A blank placeholder cell with no border, for aligning with the parent cell.
     * - `--no-pad`: A blank placeholder cell, for aligning with the parent cell.
     * - `expander`: The expander button.
     */
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

    /** Passed to cell renderer as `parent`. */
    @Prop() nestedIdentifier: string = 'nested-table';
    /** The order and keys of the cells to be rendered in a nested table. If omitted, all cells will be rendered. */
    @Prop() nestedColumns?: string[];
    /** Sync function for extracting a list of rows for the nested table */
    @Prop() getNestedRows?: (key: string, count: number) => any[] | undefined;
    /** Sync function for extracting the data from the nested row. By default, it assumes you passed an array of data as your columns. */
    @Prop() getNestedCellData?: (key: string) => any;
    /** async function for loading nested data when a row is expanded. */
    @Prop() loadNested?: (key: string, data: any) => Promise<void>;
    /** If the nested rows should be allowed to take focus. */
    @Prop() nestedRowTakesFocus?: boolean;
    /** Function to decide if a row can take expand, to show a nested table. */
    @Prop() canExpand: (key: string, data: any) => boolean = () => true;
    /** Function to decide if a row can expand more, to show more rows in the nested table. */
    @Prop() canExpandMore: (key: string, count: number) => boolean = () =>
        false;
    /** Number number of rows to display in expansion  */
    @Prop() expandBy: number = 10;

    /** A path to a the currently active row, to auto expand its parent and show it as selected. */
    @Prop() activePath?: string[];

    @State() expanded: Map<string, number> = new Map();
    @State() loading: Set<string> = new Set();

    /** Triggered whenever a row (or nested row) is clicked. The `detail` is the item in the row array. */
    @Event() clickRow!: EventEmitter<any>;
    /** Triggered whenever a row is expanded. */
    @Event() expansion!: EventEmitter<{ data: any; key: string }>;

    renderExpansion = (depth: number): RenderFunction<[key: string]> => (
        h,
        key,
    ) => {
        const expanded = this.expanded.has(key);
        const nestedActive =
            !expanded && this.activePath && this.activePath[depth] === key
                ? this.activePath[depth + 1]
                : false;
        if (!expanded && !nestedActive) return null;

        const count = this.expanded.get(key) ?? this.expandBy;
        const canExpandMore = !nestedActive && this.canExpandMore(key, count);

        return (
            <Fragment>
                <es-table
                    headless
                    class={{ nested: true, can_expand_more: canExpandMore }}
                    rowTakesFocus={
                        this.nestedRowTakesFocus ?? this.rowTakesFocus
                    }
                    identifier={this.nestedIdentifier}
                    getCellData={this.getNestedCellData ?? this.getCellData}
                    cells={this.cellsWithExpander()}
                    columns={this.nestedColumns ?? this.columns}
                    rows={
                        nestedActive
                            ? [nestedActive]
                            : this.getNestedRows?.(key, count) ?? []
                    }
                    renderExpansion={this.renderExpansion(depth + 1)}
                    rowClass={this.rowClass}
                />
                {canExpandMore && (
                    <es-button
                        class={'expand_more'}
                        variant={'minimal'}
                        onClick={this.expandMore(key, count)}
                    >
                        {`Show next ${this.expandBy} rows`}
                    </es-button>
                )}
            </Fragment>
        );
    };

    render() {
        return (
            <es-table
                rowTakesFocus={this.rowTakesFocus}
                identifier={this.outerIdentifier}
                getCellData={this.getCellData}
                cells={this.cellsWithExpander()}
                columns={this.columns}
                rows={this.rows}
                renderExpansion={this.renderExpansion(0)}
                rowClass={this.rowClass}
            />
        );
    }

    private toggleExpansion = (key: string, data: any) => async (
        e: MouseEvent,
    ) => {
        e.stopPropagation();

        if (this.loading.has(key)) return;

        if (this.expanded.has(key)) {
            this.expanded.delete(key);
            this.expanded = new Map(this.expanded);
            return;
        }

        if (!this.loadNested) {
            this.expanded.set(key, this.expandBy);
            this.expanded = new Map(this.expanded);
            return;
        }

        this.loading.add(key);
        this.loading = new Set(this.loading);

        await this.loadNested(key, data);

        this.loading.delete(key);
        this.loading = new Set(this.loading);

        this.expanded.set(key, this.expandBy);
        this.expanded = new Map(this.expanded);
    };

    private expandMore = (key: string, currentCount: number) => async (
        e: MouseEvent,
    ) => {
        e.stopPropagation();

        this.expanded.set(key, currentCount + this.expandBy);
        this.expanded = new Map(this.expanded);
    };

    private cellsWithExpander = (): TableCells<unknown> => ({
        '--': {
            title: '',
            variant: 'borderless',
        },
        '--borderless': {
            title: '',
            variant: 'borderless',
        },
        '--no-pad': {
            title: '',
            variant: 'no-pad',
        },
        expander: {
            title: '',
            width: '50px',
            variant: 'no-pad',
            cell: (h, { data, key }) => {
                if (!this.canExpand(key, data)) return null;
                return (
                    <es-button
                        class={'expander'}
                        variant={'minimal'}
                        onClick={this.toggleExpansion(key, data)}
                    >
                        <es-icon
                            size={18}
                            icon={
                                this.loading.has(key)
                                    ? [ICON_NAMESPACE, 'spinner']
                                    : [ICON_NAMESPACE, 'chevron']
                            }
                            angle={this.expanded.has(key) ? 180 : 0}
                        />
                    </es-button>
                );
            },
        },
        ...this.cells,
    });
}
