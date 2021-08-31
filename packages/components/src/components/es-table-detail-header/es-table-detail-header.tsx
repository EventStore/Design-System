import { Component, h, Prop, Host } from '@stencil/core';
import { TableCells } from '../es-table/types';

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
    /** The key of the title in the data */
    @Prop() titleKey!: string;
    /** Which cell to place in the top right as a list of actions. */
    @Prop() actionsCell: string = 'actions';
    /** A record of table cell definitions. */
    @Prop() cells!: TableCells<any>;

    render() {
        const Actions = this.cells[this.actionsCell]?.cell;

        return (
            <Host>
                <h1 class={'header_title'}>{this.data[this.titleKey]}</h1>
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
