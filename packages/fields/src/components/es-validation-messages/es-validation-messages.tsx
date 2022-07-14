import { Component, h, Prop } from '@stencil/core';
import { theme } from '@eventstore-ui/theme';

import type { ValidationMessages } from '../../types';
import { ICON_NAMESPACE } from '../../icons/namespace';
import type { IconDescription } from '@eventstore-ui/components';

/** Display messages under fields. */
@Component({
    tag: 'es-validation-messages',
    styleUrl: 'es-validation-messages.css',
    shadow: true,
})
export class EsValidationMessages {
    /** The messages to display. */
    @Prop() messages?: Partial<ValidationMessages>;

    /** Display icons alongside messages. */
    @Prop() showIcons: boolean = false;

    /** Icon to diplay next to errors. (if `showIcons` or high contrast) */
    @Prop() errorIcon: IconDescription = [ICON_NAMESPACE, 'error'];
    /** Icon to diplay next to warnings. (if `showIcons` or high contrast) */
    @Prop() warningIcon: IconDescription = [ICON_NAMESPACE, 'warning'];
    /** Icon to diplay next to infos. (if `showIcons` or high contrast) */
    @Prop() infoIcon: IconDescription = [ICON_NAMESPACE, 'info'];

    render() {
        const { error = [], info = [], warning = [] } = this.messages ?? {};
        if (!error.length && !info.length && !warning.length) return null;

        const showIcons = this.showIcons || theme.isHighContrast();

        return (
            <ul class={'messages'}>
                {error.map((message) => (
                    <li class={'error'}>
                        {showIcons && (
                            <es-icon icon={this.errorIcon} size={16} />
                        )}
                        {message}
                    </li>
                ))}
                {warning.map((message) => (
                    <li class={'warning'}>
                        {showIcons && (
                            <es-icon icon={this.warningIcon} size={16} />
                        )}
                        {message}
                    </li>
                ))}
                {info.map((message) => (
                    <li class={'info'}>
                        {showIcons && (
                            <es-icon icon={this.infoIcon} size={16} />
                        )}
                        {message}
                    </li>
                ))}
            </ul>
        );
    }
}
