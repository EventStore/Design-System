import { Component, h, Host } from '@stencil/core';

/**
 * A header for `es-panel`.
 * @slot actions - Place clickable actions for the panel.
 * @part title - The title of the panel
 * @part actions - The actions area.
 */
@Component({
    tag: 'es-panel-header',
    styleUrl: 'es-panel-header.css',
    shadow: true,
})
export class YPanelHeader {
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
