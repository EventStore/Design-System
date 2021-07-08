import { Link } from '@eventstore/router';
import { Component, h, Host } from '@stencil/core';
import { sitemap } from 'sitemap';

@Component({
    tag: 'docs-home',
    styleUrl: 'docs-home.css',
    shadow: true,
})
export class DocsHome {
    render() {
        return (
            <Host>
                {sitemap.map(({ title, children }) => (
                    <section key={title}>
                        <h1>{title}</h1>
                        <div class={'nav_grid'}>
                            {children.map(({ title, slug, packageJson }) => (
                                <acticle key={title} class={'nav_grid_item'}>
                                    <Link url={`/${slug}`}>
                                        <es-icon icon={packageJson.name} />
                                        <h1>{title}</h1>
                                        <span class={'package_name'}>
                                            {packageJson.name}
                                        </span>

                                        <p>{packageJson.description}</p>
                                        <div class={'version'}>
                                            {packageJson.version}
                                        </div>
                                    </Link>
                                </acticle>
                            ))}
                        </div>
                    </section>
                ))}
            </Host>
        );
    }
}
