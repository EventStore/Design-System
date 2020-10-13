import { Component, h, Prop, Host } from '@stencil/core';
import { TableCells, TableCell } from '../es-table/types';

@Component({
    tag: 'es-table-detail',
    styleUrl: 'es-table-detail.css',
    shadow: false,
})
export class TableDetail {
    @Prop() identifier: string = 'detail';
    @Prop() data!: any;
    @Prop() cells!: TableCells<any>;
    @Prop() columns?: Array<string>;

    private renderHeader = (title: string) => <dt>{title}</dt>;

    private renderCell = (name: string, Cell: TableCell<any>['cell']) => {
        const value = this.data[name];
        const child =
            typeof value === 'string' || typeof value === 'number'
                ? value
                : null;

        return (
            <dd>
                {Cell ? (
                    <Cell
                        data={this.data}
                        key={name}
                        parent={this.identifier}
                    />
                ) : (
                    child
                )}
            </dd>
        );
    };

    render() {
        const columns =
            this.columns ||
            Object.keys(this.cells).filter((name) => name !== 'actions');

        return (
            <Host>
                <dl>
                    {columns.map((name) => {
                        const { title, variant, cell } = this.getCell(name);
                        const variants =
                            typeof variant === 'string'
                                ? [variant]
                                : variant ?? [];
                        return (
                            <div
                                class={{
                                    cell: true,
                                    full_width: variants.includes('full-width'),
                                    centered: variants.includes('centered'),
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
