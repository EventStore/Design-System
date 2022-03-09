import { Component, h, Prop } from '@stencil/core';
import { theme } from '@eventstore/theme';

import { ValidationMessages } from '../../types';
import { ES_FIELDS } from '../../icons/namespace';
import { IconDescription } from '@eventstore/components';

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
    @Prop() errorIcon: IconDescription = [ES_FIELDS, 'error'];
    /** Icon to diplay next to warnings. (if `showIcons` or high contrast) */
    @Prop() warningIcon: IconDescription = [ES_FIELDS, 'warning'];
    /** Icon to diplay next to infos. (if `showIcons` or high contrast) */
    @Prop() infoIcon: IconDescription = [ES_FIELDS, 'info'];

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
