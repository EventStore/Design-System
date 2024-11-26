import { Component, h, Host, State, Element } from '@stencil/core';
import { bindPanelDetails, type PanelMode } from '../panel';

/**
 * A horizontal rule
 */
@Component({
    tag: 'l2-layout-hr',
    styleUrl: 'layout-hr.css',
    shadow: true,
})
export class LayoutHR {
    @Element() host!: HTMLL2LayoutSectionElement;

    @State() panelMode: PanelMode = 'inline';

    private unbindMode?: () => void;

    connectedCallback() {
        this.unbindMode?.();
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
