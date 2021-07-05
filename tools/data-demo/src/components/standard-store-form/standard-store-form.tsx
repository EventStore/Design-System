import { Component, h, Host } from '@stencil/core';
import { setFoo } from 'stores/standardStore/actions/setFoo';
import { toggleBar } from 'stores/standardStore/actions/toggleBar';

@Component({
    tag: 'standard-store-form',
    styleUrl: 'standard-store-form.css',
    shadow: true,
})
export class StandardStoreForm {
    render() {
        // eslint-disable-next-line no-console
        console.log('render StandardStoreForm');

        return (
            <Host>
                <label>
                    <span>{'Foo:'}</span>
                    <input type={'text'} onInput={this.changeInput} />
                </label>
                <button onClick={this.clicky}>{'toggle'}</button>
            </Host>
        );
    }

    private changeInput = (e: any) => {
        setFoo(e.target.value);
    };

    private clicky = () => {
        toggleBar();
    };
}
