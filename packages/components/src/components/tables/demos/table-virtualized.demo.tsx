import { Component, h, Host } from '@stencil/core';
import type { TableCells } from '../types';

interface DummyData {
    name: string;
    value: string;
    amount: number;
}

/**
 * Virtualized Table
 * @group Tables
 */
@Component({
    tag: 'table-virtualized-demo',
    styleUrl: './table-basic.css',
    shadow: true,
})
export class TableVirtualizedDemo {
    render() {
        return (
            <Host>
                <c2-table-virtualized
                    stickyHeader
                    cells={this.cells}
                    rowCount={1_000_000}
                    getCellData={this.getCellData}
                    ref={this.captureTable}
                />
                <c2-button
                    onClick={this.jumpToRandom}
                    style={{ position: 'fixed', bottom: '20px', right: '20px' }}
                >
                    {'Jump to random'}
                </c2-button>
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

    private table?: HTMLC2TableVirtualizedElement;
    private captureTable = (r?: HTMLC2TableVirtualizedElement) => {
        this.table = r;
    };

    private jumpToRandom = () => {
        if (!this.table) return;
        const index = Math.floor(Math.random() * 1_000_000);
        this.table.jumpToRow(index, { smooth: 'auto', highlight: true });
    };
}
