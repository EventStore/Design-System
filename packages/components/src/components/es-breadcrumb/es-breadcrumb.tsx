import { Component, h, Host, Prop } from '@stencil/core';
import { Link } from '@eventstore/router';

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

    render() {
        let track = '';

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
}
