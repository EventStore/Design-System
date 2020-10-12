import { Component, h, Prop, Event, EventEmitter, State } from '@stencil/core';
import { TableCells } from '../es-table/types';

@Component({
    tag: 'es-table-nested',
    styleUrl: 'es-table-nested.css',
    shadow: false,
})
export class TableNested {
    @Prop() outerIdentifier: string = 'table';
    @Prop() getCellData?: (key: string) => any;
    @Prop() cells!: TableCells<any>;
    @Prop() columns?: string[];
    @Prop() rows!: string[];
    @Prop() linkRowTo?: (row: any) => string;
    @Prop() rowClass: (
        row: any,
    ) => Record<string, boolean> | string | undefined = () => undefined;

    @Prop() nestedIdentifier: string = 'nested-table';
    @Prop() nestedColumns?: string[];
    @Prop() getNestedRows?: (key: string) => string[] | undefined;
    @Prop() getNestedCellData?: (key: string) => any;
    @Prop() loadNested?: (key: string, data: any) => Promise<void>;
    @Prop() canExpand: (key: string, data: any) => boolean = () => true;

    @State() expanded: Set<string> = new Set();
    @State() loading: Set<string> = new Set();

    @Event() clickRow!: EventEmitter<any>;
    @Event() expansion!: EventEmitter<{ data: any; key: string }>;

    renderExpansion = (key: string) => {
        if (!this.expanded.has(key)) return null;

        return (
            <es-table
                headless
                class={'nested'}
                identifier={this.outerIdentifier}
                getCellData={this.getNestedCellData ?? this.getCellData}
                cells={this.cellsWithExpander()}
                columns={this.nestedColumns ?? this.columns}
                rows={this.getNestedRows?.(key) ?? []}
                renderExpansion={this.renderExpansion}
                rowClass={this.rowClass}
            />
        );
    };

    render() {
        return (
            <es-table
                identifier={this.outerIdentifier}
                getCellData={this.getCellData}
                cells={this.cellsWithExpander()}
                columns={this.columns}
                rows={this.rows}
                renderExpansion={this.renderExpansion}
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
            this.expanded = new Set(this.expanded);
            return;
        }

        if (!this.loadNested) {
            this.expanded.add(key);
            this.expanded = new Set(this.expanded);
            return;
        }

        this.loading.add(key);
        this.loading = new Set(this.loading);

        await this.loadNested(key, data);

        this.loading.delete(key);
        this.loading = new Set(this.loading);

        this.expanded.add(key);
        this.expanded = new Set(this.expanded);
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
            cell: ({ data, key }) => {
                if (!this.canExpand(key, data)) return null;
                return (
                    <es-button
                        class={'expander'}
                        variant={'minimal'}
                        onClick={this.toggleExpansion(key, data)}
                    >
                        <es-icon
                            size={18}
                            icon={this.loading.has(key) ? 'spinner' : 'chevron'}
                            angle={this.expanded.has(key) ? 180 : 0}
                        />
                    </es-button>
                );
            },
        },
        ...this.cells,
    });
}
