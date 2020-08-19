import { Component, h, Host, Prop, Build } from '@stencil/core';
import { Link, router } from '@eventstore/router';
import { logger } from '../../utils/logger';

export interface Crumb {
    path: string;
    name: string;
}

@Component({
    tag: 'es-breadcrumb',
    styleUrl: 'es-breadcrumb.css',
    shadow: true,
})
export class BreadCrumb {
    @Prop() crumbs: Crumb[] = [];
    @Prop() noValidate: boolean = false;

    render() {
        let track = '';

        if (Build.isDev && !this.noValidate) {
            this.validate();
        }

        return (
            <Host>
                {this.crumbs.map(({ name, path }, i, crumbs) => {
                    const fullPath = path.replace(/^./, track);
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

    private validate = () => {
        if (!router.location) return;

        const breadcrumb = this.crumbs.reduce(
            (track, { path }) => path.replace(/^./, track),
            '/',
        );

        if (breadcrumb !== router.location.pathname) {
            logger.warn.once(
                `<es-breadcrumb /> doesn't match active route.
route:       ${router.location.pathname}
breadcrumb:  ${breadcrumb}`,
            );
        }
    };
}
