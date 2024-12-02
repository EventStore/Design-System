import { Component, h, Host } from '@stencil/core';
import { ICON_NAMESPACE } from '../../icons/namespace';

/** Display a row of five pulsing dots, to indicate loading. */
@Component({
    tag: 'c2-loading-dots',
    styleUrl: 'loading-dots.css',
    shadow: true,
})
export class LoadingDots {
    render() {
        return (
            <Host>
                <c2-icon icon={[ICON_NAMESPACE, 'dot']} size={14} />
                <c2-icon icon={[ICON_NAMESPACE, 'dot']} size={14} />
                <c2-icon icon={[ICON_NAMESPACE, 'dot']} size={14} />
                <c2-icon icon={[ICON_NAMESPACE, 'dot']} size={14} />
                <c2-icon icon={[ICON_NAMESPACE, 'dot']} size={14} />
            </Host>
        );
    }
}
