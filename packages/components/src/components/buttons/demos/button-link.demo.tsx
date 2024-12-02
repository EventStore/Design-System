import { Component, h, Host, Fragment } from '@stencil/core';
import { router } from '@kurrent-ui/router';

import type { ButtonVariant } from '../types';
import { K_COMPONENTS_ICON_NAMESPACE, type IconDescription } from '../../..';

/**
 * Button Link
 * @group Buttons
 */
@Component({
    tag: 'button-link-demo',
    styleUrl: './button-demo.css',
    shadow: true,
})
export class Demo {
    componentWillLoad() {
        router.init({ root: '/button-link-demo/' });
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
                        <c2-button-link variant={variant} url={'/'}>
                            <c2-icon icon={this.randomIcon()} slot={'after'} />
                            {`${variant} variant`}
                        </c2-button-link>
                        <c2-button-link variant={variant} url={'/'}>
                            <c2-icon icon={this.randomIcon()} size={22} />
                        </c2-button-link>
                        <c2-button-link variant={variant} url={'/'} disabled>
                            <c2-icon icon={this.randomIcon()} slot={'after'} />
                            {`${variant} (disabled)`}
                        </c2-button-link>
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
        'dot',
        'exclamation-mark',
        'info',
        'lightbulb',
        'more',
        'sort',
        'sorted',
        'spinner',
        'trash',
    ];

    private randomIcon = (): IconDescription => [
        K_COMPONENTS_ICON_NAMESPACE,
        this.icons[Math.floor(Math.random() * (this.icons.length - 2))],
    ];
}
