import { Component, h, Host, State } from '@stencil/core';
import { router } from '@eventstore-ui/router';
import type { ClickRowEvent, TableCells, TableSort } from '../types';

interface DummyData {
    name: string;
    value: string;
    amount: number;
}

function alphabet(num: number) {
    let s = '';
    let t;
    while (num > 0) {
        t = (num - 1) % 26;
        s = String.fromCharCode(65 + t) + s;
        num = ((num - t) / 26) | 0;
    }
    return s;
}

/** Header grouping es-table-virtualized demo. */
@Component({
    tag: 'es-table-virtualized-grouped-demo',
    styleUrl: './table-basic.css',
    shadow: true,
})
export class Demo {
    private data: Map<string, DummyData> = new Map(
        Array.from({ length: 200 }, (_, i) => [
            alphabet(i + 1),
            {
                name: alphabet(i + 1),
                value: 'Something here',
                amount: Math.round(Math.random() * 20),
            },
        ]),
    );

    @State() keys: string[] = Array.from(this.data.keys());
    @State() sort: TableSort = ['name', 'ascending'];
    @State() active?: string;

    componentWillLoad() {
        router.init();
    }

    render() {
        return (
            <Host>
                <es-table-virtualized
                    stickyHeader
                    ref={this.captureTable}
                    cells={this.cells}
                    rowCount={1_000_000n}
                    getCellData={this.getCellData}
                    rowClass={this.rowClass}
                    sort={this.sort}
                    onClickRow={this.onClickRow}
                    columns={[
                        'name',
                        'type',
                        'sent_rate',
                        'sent_current',
                        'sent_pending',
                        'lorem',
                        'sent_rate',
                        'sent_current',
                        'sent_pending',
                        'lorem',
                    ]}
                />
                <es-button
                    onClick={this.jumpToRandom}
                    style={{ position: 'fixed', bottom: '20px', right: '20px' }}
                >
                    {'Jump to random'}
                </es-button>
            </Host>
        );
    }

    private table?: HTMLEsTableVirtualizedElement;
    private captureTable = (r?: HTMLEsTableVirtualizedElement) => {
        this.table = r;
    };

    private onClickRow = (e: ClickRowEvent<DummyData>) => {
        const { name } = e.detail.data;
        this.active = name;
    };

    private rowClass = (row?: DummyData) => ({
        selectable: true,
        selected: row?.name === this.active,
    });

    private getCellData = (key: string, index: bigint): DummyData => ({
        amount: Number(index),
        name: `row-${key}`,
        value: 'something here',
    });

    private cells: TableCells<DummyData> = {
        name: {
            sortable: true,
            title: 'Queue Name',
        },
        type: {
            title: 'Type',
            cell: () => 'Internal SSL',
        },
        sent_rate: {
            sortable: true,
            group: 'Sent (Bytes)',
            title: 'Rate (Bytes/s)',
            cell: ({ data }) => `${data.amount}`,
        },
        sent_current: {
            sortable: true,
            group: 'Sent (Bytes)',
            title: 'Current',
            cell: ({ data }) => `${data.amount * 10_000}`,
        },
        sent_pending: {
            sortable: true,
            group: 'Sent (Bytes)',
            title: 'Pending',
            cell: ({ data }) => `${Math.floor(data.amount / 10)}`,
        },
        lorem: {
            title: 'Lorem',
            cell: ({ data }) => data.value,
        },
    };

    private jumpToRandom = () => {
        if (!this.table) return;
        const index = BigInt(Math.floor(Math.random() * 1_000_000));
        this.table.jumpToRow(index, { smooth: 'auto', highlight: true });
    };
}
