import { Component, h, State } from '@stencil/core';
import type { TableCells } from '../types';

/** Basic table cell align demo. */
@Component({
    tag: 'es-table-align',
    styleUrl: './table-basic.css',
    shadow: true,
})
export class TableVariant {
    @State() mode: string = 'table';
    @State() data: string[] = ['a', 'b', 'c', 'd'];

    render() {
        if (this.mode === 'table') {
            return (
                <es-table
                    cells={this.cells}
                    rows={this.data}
                    onClickRow={() => (this.mode = 'virtualized')}
                />
            );
        }

        if (this.mode === 'virtualized') {
            return (
                <es-table-virtualized
                    cells={this.cells}
                    rowCount={4}
                    getCellData={() => 'hello'}
                    onClickRow={() => (this.mode = 'detail')}
                />
            );
        }

        if (this.mode === 'detail') {
            return <es-table-detail cells={this.cells} data={''} />;
        }
    }

    private cells: TableCells<string> = {
        default: {
            title: 'default',
            cell: () => 'default',
            variant: 'default',
        },
        start: {
            title: 'start',
            cell: () => 'start',
            align: 'start',
        },
        center: {
            title: 'center',
            cell: () => 'center',
            align: 'center',
        },
        end: {
            title: 'end',
            cell: () => 'end',
            align: 'end',
        },
    };
}
