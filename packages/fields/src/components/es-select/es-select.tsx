import {
    Component,
    h,
    Prop,
    Event,
    EventEmitter,
    Element,
    VNode,
} from '@stencil/core';
import { IconDescription } from '@eventstore/components';

import { ValidationMessages, FieldChangeEvent } from '../../types';
import { Field } from '../Field/Field';
import {
    RenderTypeaheadField,
    TypeaheadOption,
    OptionFilter,
    RenderTypeaheadOption,
} from '../es-typeahead/types';
import { ES_FIELDS } from '../../icons/namespace';

export type RenderSelectValue = (
    value: TypeaheadOption | undefined,
    rawValue: string,
) => VNode | string;

/**
 * A searchable select dropdown.
 * @usage <es-select />
 */
@Component({
    tag: 'es-select',
    styleUrl: 'es-select.css',
    shadow: true,
})
export class EsSelect {
    @Element() host!: HTMLEsListCreatorElement;
    /** Emitted when the value of the field is changed. */
    @Event({ bubbles: true }) fieldchange!: EventEmitter;

    /** The label of the field. */
    @Prop() label!: string;
    /** The name of the field. */
    @Prop() name!: string;
    /** The current value of the field. */
    @Prop() value!: string | null;
    /** A list of options to choose from. */
    @Prop() options!: TypeaheadOption[];
    /** Overwrite the default option renderer. */
    @Prop() renderOption?: RenderTypeaheadOption;
    /** Overwrite the default value renderer. */
    @Prop() renderValue: RenderSelectValue = (o, v) => o?.name ?? v;
    /** Pass a custom search filter function */
    @Prop() optionFilter?: OptionFilter;
    /** The placeholder for the input. */
    @Prop() placeholder?: string;
    /** If the field is disabled. */
    @Prop() disabled?: boolean;
    /** If the field is editable. */
    @Prop() readonly?: boolean;
    /** If the field is currently in an error state. */
    @Prop() invalid?: boolean;
    /** The validation messages of the field */
    @Prop() messages?: ValidationMessages;
    /** Icon to use as a chevron. */
    @Prop() chevronIcon: IconDescription = [ES_FIELDS, 'chevron'];

    renderPlaceholder = () => (
        <span class={'placeholder'}>{this.placeholder}</span>
    );

    renderField: RenderTypeaheadField = ({ Input, open, filter, ref }) => (
        <div
            ref={ref}
            class={{ input: true, open, disabled: !!this.disabled }}
            part={'input'}
        >
            <Input class={'true_input'} part={'true_input'} />
            {!open || !filter
                ? this.value
                    ? this.renderValue(this.findOption(this.value), this.value)
                    : this.renderPlaceholder()
                : null}
            <es-icon icon={this.chevronIcon} size={14} />
        </div>
    );

    render() {
        return (
            <Field
                label={this.label}
                invalid={this.invalid}
                messages={this.messages}
            >
                <es-typeahead
                    name={this.name}
                    value={this.value ? [this.value] : []}
                    closeOnSelect
                    renderField={this.renderField}
                    renderOption={this.renderOption}
                    options={this.options}
                    optionFilter={this.optionFilter}
                    onFieldchange={this.onTypeaheadChange}
                    disabled={this.disabled}
                />
                <slot />
            </Field>
        );
    }

    private findOption = (value: string) => {
        return this.options.find((o) => o.value === value);
    };

    private onTypeaheadChange = (
        e: FieldChangeEvent<{ typeahead: string[] }>,
    ) => {
        e.stopPropagation();

        const { value } = e.detail;

        this.fieldchange.emit({
            name: this.name,
            value: value.pop() ?? null,
        });
    };
}
