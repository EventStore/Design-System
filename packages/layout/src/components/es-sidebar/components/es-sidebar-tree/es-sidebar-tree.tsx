import { Component, h, Prop, Host } from '@stencil/core';

@Component({
    tag: 'es-sidebar-tree',
    styleUrl: 'es-sidebar-tree.css',
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
                    <es-sidebar-link url={this.url} urlMatch={this.urlMatch}>
                        {this.name}
                    </es-sidebar-link>
                )}
                <div class={'children'}>
                    <slot />
                </div>
            </Host>
        );
    }
}
