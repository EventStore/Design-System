import { Link } from '@eventstore-ui/router';
import { Component, h, Host } from '@stencil/core';
import { sitemap } from 'sitemap';

@Component({
    tag: 'docs-home',
    styleUrl: 'home.css',
    shadow: true,
})
export class DocsHome {
    render() {
        return (
            <Host>
                {sitemap.sections.map(({ title, children }) => (
                    <section key={title}>
                        <h1>{title}</h1>
                        <div class={'nav_grid'}>
                            {children.map((slug) => {
                                const { title, packageJson } =
                                    sitemap.libs[slug];
                                return (
                                    <acticle
                                        key={title}
                                        class={'nav_grid_item'}
                                    >
                                        <Link url={`/${slug}`}>
                                            {packageJson.deprecated && (
                                                <es-corner-banner x={'right'}>
                                                    {'deprecated'}
                                                </es-corner-banner>
                                            )}
                                            <es-icon
                                                icon={packageJson.name}
                                                size={24}
                                            />
                                            <h1>{title}</h1>
                                            <span class={'package_name'}>
                                                {packageJson.name}
                                            </span>
                                            <p>{packageJson.description}</p>
                                        </Link>
                                    </acticle>
                                );
                            })}
                        </div>
                    </section>
                ))}
            </Host>
        );
    }
}
