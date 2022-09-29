import { Component, h, Host } from '@stencil/core';
import { ICON_NAMESPACE } from '../../icons/namespace';

/** Display a row of five pulsing dots, to indicate loading. */
@Component({
    tag: 'es-loading-dots',
    styleUrl: 'es-loading-dots.css',
    shadow: true,
})
export class LoadingDots {
    render() {
        return (
            <Host>
                <es-icon icon={[ICON_NAMESPACE, 'dot']} size={14} />
                <es-icon icon={[ICON_NAMESPACE, 'dot']} size={14} />
                <es-icon icon={[ICON_NAMESPACE, 'dot']} size={14} />
                <es-icon icon={[ICON_NAMESPACE, 'dot']} size={14} />
                <es-icon icon={[ICON_NAMESPACE, 'dot']} size={14} />
            </Host>
        );
    }
}
