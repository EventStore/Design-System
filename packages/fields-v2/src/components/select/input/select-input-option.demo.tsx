import { Component, h, Host, Prop } from '@stencil/core';
import { ICON_NAMESPACE } from 'icons/namespace';

/** @internal. */
@Component({
    tag: 'select-option-demo',
    shadow: true,
})
export class Demo {
    @Prop() name: string = 'Trash';
    @Prop() value: string = 'trash';

    render() {
        return (
            <Host style={{ padding: '2px', display: 'flex', gap: '10px' }}>
                <es-icon icon={[ICON_NAMESPACE, this.value]} />
                {this.name}
            </Host>
        );
    }
}
