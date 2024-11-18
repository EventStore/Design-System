import { Component, Fragment, h, State } from '@stencil/core';
import { router } from '@eventstore-ui/router';
import type { NestedTableExtraProps, TableCells, TableSort } from '../types';
import { ICON_NAMESPACE } from '../../../icons/namespace';

interface DummyData {
    name: string;
    value: string;
    amount: number;
    children?: string[];
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

/**
 * Nested Table
 * @group Tables
 */
@Component({
    tag: 'es-table-nested-demo',
    styleUrl: './table-basic.css',
    shadow: true,
})
export class Demo {
    private data: Map<string, DummyData> = new Map([
        ...Array.from({ length: 200 }, (_, i): [string, DummyData] => [
            `item-${alphabet(i + 1)}`,
            {
                name: `Item ${alphabet(i + 1)}`,
                value: 'Something here',
                amount: Math.round(Math.random() * 20),
                children:
                    Math.round(Math.random() * 12) > 4
                        ? Array.from(
                              { length: Math.round(Math.random() * 12) },
                              (_, j) => `child-${alphabet(j + 1)}`,
                          )
                        : undefined,
            },
        ]),
        ...Array.from({ length: 200 }, (_, i): [string, DummyData] => [
            `child-${alphabet(i + 1)}`,
            {
                name: `child-${alphabet(i + 1)}`,
                value: 'Something here',
                amount: Math.round(Math.random() * 20),
            },
        ]),
    ]);

    @State() keys: string[] = Array.from(this.data.keys()).filter(
        (k) => !k.startsWith('child-'),
    );
    @State() sort: TableSort = ['name', 'ascending'];
    @State() active?: string;

    componentWillLoad() {
        router.init();
    }

    render() {
        return (
            <es-table-nested
                stickyHeader
                toggleRowOnClick
                cells={this.cells}
                rows={this.keys}
                getCellData={(id) => this.data.get(id)}
                canExpand={(id) => !!this.data.get(id)?.children?.length}
                getNestedRows={(id) => this.data.get(id)!.children}
                getNestedCellData={(id) => this.data.get(id)}
                nestedIdentifier={'nested'}
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
                ]}
            />
        );
    }

    private cells: TableCells<DummyData, NestedTableExtraProps> = {
        name: {
            title: 'Queue Name',
            cell: (h, { data, canExpand, expanded }) => (
                <>
                    {data.name}
                    {canExpand && (
                        <es-icon
                            class={'expand_icon'}
                            size={18}
                            icon={[ICON_NAMESPACE, 'chevron']}
                            angle={expanded ? 180 : 0}
                        />
                    )}
                </>
            ),
        },
        type: {
            title: 'Type',
            cell: () => 'Internal SSL',
        },
        sent_rate: {
            group: 'Sent (Bytes)',
            title: 'Rate (Bytes/s)',
            align: 'end',
            cell: (_, { data }) => `${data.amount}`,
        },
        sent_current: {
            group: 'Sent (Bytes)',
            title: 'Current',
            align: 'end',
            cell: (_, { data }) => `${data.amount * 10_000}`,
        },
        sent_pending: {
            group: 'Sent (Bytes)',
            title: 'Pending',
            align: 'end',
            cell: (_, { data }) => `${Math.floor(data.amount / 10)}`,
        },
        received_rate: {
            group: 'Received (Bytes)',
            title: 'Rate (Bytes/s)',
            align: 'end',
            cell: (_, { data }) => `${data.amount}`,
        },
        received_current: {
            group: 'Received (Bytes)',
            title: 'Current',
            align: 'end',
            cell: (_, { data }) => `${data.amount * 10_000}`,
        },
        received_pending: {
            group: 'Received (Bytes)',
            title: 'Pending',
            align: 'end',
            cell: (_, { data }) => `${Math.floor(data.amount / 10)}`,
        },
        lorem: {
            title: 'Lorem',
            width: 'max-content',
            cell: (_, { data }) => data.value,
        },
    };
}
