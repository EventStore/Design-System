import { Component, h, Prop, Host } from '@stencil/core';
import { TableCells } from '../es-table/types';

@Component({
    tag: 'es-table-detail-header',
    styleUrl: 'es-table-detail-header.css',
    shadow: false,
})
export class TableDetailHeader {
    @Prop() identifier: string = 'detail-header';
    @Prop() data!: any;
    @Prop() titleKey!: string;
    @Prop() actionsCell: string = 'actions';
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
