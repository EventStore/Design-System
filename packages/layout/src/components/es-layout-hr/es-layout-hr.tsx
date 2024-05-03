import { Component, h, Host, State, Element } from '@stencil/core';
import { bindPanelDetails, type PanelMode } from '../panel';

/**
 * A horizontal rule
 */
@Component({
    tag: 'es-layout-hr',
    styleUrl: 'es-layout-hr.css',
    shadow: true,
})
export class PageTitle {
    @Element() host!: HTMLEsLayoutSectionElement;

    @State() panelMode: PanelMode = 'inline';

    private unbindMode?: () => void;

    componentWillLoad() {
        this.unbindMode = bindPanelDetails(this.host, ({ mode }) => {
            this.panelMode = mode;
        });
    }

    disconnectedCallback() {
        this.unbindMode?.();
    }

    render() {
        return <Host mode={this.panelMode} />;
    }
}
