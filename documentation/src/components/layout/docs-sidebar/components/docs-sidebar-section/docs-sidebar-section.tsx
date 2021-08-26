import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'docs-sidebar-section',
    styleUrl: 'docs-sidebar-section.css',
    shadow: true,
})
export class SidebarSection {
    @Prop() sectionTitle!: string;
    @Prop() displayTitle: boolean = true;

    render() {
        return (
            <section>
                {this.displayTitle && <h1>{this.sectionTitle}</h1>}
                <nav>
                    <slot />
                </nav>
            </section>
        );
    }
}
