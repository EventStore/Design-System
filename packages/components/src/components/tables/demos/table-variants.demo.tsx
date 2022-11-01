import { Component, h, State } from '@stencil/core';
import type { TableCells } from '../types';

/** Basic table cell variant demo. */
@Component({
    tag: 'es-table-variants',
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
                    columns={[
                        'default',
                        'no-pad',
                        'borderless',
                        'centered',
                        'exclude',
                    ]}
                />
            );
        }

        if (this.mode === 'detail') {
            return (
                <es-table-detail
                    cells={this.cells}
                    data={''}
                    columns={['default', 'no-pad', 'full-width', 'exclude']}
                />
            );
        }
    }

    private cells: TableCells<string> = {
        default: {
            title: 'default',
            cell: () => 'default',
            variant: 'default',
        },
        'no-pad': {
            title: 'no-pad',
            cell: () => 'no-pad',
            variant: 'no-pad',
        },
        borderless: {
            title: 'borderless',
            cell: () => 'borderless',
            variant: 'borderless',
        },
        centered: {
            title: 'centered',
            cell: () => 'centered',
            variant: 'centered',
        },
        'full-width': {
            title: 'full-width',
            cell: () => 'full-width',
            variant: 'full-width',
        },
        'full-width,centered': {
            title: 'full-width and centered',
            cell: () => 'full-width and centered',
            variant: ['full-width', 'centered'],
        },
        exclude: {
            title: 'exclude',
            cell: () => 'exclude',
            variant: 'exclude',
        },
    };
}
