import { Component, h, Prop, Host } from '@stencil/core';

export type Status = 'critical' | 'degraded' | 'okay';

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

    public get icon(): string {
        switch (this.status) {
            case 'critical':
                return 'critical';
            case 'degraded':
                return 'degraded';
            case 'okay':
            default:
                return 'okay';
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
