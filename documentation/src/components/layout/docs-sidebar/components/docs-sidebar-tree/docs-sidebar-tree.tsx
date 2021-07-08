import { Component, h, Prop, Host } from '@stencil/core';

@Component({
    tag: 'docs-sidebar-tree',
    styleUrl: 'docs-sidebar-tree.css',
    shadow: true,
})
export class EsSidebarTree {
    @Prop() root: boolean = false;
    @Prop() name!: string;
    @Prop() url?: string;
    @Prop() urlMatch?: string;
    @Prop() icon?: string;

    render() {
        return (
            <Host>
                {this.root ? (
                    <strong>{this.name}</strong>
                ) : (
                    <docs-sidebar-link url={this.url} urlMatch={this.urlMatch}>
                        {this.name}
                    </docs-sidebar-link>
                )}
                <div class={'children'}>
                    <slot />
                </div>
            </Host>
        );
    }
}
