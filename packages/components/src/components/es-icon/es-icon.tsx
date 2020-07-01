import { Component, h, Prop, Method, Element } from '@stencil/core';
import { createLogger } from '@eventstore/utils';

import * as icons from './icons';

const logger = createLogger('es-icon', 'orange');

@Component({
    tag: 'es-icon',
    styleUrl: 'es-icon.css',
    shadow: true,
})
export class Icon {
    @Element() host!: HTMLEsIconElement;

    @Prop() icon!: string;
    @Prop() size: number = 24;
    @Prop() angle: number = 0;
    @Prop() spin?: boolean;
    @Prop() spinDirection: 'clockwise' | 'antiClockwise' = 'clockwise';

    @Method() async spinEnd() {
        const spinner = this.host.shadowRoot?.querySelector('.spin');
        if (!spinner) return;
        return new Promise((resolve) => {
            const spinComplete = () => {
                spinner.removeEventListener('animationiteration', spinComplete);
                resolve();
            };
            spinner.addEventListener('animationiteration', spinComplete);
        });
    }

    render() {
        if (!icons[this.icon as keyof typeof icons]) {
            logger.log.once(`Unknown Icon '${this.icon}'`);
        }

        const Component =
            icons[this.icon as keyof typeof icons] || icons.unknown;

        return (
            <Component
                aria-hidden={'true'}
                focusable={'false'}
                role={'img'}
                height={this.size}
                width={this.size}
                class={{
                    spin: this.spin || this.icon === 'spinner',
                    antiClockwise: this.spinDirection === 'antiClockwise',
                }}
                transform={
                    this.angle !== 0 ? `rotate(${this.angle})` : undefined
                }
            />
        );
    }
}
