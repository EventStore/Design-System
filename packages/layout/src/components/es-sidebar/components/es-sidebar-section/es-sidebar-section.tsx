import { Component, h, Prop } from '@stencil/core';

/**
 * A sidebar section with an optional title
 */
@Component({
    tag: 'es-sidebar-section',
    styleUrl: 'es-sidebar-section.css',
    shadow: true,
})
export class SidebarSection {
    /** Optionally renders a title */
    @Prop() sectionTitle?: string;

    render() {
        return (
            <section>
                {!!this.sectionTitle && <h1>{this.sectionTitle}</h1>}
                <nav>
                    <slot />
                </nav>
            </section>
        );
    }
}
