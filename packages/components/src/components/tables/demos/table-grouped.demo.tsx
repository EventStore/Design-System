import { Component, h, State } from '@stencil/core';
import { router } from '@eventstore-ui/router';
import type {
    ClickRowEvent,
    ClickSortEvent,
    TableCells,
    TableSort,
} from '../types';
import { logger } from '../../../utils/logger';

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

/** Header grouping es-table demo. */
@Component({
    tag: 'es-table-grouped-demo',
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
        this.applySort(this.sort);
    }

    render() {
        return (
            <es-table
                stickyHeader
                cells={this.cells}
                rows={this.keys}
                getCellData={(d) => this.getCellData(d)}
                rowClass={this.rowClass}
                sort={this.sort}
                onClickRow={this.onClickRow}
                onClickSort={this.onClickSort}
                columns={[
                    'name',
                    'type',
                    'sent_rate',
                    'sent_current',
                    'sent_pending',
                    'lorem',
                    'received_rate',
                    'received_current',
                    'received_pending',
                    'lorem',
                ]}
            />
        );
    }

    private onClickRow = (e: ClickRowEvent<DummyData>) => {
        const { name } = e.detail.data;
        this.active = name;
    };

    private rowClass = (row: DummyData) => ({
        selectable: true,
        selected: row.name === this.active,
    });

    private onClickSort = (e: ClickSortEvent) => {
        const column = e.detail;
        const [currentColumn, currentSort] = this.sort;

        if (column === currentColumn) {
            this.applySort([
                column,
                currentSort === 'ascending' ? 'descending' : 'ascending',
            ]);
        } else {
            this.applySort([column, 'ascending']);
        }
    };

    private columnToSort = (id: string): keyof DummyData => {
        switch (id) {
            case 'name':
                return id;
            case 'sent_rate':
            case 'sent_current':
            case 'sent_pending':
            case 'received_rate':
            case 'received_current':
            case 'received_pending':
                return 'amount';
            default: {
                logger.warn(`unknown key passed to sort "${id}"`);
                return 'name';
            }
        }
    };

    private applySort = (sort: TableSort) => {
        const key = this.columnToSort(sort[0]);
        const invert = sort[1] === 'descending';
        this.sort = sort;
        this.keys = this.keys.sort((aa, bb) => {
            const a = this.getCellData(aa)[key];
            const b = this.getCellData(bb)[key];
            if (a > b) return invert ? -1 : 1;
            if (b > a) return invert ? 1 : -1;
            return 0;
        });
    };

    private getCellData = (k: string) => this.data.get(k)!;

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
        received_rate: {
            sortable: true,
            group: 'Received (Bytes)',
            title: 'Rate (Bytes/s)',
            cell: ({ data }) => `${data.amount}`,
        },
        received_current: {
            sortable: true,
            group: 'Received (Bytes)',
            title: 'Current',
            cell: ({ data }) => `${data.amount * 10_000}`,
        },
        received_pending: {
            sortable: true,
            group: 'Received (Bytes)',
            title: 'Pending',
            cell: ({ data }) => `${Math.floor(data.amount / 10)}`,
        },
        lorem: {
            title: 'Lorem',
            cell: ({ data }) => data.value,
        },
    };
}
