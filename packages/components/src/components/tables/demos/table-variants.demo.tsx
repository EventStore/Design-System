import { Component, h, State } from '@stencil/core';
import type { TableCells } from '../types';

/**
 * Table Cell Variants
 * @group Tables
 */
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
                    columns={['default', 'no-pad', 'borderless', 'exclude']}
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
        'full-width': {
            title: 'full-width',
            cell: () => 'full-width',
            variant: 'full-width',
        },
        'full-width,no-pad': {
            title: 'full-width and no-pad',
            cell: () => 'full-width and no-pad',
            variant: ['full-width', 'no-pad'],
        },
        exclude: {
            title: 'exclude',
            cell: () => 'exclude',
            variant: 'exclude',
        },
    };
}
