import { Component, h, Prop } from '@stencil/core';
import { ValidationMessages } from '../../types';

@Component({
    tag: 'es-validation-messages',
    styleUrl: 'es-validation-messages.css',
    shadow: true,
})
export class EsValidationMessages {
    @Prop() messages?: Partial<ValidationMessages>;

    render() {
        const { error = [], info = [], warning = [] } = this.messages ?? {};
        if (!error.length && !info.length && !warning.length) return null;

        return (
            <ul class={'messages'}>
                {error.map((message) => (
                    <li class={'error'}>{message}</li>
                ))}
                {warning.map((message) => (
                    <li class={'warning'}>{message}</li>
                ))}
                {info.map((message) => (
                    <li class={'info'}>{message}</li>
                ))}
            </ul>
        );
    }
}
