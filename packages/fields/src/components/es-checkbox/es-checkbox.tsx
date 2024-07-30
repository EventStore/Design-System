import { Component, h, Prop, Event, type EventEmitter } from '@stencil/core';
import type { IconDescription } from '@eventstore-ui/components';
import { ICON_NAMESPACE } from '../../icons/namespace';
import type { FieldChange } from '../../types';

/** A checkbox component */
@Component({
    tag: 'es-checkbox',
    styleUrl: 'es-checkbox.css',
    shadow: true,
})
export class EsCheckbox {
    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter<FieldChange<boolean>>;

    /** The name of the field. */
    @Prop() name!: string;
    /** The current value of the field. */
    @Prop() value!: boolean;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** If the field is currently in an error state. */
    @Prop() invalid?: boolean;
    /** The icon to use. */
    @Prop() icon: IconDescription = [ICON_NAMESPACE, 'check'];

    render() {
        return (
            <label
                class={{ field: true, invalid: !!this.invalid }}
                tabindex={1}
                onKeyDown={this.onKeyDown}
            >
                <input
                    class={'input'}
                    type={'checkbox'}
                    name={this.name}
                    onChange={this.onChange}
                    disabled={this.disabled}
                    readonly={this.readonly}
                    checked={this.value}
                />
                <es-icon icon={this.icon} class={'checkbox'} size={12} />
                <span class={'label'}>
                    <slot />
                </span>
            </label>
        );
    }

    private onChange = (e: Event) => {
        this.fieldchange.emit({
            name: this.name,
            value: (e?.target as HTMLInputElement)?.checked,
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
