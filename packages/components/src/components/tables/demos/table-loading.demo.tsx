import { Component, h, State } from '@stencil/core';
import { router } from '@eventstore-ui/router';
import type { TableCells } from '../types';

interface DummyData {
    name: string;
    value: string;
    amount: number;
}

/** es-table demo with 3 es-loading-text lines. */
@Component({
    tag: 'es-table-loading-demo',
    styleUrl: './table-basic.css',
    shadow: true,
})
export class TableLoadingDemo {
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

    componentWillLoad() {
        router.init();
    }

    render() {
        return (
            <es-table
                cells={this.cells}
                rows={this.data}
                linkRowTo={() => '#'}
                rowClass={() => 'selectable'}
                loading={true}
                loadingRows={3}
            />
        );
    }

    private cells: TableCells<DummyData> = {
        name: {
            title: 'Name',
            expectedLength: 50,
            variance: 20
        },
        value: {
            title: 'Value',
            cell: (h, { data }) => (
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
