import { Component, h, Host } from '@stencil/core';

import icons from '../../icons/icons.json';

@Component({
    tag: 'docs-icons',
    styleUrl: 'icons.css',
    shadow: true,
})
export class Icons {
    render() {
        return (
            <Host>
                {Object.keys(icons.icons).map((name) => (
                    <span>
                        <es-icon icon={name} />
                        {name}
                    </span>
                ))}
            </Host>
        );
    }
}
