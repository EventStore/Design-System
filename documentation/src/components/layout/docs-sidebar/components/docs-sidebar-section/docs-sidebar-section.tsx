import { Link, Route } from '@eventstore/router';
import { Component, h, Prop } from '@stencil/core';

@Component({
    tag: 'docs-sidebar-section',
    styleUrl: 'docs-sidebar-section.css',
    shadow: true,
})
export class SidebarSection {
    @Prop() sectionTitle!: string;
    @Prop() url?: string;
    @Prop() icon?: string;
    @Prop() depth!: number;

    render() {
        console.log(this.url);

        return (
            <section>
                {this.url ? (
                    <Link url={this.url}>
                        <h1>{this.sectionTitle}</h1>
                    </Link>
                ) : (
                    <h1>{this.sectionTitle}</h1>
                )}
                <Route url={this.url}>
                    <nav>
                        <slot />
                    </nav>
                </Route>
            </section>
        );
    }
}
