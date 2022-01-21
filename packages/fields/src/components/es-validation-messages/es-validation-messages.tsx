import { Component, h, Prop } from '@stencil/core';
import { theme } from '@eventstore/theme';
import { ValidationMessages } from '../../types';

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

    render() {
        const { error = [], info = [], warning = [] } = this.messages ?? {};
        if (!error.length && !info.length && !warning.length) return null;

        const showIcons = this.showIcons || theme.isHighContrast();

        return (
            <ul class={'messages'}>
                {error.map((message) => (
                    <li class={'error'}>
                        {showIcons && (
                            <es-icon icon={'es-fields-error'} size={16} />
                        )}
                        {message}
                    </li>
                ))}
                {warning.map((message) => (
                    <li class={'warning'}>
                        {showIcons && (
                            <es-icon icon={'es-fields-warning'} size={16} />
                        )}
                        {message}
                    </li>
                ))}
                {info.map((message) => (
                    <li class={'info'}>
                        {showIcons && (
                            <es-icon icon={'es-fields-info'} size={16} />
                        )}
                        {message}
                    </li>
                ))}
            </ul>
        );
    }
}
