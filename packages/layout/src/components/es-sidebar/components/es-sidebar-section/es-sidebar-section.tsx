import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'es-sidebar-section',
    styleUrl: 'es-sidebar-section.css',
    shadow: true,
})
export class SidebarSection {
    @Prop() sectionTitle!: string;
    render() {
        return (
            <section>
                <h1>{this.sectionTitle}</h1>
                <nav>
                    <slot />
                </nav>
            </section>
        );
    }
}
