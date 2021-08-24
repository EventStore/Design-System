import { Component, h, Prop, Host } from '@stencil/core';
import type { LocationSegments, router } from '@eventstore/router';

export type Router = typeof router;

@Component({
    tag: 'docs-usage-location',
    styleUrl: 'docs-usage-location.css',
    shadow: true,
})
export class DocsLocation {
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
                    {this.location?.pathname}
                </span>
            </Host>
        );
    }
}
