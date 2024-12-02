import { Component, h, Host, Prop, Build } from '@stencil/core';
import { Link, router } from '@kurrent-ui/router';
import { logger } from '../../utils/logger';

import type { Crumb } from './types';

/**
 * A list of breadcrumbs to the current page
 */
@Component({
    tag: 'l2-breadcrumb',
    styleUrl: 'breadcrumb.css',
    shadow: true,
})
export class BreadCrumb {
    /** The breadcrumbs to the current page. */
    @Prop() crumbs: Crumb[] = [];
    /** Do not warn if the crumbs do not match the current router location. (Only warns in dev mode) */
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
                `<l2-breadcrumb /> doesn't match active route.
route:       ${router.location.pathname}
breadcrumb:  ${breadcrumb}`,
            );
        }
    };
}
