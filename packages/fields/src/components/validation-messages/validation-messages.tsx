import { Component, h, Prop, Host } from '@stencil/core';
import type { IconDescription } from '@kurrent-ui/components';

import type { ValidationMessages } from 'types';
import { ICON_NAMESPACE } from 'icons/namespace';
import { theme } from '@kurrent-ui/theme';

/** Display messages under fields. */
@Component({
    tag: 'f2-validation-messages',
    styleUrl: 'validation-messages.css',
    shadow: true,
})
export class EsValidationMessages {
    /** The messages to display. */
    @Prop() messages?: ValidationMessages;

    /** Icon to diplay next to errors. (if `showIcons` or high contrast) */
    @Prop() errorIcon: IconDescription = [ICON_NAMESPACE, 'error'];
    /** Icon to diplay next to warnings. (if `showIcons` or high contrast) */
    @Prop() warningIcon: IconDescription = [ICON_NAMESPACE, 'warning'];
    /** Icon to diplay next to infos. (if `showIcons` or high contrast) */
    @Prop() infoIcon: IconDescription = [ICON_NAMESPACE, 'info'];

    render() {
        const { error = [], info = [], warning = [] } = this.messages ?? {};

        if (!error.length && !info.length && !warning.length) {
            return <Host empty />;
        }

        return (
            <Host high-contrast={theme.isHighContrast()}>
                <ul class={'messages'}>
                    {error.map((message) => (
                        <li class={'error'}>
                            <c2-icon icon={this.errorIcon} size={16} />
                            {typeof message === 'string' ? message : message(h)}
                        </li>
                    ))}
                    {warning.map((message) => (
                        <li class={'warning'}>
                            <c2-icon icon={this.warningIcon} size={16} />
                            {typeof message === 'string' ? message : message(h)}
                        </li>
                    ))}
                    {info.map((message) => (
                        <li class={'info'}>
                            <c2-icon icon={this.infoIcon} size={16} />
                            {typeof message === 'string' ? message : message(h)}
                        </li>
                    ))}
                </ul>
            </Host>
        );
    }
}
