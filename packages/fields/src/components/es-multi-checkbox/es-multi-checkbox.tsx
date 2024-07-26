import { Component, h, Prop, Event, type EventEmitter, State } from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';
import { ICON_NAMESPACE } from '../../icons/namespace';
import type { FieldChange } from '../../types';

/** A multi-checkbox component */
@Component({
    tag: 'es-multi-checkbox',
    styleUrl: 'es-multi-checkbox.css',
    shadow: true,
})
export class EsMultiCheckbox {
    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<Record<string, boolean>>>;

    /** The name of the field. */
    @Prop() name!: string;
    /** The current value of the field. */
    @Prop() value: Record<string, boolean> = {};
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** If the field is currently in an error state. */
    @Prop() invalid?: boolean;
    /** The icon to use. */
    @Prop() icon: IconDescription = [ICON_NAMESPACE, 'check'];
    /** The list of options for the checkboxes. */
    @Prop() options: { label: string; value: string }[] = [];

    @State() internalValue: Record<string, boolean> = {};

    componentWillLoad() {
        this.internalValue = { ...this.value };
    }

    render() {
        return (
            <div class={{ field: true, invalid: !!this.invalid }}>
                {this.options.map((option, i) => (
                    <label key={option.value} tabIndex={i}>
                        <input
                            class={'input'}
                            type={'checkbox'}
                            name={`${this.name}-${option.value}`}
                            onChange={this.onChange}
                            disabled={this.disabled}
                            readonly={this.readonly}
                            checked={this.internalValue[option.value]}
                        />
                        <es-icon icon={this.icon} class={'multi-checkbox'} size={12} />
                        <span class={'label'}>{option.label}</span>
                    </label>
                ))}
            </div>
        );
    }

    private onChange = (e: any) => {
        const { name, checked } = e.target;
        const key = name.replace(`${this.name}-`, '');

        this.internalValue = { ...this.internalValue, [key]: checked };

        this.fieldchange.emit({
            name: this.name,
            value: this.internalValue,
        });
    };
}
