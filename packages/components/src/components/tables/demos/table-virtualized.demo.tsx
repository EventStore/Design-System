import { Component, h, Host } from '@stencil/core';
import type { TableCells } from '../types';

interface DummyData {
    name: string;
    value: string;
    amount: number;
}

/** Basic es-table demo. */
@Component({
    tag: 'es-table-virtualized-demo',
    styleUrl: './table-basic.css',
    shadow: true,
})
export class LoadingTextDemo {
    render() {
        return (
            <Host>
                <es-table-virtualized
                    stickyHeader
                    cells={this.cells}
                    rowCount={1_000_000}
                    getCellData={this.getCellData}
                    ref={this.captureTable}
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

    private cells: TableCells<DummyData> = {
        name: {
            title: 'Name',
        },
        value: {
            title: 'Value',
        },
        amount: {
            title: 'Amount',
        },
    };

    private getCellData = (key: string, index: number): DummyData => ({
        amount: index,
        name: `row-${key}`,
        value: 'something here',
    });

    private table?: HTMLEsTableVirtualizedElement;
    private captureTable = (r?: HTMLEsTableVirtualizedElement) => {
        this.table = r;
    };

    private jumpToRandom = () => {
        if (!this.table) return;
        const index = Math.floor(Math.random() * 1_000_000);
        this.table.jumpToRow(index, { smooth: 'auto', highlight: true });
    };
}
