import { Component, h, Host, Prop } from '@stencil/core';

/**
 * A header for `l2-panel`.
 * @slot actions - Place clickable actions for the panel.
 * @part title - The title of the panel
 * @part actions - The actions area.
 */
@Component({
    tag: 'l2-panel-header',
    styleUrl: 'panel-header.css',
    shadow: true,
})
export class YPanelHeader {
    /** If the panel has tabs. */
    @Prop({ reflect: true }) hasTabs: boolean = false;

    render() {
        return (
            <Host>
                <h1 part={'title'}>
                    <slot />
                </h1>
                <div part={'actions'}>
                    <slot name={'actions'} />
                </div>
            </Host>
        );
    }
}
