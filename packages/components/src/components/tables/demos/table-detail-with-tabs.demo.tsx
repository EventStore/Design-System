import { Component, h, Host, State } from '@stencil/core';

import type { TableCells } from '../types';
import type { Tab } from '../../tabs/types';

interface DummyData {
    name: string;
    value: string;
    amount: number;
}

/**
 * Table Detail With Tabs
 * @group Tables
 */
@Component({
    tag: 'table-detail-with-tabs-demo',
    styleUrl: './table-basic.css',
    shadow: true,
})
export class TableDetailDemo {
    @State() data: DummyData = {
        name: 'Test Data',
        value: 'something here',
        amount: 12,
    };

    render() {
        return (
            <Host>
                <c2-table-detail-header
                    hasTabs
                    titleCell={'name'}
                    data={this.data}
                    cells={this.cells}
                />
                <c2-tabs tabs={this.tabs}>
                    <c2-table-detail
                        slot={'details'}
                        data={this.data}
                        cells={this.cells}
                    />
                    <c2-table-detail
                        slot={'details-2'}
                        data={this.data}
                        cells={this.cells}
                        columns={['name']}
                    />
                </c2-tabs>
            </Host>
        );
    }

    private tabs: Tab[] = [
        { id: 'details', title: 'Details' },
        { id: 'details-2', title: 'More Details' },
    ];

    private cells: TableCells<DummyData> = {
        name: {
            title: 'Name',
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
