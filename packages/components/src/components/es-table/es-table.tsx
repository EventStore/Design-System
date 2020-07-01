import { Component, h, Prop, Host, VNode } from '@stencil/core';
import { Link } from '@eventstore/router';

export interface CellProps<T> {
    data: T;
}
export interface Col<T> {
    name: string | keyof T;
    title: string;
    cell?: (d: CellProps<T>) => string | VNode | VNode[] | null;
}

@Component({
    tag: 'es-table',
    styleUrl: 'es-table.css',
    shadow: false,
})
export class Table<T> {
    @Prop() data!: Record<string, any>;
    @Prop() columns!: Col<any>[];
    @Prop() rows!: string[];
    @Prop() linkRowTo?: (row: any) => string;
    @Prop() rowClass: (
        row: any,
    ) => Record<string, boolean> | string | undefined = () => undefined;

    private renderHeader = () => (
        <div role={'row'}>
            {this.columns!.map(({ title }) => (
                <div role={'columnheader'} aria-sort="none">
                    {title}
                </div>
            ))}
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
            >
                {this.renderCells(data)}
            </div>
        );
    };

    private renderCells = (data: T) =>
        this.columns.map(({ cell: Cell, name }) => {
            const value = (data as any)[name];
            const child =
                typeof value === 'string' || typeof value === 'number'
                    ? value
                    : null;

            return (
                <span role={'cell'}>{Cell ? <Cell data={data} /> : child}</span>
            );
        });

    render() {
        return (
            <Host role={'table'}>
                {this.columns && this.renderHeader()}
                <div role={'rowgroup'}>{this.rows.map(this.renderRow)}</div>
            </Host>
        );
    }
}
