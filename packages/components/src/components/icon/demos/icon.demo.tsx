import { Component, h, Host } from '@stencil/core';

import icons from '../../../icons/icons.json';
import { ICON_NAMESPACE } from '../../../icons/namespace';

/** Icon */
@Component({
    tag: 'icon-demo',
    styleUrl: './icon-demo.css',
    shadow: true,
})
export class Demo {
    render() {
        return (
            <Host>
                {Object.keys(icons.icons).map((icon) => (
                    <c2-icon
                        key={icon}
                        icon={[ICON_NAMESPACE, icon]}
                        title={icon}
                    />
                ))}
            </Host>
        );
    }
}
