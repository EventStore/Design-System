import { Component, h, Prop, Host } from '@stencil/core';
import { TableCells, TableCell } from '../es-table/types';

@Component({
    tag: 'es-table-detail',
    styleUrl: 'es-table-detail.css',
    shadow: false,
})
export class TableDetail {
    @Prop() data!: any;
    @Prop() titleKey!: string;
    @Prop() cells!: TableCells<any>;
    @Prop() columns?: Array<string>;

    private renderHeader = ({ title }: TableCell<any>) => <dt>{title}</dt>;

    private renderCell = (name: string, { cell: Cell }: TableCell<any>) => {
        const value = this.data[name];
        const child =
            typeof value === 'string' || typeof value === 'number'
                ? value
                : null;

        return <dd>{Cell ? <Cell data={this.data} /> : child}</dd>;
    };

    render() {
        const columns =
            this.columns ||
            Object.keys(this.cells).filter((name) => name !== 'actions');
        const Actions = this.cells.actions.cell;

        return (
            <Host>
                <header class={'header'}>
                    <h1 class={'header_title'}>{this.data[this.titleKey]}</h1>
                    {Actions && (
                        <div class={'header_actions'}>
                            <Actions data={this.data} />
                        </div>
                    )}
                </header>
                <dl>
                    {columns.map((name) => {
                        const cell = this.cells[name];
                        return (
                            <div class={'cell'}>
                                {this.renderHeader(cell)}
                                {this.renderCell(name, cell)}
                            </div>
                        );
                    })}
                </dl>
            </Host>
        );
    }
}
