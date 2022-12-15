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

    private renderHeader = (title?: string) => <dt>{title}</dt>;
    private renderCell = (name: string, renderCell: TableCell<any>['cell']) => (
        <dd>
            {renderCell
                ? renderCell(h, {
                      data: this.data,
                      key: name,
                      parent: this.identifier,
                  })
                : autoExtract(this.data, name)}
        </dd>
    );

    render() {
        const columns =
            this.columns ||
            Object.keys(this.cells).filter((name) => name !== 'actions');

        return (
            <Host>
                <dl>
                    {columns.map((name) => {
                        const {
                            title,
                            variant,
                            cell,
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
                                {this.renderHeader(title)}
                                {this.renderCell(name, cell)}
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
