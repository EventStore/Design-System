import { Component, h, Host, Fragment } from '@stencil/core';
import type { ButtonVariant } from '../types';
import { ES_COMPONENTS_ICON_NAMESPACE, type IconDescription } from '../../..';

/**
 * Button
 * @group Buttons
 */
@Component({
    tag: 'es-buttons-demo',
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
                        <es-button variant={variant} onClick={this.handleClick}>
                            <es-icon icon={this.randomIcon()} slot={'after'} />
                            {`${variant} variant`}
                        </es-button>
                        <es-button variant={variant} onClick={this.handleClick}>
                            <es-icon icon={this.randomIcon()} size={22} />
                        </es-button>
                        <es-button
                            variant={variant}
                            onClick={this.handleClick}
                            disabled
                        >
                            <es-icon icon={this.randomIcon()} slot={'after'} />
                            {`${variant} (disabled)`}
                        </es-button>
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
        'critical',
        'degraded',
        'dot',
        'check',
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
