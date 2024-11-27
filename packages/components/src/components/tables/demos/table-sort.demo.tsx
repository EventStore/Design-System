import { Component, h, State } from '@stencil/core';
import { router } from '@kurrent-ui/router';
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

function alpha(num: number) {
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
 * Table Sorting
 * @group Tables
 */
@Component({
    tag: 'table-sort-demo',
    styleUrl: './table-basic.css',
    shadow: true,
})
export class Demo {
    private data: Map<string, DummyData> = new Map(
        Array.from({ length: 200 }, (_, i) => [
            alpha(i + 1),
            {
                name: alpha(i + 1),
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
            <c2-table
                stickyHeader
                cells={this.cells}
                rows={this.keys}
                getCellData={this.getCellData}
                rowClass={this.rowClass}
                sort={this.sort}
                onClickRow={this.onClickRow}
                onClickSort={this.onClickSort}
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
            case 'value':
            case 'amount':
                return id;
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
            title: 'Name',
        },
        value: {
            sortable: true,
            title: 'Value',
            cell: (h, { data }) => (
                <div class={'some_class'}>
                    <h1>{data.value}</h1>
                </div>
            ),
        },
        amount: {
            sortable: true,
            title: 'Amount',
            width: 'max-content',
            class: ({ amount }) => ({
                amount: true,
                large: amount >= 10,
            }),
        },
    };
}
