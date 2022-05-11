import { Component, h, Prop, Host } from '@stencil/core';
import type { IconDescription } from '../../components/es-icon/types';
import { ICON_NAMESPACE } from '../../icons/namespace';

export type Status = 'critical' | 'degraded' | 'okay';

/** @internal This is soon to be replaced */
@Component({
    tag: 'es-status',
    styleUrl: 'es-status.css',
    shadow: true,
})
export class EsStatus {
    @Prop() status!: Status;

    render() {
        return (
            <Host class={this.status}>
                <es-icon icon={this.icon} size={16} />
                <span>{this.text}</span>
            </Host>
        );
    }

    public get icon(): IconDescription {
        switch (this.status) {
            case 'critical':
                return [ICON_NAMESPACE, 'critical'];
            case 'degraded':
                return [ICON_NAMESPACE, 'degraded'];
            case 'okay':
            default:
                return [ICON_NAMESPACE, 'okay'];
        }
    }

    public get text(): string {
        switch (this.status) {
            case 'critical':
                return 'Critical';
            case 'degraded':
                return 'Degraded';
            case 'okay':
                return 'OK';
            default:
                return 'Unknown';
        }
    }
}
