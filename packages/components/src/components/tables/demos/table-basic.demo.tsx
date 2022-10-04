import { Component, h, State } from '@stencil/core';
import type { TableCells } from '../types';

interface DummyData {
    name: string;
    value: string;
    amount: number;
}

/** Basic es-table demo. */
@Component({
    tag: 'es-table-basic-demo',
    styleUrl: './table-basic.css',
    shadow: true,
})
export class LoadingTextDemo {
    @State() data: DummyData[] = [
        {
            name: 'test',
            value: 'something here',
            amount: 5,
        },
        {
            name: 'test',
            value: 'something here',
            amount: 12,
        },
        {
            name: 'test',
            value: 'something here',
            amount: 6,
        },
        {
            name: 'test',
            value: 'something here',
            amount: 12,
        },
    ];

    render() {
        return <es-table cells={this.cells} rows={this.data} />;
    }

    private cells: TableCells<DummyData> = {
        name: {
            title: 'Name',
        },
        value: {
            title: 'Value',
            cell: ({ data }) => (
                <div class={'some_class'}>
                    <h1>{data.amount}</h1>
                </div>
            ),
        },
        amount: {
            title: 'Amount',
            width: 'max-content',
            class: ({ amount }) => ({
                amount: true,
                large: amount >= 10,
            }),
        },
    };
}
