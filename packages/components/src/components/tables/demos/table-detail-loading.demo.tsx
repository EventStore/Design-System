import { Component, h, Host, State } from '@stencil/core';

import type { TableCells } from '../types';

interface DummyData {
    name: string;
    value: string;
    amount: number;
}

/**
 * Table Detail Loading
 * @group Tables
 */
@Component({
    tag: 'table-detail-loading-demo',
    styleUrl: './table-basic.css',
    shadow: true,
})
export class TableDetailLoadingDemo {
    @State() data: DummyData = {
        name: 'test',
        value: 'something here',
        amount: 12,
    };

    render() {
        return (
            <Host>
                <c2-table-detail-header
                    titleCell={'name'}
                    data={this.data}
                    cells={this.cells}
                />
                <c2-table-detail data={this.data} cells={this.cells} loading />
            </Host>
        );
    }

    private cells: TableCells<DummyData> = {
        name: {
            title: 'Name',
            expectedLength: 50,
            variance: 20,
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
        actions: {
            title: 'Amount',
            cell: (h) => <c2-button>{'Hello'}</c2-button>,
        },
    };
}
