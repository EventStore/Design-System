import { Component, h, Prop, Host } from '@stencil/core';
import type { TableCells, TableCell } from '../types';
import { autoExtract } from '../utils/autoExtract';

/** Render a single row data as a grid of information. */
@Component({
    tag: 'es-table-detail',
    styleUrl: 'es-table-detail.css',
    shadow: false,
})
export class TableDetail {
    /** Passed to cell renderer as `parent`. */
    @Prop() identifier: string = 'detail';
    /** The data to render. */
    @Prop() data!: any;
    /** A record of table cell definitions. */
    @Prop() cells!: TableCells<any, any>;
    /** The order and keys of the cells to be rendered. If omitted, all cells will be rendered. */
    @Prop() columns?: Array<string>;
    /** Indicates if the loading indicators should be displayed */
    @Prop() loading?: boolean;

    private renderCell = (name: string) => {
        const cell = this.getCell(name);

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
                data: this.data,
                key: name,
                parent: this.identifier,
            });
        } else {
            return autoExtract(this.data, name);
        }
    };

    render() {
        const columns =
            this.columns ||
            Object.keys(this.cells).filter((name) => name !== 'actions');

        return (
            <Host>
                <dl class={{ loading: !!this.loading }}>
                    {columns.map((name) => {
                        const {
                            title,
                            variant,
                            align = 'start',
                        } = this.getCell(name);
                        const variants =
                            typeof variant === 'string'
                                ? [variant]
                                : variant ?? [];

                        return (
                            <div
                                class={{
                                    cell: true,
                                    full_width: variants.includes('full-width'),
                                    [align]: align !== 'start',
                                }}
                            >
                                <dt>{title}</dt>
                                <dd>{this.renderCell(name)}</dd>
                            </div>
                        );
                    })}
                </dl>
            </Host>
        );
    }

    private getCell = (col: string): TableCell<unknown> => {
        return this.cells[col] ?? { title: '' };
    };
}
