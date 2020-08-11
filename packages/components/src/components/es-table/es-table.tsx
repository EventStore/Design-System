import { Component, h, Prop, Host, Event, EventEmitter } from '@stencil/core';
import { Link } from '@eventstore/router';
import { TableCells } from './types';

@Component({
    tag: 'es-table',
    styleUrl: 'es-table.css',
    shadow: false,
})
export class Table {
    @Prop() identifier: string = 'table';
    @Prop() data!: Record<string, any>;
    @Prop() cells!: TableCells<any>;
    @Prop() columns?: string[];
    @Prop() rows!: string[];
    @Prop() linkRowTo?: (row: any) => string;
    @Prop() rowClass: (
        row: any,
    ) => Record<string, boolean> | string | undefined = () => undefined;

    @Event() clickRow!: EventEmitter<any>;

    private emitRowClick = (data: any) => () => {
        this.clickRow.emit(data);
    };

    private renderHeader = () => (
        <div role={'row'}>
            {(this.columns || Object.keys(this.cells)).map((name) => {
                const { title } = this.cells[name];
                return (
                    <div role={'columnheader'} aria-sort="none">
                        {title}
                    </div>
                );
            })}
        </div>
    );

    private renderRow = (key: string, i: number) => {
        const data = this.data[key];

        if (this.linkRowTo) {
            return (
                <Link
                    url={this.linkRowTo(data)}
                    role={'row'}
                    aria-rowindex={i}
                    key={key}
                    class={this.rowClass(data)}
                    onClick={this.emitRowClick(data)}
                >
                    {this.renderCells(data)}
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
            >
                {this.renderCells(data)}
            </div>
        );
    };

    private renderCells = (data: any) =>
        (this.columns || Object.keys(this.cells)).map((name) => {
            const { cell: Cell } = this.cells[name];
            const value = (data as any)[name];
            const child =
                typeof value === 'string' || typeof value === 'number'
                    ? value
                    : null;

            return (
                <span role={'cell'}>
                    {Cell ? (
                        <Cell data={data} parent={this.identifier} />
                    ) : (
                        child
                    )}
                </span>
            );
        });

    render() {
        return (
            <Host role={'table'}>
                {this.renderHeader()}
                <div role={'rowgroup'}>{this.rows.map(this.renderRow)}</div>
            </Host>
        );
    }
}
