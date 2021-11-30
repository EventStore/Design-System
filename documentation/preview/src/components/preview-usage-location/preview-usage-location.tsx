import { Component, h, Prop, Host } from '@stencil/core';
import type { LocationSegments, Router } from '@eventstore/router';

@Component({
    tag: 'preview-usage-location',
    styleUrl: 'preview-usage-location.css',
    shadow: true,
})
export class PreviewLocation {
    @Prop() router!: Router;
    @Prop() location?: LocationSegments;

    render() {
        return (
            <Host>
                <span class={'title'}>
                    {'Title: '}
                    {window.document.title}
                </span>
                <span class={'pathname'}>
                    {'Path: '}
                    {this.router.history?.createHref(this.location!)}
                </span>
            </Host>
        );
    }
}
