import { Component, h, Host, Prop, Element } from '@stencil/core';
import { recordStore } from 'stores/recordStore/recordStore';
import { removeItem, renameItem } from 'stores/recordStore/actions';

@Component({
    tag: 'single-item',
    styleUrl: 'single-item.css',
    shadow: true,
})
export class SingleItem {
    @Element() host: HTMLSingleItemElement;
    @Prop() itemId: string;

    componentDidRender() {
        this.host.style.removeProperty('transition');
        this.host.style.setProperty('background-color', 'orange');
        requestAnimationFrame(() => {
            this.host.style.setProperty('transition', 'all 1000ms ease');
            this.host.style.setProperty('background-color', 'transparent');
        });
    }

    render() {
        // eslint-disable-next-line no-console
        console.log(`render single item ${this.itemId}`);

        const item = recordStore[this.itemId];

        return (
            <Host>
                <strong>{item.name}</strong>
                <button onClick={this.removeSelf}>{'delete'}</button>
                <button onClick={this.renameSelf}>{'rename'}</button>
            </Host>
        );
    }

    private removeSelf = () => {
        removeItem(this.itemId);
    };

    private renameSelf = () => {
        renameItem(this.itemId, 'new name');
    };
}
