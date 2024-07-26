import { Component, h, Prop, Event, type EventEmitter } from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';
import { ICON_NAMESPACE } from '../../icons/namespace';
import type { FieldChange, ValidationMessages } from '../../types';
import { Field } from '../Field/Field';

/**
 * A multi-checkbox component
 * @part checkbox-field - Checkbox Field.
 */
@Component({
    tag: 'es-multi-checkbox',
    styleUrl: 'es-multi-checkbox.css',
    shadow: true,
})
export class EsMultiCheckbox {
    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<
        FieldChange<string | null>
    >;

    /** The label of the field. */
    @Prop() label!: string;
    /** The name of the field. */
    @Prop() name!: string;
    /** The current value of the field. */
    @Prop() value!: string | null;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** If the field is currently in an error state. */
    @Prop() invalid?: boolean;
    /** The validation messages of the field */
    @Prop() messages?: ValidationMessages;
    /** The icon to use. */
    @Prop() icon: IconDescription = [ICON_NAMESPACE, 'check'];
    /** The list of options for the checkboxes. */
    @Prop() options: { name: string; value: string }[] = [];

    render() {
        return (
            <Field
                label={this.label}
                invalid={this.invalid}
                messages={this.messages}
            >
                <div class={'checkbox-field'} part={'checkbox-field'}>
                    {this.options.map((option) => (
                        <label
                            key={option.value}
                            tabIndex={1}
                            onKeyDown={this.onKeyDown}
                        >
                            <input
                                class={'input'}
                                type={'checkbox'}
                                onChange={this.onChange}
                                value={option.value}
                                disabled={this.disabled}
                                readonly={this.readonly}
                                checked={
                                    !!this.value
                                        ?.split('\n')
                                        .includes(option.value)
                                }
                            />
                            <es-icon
                                icon={this.icon}
                                class={'multi-checkbox'}
                                size={12}
                            />
                            <span class={'checkbox-label'}>{option.name}</span>
                        </label>
                    ))}
                </div>
            </Field>
        );
    }

    private onChange = (e: Event) => {
        const { value, checked } = e.target as HTMLInputElement;

        if (!value) return;

        let newValue = this.value;

        if (checked) {
            if (!newValue) {
                newValue = value;
            } else if (!newValue.split('\n').includes(value)) {
                newValue += `\n${value}`;
            }
        } else if (newValue) {
            newValue = newValue
                .split('\n')
                .filter((v) => v !== value)
                .join('\n');
        }

        this.fieldchange.emit({
            name: this.name,
            value: newValue,
        });
    };

    private onKeyDown = (e: KeyboardEvent) => {
        if (e.key === ' ' || e.key === 'Enter') {
            e.preventDefault();
            const input = (e.target as HTMLLabelElement).querySelector(
                'input',
            ) as HTMLInputElement;
            if (input) {
                input.checked = !input.checked;
            }
        }
    };
}
