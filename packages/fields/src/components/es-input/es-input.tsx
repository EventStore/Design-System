import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ValidationMessages } from '../../types';
import { Field } from '../Field/Field';

@Component({
    tag: 'es-input',
    styleUrl: 'es-input.css',
    shadow: {
        delegatesFocus: true,
    },
})
export class EsInput {
    @Event({ bubbles: true }) fieldchange!: EventEmitter;
    @Event() enter!: EventEmitter;

    @Prop() label!: string;
    @Prop() name!: string;
    @Prop() value!: string;
    @Prop() placeholder!: string;
    @Prop() disabled?: boolean;
    @Prop() readonly?: boolean;
    @Prop() invalid?: boolean;
    @Prop() messages?: ValidationMessages;

    render() {
        return (
            <Field
                label={this.label}
                invalid={this.invalid}
                messages={this.messages}
            >
                <input
                    class={'input'}
                    value={this.value}
                    onInput={this.onChange}
                    onKeyUp={this.onKeyUp}
                    placeholder={this.placeholder}
                    disabled={this.disabled}
                    readonly={this.readonly}
                />
                <slot />
            </Field>
        );
    }

    private onKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey && !e.altKey && !e.metaKey) {
            this.enter.emit();
        }
    };

    private onChange = (e: any) => {
        this.fieldchange.emit({
            name: this.name,
            value: e?.target?.value,
        });
    };
}
