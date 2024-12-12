import { Component, h, Host, Fragment } from '@stencil/core';
import type { ButtonVariant } from '../types';
import { K_COMPONENTS_ICON_NAMESPACE, type IconDescription } from '../../..';

/**
 * Button
 * @group Buttons
 */
@Component({
    tag: 'buttons-demo',
    styleUrl: './button-demo.css',
    shadow: true,
})
export class Demo {
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
                        <c2-button variant={variant} onClick={this.handleClick}>
                            <c2-icon icon={this.randomIcon()} slot={'after'} />
                            {`${variant} variant`}
                        </c2-button>
                        <c2-button variant={variant} onClick={this.handleClick}>
                            <c2-icon icon={this.randomIcon()} size={22} />
                        </c2-button>
                        <c2-button
                            variant={variant}
                            onClick={this.handleClick}
                            disabled
                        >
                            <c2-icon icon={this.randomIcon()} slot={'after'} />
                            {`${variant} (disabled)`}
                        </c2-button>
                    </>
                ))}
            </Host>
        );
    }

    private handleClick = (...args: unknown[]) => {
        // eslint-disable-next-line no-console
        console.log(...args);
    };

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
