import {
    Component,
    h,
    Prop,
    Event,
    type EventEmitter,
    State,
    Fragment,
} from '@stencil/core';
import { ICON_NAMESPACE } from '../../../icons/namespace';
import type { RenderFunction } from '../../../types';
import type { ClickRow, NestedTableExtraProps, TableCells } from '../types';

/** Create a nested table from data. */
@Component({
    tag: 'es-table-nested',
    styleUrl: 'es-table-nested.css',
    shadow: false,
})
export class TableNested {
    /** Do not render header. */
    @Prop() headless: boolean = false;
    /** Header sticks to scroll parent. */
    @Prop() stickyHeader: boolean = false;

    /** Passed to cell renderer as `parent`. */
    @Prop() outerIdentifier: string = 'table';
    /** Sync function for extracting the data from the row. By default, it assumes you passed an array of data as your columns. */
    @Prop() getCellData?: (key: string) => any;
    /** A record of table cell definitions.Some built in cells are cells are available for use:
     * - `--borderless`: A blank placeholder cell with no border, for aligning with the parent cell.
     * - `--no-pad`: A blank placeholder cell, for aligning with the parent cell.
     * - `--expander`: The expander button.
     */
    @Prop() cells!: TableCells<any, any>;
    /** The order and keys of the cells to be rendered. If omitted, all cells will be rendered. */
    @Prop() columns?: string[] = Object.keys(this.cells);
    /** An array of rows to render. Each item in the array is passed to getCellData, to allow passing keys or other identifiers.  */
    @Prop() rows!: any[];
    /** A function to calculate a href from the cell data. */
    @Prop() linkRowTo?: (row: any) => string;
    /** If rows should be allowed to take focus */
    @Prop() rowTakesFocus?: boolean;
    /** A function to calculate the class or classes of the row from the cellData. */
    @Prop() rowClass: (
        row: any,
        key: string,
    ) => Record<string, boolean> | string | undefined = () => undefined;
    /** If clicking a row should expand it. */
    @Prop() toggleRowOnClick: boolean = false;
    /** Pass extra props to cells */
    @Prop() extraCellProps?: (key: string, data: any) => Record<string, any>;

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
    @Prop() canExpand: (key: string, data: any, depth: number) => boolean =
        () => true;
    /** Function to decide if a row can expand more, to show more rows in the nested table. */
    @Prop() canExpandMore: (key: string, count: number) => boolean = () =>
        false;
    /** Number number of rows to display in expansion  */
    @Prop() expandBy: number = 10;
    /** Number of rows to be expanded by default  */
    @Prop() defaultExpanded?: (key: string, depth: number) => number;

    /** A path to a the currently active row, to auto expand its parent and show it as selected. */
    @Prop() activePath?: string[];

    @State() expanded: Map<string, number> = new Map();
    @State() loading: Set<string> = new Set();

    /** Triggered whenever a row (or nested row) is clicked. The `detail` is the item in the row array. */
    @Event() clickRow!: EventEmitter<any>;
    /** Triggered whenever a row is expanded. */
    @Event() expansion!: EventEmitter<{ data: any; key: string }>;

    renderExpansion =
        (depth: number): RenderFunction<[key: string]> =>
        (h, key) => {
            const defaultExpanded = this.defaultExpanded?.(key, depth) ?? 0;
            const expanded = this.expanded.has(key) || defaultExpanded > 0;
            const nestedActive =
                !expanded && this.activePath && this.activePath[depth] === key
                    ? this.activePath[depth + 1]
                    : false;
            if (!expanded && !nestedActive) return null;

            const count =
                this.expanded.get(key) ?? defaultExpanded ?? this.expandBy;
            const canExpandMore =
                !nestedActive && this.canExpandMore(key, count);

            return (
                <>
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
                        rowClass={this.rowClassWithDefaults(depth + 1)}
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
                </>
            );
        };

    render() {
        return (
            <es-table
                stickyHeader={this.stickyHeader}
                headless={this.headless}
                rowTakesFocus={this.rowTakesFocus}
                identifier={this.outerIdentifier}
                getCellData={this.getCellData}
                cells={this.cellsWithExpander()}
                columns={this.columns}
                rows={this.rows}
                renderExpansion={this.renderExpansion(0)}
                rowClass={this.rowClassWithDefaults(0)}
                onClickRow={this.toggleIfRequested}
                extraCellProps={this.nestedExtraCellProps(0)}
            />
        );
    }

    private nestedExtraCellProps =
        (depth: number) =>
        (key: string, data: any): NestedTableExtraProps => ({
            canExpand: this.canExpand(key, data, depth),
            canExpandMore: this.canExpandMore(key, data),
            expanded: this.expanded.has(key),
            loading: this.loading.has(key),
            toggleExpansion: () => this.toggleExpansion(key, data),
            ...(this.extraCellProps?.(key, data) ?? {}),
        });

    private toggleExpansion = async (key: string, data: any) => {
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

    private rowClassWithDefaults =
        (depth: number) => (data: any, key: string) => {
            if (!this.canExpand(key, data, depth)) {
                return this.rowClass?.(data, key);
            }

            const classes = this.rowClass?.(data, key);
            const extraClasses = !classes
                ? {}
                : typeof classes === 'string'
                ? { [classes]: true }
                : classes;

            return {
                can_expand: true,
                can_expand_more: this.canExpandMore(
                    key,
                    this.expanded.get(key) ?? this.expandBy,
                ),
                expanded: this.expanded.has(key),
                click_to_toggle: this.toggleRowOnClick,
                ...extraClasses,
            };
        };

    private toggleIfRequested = (e: CustomEvent<ClickRow<any>>) => {
        if (!this.toggleRowOnClick) return;
        return this.toggleExpansion(e.detail.key, e.detail.data);
    };

    private expandMore =
        (key: string, currentCount: number) => async (e: MouseEvent) => {
            e.stopPropagation();

            this.expanded.set(key, currentCount + this.expandBy);
            this.expanded = new Map(this.expanded);
        };

    private cellsWithExpander = (): TableCells<
        unknown,
        NestedTableExtraProps
    > => ({
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
        '--expander': {
            title: '',
            width: '50px',
            variant: 'no-pad',
            cell: (h, { canExpand, loading, expanded, toggleExpansion }) => {
                if (!canExpand) return null;
                return (
                    <es-button
                        class={'expander'}
                        variant={'minimal'}
                        onClick={toggleExpansion}
                    >
                        <es-icon
                            size={18}
                            icon={
                                loading
                                    ? [ICON_NAMESPACE, 'spinner']
                                    : [ICON_NAMESPACE, 'chevron']
                            }
                            angle={expanded ? 180 : 0}
                        />
                    </es-button>
                );
            },
        },
        ...this.cells,
    });
}
