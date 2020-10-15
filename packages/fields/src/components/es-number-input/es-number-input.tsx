import { Component, h, Prop, Event, EventEmitter } from '@stencil/core';
import { ValidationMessages } from '../../types';
import { Field } from '../Field/Field';
@Component({
    tag: 'es-number-input',
    styleUrl: 'es-number-input.css',
    shadow: true,
})
export class EsNumberInput {
    @Event({ bubbles: true }) fieldchange!: EventEmitter;
    @Event() enter!: EventEmitter;

    @Prop() label!: string;
    @Prop() name!: string;
    @Prop() value!: string;
    @Prop() placeholder?: string;
    @Prop() disabled?: boolean;
    @Prop() readonly?: boolean;
    @Prop() invalid?: boolean;
    @Prop() messages?: ValidationMessages;
    @Prop() unit?: string;

    render() {
        return (
            <Field
                label={this.label}
                invalid={this.invalid}
                messages={this.messages}
            >
                <div class={'input_wrapper'}>
                    <input
                        class={'input'}
                        type={'text'}
                        inputmode={'numeric'}
                        onInput={this.onChange}
                        onKeyDown={this.onKeyDown}
                        onKeyUp={this.onKeyUp}
                        placeholder={this.placeholder}
                        disabled={this.disabled}
                        readonly={this.readonly}
                        value={this.value}
                    />
                    {!!this.unit && <span class={'unit'}>{this.unit}</span>}
                </div>
                <slot />
            </Field>
        );
    }

    private onKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
            const target = e.target as HTMLInputElement;
            const n = Number(target?.value);

            if (!Number.isNaN(n)) {
                const amount = e.shiftKey ? 0.1 : 1;
                target.value = `${n + amount * (e.key === 'ArrowUp' ? 1 : -1)}`;
                e.preventDefault();
                this.onChange(e);
            }
        }

        if (
            e.ctrlKey ||
            e.metaKey ||
            e.key.length > 1 ||
            /[0-9.]/.test(e.key)
        ) {
            return;
        }

        e.preventDefault();
    };

    private onKeyUp = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
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
