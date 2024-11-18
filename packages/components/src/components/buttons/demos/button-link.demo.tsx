import { Component, h, Host, Fragment } from '@stencil/core';
import { router } from '@eventstore-ui/router';

import type { ButtonVariant } from '../types';
import { ES_COMPONENTS_ICON_NAMESPACE, type IconDescription } from '../../..';

/**
 * Button Link
 * @group Buttons
 */
@Component({
    tag: 'es-button-link-demo',
    styleUrl: './button-demo.css',
    shadow: true,
})
export class Demo {
    componentWillLoad() {
        router.init({ root: '/es-button-link-demo/' });
    }

    private variants: ButtonVariant[] = [
        'default',
        'filled',
        'outline',
        'delete',
        'cancel',
        'minimal',
        'link',
    ];

    render() {
        return (
            <Host>
                {this.variants.map((variant) => (
                    <>
                        <es-button-link variant={variant} url={'/'}>
                            <es-icon icon={this.randomIcon()} slot={'after'} />
                            {`${variant} variant`}
                        </es-button-link>
                        <es-button-link variant={variant} url={'/'}>
                            <es-icon icon={this.randomIcon()} size={22} />
                        </es-button-link>
                        <es-button-link variant={variant} url={'/'} disabled>
                            <es-icon icon={this.randomIcon()} slot={'after'} />
                            {`${variant} (disabled)`}
                        </es-button-link>
                    </>
                ))}
            </Host>
        );
    }

    private icons = [
        'check',
        'chevron',
        'chevron-double',
        'circle',
        'close',
        'copy',
        'critical',
        'degraded',
        'dot',
        'exclamation-mark',
        'info',
        'lightbulb',
        'more',
        'okay',
        'sort',
        'sorted',
        'spinner',
        'trash',
    ];

    private randomIcon = (): IconDescription => [
        ES_COMPONENTS_ICON_NAMESPACE,
        this.icons[Math.floor(Math.random() * (this.icons.length - 2))],
    ];
}
