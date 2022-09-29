import { Component, h, Prop, Host } from '@stencil/core';
import type { TableCells } from '../types';

/** A default header for [`es-table-detail`](/components/components/es-table-detail). */
@Component({
    tag: 'es-table-detail-header',
    styleUrl: 'es-table-detail-header.css',
    shadow: false,
})
export class TableDetailHeader {
    /** Passed to cell renderer as `parent`. */
    @Prop() identifier: string = 'detail-header';
    /** The data to render. */
    @Prop() data!: any;
    /** Which cell to place as the title */
    @Prop() titleCell: string = 'title';
    /** Which cell to place in the top right as a list of actions. */
    @Prop() actionsCell: string = 'actions';
    /** A record of table cell definitions. */
    @Prop() cells!: TableCells<any>;

    private autoExtract = (name: string) => {
        const value = this.data?.[name];
        return typeof value === 'string' || typeof value === 'number'
            ? value
            : null;
    };

    render() {
        const Actions = this.cells[this.actionsCell]?.cell;
        const Title = this.cells[this.titleCell]?.cell;

        return (
            <Host>
                <h1 class={'header_title'}>
                    {Title ? (
                        <Title
                            data={this.data}
                            parent={this.identifier}
                            key={this.identifier}
                        />
                    ) : (
                        this.autoExtract(this.titleCell)
                    )}
                </h1>
                {Actions && (
                    <div class={'header_actions'}>
                        <Actions
                            data={this.data}
                            parent={this.identifier}
                            key={this.identifier}
                        />
                    </div>
                )}
            </Host>
        );
    }
}
