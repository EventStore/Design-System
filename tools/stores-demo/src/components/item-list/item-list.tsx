import { Component, h, Host, Element } from '@stencil/core';
import { addItem } from 'stores/recordStore/actions';
import { recordStore } from 'stores/recordStore/recordStore';

@Component({
    tag: 'item-list',
    styleUrl: 'item-list.css',
    shadow: true,
})
export class ItemList {
    @Element() host: HTMLSingleItemElement;

    componentDidRender() {
        this.host.style.removeProperty('transition');
        this.host.style.setProperty('background-color', 'pink');
        requestAnimationFrame(() => {
            this.host.style.setProperty('transition', 'all 1000ms ease');
            this.host.style.setProperty('background-color', 'transparent');
        });
    }

    render() {
        // eslint-disable-next-line no-console
        console.log('render item-list');
        return (
            <Host>
                {Object.keys(recordStore).map((id) => (
                    <single-item itemId={id} key={id} />
                ))}
                <form onSubmit={this.onSubmit}>
                    <label>
                        <span>{'Add item'}</span>
                        <input type={'text'} name={'add'} />
                        <button type={'submit'}>{'add'}</button>
                    </label>
                </form>
            </Host>
        );
    }

    private onSubmit = (e: any) => {
        e.preventDefault();
        const data = new FormData(e.target);
        const itemName = data.get('add').toString().trim();
        addItem(itemName.length ? itemName : 'No name');
        e.target.reset();
        e.target.querySelector('input')?.focus();
    };
}
