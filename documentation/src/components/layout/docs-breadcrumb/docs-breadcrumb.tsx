import { Component, h, Host, Prop, Build } from '@stencil/core';
import { Link, router } from '@eventstore/router';

import { logger } from 'utils/logger';

export interface Crumb {
    path: string;
    name: string;
}

@Component({
    tag: 'docs-breadcrumb',
    styleUrl: 'docs-breadcrumb.css',
    shadow: true,
})
export class BreadCrumb {
    @Prop() crumbs: Crumb[] = [];
    @Prop() noValidate: boolean = false;

    componentDidLoad() {
        this.validate(this.crumbs);
    }

    render() {
        let track = '/';

        return (
            <Host>
                {this.crumbs.map(({ name, path }, i, crumbs) => {
                    const fullPath = path
                        .replace(/^./, track)
                        .replace(/[/]{2,}/, '/');
                    track = fullPath;
                    return [
                        <Link exact url={fullPath} key={path}>
                            {name}
                        </Link>,
                        i !== crumbs.length - 1 ? <span>{'/'}</span> : null,
                    ];
                })}
            </Host>
        );
    }

    private validate = (crumbs: Crumb[]) => {
        if (!Build.isDev || this.noValidate || !router.location) return;

        const breadcrumb = crumbs.reduce(
            (track, { path }) =>
                path.replace(/^./, track).replace(/[/]{2,}/, '/'),
            '/',
        );

        if (breadcrumb !== router.location.pathname) {
            logger.warn.once(
                `<docs-breadcrumb /> doesn't match active route.
route:       ${router.location.pathname}
breadcrumb:  ${breadcrumb}`,
            );
        }
    };
}